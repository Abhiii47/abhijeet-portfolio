import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUpRight,
  Command,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  FileText,
  Copy,
  Check,
  X,
  Send,
  Layers,
  Lock,
  Fingerprint,
  Award,
  Printer,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Terminal,
  Cpu,
  Server,
  Cloud,
  Layout,
  Database,
  Code2,
  Zap,
  ShieldCheck,
  Activity,
  Box,
  GitBranch,
  Globe,
  BarChart3,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassFolder, { FolderFile } from '@/components/ui/glass-folder-cards';
import StickerSlapFooter from '@/components/ui/sticker-slap-footer';
import DoodleCrewFooter from '@/components/ui/doodle-crew-footer-sunny';
import PolaroidLineCarousel from '@/components/ui/polaroid-line-carousel';

/* ============================================================================
   ABHIJEET KADU — INTERACTIVE ENGINEERING PORTFOLIO (BENTO + TRANSIT ROUTE UI)
   ============================================================================ */

const EMAIL = 'abhijeetkadu85@gmail.com';
const GH = 'https://github.com/Abhiii47';
const LI = 'https://www.linkedin.com/in/abhijeet-kadu';

const PROJECTS = [
  {
    id: 'smart-resume',
    featured: true,
    categoryGroup: 'genai',
    tag: 'FLAGSHIP AI SPEC',
    category: 'Full-Stack AI · Intelligent Career Tooling',
    title: 'SmartResume — Hybrid ATS Resume Analyzer',
    summary:
      'AI resume evaluation platform that eliminates automated screening guesswork for job seekers. Combines a fast layout classifier trained on 50,000+ resumes with Gemini Pro for actionable, line-by-line feedback with zero score drift.',
    metrics: [
      { label: 'TRAINING DATA', val: '50,000+ Resumes' },
      { label: 'EVALUATION', val: '70% ML + 30% GenAI' },
      { label: 'LAYOUT PARSER', val: '8-Signal Engine' },
      { label: 'ANALYSIS SPEED', val: '140ms Instant' }
    ],
    tech: ['FastAPI', 'Python 3.11', 'XGBoost', 'Gemini Pro', 'Supabase Vector', 'React 18', 'TailwindCSS v4', 'Docker'],
    liveUrl: 'https://smart-resume-orcin.vercel.app/',
    githubUrl: 'https://github.com/Abhiii47/SmartResume',
    privateDeploy: '',
    architecture: {
      pipeline: [
        { step: '01. Document Ingestion', detail: 'PDFMiner extracts text layout trees, font hierarchies, & 8 structural signals.' },
        { step: '02. Quantitative Baseline (70%)', detail: 'Pre-trained XGBoost regressor scores formatting, keyword density, & career continuity.' },
        { step: '03. Semantic Alignment', detail: 'Supabase pgvector computes cosine similarity against target job description embeddings.' },
        { step: '04. Qualitative Critique (30%)', detail: 'Gemini Pro generates structured JSON suggestions for line-by-line resume rewrites.' }
      ],
      bottleneckSolved:
        'Eliminated inconsistent LLM grading and score drift by anchoring 70% of evaluation to a deterministic XGBoost classifier trained on 50k resumes, cutting structural analysis latency to 140ms.',
      codeSnippet: `# Hybrid 70/30 Scoring Pipeline (FastAPI)
def evaluate_candidate(pdf_bytes: bytes, jd_vector: list[float]) -> HybridScore:
    signals = extract_8_pdfminer_signals(pdf_bytes)
    quant_score = xgb_classifier.predict_proba([signals.to_vector()])[0][1] * 70.0
    qual_eval = gemini_pro.generate_structured_critique(signals.raw_text, jd_vector)
    return HybridScore(total=round(quant_score + (qual_eval.score * 0.30), 2), audit=qual_eval)`
    }
  },
  {
    id: 'ecovis-rag',
    featured: true,
    categoryGroup: 'genai',
    tag: 'ENTERPRISE SDE DEPLOYMENT',
    category: 'Enterprise AI · Secure Cloud Search',
    title: 'Ecovis RAG Assistant @ Ecovis RKCA',
    summary:
      'Private cloud search assistant built for tax and statutory audit teams at Ecovis RKCA. Indexes 150,000+ compliance documents with 100% verified citation grounding (0.0% hallucination) inside an isolated, audit-safe GCP perimeter.',
    metrics: [
      { label: 'P95 LATENCY', val: '2.8s Streaming' },
      { label: 'KNOWLEDGE BASE', val: '150,000+ Clauses' },
      { label: 'HALLUCINATIONS', val: '0.0% (100% Grounded)' },
      { label: 'DATA PRIVACY', val: 'Sandboxed GCP VPC' }
    ],
    tech: ['Google Cloud (GCP)', 'Vertex AI', 'Pinecone', 'FAISS', 'FastAPI SSE', 'VPC Controls'],
    liveUrl: '',
    githubUrl: '',
    privateDeploy: 'PRIVATE ENTERPRISE VPC · ECOVIS RKCA',
    architecture: {
      pipeline: [
        { step: '01. Document Chunking', detail: '150,000+ legal and tax clauses split with sliding-window semantic overlap.' },
        { step: '02. Hybrid Retrieval', detail: 'FAISS local hot-cache paired with Pinecone serverless vector index.' },
        { step: '03. Sandboxed Vertex AI', detail: 'Strict citation-grounded prompt executed inside GCP VPC Service Controls.' },
        { step: '04. FastAPI SSE Stream', detail: 'Real-time Server-Sent Events streaming tokens with verifiable clause citations.' }
      ],
      bottleneckSolved:
        'Prevented fabricated answers on statutory tax queries by enforcing strict pre-generation similarity thresholds (cosine >= 0.82) with mandatory paragraph-level citations inside sandboxed GCP VPC controls.',
      codeSnippet: `# Sandboxed Vertex AI Citation-Enforced RAG Stream
async def stream_statutory_rag(query: str, vpc_session: VPCSession):
    chunks = await hybrid_pinecone_faiss_search(query, top_k=5, min_score=0.82)
    if not chunks:
        yield SSEEvent(status="GROUNDING_HALT", msg="No verified statutory clause found.")
        return
    async for token in vertex_gemini.stream_grounded(query, context=chunks):
        yield SSEEvent(token=token, citations=[c.clause_id for c in chunks])`
    }
  },
  {
    id: 'pims-cloud',
    featured: false,
    categoryGroup: 'fullstack',
    tag: 'COMPANY PRODUCTION ERP',
    category: 'Company Production System · Multi-Branch Healthcare ERP',
    title: 'PIMS — Cloud Pharmacy Inventory & Billing Engine',
    summary:
      'Enterprise multi-branch pharmacy inventory and billing platform engineered and deployed as a company production system on GCP. Features automated First-Expired-First-Out (FEFO) batch dispensing, real-time stock sync across branches, and GST-compliant invoicing.',
    metrics: [
      { label: 'STOCK ALLOCATION', val: 'Automated FEFO' },
      { label: 'BRANCH SYNC', val: 'Real-Time Multi-Outlet' },
      { label: 'BILLING SPEED', val: '<5ms Atomic Locks' },
      { label: 'DEPLOYMENT', val: 'Company GCP Cluster' }
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Google Cloud (GCP)', 'React 18', 'Docker', 'Redis'],
    liveUrl: '',
    githubUrl: '',
    privateDeploy: 'COMPANY PRODUCTION SYSTEM · PRIVATE GCP',
    architecture: {
      pipeline: [
        { step: '01. Barcode Ingestion', detail: 'Ingests SKU, batch lot, manufacturing date, and expiry timestamp.' },
        { step: '02. FEFO Allocation Engine', detail: 'First-Expired-First-Out ACID transaction reserves stock across branches.' },
        { step: '03. Expiry Warning Radar', detail: 'Automated alerts trigger tiered discounts for aging medical stock.' },
        { step: '04. GST Invoice Generator', detail: 'Instant compliant tax ledger sync & branch reconciliation.' }
      ],
      bottleneckSolved:
        'Eliminated counter race conditions and prevented dispensing expired medicine by implementing PostgreSQL row-level locking (SELECT ... FOR UPDATE SKIP LOCKED) ordered strictly by earliest expiry date.',
      codeSnippet: `-- Atomic FEFO Batch Allocation Query (PostgreSQL)
SELECT batch_id, available_qty, expiry_date
FROM pharmacy_inventory_batches
WHERE medicine_sku = $1 AND branch_id = $2 AND available_qty > 0 AND expiry_date > CURRENT_DATE
ORDER BY expiry_date ASC
FOR UPDATE SKIP LOCKED LIMIT 1;`
    }
  },
  {
    id: 'room-food',
    featured: false,
    categoryGroup: 'fullstack',
    tag: 'HYPERLOCAL PLATFORM',
    category: 'Community Platform · Real-Time Web',
    title: 'Room and Food Finder',
    summary:
      'Hyperlocal platform connecting college students with verified room rentals and daily home-cooked meal subscriptions. Features instant student-to-host chat with under 45ms real-time message delivery.',
    metrics: [
      { label: 'MESSAGING SPEED', val: '<45ms Socket.io' },
      { label: 'VERIFIED LISTINGS', val: 'Rooms & Mess Kitchens' },
      { label: 'DEPLOYMENT', val: 'Docker CI/CD' },
      { label: 'AVAILABILITY', val: '99.9% Cloud Uptime' }
    ],
    tech: ['Next.js', 'React 18', 'Node.js', 'MongoDB', 'Socket.io', 'Docker CI/CD'],
    liveUrl: 'https://room-and-food.vercel.app/',
    githubUrl: 'https://github.com/Abhiii47/Room_and_Food',
    privateDeploy: '',
    architecture: {
      pipeline: [
        { step: '01. Geo-Indexed Search', detail: 'MongoDB 2dsphere spatial indexing for nearby rooms & mess kitchens.' },
        { step: '02. Real-Time Chat Bus', detail: 'Persistent WebSocket rooms for <45ms student-to-host negotiation.' },
        { step: '03. Role-Based Access', detail: 'Tailored permissions for students, landlords, and meal providers.' },
        { step: '04. Containerized CI/CD', detail: 'Automated container builds ensuring reliable, zero-downtime deployment.' }
      ],
      bottleneckSolved:
        'Kept chat latency under 45ms during high student search traffic by decoupling live Socket.io communication from database writes using an asynchronous write-behind persistence queue.',
      codeSnippet: `// Low-Latency Socket.io Room Dispatch (<45ms)
io.on('connection', (socket) => {
  socket.on('msg:send', async (payload) => {
    io.to(payload.listingRoomId).emit('msg:receive', { ...payload, ts: Date.now() });
    await messageQueue.enqueueAsyncWrite(payload); // Non-blocking DB persistence
  });
});`
    }
  },
  {
    id: 'amazon-ml',
    featured: false,
    categoryGroup: 'genai',
    tag: 'COMPETITIVE ML ENSEMBLE',
    category: 'Machine Learning · E-Commerce Intelligence',
    title: 'Amazon ML Challenge — Regression Ensemble',
    summary:
      'High-precision product demand and price forecasting ensemble built during the Amazon ML Summer School 2025. Analyzed 150,000+ noisy e-commerce product records, securing a top nationwide finish.',
    metrics: [
      { label: 'TRAINING DATA', val: '150,000+ Products' },
      { label: 'MODEL ENSEMBLE', val: 'XGB + LGBM + CatBoost' },
      { label: 'TUNING', val: 'Optuna Bayesian' },
      { label: 'STANDOUT FINISH', val: 'Top Nationwide Rank' }
    ],
    tech: ['Python 3.11', 'Scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'Pandas', 'Optuna'],
    liveUrl: '',
    githubUrl: 'https://github.com/Abhiii47/AmazonML_challange',
    privateDeploy: '',
    architecture: {
      pipeline: [
        { step: '01. Target Encoding', detail: '5-fold smoothed target encoding on high-cardinality product categories.' },
        { step: '02. Base Learners', detail: 'Diverse XGBoost, LightGBM, and CatBoost gradient boosted regressors.' },
        { step: '03. Bayesian Tuning', detail: '100+ Optuna trials minimizing Root Mean Squared Log Error (RMSLE).' },
        { step: '04. Stacking Meta-Learner', detail: 'Ridge regression model blending out-of-fold predictions to prevent overfitting.' }
      ],
      bottleneckSolved:
        'Prevented target leakage across 150,000 noisy e-commerce product listings by implementing out-of-fold target encoding with empirical Bayes smoothing, boosting generalization on unseen test records.',
      codeSnippet: `# Level-2 Stacked Ensemble Blender
oof_stack = np.column_stack([xgb_oof_preds, lgbm_oof_preds, cat_oof_preds])
meta_ridge = RidgeCV(alphas=np.logspace(-3, 3, 25)).fit(oof_stack, y_train_log)
final_predictions = np.expm1(meta_ridge.predict(test_stack))`
    }
  }
];

const SKILLS_GRID = [
  // Languages & Core (5)
  { name: 'Python 3.11', category: 'Languages & Core', categoryTag: 'Core', tag: 'AI & High-Perf API', highlight: 'FastAPI, PySpark, ML Ensembles', metric: 'Primary Runtime', icon: Terminal, group: 'core' },
  { name: 'C++17 (STL)', category: 'Languages & Core', categoryTag: 'Core', tag: 'Algorithms & Complexity', highlight: 'Graph Theory, DP, Memory Model', metric: '400+ DSA Solved', icon: Code2, group: 'core' },
  { name: 'PostgreSQL', category: 'Languages & Core', categoryTag: 'Core', tag: 'ACID Storage Engine', highlight: 'Row-Level Locks, FEFO Ingestion', metric: '<5ms Lock Latency', icon: Database, group: 'core' },
  { name: 'TypeScript', category: 'Languages & Core', categoryTag: 'Core', tag: 'Strict Web Architecture', highlight: 'React 18, Next.js, Strict Typings', metric: 'Type-Safe Systems', icon: FileText, group: 'core' },
  { name: 'Bash & Linux', category: 'Languages & Core', categoryTag: 'Core', tag: 'POSIX Environment', highlight: 'Shell Scripting, Cron, Systemd', metric: 'POSIX Automation', icon: Terminal, group: 'core' },

  // AI & ML Systems (5)
  { name: 'Vertex AI & Gemini', category: 'AI & ML Systems', categoryTag: 'AI / ML', tag: 'GenAI Inference', highlight: 'Grounded Citation Synthesis', metric: '0.0% Hallucinations', icon: Sparkles, group: 'ai' },
  { name: 'XGBoost & LightGBM', category: 'AI & ML Systems', categoryTag: 'AI / ML', tag: 'Tabular Predictive ML', highlight: 'Empirical Bayes Smooth Ensembles', metric: '50k+ Resumes Trained', icon: Activity, group: 'ai' },
  { name: 'Pinecone & FAISS', category: 'AI & ML Systems', categoryTag: 'AI / ML', tag: 'Vector Search Index', highlight: 'Hybrid Dense & Sparse Indexing', metric: '150,000+ Chunks', icon: Layers, group: 'ai' },
  { name: 'LangChain & RAG', category: 'AI & ML Systems', categoryTag: 'AI / ML', tag: 'Orchestration Pipelines', highlight: 'Retrieval Quality & Grounding Gates', metric: 'Sub-2.8s Streaming', icon: ShieldCheck, group: 'ai' },
  { name: 'Scikit & Optuna', category: 'AI & ML Systems', categoryTag: 'AI / ML', tag: 'Hyperparameter Search', highlight: 'Bayesian Hyperparameter Search', metric: 'Top National Finish', icon: Cpu, group: 'ai' },

  // Backend & Streaming (5)
  { name: 'FastAPI (Async)', category: 'Backend & Streaming', categoryTag: 'Backend', tag: 'Async Microservices', highlight: 'Non-blocking I/O & Event Loops', metric: '140ms ATS Screen', icon: Zap, group: 'backend' },
  { name: 'SSE Streaming', category: 'Backend & Streaming', categoryTag: 'Backend', tag: 'Real-Time Telemetry', highlight: 'Server-Sent Events Token Streams', metric: 'Live Citation Feed', icon: Activity, group: 'backend' },
  { name: 'Node.js & Express', category: 'Backend & Streaming', categoryTag: 'Backend', tag: 'REST Service Layer', highlight: 'Asynchronous Service Handlers', metric: 'Microservices', icon: Server, group: 'backend' },
  { name: 'Socket.io', category: 'Backend & Streaming', categoryTag: 'Backend', tag: 'Bidirectional Bus', highlight: 'Decoupled Write-Behind Queue', metric: '<45ms Message Bus', icon: Globe, group: 'backend' },
  { name: 'SQLAlchemy 2.0', category: 'Backend & Streaming', categoryTag: 'Backend', tag: 'ORM Engine', highlight: 'Index-Driven Eager Loading', metric: 'Zero N+1 Queries', icon: Database, group: 'backend' },

  // Cloud & Lakehouse (5)
  { name: 'Google Cloud (GCP)', category: 'Cloud & Lakehouse', categoryTag: 'Cloud', tag: 'Enterprise Perimeter', highlight: 'Sandboxed VPC Service Controls', metric: 'Enterprise Isolated', icon: Cloud, group: 'cloud' },
  { name: 'Microsoft Fabric', category: 'Cloud & Lakehouse', categoryTag: 'Cloud', tag: 'Certified Lakehouse', highlight: 'Medallion Lakehouse & Direct Lake', metric: 'Associate (DP-600)', icon: Award, group: 'cloud' },
  { name: 'PySpark & Delta', category: 'Cloud & Lakehouse', categoryTag: 'Cloud', tag: 'Distributed Analytics', highlight: 'Distributed Batch ETL Pipelines', metric: 'Lakehouse Storage', icon: Zap, group: 'cloud' },
  { name: 'Supabase pgvector', category: 'Cloud & Lakehouse', categoryTag: 'Cloud', tag: 'Managed Embeddings', highlight: 'PostgreSQL Vector Extension', metric: 'Cosine Distance Index', icon: Database, group: 'cloud' },
  { name: 'Docker & CI/CD', category: 'Cloud & Lakehouse', categoryTag: 'Cloud', tag: 'Container Lifecycle', highlight: 'Multi-stage Production Builds', metric: 'Containerized Deploy', icon: Box, group: 'cloud' },

  // Frontend & Analytics (4)
  { name: 'React 18 & Next.js', category: 'Frontend & Analytics', categoryTag: 'Frontend', tag: 'App Shell & SSR', highlight: 'Concurrent Mode, SSR & Hydration', metric: 'Fluid Interfaces', icon: Layout, group: 'frontend' },
  { name: 'Tailwind CSS', category: 'Frontend & Analytics', categoryTag: 'Frontend', tag: 'Design System', highlight: 'Tailwind Semantic Design Systems', metric: 'Responsive UI Spec', icon: Sparkles, group: 'frontend' },
  { name: 'WCAG Accessibility', category: 'Frontend & Analytics', categoryTag: 'Frontend', tag: 'A11y Standard', highlight: 'Keyboard Nav & ARIA Semantics', metric: 'OFL PR #5312', icon: CheckCircle2, group: 'frontend' },
  { name: 'Power BI & DAX', category: 'Frontend & Analytics', categoryTag: 'Analytics', tag: 'BI Analytics & Dashboards', highlight: 'Direct Lake Modeling & Dashboards', metric: 'Executive Visuals', icon: BarChart3, group: 'frontend' }
];

const ARCH_PRINCIPLES = [
  {
    idx: '01',
    eyebrow: 'TEAM SPRINT · SMARTRESUME',
    title: 'How our 3-person team divided resume chaos and shipped.',
    problem:
      'When early tests with pure LLMs hallucinated grading criteria and choked on speed, our 3-person team divided the stack. One built the fast PDF layout parser, one trained the classifier, and I wired the hybrid pipeline. Combining 70% deterministic ML with 30% Gemini qualitative advice let us ship a 140ms engine processing 50k+ resumes without score drift.',
    metric: '50,000+ Resumes Shipped · 3-Person Team Sprint',
    source: 'SMARTRESUME ATS',
    productionRule: 'Divide the Stack, Anchor the Baseline',
    detail:
      'The turning point came when our team stopped asking the LLM to calculate a score baseline. By giving each teammate clear ownership across parsing, ML classification, and API streaming, we moved three times faster and delivered a product candidates trust.',
    guarantee: 'Clear team ownership + deterministic baselines beat fragile single-prompt systems every time.'
  },
  {
    idx: '02',
    eyebrow: '48-HOUR HACKATHON · AMAZON ML CHALLENGE',
    title: 'Cracking product demand forecasting in a 2-day sprint.',
    problem:
      'Faced with 150,000 noisy product listings and a 48-hour clock, we turned our room into an agile war room. We ran rapid 15-minute validation sprints, immediately tossing out any idea that did not improve the score. In two sleepless days, our team blended XGBoost, LightGBM, and CatBoost to secure a top nationwide finish.',
    metric: 'Top Nationwide Finish · 48-Hour Hackathon',
    source: 'AMAZON ML SUMMER SCHOOL',
    productionRule: 'Ruthless 15-Minute Validation Loops',
    detail:
      'Under intense hackathon clocks, communication beats complexity. We maintained a shared live error log, automated test evaluations so nobody guessed, and trusted each other’s model tuning. Blending our three learners in the final sprint hours dropped our error rate right at the deadline.',
    guarantee: 'In a 48-hour sprint, tight team coordination and rapid validation loops beat complicated theory.'
  },
  {
    idx: '03',
    eyebrow: 'COMPANY PRODUCTION ROLLOUT · PIMS CLOUD ERP',
    title: 'Shipping a company ERP where a bug means real loss.',
    problem:
      'Rolling out across multi-branch pharmacies meant live counters were billing simultaneous orders, creating an immediate danger of double-selling the same medicine batch. We engineered row-level database locks around earliest expiry dates (FEFO), eliminating double-dispensing and saving ₹52,000 in monthly expired stock.',
    metric: 'Zero Double-Dispensing · Company Rollout',
    source: 'PIMS CLOUD PHARMACY ERP',
    productionRule: 'Real Stakes Demand Database Integrity',
    detail:
      'Building a company ERP teaches you humility: cashiers have spotty Wi-Fi, customers wait in lines, and tax authorities audit every bill. Solving concurrency at the PostgreSQL engine level rather than fragile frontend checks kept the company running smoothly across every branch.',
    guarantee: 'In company deployments, mission-critical guarantees must live in database locks, not optimistic UI code.'
  }
];

const OSS_CONTRIBUTIONS = [
  {
    id: 'tensorflow',
    repo: 'Google TensorFlow',
    prLabel: 'GOOGLE TENSORFLOW · XLA COMPILER',
    impact: 'Compiler Memory Leak Fix',
    title: 'TensorFlow XLA — Compiler Scoped Memory Cleanup',
    summary:
      'Identified and fixed an unreleased buffer lifecycle issue in Google TensorFlow’s XLA compiler, preventing memory leakage during heavy neural network compilation.',
    beforeLine: '- if (allocation->memory_space() == MemorySpace::kTemp) { ... }',
    afterLine: '+ if (allocation != nullptr && allocation->is_scoped_allocation()) collector->Release(chunk);',
    url: 'https://github.com/tensorflow/tensorflow/pulls?q=author%3AAbhiii47'
  },
  {
    id: 'mlflow',
    repo: 'MLflow (Linux Foundation)',
    prLabel: 'MLFLOW · LINUX FOUNDATION',
    impact: 'Eliminated Redundant Re-Renders',
    title: 'MLflow Model Registry — UI Performance Refactor',
    summary:
      'Refactored model version table filtering and memoized state normalization in MLflow, preventing redundant re-renders across large experiment registries.',
    beforeLine: '- const renderActive = () => this.props.versions.filter(v => v.status === "READY");',
    afterLine: '+ const activeVersions = useMemo(() => versions.filter(v => v.current_stage !== "Archived"), [versions]);',
    url: 'https://github.com/mlflow/mlflow/pull/19820'
  },
  {
    id: 'ofl',
    repo: 'Open Fixture Library',
    prLabel: 'OPEN FIXTURE LIBRARY · ACCESSIBILITY',
    impact: '100% WCAG Compliance',
    title: 'Accessible Form Architecture & Keyboard Navigation',
    summary:
      'Engineered reusable, accessible form input controls with deterministic ARIA error bindings and full keyboard navigation for assistive technologies.',
    beforeLine: '- <label>{{ label }} <input :name="name" /></label>',
    afterLine: '+ <label :for="id">{{ label }}</label><input :id="id" :aria-describedby="hintId" />',
    url: 'https://github.com/OpenLightingProject/open-fixture-library/pull/5312'
  }
];

/* POLAROID INTERACTIVE JOURNEY MILESTONES */
const JOURNEY_SLIDES = [
  {
    image: '/images/journey/01_sanjivani.jpg',
    title: 'Sanjivani College (2022–2026)',
    caption: 'B.Tech in Computer Engineering · 400+ C++ algorithmic problems solved & community platforms built.',
    palette: 'dawn' as const,
    seed: 1
  },
  {
    image: '/images/journey/02_amazon_ml.jpg',
    title: 'Amazon ML Summer School',
    caption: 'Selected nationwide for applied ML training under Amazon scientists · Demand forecasting on 150k+ items.',
    palette: 'alpine' as const,
    seed: 2
  },
  {
    image: '/images/journey/03_patent.jpg',
    title: 'Patent Granted (#458179-001)',
    caption: 'Official Indian Design Patent granted for hardware-to-cloud inventory telemetry and automated clearance.',
    palette: 'dusk' as const,
    seed: 3
  },
  {
    image: '/images/journey/04_ecovis_rag.jpg',
    title: 'Software Engineer @ Ecovis RKCA',
    caption: 'Enterprise AI & Cloud Platforms · P95 2.8s private cloud RAG indexing 150k+ clauses with 0.0% hallucination.',
    palette: 'mist' as const,
    seed: 4
  },
  {
    image: '/images/journey/05_microsoft_fabric.jpg',
    title: 'Microsoft Fabric DP-600',
    caption: 'Certified Fabric Analytics Engineer Associate · Enterprise data lakehouses, Delta Parquet & analytics.',
    palette: 'alpine' as const,
    seed: 5
  },
  {
    image: '/images/journey/06_tensorflow_oss.jpg',
    title: 'Google TensorFlow & Upstream OSS',
    caption: 'Contributed upstream memory fixes to Google TensorFlow, MLflow UI state (#19820), & OFL accessibility (#5312).',
    palette: 'dawn' as const,
    seed: 6
  }
];



const HERO_STEPS = [
  {
    idx: '01',
    title: 'Understand the human',
    tag: 'PROBLEM FRAMING',
    headline: 'Start where the workflow breaks.',
    detail:
      'Whether it is a job candidate rejected by opaque resume screening or a tax auditor verifying statutory compliance clauses, every architecture starts with human trust, speed, and clarity.',
    metric: '50,000+ resumes & 150k+ legal clauses studied'
  },
  {
    idx: '02',
    title: 'Engineer the system',
    tag: 'RELIABILITY & ARCHITECTURE',
    headline: 'Pair proven software engineering with modern AI.',
    detail:
      'Generative AI is powerful, but production software requires guardrails. I anchor LLMs to verifiable data sources, deterministic classifiers, and private cloud perimeters so systems never hallucinate in production.',
    metric: '0.0% Hallucinations · Sub-3s Enterprise P95'
  },
  {
    idx: '03',
    title: 'Ship. Learn. Repeat.',
    tag: 'MEASURABLE OUTCOMES',
    headline: 'Measure real user value and performance.',
    detail:
      'From sub-2.8s private cloud search for tax auditors to fixing compiler memory leaks in Google TensorFlow, systems are refined against real-world bottlenecks, not theoretical benchmarks.',
    metric: '<2.8s Streaming · 140ms ATS Scoring · <45ms Socket'
  }
];

const FIT = [
  [
    'AI / ML Systems Engineering',
    'Production RAG, hybrid retrieval, citation verification, and calibrated tabular/LLM ensembles with deterministic latency.'
  ],
  [
    'Backend & Cloud Platform',
    'FastAPI SSE streaming, SQLAlchemy query plan optimization, isolated GCP VPC architectures, and Dockerized microservices.'
  ],
  [
    'Product-Minded Full-Stack',
    'React 18 & TypeScript through PostgreSQL and Socket.io. Real-time marketplaces, multimodal FinTech flows, and patented ERP interfaces.'
  ]
];

const SEC = [
  ['work', 'Work'],
  ['skills', 'Toolkit'],
  ['approach', 'Stories'],
  ['oss', 'Open Source'],
  ['journey', 'Trajectory'],
  ['contact', 'Contact']
];

interface StatItem {
  val: string;
  title: string;
  detail: string;
}

const STATS: StatItem[] = [
  { val: 'P95 2.8s', title: 'Enterprise RAG', detail: '150k chunks · Private GCP VPC' },
  { val: '50,000+', title: 'SmartResume Engine', detail: '70% ML + 30% Gemini in 140ms' },
  { val: '3 Upstream PRs', title: 'Open-Source Systems', detail: 'Google TensorFlow · MLflow · OFL' },
  { val: 'DP-600', title: 'Microsoft Fabric', detail: 'Certified Analytics Engineer' },
  { val: '#458179-001', title: 'Registered Patent', detail: 'Granted IP · Govt. of India' },
  { val: '400+ Solved', title: 'C++ Algorithmic Core', detail: 'Data structures & systems design' }
];

const PILLAR_BG = ['#FFE600', '#00E070', '#1530FF', '#FF3366', '#14151A'];

const BRIEF = [
  [
    'EXPERIENCE',
    'Software Development Engineer @ Ecovis RKCA (Feb 2026–Present): Architected Enterprise RAG (150k+ clauses, Pinecone/FAISS, GCP VPC, P95 2.8s streaming) and the PIMS Multi-Branch Pharmacy Cloud ERP company deployment.'
  ],
  [
    'INTELLECTUAL PROPERTY & CERTS',
    'Registered Indian Design Patent #458179-001 (Smart Inventory System, Govt. of India) · Microsoft Certified Fabric Analytics Engineer Associate (DP-600, Feb 2026) · Amazon ML Summer School Scholar 2025.'
  ],
  [
    'OPEN SOURCE',
    'Google TensorFlow (XLA Compiler Memory Fix) · MLflow (PR #19820 UI Performance) · Open Fixture Library (PR #5312 WCAG Accessibility).'
  ],
  [
    'FLAGSHIP BUILDS',
    'SmartResume (50k resumes, 70% ML + 30% Gemini Pro, 140ms analysis) · Room & Food Marketplace (<45ms real-time chat) · Amazon ML Price Forecasting Ensemble · PIMS Cloud Pharmacy ERP.'
  ],
  [
    'CORE STACK',
    'Python 3.11 · C++17 (400+ DSA) · FastAPI (SSE) · React 18 / Next.js · TypeScript · PostgreSQL · Google Cloud (VPC / Vertex AI) · PySpark & Delta Lake · Docker.'
  ]
];





const Lbl = ({ children, style }: any) => (
  <span className="m" style={style}>
    {children}
  </span>
);
const Ext = ({ href, children, onClick }: any) => (
  <a className="btn g" href={href} target="_blank" rel="noreferrer" onClick={onClick}>
    {children}
    <ArrowUpRight size={13} />
  </a>
);
const Pills = ({ items }: { items: string[] }) => (
  <div>
    {items.map((t) => (
      <span key={t} className="pill">
        {t}
      </span>
    ))}
  </div>
);

/* BESPOKE ARCHITECTURE PREVIEW CARDS (High-Density Engineering Telemetry) */
function BentoVisual({ id }: { id: string }) {
  if (id === 'smart-resume') {
    return (
      <div className="bento-vis" style={{ background: '#0B0D17', color: '#F4F1EA', border: '1px solid #1E2338' }}>
        <div className="row">
          <Lbl style={{ color: '#93C5FD' }}>HYBRID DUAL-ENGINE PIPELINE</Lbl>
          <Lbl style={{ color: '#00E070' }}>140MS END-TO-END</Lbl>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
          <div className="row" style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Dual-Pass Scoring Pipeline</span>
            <span className="m" style={{ color: '#FFE600' }}>0 SCORE DRIFT</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(244,241,234,0.7)', margin: '0 0 10px' }}>
            Decoupled deterministic structural extraction from LLM qualitative critique.
          </p>
          <div className="bar" style={{ marginTop: 6 }}>
            <b style={{ background: '#1530FF', color: '#fff', flex: 70 }}>70% XGBoost Classifier (42ms)</b>
            <u style={{ background: '#FFE600', color: '#111', flex: 30 }}>30% Gemini Pro (98ms)</u>
          </div>
        </div>
        <div className="row" style={{ fontSize: 11 }}>
          <span className="m" style={{ color: '#93C5FD' }}>SUPABASE PGVECTOR (HNSW COSINE)</span>
          <span className="m" style={{ color: '#A0AEC0' }}>50,000+ RESUMES PROCESSED</span>
        </div>
      </div>
    );
  }

  if (id === 'ecovis-rag') {
    return (
      <div className="bento-vis" style={{ background: '#090B14', color: '#F4F1EA', border: '1px solid #1C2237' }}>
        <div className="row">
          <Lbl style={{ color: '#93C5FD' }}>SANDBOXED GCP VPC SERVICE CONTROLS</Lbl>
          <Lbl style={{ color: '#00E070' }}>0.0% HALLUCINATION</Lbl>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 14px' }}>
          <div className="row" style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#FFE600' }}>VPC Security Perimeter · Zero Public Egress</span>
            <span className="m" style={{ color: '#FF4D4D' }}>GATEWAY: 403 BLOCKED</span>
          </div>
          <div className="pipe">
            <div>
              <span style={{ color: '#93C5FD', fontWeight: 600 }}>01 Ingestion</span>
              <br />
              <span className="m" style={{ color: 'rgba(255,255,255,0.6)' }}>150k Statutory Chunks</span>
            </div>
            <div className="on" style={{ background: '#1530FF', borderColor: '#fff' }}>
              <span style={{ color: '#FFE600', fontWeight: 600 }}>02 Gate</span>
              <br />
              <span className="m" style={{ color: '#fff' }}>Cosine &ge; 0.82 Strict</span>
            </div>
            <div>
              <span style={{ color: '#00E070', fontWeight: 600 }}>03 Stream</span>
              <br />
              <span className="m" style={{ color: 'rgba(255,255,255,0.6)' }}>FastAPI SSE Tokens</span>
            </div>
          </div>
        </div>
        <div className="row">
          <b style={{ fontSize: '1.2rem', color: '#FFE600', fontWeight: 600 }}>P95 2.8s</b>
          <span className="m" style={{ color: 'rgba(255,255,255,0.7)' }}>VERTEX AI · MANDATORY CITATIONS</span>
        </div>
      </div>
    );
  }

  if (id === 'pims-cloud') {
    return (
      <div className="bento-vis" style={{ background: '#0B0D17', color: '#F4F1EA', border: '1px solid #1E2338' }}>
        <div className="row">
          <Lbl style={{ color: '#93C5FD' }}>MULTI-BRANCH CLOUD ERP</Lbl>
          <Lbl style={{ color: '#FFE600' }}>ACID FEFO LEDGER</Lbl>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 12px' }}>
          <table className="fefo" style={{ width: '100%' }}>
            <thead>
              <tr style={{ color: 'rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '4px 6px' }}>BATCH LOT</th>
                <th style={{ padding: '4px 6px' }}>EXPIRY</th>
                <th style={{ padding: '4px 6px' }}>CONCURRENCY LOCK</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: 'rgba(255, 230, 0, 0.15)', color: '#FFE600' }}>
                <td style={{ padding: '5px 6px', fontWeight: 600 }}>#MED-904A</td>
                <td style={{ padding: '5px 6px' }}>14 DAYS</td>
                <td style={{ padding: '5px 6px' }}>LOCKED: WORKER-02</td>
              </tr>
              <tr style={{ color: 'rgba(255,255,255,0.8)' }}>
                <td style={{ padding: '5px 6px' }}>#MED-918C</td>
                <td style={{ padding: '5px 6px' }}>88 DAYS</td>
                <td style={{ padding: '5px 6px', color: '#93C5FD' }}>QUEUED (SKIP LOCKED)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <span className="m" style={{ color: '#00E070' }}>POSTGRESQL FOR UPDATE SKIP LOCKED</span>
          <span className="m" style={{ color: '#A0AEC0' }}>0 RACE CONDITIONS</span>
        </div>
      </div>
    );
  }

  if (id === 'room-food') {
    return (
      <div className="bento-vis" style={{ background: '#0B0D17', color: '#F4F1EA', border: '1px solid #1E2338' }}>
        <div className="row">
          <Lbl style={{ color: '#93C5FD' }}>MONGODB 2DSPHERE GEO-SPATIAL</Lbl>
          <Lbl style={{ color: '#00E070' }}>SOCKET.IO BUS</Lbl>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 14px' }}>
          <div className="row" style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Student ↔ Host Real-Time Channel</span>
            <span className="m" style={{ color: '#00E070' }}>&lt;45MS RTT</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(244,241,234,0.7)', margin: 0, lineHeight: 1.5 }}>
            Decoupled real-time WebSocket state from Mongo write buffer to prevent UI blocking under surge traffic.
          </p>
        </div>
        <div className="row">
          <span className="m" style={{ color: '#93C5FD' }}>2.5KM PROXIMITY CLUSTER</span>
          <span className="m" style={{ color: '#FFE600' }}>VERIFIED HOUSING &amp; KITCHENS</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bento-vis" style={{ background: '#0B0D17', color: '#F4F1EA', border: '1px solid #1E2338' }}>
      <div className="row">
        <Lbl style={{ color: '#FFE600' }}>LEVEL-2 STACKED REGRESSION ENSEMBLE</Lbl>
        <Lbl style={{ color: '#93C5FD' }}>150,000+ PRODUCTS</Lbl>
      </div>
      <div className="pipe">
        <div>
          <span style={{ color: '#93C5FD', fontWeight: 600 }}>XGBoost</span>
          <br />
          <span className="m" style={{ color: 'rgba(255,255,255,0.6)' }}>RMSLE 0.184</span>
        </div>
        <div>
          <span style={{ color: '#93C5FD', fontWeight: 600 }}>LightGBM</span>
          <br />
          <span className="m" style={{ color: 'rgba(255,255,255,0.6)' }}>RMSLE 0.187</span>
        </div>
        <div className="on" style={{ background: '#1530FF', borderColor: '#fff' }}>
          <span style={{ color: '#FFE600', fontWeight: 600 }}>CatBoost</span>
          <br />
          <span className="m" style={{ color: '#fff' }}>Bayesian Target Enc</span>
        </div>
      </div>
      <div className="row">
        <span className="m" style={{ color: '#00E070' }}>RIDGE META-REGRESSOR BLENDER</span>
        <span className="m" style={{ color: '#FFE600' }}>TOP NATIONWIDE FINISH</span>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [sound, setSound] = useState(true);
  const [filter, setFilter] = useState('all');
  const [workView, setWorkView] = useState<'folders' | 'bento'>('folders');
  const [skillFilter, setSkillFilter] = useState('all');
  const [arch, setArch] = useState<any>(null);
  const [heroStep, setHeroStep] = useState(1);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [ossIdx, setOssIdx] = useState(0);
  const [cmd, setCmd] = useState(false);
  const [brief, setBrief] = useState(false);
  const [copied, setCopied] = useState('');
  const [topic, setTopic] = useState(FIT[0][0]);
  const [folderWidth, setFolderWidth] = useState(430);
  const audio = useRef<AudioContext | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 520) {
        setFolderWidth(320);
      } else if (window.innerWidth < 768) {
        setFolderWidth(360);
      } else if (window.innerWidth < 1120) {
        setFolderWidth(390);
      } else {
        setFolderWidth(430);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const click = useCallback(
    (f = 520, d = 0.028) => {
      if (!sound) return;
      try {
        const C = window.AudioContext || (window as any).webkitAudioContext;
        audio.current = audio.current || new C();
        const c = audio.current;
        if (c.state === 'suspended') c.resume();
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, c.currentTime);
        o.frequency.exponentialRampToValueAtTime(140, c.currentTime + d);
        g.gain.setValueAtTime(0.035, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d);
        o.connect(g);
        g.connect(c.destination);
        o.start();
        o.stop(c.currentTime + d);
      } catch { }
    },
    [sound]
  );

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmd((p) => !p);
      } else if (e.key === 'Escape') {
        setCmd(false);
        setArch(null);
        setBrief(false);
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.setProperty('--mx', e.clientX + 48 + 'px');
      el.style.setProperty('--my', e.clientY + window.scrollY + 48 + 'px');
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const go = (id: string) => {
    click();
    setCmd(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copy = (txt: string, k: string) => {
    click(720, 0.04);
    navigator.clipboard?.writeText(txt);
    setCopied(k);
    setTimeout(() => setCopied(''), 2200);
  };

  const briefText =
    `ABHIJEET KADU — Software Development Engineer & ML Engineer\n${EMAIL} · ${GH} · ${LI}\n\n` +
    BRIEF.map(([a, b]) => `• ${a}: ${b}`).join('\n');

  const projects = PROJECTS.filter((p) => filter === 'all' || p.categoryGroup === filter);
  const visibleSkills = SKILLS_GRID.filter((s) => skillFilter === 'all' || s.group === skillFilter);

  const Head = ({ no, label, right, eyebrow, tag, title, description }: any) => {
    const topLabel = eyebrow || (no ? `${no} / ${label}` : label);
    const topTag = tag || right;
    return (
      <div style={{ marginBottom: 28 }}>
        <div className="row" style={{ marginBottom: 8 }}>
          <Lbl>{topLabel}</Lbl>
          {topTag && <Lbl>{topTag}</Lbl>}
        </div>
        <h2 style={{ margin: '0 0 8px' }}>{title}</h2>
        {description && (
          <p className="mut sec-desc" style={{ fontSize: 14, maxWidth: 640, margin: '8px 0 0', lineHeight: 1.6 }}>
            {description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div ref={root} className={`fx ${dark ? 'dk' : ''}`}>
      <div className="amb">
        <i />
        <i />
      </div>

      {/* FULL-WIDTH STICKY FROSTED NAVBAR */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div style={{ gap: 12, display: 'flex', alignItems: 'center' }}>
            <a
              className="logo"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <i>AK</i> <span>Abhijeet Kadu</span>
            </a>
          </div>

          <div className="nav-pills">
            {SEC.map(([id, l]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(id);
                }}
              >
                {l}
              </a>
            ))}
          </div>

          <div style={{ gap: 8, display: 'flex', alignItems: 'center' }}>
            <a
              className="ctl ctl-social"
              href={LI}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile"
            >
              <span>LinkedIn</span>
            </a>
            <a
              className="ctl ctl-social"
              href={GH}
              target="_blank"
              rel="noreferrer"
              title="GitHub (@Abhiii47)"
            >
              <span>GitHub</span>
            </a>
            <button
              className="dossier-btn"
              onClick={() => {
                click();
                setBrief(true);
              }}
              title="1-Page Executive Dossier"
            >
              <FileText size={12} />
              <span>DOSSIER</span>
            </button>
            <button className="ctl" onClick={() => setCmd(true)} title="Command menu (⌘K)">
              <Command size={12} />
              <span>K</span>
            </button>
            <button
              className="ctl"
              onClick={() => setSound((s) => !s)}
              aria-label={sound ? "Disable tactile audio" : "Enable tactile audio"}
              aria-pressed={sound}
              title="Toggle audio feedback"
            >
              {sound ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
            <button
              className="ctl"
              onClick={() => {
                click(540);
                setDark((d) => !d);
              }}
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              title="Switch Paper / Night Ink"
            >
              {dark ? <Sun size={12} /> : <Moon size={12} />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION — INTERACTIVE STICKER SLAP STUDIO */}
      <section id="top" className="w-full" style={{ position: 'relative', width: '100%', marginBottom: 'clamp(28px, 4vw, 56px)' }}>
        <StickerSlapFooter
          wordmark="Abhijeet"
          homeHref="#top"
          navLabel=""
          navHref=""
          chatHref=""
          chatLabel=""
          jobsLabel="open to roles?"
          jobs={[
            { title: "software development engineer", href: "#work" },
            { title: "full-stack ai & platform", href: "#work" },
            { title: "genai & cloud systems", href: "#work" }
          ]}
          officeLabel="location & base"
          address={[
            "navi mumbai & pune",
            "maharashtra, india"
          ]}
          mapLabel="Google Maps"
          mapHref="https://maps.google.com/?q=Navi+Mumbai,+Maharashtra,+India"
          contactLabel="contact"
          email={EMAIL}
          copiedLabel="copied, talk soon!"
          note="*sde @ ecovis rkca · indian patent #458179-001 (design) · microsoft fabric certified (dp-600). open to global roles."
          socials={[
            { kind: "linkedin", href: LI, label: "LinkedIn" },
            { kind: "github", href: GH, label: "GitHub" }
          ]}
          stickers={[]}
          credits={[
            { role: "software development engineer", name: "abhijeet kadu" },
            { role: "intellectual property", name: "patent #458179-001 (govt. of india)" },
            { role: "cloud certification", name: "microsoft fabric dp-600" },
            { role: "open-source contributions", name: "google tensorflow · mlflow" }
          ]}
          height="100svh"
          wordmarkMaxHeight="42svh"
          paper="#f1ece4"
          panel="#4a6cf0"
          ink="#141414"
          cream="#f1ece4"
          accent="#ff6a2b"
          logoHeight="clamp(66px, 7.8cqw, 108px)"
        />
      </section>

      <div className="w">

        {/* SYSTEMS PROVENANCE LEDGER */}
        <div className="stats-ledger" role="region" aria-label="Systems telemetry and provenance ledger">
          {STATS.map((s) => (
            <div key={s.title} className="stat-card">
              <div className="stat-val">{s.val}</div>
              <div className="stat-title">{s.title}</div>
              <div className="stat-detail">{s.detail}</div>
            </div>
          ))}
        </div>

        {/* SELECTED WORK */}
        <section id="work" className="sec">
          <Head
            eyebrow="SELECTED SYSTEMS & DOSSIERS"
            tag={`${PROJECTS.length} PRODUCTION & RESEARCH DEPLOYMENTS`}
            title={
              <>
                Interactive Systems. <strong>Shipped Dossiers.</strong>
              </>
            }
            description="Production-grade AI architectures, high-concurrency cloud ERPs, and competitive ML pipelines drawn as physical 3D frosted-glass objects. Hover to lean the glass, click to open folders, and click any file to inspect its full architecture specification."
          />

          {/* View Mode & Filter Controls */}
          <div className="row" style={{ justifyContent: 'space-between', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
              <button
                className={`chip ${workView === 'folders' ? 'on' : ''}`}
                onClick={() => {
                  click(560, 0.02);
                  setWorkView('folders');
                }}
                style={{ fontWeight: 600 }}
              >
                🗂️ 3D Glass Folders (Interactive)
              </button>
              <button
                className={`chip ${workView === 'bento' ? 'on' : ''}`}
                onClick={() => {
                  click(560, 0.02);
                  setWorkView('bento');
                }}
                style={{ fontWeight: 600 }}
              >
                📊 Expanded System Specs
              </button>
            </div>

            {workView === 'bento' && (
              <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                {[
                  ['all', `All Systems (${PROJECTS.length})`],
                  ['genai', `GenAI & ML (${PROJECTS.filter((p) => p.categoryGroup === 'genai').length})`],
                  ['fullstack', `Cloud ERP (${PROJECTS.filter((p) => p.categoryGroup === 'fullstack').length})`]
                ].map(([k, l]) => (
                  <button
                    key={k}
                    className={`chip ${filter === k ? 'on' : ''}`}
                    onClick={() => {
                      click(550, 0.02);
                      setFilter(k);
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {workView === 'folders' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: '100%' }}>
              {/* 3D Glass Folders Showcase Container */}
              <div
                className="w-full relative py-8 px-2 md:px-6 rounded-2xl border"
                style={{
                  background: dark ? 'rgba(15, 20, 32, 0.55)' : 'rgba(244, 241, 234, 0.55)',
                  borderColor: dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(20, 21, 26, 0.12)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: dark ? 'inset 0 1px 0 rgba(255, 255, 255, 0.08)' : 'inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
              >
                {/* Background dotted mesh */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage: `radial-gradient(${dark ? '#fff' : '#000'} 1.1px, transparent 1.4px)`,
                    backgroundSize: '22px 22px'
                  }}
                />

                <div
                  className="relative grid grid-cols-1 lg:grid-cols-2 items-end justify-items-center gap-x-12 gap-y-14"
                  style={{ minHeight: 460, width: '100%', maxWidth: '1040px', margin: '0 auto' }}
                >
                  {/* Folder 1: AI & ML Systems */}
                  <GlassFolder
                    label="AI & ML Systems"
                    meta="3 Flagship Deployments"
                    width={folderWidth}
                    art="none"
                    image="/images/projects/02_ecovis_rag.jpg"
                    seed={7}
                    tone={dark ? 'dark' : 'light'}
                    appearDelay={0}
                    action="more"
                    labelPlacement="bottom-left"
                    onFileSelect={(file) => {
                      click(640);
                      const target = PROJECTS.find(
                        (p) =>
                          p.title.toLowerCase().includes(file.name.toLowerCase().split(' ')[0]) ||
                          file.name.toLowerCase().includes(p.id.split('-')[0])
                      );
                      if (target) setArch(target);
                    }}
                    files={[
                      {
                        name: 'SmartResume ATS',
                        meta: '140ms · 70% ML / 30% GenAI',
                        image: '/images/projects/01_smart_resume.jpg',
                        href: '#work'
                      },
                      {
                        name: 'Ecovis RAG Assistant',
                        meta: 'GCP VPC · 150k Clauses · 0% Hallucination',
                        image: '/images/projects/02_ecovis_rag.jpg',
                        href: '#work'
                      },
                      {
                        name: 'Amazon ML Challenge',
                        meta: '150k Listings · Top Nationwide',
                        image: '/images/projects/03_amazon_ml.jpg',
                        href: '#work'
                      }
                    ]}
                    menu={[
                      {
                        label: 'Inspect SmartResume ATS Spec',
                        onSelect: () => {
                          click(640);
                          setArch(PROJECTS.find((p) => p.id === 'smart-resume') || PROJECTS[0]);
                        }
                      },
                      {
                        label: 'Inspect Ecovis RAG Architecture',
                        onSelect: () => {
                          click(640);
                          setArch(PROJECTS.find((p) => p.id === 'ecovis-rag') || PROJECTS[1]);
                        }
                      },
                      {
                        label: 'Inspect Amazon ML Forecasting Spec',
                        onSelect: () => {
                          click(640);
                          setArch(PROJECTS.find((p) => p.id === 'amazon-ml') || PROJECTS[4]);
                        }
                      }
                    ]}
                  />

                  {/* Folder 2: Cloud & Production ERP */}
                  <GlassFolder
                    label="Cloud & Production ERP"
                    meta="3 Production Systems"
                    width={folderWidth}
                    art="none"
                    image="/images/projects/04_pims_erp.jpg"
                    seed={15}
                    tone={dark ? 'dark' : 'light'}
                    action="more"
                    labelPlacement="top-left"
                    appearDelay={140}
                    onFileSelect={(file) => {
                      click(640);
                      const target = PROJECTS.find(
                        (p) =>
                          p.title.toLowerCase().includes(file.name.toLowerCase().split(' ')[0]) ||
                          file.name.toLowerCase().includes(p.id.split('-')[0])
                      );
                      if (target) setArch(target);
                    }}
                    files={[
                      {
                        name: 'PIMS Pharmacy ERP',
                        meta: 'Company GCP · FEFO Locks <5ms',
                        image: '/images/projects/04_pims_erp.jpg',
                        href: '#work'
                      },
                      {
                        name: 'Room and Food Finder',
                        meta: 'Next.js · Verified Housing · <45ms Chat',
                        image: '/images/projects/05_room_food.jpg',
                        href: '#work'
                      },
                      {
                        name: 'Docker CI/CD Clusters',
                        meta: 'FastAPI SSE · Postgres Pool · 99.9% Uptime',
                        image: '/images/projects/06_docker_cluster.jpg',
                        href: '#work'
                      }
                    ]}
                    menu={[
                      {
                        label: 'Inspect PIMS Pharmacy ERP Architecture',
                        onSelect: () => {
                          click(640);
                          setArch(PROJECTS.find((p) => p.id === 'pims-cloud') || PROJECTS[2]);
                        }
                      },
                      {
                        label: 'Inspect Room and Food Finder',
                        onSelect: () => {
                          click(640);
                          setArch(PROJECTS.find((p) => p.id === 'room-food') || PROJECTS[3]);
                        }
                      },
                      {
                        label: 'Copy GitHub Profile URL',
                        onSelect: () => {
                          navigator.clipboard?.writeText(GH);
                          click(520);
                        }
                      }
                    ]}
                  />
                </div>

                {/* Sub-label instruction */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-4 border-t border-border/40 text-[11px] font-mono tracking-wider uppercase text-muted-foreground">
                  <span>Hover to lean frosted glass · Click folder to open · Click any card to inspect full architecture blueprint</span>
                  <span>2 Production Suites · 6 Shipped Systems</span>
                </div>
              </div>


            </div>
          ) : (
            <div className="bento-grid">
              {projects.map((p) => {
                const isWide = (filter === 'all' && p.featured) || (filter === 'genai' && p.id === 'smart-resume');
                const isTier3 = filter === 'all' && !p.featured;
                return (
                  <article
                    key={p.id}
                    className={`bento-card ${isWide ? 'featured' : ''} ${isTier3 ? 'tier-3' : ''}`}
                  >
                    {/* Project Name and Category on TOP of Card */}
                    <div className="bento-card-header">
                      <div className="row" style={{ marginBottom: 10, alignItems: 'center' }}>
                        <span className="badge" style={{ background: '#FFE600', color: '#111', marginTop: 0 }}>
                          {p.tag}
                        </span>
                        <Lbl>{p.category}</Lbl>
                      </div>
                      <h3 style={{ fontSize: isWide ? '1.85rem' : '1.45rem', margin: '0 0 10px', lineHeight: 1.25, fontWeight: 700 }}>
                        {p.title}
                      </h3>
                      <p className="mut" style={{ fontSize: 13.5, lineHeight: 1.6, margin: 0, maxWidth: isWide ? 920 : undefined }}>
                        {p.summary}
                      </p>
                    </div>

                    {/* Card Body: Visual & Details */}
                    <div className="bento-card-content">
                      {/* Visual Architecture Preview */}
                      <BentoVisual id={p.id} />

                      {/* Details: Metrics, Tech Pills, & Action Buttons */}
                      <div className="bento-card-details">
                        <div className="mets">
                          {p.metrics.map((m) => (
                            <div key={m.label}>
                              <Lbl>{m.label}</Lbl>
                              <b>{m.val}</b>
                            </div>
                          ))}
                        </div>
                        <Pills items={p.tech} />
                        <div className="acts">
                          <button
                            className="btn p"
                            style={{ padding: '8px 13px' }}
                            onClick={() => {
                              click(640);
                              setArch(p);
                            }}
                          >
                            <Layers size={13} /> Inspect architecture
                          </button>
                          {p.liveUrl && (
                            <Ext href={p.liveUrl} onClick={() => click()}>
                              Live deployment
                            </Ext>
                          )}
                          {p.githubUrl && (
                            <Ext href={p.githubUrl} onClick={() => click()}>
                              {p.githubUrl === GH ? 'GitHub repository' : 'Source code'}
                            </Ext>
                          )}
                          {p.privateDeploy && (
                            <span className="priv">
                              <Lock size={11} /> {p.privateDeploy}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* TOOLKIT */}
        <section id="skills" className="sec">
          <Head
            eyebrow="SYSTEMS & RUNTIMES"
            tag="24 VERIFIED PRODUCTION TECHNOLOGIES"
            title={
              <>
                The machinery behind <strong>the systems.</strong>
              </>
            }
            description="Technologies battle-tested in production environments across distributed cloud infrastructure, microservices, and high-throughput ML pipelines."
          />

          {/* Vercel / Nvidia Style Intersected Border Grid */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 border-x border-border/80 dark:border-border/60">
            {/* Extended full-screen border lines */}
            <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-border/80 dark:border-border/60" />
            <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-border/80 dark:border-border/60" />

            {SKILLS_GRID.map((s, i) => {
              const SkillIcon = s.icon;
              const row = Math.floor(i / 4);
              const col = i % 4;
              const isEven = (row + col) % 2 === 0;

              return (
                <div
                  key={s.name}
                  className={cn(
                    "group relative flex min-h-[96px] md:min-h-[112px] items-center justify-center gap-3 p-5 transition-all duration-200 border-r border-b border-border/80 dark:border-border/60",
                    isEven ? "bg-secondary/60 dark:bg-secondary/25" : "bg-background/80 dark:bg-background/40",
                    "hover:bg-primary/[0.04] dark:hover:bg-primary/[0.08]"
                  )}
                >
                  <SkillIcon className="size-4 md:size-5 shrink-0 text-foreground/75 group-hover:text-primary group-hover:scale-110 transition-all" />
                  <span className="font-display font-bold text-[14.5px] md:text-[15.5px] tracking-tight text-foreground group-hover:text-primary transition-colors select-none text-center">
                    {s.name}
                  </span>

                  {/* Intersecting Corner Plus (+) Icon */}
                  <Plus
                    className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-foreground/35 pointer-events-none"
                    strokeWidth={1}
                  />
                </div>
              );
            })}
          </div>

        </section>
      </div>

      {/* REAL STORIES & RETROSPECTIVES (INTERACTIVE 3D FLIP CARDS) */}
      <section className="blue" id="approach">
        <div className="w">
          <div className="row" style={{ marginBottom: 8 }}>
            <Lbl style={{ color: '#FFE600' }}>STORIES FROM THE TRENCHES</Lbl>
            <Lbl style={{ color: 'rgba(255, 255, 255, 0.85)' }}>CLICK ANY CARD TO HEAR HOW WE BUILT IT</Lbl>
          </div>
          <h2 style={{ margin: '0 0 10px' }}>
            Behind the code: <strong style={{ color: '#FFE600' }}>stories of building</strong> under pressure.
          </h2>
          <p className="sec-desc" style={{ color: '#ffffff', fontSize: 14.5, maxWidth: 640, marginBottom: 32, lineHeight: 1.6 }}>
            True engineering isn’t abstract theory — it’s small teams aligning under deadlines, pulling off 48-hour hackathon sprints, and deploying company systems where reliability actually matters.
          </p>
          <div className="three">
            {ARCH_PRINCIPLES.map((n, i) => (
              <div
                key={n.idx}
                className={`flip ${flipped[i] ? 'on' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`Story ${n.idx}: ${n.title}. Click to flip.`}
                aria-pressed={!!flipped[i]}
                onClick={() => {
                  click(560 + i * 50);
                  setFlipped((f) => ({ ...f, [i]: !f[i] }));
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    click(560 + i * 50);
                    setFlipped((f) => ({ ...f, [i]: !f[i] }));
                  }
                }}
              >
                <div className="flip-in">
                  {/* Front Face: The Real Story */}
                  <div className="face front">
                    <div>
                      <Lbl>{n.eyebrow}</Lbl>
                      <h4>{n.title}</h4>
                      <p>{n.problem}</p>
                    </div>

                    <div className="face-front-footer">
                      <strong>{n.metric}</strong>
                      <span className="hint">↻ CLICK TO HEAR THE INSIDE STORY</span>
                    </div>
                  </div>

                  {/* Back Face: Team Retrospective & Key Takeaway */}
                  <div className="face back">
                    <div>
                      <Lbl style={{ color: '#FFE600' }}>THE RETROSPECTIVE &amp; LESSON</Lbl>
                      <h4>{n.productionRule}</h4>
                      <p style={{ marginTop: 8 }}>{n.detail}</p>
                    </div>

                    <div>
                      <div className="face-detail">
                        <span className="face-guarantee">
                          <CheckCircle2 size={13} /> CORE TAKEAWAY
                        </span>
                        <p style={{ fontSize: 11.5, opacity: 0.95 }}>{n.guarantee}</p>
                      </div>
                      <span className="hint" style={{ color: '#FFE600' }}>
                        ↻ CLICK TO FLIP BACK
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w">
        {/* OPEN SOURCE */}
        <section id="oss" className="sec">
          <Head
            eyebrow="UPSTREAM CONTRIBUTIONS"
            tag="GOOGLE TENSORFLOW · MLFLOW · OPEN FIXTURE LIBRARY"
            title={
              <>
                Small changes. <strong>Deep in the machinery.</strong>
              </>
            }
            description="Upstream pull requests accepted into tier-1 open-source systems, solving compiler memory leaks, UI state latency, and accessibility regressions."
          />
          <div className="row" style={{ justifyContent: 'flex-start', gap: 8, marginBottom: 18 }}>
            {OSS_CONTRIBUTIONS.map((o, i) => (
              <button
                key={o.id}
                className={`chip ${ossIdx === i ? 'on' : ''}`}
                onClick={() => {
                  click(560);
                  setOssIdx(i);
                }}
              >
                {o.repo}
              </button>
            ))}
          </div>
          {(() => {
            const o = OSS_CONTRIBUTIONS[ossIdx];
            return (
              <div
                className="oc"
                key={o.id}
                style={{ animation: 'flipIn .45s ease both', transformOrigin: 'top' }}
              >
                <div className="row">
                  <span
                    className="badge"
                    style={{ background: '#1530FF', color: '#fff', marginTop: 0 }}
                  >
                    {o.prLabel}
                  </span>
                  <Lbl>{o.impact}</Lbl>
                </div>
                <h4 style={{ fontSize: '1.45rem' }}>{o.title}</h4>
                <p style={{ fontSize: 13 }}>{o.summary}</p>
                <div>
                  <Lbl>CORE CODE DIFF SUMMARY · FULL COMMIT &amp; DISCUSSION ON GITHUB</Lbl>
                  <pre style={{ marginTop: 8 }}>
                    <span style={{ color: '#FF7A9C' }}>{o.beforeLine}</span>
                    {'\n'}
                    <span style={{ color: '#7CFFB2' }}>{o.afterLine}</span>
                  </pre>
                </div>
                <div className="acts" style={{ marginTop: 0 }}>
                  <Ext href={o.url} onClick={() => click()}>
                    Inspect PR / Issue on GitHub
                  </Ext>
                </div>
              </div>
            );
          })()}
        </section>

        {/* CHRONOLOGICAL TRAJECTORY */}
        <section id="journey" className="sec">
          <Head
            eyebrow="CHRONOLOGICAL TRAJECTORY"
            tag="6 ENGINEERING MILESTONES · 2022 — PRESENT"
            title={
              <>
                The engineering <strong>trajectory.</strong>
              </>
            }
            description="An interactive visual polaroid clothesline tracing progression from C++ algorithmic foundations and Government of India design patents to enterprise SDE deployments at Ecovis RKCA. Drag the line or click any print to inspect."
          />

          {/* POLAROID INTERACTIVE JOURNEY CLOTHESLINE */}
          <div
            style={{
              margin: '28px 0 0',
              borderRadius: 0,
              border: '1.5px solid var(--rule)',
              overflow: 'hidden',
              background: 'var(--bg2)',
              boxShadow: '4px 4px 0 var(--ink)'
            }}
          >
            <PolaroidLineCarousel
              slides={JOURNEY_SLIDES}
              height="580px"
              cardWidth={330}
              sag={32}
              swing={1.15}
              autoplay={5500}
              string={dark ? '#6F82FF' : '#1530FF'}
              background="transparent"
              ink="var(--ink)"
              ariaLabel="Interactive engineering journey polaroid carousel"
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sec">
          <div className="row">
            <Lbl>COLLABORATE &amp; DEPLOY</Lbl>
            <Lbl>
              <span className="b">AVAILABLE FOR HIGH-IMPACT SDE, AI/ML &amp; DATA ROLES</span>
            </Lbl>
          </div>
          <div className="row" style={{ alignItems: 'flex-start', margin: '18px 0 24px' }}>
            <h2 style={{ maxWidth: 640 }}>
              Let’s build something <strong>dependable</strong> together.
            </h2>
            <a
              className="arrow"
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${topic} — Abhijeet Kadu`)}`}
              aria-label="Email Abhijeet"
            >
              <ArrowUpRight />
            </a>
          </div>
          <Lbl>SELECT A TEAM FOCUS — PRE-FILLS DIRECT EMAIL SUBJECT</Lbl>
          <div className="three l" style={{ marginTop: 12 }}>
            {FIT.map(([t, d]) => (
              <div
                key={t}
                className={`fit ${topic === t ? 'on' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={topic === t}
                onClick={() => {
                  click(550, 0.02);
                  setTopic(t);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setTopic(t);
                  }
                }}
              >
                <h4>
                  {topic === t ? '✓ ' : ''}
                  {t}
                </h4>
                <p className="mut">{d}</p>
              </div>
            ))}
          </div>
          <div className="cta">
            <div>
              <Lbl>DIRECT CHANNEL · SUBJECT: {topic.toUpperCase()}</Lbl>
              <p style={{ fontSize: '1.35rem', marginTop: 4 }}>{EMAIL}</p>
            </div>
            <div className="row" style={{ gap: 10 }}>
              <button
                className="w2"
                style={{ border: 0, cursor: 'pointer' }}
                onClick={() => copy(EMAIL, 'e')}
              >
                {copied === 'e' ? <Check size={13} /> : <Copy size={13} />}{' '}
                {copied === 'e' ? 'Copied address' : 'Copy email'}
              </button>
              <a
                className="w2"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${topic} — Abhijeet Kadu`)}`}
              >
                <Send size={13} /> Send email
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* FULL-WIDTH INTERACTIVE DOODLE CREW FOOTER */}
      <DoodleCrewFooter
        preset={dark ? "night" : "sunny"}
        wordmark="ABHIJEET"
        brand="abhijeet kadu"
        blurb="Software Development Engineer & Machine Learning Systems. Architecting enterprise AI search, high-throughput cloud platforms, and verified systems."
        tagline="Built with intent. Engineered for production systems worldwide."
        actions={[
          { label: "Executive Dossier", onClick: () => setBrief(true), icon: "sandwich", variant: "outline" },
          { label: "Let's connect", href: `mailto:${EMAIL}`, icon: "bolt", variant: "solid" }
        ]}
        crew={[
          { kind: "yeti", letter: 0, seat: "front", offset: -0.32, name: "Bruno", says: "Hungry for hard engineering problems." },
          { kind: "bird", letter: 1, seat: "top", offset: 0.02, name: "Pip", says: "Drop a note at abhijeetkadu85@gmail.com!" },
          { kind: "mushroom", letter: 2, seat: "front", offset: 0.12, scale: 0.95, name: "Morel", says: "150k+ chunks, 0.0% hallucination." },
          { kind: "kid", letter: 4, seat: "top", offset: -0.05, name: "Juno", says: "FastAPI + Vertex AI up here!" },
          { kind: "ghost", letter: 6, seat: "behind", offset: 0, name: "Boo", says: "Indian Patent #458179-001 granted." },
          { kind: "cat", letter: 7, seat: "front", offset: 0.42, flip: true, name: "Patch", says: "Microsoft Fabric DP-600 certified." }
        ]}
        doodles={["flame", "sandwich", "star", "heart", "bolt", "sparkle"]}
        doodleCount={12}
        columns={[
          {
            title: "Flagship Specs",
            links: [
              { label: "SmartResume ATS", href: "https://smart-resume-orcin.vercel.app/" },
              { label: "Ecovis RAG Assistant", href: "#work" },
              { label: "PIMS Cloud ERP", href: "#work" },
              { label: "Room and Food Finder", href: "https://room-and-food.vercel.app/" }
            ]
          },
          {
            title: "Credentials",
            links: [
              { label: "Indian Patent #458179-001", href: "#experience" },
              { label: "Microsoft Fabric DP-600", href: "#credentials" },
              { label: "Amazon ML Summer School", href: "#experience" },
              { label: "B.Tech Computer Engg", href: "#credentials" }
            ]
          },
          {
            title: "Open Source",
            links: [
              { label: "Google TensorFlow", href: "https://github.com/tensorflow/tensorflow" },
              { label: "MLflow UI (#19820)", href: "https://github.com/mlflow/mlflow" },
              { label: "Open Fixture Library (#5312)", href: "https://github.com/OpenLightingProject/open-fixture-library" }
            ]
          },
          {
            title: "Direct Connect",
            links: [
              { label: "LinkedIn (/in/abhijeet-kadu)", href: LI },
              { label: "GitHub (@Abhiii47)", href: GH },
              { label: EMAIL, href: `mailto:${EMAIL}` },
              { label: "Navi Mumbai & Pune, IN", href: "https://maps.google.com/?q=Navi+Mumbai" }
            ]
          }
        ]}
        copyright="© 2026 Abhijeet Kadu · Software Development Engineer"
        legal={[
          { label: "Patent #458179-001", href: "#experience" },
          { label: "DP-600 Verified", href: "#credentials" },
          { label: "Navi Mumbai & Pune", href: "https://maps.google.com/?q=Navi+Mumbai" }
        ]}
        socials={[
          { label: "LinkedIn", href: LI },
          { label: "GitHub", href: GH },
          { label: "Email", href: `mailto:${EMAIL}` }
        ]}
        backToTop={true}
      />

      {/* ARCHITECTURE BLUEPRINT MODAL */}
      {arch && (
        <div
          className="ov"
          onClick={() => setArch(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="arch-modal-title"
        >
          <div className="md" onClick={(e) => e.stopPropagation()}>
            <div className="row" style={{ alignItems: 'flex-start' }}>
              <div>
                <Lbl>SYSTEM ARCHITECTURE BLUEPRINT · {arch.tag}</Lbl>
                <h3 id="arch-modal-title" style={{ fontSize: '1.6rem', marginTop: 6 }}>
                  {arch.title}
                </h3>
              </div>
              <button className="ctl" onClick={() => setArch(null)} aria-label="Close architecture modal">
                <X size={14} />
              </button>
            </div>
            <div className="g2">
              {arch.architecture.pipeline.map((s: any) => (
                <div key={s.step} className="stp">
                  <b>{s.step}</b>
                  {s.detail}
                </div>
              ))}
            </div>
            <div style={{ background: '#FFE600', color: '#111', padding: 14 }}>
              <Lbl style={{ color: '#111', fontWeight: 600 }}>
                ENGINEERING BOTTLENECK SOLVED
              </Lbl>
              <p style={{ fontSize: 13, marginTop: 6 }}>{arch.architecture.bottleneckSolved}</p>
            </div>
            <div>
              <Lbl>PRODUCTION IMPLEMENTATION PATTERN</Lbl>
              <pre style={{ marginTop: 8 }}>{arch.architecture.codeSnippet}</pre>
            </div>
            <div className="acts" style={{ marginTop: 0 }}>
              {arch.liveUrl && <Ext href={arch.liveUrl}>Open Live Deployment</Ext>}
              {arch.githubUrl && <Ext href={arch.githubUrl}>View Source on GitHub</Ext>}
              {arch.privateDeploy && (
                <span className="priv">
                  <Lock size={11} /> {arch.privateDeploy}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1-PAGE EXECUTIVE DOSSIER MODAL */}
      {brief && (
        <div
          className="ov"
          onClick={() => setBrief(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="brief-modal-title"
        >
          <div className="md" onClick={(e) => e.stopPropagation()}>
            <div className="row" style={{ alignItems: 'flex-start' }}>
              <div>
                <Lbl>EXECUTIVE DOSSIER · 1-PAGE SUMMARY</Lbl>
                <h3 id="brief-modal-title" style={{ fontSize: '1.6rem', marginTop: 6 }}>
                  Abhijeet Kadu — SDE &amp; ML Systems Engineer
                </h3>
                <Lbl>
                  {EMAIL} · github.com/Abhiii47 · B.Tech Computer Engineering (Sanjivani ’26)
                </Lbl>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <button className="ctl" onClick={() => copy(briefText, 'b')}>
                  {copied === 'b' ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied === 'b' ? 'COPIED' : 'COPY TEXT'}</span>
                </button>
                <button className="ctl" onClick={() => window.print()}>
                  <Printer size={13} />
                  <span>PRINT / PDF</span>
                </button>
                <button className="ctl" onClick={() => setBrief(false)} aria-label="Close executive dossier">
                  <X size={14} />
                </button>
              </div>
            </div>
            {BRIEF.map(([a, b]) => (
              <div key={a} style={{ borderTop: '1px solid var(--rule)', paddingTop: 12 }}>
                <Lbl>{a}</Lbl>
                <p style={{ fontSize: 13, marginTop: 4 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⌘K QUICK COMMAND MODAL */}
      {cmd && (
        <div
          className="ov"
          onClick={() => setCmd(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cmd-modal-title"
        >
          <div className="md" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div className="row">
              <Lbl id="cmd-modal-title">QUICK NAVIGATION · ⌘K / CTRL+K</Lbl>
              <button className="ctl" onClick={() => setCmd(false)} aria-label="Close command menu">
                ESC
              </button>
            </div>
            <div>
              {SEC.map(([id, l]) => (
                <button key={id} className="cmdi" onClick={() => go(id)}>
                  <span>→ Jump to {l}</span>
                  <span>↵</span>
                </button>
              ))}
              <a
                className="cmdi"
                href={LI}
                target="_blank"
                rel="noreferrer"
                onClick={() => setCmd(false)}
              >
                <span>↗ Open LinkedIn (/in/abhijeet-kadu)</span>
                <span>↵</span>
              </a>
              <a
                className="cmdi"
                href={GH}
                target="_blank"
                rel="noreferrer"
                onClick={() => setCmd(false)}
              >
                <span>↗ Open GitHub (@Abhiii47)</span>
                <span>↵</span>
              </a>
              <button
                className="cmdi"
                onClick={() => {
                  setCmd(false);
                  setBrief(true);
                }}
              >
                <span>📋 Open 1-Page Executive Brief</span>
                <span>↵</span>
              </button>
              <button
                className="cmdi"
                onClick={() => {
                  setDark((d) => !d);
                  setCmd(false);
                }}
              >
                <span>◐ Toggle Cream Paper / Night Ink Theme</span>
                <span>↵</span>
              </button>
              <button
                className="cmdi"
                onClick={() => {
                  copy(EMAIL, 'e');
                  setCmd(false);
                }}
              >
                <span>✉ Copy Email ({EMAIL})</span>
                <span>↵</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}