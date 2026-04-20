import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return locale === "fi"
    ? {
        title: "Tietosuojaseloste — Webso",
        description: "Webso Oy:n tietosuojaseloste. Tietoa henkilötietojen käsittelystä yhteydenottolomakkeen yhteydessä.",
      }
    : {
        title: "Privacy Policy — Webso",
        description: "Webso Ltd privacy policy. Information on how personal data is processed in connection with the contact form.",
      };
}

export default async function Tietosuoja() {
  const locale = await getLocale();
  const fi = locale === "fi";

  return (
    <>
      <Nav />
      <main className="bg-w-black">
        <section className="border-b border-dashed border-w-white-15">
          <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
            <div className="py-16 md:py-24 max-w-2xl">

              <span className="tag mb-8 inline-block">{fi ? "Tietosuoja" : "Privacy"}</span>
              <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.035em] text-w-white leading-[1.1] mb-4">
                {fi ? "Tietosuojaseloste" : "Privacy Policy"}
              </h1>
              <p className="font-display text-[clamp(1rem,1.5vw,1.25rem)] text-w-white-50 mb-12">
                {fi ? "Webso Oy:n verkkolomake" : "Webso Ltd contact form"}
              </p>

              <div className="flex flex-col gap-1 mb-12 font-mono text-[0.75rem] uppercase tracking-[0.04em] text-w-white-30">
                <p>{fi ? "Laatimispäivä: 28.05.2024" : "Date: 28 May 2024"}</p>
                <p>{fi ? "Rekisterinpitäjä: Webso Oy" : "Controller: Webso Ltd"}</p>
                <p>Y-tunnus: 3143089-8</p>
                <p>{fi ? "Sähköposti:" : "Email:"} <a href="mailto:sales@webso.fi" className="hover:text-w-white transition-colors">sales@webso.fi</a></p>
              </div>

              <div className="flex flex-col gap-10 text-[0.9375rem] leading-[1.7] text-w-white-70">

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    {fi ? "1. Rekisterin nimi" : "1. Name of the register"}
                  </h2>
                  <p>{fi
                    ? "Webso Oy:n verkkosivujen yhteydenottolomakkeen asiakasrekisteri."
                    : "Customer register for the contact form on Webso Ltd's website."
                  }</p>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    {fi ? "2. Henkilötietojen käsittelyn tarkoitus" : "2. Purpose of processing personal data"}
                  </h2>
                  <p className="mb-3">{fi
                    ? "Lomakkeella kerättyjä tietoja käytetään seuraaviin tarkoituksiin:"
                    : "Data collected via the form is used for the following purposes:"
                  }</p>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {(fi ? [
                      "Yhteydenotto asiakkaaseen asiakkaan pyynnöstä",
                      "Palvelupyyntöjen käsittely ja vastaaminen",
                      "Asiakassuhteen hoitaminen ja kehittäminen",
                      "Mahdollinen asiakasviestintä",
                    ] : [
                      "Contacting the customer at their request",
                      "Handling and responding to service requests",
                      "Managing and developing the customer relationship",
                      "Potential customer communications",
                    ]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-w-white-30 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    {fi ? "3. Rekisterin tietosisältö" : "3. Data collected"}
                  </h2>
                  <p className="mb-3">{fi
                    ? "Lomakkeella kerätään seuraavat tiedot:"
                    : "The following data is collected via the form:"
                  }</p>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {(fi ? [
                      "Nimi",
                      "Sähköpostiosoite",
                      "Puhelinnumero",
                      "Yrityksen nimi",
                      "Vapaa viestikenttä (käyttäjän itse kirjoittama sisältö)",
                    ] : [
                      "Name",
                      "Email address",
                      "Phone number",
                      "Company name",
                      "Free message field (content written by the user)",
                    ]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-w-white-30 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    {fi ? "4. Säännönmukaiset tietolähteet" : "4. Regular sources of data"}
                  </h2>
                  <p>{fi
                    ? "Tiedot saadaan suoraan rekisteröidyltä verkkolomakkeen täyttämisen yhteydessä."
                    : "Data is collected directly from the data subject when they complete the contact form."
                  }</p>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    {fi ? "5. Tietojen säilytysaika" : "5. Retention period"}
                  </h2>
                  <p>{fi
                    ? "Tietoja säilytetään vain niin kauan kuin se on tarpeen yhteydenottoon vastaamiseksi ja asiakassuhteen hoitamiseksi. Tarpeettomat tiedot poistetaan kohtuullisessa ajassa."
                    : "Data is retained only for as long as necessary to respond to the enquiry and manage the customer relationship. Data that is no longer needed is deleted within a reasonable timeframe."
                  }</p>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    {fi ? "6. Rekisteröidyn oikeudet" : "6. Rights of the data subject"}
                  </h2>
                  <p className="mb-3">{fi ? "Rekisteröidyllä on oikeus:" : "The data subject has the right to:"}</p>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {(fi ? [
                      "Saada pääsy omiin tietoihinsa",
                      "Pyytää tietojensa oikaisemista tai poistamista",
                      "Vastustaa tai rajoittaa tietojen käsittelyä",
                      "Tehdä valitus valvontaviranomaiselle (Tietosuojavaltuutetun toimisto)",
                    ] : [
                      "Access their personal data",
                      "Request correction or deletion of their data",
                      "Object to or restrict the processing of their data",
                      "Lodge a complaint with the supervisory authority (Office of the Data Protection Ombudsman)",
                    ]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-w-white-30 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3">
                    {fi ? "Tietopyynnöt ja -oikaisut voi toimittaa osoitteeseen:" : "Data requests and corrections can be sent to:"}{" "}
                    <a href="mailto:help@webso.fi" className="text-w-white hover:text-w-accent transition-colors">
                      help@webso.fi
                    </a>
                  </p>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    {fi ? "7. Rekisterin suojaus" : "7. Security"}
                  </h2>
                  <p>{fi
                    ? "Kerätyt tiedot säilytetään suojatuissa järjestelmissä, joihin on rajattu pääsy vain niillä henkilöillä, joiden työnkuvaan tietojen käsittely kuuluu."
                    : "Collected data is stored in secured systems with access restricted to those personnel whose role requires handling such data."
                  }</p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
