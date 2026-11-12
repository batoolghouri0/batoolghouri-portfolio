import fs from 'fs';
import path from 'path';

// Clean, valid PDF 1.4 generator without heavy dependencies
function generateResumePdf() {
  const content = `
Batool Ghouri
Frontend Developer & AI Enthusiast | AI Mentor @ GIAIC
Email: batoolghouri10267@gmail.com
Location: Karachi, Pakistan

BRAND STATEMENT
"Curious Mind. Creative Thinking. Continuous Growth."

SUMMARY
Passionate frontend developer and AI enthusiast exploring modern web technologies and Agentic AI. Continuously learning, building, and evolving with every line of code since 2024. Currently studying Quarter 4 at GIAIC and serving as an AI Mentor preparing students for their PCAO-F examinations.

TECHNICAL SKILLS
- Frontend Development: HTML, CSS, TypeScript, Next.js, Tailwind CSS
- Programming: Python
- Artificial Intelligence: Agentic AI, Autonomous AI Workflows

EDUCATION & ACADEMICS
- Intermediate (Computer Science): 2026 – Present | First Year Student
- Matriculation (Computer Science): 2025 – 2026 | The Best Future Grammar School
- GIAIC: Quarter 4 Student | PCAO-F Cleared | Next Goal: CCAO-F

LEARNING JOURNEY & MILESTONES
- 2024: The Beginning - Selected among 50,000 qualified students from 5 million+ applicants at Governor House Sindh IT Marquee.
- Quarter 01: TypeScript fundamentals & programming logic cleared.
- Quarter 02: Next.js & Tailwind CSS modern frontend engineering cleared.
- Quarter 03: Python & Agentic AI intelligent agents cleared.
- Quarter 04: AI Mentor role after clearing PCAO-F examination. Guiding peers.
- Next Milestone: Preparing for CCAO-F certification.

PROBLEM-SOLVING METHODOLOGY
1. Stay Calm  2. Understand Root Cause  3. Break It Down  4. Research  5. Implement & Test  6. Learn & Refine
`;

  // Standard minimalist single-page valid PDF-1.4 stream
  const lines = [
    "%PDF-1.4",
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj",
    "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj",
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
  ];

  // Build stream text instructions
  let streamText = "BT\n";
  // Title
  streamText += "/F1 22 Tf\n 50 740 Td\n (BATOOL GHOURI) Tj\n";
  streamText += "/F1 11 Tf\n 0 -18 Td\n (Frontend Developer & AI Enthusiast | AI Mentor @ GIAIC) Tj\n";
  streamText += "/F2 9 Tf\n 0 -14 Td\n (batoolghouri10267@gmail.com  |  Karachi, Pakistan  |  Quarter 4 Student) Tj\n";

  // Brand statement
  streamText += "/F1 10 Tf\n 0 -22 Td\n (BRAND STATEMENT) Tj\n";
  streamText += "/F2 9 Tf\n 0 -13 Td\n (\"Curious Mind. Creative Thinking. Continuous Growth.\") Tj\n";

  // Summary
  streamText += "/F1 10 Tf\n 0 -20 Td\n (PROFESSIONAL SUMMARY) Tj\n";
  streamText += "/F2 9 Tf\n 0 -13 Td\n (Passionate frontend developer and AI enthusiast with hands-on technical learning since 2024.) Tj\n";
  streamText += "0 -12 Td\n (Enrolled in Quarter 4 at GIAIC and serving as an AI Mentor helping students prepare for PCAO-F.) Tj\n";

  // Skills
  streamText += "/F1 10 Tf\n 0 -20 Td\n (TECHNICAL COMPETENCIES) Tj\n";
  streamText += "/F2 9 Tf\n 0 -13 Td\n (- Frontend: HTML5, CSS3, TypeScript, Next.js, Tailwind CSS, Responsive Design) Tj\n";
  streamText += "0 -12 Td\n (- Programming & AI: Python, Agentic AI, Autonomous Workflows, Prompt Architecture) Tj\n";

  // Milestones
  streamText += "/F1 10 Tf\n 0 -20 Td\n (GIAIC LEARNING MILESTONES) Tj\n";
  streamText += "/F2 9 Tf\n 0 -13 Td\n (2024: Selected among top 50,000 students from 5 million+ applicants at Governor House Sindh) Tj\n";
  streamText += "0 -12 Td\n (Q1: TypeScript & Programming Fundamentals - Examination Cleared) Tj\n";
  streamText += "0 -12 Td\n (Q2: Next.js & Modern Tailwind CSS Frontend Architecture - Examination Cleared) Tj\n";
  streamText += "0 -12 Td\n (Q3: Python & Agentic AI Autonomous Agents - Examination Cleared) Tj\n";
  streamText += "0 -12 Td\n (Q4: AI Mentor - Successfully cleared PCAO-F; currently mentoring peers in technical mastery) Tj\n";
  streamText += "0 -12 Td\n (Upcoming Goal: Preparing for the CCAO-F examination) Tj\n";

  // Education
  streamText += "/F1 10 Tf\n 0 -20 Td\n (ACADEMIC EDUCATION) Tj\n";
  streamText += "/F2 9 Tf\n 0 -13 Td\n (- Intermediate in Computer Science: 2026 - Present (First Year Student)) Tj\n";
  streamText += "0 -12 Td\n (- Matriculation in Computer Science: 2025 - 2026 (The Best Future Grammar School)) Tj\n";

  // Approach
  streamText += "/F1 10 Tf\n 0 -20 Td\n (PROBLEM-SOLVING APPROACH) Tj\n";
  streamText += "/F2 9 Tf\n 0 -13 Td\n (1. Stay Calm  2. Understand  3. Break It Down  4. Research  5. Implement & Test  6. Learn & Improve) Tj\n";

  streamText += "ET";

  const streamLength = Buffer.byteLength(streamText, 'utf8');

  lines.push(`6 0 obj << /Length ${streamLength} >> stream\n${streamText}\nendstream\nendobj`);

  // Xref table calculation
  let offset = 0;
  const xrefOffsets = [0];
  const body = lines.join("\n") + "\n";
  
  // Calculate offsets for objects
  const objMatches = [...body.matchAll(/(\d+) 0 obj/g)];
  for (const match of objMatches) {
    xrefOffsets.push(match.index);
  }

  const xrefStart = body.length;
  let xref = `xref\n0 ${xrefOffsets.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < xrefOffsets.length; i++) {
    xref += String(xrefOffsets[i]).padStart(10, '0') + " 00000 n \n";
  }

  const trailer = `trailer << /Size ${xrefOffsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const finalPdf = body + xref + trailer;

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'Batool_Ghouri_Resume.pdf'), finalPdf);
  console.log('Successfully created public/Batool_Ghouri_Resume.pdf');
}

generateResumePdf();
