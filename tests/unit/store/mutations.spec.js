import {
    WHITE
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
    })
});