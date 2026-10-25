// the landing shows a WIP note while this is empty (add `href` / `code` when available).
export const projects: {
  title: string;
  desc: string;
  tags: string[];
  href?: string;
  code?: string;
}[] = [
  {
    title: 'parentkit',
    desc: 'baby sleep, feeding & diaper tracker, shared in real time with the care circle',
    tags: ['Mobile'],
    href: 'https://gaala.dev/parentkit/',
  },
  {
    title: 'angular-crud',
    desc: 'CRUD with JWT sessions and Angular Material tables, Angular 10',
    tags: ['Angular'],
    code: 'https://github.com/cybergaala/Angular-CRUD',
  },
  {
    title: 'node-js-api-massive-js',
    desc: 'REST API on MassiveJS (PostgreSQL) with JWT sessions, filter & sort',
    tags: ['Node'],
    code: 'https://github.com/cybergaala/node-js-api-massive-js',
  },
];
