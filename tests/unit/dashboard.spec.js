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
        });
    });
});
