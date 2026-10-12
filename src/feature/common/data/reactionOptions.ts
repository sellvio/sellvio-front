export type ReactionOption = {
  id: number;
  emoji: string;
  label: string;
};

// id-ები უნდა ემთხვეოდეს backend-ის `emojis` ცხრილს (1 Like, 2 Fire, 3 Done, 4 Reject)
export const REACTION_OPTIONS: ReactionOption[] = [
  { id: 1, emoji: '👍', label: 'Like' },
  { id: 2, emoji: '🔥', label: 'Fire' },
  { id: 3, emoji: '✅', label: 'Done' },
  { id: 4, emoji: '❌', label: 'Reject' },
];
