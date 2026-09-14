'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { EvidenceNote } from './EvidenceNote';
import { EvidencePanel } from './EvidencePanel';
import { FindingCard } from './FindingCard';
import { StudentReportCard } from './StudentReportCard';
import styles from './HeroLoop.module.css';

/**
 * One finding, from a mark to a student report, in four scenes.
 *
 * Two rules shape the implementation. Never more than two elements animating at
 * once, because the loop's job is legibility rather than motion: a cross-fade
 * moves the outgoing and incoming scene and nothing else. And the stage
 * reserves its height by stacking every scene in one grid cell, so the box is
 * always as tall as the tallest scene and swapping scenes shifts nothing.
 */

type Scene = {
  id: string;
  label: string;
  /** Milliseconds on screen before the loop advances. */
  duration: number;
  heading: string;
  sub: string;
  caption: string;
};

const SCENES: Scene[] = [
  {
    id: 'marks',
    label: 'Marks',
    duration: 5000,
    heading: 'Marks your teachers already entered',
    sub: 'Unit Test 2 · Class X-B · Mathematics · 48 students',
    caption: 'The marks your teachers already entered.',
  },
  {
    id: 'finding',
    label: 'Finding',
    duration: 7000,
    heading: 'Avai reads the pattern',
    sub: 'The same three questions, across 240 students',
    caption: 'Not a subject total. A named gap, with what it costs.',
  },
  {
    id: 'evidence',
    label: 'Evidence',
    duration: 6000,
    heading: 'And shows its working',
    sub: 'Every number opens to the questions behind it',
    caption: 'Every number opens.',
  },
  {
    id: 'report',
    label: 'Report',
    duration: 6000,
    heading: 'Then it reaches Aditi',
    sub: 'Shared by her teacher, opened with a one-time PIN',
    caption: 'The same diagnosis. No rank, no percentile.',
  },
];

/** The scorecard, as a teacher entered it. Q7, Q11 and Q12 are the
 *  application-tier questions that scene 2 keeps lit. */
const MARKS = [
  { q: 'Q1', got: 2, of: 2 },
  { q: 'Q2', got: 3, of: 3 },
  { q: 'Q3', got: 1, of: 1 },
  { q: 'Q4', got: 2, of: 2 },
  { q: 'Q5', got: 3, of: 4 },
  { q: 'Q6', got: 2, of: 2 },
  { q: 'Q7', got: 1, of: 3, application: true },
  { q: 'Q8', got: 3, of: 3 },
  { q: 'Q9', got: 2, of: 2 },
  { q: 'Q10', got: 4, of: 4 },
  { q: 'Q11', got: 2, of: 3, application: true },
  { q: 'Q12', got: 1, of: 4, application: true },
];

