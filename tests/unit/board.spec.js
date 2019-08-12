import { createStore } from '@/store';
import { mount } from '@vue/test-utils';
import Board from '@/components/Board.vue';
import Piece from '@/components/Piece.vue';

describe('Board.vue', () => {
    let store;
    let wrapper;
    let playAction;

    beforeEach(() => {
        playAction = jest.fn();
        store = createStore({
            actions: {
                play: playAction,
            },
        });
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

    it('石を置くことができる場所が4つあること', () => {
        expect(wrapper.findAll('.playable').length).toEqual(4);
    });

    it('playableなセルをクリックしたときplayActionが呼び出されること', () => {
        const playableCell = wrapper.find('.playable');
        playableCell.trigger('click');
        expect(playAction).toBeCalled();
    });

    it('playableでないセルをクリックしたときplayActionが呼び出されないこと', () => {
        const notPlayableCell = wrapper.find('.cell');
        expect(notPlayableCell.classes()).not.toContain('.playable');
        notPlayableCell.trigger('click');
        expect(playAction).not.toBeCalled();
    });
});
