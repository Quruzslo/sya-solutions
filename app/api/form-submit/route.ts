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

    if (!recaptchaData.success || recaptchaData.score < 0.7) {
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

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "buliii1010@gmail.com",
      subject: `Weboldal Kapcsolat: ${subject || "Nincs tárgy megadva"}`,
      html: `
        <h3>Új üzenet érkezett a weboldalról!</h3>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${tel || "Nem adta meg"}</p>
        <p><strong>Üzenet:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f4; padding: 10px; rounded: 5px;">${message}</p>
      `,
    });

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
