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
});