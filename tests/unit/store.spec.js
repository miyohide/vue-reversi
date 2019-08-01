import { state,
    coordinates,
    cellIndex,
    opponent,
    WHITE,
    BLACK } from '@/store';

describe('store', () => {
    describe('state', () => {
        it('should contain board with initial data', () => {
            const expected = [
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
                'E', 'E', 'E', 'W', 'B', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            ];
            expect(state.board).toEqual(expected);
        });

        it('should contain current player with black as first player', () => {
            expect(state.currentPlayer).toEqual(BLACK);
        });
    });

    describe('tools', () => {
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

    });
});
