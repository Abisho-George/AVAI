import { CtaBand } from '../../components/CtaBand';
import { PageHeader } from '../../components/PageHeader';
import { RoleSwitcher } from '../../components/RoleSwitcher';
import styles from './roles.module.css';

export const metadata = {
  title: 'Who sees what — Avai',
  description:
    'One diagnosis sits underneath the whole product. What each person sees is clipped to what they are responsible for.',
};

export default function Roles() {
  return (
    <main>
      <PageHeader
        eyebrow="Who sees what"
        title="One seat for the whole school"
        lede="One login covers everyone. The principal sees every class and section, teachers see their own, and a student sees only their own report."
      />

      <section className={styles.section}>
        <div className={styles.wrap}>
          <RoleSwitcher />
        </div>
      </section>

      <CtaBand
        title="See it on your own students"
        body="One question paper, one mark register. We return the findings."
        action={{ href: '/contact', label: 'Request a pilot' }}
        secondary={{ href: '/trust', label: 'Trust & data' }}
      />
    </main>
  );
}
