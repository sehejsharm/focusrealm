import { error } from "@/lib/onboarding/api.server";
import { getCandidateByToken } from "@/lib/onboarding/store.server";
import { activeCertificate, certificateFilename, isCertificateKind } from "@/lib/onboarding/certificates";
import { renderCertificatePdf } from "@/lib/onboarding/certificate-pdf.server";

/**
 * The employee's own certificate or letter. Only a document a founder has
 * approved, and not since withdrawn, can be downloaded.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string; kind: string }> },
) {
  const { token, kind } = await params;
  if (!isCertificateKind(kind)) return error("Not found.", 404);

  const candidate = await getCandidateByToken(token);
  if (!candidate) return error("This link is not valid.", 404);

  const issued = activeCertificate(candidate, kind);
  if (!issued) return error("This document has not been issued to you yet.", 404);

  const pdf = await renderCertificatePdf(issued);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${certificateFilename(kind, issued.text.recipientName)}"`,
      "cache-control": "private, no-store",
    },
  });
}
