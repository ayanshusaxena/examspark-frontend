export type Exam = {
  id: number;
  title: string;
  code: string;
  subject: string;
  duration: number;
  questions: number;
  marks: number;
  date: string;
  status: "Live" | "Upcoming" | "Completed" | "Draft";
  accent: string;
};

export const exams: Exam[] = [
  {
    id: 1,
    title: "Cell Biology & Genetics",
    code: "BIO–204",
    subject: "Biology",
    duration: 45,
    questions: 5,
    marks: 10,
    date: "Today · until 4:30 PM",
    status: "Live",
    accent: "#ff6b35",
  },
  {
    id: 2,
    title: "Applied Mathematics II",
    code: "MAT–210",
    subject: "Mathematics",
    duration: 90,
    questions: 40,
    marks: 100,
    date: "May 28 · 10:00 AM",
    status: "Upcoming",
    accent: "#6c63ff",
  },
  {
    id: 3,
    title: "Modern World History",
    code: "HIS–118",
    subject: "History",
    duration: 60,
    questions: 30,
    marks: 75,
    date: "May 31 · 1:00 PM",
    status: "Upcoming",
    accent: "#00a878",
  },
  {
    id: 4,
    title: "Physics: Waves & Optics",
    code: "PHY–201",
    subject: "Physics",
    duration: 75,
    questions: 32,
    marks: 80,
    date: "May 12",
    status: "Completed",
    accent: "#e4b363",
  },
  {
    id: 5,
    title: "English Composition",
    code: "ENG–110",
    subject: "English",
    duration: 50,
    questions: 25,
    marks: 50,
    date: "May 8",
    status: "Completed",
    accent: "#168aad",
  },
  {
    id: 6,
    title: "Organic Chemistry",
    code: "CHE–206",
    subject: "Chemistry",
    duration: 60,
    questions: 30,
    marks: 75,
    date: "Jun 3 · 9:30 AM",
    status: "Draft",
    accent: "#d1495b",
  },
];

export const questions = [
  {
    id: 1,
    topic: "Cell structure",
    difficulty: "Easy",
    text: "Which organelle is primarily responsible for producing ATP through cellular respiration?",
    options: ["Golgi apparatus", "Mitochondrion", "Lysosome", "Ribosome"],
    answer: 1,
    explanation: "Mitochondria generate most of the cell’s ATP through oxidative phosphorylation.",
  },
  {
    id: 2,
    topic: "Genetics",
    difficulty: "Medium",
    text: "In a monohybrid cross between two heterozygous individuals, what is the expected phenotypic ratio?",
    options: ["1 : 1", "3 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1"],
    answer: 1,
    explanation: "A cross of Aa × Aa gives a 3 dominant : 1 recessive phenotypic ratio.",
  },
  {
    id: 3,
    topic: "Cell transport",
    difficulty: "Medium",
    text: "A cell placed in a hypertonic solution will most likely:",
    options: [
      "Gain water and swell",
      "Remain unchanged",
      "Lose water and shrink",
      "Immediately divide",
    ],
    answer: 2,
    explanation: "Water moves out of the cell toward the higher solute concentration.",
  },
  {
    id: 4,
    topic: "Molecular biology",
    difficulty: "Hard",
    text: "Which enzyme joins Okazaki fragments during DNA replication?",
    options: ["DNA helicase", "DNA polymerase", "DNA ligase", "Primase"],
    answer: 2,
    explanation: "DNA ligase seals the phosphodiester backbone between adjacent Okazaki fragments.",
  },
  {
    id: 5,
    topic: "Genetics",
    difficulty: "Easy",
    text: "What term describes alternative forms of the same gene?",
    options: ["Alleles", "Chromatids", "Genomes", "Centromeres"],
    answer: 0,
    explanation: "Alleles are variant forms of a gene found at the same chromosomal locus.",
  },
];

export const users = [
  {
    name: "Maya Chen",
    email: "maya.chen@demo.edu",
    role: "Student",
    status: "Active",
    activity: "2 min ago",
    initials: "MC",
  },
  {
    name: "Dr. Elias Ford",
    email: "elias.ford@demo.edu",
    role: "Teacher",
    status: "Active",
    activity: "18 min ago",
    initials: "EF",
  },
  {
    name: "Noah Williams",
    email: "noah.w@demo.edu",
    role: "Student",
    status: "Active",
    activity: "1 hour ago",
    initials: "NW",
  },
  {
    name: "Sofia Patel",
    email: "sofia.p@demo.edu",
    role: "Student",
    status: "Inactive",
    activity: "May 12",
    initials: "SP",
  },
  {
    name: "Prof. Ana Silva",
    email: "ana.silva@demo.edu",
    role: "Teacher",
    status: "Active",
    activity: "Yesterday",
    initials: "AS",
  },
  {
    name: "Leo Martinez",
    email: "leo.m@demo.edu",
    role: "Student",
    status: "Active",
    activity: "Yesterday",
    initials: "LM",
  },
];
