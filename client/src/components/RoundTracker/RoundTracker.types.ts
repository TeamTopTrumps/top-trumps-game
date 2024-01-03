export const ROUND_STATES = ["won", "lost", "unresolved"] as const;
export type RoundState = (typeof ROUND_STATES)[number];
