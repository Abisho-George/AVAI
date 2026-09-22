import { HeroLoop } from "@/components/HeroLoop";

export default function HeroHealthPage() {
  return (
    <section className="snug">
      <div className="wrap" style={{ maxWidth: 620 }}>
        <p className="small" style={{ marginBottom: 20 }}>
          HeroLoop in isolation, at the width it ships at on the homepage.
          Click the dots or use arrow keys to check each of the four scenes.
        </p>
        <HeroLoop />
      </div>
    </section>
  );
}
