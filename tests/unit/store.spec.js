import { state } from '@/store';
import { BLACK } from '@/store/commons';
import getters from '@/store/getters';

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
});
