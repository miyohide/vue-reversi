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
            // [4, 2]の場所に黒石を置く
            const result = getters.reversibleCells(state)(20);
            result.sort();
            // [4, 2]と[4, 3]の場所が黒石となる
            expect(result).toEqual([20, 28]);
        });

        it('板の状態を変えたときに反転できるセルが正しく求められること', () => {
            const board = [
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'W', 'B', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',            
            ];
            state.board = board;
            // [5, 7]に黒石を置く
            const result = getters.reversibleCells(state)(61);
            result.sort();
            // [4, 6]と[5, 7]が黒石になる
            expect(result).toEqual([52, 61]);
        });
    });
});
