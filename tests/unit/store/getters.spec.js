import { createStore } from '@/store';
import { WHITE, BLACK } from '@/store/commons';

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

    const board2 = [
        'E', 'E', 'W', 'B', 'E', 'E', 'E', 'E',
        'E', 'E', 'B', 'W', 'E', 'E', 'E', 'E',
        'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
        'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
        'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
        'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
        'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
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

        it('端でplayableCellsが返す値の確認', () => {
            store.state.board = board2;
            // [1, 0], [4, 1], [3, 2]に石がおけることを確認する
            expect(store.getters.playableCells).toEqual([1, 12, 19]);
        });
    });

    describe('score', () => {
        describe('blackPlayerScore', () => {
            it('黒の点数を返すこと', () => {
                store.state.board = board;
                expect(store.getters.blackPlayerScore).toEqual(4);
            });
        });

        describe('whitePlayerScore', () => {
            it('白の点数を返すこと', () => {
                store.state.board = board;
                expect(store.getters.whitePlayerScore).toEqual(4);
                store.commit('changePiece', { position: 0, color: WHITE });
                expect(store.getters.whitePlayerScore).toEqual(5);
            });
        });
    });

    describe('winner', () => {
        it('勝者がいない場合はnullが返ること', () => {
            expect(store.getters.winner).toBeNull();
        });

        it('黒石しか置かれていない場合はBLACKが返ること', () => {
            const boardWithBlackWin = [
                'E', 'E', 'B', 'B', 'E', 'E', 'E', 'E',
                'E', 'E', 'B', 'B', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            ];
            store.state.board = boardWithBlackWin;
            expect(store.getters.winner).toEqual(BLACK);
        });

        it('白石しか置かれていない場合はWHITEが返ること', () => {
            const boardWithWhiteWin = [
                'E', 'E', 'W', 'W', 'E', 'E', 'E', 'E',
                'E', 'E', 'W', 'W', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            ];
            store.state.board = boardWithWhiteWin;
            expect(store.getters.winner).toEqual(WHITE);
        });
    });
});
