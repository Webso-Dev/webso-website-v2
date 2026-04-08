import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | undefined) {
  if (!value?.trim()) return "";
  return `<tr>
    <td style="padding:6px 12px 6px 0;font-weight:bold;white-space:nowrap;vertical-align:top;color:#555">${escape(label)}</td>
    <td style="padding:6px 0;color:#111;white-space:pre-wrap">${escape(value)}</td>
  </tr>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      nimi: string;
      sahkoposti: string;
      puhelin?: string;
      viesti?: string;
      attachment?: { name: string; type: string; data: string };
    };

    const { nimi, sahkoposti, puhelin, viesti, attachment } = body;

    if (!nimi?.trim() || !sahkoposti?.trim()) {
      return NextResponse.json({ error: "Puuttuvat kentät" }, { status: 400 });
    }

    const attachments: { filename: string; content: string }[] = [];
    if (attachment?.data && attachment.name) {
      const base64 = attachment.data.includes(",")
        ? attachment.data.split(",")[1]
        : attachment.data;
      attachments.push({ filename: attachment.name, content: base64 });
    }

    await resend.emails.send({
      from: "Webso <noreply@webso.fi>",
      to: ["pekka@webso.fi"],
      replyTo: sahkoposti,
      subject: `[Avoin hakemus] ${escape(nimi)}`,
      html: `
        <div style="font-family:monospace;max-width:600px;color:#111;border:1px solid #e0e0e0;padding:24px">
          <p style="margin:0 0 16px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#888">
            Lähde: <strong style="color:#111">Ura-sivu – Avoin hakemus</strong>
          </p>
          <table style="border-collapse:collapse;width:100%">
            ${row("Nimi", nimi)}
            ${row("Sähköposti", sahkoposti)}
            ${row("Puhelin", puhelin)}
            ${row("Viesti", viesti)}
            ${attachment ? row("Liite", attachment.name) : ""}
          </table>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lähetys epäonnistui" }, { status: 500 });
  }
}
