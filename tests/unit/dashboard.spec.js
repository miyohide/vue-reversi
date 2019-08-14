import { mount } from '@vue/test-utils';
import { createStore } from '@/store';
import Dashboard from '@/components/Dashboard.vue';

describe('components::Dashboard', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = createStore();
        wrapper = mount(Dashboard, {
            store,
        });
    });

    describe('render scores', () => {
        it('プレイヤーのスコアが描かれること', () => {
            expect(wrapper.findAll('.score').length).toEqual(1);
        });
    });

    describe('isBlackPlayerTurn', () => {
        it('現在のプレイヤーがBLACKのときはtrueが返ること', () => {
            expect(wrapper.vm.isBlackPlayerTurn).toBeTruthy();
            store.commit('changePlayer');
            expect(wrapper.vm.isBlackPlayerTurn).toBeFalsy();
        });
    });

    describe('isWhitePlayerTurn', () => {
        it('現在のプレイヤーがWHITEのときはtrueが返ること', () => {
            expect(wrapper.vm.isWhitePlayerTurn).toBeFalsy();
            store.commit('changePlayer');
            expect(wrapper.vm.isWhitePlayerTurn).toBeTruthy();
        });
    });

    describe('highlight', () => {
        it('現在のプレイヤーがハイライトされること', () => {
            const h3 = wrapper.findAll('h3');
            expect(h3.at(0).classes()).toContain('currentPlayer');
            expect(h3.at(1).classes()).not.toContain('currentPlayer');
            store.commit('changePlayer');
            expect(h3.at(0).classes()).not.toContain('currentPlayer');
            expect(h3.at(1).classes()).toContain('currentPlayer');
        });
    });

    describe('winner', () => {
        it('黒が勝者であることを描画すること', () => {
            const boardWithBlackWin = [
                'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
                'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',
                'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',
                'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',
                'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',
                'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',
                'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',
                'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B',
            ];
            store.state.board = boardWithBlackWin;
            expect(wrapper.find('.winner').text()).toEqual('Winner is Black');
        });
    });
});
