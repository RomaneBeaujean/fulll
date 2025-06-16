export const generateNewIds = (existingIds: number[], count: number): number[] => {
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    return Array.from({ length: count }, (_, i) => maxId + 1 + i);
};
