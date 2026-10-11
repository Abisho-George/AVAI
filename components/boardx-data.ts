import type { IconName } from "./Icon";

/**
 * The BoardX class programmes, Class 9 to Class 12. All wording comes from
 * the programme documents supplied by the team; dashes are converted to
 * commas or "to" per CLAUDE.md. The five dimensions are the same every year;
 * what changes is the question each year asks.
 */

export type ClassKey = "9" | "10" | "11" | "12";

export const DIMENSIONS: { key: string; icon: IconName; name: string; reads: string }[] = [
  { key: "academic", icon: "book", name: "Academic DNA", reads: "Concepts · Weightage · Recoverable marks" },
  { key: "cognitive", icon: "target", name: "Cognitive DNA", reads: "Observation · Patterns · Problem solving" },
  { key: "behaviour", icon: "clock", name: "Learning Behaviour", reads: "Consistency · Resilience · Follow-through" },
  { key: "interest", icon: "spark", name: "Interest and Exposure", reads: "Interests · Pathways · Requirements" },
  { key: "self", icon: "eye", name: "Self-Awareness and Alignment", reads: "Position · Expectation · Reality" },
];

export type Programme = {
  key: ClassKey;
  label: string;
  name: string;
  question: string;
  headline: string;
  summary: string[];
  /** One line per dimension, in DIMENSIONS order. null means "carried, not collected". */
  outputs: (string | null)[];
  year: { when: string; what: string }[];
  gains: { who: string; what: string }[];
};

