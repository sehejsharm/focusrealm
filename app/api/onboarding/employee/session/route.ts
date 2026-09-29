import { cookies } from "next/headers";
import { error, json } from "@/lib/onboarding/api.server";
import { findActiveByEmail, getCandidate, updateCandidate } from "@/lib/onboarding/store.server";
import {
  EMPLOYEE_COOKIE,
  MAX_FAILED_SIGN_INS,
  MAX_PASSWORD_LENGTH,
  SIGN_IN_LOCK_MINUTES,
  issueEmployeeSession,
  verifyEmployeeSession,
} from "@/lib/onboarding/security.server";
import { hashPassword, verifyPassword } from "@/lib/onboarding/security.server";

const WRONG = "That email and password do not match.";
const SESSION_DAYS = 7;

/** Signs an employee in with their email and password. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    password?: unknown;
  } | null;

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password) return error("Enter your email and password.");
  if (email.length > 200 || password.length > MAX_PASSWORD_LENGTH) return error(WRONG, 401);

  // Only records that have set a password can sign in at all.
  const candidates = (await findActiveByEmail(email)).filter((c) => c.login);
  if (candidates.length === 0) {
    // Spend the same time as a real check, so the response time does not
    // reveal which addresses have an account.
    hashPassword(password);
    return error(WRONG, 401);
  }

  const now = Date.now();
  const unlocked = candidates.filter(
    (c) => !c.login?.lockedUntil || Date.parse(c.login.lockedUntil) <= now,
  );
  if (unlocked.length === 0) {
    return error(
      `Too many wrong passwords. Try again in ${SIGN_IN_LOCK_MINUTES} minutes, or ask the founders to reset your sign-in.`,
      429,
    );
  }

  const match = unlocked.find((c) => verifyPassword(password, c.login!.passwordHash));

  if (!match) {
    // Count the miss against every account behind this address.
    await Promise.all(
      unlocked.map((c) =>
        updateCandidate(c.id, (fresh) => {
          if (!fresh.login) return fresh;
          const failedAttempts = (fresh.login.failedAttempts ?? 0) + 1;
          return {
            ...fresh,
            login: {
              ...fresh.login,
              failedAttempts: failedAttempts >= MAX_FAILED_SIGN_INS ? 0 : failedAttempts,
              lockedUntil:
                failedAttempts >= MAX_FAILED_SIGN_INS
                  ? new Date(now + SIGN_IN_LOCK_MINUTES * 60_000).toISOString()
                  : fresh.login.lockedUntil,
            },
          };
        }),
      ),
    );
    return error(WRONG, 401);
  }

  if (match.login?.failedAttempts || match.login?.lockedUntil) {
    await updateCandidate(match.id, (fresh) =>
      fresh.login
        ? { ...fresh, login: { passwordHash: fresh.login.passwordHash, setAt: fresh.login.setAt } }
        : fresh,
    );
  }

  const store = await cookies();
  store.set(EMPLOYEE_COOKIE, issueEmployeeSession(match.id, SESSION_DAYS), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });

  return json({ portal: `/hr/${match.token}` });
}

/** Where a signed-in employee's portal is, so the sign-in page can skip itself. */
export async function GET() {
  const store = await cookies();
  const id = verifyEmployeeSession(store.get(EMPLOYEE_COOKIE)?.value);
  // Not an error: the sign-in page asks this of every visitor.
  if (!id) return json({ portal: null });

  const candidate = await getCandidate(id);
  // Removed people are signed out wherever they were signed in.
  if (!candidate || candidate.archivedAt || !candidate.login) {
    store.delete(EMPLOYEE_COOKIE);
    return json({ portal: null });
  }

  return json({ portal: `/hr/${candidate.token}` });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(EMPLOYEE_COOKIE);
  return json({ ok: true });
}
