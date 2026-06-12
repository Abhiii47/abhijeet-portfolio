export default function Experience() {
  return (
    <section id="experience" className="space-y-8 py-16">
      <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
        02 Experience
      </p>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-foreground">
            Software Development Engineer — Ecovis RKCA
          </h2>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Feb 2026 – Present · Full-time
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>
              Built a RAG-based knowledge system using Pinecone and Gemini for internal document retrieval and AI-assisted querying, with streaming responses.
            </li>
            <li>
              Leading product execution for PIMS, a client-facing pharmacy management system for inventory, ERP, billing, and shipment tracking — requirements, sprint planning, and delivery — built on Node.js, React, Next.js, and Tailwind CSS.
            </li>
            <li>
              Deployed and manage two production projects on GCP — hosting, Vertex AI and Google AI Studio integrations, and API key / credential management.
            </li>
            <li>
              Set up CI/CD pipelines with GitHub Actions so changes merged to the repo deploy automatically, speeding up releases and reducing manual deployment overhead.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
