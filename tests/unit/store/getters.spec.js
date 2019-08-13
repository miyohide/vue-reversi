import { createStore } from '@/store';

describe('store::getters', () => {
    let store;
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

    beforeEach(() => {
        store = createStore();
    });

    describe('playableCells', () => {
        it('黒石が置くことができるセルのリストが返ること', () => {
            const result = store.getters.playableCells;
            expect(result).toEqual([20, 29, 34, 43]);
        });
    });

    describe('reversibleCells', () => {
        it('反転できるセルが返ること', () => {
            // [4, 2]の場所に黒石を置く
            const result = store.getters.reversibleCells(20);
            result.sort();
            // [4, 2]と[4, 3]の場所が黒石となる
            expect(result).toEqual([20, 28]);
        });

        it('盤の状態を変えたときに反転できるセルが正しく求められること', () => {
            store.state.board = board;
            // [5, 7]に黒石を置く
            const result = store.getters.reversibleCells(61);
            result.sort();
            // [4, 6]と[5, 7]が黒石になる
            expect(result).toEqual([52, 61]);
        });
    });

});
