import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tietosuojaseloste — Webso",
  description: "Webso Oy:n tietosuojaseloste. Tietoa henkilötietojen käsittelystä yhteydenottolomakkeen yhteydessä.",
};

export default function Tietosuoja() {
  return (
    <>
      <Nav />
      <main>
        <section className="border-b border-dashed border-w-white-15">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-8 md:px-10">
            <div className="py-16 md:py-24 max-w-2xl">

              <span className="tag mb-8 inline-block">Tietosuoja</span>
              <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.035em] text-w-white leading-[1.1] mb-4">
                Tietosuojaseloste
              </h1>
              <p className="font-display text-[clamp(1rem,1.5vw,1.25rem)] text-w-white-50 mb-12">
                Webso Oy:n verkkolomake
              </p>

              <div className="flex flex-col gap-1 mb-12 font-mono text-[0.75rem] uppercase tracking-[0.04em] text-w-white-30">
                <p>Laatimispäivä: 28.05.2024</p>
                <p>Rekisterinpitäjä: Webso Oy</p>
                <p>Y-tunnus: 3143089-8</p>
                <p>Sähköposti: <a href="mailto:sales@webso.fi" className="hover:text-w-white transition-colors">sales@webso.fi</a></p>
              </div>

              <div className="flex flex-col gap-10 text-[0.9375rem] leading-[1.7] text-w-white-70">

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    1. Rekisterin nimi
                  </h2>
                  <p>Webso Oy:n verkkosivujen yhteydenottolomakkeen asiakasrekisteri.</p>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    2. Henkilötietojen käsittelyn tarkoitus
                  </h2>
                  <p className="mb-3">Lomakkeella kerättyjä tietoja käytetään seuraaviin tarkoituksiin:</p>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {[
                      "Yhteydenotto asiakkaaseen asiakkaan pyynnöstä",
                      "Palvelupyyntöjen käsittely ja vastaaminen",
                      "Asiakassuhteen hoitaminen ja kehittäminen",
                      "Mahdollinen asiakasviestintä",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-w-white-30 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    3. Rekisterin tietosisältö
                  </h2>
                  <p className="mb-3">Lomakkeella kerätään seuraavat tiedot:</p>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {[
                      "Nimi",
                      "Sähköpostiosoite",
                      "Puhelinnumero",
                      "Yrityksen nimi",
                      "Vapaa viestikenttä (käyttäjän itse kirjoittama sisältö)",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-w-white-30 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    4. Säännönmukaiset tietolähteet
                  </h2>
                  <p>Tiedot saadaan suoraan rekisteröidyltä verkkolomakkeen täyttämisen yhteydessä.</p>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    5. Tietojen säilytysaika
                  </h2>
                  <p>Tietoja säilytetään vain niin kauan kuin se on tarpeen yhteydenottoon vastaamiseksi ja asiakassuhteen hoitamiseksi. Tarpeettomat tiedot poistetaan kohtuullisessa ajassa.</p>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    6. Rekisteröidyn oikeudet
                  </h2>
                  <p className="mb-3">Rekisteröidyllä on oikeus:</p>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {[
                      "Saada pääsy omiin tietoihinsa",
                      "Pyytää tietojensa oikaisemista tai poistamista",
                      "Vastustaa tai rajoittaa tietojen käsittelyä",
                      "Tehdä valitus valvontaviranomaiselle (Tietosuojavaltuutetun toimisto)",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-w-white-30 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3">
                    Tietopyynnöt ja -oikaisut voi toimittaa osoitteeseen:{" "}
                    <a href="mailto:help@webso.fi" className="text-w-white hover:text-w-accent transition-colors">
                      help@webso.fi
                    </a>
                  </p>
                </div>

                <div>
                  <h2 className="font-display font-bold text-w-white text-[1.125rem] tracking-[-0.02em] mb-3">
                    7. Rekisterin suojaus
                  </h2>
                  <p>Kerätyt tiedot säilytetään suojatuissa järjestelmissä, joihin on rajattu pääsy vain niillä henkilöillä, joiden työnkuvaan tietojen käsittely kuuluu.</p>
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
