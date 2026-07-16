"use client";
import { useState } from "react";
import Script from "next/script";
import FormInput from "./formInput";
import { validateContactForm } from "./validate";

export default function ContactForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (typeof window === "undefined" || !window.grecaptcha) {
        setErrors((prev) => ({
          ...prev,
          recaptcha: "A biztonsági ellenőrzés még tölt, kérjük próbáld újra!",
        }));
        return;
      }

      setLoading(true);

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(siteKey, { action: "contact_form" })
          .then(async (token) => {
            const finalPayload = {
              ...formData,
              recaptchaToken: token,
            };

            try {
              const response = await fetch("/api/form-submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalPayload),
              });

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.message || "Szerver hiba történt.");
              }

              setFormData({});
              setIsSuccess(true);
            } catch (error) {
              console.error("Küldési hiba az API végponton:", error);
              setErrors((prev) => ({
                ...prev,
                server:
                  "Nem sikerült elküldeni az üzenetet. Próbáld újra később!",
              }));
            } finally {
              setLoading(false);
            }
          })
          .catch((err) => {
            console.error("ReCAPTCHA token generálási hiba:", err);
            setLoading(false);
          });
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-xl border border-green-200 my-4">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Köszönjük megkeresését!
        </h3>
        <p className="text-green-700">
          Az üzenetet sikeresen kézbesítettük. Hamarosan válaszolunk.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm text-green-800 underline hover:opacity-80"
        >
          Új üzenet küldése
        </button>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-[5px] w-full"
      >
        {errors.server && (
          <p className="text-red-800 text-sm font-medium text-center bg-red-50 p-2 rounded border border-red-200">
            {errors.server}
          </p>
        )}

        <FormInput
          type="text"
          name="name"
          formData={formData}
          label="Név"
          onChange={handleChange}
          error={errors.name}
        />
        <FormInput
          type="text"
          name="email"
          formData={formData}
          label="E-mail cím"
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          type="tel"
          name="tel"
          formData={formData}
          label="Telefonszám"
          onChange={handleChange}
          error={errors.tel}
        />
        <FormInput
          type="text"
          name="subject"
          formData={formData}
          label="Tárgy"
          onChange={handleChange}
          error={errors.subject}
        />
        <FormInput
          type="text"
          name="message"
          formData={formData}
          label="Üzenet"
          onChange={handleChange}
          error={errors.message}
        />

        {/* Honeypot mező */}
        <div className="opacity-0 absolute -z-50 w-0 h-0 overflow-hidden pointer-events-none">
          <input
            type="text"
            name="fax_number"
            tabIndex={-1}
            autoComplete="off"
            onChange={handleChange}
            value={formData.fax_number || ""}
          />
        </div>

        {/* Adatkezelési Checkbox */}
        <div className="flex items-start gap-3 mt-6 relative">
          <input
            type="checkbox"
            id="adatkezeles"
            name="adatkezeles"
            checked={!!formData.adatkezeles}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                adatkezeles: e.target.checked,
              }));
              if (errors.adatkezeles)
                setErrors((prev) => ({ ...prev, adatkezeles: "" }));
            }}
            className="appearance-none w-5 h-5 mt-0.5 border-2 border-zold rounded-sm bg-transparent checked:rounded-full checked:bg-zold checked:border-zold transition-all duration-300 cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:bg-white checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          <label
            htmlFor="adatkezeles"
            className="text-sm md:text-base text-text-alap cursor-pointer select-none leading-relaxed"
          >
            Elfogadom az{" "}
            <a
              href="/adatkezelesi-nyilatkozat"
              target="_blank"
              className="text-arany underline hover:opacity-90"
            >
              adatkezelési tájékoztatóban
            </a>{" "}
            foglaltakat.
          </label>
          {errors.adatkezeles && (
            <span className="absolute bottom-[-14px] left-0 text-red-800 text-xs font-medium">
              {errors.adatkezeles}
            </span>
          )}
        </div>

        {errors.recaptcha && (
          <p className="text-red-800 text-sm font-medium text-center mt-2">
            {errors.recaptcha}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className=" px-6 py-3 bg-zold mx-auto text-white font-bold rounded-full shadow-md hover:opacity-70 transition-opacity w-fit cursor-pointer disabled:opacity-50"
        >
          {loading ? "Ellenőrzés és küldés..." : "Üzenet küldése"}
        </button>
      </form>
    </>
  );
}
