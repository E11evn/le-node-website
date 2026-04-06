import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mentions légales — le-node',
}

export default function LegalPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="py-20 md:py-28">
          <div className="container-content max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#0043FA' }}>
              Mentions légales
            </span>
            <h1 className="text-display-sm font-bold text-foreground mb-10">
              Mentions légales
            </h1>

            <div className="space-y-8 text-muted leading-relaxed">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Éditeur du site</h2>
                <p>le-node SAS<br />
                [Adresse]<br />
                [Ville, Code postal]<br />
                France</p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Directeur de la publication</h2>
                <p>[Nom du directeur de la publication]</p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Hébergement</h2>
                <p>Vercel Inc.<br />
                440 N Barranca Ave #4133<br />
                Covina, CA 91723, États-Unis</p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Contact</h2>
                <p>[Email de contact]</p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Propriété intellectuelle</h2>
                <p>
                  L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels...)
                  est la propriété exclusive de le-node, à l&apos;exception des marques, logos ou contenus
                  appartenant à d&apos;autres sociétés partenaires ou auteurs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
