import {
    coordinates,
    cellIndex,
    opponent,
    playableCell,
    reversibleCellsByDirection,
    BLACK,
    WHITE,
} from '@/store/commons';

describe('store::commons', () => {
    describe('coordinates', () => {
        it('配列のindex値をx,y座標に正しく変換すること', () => {
            expect(coordinates(0)).toEqual([0, 0]);
            expect(coordinates(20)).toEqual([4, 2]);
            expect(coordinates(15)).toEqual([7, 1]);
        });
    });

    describe('cellIndex', () => {
        it('x,y座標を配列のindex値に正しく変換すること', () => {
            expect(cellIndex(0, 0)).toEqual(0);
            expect(cellIndex(4, 2)).toEqual(20);
            expect(cellIndex(7, 1)).toEqual(15);
        });
    });

    describe('opponent', () => {
        it('黒石の反対は白石であること', () => {
            expect(opponent(BLACK)).toEqual(WHITE);
        });
        it('白石の反対は黒石であること', () => {
            expect(opponent(WHITE)).toEqual(BLACK);
        });
    });

    describe('playableCell', () => {
        it('与えられた方向に対して石を置くことができる座標を返す', () => {
            const board = [
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'W', 'W', 'B', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            ];
            // 上記の盤で[1,4]の位置に東方向へ黒石が置けることを確認する
            expect(playableCell(board, [1, 4], [1, 0], BLACK)).toBeTruthy();
            // 上記の盤で[0,0]の位置に東方向へ黒石が置けることを確認する
            expect(playableCell(board, [0, 0], [1, 0], BLACK)).toBeFalsy();
            // 上記の盤で[5,3]の位置に西方向へ黒石が置けることを確認する
            expect(playableCell(board, [5, 3], [-1, 0], BLACK)).toBeTruthy();
            // 上記の盤で[5,4]の位置に西方向へ黒石が置けることを確認する
            expect(playableCell(board, [5, 4], [-1, 0], BLACK)).toBeFalsy();
        });
    });

    describe('reversibleCellsByDirection', () => {
        it('与えられた状況においてひっくり返る座標のリストが返ること', () => {
            const board = [
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'W', 'W', 'B', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            ];
            expect(reversibleCellsByDirection(board, [1, 4], [1, 0], BLACK)).toEqual(
                [[2, 4], [3, 4],]
            );
        });

        it('境界試験', () => {
            const board = [
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'W', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'B', 'W', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'B', 'W', 'W', 'W', 'E', 'E', 'E',
                'E', 'E', 'B', 'B', 'B', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            ];
            expect(reversibleCellsByDirection(board, [0, 0], [0, 1], BLACK)).toEqual(
                [[0, 1],]
            );
        });

        it('bug 001', () => {
            const board = [
                'B', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'B', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'B', 'W', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'B', 'W', 'W', 'W', 'E', 'E', 'E',
                'E', 'E', 'B', 'B', 'B', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            ];
            expect(reversibleCellsByDirection(board, [0, 3], [1, 0], WHITE)).toEqual([[1, 3]]);
            expect(reversibleCellsByDirection(board, [0, 3], [0, -1], WHITE)).toEqual([]);
        });

        it('bug 002', () => {
            const board = [
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'B', 'W', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'B', 'B', 'B',
            ];
            expect(reversibleCellsByDirection(board, [4, 7], [0, -1], WHITE)).toEqual([[4, 6]]);
            expect(reversibleCellsByDirection(board, [4, 7], [1, 0], WHITE)).toEqual([]);
        });
    });
});
