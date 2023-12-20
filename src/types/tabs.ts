export const TabTypes = ['Overview', 'Details', 'Reviews'] as const;

export type TTabs = typeof TabTypes[number];
