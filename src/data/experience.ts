// One entry per role, newest first; Creativa and Freelance sub-roles are separate entries.
export type Role = {
  id: string;
  company: string;
  role: string;
  client?: string;
  period: string;
  meta: string;
  desc: string;
  tags: string[];
  current?: boolean;
};

const freelanceDesc =
  'Independent iOS and Android projects for various clients, working with native SDKs and Firebase.';

export const experience: Role[] = [
  {
    id: 'pbs',
    company: 'PBS El Salvador',
    role: 'Mid Mobile Developer',
    period: 'Mar 2024 — Present',
    meta: 'Full-time · Remote',
    current: true,
    desc: 'Working across Android and iOS — native development with Kotlin and Swift, plus Flutter for shared cross-platform features.',
    tags: ['Android', 'iOS', 'Flutter', 'Kotlin', 'Swift'],
  },
  {
    id: 'serfinsa',
    company: 'Serfinsa',
    role: 'Mid Mobile Developer',
    period: 'Oct 2023 — Mar 2024',
    meta: 'Full-time · Hybrid',
    desc: 'Android developer on a fintech app, building screens with Kotlin and Jetpack Compose.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'GitLab'],
  },
  {
    id: 'thinkforward',
    company: 'ThinkForward',
    role: 'Mid Full-stack Developer',
    period: 'Sep 2023 — Apr 2024',
    meta: 'Contract · Remote',
    desc: 'Led C# development on a multi-company ERP built from scratch. ASP.NET Core and Entity Framework on the backend, Razor and vanilla JavaScript on the frontend, SQL Server as the data layer.',
    tags: ['ASP.NET Core', 'Entity Framework', 'SQL Server', 'Razor', 'JavaScript'],
  },
  {
    id: 'hightech',
    company: 'Hightech Consulting',
    role: 'Mid Mobile Developer',
    period: 'Jul 2022 — Aug 2023',
    meta: 'Full-time · Remote',
    desc: 'Mobile developer across multiple client projects covering iOS (Swift), Android (Kotlin/Java), and Flutter, applying MVVM and Clean Architecture throughout.',
    tags: ['Swift', 'Kotlin', 'Flutter', 'iOS', 'Firebase'],
  },
  {
    id: 'aeroman',
    company: 'Creativa Consultores',
    role: 'Mid Full-stack Developer',
    client: 'Aeroman',
    period: 'Mar 2021 — Jun 2021',
    meta: 'Full-time',
    desc: 'Built the BI-Embedded project for Aeroman — an Angular frontend connected to MicroStrategy for data visualization, with Spring Boot on the backend.',
    tags: ['Angular', 'Spring Boot', 'MicroStrategy'],
  },
  {
    id: 'aes-analyst',
    company: 'Creativa Consultores',
    role: 'Programmer Analyst',
    client: 'AES El Salvador',
    period: 'Feb 2021 — Jul 2022',
    meta: 'Full-time',
    desc: 'Worked on the ACE Project as part of the Integration Team at AES El Salvador.',
    tags: ['SQL Server', 'CSS'],
  },
  {
    id: 'freelance-ios',
    company: 'Freelance',
    role: 'Jr. iOS Developer',
    period: 'May 2020 — Jun 2022',
    meta: 'Self-employed',
    desc: freelanceDesc,
    tags: ['iOS', 'Firebase'],
  },
  {
    id: 'aes-python',
    company: 'Creativa Consultores',
    role: 'Mid Python Developer',
    client: 'AES El Salvador',
    period: 'Mar 2020 — Feb 2021',
    meta: 'Full-time',
    desc: 'Main developer of the AES Virtual Agent, a chatbot connected to Slack, Facebook Messenger, and WhatsApp (via Twilio). Built with Python and Flask, using Dialogflow for NLU, GCP for hosting, and PostgreSQL and SQL Server as data stores.',
    tags: ['Python', 'Flask', 'Dialogflow', 'GCP', 'PostgreSQL'],
  },
  {
    id: 'freelance-android',
    company: 'Freelance',
    role: 'Jr. Android Developer',
    period: 'Aug 2019 — Jun 2022',
    meta: 'Self-employed',
    desc: freelanceDesc,
    tags: ['Android', 'Firebase'],
  },
  {
    id: 'creativa',
    company: 'Creativa Consultores',
    role: 'Jr. Full-stack Developer',
    period: 'Jun 2018 — Feb 2020',
    meta: 'Full-time',
    desc: 'Part of the Innovation team, building and maintaining projects with new technologies and CI/CD pipelines. Also served as technical lead on internal and client-facing projects.',
    tags: [],
  },
  {
    id: 'betterride',
    company: 'BetterRideInc',
    role: 'Jr. Full-stack Developer',
    period: 'Mar 2018 — May 2018',
    meta: 'Full-time',
    desc: 'Part of a small team, shipping new features across the REST API and the web admin interface.',
    tags: [],
  },
];
