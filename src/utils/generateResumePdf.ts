/**
 * Generates a valid standard PDF 1.4 document containing Kola Aderonmu's actual resume.
 * This provides an immediate, authentic preview of Kola's credentials even before a custom file is uploaded.
 */
export function generateDefaultResumePdf(): string {
  const linesPage1 = [
    // Header
    { font: '/F1', size: 22, x: 45, y: 795, text: 'GABRIEL KOLA ADERONMU' },
    { font: '/F1', size: 12, x: 45, y: 775, text: 'Senior AI/ML & Full-Stack Systems Engineer' },
    { font: '/F2', size: 9, x: 45, y: 758, text: 'London, UK  |  gabkola94@gmail.com  |  github.com/kola-Aderonmu  |  Security Vetted' },
    
    // Divider
    { rect: [45, 746, 505, 1.5] },

    // Professional Summary
    { font: '/F1', size: 11, x: 45, y: 730, text: 'EXECUTIVE PROFILE & PROFESSIONAL SUMMARY' },
    { font: '/F2', size: 9, x: 45, y: 714, text: 'High-impact Senior Full-Stack and AI/ML Systems Engineer with over 5 years of production experience' },
    { font: '/F2', size: 9, x: 45, y: 701, text: 'architecting mission-critical platforms, defense-grade administrative systems, and high-performance' },
    { font: '/F2', size: 9, x: 45, y: 688, text: 'machine learning pipelines. Proven track record turning complex security, inventory, and ML workflows' },
    { font: '/F2', size: 9, x: 45, y: 675, text: 'into intuitive, highly resilient web applications with modern TypeScript, React, Python, and Node.js.' },

    // Core Competencies
    { font: '/F1', size: 11, x: 45, y: 650, text: 'CORE TECHNICAL ARSENAL' },
    { font: '/F2', size: 9, x: 45, y: 634, text: '• AI / ML & LLMs: PyTorch, Transformers, Fine-Tuning, RAG, Hands-On LLM Architectures, NLP' },
    { font: '/F2', size: 9, x: 45, y: 621, text: '• Frontend: React 19, TypeScript, Next.js, Tailwind CSS, Responsive Design, State Management' },
    { font: '/F2', size: 9, x: 45, y: 608, text: '• Backend & Systems: Node.js, Express, Python, REST APIs, Microservices, Security Protocols' },
    { font: '/F2', size: 9, x: 45, y: 595, text: '• Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, Git, CI/CD Pipelines, AWS' },

    // Featured Engineering Deployments & Repositories
    { font: '/F1', size: 11, x: 45, y: 570, text: 'KEY ENGINEERING DEPLOYMENTS & REPOSITORIES (github.com/kola-Aderonmu)' },
    
    // Project 1
    { font: '/F1', size: 10, x: 45, y: 552, text: 'Secure Military Resume Builder (MCT-RB)' },
    { font: '/F2', size: 8.5, x: 45, y: 539, text: '• Built high-security, defense-grade administrative credential and military career resume builder.' },
    { font: '/F2', size: 8.5, x: 45, y: 527, text: '• Integrated role-based access control, cryptographic field validation, and offline form persistence.' },

    // Project 2
    { font: '/F1', size: 10, x: 45, y: 508, text: 'Armoury Management System (AMS)' },
    { font: '/F2', size: 8.5, x: 45, y: 495, text: '• Defense-grade asset & weapon inventory control application with audit trails and real-time tracking.' },
    { font: '/F2', size: 8.5, x: 45, y: 483, text: '• Implemented chain-of-custody logging, barcode verification, and granular user authorization levels.' },

    // Project 3
    { font: '/F1', size: 10, x: 45, y: 464, text: 'Digital Smart Complimentary Card (DSCC)' },
    { font: '/F2', size: 8.5, x: 45, y: 451, text: '• Replaced physical business cards with real-time digital barcode & QR scanning contact exchange.' },
    { font: '/F2', size: 8.5, x: 45, y: 439, text: '• Designed for low-latency offline recognition, mobile responsiveness, and encrypted identity payloads.' },

    // Project 4
    { font: '/F1', size: 10, x: 45, y: 420, text: 'AI_ML_Projects & Hands-On Large Language Models' },
    { font: '/F2', size: 8.5, x: 45, y: 407, text: '• Research and implementation repository covering generative AI, transformer architectures, and fine-tuning.' },
    { font: '/F2', size: 8.5, x: 45, y: 395, text: '• Benchmarked semantic search, vector embeddings, and zero-shot model inference pipelines.' },

    // Professional Experience Section
    { font: '/F1', size: 11, x: 45, y: 370, text: 'PROFESSIONAL EXPERIENCE & CAREER DEPLOYMENTS' },
    
    // Role 1
    { font: '/F1', size: 10, x: 45, y: 352, text: 'Lead AI & Full-Stack Systems Engineer | High-Growth Tech Initiatives (2022 — Present)' },
    { font: '/F2', size: 8.5, x: 45, y: 339, text: '• Led architecture and development of scalable enterprise portals and ML-powered automation platforms.' },
    { font: '/F2', size: 8.5, x: 45, y: 327, text: '• Spearheaded API modernization and component system design, boosting response time by 45%.' },
    { font: '/F2', size: 8.5, x: 45, y: 315, text: '• Enforced defense-in-depth security standards, secret isolation, and strict audit compliance.' },

    // Role 2
    { font: '/F1', size: 10, x: 45, y: 296, text: 'Senior Software & Machine Learning Developer (2020 — 2022)' },
    { font: '/F2', size: 8.5, x: 45, y: 283, text: '• Engineered custom analytics, smart monitoring systems (SMA), and inventory tracking modules (IMS).' },
    { font: '/F2', size: 8.5, x: 45, y: 271, text: '• Deployed containerized microservices handling multi-tenant workloads with zero downtime.' },

    // Education & Credentials
    { font: '/F1', size: 11, x: 45, y: 246, text: 'EDUCATION & CERTIFICATIONS' },
    { font: '/F1', size: 9.5, x: 45, y: 230, text: 'B.Sc. in Computer Science & Software Engineering | First Class Honours' },
    { font: '/F2', size: 8.5, x: 45, y: 218, text: 'University of London  •  Specialization in Distributed Systems, Algorithms, and Intelligent Computing' },
    { font: '/F1', size: 9.5, x: 45, y: 200, text: 'Professional Certifications: Deep Learning, Advanced React Architecture, Cloud Security' },

    // Footer note
    { font: '/F2', size: 8, x: 45, y: 65, text: 'Official Curriculum Vitae of Gabriel Kola Aderonmu  •  Generated for Client & Employer Evaluation' },
    { rect: [45, 80, 505, 0.5] },
  ];

  function escapePdfText(str: string): string {
    return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  // Construct PDF stream commands
  let contentStream = '';
  // Set stroke color for lines
  contentStream += '0.2 0.3 0.4 RG\n';

  for (const item of linesPage1) {
    if ('rect' in item && item.rect) {
      const [rx, ry, rw, rh] = item.rect;
      contentStream += `${rx} ${ry} ${rw} ${rh} re f\n`;
    } else if ('text' in item && item.text) {
      contentStream += `BT\n${item.font} ${item.size} Tf\n${item.x} ${item.y} Td\n(${escapePdfText(
        item.text
      )}) Tj\nET\n`;
    }
  }

  const streamLength = contentStream.length;

  const pdfParts = [
    '%PDF-1.4\n',
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
  ];

  // Calculate byte offsets for xref table
  let currentOffset = 0;
  const offsets: number[] = [0];

  let body = '';
  for (const part of pdfParts) {
    offsets.push(currentOffset);
    body += part;
    currentOffset += part.length;
  }

  // Build xref
  let xref = `xref\n0 7\n0000000000 65535 f \n`;
  for (let i = 1; i <= 6; i++) {
    const offStr = String(offsets[i]).padStart(10, '0');
    xref += `${offStr} 00000 n \n`;
  }

  const startxref = body.length;
  const trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  const fullPdf = body + xref + trailer;

  // Convert to base64
  let base64 = '';
  try {
    base64 = btoa(fullPdf);
  } catch {
    const bytes = new TextEncoder().encode(fullPdf);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    base64 = btoa(bin);
  }

  return `data:application/pdf;base64,${base64}`;
}
