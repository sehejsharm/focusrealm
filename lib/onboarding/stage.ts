import { ALL_COMPANIES, isCompany, resourcesFor, testIdsFor } from "./content";
import type { Candidate, CandidateView, Company, Stage } from "./types";
import { DEFAULT_TERM_MONTHS, STAGE_ORDER, trackOf } from "./types";

/**
 * The companies this candidate is onboarding into. A record with no choice on
 * it predates the choice existing, and was onboarded under both — so that is
 * what it resolves to, and nobody mid-flow has their requirements changed.
 */
export function companiesOf(candidate: Pick<Candidate, "companies">): Company[] {
  const chosen = (candidate.companies ?? []).filter(isCompany);
  return chosen.length > 0 ? ALL_COMPANIES.filter((c) => chosen.includes(c)) : ALL_COMPANIES;
}

/** The handbooks and videos this candidate is required to work through. */
export function requiredResources(candidate: Candidate) {
  return resourcesFor(companiesOf(candidate));
}

/** The assessments this candidate is required to pass. */
export function requiredTestIds(candidate: Candidate): string[] {
  return testIdsFor(companiesOf(candidate));
}

export function hasPassed(candidate: Candidate, testId: string): boolean {
  return (candidate.tests[testId] ?? []).some((a) => a.passed);
}

export function bestScore(candidate: Candidate, testId: string): number | null {
  const attempts = candidate.tests[testId] ?? [];
  return attempts.length ? Math.max(...attempts.map((a) => a.score)) : null;
}

/** How many of this candidate's own required resources are marked done. */
export function resourcesDone(candidate: Candidate): number {
  return requiredResources(candidate).filter((r) => candidate.resources[r.id]).length;
}

export function learningComplete(candidate: Candidate): boolean {
  return requiredResources(candidate).every((r) => candidate.resources[r.id]);
}

/** When the engagement ends — start date plus the agreed term. */
export function endDateOf(candidate: Candidate): string {
  const end = new Date(candidate.startDate);
  end.setUTCMonth(end.getUTCMonth() + (candidate.termMonths || DEFAULT_TERM_MONTHS));
  return end.toISOString();
}

/**
 * An agreement a candidate can actually sign: either the standard template,
 * or a bespoke document the founders have uploaded for this role.
 */
export function agreementReady(candidate: Candidate): boolean {
  const plan = candidate.agreement ?? { kind: "standard" as const };
  return plan.kind === "standard" || Boolean(plan.document);
}

/**
 * The single source of truth for where a candidate is. Derived rather than
 * stored, so a record can never drift out of sync with its own contents.
 */
export function currentStage(candidate: Candidate): Stage {
  if (!candidate.details) return "details";
  if (!learningComplete(candidate)) return "learning";
  if (!requiredTestIds(candidate).every((id) => hasPassed(candidate, id))) return "tests";
  if (!candidate.signature) return "contract";
  if (!candidate.contractVerifiedAt) return "verification";
  if (!candidate.mailbox) return "email";
  return "complete";
}

export function stageIndex(stage: Stage): number {
  return STAGE_ORDER.indexOf(stage);
}

export function isStageDone(candidate: Candidate, stage: Stage): boolean {
  return stageIndex(currentStage(candidate)) > stageIndex(stage);
}

/** Strips Aadhaar number and sealed credentials for the candidate's own view. */
export function toCandidateView(candidate: Candidate): CandidateView {
  const { details } = candidate;
  const termMonths = candidate.termMonths || DEFAULT_TERM_MONTHS;

  return {
    track: candidate.track,
    role: trackOf(candidate),
    termMonths,
    endDate: endDateOf(candidate),
    agreementKind: candidate.agreement?.kind ?? "standard",
    companies: companiesOf(candidate),
    agreementDocumentName:
      candidate.agreement?.kind === "bespoke"
        ? (candidate.agreement.document?.originalName ?? null)
        : null,
    invitedName: candidate.invitedName,
    startDate: candidate.startDate,
    stage: currentStage(candidate),
    details: details
      ? {
          fullName: details.fullName,
          parentName: details.parentName,
          address: details.address,
          personalEmail: details.personalEmail,
          phone: details.phone,
          aadhaarFile: details.aadhaarFile,
          submittedAt: details.submittedAt,
          consent: details.consent,
          aadhaarLast4: details.aadhaarNumber.slice(-4),
        }
      : null,
    consent: candidate.details?.consent ?? null,
    resources: candidate.resources,
    tests: candidate.tests,
    signedAt: candidate.signature?.signedAt ?? null,
    companySignature: candidate.companySignature ?? null,
    contractVerifiedAt: candidate.contractVerifiedAt ?? null,
    contractRejection: candidate.contractRejection ?? null,
    emailRequestedAt: candidate.emailRequestedAt ?? null,
    mailbox: candidate.mailbox
      ? {
          address: candidate.mailbox.address,
          viewed: Boolean(candidate.mailbox.viewedAt),
        }
      : null,
  };
}
