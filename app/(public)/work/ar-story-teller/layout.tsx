import type { ReactNode } from 'react';
import { ArStoryTellerPageShell } from './ArStoryTellerPageShell';

export default function ArStoryTellerLayout({ children }: { children: ReactNode }) {
  return <ArStoryTellerPageShell>{children}</ArStoryTellerPageShell>;
}
