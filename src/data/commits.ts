import { experience, type Role } from './experience';

// lazygit graph: one string per row, a rail every 2 chars (main, a side branch, life).
// The side rail is freelance (2019-22) and later fullstack (2023-24); `side` picks its color.
export const role = Object.fromEntries(experience.map((e) => [e.id, e]));
export type Label = [string, 'head' | 'branch' | 'tag'];
export type Commit = { graph: string; side?: string; labels?: Label[]; msg?: string; date?: string; desc?: string; job?: Role; parents?: [string, string] };

export const jobMsg = (j: Role) => `feat: ${j.role} @ ${j.company}${j.client ? ` (${j.client})` : ''}`;
const FULL = 'r1', FREE = 'r3';

export const commits: Commit[] = ([
  { graph: '⏣─╮ │', side: FULL, labels: [['HEAD -> main', 'head']], msg: "Merge branch 'fullstack' into main", date: 'Apr 2024', desc: 'Wrapped up the ERP work and went back to mobile full time.', parents: ['pbs', 'thinkforward'] },
  { graph: '◯ │ │', side: FULL, labels: [['v3.0', 'tag']], job: role.pbs },
  { graph: '│ │ ◯', side: FULL, labels: [['life', 'branch']], msg: 'feat(life): girl dad 👧🏻', desc: 'Best release so far. Zero patience for loading spinners.' },
  { graph: '◯ │ │', side: FULL, labels: [['v2.1', 'tag']], job: role.serfinsa },
  { graph: '│ ◯ │', side: FULL, labels: [['fullstack', 'branch']], job: role.thinkforward },
  { graph: '◯─╯ │', side: FULL, labels: [['v2.0', 'tag']], job: role.hightech },
  { graph: '⏣─╮ │', side: FREE, msg: "Merge branch 'freelance' into main", date: 'Jun 2022', desc: 'Freelance and Creativa wrap up; mobile becomes the main branch.', parents: ['aes-analyst', 'freelance-ios'] },
  { graph: '◯ │ │', side: FREE, job: role.aeroman },
  { graph: '◯ │ │', side: FREE, job: role['aes-analyst'] },
  { graph: '│ ◯ │', side: FREE, labels: [['freelance', 'branch']], job: role['freelance-ios'] },
  { graph: '│ │ ◯', side: FREE, msg: 'feat(life): adopt a cat 🐱', desc: 'Chief keyboard inspector. Reviews every PR by walking on it.' },
  { graph: '◯ │ │', side: FREE, job: role['aes-python'] },
  { graph: '│ ◯ │', side: FREE, job: role['freelance-android'] },
  { graph: '◯─╯ │', side: FREE, labels: [['v1.0', 'tag']], job: role.creativa },
  { graph: '◯   │', job: role.betterride },
  { graph: '◯───╯', side: 'r2', labels: [['v0.1', 'tag']], msg: 'init: hello, world', date: 'a long time ago', desc: 'First line of code. Probably a missing semicolon.' },
] as Commit[]).map((c) => (c.job ? { ...c, msg: jobMsg(c.job), date: c.job.period, desc: c.job.desc } : c));
