import { generateNewIds } from './idUtils';

describe('generateNewIds', () => {
    it('should generate consecutive new IDs starting after the max existing ID', () => {
        const existingIds = [1, 2, 5, 3];
        const count = 3;
        const result = generateNewIds(existingIds, count);
        expect(result).toEqual([6, 7, 8]);
    });

    it('should start from 1 if no existing IDs', () => {
        const existingIds: number[] = [];
        const count = 2;
        const result = generateNewIds(existingIds, count);
        expect(result).toEqual([1, 2]);
    });

    it('should generate an empty array if count is 0', () => {
        const existingIds = [1, 2, 3];
        const count = 0;
        const result = generateNewIds(existingIds, count);
        expect(result).toEqual([]);
    });
});
