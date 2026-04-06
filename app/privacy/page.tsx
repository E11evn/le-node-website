import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — le-node',
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="py-20 md:py-28">
          <div className="container-content max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: '#0043FA' }}>
              Confidentialité
            </span>
            <h1 className="text-display-sm font-bold text-foreground mb-10">
              Politique de confidentialité
            </h1>

            <div className="space-y-8 text-muted leading-relaxed">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Données collectées</h2>
                <p>
                  le-node collecte uniquement les données que vous nous fournissez volontairement,
                  notamment votre adresse email lors de votre inscription à la liste d&apos;attente
                  ou lors d&apos;une prise de contact.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Utilisation des données</h2>
                <p>
                  Vos données sont utilisées exclusivement pour vous contacter en lien avec
                  nos produits et services. Nous ne vendons ni ne partageons vos données
                  avec des tiers à des fins commerciales.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Conservation</h2>
                <p>
                  Vos données sont conservées le temps nécessaire à la finalité pour laquelle
                  elles ont été collectées, et supprimées sur simple demande.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Vos droits</h2>
                <p>
                  Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
                  de suppression et de portabilité de vos données. Pour exercer ces droits,
                  contactez-nous à [email de contact].
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground mb-2">Cookies</h2>
                <p>
                  Ce site n&apos;utilise pas de cookies de traçage ou publicitaires.
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
