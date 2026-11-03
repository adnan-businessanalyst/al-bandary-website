import { NextResponse } from "next/server";
import { deliverInquiryMail } from "@/lib/inquiry-mail";
import { clientIp, tooManyInquiries } from "@/lib/inquiry-rate";
import { parseInquiry } from "@/lib/inquiry";
import { saveInquiry } from "@/lib/inquiry-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (tooManyInquiries(clientIp(request))) {
    return NextResponse.json({ error: "unavailable" }, { status: 429 });
  }

  const parsed = parseInquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const inquiry = await saveInquiry(parsed.value);
    try {
      await deliverInquiryMail(inquiry);
    } catch {
      console.error("inquiry mail failed");
    }
    return NextResponse.json(
      { id: inquiry.id },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : "unknown";
    console.error("inquiry save failed", code);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
