import { createStore } from '@/store';
import { WHITE, BLACK } from '@/store/commons';

describe('store::actions', () => {
    let store;

    beforeEach(() => {
        store = createStore();
    });

    describe('play', () => {
        it('現在のプレイヤーが相手側になること', () => {
            store.dispatch('play', 20);
            expect(store.state.currentPlayer).toEqual(WHITE);
        });

        it('現在の手番プレイヤーの石の色が置かれること', () => {
            store.dispatch('play', 20);
            expect(store.state.board[20]).toEqual(BLACK);
        });
    });
});
