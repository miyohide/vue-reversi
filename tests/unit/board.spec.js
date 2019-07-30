import { createStore } from '@/store';
import { mount } from '@vue/test-utils';
import Board from '@/components/Board.vue';
import Piece from '@/components/Piece.vue';

describe('Board.vue', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = createStore();
        wrapper = mount(Board, {
            store,
        });
    });

    it('場には石を置く場所が64個（8x8）あること', () => {
        expect(wrapper.findAll('.cell').length).toEqual(64);
    });

    it('場の初期は白石と黒石がそれぞれ2つずつあること', () => {
        expect(wrapper.findAll(Piece).length).toEqual(4);
        expect(wrapper.findAll('.white').length).toEqual(2);
        expect(wrapper.findAll('.black').length).toEqual(2);
    });
});