function Cells({ lit }: { lit?: boolean }) {
  return (
    <>
      {MARKS.map((mark) => (
        <div
          key={mark.q}
          className={[
            styles.cell,
            lit && styles.cellLit,
            /* In the lit layer only the application questions are drawn. The
               rest still occupy their grid slots, so both layers line up at
               every breakpoint without repeating the column maths. */
            lit && !mark.application && styles.cellBlank,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className={styles.cellQ}>{mark.q}</span>
          <span className={`${styles.cellMark} tnum`}>
            {mark.got}/{mark.of}
          </span>
        </div>
      ))}
    </>
  );
}

/**
 * Scene 2 dims the grid and keeps three cells lit. A child cannot escape its
 * parent's opacity, so the lit cells are a second grid stacked on the first:
 * the base grid fades down, the lit layer fades up. Two elements animating,
 * which is the budget.
 */
function Scorecard({ dimmed }: { dimmed?: boolean }) {
  return (
    <div className={styles.stack}>
      <div className={dimmed ? `${styles.grid} ${styles.gridDimmed}` : styles.grid}>
        <Cells />
      </div>
      {dimmed && (
        <div className={`${styles.grid} ${styles.gridLit}`} aria-hidden="true">
          <Cells lit />
        </div>
      )}
    </div>
  );
}

export function HeroLoop() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Autoplay is off when the reader has asked for less motion. The dots still
     work: the loop becomes a stepper. */
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % SCENES.length),
      SCENES[active].duration,
    );
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const onTabKey = useCallback((event: React.KeyboardEvent, index: number) => {
    const last = SCENES.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    setPlaying(false);
    tabs.current[next]?.focus();
  }, []);

  return (
    <div className={styles.loop}>
      <p className={styles.eyebrow}>One finding, end to end</p>

      {/*
        The headings and the captions vary in length, and at phone widths the
        longer ones wrap to a second line. Left to reflow they move the whole
        stage by a line every time the scene changes. Both blocks stack every
        scene's text in one grid cell, exactly as the stage does, so each block
        is always as tall as its longest member. The text swaps instantly:
        only the scenes cross-fade.
      */}
      <div className={styles.headStack}>
        {SCENES.map((item, index) => (
          <div
            key={item.id}
            className={index === active ? `${styles.head} ${styles.headOn}` : styles.head}
            aria-hidden={index !== active}
          >
            <p className={styles.heading}>{item.heading}</p>
            <p className={styles.sub}>{item.sub}</p>
          </div>
        ))}
      </div>

      <div className={styles.stage}>
        {SCENES.map((item, index) => (
          <div
            key={item.id}
            id={`hero-scene-${item.id}`}
            role="tabpanel"
            aria-labelledby={`hero-tab-${item.id}`}
            className={index === active ? `${styles.scene} ${styles.sceneOn}` : styles.scene}
            aria-hidden={index !== active}
            inert={index !== active}
          >
            {item.id === 'marks' && (
              <>
                <Scorecard />
                <p className={styles.foot}>Total: 26/33. A report card stops here.</p>
              </>
            )}

            {item.id === 'finding' && (
              <>
                <Scorecard dimmed />
                <FindingCard
                  subject="Mathematics"
                  chapter="Quadratic Equations"
                  competency="Application problems"
                  studentsAffected={{ scope: 'count', affected: 146, outOf: 240 }}
                  avgMarksLost={{ scope: 'student', marks: 4.2 }}
                  signals={{
                    attention: 'immediate',
                    urgency: { level: 'very-high', years: 4 },
                    confidence: 'high',
                  }}
                  body={{
                    kind: 'observation',
                    observation:
                      '61% of analysed students demonstrate the underlying concept but lose marks when it appears in application-style questions.',
                    action: 'application-focused revision, Board-style question practice',
                  }}
                />
              </>
            )}

            {item.id === 'evidence' && (
              <>
                <EvidencePanel
                  questions={[
                    {
                      ref: 'Q7 · application, 3 marks',
                      reading: {
                        scope: 'share',
                        percent: 58,
                        of: 'analysed students took partial credit',
                      },
                    },
                    {
                      ref: 'Q12 · application, 4 marks',
                      reading: {
                        scope: 'share',
                        percent: 41,
                        of: 'analysed students attempted it',
                      },
                    },
                    {
                      ref: 'Q2 · concept recall, 3 marks',
                      reading: {
                        scope: 'share',
                        percent: 87,
                        of: 'analysed students answered correctly',
                      },
                    },
                  ]}
                  sections={[
                    { section: 'X-A', affected: { scope: 'share', percent: 41, of: 'the section' } },
                    { section: 'X-B', affected: { scope: 'share', percent: 66, of: 'the section' } },
                    { section: 'X-C', affected: { scope: 'share', percent: 55, of: 'the section' } },
                    { section: 'X-D', affected: { scope: 'share', percent: 72, of: 'the section' } },
                    { section: 'X-E', affected: { scope: 'share', percent: 58, of: 'the section' } },
                  ]}
                />
                <p className={styles.conclusion}>
                  Students know the concept. They lose it in application.
                </p>
                <EvidenceNote state="paper-under-tests" />
              </>
            )}

            {/* The only scene the mascot appears in. */}
            {item.id === 'report' && (
              <StudentReportCard
                studentName="Aditi R."
                assessment="Mathematics · Term 2"
                score={{ scope: 'score', marks: 78, outOf: 80 }}
                trend="up"
                line="Your recall answers held up. The marks you lost were on application-style quadratic equations."
                strengths={['Recall-based questions', 'Basic algebra']}
                focus={['Quadratic equations, application-style questions']}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.captionStack}>
        {SCENES.map((item, index) => (
          <p
            key={item.id}
            className={
              index === active ? `${styles.caption} ${styles.captionOn}` : styles.caption
            }
            aria-hidden={index !== active}
          >
            {item.caption}
          </p>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.play}
          onClick={() => setPlaying((was) => !was)}
        >
          {playing ? 'Pause' : 'Play'}
        </button>

        <div className={styles.dots} role="tablist" aria-label="Hero chapters">
          {SCENES.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`hero-tab-${item.id}`}
              aria-controls={`hero-scene-${item.id}`}
              aria-selected={index === active}
              tabIndex={index === active ? 0 : -1}
              className={index === active ? `${styles.dot} ${styles.dotOn}` : styles.dot}
              onClick={() => {
                setActive(index);
                setPlaying(false);
              }}
              onKeyDown={(event) => onTabKey(event, index)}
            >
              <span className={styles.dotMark} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
