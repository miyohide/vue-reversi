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

        it('石を置いたら間に挟まれている石の色が変わること', () => {
            store.dispatch('play', 20);
            expect(store.state.board).toEqual([
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'B', 'E', 'E', 'E',
                'E', 'E', 'E', 'B', 'B', 'E', 'E', 'E',
                'E', 'E', 'E', 'W', 'B', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',            
            ]);
        });
    });
});
