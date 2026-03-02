import { atom } from "jotai";

type Position = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';

export const headerState = atom<{
  position: Position;
  isDark: boolean;
}>({
  position: 'relative',
  isDark: false,
});