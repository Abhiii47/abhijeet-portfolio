import Link from "next/link";

const projects = [
  {
    title: "SmartResume — Resume Analysis Engine",
    meta: "featured · 2025",
    description:
      "ATS scoring engine that has processed and scored 50,000+ resumes. FastAPI backend, XGBoost classifier. Features engineered from document structure, keyword density, and section completeness. OAuth2 + JWT auth, PostgreSQL-backed.",
    stats: "50K+ resumes scored · Live in production",
    liveUrl: "https://smart-resume-orcin.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/SmartResume",
    privateNote: "",
  },
  {
    title: "Room & Food Finder",
    meta: "2024",
    description:
      "Hyperlocal platform prototype students use to find housing and food near campus. Multi-role system (User / Provider / Admin), real-time chat over Socket.io, map-based geo-search. Dockerized services with automated CI/CD.",
    stats: "Real-time chat · Dockerized services",
    liveUrl: "https://room-and-food.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/Room_and_Food",
    privateNote: "",
  },
  {
    title: "RAG Knowledge Assistant",
    meta: "Ecovis RKCA · 2026 · proprietary",
    description:
      "Internal knowledge retrieval — ask a question, get cited answers in seconds. Document ingestion → chunking → Pinecone vector search → Gemini answer generation, streamed in real time. Hosted on GCP.",
    stats: "Deployed internally · Streaming responses",
    liveUrl: "",
    repoUrl: "",
    privateNote: "Private — built for Ecovis RKCA.",
  },
  {
    title: "Amazon ML — Product Price Prediction",
    meta: "2025 · top 0.1%",
    description:
      "End-to-end regression on 150,000+ records, built during Amazon ML Summer School. EDA → feature engineering → XGBoost / LightGBM / CatBoost ensemble with hyperparameter optimization and bias–variance analysis.",
    stats: "150K+ records · Top 0.1% national selection",
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/AmazonML_challange",
    privateNote: "",
  },
  {
    title: "Fabric Lakehouse Pipeline",
    meta: "2026",
    description:
      "Bronze → Silver → Gold medallion ETL on Microsoft Fabric, built while earning the DP-600 certification. Spark-based transformations, Power BI semantic model, and an executive dashboard on top of the Gold layer.",
    stats: "Lakehouse ETL · Power BI dashboard",
    liveUrl: "",
    repoUrl: "",
    privateNote: "",
  },
  {
    title: "Marketing Analytics Dashboard",
    meta: "2025",
    description:
      "Power BI dashboard turning 5,000+ campaign records into ROI decisions. Star-schema model with advanced DAX — ROAS, CPA, month-over-month growth, drill-through across Facebook, Google Ads, and LinkedIn.",
    stats: "5K+ campaign records · 3 ad channels",
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/Marketing-Analytics-Dashboard",
    privateNote: "",
  },
  {
    title: "Medical Triage RL Environment",
    meta: "2025",
    description:
      "OpenAI Gym-compatible environment simulating ER triage under resource constraints. Models patient arrival, severity scoring, and allocation; agents trained with Q-learning and PPO.",
    stats: "Open-source env · RL-compatible",
    liveUrl: "",
    repoUrl: "https://github.com/Abhiii47/medical-triage-env",
    privateNote: "",
  },
  {
    title: "SalesVision — Sales Analytics",
    meta: "2025",
    description:
      "Full-stack sales intelligence with live dashboards and forecasting. Real-time metrics, trend forecasting, and team performance tracking via REST API and Chart.js.",
    stats: "Live dashboards · Forecasting",
    liveUrl: "https://sales-vision-ten.vercel.app/",
    repoUrl: "https://github.com/Abhiii47/SalesVision",
    privateNote: "",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="space-y-8 py-16">
      <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
        03 Projects
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col justify-between rounded-2xl border border-border/60 bg-background/40 p-6"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {project.meta}
              </p>
              <h3 className="text-base font-medium text-foreground">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              {project.stats && <p>{project.stats}</p>}
              {project.privateNote && (
                <p className="italic">{project.privateNote}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="rounded-full bg-foreground px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-background"
                  >
                    Live ↗
                  </Link>
                )}
                {project.repoUrl && (
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    className="rounded-full border border-foreground/50 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-foreground"
                  >
                    GitHub
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
