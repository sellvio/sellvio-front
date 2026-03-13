export type ReactionOption = {
  id: number;
  emoji: string;
  label: string;
};

export const REACTION_OPTIONS: ReactionOption[] = [
  { id: 1, emoji: '👍', label: 'Like' },
  { id: 2, emoji: '❤️', label: 'Love' },
  { id: 3, emoji: '🔥', label: 'Fire' },
  { id: 4, emoji: '👏', label: 'Clap' },
];
