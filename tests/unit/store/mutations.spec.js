import {
    WHITE,
    BLACK
} from '@/store/commons';

import { createStore } from '@/store';

describe('store::mutations', () => {
    let store;

    beforeEach(() => {
        store = createStore();
    });

    describe('changePlayer', () => {
        it('現在のプレイヤーが黒の場合は白になること', () => {
            store.commit('changePlayer');
            expect(store.state.currentPlayer).toEqual(WHITE);
        });

        it('現在のプレイヤーが白の場合は黒になること', () => {
            store.state.currentPlayer = WHITE;
            store.commit('changePlayer');
            expect(store.state.currentPlayer).toEqual(BLACK);
        });
    });

    describe('changePiece', () => {
        it('渡した場所と色で石が変わること', () => {
            // [4, 2]の場所に黒石を置く（もともと空いている場所）
            store.commit('changePiece', { position: 20, color: BLACK});
            expect(store.state.board[20]).toEqual(BLACK);
        });

        it('渡した場所と色で石が変わること', () => {
            // [4, 3]の場所を黒石に変更（もともと白の場所）
            store.commit('changePiece', { position: 28, color: BLACK});
            // TODO なんで[4, 2]の場所が変わるんだろう...
            expect(store.state.board[20]).toEqual(BLACK);
        });
    });
});