import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isUrdu: boolean;
  t: (key: string) => string;
}

export const translations = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.journey': 'Journey',
    'nav.mentorship': 'Mentorship',
    'nav.approach': 'Approach',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.resume': 'View Resume',
    'nav.role_tag': 'AI Mentor & Dev',
    'nav.active': 'Active',

    // Hero
    'hero.kicker': "HELLO, WORLD! I'M",
    'hero.badge': 'AI Mentor @ GIAIC',
    'hero.name': 'Batool Ghouri',
    'hero.title_initial': 'Frontend Developer & AI Enthusiast.',
    'hero.role1': 'Frontend Developer',
    'hero.role2': 'AI Enthusiast',
    'hero.role3': 'AI Mentor @ GIAIC',
    'hero.desc': 'Exploring the intersection of modern web development and intelligent technologies. Learning, building, and evolving with every line of code.',
    'hero.statement': '"Curious Mind. Creative Thinking. Continuous Growth."',
    'hero.cta_primary': 'Explore My Journey',
    'hero.cta_secondary': "Let's Connect",
    'hero.cta_resume': 'Resume (PDF)',
    'hero.foundation': 'FOUNDATION',
    'hero.quarter': 'GIAIC Quarter 4',

    // About
    'about.kicker': 'DISCOVER THE JOURNEY',
    'about.heading': 'Beyond The Code.',
    'about.subheading': 'Curiosity brought me here. Continuous learning keeps me moving.',
    'about.card_role_label': 'Role:',
    'about.card_role_val': 'AI Mentor @ GIAIC',
    'about.card_stage_label': 'Academic Stage:',
    'about.card_stage_val': 'Quarter 4 Student',
    'about.card_cert_label': 'Certified:',
    'about.card_cert_val': 'PCAO-F Exam Cleared',
    'about.card_philosophy_label': 'Philosophy:',
    'about.card_philosophy_val': '"Turning curiosity into technical skills through continuous learning and mentoring."',
    'about.card_hover_label': 'HOVER TO REVEAL',
    'about.card_revealed_label': 'PHOTO REVEALED',
    'about.p1': "I'm Batool Ghouri, a Computer Science student and aspiring technology professional. My journey started in 2024 through GIAIC (Governor's Initiative for AI and Computing), where I began exploring programming and modern technologies.",
    'about.p2': "Over the past two years, I've developed my understanding of frontend development, programming, and Artificial Intelligence. Currently, I'm in Quarter 4 of my learning journey. Alongside my studies, I've taken on the role of an AI Mentor, helping fellow students understand concepts and prepare for their PCAO-F examinations.",
    'about.perspective_kicker': 'CORE PERSPECTIVE',
    'about.perspective_quote': '"For me, technology is more than writing code. It\'s about curiosity, creativity, problem-solving, and never stopping the learning process."',
    'about.pillar1_title': 'Curious Mind',
    'about.pillar1_desc': 'Continuously asking why, dissecting systems, and embracing technical challenges.',
    'about.pillar2_title': 'Creative Thinking',
    'about.pillar2_desc': 'Translating logical algorithms into fluid, intuitive user experiences.',
    'about.pillar3_title': 'Continuous Growth',
    'about.pillar3_desc': 'Evolving from learner to mentor and giving back to the community.',

    // Skills
    'skills.kicker': 'TECHNICAL PROFICIENCY',
    'skills.heading': 'My Technical Universe.',
    'skills.subheading': "Technologies I'm learning, exploring, and working with.",
    'skills.cat_all': 'All',
    'skills.cat_frontend': 'Frontend Development',
    'skills.cat_programming': 'Programming',
    'skills.cat_ai': 'Artificial Intelligence',
    'skills.desc_html': 'Building the structure of modern web experiences.',
    'skills.desc_css': 'Creating beautiful and responsive visual interfaces.',
    'skills.desc_ts': 'Writing structured and type-safe JavaScript.',
    'skills.desc_next': 'Exploring modern React-based web development.',
    'skills.desc_tailwind': 'Designing responsive interfaces with utility-first styling.',
    'skills.desc_python': 'Developing programming logic and exploring AI technologies.',
    'skills.desc_agentic': 'Exploring intelligent agents and autonomous AI workflows.',
    'skills.focus_tag': 'Hands-on Focus',
    'skills.active_tag': 'Active Exploration →',
    'skills.footer_kicker': 'EXPANDING CAPABILITIES',
    'skills.footer_desc': 'Consistently strengthening engineering fundamentals, building projects with type-safety, responsive layouts, and integrating intelligent autonomous agent workflows.',

    // Journey
    'journey.kicker': 'PROGRESSION TIMELINE',
    'journey.heading': 'Every Milestone Has a Story.',
    'journey.subheading': 'From being a curious learner to becoming a mentor.',
    'journey.m1_title': 'THE BEGINNING',
    'journey.m1_desc': 'Selected among 50,000 qualified students from over 5 million students. My learning journey began at Governor House Sindh IT Marquee, where I studied HTML and CSS as prerequisites.',
    'journey.m1_tag': 'Governor House Sindh',
    'journey.m2_title': 'TYPESCRIPT',
    'journey.m2_desc': 'Explored TypeScript, strengthened my programming fundamentals, and successfully cleared the quarter examination.',
    'journey.m2_tag': 'Exam Cleared',
    'journey.m3_title': 'FRONTEND DEVELOPMENT',
    'journey.m3_desc': 'Learned Next.js and Tailwind CSS, expanding my understanding of modern frontend development. Successfully cleared the quarter examination.',
    'journey.m3_tag': 'Exam Cleared',
    'journey.m4_title': 'PYTHON & AGENTIC AI',
    'journey.m4_desc': 'Entered the world of Python and Agentic AI, explored intelligent technologies, and successfully cleared the quarter examination.',
    'journey.m4_tag': 'Exam Cleared',
    'journey.m5_title': 'AI MENTOR',
    'journey.m5_desc': 'Successfully cleared the PCAO-F examination and earned the opportunity to become an AI Mentor. Now helping fellow students understand concepts, prepare for examinations, and progress in their learning journey.',
    'journey.m5_tag': 'Active Role & PCAO-F',
    'journey.m6_title': 'CCAO-F',
    'journey.m6_desc': 'Preparing for my next academic milestone: successfully clearing the CCAO-F examination.',
    'journey.m6_tag': 'Preparation Phase',
    'journey.current_badge': 'CURRENT MILESTONE',

    // Mentorship
    'mentorship.kicker': 'LEADERSHIP & SERVICE',
    'mentorship.heading': 'From Learning to Leading.',
    'mentorship.subheading': 'Growth becomes more meaningful when you help others grow.',
    'mentorship.badge': 'OFFICIAL DESIGNATION',
    'mentorship.org_label': 'Organization',
    'mentorship.org_val': 'AI MENTOR — GIAIC',
    'mentorship.cred_label': 'Credential Verified',
    'mentorship.cred_val': 'PCAO-F — SUCCESSFULLY CLEARED',
    'mentorship.role_label': 'Active Mandate',
    'mentorship.role_val': 'CURRENT ROLE — GUIDING STUDENTS',
    'mentorship.quote': '"Because sometimes, the best way to understand something is to help someone else learn it."',
    'mentorship.p1': 'Learning has always been an important part of my journey. But one of the most meaningful milestones was getting the opportunity to share what I\'ve learned with others.',
    'mentorship.p2': 'After successfully clearing my PCAO-F examination at GIAIC, I became an AI Mentor. Today, I\'m helping fellow students understand concepts, prepare for their examinations, and approach their learning journey with greater confidence.',
    'mentorship.p3': 'For me, mentorship is not simply about teaching. It\'s about sharing knowledge, encouraging progress, and growing together.',
    'mentorship.pillar1_title': 'Concept Clarity',
    'mentorship.pillar1_desc': 'Deconstructing programming and AI principles into clear mental models.',
    'mentorship.pillar2_title': 'Exam Readiness',
    'mentorship.pillar2_desc': 'Guiding peers through rigorous prep for their PCAO-F milestone.',
    'mentorship.pillar3_title': 'Mutual Growth',
    'mentorship.pillar3_desc': 'Fostering collaborative problem-solving and shared technical confidence.',

    // Approach
    'approach.kicker': 'METHODICAL ENGINEERING',
    'approach.heading': 'How I Turn Problems Into Solutions.',
    'approach.subheading': 'Every challenge has a solution. The key is understanding the problem before rushing towards an answer.',
    'approach.s1_title': 'STAY CALM',
    'approach.s1_desc': 'Approach the challenge with a positive mindset and confidence that it can be solved.',
    'approach.s2_title': 'UNDERSTAND',
    'approach.s2_desc': 'Identify the actual problem and understand what is causing it.',
    'approach.s3_title': 'BREAK IT DOWN',
    'approach.s3_desc': 'Divide complex problems into smaller, manageable steps.',
    'approach.s4_title': 'RESEARCH',
    'approach.s4_desc': 'Explore possible solutions, investigate different approaches, and find the most suitable one.',
    'approach.s5_title': 'IMPLEMENT & TEST',
    'approach.s5_desc': 'Apply the selected solution and test whether it works as expected.',
    'approach.s6_title': 'LEARN & IMPROVE',
    'approach.s6_desc': 'Learn from mistakes, identify improvements, and refine the solution.',

    // Education
    'education.kicker': 'KNOWLEDGE FOUNDATIONS',
    'education.heading': 'Academic Foundations.',
    'education.subheading': 'Formal academics paired with continuous technical computing programs.',
    'education.card1_title': 'Intermediate — Computer Science',
    'education.card1_school': 'Government Degree Girls College Al-Noor',
    'education.card1_year': 'First Year Student',
    'education.card1_desc': 'Currently pursuing Intermediate education in Computer Science, reinforcing mathematics, algorithmic thinking, and core sciences.',
    'education.card1_status': 'Currently Enrolled',
    'education.card2_title': 'Matriculation — Computer Science',
    'education.card2_school': 'The Best Future Grammar School',
    'education.card2_desc': 'Successfully completed matriculation in Computer Science with a strong academic foundation in computing and quantitative studies.',
    'education.card2_status': 'Successfully Completed',
    'education.card3_title': 'GIAIC Computing Initiative',
    'education.card3_school': "Governor's Initiative for AI & Computing",
    'education.card3_exam': 'PCAO-F Exam',
    'education.card3_exam_val': 'Successfully Cleared',
    'education.card3_role': 'Current Role',
    'education.card3_role_val': 'AI Mentor',
    'education.card3_goal': 'Next Academic Goal',
    'education.card3_goal_val': 'CCAO-F Prep',

    // Contact
    'contact.kicker': 'GET IN TOUCH',
    'contact.heading': "Let's Build Connections.",
    'contact.subheading': "I'm always excited to connect with fellow developers, technology enthusiasts, learners, and people who believe in continuous growth. Have an opportunity, an idea, or simply want to connect? Feel free to reach out.",
    'contact.channels_title': 'Connect Directly',
    'contact.channels_desc': 'Choose your preferred network below. Profiles launch instantly in a new browser tab.',
    'contact.form_title': 'Send a Message',
    'contact.form_desc': 'Fill in your details below and I will respond to your inquiry promptly.',
    'contact.label_name': 'Full Name',
    'contact.label_email': 'Email Address',
    'contact.label_subject': 'Subject',
    'contact.label_message': 'Message',
    'contact.btn_send': 'Send Message',
    'contact.btn_sending': 'Dispatching Message...',
    'contact.inbox_info': 'Direct delivery routed to:',

    // Resume Modal
    'resume.title': 'Batool Ghouri — Official Resume',
    'resume.subtitle': 'Frontend Developer & AI Enthusiast · GIAIC AI Mentor',
    'resume.tab_sheet': 'Digital Sheet',
    'resume.tab_pdf': 'Embedded PDF',
    'resume.download': 'Download',
    'resume.open_tab': 'Open in new tab',

    // Footer
    'footer.rights': '© 2026 Batool Ghouri. Crafted with modern web technologies.',
  },
  ur: {
    // Nav
    'nav.home': 'ہوم',
    'nav.about': 'تعارف',
    'nav.skills': 'مہارتیں',
    'nav.journey': 'میرا سفر',
    'nav.mentorship': 'رہنمائی',
    'nav.approach': 'طریقہ کار',
    'nav.education': 'تعلیم',
    'nav.contact': 'رابطہ',
    'nav.resume': 'ریزیومے دیکھیں',
    'nav.role_tag': 'اے آئی مینٹر اور ڈویلپر',
    'nav.active': 'فعال',

    // Hero
    'hero.kicker': 'ہیلو ورلڈ! میں ہوں',
    'hero.badge': 'اے آئی مینٹر @ GIAIC',
    'hero.name': 'بتول غوری',
    'hero.title_initial': 'فرنٹ اینڈ ڈویلپر اور اے آئی کی دلدادہ۔',
    'hero.role1': 'فرنٹ اینڈ ڈویلپر',
    'hero.role2': 'اے آئی کی دلدادہ',
    'hero.role3': 'اے آئی مینٹر @ GIAIC',
    'hero.desc': 'جدید ویب ڈویلپمنٹ اور ذہین ٹیکنالوجیز کے سنگم کی تلاش۔ کوڈ کی ہر لائن کے ساتھ سیکھنا، تعمیر کرنا اور مسلسل آگے بڑھنا۔',
    'hero.statement': '"متجسس ذہن۔ تخلیقی سوچ۔ مسلسل ترقی۔"',
    'hero.cta_primary': 'میرا سفر دریافت کریں',
    'hero.cta_secondary': 'رابطہ قائم کریں',
    'hero.cta_resume': 'ریزیومے (PDF)',
    'hero.foundation': 'بنیاد',
    'hero.quarter': 'جی آئی اے آئی سی کوارٹر 4',

    // About
    'about.kicker': 'سفر کی دریافت',
    'about.heading': 'کوڈ سے ماورا۔',
    'about.subheading': 'تجسس مجھے یہاں لایا۔ مسلسل سیکھنا مجھے آگے بڑھاتا ہے۔',
    'about.card_role_label': 'کردار:',
    'about.card_role_val': 'اے آئی مینٹر @ GIAIC',
    'about.card_stage_label': 'تعلیمی مرحلہ:',
    'about.card_stage_val': 'کوارٹر 4 کی طالبہ',
    'about.card_cert_label': 'سرٹیفائیڈ:',
    'about.card_cert_val': 'PCAO-F امتحان پاس شدہ',
    'about.card_philosophy_label': 'فلسفہ:',
    'about.card_philosophy_val': '"مسلسل سیکھنے اور ساتھیوں کی رہنمائی کے ذریعے تجسس کو حقیقی تکنیکی صلاحیتوں میں بدلنا۔"',
    'about.card_hover_label': 'دیکھنے کے لیے ہاور / ٹیپ کریں',
    'about.card_revealed_label': 'تصویر ظاہر ہوگئی',
    'about.p1': 'میں بتول غوری ہوں، کمپیوٹر سائنس کی طالبہ اور ابھرتی ہوئی ٹیکنالوجی پروفیشنل۔ میرا سفر 2024 میں GIAIC (گورنرز انیشیٹو فار اے آئی اینڈ کمپیوٹنگ) کے ذریعے شروع ہوا، جہاں میں نے پروگرامنگ اور جدید ٹیکنالوجیز سیکھنا شروع کیں۔',
    'about.p2': 'گزشتہ دو سالوں میں، میں نے فرنٹ اینڈ ڈویلپمنٹ، پروگرامنگ، اور آرٹیفیشل انٹیلیجنس میں اپنی صلاحیتوں کو نکھارا ہے۔ فی الوقت، میں اپنے تعلیمی سفر کے کوارٹر 4 میں ہوں۔ اپنی تعلیم کے ساتھ ساتھ، میں نے ایک اے آئی مینٹر کا کردار سنبھالا ہے، جہاں میں ساتھی طلباء کو تصورات سمجھنے اور ان کے PCAO-F امتحانات کی تیاری میں مدد فراہم کر رہی ہوں۔',
    'about.perspective_kicker': 'بنیادی نقطہ نظر',
    'about.perspective_quote': '"میرے نزدیک، ٹیکنالوجی صرف کوڈ لکھنے سے کہیں زیادہ ہے۔ یہ تجسس، تخلیقی سوچ، مسائل کے حل اور سیکھنے کے عمل کو جاری رکھنے کا نام ہے۔"',
    'about.pillar1_title': 'متجسس ذہن',
    'about.pillar1_desc': 'مسلسل سوالات پوچھنا، سسٹمز کی گہرائی سمجھنا اور تکنیکی چیلنجز کا سامنا کرنا۔',
    'about.pillar2_title': 'تخلیقی سوچ',
    'about.pillar2_desc': 'منطقی الگورتھمز کو خوبصورت، رواں اور بدیہی یوزر انٹرفیسز میں تبدیل کرنا۔',
    'about.pillar3_title': 'مسلسل ترقی',
    'about.pillar3_desc': 'ایک سیکھنے والے سے مینٹر کے درجے تک پہنچنا اور کمیونٹی کو علم کا فائدہ پہنچانا۔',

    // Skills
    'skills.kicker': 'تکنیکی مہارت',
    'skills.heading': 'میری تکنیکی کائنات۔',
    'skills.subheading': 'وہ ٹیکنالوجیز جو میں سیکھ رہی ہوں، جن پر کام کر رہی ہوں اور آگے بڑھ رہی ہوں۔',
    'skills.cat_all': 'تمام',
    'skills.cat_frontend': 'فرنٹ اینڈ ڈویلپمنٹ',
    'skills.cat_programming': 'پروگرامنگ',
    'skills.cat_ai': 'مصنوعی ذہانت (اے آئی)',
    'skills.desc_html': 'جدید ویب کے بنیادی ڈھانچے کی تعمیر۔',
    'skills.desc_css': 'خوبصورت اور ریسپانسو ویژول انٹرفیسز کی ڈیزائننگ۔',
    'skills.desc_ts': 'منظم اور ٹائپ سیف جاوا اسکرپٹ کوڈنگ۔',
    'skills.desc_next': 'جدید ری ایکٹ پر مبنی فریم ورک کے ذریعے ویب تعمیر۔',
    'skills.desc_tailwind': 'یوٹیلیٹی فرسٹ اسٹائلنگ کے ساتھ ریسپانسو ڈیزائننگ۔',
    'skills.desc_python': 'پروگرامنگ لاجک اور جدید اے آئی ٹیکنالوجیز کی تیاری۔',
    'skills.desc_agentic': 'خود مختار اے آئی ایجنٹس اور ذہین ورک فلوز کی تفہیم۔',
    'skills.focus_tag': 'عملی فوکس',
    'skills.active_tag': 'فعال دریافت ←',
    'skills.footer_kicker': 'صلاحیتوں میں وسعت',
    'skills.footer_desc': 'انجینئرنگ کی بنیادی باتوں کو مضبوط کرنا، ٹائپ سیف سسٹمز بنانا، اور خود مختار ایجنٹک اے آئی ورک فلوز کو یکجا کرنا۔',

    // Journey
    'journey.kicker': 'ترقی کا ٹائم لائن',
    'journey.heading': 'ہر سنگ میل کی ایک داستان ہے۔',
    'journey.subheading': 'ایک متجسس سیکھنے والے سے لے کر رہنمائی کے مقام تک۔',
    'journey.m1_title': 'آغاز (2024)',
    'journey.m1_desc': '50 لاکھ سے زائد طلباء میں سے منتخب 50,000 امیدواروں میں شمولیت۔ میرا سفر گورنر ہاؤس سندھ آئی ٹی مارکی سے شروع ہوا جہاں میں نے HTML اور CSS سیکھی۔',
    'journey.m1_tag': 'گورنر ہاؤس سندھ',
    'journey.m2_title': 'کوارٹر 01 — ٹائپ اسکرپٹ',
    'journey.m2_desc': 'ٹائپ اسکرپٹ کو دریافت کیا، پروگرامنگ کی بنیادوں کو مستحکم کیا اور کوارٹر کا امتحان کامیابی سے پاس کیا۔',
    'journey.m2_tag': 'امتحان پاس',
    'journey.m3_title': 'کوارٹر 02 — فرنٹ اینڈ ڈویلپمنٹ',
    'journey.m3_desc': 'نیکسٹ جے ایس اور ٹیل ونڈ سی ایس ایس پر عبور حاصل کیا اور جدید ویب ڈویلپمنٹ سیکھی۔ کوارٹر امتحان پاس کیا۔',
    'journey.m3_tag': 'امتحان پاس',
    'journey.m4_title': 'کوارٹر 03 — پائیتھن اور ایجنٹک اے آئی',
    'journey.m4_desc': 'پائیتھن اور ایجنٹک اے آئی کی دنیا میں داخل ہوئی، ذہین خود مختار ماڈلز سیکھے اور امتحان پاس کیا۔',
    'journey.m4_tag': 'امتحان پاس',
    'journey.m5_title': 'کوارٹر 04 — اے آئی مینٹر',
    'journey.m5_desc': 'PCAO-F کا امتحان کامیابی سے پاس کیا اور ایک باقاعدہ اے آئی مینٹر بننے کا اعزاز حاصل کیا۔ اب ساتھی طلباء کی امتحانات کے لیے رہنمائی کر رہی ہوں۔',
    'journey.m5_tag': 'موجودہ کردار اور PCAO-F',
    'journey.m6_title': 'اگلا سنگ میل — CCAO-F',
    'journey.m6_desc': 'اپنے اگلے تعلیمی ہدف کی تیاری: CCAO-F امتحان کو کامیابی سے پاس کرنا۔',
    'journey.m6_tag': 'تیاری کا مرحلہ',
    'journey.current_badge': 'موجودہ سنگ میل',

    // Mentorship
    'mentorship.kicker': 'قیادت اور رہنمائی',
    'mentorship.heading': 'سیکھنے سے لے کر رہنمائی تک۔',
    'mentorship.subheading': 'ترقی تب زیادہ بامعنی بنتی ہے جب آپ دوسروں کو آگے بڑھنے میں مدد دیتے ہیں۔',
    'mentorship.badge': 'باقاعدہ اعزاز',
    'mentorship.org_label': 'ادارہ',
    'mentorship.org_val': 'اے آئی مینٹر — GIAIC',
    'mentorship.cred_label': 'تصدیق شدہ قابلیت',
    'mentorship.cred_val': 'PCAO-F — کامیابی سے پاس',
    'mentorship.role_label': 'موجودہ ذمہ داری',
    'mentorship.role_val': 'طلباء کی رہنمائی اور تیاری',
    'mentorship.quote': '"کیونکہ بعض اوقات کسی چیز کو بہترین انداز میں سمجھنے کا راستہ یہ ہوتا ہے کہ آپ اسے کسی دوسرے کو سکھائیں۔"',
    'mentorship.p1': 'سیکھنا ہمیشہ میرے سفر کا سب سے اہم حصہ رہا ہے۔ لیکن سب سے خوبصورت لمحہ وہ تھا جب مجھے دوسروں کے ساتھ اپنا علم بانٹنے کا موقع ملا۔',
    'mentorship.p2': 'GIAIC میں PCAO-F کا امتحان پاس کرنے کے بعد، میں ایک باضابطہ اے آئی مینٹر بنی۔ آج میں ساتھی طلباء کو پیچیدہ تصورات سمجھانے اور ان کے امتحانات کی تیاری میں مدد دے رہی ہوں۔',
    'mentorship.p3': 'میرے نزدیک، مینٹورشپ صرف پڑھانے کا نام نہیں۔ یہ علم کی منتقلی، حوصلہ افزائی اور ایک ساتھ ترقی کرنے کا سفر ہے۔',
    'mentorship.pillar1_title': 'تصورات کی وضاحت',
    'mentorship.pillar1_desc': 'پروگرامنگ اور اے آئی کے پیچیدہ اصولوں کو آسان ذہنی ماڈلز میں بدلنا۔',
    'mentorship.pillar2_title': 'امتحانی تیاری',
    'mentorship.pillar2_desc': 'ساتھیوں کو PCAO-F کے سنگ میل کی کامیاب تیاری کروانا۔',
    'mentorship.pillar3_title': 'مشترکہ ترقی',
    'mentorship.pillar3_desc': 'باہمی تعاون اور خود اعتمادی کے ساتھ مسائل کو حل کرنا۔',

    // Approach
    'approach.kicker': 'منظم طریقہ کار',
    'approach.heading': 'میں مسائل کو حل میں کیسے بدلتی ہوں۔',
    'approach.subheading': 'ہر چیلنج کا ایک حل ہوتا ہے۔ اصل راز جواب تلاش کرنے میں جلدی کرنے کی بجائے مسئلے کی جڑ کو سمجھنا ہے۔',
    'approach.s1_title': '01 — پرسکون رہیں',
    'approach.s1_desc': 'ایک مثبت ذہنیت اور اس پختہ یقین کے ساتھ چیلنج کا سامنا کریں کہ اسے حل کیا جا سکتا ہے۔',
    'approach.s2_title': '02 — مسئلے کو سمجھیں',
    'approach.s2_desc': 'اصل مسئلے کی نشاندہی کریں اور جانیں کہ اس کی بنیادی وجہ کیا ہے۔',
    'approach.s3_title': '03 — چھوٹے حصوں میں تقسیم کریں',
    'approach.s3_desc': 'پیچیدہ مسائل کو چھوٹے، قابل انتظام مراحل میں تقسیم کریں۔',
    'approach.s4_title': '04 — تحقیق اور جستجو',
    'approach.s4_desc': 'مختلف ممکنہ حل تلاش کریں اور سب سے موزوں طریقہ کار کا انتخاب کریں۔',
    'approach.s5_title': '05 — لاگو کریں اور ٹیسٹ کریں',
    'approach.s5_desc': 'منتخب کردہ حل کو لاگو کریں اور جانچیں کہ آیا یہ توقع کے مطابق کام کر رہا ہے۔',
    'approach.s6_title': '06 — سیکھیں اور نکھاریں',
    'approach.s6_desc': 'تجربات اور غلطیوں سے سیکھیں اور اپنے حل کو مزید بہتر بنائیں۔',

    // Education
    'education.kicker': 'تعلیمی بنیادیں',
    'education.heading': 'تعلیمی بنیادیں۔',
    'education.subheading': 'باقاعدہ کالج کی تعلیم اور مسلسل ایڈوانسڈ کمپیوٹنگ کا امتزاج۔',
    'education.card1_title': 'انٹرمیڈیٹ — کمپیوٹر سائنس',
    'education.card1_school': 'گورنمنٹ ڈگری گرلز کالج النور',
    'education.card1_year': 'فرسٹ ایئر طالبہ',
    'education.card1_desc': 'کمپیوٹر سائنس میں انٹرمیڈیٹ تعلیم، جہاں ریاضی، الگورتھمک سوچ اور بنیادی سائنسز کی تفہیم جاری ہے۔',
    'education.card1_status': 'زیر تعلیم (2026 تا حال)',
    'education.card2_title': 'میٹرک — کمپیوٹر سائنس',
    'education.card2_school': 'دی بیسٹ فیوچر گرامر اسکول',
    'education.card2_desc': 'کمپیوٹر سائنس میں میٹرک کی کامیاب تکمیل، جس نے کمپیوٹنگ کی مضبوط بنیاد رکھی۔',
    'education.card2_status': 'کامیابی سے مکمل (2025 – 2026)',
    'education.card3_title': 'GIAIC کمپیوٹنگ پروگرام',
    'education.card3_school': 'گورنرز انیشیٹو فار اے آئی اینڈ کمپیوٹنگ',
    'education.card3_exam': 'PCAO-F امتحان',
    'education.card3_exam_val': 'کامیابی سے پاس',
    'education.card3_role': 'موجودہ کردار',
    'education.card3_role_val': 'اے آئی مینٹر',
    'education.card3_goal': 'اگلا تعلیمی ہدف',
    'education.card3_goal_val': 'CCAO-F تیاری',

    // Contact
    'contact.kicker': 'رابطہ قائم کریں',
    'contact.heading': 'آئیں تعلقات استوار کریں۔',
    'contact.subheading': 'میں ساتھی ڈویلپرز، ٹیکنالوجی کے دلدادہ افراد اور سیکھنے والوں سے رابطہ قائم کرنے کے لیے ہمیشہ تیار ہوں۔ کوئی موقع ہے، نیا آئیڈیا ہے یا محض بات چیت؟ بلا جھجھک رابطہ کریں۔',
    'contact.channels_title': 'براہ راست رابطے',
    'contact.channels_desc': 'اپنا پسندیدہ پلیٹ فارم منتخب کریں۔ لنک پر کلک کرنے سے براہ راست پروفائل کھل جائے گی۔',
    'contact.form_title': 'پیغام بھیجیں',
    'contact.form_desc': 'نیچے اپنے کوائف درج کریں، میں آپ کے پیغام کا جلد جواب دوں گی۔',
    'contact.label_name': 'پورا نام',
    'contact.label_email': 'ای میل ایڈریس',
    'contact.label_subject': 'موضوع',
    'contact.label_message': 'پیغام',
    'contact.btn_send': 'پیغام بھیجیں',
    'contact.btn_sending': 'پیغام روانہ کیا جا رہا ہے...',
    'contact.inbox_info': 'براہ راست میل باکس:',

    // Resume Modal
    'resume.title': 'بتول غوری — آفیشل ریزیومے',
    'resume.subtitle': 'فرنٹ اینڈ ڈویلپر اور اے آئی شائق · GIAIC اے آئی مینٹر',
    'resume.tab_sheet': 'ڈیجیٹل ڈاکومنٹ',
    'resume.tab_pdf': 'پی ڈی ایف ویو',
    'resume.download': 'ڈاؤن لوڈ',
    'resume.open_tab': 'نئی ونڈو میں دیکھیں',

    // Footer
    'footer.rights': '© 2026 بتول غوری۔ تمام حقوق محفوظ ہیں۔',
  },
} as const;

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  isUrdu: false,
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bg_portfolio_lang');
    return saved === 'ur' ? 'ur' : 'en';
  });

  const isUrdu = language === 'ur';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bg_portfolio_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isUrdu ? 'rtl' : 'ltr';
    if (isUrdu) {
      document.documentElement.classList.add('lang-ur');
    } else {
      document.documentElement.classList.remove('lang-ur');
    }
  }, [language, isUrdu]);

  const t = (key: string): string => {
    const langDict = translations[language] as Record<string, string>;
    const fallbackDict = translations['en'] as Record<string, string>;
    return langDict[key] || fallbackDict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isUrdu, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
