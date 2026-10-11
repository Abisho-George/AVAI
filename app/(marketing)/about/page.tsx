import type { Metadata } from "next";
import styles from "./page.module.css";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import { NeverList } from "@/components/NeverList";

export const metadata: Metadata = {
  title: "About Avai",
  description:
    "Every opportunity belongs to every student. Avai is built by people who learned too late what the exams after Class 10 were, and who do not think a child's future should depend on luck.",
};

/** Header graphic: the founder's words, as a pull quote. */
function FounderQuote() {
  return (
    <figure className={`${styles.quote} glow-border`}>
      <Icon name="chat" size={26} />
      <blockquote>
        I studied at IIIT Allahabad and my brother went to IIT Delhi. Neither of us knew what JEE was
        until Class 10. My father heard about it at a friend&rsquo;s house, by chance, in time. That
        is luck, and I have never been comfortable treating luck as a system.
      </blockquote>
      <figcaption>
        <span className={styles.qAvatar} aria-hidden="true">
          KM
        </span>
        <span>
          <b>Komala Maran</b>
          <span>Founder</span>
        </span>
      </figcaption>
    </figure>
  );
}

const STORY: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "flag",
    title: "It was luck",
    body: "One of us found out in time, because a father heard about it at a friend's house. That was luck, and a child's future should not run on it.",
  },
  {
    icon: "scorecard",
    title: "The record schools throw away",
    body: "Every unit test, half-yearly and pre-board carries a detailed record of what each child can and cannot do. That record is discarded within a week of the paper being returned.",
  },
  {
    icon: "paper",
    title: "So we begin at the paper",
    body: "A diagnosis is only as good as the instrument that produced it. We build papers that hold to the Board's standard, then read what they reveal about each student.",
  },
];

const TEAM = [
  {
    initials: "KM",
    name: "Komala Maran",
    role: "Founder",
    bio: "Head of Go-to-Market and Growth at a Bengaluru consulting firm, leading 50+ professionals across 65+ accounts. Has run research and strategy programmes for OPPO, Alibaba, EY and Dover across international markets, including a 3,010-respondent programme for EY, end to end. Seven years turning research into decisions people can act on, now pointed at the decision a fifteen-year-old makes once and lives with for a decade.",
    creds: [
      "B.Tech, IIIT Allahabad",
      "Mentor, Ministry of Education Vidyanjali",
      "Industry mentor, Naan Mudhalvan (TNSkill)",
      "Education volunteer, United Nations",
    ],
    tone: "teal",
  },
  {
    initials: "AG",
    name: "Abisho George",
    role: "Founding member",
    bio: "Statistician by training. Spent three years running education outreach in an adopted village: mathematics, spoken English, chess and career awareness for school children and their parents, and was given his college's award for it. Chose a stream after Class 10 that closed the fewest doors, because he did not know which door he would need. Found out later he was good at mathematics, after the application window had shut.",
    creds: [
      "B.Sc Statistics, St. Joseph's College, Tiruchirappalli",
      "Research intern, ICMR NIRT Chennai",
      "Mentor, Ministry of Education Vidyanjali",
      "Industry mentor, Naan Mudhalvan (TNSkill)",
    ],
    tone: "gold",
  },
] as const;

const WE_DO = [
  "Build CBSE question papers, marking schemes and design reports to the Board's own published design.",
  "Read the unit tests, quarterlies and terminals your school already runs, and map them question by question against what the Board actually asks.",
  "Write down what should happen next, who owns it, and whether the next test moved.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        icon="building"
        title="Every opportunity belongs to every student"
        lede="What a child can become should not be decided by which school, which town or which family they were born into. The standard we set for a school in a district town is the standard the Board itself sets in March, not an approximation of it."
        aside={<FounderQuote />}
      />

      <section>
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="kicker">Our story</p>
            <h2>
              Neither of us knew what JEE was <span className="grad-text">until Class 10.</span>
            </h2>
          </div>
          <ol className={styles.story}>
            {STORY.map((s, i) => (
              <li key={s.title} data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <span className={styles.storyN}>
                  <Icon name={s.icon} size={22} />
                  <small>0{i + 1}</small>
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className={styles.vm} data-stagger>
            <div className={`${styles.vmCard} ${styles.vision} glow-border`} data-tilt="5">
              <IconTile name="eye" size={48} />
              <span className={styles.vmLabel}>Our vision</span>
              <p className={styles.vmText}>
                What a child can become should not be decided by which school, which town or which
                family they were born into.
              </p>
            </div>
            <div className={`${styles.vmCard} ${styles.mission} glow-border`} data-tilt="5">
              <IconTile name="target" tone="gold" size={48} />
              <span className={styles.vmLabel}>Our mission</span>
              <p className={styles.vmText}>
                Set assessments that hold to Board standard, and read what those assessments reveal
                about each student.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head-2" data-reveal>
            <p className="kicker">The team</p>
            <h2>The people behind Avai</h2>
          </div>
          <div className={styles.team} data-stagger>
            {TEAM.map((m) => (
              <article key={m.name} className={`card ${styles.member}`}>
                <header>
                  <span className={`${styles.avatar} ${styles[m.tone]}`} aria-hidden="true">
                    {m.initials}
                  </span>
                  <span>
                    <b>{m.name}</b>
                    <span>{m.role}</span>
                  </span>
                </header>
                <p>{m.bio}</p>
                <ul>
                  {m.creds.map((c) => (
                    <li key={c}>
                      <Icon name="check" size={13} strokeWidth={2.6} />
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band-2">
        <div className="wrap">
          <div className={styles.doDont}>
            <div data-reveal>
              <p className="kicker">What we do</p>
              <h2>And what we do not</h2>
              <ul className={styles.weDo}>
                {WE_DO.map((w) => (
                  <li key={w}>
                    <Icon name="check" size={15} strokeWidth={2.4} />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal style={{ ["--d" as string]: "0.1s" }}>
              <NeverList />
            </div>
          </div>
          <div className={`card ${styles.gov}`} data-reveal>
            <IconTile name="school" size={40} />
            <span>
              <b>The government-school programme</b>
              District administration has expressed support for a free diagnostics and
              scholarship programme across government schools. Government schools pay nothing.
            </span>
          </div>
        </div>
      </section>

      <CtaBand
        title="Work with us"
        description="Schools, districts and researchers are all welcome to get in touch."
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />
    </>
  );
}