export const PROGRAMMES: Programme[] = [
  {
    key: "9",
    label: "Class 9",
    name: "Student Foundation Profile",
    question: "Who is this student?",
    headline: "Know the student before the decisions arrive.",
    summary: [
      "Which students carry foundation gaps into the board year, with eighteen months to close them.",
      "Which misconceptions the whole class shares, so one session serves nineteen students.",
    ],
    outputs: [
      "Handles single-step algebra reliably. Accuracy falls on multi-step problems, the specific form Class 10 questions take most often. Eighteen months to close it.",
      "Scores well on familiar problems. On unfamiliar problems using the same concept, performance drops sharply.",
      "Capability is not the constraint. Study concentrates in the week before a test, which will not survive a board year.",
      "Names engineering. Cannot describe what an engineer does in a working day, and has never met one.",
      "Believes she is weak in mathematics; two years of results say otherwise. Her parent expects medicine. She has not told anyone she wants something else.",
    ],
    year: [
      { when: "Classes 1 to 8", what: "Years of observations, learning patterns and experiences are built." },
      { when: "Class 9", what: "The chance to understand the student before major decisions arrive." },
      { when: "Classes 10 to 12", what: "Academic pressure and future choices become more important." },
    ],
    gains: [
      { who: "Principal", what: "A cohort map going into Class 10: which students carry foundation gaps into the board year." },
      { who: "Teachers", what: "Which misconceptions are shared across the class, and which three students to look at. Ten minutes, no plans to write." },
      { who: "Students", what: "Where they stand beyond marks, and one or two things to do before the next check." },
      { who: "Parents", what: "What their child is exploring, and an early sight of what the Class 11 decision will involve." },
    ],
  },
  {
    key: "10",
    label: "Class 10",
    name: "Decision Readiness Profile",
    question: "What is recoverable, and what should happen next?",
    headline: "Protect the marks, and be in the room for the stream decision.",
    summary: [
      "Which students have a concept problem and which have an execution problem. They are identical on a mark sheet and need opposite help.",
      "A December reality check, while two months remain.",
    ],
    outputs: [
      "Losing marks in three chapters. Together they carry 22 marks in the paper. Two are single-concept fixes and could be closed before the quarterly.",
      "Concepts are sound. Marks are lost on multi-part questions and presentation under time. This is an execution problem, and it is the cheapest kind to fix.",
      "Two of three assigned areas were completed. Accuracy in the completed areas improved in the next test. The third was not started and is still carrying 9 marks.",
      "Intends Bio-Maths. Cannot describe what the group leads to beyond ‘doctor’. Has never met anyone in the field. Three months to change either the aim or the understanding.",
      "Believes she is weak in mathematics; two years of results say otherwise. Her parent expects medicine. Her current trajectory supports it. Nobody has told either of them.",
    ],
    year: [
      { when: "June to Sept", what: "Baseline. First unit tests, a concept map per student. Quiet." },
      { when: "October", what: "First flag. Ranked marks at risk, per student and per class." },
      { when: "December", what: "The reality checkpoint. What is reachable by March. Two months to change it." },
      { when: "Jan to Feb", what: "Focused revision, with time allocated by marks at risk." },
      { when: "Mar to Apr", what: "Hands off. Exams." },
      { when: "Late Apr to May", what: "Stream sessions with parents in the room, in the weeks the school is usually absent." },
    ],
    gains: [
      { who: "Principal", what: "Which students are carrying recoverable marks, and where revision time is being spent badly." },
      { who: "Teachers", what: "Which concepts the whole class is failing, so one session serves nineteen students. No new tests." },
      { who: "Students", what: "An honest position in December while there is still time, and the chapters worth their remaining hours." },
      { who: "Parents", what: "The reality in December rather than the shock in May." },
    ],
  },
  {
    key: "11",
    label: "Class 11",
    name: "Pathway Readiness Profile",
    question: "Where is this student heading, and is there still time?",
    headline: "The year with no external record, and it sets your board result.",
    summary: [
      "Who is in the wrong group, in the first month, while it can still be changed.",
      "Who is drifting where no exam will catch it. What each student is aiming at, and what it would take.",
    ],
    outputs: [
      "Coping in Accountancy, struggling with the first Economics unit. The difficulty is with interpretation rather than calculation, and it will compound through Class 12.",
      "Handles procedures reliably. Loses ground where a problem requires applying a concept in an unfamiliar form, the standard shape of Class 12 Physics questions.",
      "Attendance steady, school submissions declining since October. Attends external coaching four evenings a week. Board subjects are receiving the residue.",
      "Strong in mathematics, has heard of engineering and nothing else. Four pathways introduced that were not previously known to the student or the family.",
      "Believes the group was the wrong choice. Performance says the difficulty is confined to one subject, and is closing. The belief is the larger problem.",
    ],
    year: [
      { when: "Q1 · Jun to Sep", what: "Landing. A new subject, the wrong group or a failed method: told apart while the group can still change." },
      { when: "Q2 · Oct to Dec", what: "Aim and distance. What the student is aiming at, and the last date they could still start." },
      { when: "Q3 · Jan to Mar", what: "Did anything move. Same targets, second measurement." },
      { when: "Q4 · Apr to Jun", what: "Handover. The Class 11 record passes to Class 12." },
    ],
    gains: [
      { who: "Principal", what: "Visibility into the one year that produces no record: who is in the wrong group, and who is drifting." },
      { who: "Teachers", what: "Which concepts a whole group is failing in subjects new to everyone. No new tests." },
      { who: "Students", what: "An honest answer to where they stand for what they want, with a date attached." },
      { who: "Parents", what: "What the child is aiming at and what it would genuinely require, in December." },
    ],
  },
  {
    key: "12",
    label: "Class 12",
    name: "Board Protection and Destination Record",
    question: "Which marks are still recoverable, and where did our students go?",
    headline: "Board protection, and where your students actually went.",
    summary: [
      "Who is falling, including students whose class rank hides it.",
      "Marks at risk in December, weighted against the actual pattern of recent Board papers. Then a written record of where each leaver went.",
    ],
    outputs: [
      "Losing marks in two chapters carrying 19 marks between them. Both are single-concept fixes. Eleven weeks remain.",
      "Concepts sound. Marks lost on the final two questions of every paper. This is a timing problem and it is worth roughly 8 marks.",
      "Ranked first in class. Physics has fallen eleven marks across two model exams. Nobody has flagged it, because the rank has not changed.",
      null,
      null,
    ],
    year: [
      { when: "June to Dec", what: "Baseline from the Class 11 record. Concept mapping from unit tests and the quarterly." },
      { when: "December", what: "First anomaly report. Who is falling, including behind their rank." },
      { when: "Jan to Feb", what: "Revision time allocated by what is recoverable. Model exams re-read." },
      { when: "March", what: "The examination. Nothing from us." },
      { when: "Aug to Sept", what: "The destination record, from the batch that has left." },
    ],
    gains: [
      { who: "Principal", what: "The board result protected by finding recoverable marks, and where your students went, in writing." },
      { who: "Teachers", what: "Which question types the whole class is failing, and which students are falling behind their own rank." },
      { who: "Students", what: "The specific chapters worth their remaining hours, and nobody asking about their future mid-board-year." },
      { who: "Parents", what: "A clear picture in December, while eleven weeks remain." },
    ],
  },
];
