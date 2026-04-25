import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  FileText, 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  History, 
  MessageSquare, 
  ExternalLink,
  GraduationCap,
  Scale,
  Stamp
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHT IMPORTANT WORDS
   ═══════════════════════════════════════════════════════════ */
const BOLD_KEYWORDS = [
  'NAAC', 'National Assessment and Accreditation Council', 'B+ Grade', '2nd Cycle',
  'SSR', 'Self Study Report', 'IIQA', 'Peer Team Report', 'Quality Sustenance',
  'Institutional', 'Quality Assurance', 'AQAR'
];

function HighlightText({ text }) {
  if (!text) return null;
  const regex = new RegExp(`(${BOLD_KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    BOLD_KEYWORDS.some(k => k.toLowerCase() === part.toLowerCase())
      ? <strong key={i} className="font-bold text-slate-800">{part}</strong>
      : <span key={i}>{part}</span>
  );
}

export default function Naac() {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [activeCriterion, setActiveCriterion] = useState(null);

  const carouselPhrases = [
    { main: "NAAC", highlight: "ACCREDITED" },
    { main: "QUALITY", highlight: "BENCHMARK" },
    { main: "INSTITUTIONAL", highlight: "EXCELLENCE" },
    { main: "CONTINUOUS", highlight: "GROWTH" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSentenceIdx((prev) => (prev + 1) % carouselPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Cycle", value: "2nd Cycle", icon: History },
    { label: "Grade", value: "B+", icon: Award },
    { label: "Valid Until", value: "Feb 12, 2030", icon: ShieldCheck }
  ];

  const statutoryLinks = [
    { title: "IIQA (Revised)", url: "https://www.nsec.ac.in/impdoc/2ndcycle/IIQA_NSEC_Revised.pdf", icon: FileText, category: "Statutory" },
    { title: "Letter of Undertaking", url: "https://www.nsec.ac.in/impdoc/2ndcycle/Undertaking_NAAC%20Accreditation_2nd%20Cycle.pdf", icon: ShieldCheck, category: "Statutory" },
    { title: "Accreditation Certificate", url: "https://www.nsec.ac.in/notice/NAAC-NSEC.pdf", icon: Award, category: "Statutory" },
    { title: "SSR (2nd Cycle)", url: "https://www.nsec.ac.in/page.php?id=748", icon: FileText, category: "Statutory" },
    { title: "DVV Clarification", url: "https://www.nsec.ac.in/page.php?id=749", icon: CheckCircle2, category: "Statutory" }
  ];

  const iqacData = {
    about: "Internal Quality Assurance Cell (IQAC) has been established in the institution in 2013 as a prime measures for quality enhancement initiatives and quality sustenance accomplishments. The quality enhancement in teaching-learning is a continuous process and the goal is to develop a system for conscious, consistent and catalytic improvement in the overall performance of the institution. The IQAC always encompasses the culture of belongingness and participation of stakeholders in all the activities of the institution. “Pursuit of excellence in Education” has been identified as the first and foremost distinctive feature in the vision of the institute followed by two other associated features, namely, Research and Entrepreneurship. The institution has extensively practiced outcome based education to increase knowledge, skills and performance of the learners.",
    vision: "To develop and assure a quality culture within the institution through proper assessment, up gradation and sustainable initiatives intending an academic and administrative excellence.",
    mission: [
      "To evolve and implement the measures for continuous enhancement of the academic environment intending an outcome-based education system through modern techniques.",
      "To ensure transparency, accountability and credibility in accordance with internationally acceptable quality assurance practice.",
      "To nurture the creativity of the students by arranging several national level programs with proper coordination of various departments.",
      "To evaluate the annual progress in terms of academic and administrative activities through proper documentation.",
      "To establish a quality benchmark and institutionalized as well as internationalized the quality culture."
    ],
    objectives: [
      "To develop systematic strategies for continuous improvement of the academic and administrative performance of the institution to enhance and ensure the environment of quality culture.",
      "To stimulate the methods for institutionalization of best practices by proper coordination of various activities of documentation and communication through modern technologies.",
      "To promote the methodology of effective teaching-learning of the programs through real time visualization with the scholastic delivery system and implementation of the necessary remedies to reduce the curriculum gap.",
      "To inculcate a creative and innovative ecosystem within the institution and to encourage the social activities within the learners for holistic development.",
      "To become accredited by NAAC and NBA by the coming year to secure a suitable position among the best institutions of this country."
    ],
    functions: [
      "Formulate and apply the quality benchmarks/parameters for various academic and administrative activities of the institution.",
      "Instill quality culture in terms instructional delivery and assessment processes for quality sustenance and enhancement.",
      "Publish and disseminate information on various quality parameters of higher education.",
      "Create and facilitate learner-centric education through appropriate methodologies.",
      "Develop and arrange feedback responses from students, parents and other stakeholders on quality-related institutional processes.",
      "Monitor and document various academic activities leading to quality improvement.",
      "Develop and maintain institutional database for enhancing the institutional quality.",
      "Plan and organize training program, workshops, seminars, etc for continuous quality improvement.",
      "Prepare the Annual Quality Assurance report (AQAR) as per NAAC guidelines."
    ],
    coordinator: {
      name: "Dr. Sukumar Roy",
      role: "Professor-Dept. of Biomedical Engineering & Coordinator-IQAC",
      email: "coordinator.iqac@nsec.ac.in, sroybme@gmail.com",
      phone: "9433408287",
      desk: "Netaji Subash Engineering College is one the premier self-financing engineering college in the eastern part of India. The students are the first and foremost concern of our institution and the society at large. The unstinting goal is to make our institution a unique place for engineering education and equally focuses the mind and personality of our students. Our institution imparting quality education since inception and it lies mainly on our dedicated faculty members, quality infrastructure, a large pool of learning resources and the last but not the least, our hardworking and brilliant students."
    },
    composition: [
      { role: "Chairperson", name: "Prof. (Dr.) Amal K Ghosh", detail: "Principal, NSEC" },
      { role: "Teacher Representative", name: "Prof. Indranil Ghosh", detail: "Asso. Professor- BESH" },
      { role: "Teacher Representative", name: "Prof. Anupam Ghosh", detail: "Professor-CSE" },
      { role: "Teacher Representative", name: "Prof. Anupam Bera", detail: "Assit. Professor-IT" },
      { role: "Teacher Representative", name: "Prof. Silpi Bose", detail: "Assit. Professor-CSE" },
      { role: "Teacher Representative", name: "Prof. Tridibesh Nag", detail: "Asso. Professor & HOD-EE" },
      { role: "Teacher Representative", name: "Prof. Krishnendu Bhattacharyya", detail: "Assit. Professor-BESH" },
      { role: "Teacher Representative", name: "Prof. Koushik Dutta", detail: "Professor & HOD-ECE" },
      { role: "Management", name: "Dr. Arindam Roy", detail: "Director-Operation, Techno India Group" },
      { role: "Senior Admin Officer", name: "Mr. Soumava Goswami", detail: "C. Administrator" },
      { role: "Local Society/Trust", name: "Mrs. Papiya Halder", detail: "Local Councilor" },
      { role: "Student", name: "Mr. Aritra Bag", detail: "2nd Year-CSE" },
      { role: "Alumni", name: "Mr. Sumanta Chatterjee", detail: "Assit. Director-TIG" },
      { role: "Employer", name: "Mr. Manik Sarkar", detail: "Director-Lexmark International (India) Pvt. Ltd." },
      { role: "Stakeholder", name: "Mr. R.N.Ghosh", detail: "Member" },
      { role: "Industrialist", name: "Mr. Digbijoy Chakraborty", detail: "MD & CEO – SunEcoTech Pvt. Ltd." },
      { role: "Coordinator, IQAC", name: "Dr. Sukumar Roy", detail: "Professor-BME & Dean-Academic Affairs" }
    ],
    annualReports: [
      { year: "2023-24", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2023-2024.pdf" },
      { year: "2022-23", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2022-2023.pdf" },
      { year: "2021-22", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2021-2022.pdf" },
      { year: "2020-21", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2020-2021.pdf" },
      { year: "2019-20", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2019-2020.pdf" },
      { year: "2018-19", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2018-2019.pdf" },
      { year: "2017-18", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2017-2018.pdf" },
      { year: "2016-17", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2016-2017.pdf" },
      { year: "2015-16", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2015-2016.pdf" },
      { year: "2014-15", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2014-2015.pdf" },
      { year: "2013-14", url: "https://www.nsec.ac.in/impdoc/IQAC-Annual-Report-2013-2014.pdf" }
    ],
    meetings: [
      { label: "Composition & Functions", url: "https://www.nsec.ac.in/impdoc/230710_1_IQAC_Office%20Order.pdf" },
      { label: "Meeting Minutes & ATR", url: "https://www.nsec.ac.in/page.php?id=514" }
    ]
  };

  const cycles = {
    second: {
      period: "2025 - 2030",
      status: "Accredited",
      docs: [
        { title: "Accreditation Certificate", url: "https://www.nsec.ac.in/notice/NAAC-NSEC.pdf" },
        { title: "IIQA Information", url: "https://assessmentonline.naac.gov.in/public/index.php/iiqa_report/eyJpdiI6InRKYTc4MDBJcE1ZOXNUa0lyZjNiRGc9PSIsInZhbHVlIjoiMEUxbmd3MjRXYkJ6RkRDLzE5WFA4dz09IiwibWFjIjoiNGM1MjA3MjMzMTc2NzNmMGRkZWEzZjA3NzQ3MDVhMjc1MmM3NGE2YTU2NjgzMWZjMzg4Y2Q4NTFkOGJhN2E5ZCIsInRhZyI6IiJ9" },
        { title: "SSR Information", url: "https://assessmentonline.naac.gov.in/public/index.php/ssr_report/eyJpdiI6InBvdE5SKytFb1RuVGZaTWxmMnkvZWc9PSIsInZhbHVlIjoiUExvVGlPWWlNbWQ4S25EbmxLOVVSdz09IiwibWFjIjoiZWFjZjg3YzExYTFhNjkwN2EwMTg2ZDJmZTk3MGQ2Mzc0N2NlYmQ1ZmFkNTMwODk0YjgwYzZjZDZmOGNjNzc1MCIsInRhZyI6IiJ9" },
        { title: "Peer Team Report", url: "https://assessmentonline.naac.gov.in/public/index.php/peerteam_report/eyJpdiI6IkhLK1diMWNVOVJkOEZCUCthNVZjaXc9PSIsInZhbHVlIjoiUW1pbHhhamx0cm9ZN1BCQ2JPSWxmdz09IiwibWFjIjoiMmUwZTU5ZTIwODlmNjBmMjZhZDc3NTZiZWU5MzBlYWYwZmI5Yjk0YWE1Y2NjNmQ4YTEyYmE3N2U1ZmE2ZTQ4YyIsInRhZyI6IiJ9" },
        { title: "Grade Sheet", url: "https://assessmentonline.naac.gov.in/public/index.php/grade_sheet_rpt/eyJpdiI6IjhiZzFETklDb1B2WTMxaUJBdkNiMnc9PSIsInZhbHVlIjoiTXdoVVliWmtERjVqT3VEa1o3RE54dz09IiwibWFjIjoiM2ZhNDY1Y2QyOTM0ZTdiZWIwNzFmZDYxMTA0NjY2MjE3ODQ5NDI3ZTRkOTc2MmRhZmU5MDY5MTRlZmJkYjA2NCIsInRhZyI6IiJ9" }
      ],
      aqars: [
        { year: "2023-24", url: "https://www.nsec.ac.in/impdoc/AQAR-2023-2024.pdf" }
      ]
    },
    first: {
      period: "2019 - 2024",
      status: "Completed",
      docs: [
        { title: "Accreditation Certificate", url: "https://www.nsec.ac.in/impdoc/NAAC-NSEC-1st-Cycle-Certificate.pdf" },
        { title: "IIQA Information", url: "https://www.nsec.ac.in/impdoc/NAAC-NSEC-1st-Cycle-IIQA.pdf" },
        { title: "SSR Information", url: "https://www.nsec.ac.in/notice/SSR-NSEC-2018.pdf" },
        { title: "Peer Team Report", url: "https://www.nsec.ac.in/impdoc/NAAC-NSEC-1st-Cycle-Peer-Team-Report.pdf" },
        { title: "Grade Sheet", url: "https://www.nsec.ac.in/impdoc/NAAC-NSEC-1st-Cycle-Grade-Sheet.pdf" }
      ],
      aqars: [
        { year: "2022-23", url: "https://www.nsec.ac.in/impdoc/aqar2022-23/AQAR_2022-2023_5th%20yr%20Report_230217.pdf" },
        { year: "2021-22", url: "https://www.nsec.ac.in/impdoc/aqar2021-22/AQAR_1st_Cycle_Report_2021-22.pdf" },
        { year: "2020-21", url: "https://www.nsec.ac.in/impdoc/aqar2020-21/AQAR_2020-2021_2203031_12296.pdf" },
        { year: "2019-20", url: "https://www.nsec.ac.in/notice/AQAR-19-20.pdf" },
        { year: "2018-19", url: "https://www.nsec.ac.in/impdoc/aqar2018-19/AQAR_1st_Cycle_Report_2018-2019.pdf" }
      ]
    }
  };

  const extendedProfile = [
    { id: "1.1", title: "Number of Students (Last 5 Years)", url: "https://www.nsec.ac.in/impdoc/2ndcycle/extended_profile/11Number_of_students_5years.pdf" },
    { id: "2.1", title: "Number of Teaching Staff", url: "https://www.nsec.ac.in/impdoc/2ndcycle/extended_profile/2-1-teaching-staff.pdf" },
    { id: "3.1", title: "Expenditure Excluding Salary", url: "https://www.nsec.ac.in/impdoc/2ndcycle/extended_profile/3-1-Expenditure-Five-Years.xlsx" }
  ];

  const criterionDocs = [
    { id: "1", title: "Curricular Aspects", url: "https://www.nsec.ac.in/page.php?id=736" },
    { id: "2", title: "Teaching-Learning & Eval.", url: "https://www.nsec.ac.in/page.php?id=737" },
    { id: "3", title: "Research, Innovations & Ext.", url: "https://www.nsec.ac.in/page.php?id=738" },
    { id: "4", title: "Infrastructure & Learning Res.", url: "https://www.nsec.ac.in/page.php?id=739" },
    { id: "5", title: "Student Support & Progression", url: "https://www.nsec.ac.in/page.php?id=740" },
    { id: "6", title: "Governance, Leadership & Mgmt", url: "https://www.nsec.ac.in/page.php?id=741" },
    { id: "7", title: "Institutional Values & Best Prac.", url: "https://www.nsec.ac.in/page.php?id=742" }
  ];



  const criterionDetails = {
    "1": {
      title: "Curricular Aspects",
      indicators: [
        {
          id: "1.1.1",
          title: "Curriculum Planning & Delivery",
          description: "The Institution ensures effective curriculum planning and delivery through a well-planned and documented process including Academic calendar and conduct of continuous internal Assessment",
          links: [
            { label: "Implementation Process", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/111Curricular_Planning&Implementation.pdf", type: "pdf" }
          ]
        },
        {
          id: "1.2.1",
          title: "Certificate / Value Added Courses",
          description: "Number of Certificate/Value added courses offered and online courses of MOOCs, SWAYAM, NPTEL etc. completed during the last five years",
          links: [
            { label: "MOOCs / NPTEL Summary", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/121MOOCs.pdf", type: "pdf" }
          ],
          years: [
            { label: "2022-23", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/2022-2023%20_Enrollment_SWAYAM-NPTEL-Coursera.xlsx" },
            { label: "2021-22", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/2021-2022_%20Enrolment_SWAYAM-NPTEL_Coursera.xlsx" },
            { label: "2020-21", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/2020-2021_Enrolment_SWAYAM-NPTEL_Coursera_IITB.xlsx" },
            { label: "2019-20", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/2019-2020%20Enrolment_SWAYAM-NPTEL_IITB.xlsx" },
            { label: "2018-19", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/2018-2019_Enrolment_SWAYAM-NPTEL_IITB.xlsx" }
          ]
        },
        {
          id: "1.2.2",
          title: "Student Enrollment in Courses",
          description: "Percentage of students enrolled in Certificate/ Value added courses and also completed online courses of MOOCs, SWAYAM, NPTEL etc.",
          links: [
            { label: "Supporting Document", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/122_supporting_documents.pdf", type: "pdf" },
            { label: "Data Format", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/122_prescribed_format.xlsx", type: "xlsx" }
          ]
        },
        {
          id: "1.3.1",
          title: "Cross-cutting Issues",
          description: "Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability in transacting the Curriculum",
          links: [
            { label: "Integration Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/131Cross_Cutting_Issues.pdf", type: "pdf" }
          ]
        },
        {
          id: "1.3.2",
          title: "Project / Field Work / Internships",
          description: "Percentage of students undertaking project work/field work/ internships (Latest completed academic year)",
          links: [
            { label: "Supporting Document", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/132_supporting_documents.pdf", type: "pdf" },
            { label: "Data Format", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/132_prescribed_format.xlsx", type: "xlsx" }
          ]
        },
        {
          id: "1.4.1",
          title: "Feedback System",
          description: "Institution obtains feedback on academic performance and ambience from Students, Teachers, Employers, Alumni etc.",
          links: [
            { label: "Stakeholders Feedback Analysis", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/141feedback_analysis_on_curriculum.pdf", type: "pdf" },
            { label: "Teaching-Learning Feedback", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria1/141feedback_analysis_on_teaching_learning.pdf", type: "pdf" }
          ]
        }
      ]
    },
    "2": {
      title: "Teaching-Learning and Evaluation",
      indicators: [
        {
          id: "2.1.1",
          title: "Enrollment Percentage",
          description: "Average enrollment percentage of students during the last five years",
          links: [
            { label: "Summary Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/211Enrollment_percentage_Link_Page.pdf", type: "pdf" }
          ],
          years: [
            { label: "2022-23", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/211FIRST-YEAR-ADMISSION-2022-23.pdf" },
            { label: "2021-22", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/211FIRST-YEAR-ADMISSION-2021-22.pdf" },
            { label: "2020-21", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/211FIRST-YEAR-ADMISSION-2020-21.pdf" },
            { label: "2019-20", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/211FIRST-YEAR-ADMISSION-2019-20.pdf" },
            { label: "2018-19", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/211FIRST-YEAR-ADMISSION-2018-19.pdf" }
          ]
        },
        {
          id: "2.1.2",
          title: "Reserved Category Seats",
          description: "Percentage of seats filled against reserved categories (SC, ST, OBC etc.) as per applicable reservation policy",
          links: [
            { label: "Seat Matrix & Policy", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/212Seat_Matrix_No_Reservation.pdf", type: "pdf" }
          ]
        },
        {
          id: "2.3.1",
          title: "Student Centric Methods",
          description: "Experiential learning, participative learning and problem solving methodologies used for enhancing learning experiences",
          links: [
            { label: "Teaching Methodologies", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/231Student_Centric_Menthods.pdf", type: "pdf" }
          ]
        },
        {
          id: "2.4.1",
          title: "Full-time Teachers",
          description: "Percentage of full-time teachers against sanctioned posts during the last five years",
          links: [
            { label: "Sanctioned Posts Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/241Sanctioned_posts_of_full_time_teachers.pdf", type: "pdf" }
          ]
        },
        {
          id: "2.4.2",
          title: "Teachers with PhD / NET",
          description: "Percentage of full time teachers with NET/SET/SLET/ Ph. D./D.Sc. / D.Litt./L.L.D. during the last five years",
          links: [
            { label: "Teacher Qualifications", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/242PhDTeachers.pdf", type: "pdf" }
          ]
        },
        {
          id: "2.5.1",
          title: "Assessment Transparency",
          description: "Mechanism of internal/ external assessment is transparent and grievance redressal system is time-bound",
          links: [
            { label: "Grievance Redressal Mechanism", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/251Mechanism_Assessment_Grievance_Redressal.pdf", type: "pdf" }
          ]
        },
        {
          id: "2.6.1",
          title: "PO & CO Statements",
          description: "Programme Outcomes (POs) and Course Outcomes (COs) for all programmes are stated and displayed",
          links: [
            { label: "Outcome Statements", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/261_POs_PSOs_COs_on_Website.pdf", type: "pdf" }
          ]
        },
        {
          id: "2.6.2",
          title: "Attainment Evaluation",
          description: "Attainment of POs and COs are evaluated and documented",
          links: [
            { label: "Evaluation Process", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/262Attainment_of_POs_and_COs_are_evaluated.pdf", type: "pdf" }
          ]
        },
        {
          id: "2.6.3",
          title: "Pass Percentage",
          description: "Average pass percentage of Students during last five years (excluding backlog students)",
          links: [
            { label: "Result Analysis", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/263Pass_percentage_of_Students.pdf", type: "pdf" }
          ]
        },
        {
          id: "2.7.1",
          title: "Student Satisfaction Survey",
          description: "Results and analysis of the Student Satisfaction Survey on overall institutional performance",
          links: [
            { label: "SSS Results", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria2/271SSS_Student_Profile_List_Website_Link.pdf", type: "pdf" }
          ]
        }
      ]
    },
    "3": {
      title: "Research, Innovations and Extension",
      indicators: [
        {
          id: "3.1.1",
          title: "Research Grants",
          description: "Grants received from Government and non-governmental agencies for research projects / endowments",
          links: [
            { label: "Supporting Documents", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/311_supporting_documents.pdf", type: "pdf" },
            { label: "Prescribed Format", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/311_prescribed_format.xlsx", type: "xlsx" }
          ]
        },
        {
          id: "3.2.1",
          title: "Innovation Ecosystem",
          description: "Ecosystem for innovations, Indian Knowledge System (IKS), IPR cell, and Incubation centre",
          links: [
            { label: "Ecosystem Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/321Ecosystem_Innovation.pdf", type: "pdf" }
          ]
        },
        {
          id: "3.2.2",
          title: "Workshops & Seminars",
          description: "Workshops/seminars/conferences on Research Methodology, IPR and entrepreneurship",
          links: [
            { label: "Supporting Documents", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/322_supporting_documents.pdf", type: "pdf" },
            { label: "Prescribed Format", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/322_prescribed_format.xlsx", type: "xlsx" }
          ]
        },
        {
          id: "3.3.1",
          title: "Research Publications",
          description: "Research papers published per teacher in the Journals notified on UGC care list",
          links: [
            { label: "UGC Care List Papers", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/331Research_paper_UGCcare_last_5Years.pdf", type: "pdf" },
            { label: "Non-UGC Journal Papers", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/331Research_paper_published_in_Non-UGC_Journal.pdf", type: "pdf" }
          ]
        },
        {
          id: "3.3.2",
          title: "Books & Conference Papers",
          description: "Books and chapters in edited volumes and papers in national/ international conference proceedings",
          links: [
            { label: "List of Publications", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/332Books_Chapters_Conference_Proceedings.pdf", type: "pdf" },
            { label: "Publication Copies", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/332_Books_Chapters_Conference_Proceedings_Copies.pdf", type: "pdf" }
          ]
        },
        {
          id: "3.4.1",
          title: "Extension Activities",
          description: "Outcomes of extension activities in neighborhood community and social issues awareness",
          links: [
            { label: "Extension Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/341Extension_Community_Activities.pdf", type: "pdf" }
          ]
        },
        {
          id: "3.4.2",
          title: "Extension Awards",
          description: "Awards and recognitions received for extension activities from government bodies",
          links: [
            { label: "Awards List", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/342Awards&Recognition.pdf", type: "pdf" }
          ]
        },
        {
          id: "3.4.3",
          title: "Outreach Programs",
          description: "Extension and outreach programs conducted through organized forums including NSS/NCC",
          links: [
            { label: "Outreach Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/343Extension&Outreach_Programs.pdf", type: "pdf" }
          ]
        },
        {
          id: "3.5.1",
          title: "Functional MoUs",
          description: "MoUs/linkages with institutions/ industries for internship, training, and collaborative research",
          links: [
            { label: "MoU Documents", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria3/351MoUs.pdf", type: "pdf" }
          ]
        }
      ]
    },
    "4": {
      title: "Infrastructure and Learning Resources",
      indicators: [
        {
          id: "4.1.1",
          title: "Physical Facilities",
          description: "Infrastructure for teaching-learning (classrooms, labs) and facilities for cultural/sports activities",
          links: [
            { label: "Infrastructure Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria4/411Physical_Facilities.pdf", type: "pdf" }
          ]
        },
        {
          id: "4.1.2",
          title: "Infrastructure Expenditure",
          description: "Percentage of expenditure for infrastructure development and augmentation excluding salary",
          links: [
            { label: "Audited Report 2022-23", url: "https://www.nsec.ac.in/notice/audited-report-2022-2023.pdf", type: "pdf" },
            { label: "Audited Report 2021-22", url: "https://www.nsec.ac.in/notice/audited-report-2021-2022.pdf", type: "pdf" },
            { label: "Audited Report 2020-21", url: "https://www.nsec.ac.in/notice/audited-report-2020-2021.pdf", type: "pdf" },
            { label: "Audited Report 2019-20", url: "https://www.nsec.ac.in/notice/audited-report-2019-2020.pdf", type: "pdf" },
            { label: "Audited Report 2018-19", url: "https://www.nsec.ac.in/notice/audited-report-2018-2019.pdf", type: "pdf" }
          ]
        },
        {
          id: "4.2.1",
          title: "Library Automation",
          description: "Library automated using ILMS with adequate subscriptions to e-resources and journals",
          links: [
            { label: "Library Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria4/421Library_Automated.pdf", type: "pdf" }
          ]
        },
        {
          id: "4.3.1",
          title: "IT Infrastructure",
          description: "Regular updates to IT facilities and bandwidth for internet connection (Wi-Fi details)",
          links: [
            { label: "IT Facilities Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria4/431IT_facilities&Bandwidth.pdf", type: "pdf" }
          ]
        },
        {
          id: "4.3.2",
          title: "Student-Computer Ratio",
          description: "Data for the latest completed academic year regarding student-computer availability",
          links: [
            { label: "Ratio Analysis", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria4/432Student_Computer_Ratio.pdf", type: "pdf" }
          ]
        },
        {
          id: "4.4.1",
          title: "Maintenance Expenditure",
          description: "Percentage expenditure incurred on maintenance of physical and academic support facilities",
          links: [
            { label: "Supporting Documents", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria4/441_supporting_documents.pdf", type: "pdf" },
            { label: "Prescribed Format", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria4/441_prescribed_format.xlsx", type: "xlsx" }
          ]
        }
      ]
    },
    "5": {
      title: "Student Support and Progression",
      indicators: [
        {
          id: "5.1.1",
          title: "Scholarships & Freeships",
          description: "Percentage of students benefited by scholarships provided by Govt/Non-Govt agencies",
          links: [
            { label: "Scholarship Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/511Students_benefit%20.pdf", type: "pdf" }
          ]
        },
        {
          id: "5.1.2",
          title: "Capacity Development",
          description: "Soft skills, Language/Communication, Life skills (Yoga/Fitness), and ICT/Computing skills",
          links: [
            { label: "Capacity Building Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/512Soft-skill_Capacity_development.pdf", type: "pdf" }
          ]
        },
        {
          id: "5.1.3",
          title: "Competitive Exams & Counseling",
          description: "Percentage of students benefitted by guidance for competitive examinations and career counseling",
          links: [
            { label: "Supporting Documents", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/513_supporting_documents.pdf", type: "pdf" },
            { label: "Prescribed Format", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/513_prescribed_format.xlsx", type: "xlsx" }
          ]
        },
        {
          id: "5.1.4",
          title: "Grievance Redressal",
          description: "Mechanisms for redressal of student grievances including sexual harassment and ragging cases",
          links: [
            { label: "Grievance Policy & Reports", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/514Anti-Ragging.pdf", type: "pdf" }
          ]
        },
        {
          id: "5.2.1",
          title: "Placement & Higher Education",
          description: "Percentage of placement of outgoing students and students progressing to higher education",
          links: [
            { label: "Placement/Progression Data", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/521Placement_Progression_Higher_Education.pdf", type: "pdf" }
          ]
        },
        {
          id: "5.2.2",
          title: "Qualifying Examinations",
          description: "Percentage of students qualifying in state/national/ international level examinations",
          links: [
            { label: "Exam Results Analysis", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/522Student_Qualifying_State_National_Exams.pdf", type: "pdf" }
          ]
        },
        {
          id: "5.3.1",
          title: "Sports & Cultural Awards",
          description: "Awards/medals for outstanding performance in sports/ cultural activities at University/State/National level",
          links: [
            { label: "Awards & Medals", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/531Awards_Medals_Sports_Cultural.pdf", type: "pdf" }
          ]
        },
        {
          id: "5.3.2",
          title: "Events Participation",
          description: "Average number of sports and cultural programs in which students participated",
          links: [
            { label: "Supporting Documents", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/532_supporting_documents.pdf", type: "pdf" },
            { label: "Prescribed Format", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/532_prescribed_format.xlsx", type: "xlsx" }
          ]
        },
        {
          id: "5.4.1",
          title: "Alumni Association",
          description: "Registered Alumni Association contributing to development through financial/service support",
          links: [
            { label: "Alumni Engagement Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria5/541Alumni_Association.pdf", type: "pdf" }
          ]
        }
      ]
    },
    "6": {
      title: "Governance, Leadership and Management",
      indicators: [
        {
          id: "6.1.1",
          title: "Institutional Governance",
          description: "Governance in accordance with vision/mission, decentralization, and perspective plan",
          links: [
            { label: "Governance Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/611Governance_Leadership.pdf", type: "pdf" }
          ]
        },
        {
          id: "6.2.1",
          title: "Perspective Plan Deployment",
          description: "Effective deployment of institutional perspective plan and functioning of institutional bodies",
          links: [
            { label: "Perspective Plan", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/621Institutional_Perspective_Plan.pdf", type: "pdf" }
          ]
        },
        {
          id: "6.2.2",
          title: "E-Governance Implementation",
          description: "Implementation of e-governance in Administration, Finance, Admission, and Examination",
          links: [
            { label: "E-Governance Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/622ERP_e-governance.pdf", type: "pdf" }
          ]
        },
        {
          id: "6.3.1",
          title: "Staff Welfare & Appraisal",
          description: "Performance appraisal system and effective welfare measures for teaching/non-teaching staff",
          links: [
            { label: "Staff Welfare Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/631Perfomance_Appraisal_Welfare.pdf", type: "pdf" }
          ]
        },
        {
          id: "6.3.2",
          title: "Faculty Financial Support",
          description: "Percentage of teachers provided with financial support for conferences/workshops",
          links: [
            { label: "Financial Support List", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/632Financial_Suppport_Conference_Workshop.pdf", type: "pdf" }
          ]
        },
        {
          id: "6.3.3",
          title: "FDP Participation",
          description: "Percentage of staff participating in Faculty development (FDP) and professional training",
          links: [
            { label: "FDP Certificates Summary", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/633FDP_Attended.pdf", type: "pdf" }
          ]
        },
        {
          id: "6.4.1",
          title: "Resource Mobilization",
          description: "Strategies for optimal utilization of resources and regular financial audits",
          links: [
            { label: "Audit & Resource Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/641Audited_Statement.pdf", type: "pdf" }
          ]
        },
        {
          id: "6.5.1",
          title: "IQAC Contributions",
          description: "Internal Quality Assurance Cell (IQAC) contribution to quality assurance strategies",
          links: [
            { label: "IQAC Quality Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/651Quality_Assurance_Initiatives.pdf", type: "pdf" }
          ]
        },
        {
          id: "6.5.2",
          title: "Quality Initiatives",
          description: "AAA follow-up, participation in NIRF, and other quality audits (NAAC, NBA)",
          links: [
            { label: "Initiatives Summary", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria6/652Quality_Assurance_Initiatives.pdf", type: "pdf" }
          ]
        }
      ]
    },
    "7": {
      title: "Institutional Values and Best Practices",
      indicators: [
        {
          id: "7.1.1",
          title: "Gender Equity",
          description: "Gender Audit and measures for promotion of gender equity in curricular and co-curricular activities",
          links: [
            { label: "Gender Equity Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria7/711Gender_Equity_Sensitization.pdf", type: "pdf" }
          ]
        },
        {
          id: "7.1.2",
          title: "Green Campus Initiatives",
          description: "Energy conservation, waste management, water conservation, and disabled-friendly environment",
          links: [
            { label: "Green Campus Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria7/712Green_Campus.pdf", type: "pdf" }
          ]
        },
        {
          id: "7.1.3",
          title: "Environmental Audits",
          description: "Quality audits on environment and energy undertaken by the Institution",
          links: [
            { label: "Audit Reports", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria7/713Green_Audit.pdf", type: "pdf" }
          ]
        },
        {
          id: "7.1.4",
          title: "Inclusive Environment",
          description: "Efforts in providing an inclusive environment and sensitization to constitutional obligations",
          links: [
            { label: "Inclusion Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria7/714Initiatives_Inclusive_Environment.pdf", type: "pdf" }
          ]
        },
        {
          id: "7.2.1",
          title: "Best Practices",
          description: "Description of two best practices successfully implemented by the Institution",
          links: [
            { label: "Best Practices Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria7/721Institutional_Best_Practices.pdf", type: "pdf" },
            { label: "Other Information", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria7/721Other_Information_Institutional_Best_Practices.pdf", type: "pdf" }
          ]
        },
        {
          id: "7.3.1",
          title: "Institutional Distinctiveness",
          description: "Performance and significant contributions of the institution in distinctive thrust areas",
          links: [
            { label: "Performance Report", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria7/731Performance_of_the_institution.pdf", type: "pdf" },
            { label: "Significant Contributions", url: "https://www.nsec.ac.in/impdoc/2ndcycle/criteria7/731Significant_Contributions_of_the_institution.pdf", type: "pdf" }
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ── 01. HERO ── */}
      <PageHero
        showParticles={true}
        maxHeight="33vh"
        titleStroke="NAAC"
        titleFill="CERT"
        statutoryLabel="INSTITUTIONAL ACCREDITATION"
        policyLabel="Quality Management"
        rightLabel="Quality.Node.Auth"
        useYellowAccents={true}
        rightContent={
          <div className="leading-snug">
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-1 mb-1">
              {['Commitment', 'to', 'academic', 'and', 'administrative', 'standards', 'at'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/70 text-[15px] font-body font-medium"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block"
              >
                <span className="text-[17px] font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ textShadow: '0 0 25px rgba(0,139,139,0.5), 0 0 50px rgba(0,139,139,0.3)' }}>
                  Netaji Subhash Engineering College
                </span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }} className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-accent origin-left block" />
              </motion.span>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.8 }} className="h-8 relative w-full mt-2">
              <AnimatePresence mode="wait">
                <motion.div key={currentSentenceIdx} initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0 flex items-center flex-wrap gap-2">
                  <span className="font-heading font-black italic uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>{carouselPhrases[currentSentenceIdx].main}</span>
                  <span className="font-heading font-black italic uppercase tracking-tighter text-brand-accent" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>{carouselPhrases[currentSentenceIdx].highlight}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        }
      />

      {/* ── 02. ACCREDITATION STATUS ── */}
      <section className="relative pt-24 pb-16 px-8 lg:px-24 bg-white">
        <SectionHeading title="Accreditation Status" tagline="National Assessment and Accreditation Council (NAAC) verification." />
        
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[24px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:border-brand-accent/20 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
                <stat.icon size={32} />
              </div>
              <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900 leading-none">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 p-8 bg-brand-accent/5 border border-brand-accent/10 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={120} className="text-brand-accent" />
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-heading font-black italic uppercase tracking-tight text-slate-800 mb-4">Official Verification</h4>
            <p className="text-lg font-body font-medium text-slate-600 leading-relaxed max-w-2xl mx-auto">
              NSEC is proud to be <span className="text-brand-accent font-bold">Accredited with B+ Grade</span> in its 2nd Cycle by NAAC, valid until <span className="text-brand-maroon font-bold">February 12, 2030</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02.5 ABOUT IQAC & COORDINATOR ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-slate-50 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Institutional Hub</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              Internal Quality <br/> <span className="text-brand-accent">Assurance Cell</span>
            </h2>
            <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-accent" />
              <p className="text-lg font-body font-medium text-slate-600 leading-relaxed italic">
                "{iqacData.about}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Established 2013</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-accent/5 rounded-[40px] blur-2xl" />
            <div className="relative bg-white border border-slate-100 rounded-[40px] p-10 shadow-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                <div className="w-24 h-24 rounded-3xl bg-slate-100 overflow-hidden border-2 border-brand-accent/20 shrink-0">
                  <img src="https://www.nsec.ac.in/images/dr-sukumar-roy.jpg" alt="Dr. Sukumar Roy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-black italic uppercase tracking-tight text-slate-900 leading-none mb-2">{iqacData.coordinator.name}</h3>
                  <p className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest mb-4">{iqacData.coordinator.role}</p>
                  <div className="flex flex-wrap gap-3">
                    <a href={`mailto:${iqacData.coordinator.email.split(',')[0]}`} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-accent hover:bg-brand-accent/5 transition-all"><MessageSquare size={16} /></a>
                    <a href={`tel:${iqacData.coordinator.phone}`} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-accent hover:bg-brand-accent/5 transition-all"><Download size={16} /></a>
                  </div>
                </div>
              </div>
              <p className="text-[15px] font-body font-medium text-slate-500 leading-relaxed mb-8 border-l-2 border-slate-100 pl-6 italic">
                "{iqacData.coordinator.desk}"
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Contact Node</p>
                  <p className="text-[11px] font-heading font-black italic text-slate-700">{iqacData.coordinator.email.split(',')[0]}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Direct Ext.</p>
                  <p className="text-[11px] font-heading font-black italic text-slate-700">{iqacData.coordinator.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02.6 VISION, MISSION & OBJECTIVES ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vision */}
          <div className="lg:col-span-1 p-10 bg-slate-900 rounded-[40px] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck size={120} />
            </div>
            <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter mb-8">Our <span className="text-brand-accent">Vision</span></h3>
            <p className="text-lg font-body font-medium leading-relaxed opacity-80 italic">
              "{iqacData.vision}"
            </p>
          </div>

          {/* Mission */}
          <div className="lg:col-span-2 p-10 bg-slate-50 border border-slate-100 rounded-[40px] relative overflow-hidden group">
            <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8">Quality <span className="text-brand-accent">Mission</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {iqacData.mission.map((item, i) => (
                <div key={i} className="flex gap-4 group/item">
                  <div className="w-6 h-6 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 group-hover/item:bg-brand-accent group-hover/item:text-white transition-all">
                    <CheckCircle2 size={12} />
                  </div>
                  <p className="text-sm font-body font-medium text-slate-600 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="lg:col-span-3 p-10 bg-brand-accent/[0.03] border border-brand-accent/10 rounded-[40px] relative overflow-hidden">
            <h3 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8">Strategic <span className="text-brand-accent">Objectives</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {iqacData.objectives.map((obj, i) => (
                <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mb-4 font-heading font-black italic">{i + 1}</div>
                  <p className="text-[13px] font-body font-medium text-slate-600 leading-relaxed italic">"{obj}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02.7 IQAC COMPOSITION ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-slate-50 overflow-hidden">
        <SectionHeading title="IQAC Composition" tagline="Institutional governance and quality monitoring board." />
        <div className="max-w-7xl mx-auto mt-16 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {iqacData.composition.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="px-2 py-1 bg-brand-accent/10 rounded text-[9px] font-mono font-black text-brand-accent uppercase tracking-widest">{member.role}</div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:text-brand-accent transition-colors"><ShieldCheck size={16} /></div>
                </div>
                <h4 className="text-sm font-heading font-black italic uppercase tracking-tight text-slate-800 mb-1 leading-tight group-hover:text-brand-accent transition-colors">{member.name}</h4>
                <p className="text-[11px] font-body font-medium text-slate-400 leading-tight">{member.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02.8 FUNCTIONS OF IQAC ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-4">
              {iqacData.functions.map((fn, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-brand-accent group-hover:border-brand-accent/30 transition-all shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-[13px] font-body font-medium text-slate-600 leading-snug pt-1">{fn}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-4 block">Quality Mandate</span>
            <h2 className="text-5xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              Operational <br/> <span className="text-brand-accent">Functions</span>
            </h2>
            <p className="text-lg font-body font-medium text-slate-500 leading-relaxed mb-8">
              The Internal Quality Assurance Cell orchestrates a multi-dimensional approach to excellence, ensuring every academic and administrative node operates at peak performance.
            </p>
            <div className="p-8 bg-brand-maroon/5 border border-brand-maroon/10 rounded-[40px] relative overflow-hidden">
              <div className="flex items-center gap-4 text-brand-maroon mb-4">
                <FileText size={32} />
                <h4 className="text-xl font-heading font-black italic uppercase tracking-tight leading-none">Annual Reports <br/> & Archives</h4>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {iqacData.annualReports.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-slate-100 text-[10px] font-mono font-bold text-slate-500 hover:bg-brand-maroon hover:text-white transition-all text-center">
                    {r.year}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. QUALITY & STATUTORY PORTALS ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-slate-50 overflow-hidden border-y border-slate-200">
        <SectionHeading title="NAAC Cycles & Statutory" tagline="Institutional evaluation history and compliance repository." />
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Cycle 2 Panel */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
            <div className="p-10 bg-slate-900 text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-20"><ShieldCheck size={80} /></div>
              <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-2 block">Ongoing Accreditation</span>
              <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter mb-1">NAAC 2nd Cycle</h3>
              <p className="text-sm font-mono font-bold opacity-60 uppercase tracking-widest italic">{cycles.second.period} • {cycles.second.status}</p>
            </div>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-4">Statutory Documents</p>
                {cycles.second.docs.map((doc, i) => (
                  <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-brand-accent/30 hover:bg-white hover:shadow-lg transition-all group">
                    <FileText size={16} className="text-slate-300 group-hover:text-brand-accent transition-colors" />
                    <span className="text-[11px] font-heading font-black italic uppercase tracking-tight text-slate-700 leading-none group-hover:text-slate-900">{doc.title}</span>
                  </a>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-4">AQAR Reports</p>
                {cycles.second.aqars.map((aq, i) => (
                  <a key={i} href={aq.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-brand-accent/[0.03] rounded-2xl border border-brand-accent/10 hover:bg-brand-accent hover:text-white transition-all group">
                    <span className="text-xs font-heading font-black italic uppercase tracking-tight">AQAR {aq.year}</span>
                    <Download size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all" />
                  </a>
                ))}
                <div className="p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mt-4">
                  <p className="text-[10px] font-mono font-bold text-slate-400 uppercase leading-relaxed text-center">Extended Profiles and DVV Clarifications are integrated in the criteria explorer below.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cycle 1 Panel */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
            <div className="p-10 bg-slate-50 border-b border-slate-100 relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-slate-900"><History size={80} /></div>
              <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.4em] mb-2 block">Archival History</span>
              <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-slate-900 mb-1">NAAC 1st Cycle</h3>
              <p className="text-sm font-mono font-bold text-slate-400 uppercase tracking-widest italic">{cycles.first.period} • {cycles.first.status}</p>
            </div>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-4">Historical Certificates</p>
                {cycles.first.docs.map((doc, i) => (
                  <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-white transition-all group">
                    <FileText size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                    <span className="text-[11px] font-heading font-black italic uppercase tracking-tight text-slate-600 leading-none group-hover:text-slate-800">{doc.title}</span>
                  </a>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-4">AQAR (2018-2023)</p>
                <div className="grid grid-cols-1 gap-2">
                  {cycles.first.aqars.map((aq, i) => (
                    <a key={i} href={aq.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 hover:bg-white transition-all group">
                      <span className="text-[11px] font-heading font-black italic uppercase tracking-tight text-slate-500">AQAR {aq.year}</span>
                      <Download size={12} className="opacity-20 group-hover:opacity-100 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ── 04. CRITERION DOCUMENTS ── */}
      <section className="relative py-24 px-8 lg:px-24 bg-white overflow-hidden">
        <SectionHeading title="Criterion-wise Data" tagline="Detailed breakdown of institutional performance metrics." />
        
        <div className="max-w-7xl mx-auto mt-12 overflow-x-auto pb-8">
          <div className="min-w-[800px] grid grid-cols-7 gap-4">
            {criterionDocs.map((crit, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveCriterion(activeCriterion === crit.id ? null : crit.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group relative flex flex-col items-center text-center transition-all duration-300 ${activeCriterion === crit.id ? 'scale-105' : 'hover:scale-102'}`}
              >
                <div className={`w-full aspect-square rounded-2xl border flex flex-col items-center justify-center p-4 transition-all duration-300 ${activeCriterion === crit.id ? 'bg-brand-accent border-brand-accent shadow-2xl' : 'bg-slate-50 border-slate-100 hover:bg-brand-accent/5 hover:border-brand-accent/30'}`}>
                  <span className={`text-4xl font-heading font-black italic transition-colors mb-2 ${activeCriterion === crit.id ? 'text-white/40' : 'text-brand-accent/20 group-hover:text-brand-accent/40'}`}>C{crit.id}</span>
                  <span className={`text-[9px] font-mono font-black uppercase tracking-widest transition-colors leading-tight ${activeCriterion === crit.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-800'}`}>{crit.title}</span>
                </div>
                <div className={`mt-3 flex items-center gap-1 transition-all duration-300 ${activeCriterion === crit.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest italic ${activeCriterion === crit.id ? 'text-brand-accent' : 'text-brand-accent'}`}>{activeCriterion === crit.id ? 'Close Details' : 'View Metrics'}</span>
                  <ChevronRight size={10} className={`text-brand-accent transition-transform duration-300 ${activeCriterion === crit.id ? 'rotate-90' : ''}`} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── CRITERION EXPLORER PANEL ── */}
        <AnimatePresence mode="wait">
          {activeCriterion && criterionDetails[activeCriterion] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto mt-12 overflow-hidden"
            >
              <div className="p-8 lg:p-12 rounded-[32px] bg-slate-50 border border-slate-200 shadow-inner relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-transparent" />
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
                  <div>
                    <span className="text-[10px] font-mono font-black text-brand-accent uppercase tracking-[0.4em] mb-2 block">Key Indicator Analysis</span>
                    <h3 className="text-4xl font-heading font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                      Criterion {activeCriterion}: <span className="text-brand-accent">{criterionDetails[activeCriterion].title}</span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <GraduationCap size={40} className="opacity-20" />
                    <Scale size={40} className="opacity-20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {criterionDetails[activeCriterion].indicators.map((indicator, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-accent/20 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <span className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent font-heading font-black italic text-xl border border-brand-accent/10">
                          {indicator.id}
                        </span>
                        <CheckCircle2 size={24} className="text-slate-100 group-hover:text-brand-accent transition-colors" />
                      </div>
                      
                      <h4 className="text-lg font-heading font-black italic uppercase tracking-tight text-slate-800 mb-3 group-hover:text-brand-accent transition-colors leading-tight">
                        {indicator.title}
                      </h4>
                      
                      <p className="text-sm font-body font-medium text-slate-500 leading-relaxed mb-8">
                        {indicator.description}
                      </p>

                      {indicator.years && (
                        <div className="mb-8">
                          <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-3">Enrollment Data (5 Year Cycle)</p>
                          <div className="flex flex-wrap gap-2">
                            {indicator.years.map((y, yi) => (
                              <a
                                key={yi}
                                href={y.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-mono font-bold text-slate-600 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all"
                              >
                                {y.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-3">
                        {indicator.links.map((link, li) => (
                          <a
                            key={li}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-brand-accent/30 hover:bg-white transition-all group/link"
                          >
                            <div className="flex items-center gap-3">
                              {link.type === 'pdf' ? <FileText size={16} className="text-brand-maroon" /> : <Download size={16} className="text-green-600" />}
                              <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">{link.label}</span>
                            </div>
                            <ExternalLink size={14} className="text-slate-300 group-hover/link:text-brand-accent group-hover/link:translate-x-1 transition-all" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>




    </div>
  );
}
