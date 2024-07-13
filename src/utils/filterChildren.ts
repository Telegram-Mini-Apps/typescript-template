import { Child, MaybeChild } from '@/types';

export function filterChildren(children: MaybeChild[]): Child[] {
  return children.filter(c => c !== undefined && c !== null && typeof c !== 'boolean');
}