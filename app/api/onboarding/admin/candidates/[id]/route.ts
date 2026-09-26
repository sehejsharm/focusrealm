import { clientIp, error, isAdmin, json } from "@/lib/onboarding/api.server";
import { getCandidate, updateCandidate } from "@/lib/onboarding/store.server";
import { buildContract } from "@/lib/onboarding/contract";
import { companiesOf, currentStage } from "@/lib/onboarding/stage";
import { formatAadhaar } from "@/lib/onboarding/contract";
import { generatePassword, seal } from "@/lib/onboarding/security.server";

/** Full record, including the Aadhaar number. Admin session required. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) return error("Not authorised.", 401);

  const { id } = await params;
  const candidate = await getCandidate(id);
  if (!candidate) return error("Not found.", 404);

  const { mailbox, ...rest } = candidate;

  return json({
    ...rest,
    stage: currentStage(candidate),
    companies: companiesOf(candidate),
    aadhaarFormatted: candidate.details ? formatAadhaar(candidate.details.aadhaarNumber) : null,
    contract: buildContract(candidate),
    // The sealed password is never returned — it is the candidate's to view.
    mailbox: mailbox
      ? {
          address: mailbox.address,
          provisionedAt: mailbox.provisionedAt,
          viewedAt: mailbox.viewedAt ?? null,
          collected: !mailbox.sealedPassword,
        }
      : null,
  });
}

/**
 * The three decisions the founders make: verify a signed agreement, send it
 * back, or provision the mailbox.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) return error("Not authorised.", 401);

  const { id } = await params;
  const candidate = await getCandidate(id);
  if (!candidate) return error("Not found.", 404);

  const body = (await request.json().catch(() => null)) as {
    action?: string;
    note?: string;
    address?: string;
    password?: string;
    typedName?: string;
    designation?: string;
  } | null;

  switch (body?.action) {
    // Focus Realm's side of the agreement. Countersigning is also what marks it
    // verified — a countersigned agreement is what "verified" means. Records
    // verified before countersigning existed can still be signed here, which
    // fills in their company block without disturbing their stage.
    case "countersign": {
      if (!candidate.signature) return error("The intern has not signed yet.", 409);
      if (candidate.companySignature) return error("This is already countersigned.", 409);

      const typedName = body.typedName?.trim();
      const designation = body.designation?.trim() || "Authorized Signatory";
      if (!typedName) return error("Type the signatory's full name.");

      const updated = await updateCandidate(id, (c) => ({
        ...c,
        companySignature: {
          typedName,
          designation,
          signedAt: new Date().toISOString(),
          ip: clientIp(request),
        },
        contractVerifiedAt: c.contractVerifiedAt ?? new Date().toISOString(),
        contractRejection: undefined,
      }));
      return json({ ok: true, stage: updated ? currentStage(updated) : null });
    }

    case "reject": {
      const note = body.note?.trim();
      if (!note) return error("Say what needs correcting.");
      if (!candidate.signature) return error("Nothing has been signed yet.", 409);
      if (candidate.companySignature) {
        return error("This agreement is countersigned and cannot be sent back.", 409);
      }

      const updated = await updateCandidate(id, (c) => ({
        ...c,
        signature: undefined,
        contractVerifiedAt: undefined,
        contractRejection: { note, at: new Date().toISOString() },
      }));
      return json({ ok: true, stage: updated ? currentStage(updated) : null });
    }

    case "provision": {
      const address = body.address?.trim();
      if (!address) return error("Enter the mailbox address you created.");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address)) return error("That is not a valid address.");
      if (!candidate.contractVerifiedAt) return error("Verify the agreement first.", 409);
      if (candidate.mailbox) return error("A mailbox is already recorded.", 409);

      // Either mirror the password set in SpaceMail, or hand back a generated
      // one for the operator to set there.
      const password = body.password?.trim() || generatePassword();

      const updated = await updateCandidate(id, (c) => ({
        ...c,
        mailbox: {
          address,
          provisionedAt: new Date().toISOString(),
          sealedPassword: seal(password),
        },
      }));

      return json({
        ok: true,
        address,
        // Shown once in the console so the operator can set it in SpaceMail.
        password,
        stage: updated ? currentStage(updated) : null,
      });
    }

    default:
      return error("Unknown action.");
  }
}
