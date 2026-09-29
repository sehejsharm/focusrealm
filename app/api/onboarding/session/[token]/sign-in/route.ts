import { error, json } from "@/lib/onboarding/api.server";
import { getCandidateByToken, updateCandidate } from "@/lib/onboarding/store.server";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  hashPassword,
  verifyPassword,
} from "@/lib/onboarding/security.server";
import { toCandidateView } from "@/lib/onboarding/view";

/**
 * Sets, or changes, the password an employee signs in to the portal with.
 * Changing it needs the current one, so a link left open on a shared
 * computer is not enough to take over the account.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const candidate = await getCandidateByToken(token);
  if (!candidate) return error("This link is not valid.", 404);

  const body = (await request.json().catch(() => null)) as {
    password?: unknown;
    currentPassword?: unknown;
  } | null;

  const password = typeof body?.password === "string" ? body.password : "";
  if (password.length < MIN_PASSWORD_LENGTH) {
    return error(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if (password.length > MAX_PASSWORD_LENGTH) return error("That password is too long.");

  if (candidate.login) {
    const current = typeof body?.currentPassword === "string" ? body.currentPassword : "";
    if (!current || !verifyPassword(current, candidate.login.passwordHash)) {
      return error("Your current password is not right.", 403);
    }
  }

  const updated = await updateCandidate(candidate.id, (c) => ({
    ...c,
    login: { passwordHash: hashPassword(password), setAt: new Date().toISOString() },
  }));
  if (!updated) return error("Could not save your password.", 500);

  return json(toCandidateView(updated));
}
