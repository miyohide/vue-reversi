import { state,
    coordinates,
    cellIndex,
    opponent,
    playableCell,
    getters } from '@/store';
import { BLACK, WHITE } from '@/store/commons';

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

    describe('getters', () => {
        it('黒石が置くことができるセルのリストが返ること', () => {
            const result = getters.playableCells(state);
            expect(result).toEqual([20, 29, 34, 43]);
        });
    });
});
