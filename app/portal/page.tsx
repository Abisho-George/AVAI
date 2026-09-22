"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Logo } from "@/components/Logo";
import { Mascot } from "@/components/Mascot";
import { Tabs } from "@/components/Tabs";

// Demo only — not real authentication. Every submission (staff or student)
// returns the same generic message, so a real failed sign-in would never
// reveal which field was wrong or whether an account exists.
const GENERIC_FAIL_MESSAGE =
  "We couldn't verify those details. Check them and try again, or use a role below to see a sample dashboard.";

function SignInForm({ children }: { children: React.ReactNode }) {
  const [attempted, setAttempted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
  }

  return (
    <>
      <form className={styles.formSingle} onSubmit={handleSubmit}>
        {children}
        <button className="btn btn-primary" style={{ justifyContent: "center" }} type="submit">
          Continue
        </button>
      </form>
      {attempted ? <p className={styles.failNote}>{GENERIC_FAIL_MESSAGE}</p> : null}
    </>
  );
}

export default function PortalPage() {
  return (
    <div className={styles.portal}>
      <div className={styles.portalL}>
        <Link href="/" aria-label="Avai home">
          <Logo dark />
        </Link>
        <div>
          <Mascot pose="hello" size={104} title="Avai" />
          <h2>A brighter tomorrow for every student.</h2>
          <p>
            Avai reads your assessments against the Board blueprint and tells you where marks are
            being lost, how urgent it is, and how sure we are.
          </p>
        </div>
        <p className={`small ${styles.schoolLine}`}>
          Bharat International Sr. Sec. School · CBSE · Tamil Nadu
        </p>
      </div>

      <div className={styles.portalR}>
        <div className={styles.portalBox}>
          <h1>Sign in</h1>
          <p className="small" style={{ marginBottom: 22 }}>
            Choose how you are signing in to your school.
          </p>

          <Tabs
            label="Sign in as"
            tabs={[
              {
                id: "staff",
                label: "School staff",
                content: (
                  <div>
                    <SignInForm>
                      <div className={styles.fld}>
                        <label htmlFor="sc">School code</label>
                        <input id="sc" name="sc" placeholder="e.g. BIS-TN-001" />
                      </div>
                      <div className={styles.fld}>
                        <label htmlFor="sk">Sign-in key</label>
                        <input id="sk" name="sk" type="password" placeholder="Key issued by your school office" />
                      </div>
                    </SignInForm>
                    <p className={`small ${styles.helpText}`}>
                      Trouble signing in? Ask your school office.
                    </p>
                  </div>
                ),
              },
              {
                id: "student",
                label: "Student",
                content: (
                  <div>
                    <SignInForm>
                      <div className={styles.fld}>
                        <label htmlFor="sc2">School code</label>
                        <input id="sc2" name="sc2" placeholder="e.g. BIS-TN-001" />
                      </div>
                      <div className={styles.fld}>
                        <label htmlFor="rn">Roll number</label>
                        <input id="rn" name="rn" placeholder="e.g. 01" />
                      </div>
                      <div className={styles.fld}>
                        <label htmlFor="pin">PIN</label>
                        <input id="pin" name="pin" inputMode="numeric" placeholder="Four digits from your teacher" />
                      </div>
                    </SignInForm>
                    <p className={`small ${styles.helpText}`}>
                      Your PIN is given to you by your teacher when a report is shared.
                    </p>
                  </div>
                ),
              },
            ]}
          />

          <div className={styles.demoNote}>
            Public demo — sample data only. No real school or student information appears here.
          </div>

          <div className={styles.roles}>
            <Link className={styles.roleBtn} href="/portal/dashboard">
              <span>
                <b>Open as Principal</b>
                <span>Mrs. Kavitha Rajan · whole school</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.roleBtn} href="/portal/dashboard">
              <span>
                <b>Open as Teacher</b>
                <span>Mrs. Lakshmi · X-A · Mathematics</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.roleBtn} href="/portal/dashboard">
              <span>
                <b>Open as Student</b>
                <span>Aditi R. · X-A · Roll 01</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className={`small ${styles.backLink}`}>
            <Link href="/">← Back to avai.school</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
