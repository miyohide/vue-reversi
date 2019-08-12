import { state } from '@/store';
import getters from '@/store/getters';

describe('store::getters', () => {
    describe('playableCells', () => {
        it('黒石が置くことができるセルのリストが返ること', () => {
            const result = getters.playableCells(state);
            expect(result).toEqual([20, 29, 34, 43]);
        });
    });

    describe('reversibleCells', () => {
        it('反転できるセルが返ること', () => {
            const result = getters.reversibleCells(state)(20);
            result.sort();
            expect(result).toEqual([20, 28]);
        });
    });
});
