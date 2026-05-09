import { PageHero, PageShell } from "../components/SiteLayout";
import SEO from "../components/SEO";

const legalContent = {
  terms: ["Conditions générales", "Les conditions d’utilisation CoWorki encadrent la recherche, la réservation, les paiements simulés et les interactions entre utilisateurs, entreprises et espaces partenaires."],
  privacy: ["Politique de confidentialité", "CoWorki protège les données des utilisateurs et limite l’usage des informations aux besoins de réservation, de support et de personnalisation."],
  mentions: ["Mentions légales", "CoWorki est une plateforme dédiée à la valorisation et à la réservation des espaces de coworking en Tunisie."],
  cancellation: ["Politique d’annulation", "Les annulations dépendent des conditions propres à chaque espace. Les règles sont affichées avant confirmation de réservation."],
};

function LegalPage({ type }) {
  const [title, text] = legalContent[type] || legalContent.terms;
  return (
    <PageShell active="">
      <SEO title={`${title} | CoWorki`} description={text} />
      <PageHero eyebrow="Confiance & transparence" title={title} text={text} />
      <main className="mx-auto max-w-4xl px-6 py-14">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-[#0F2A43]">Version prototype</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Cette page présente une structure claire pour la démonstration. Dans une version production, elle serait complétée avec les informations juridiques officielles, les coordonnées de l’éditeur, les politiques détaillées et les responsabilités de chaque partie.
          </p>
        </div>
      </main>
    </PageShell>
  );
}

export default LegalPage;
