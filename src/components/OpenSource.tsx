import Link from "next/link";

const prs = [
  {
    repo: "tensorflow/tensorflow",
    title: "Fix typo in XLA constants",
    url: "https://github.com/tensorflow/tensorflow/pull/107884",
  },
  {
    repo: "tensorflow/tensorflow",
    title: "Update assert_no_garbage_created docstring",
    url: "https://github.com/tensorflow/tensorflow/pull/107845",
  },
  {
    repo: "mlflow/mlflow",
    title: "Fix typo in PromoteModelButton",
    url: "https://github.com/mlflow/mlflow/pull/19820",
  },
  {
    repo: "OpenLightingProject/open-fixture-library",
    title: "Improve LabeledInput component",
    url: "https://github.com/OpenLightingProject/open-fixture-library/pull/5312",
  },
];

export default function OpenSource() {
  return (
    <section id="open-source" className="space-y-8 py-16">
      <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
        06 Open Source
      </p>
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          4 PRs reviewed, approved, and merged by core maintainers of TensorFlow, MLflow, and OpenLightingProject.
        </p>
        <ul className="space-y-3">
          {prs.map((pr) => (
            <li
              key={pr.url}
              className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between"
            >
              <span className="font-medium text-foreground">{pr.repo}</span>
              <Link
                href={pr.url}
                target="_blank"
                className="text-xs text-muted-foreground underline underline-offset-4"
              >
                {pr.title} ↗
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
