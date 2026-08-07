import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { recaptchaToken, fax_number, name, email, tel, subject, message } =
      body;

    if (!recaptchaToken || fax_number) {
      return NextResponse.json(
        { success: false, message: "Spam gyanús levél" },
        { status: 400 },
      );
    }

    // 2. ReCAPTCHA ellenőrzés
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    const recaptchaRes = await fetch(verificationUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.3) {
      return NextResponse.json(
        {
          success: false,
          message: "reCAPTCHA ellenőrzés sikertelen.",
        },
        { status: 400 },
      );
    }

    // RESEND KÜLDÉS ---
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      // Név beállítása a feladóhoz
      from: "SYA Solutions Weboldal <hello@sya-solutions.hu>",
      replyTo: email,
      to: "sziligalaron@gmail.com",
      subject: `Weboldal Kapcsolat: ${subject || "Nincs tárgy megadva"}`,
      html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #1f2937; line-height: 1.5; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; background-color: #ffffff;">
      
      <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 600; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px;">
        Új megkeresés érkezett a weboldalról
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280; width: 90px; font-weight: 500;">Név:</td>
          <td style="padding: 6px 0; color: #111827; font-weight: 600;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">E-mail:</td>
          <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Telefon:</td>
          <td style="padding: 6px 0; color: #111827;">${tel || "Nem adta meg"}</td>
        </tr>
      </table>

      <div style="margin-top: 16px;">
        <span style="display: block; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Üzenet</span>
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; color: #1f2937; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</div>
      </div>

    </div>
  `,
    });

    if (error) {
      console.error("API Hiba:", error);
      return NextResponse.json(
        { success: false, message: "Hiba az e-mail küldésekor." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Üzenet sikeresen elküldve!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Hiba a szerver oldalon:", error);
    return NextResponse.json(
      { success: false, message: "Szerverhiba történt a feldolgozás során." },
      { status: 500 },
    );
  }
}
