import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";

export default function ShellHealthPage() {
  return (
    <>
      <PageHeader
        eyebrow="What Avai finds"
        title="Lost marks are lost Board potential"
        lede="Avai's output is not a score and not a dashboard. It is a set of findings. A finding is always the same unit — never a bare statistic — and it always carries what it costs, how urgent it is, and how sure we are."
      />
      <section className="snug">
        <div className="wrap">
          <p className="small">
            Header and Footer render on every page via the root layout — check them at the top
            and bottom of this page. This page exists only to check PageHeader and CtaBand before
            any real page uses them.
          </p>
        </div>
      </section>
      <CtaBand
        className="band-2"
        title="See it on your own students"
        description="One question paper, one mark register. We return the findings."
        ctaLabel="Request a pilot"
        ctaHref="/contact"
      />
    </>
  );
}
