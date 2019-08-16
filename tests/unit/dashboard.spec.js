import { mount } from '@vue/test-utils';
import { createStore } from '@/store';
import Dashboard from '@/components/Dashboard.vue';

describe('components::Dashboard', () => {
    let wrapper;
    let store;
    let restartMock;
    let playableCellsMock;

    beforeEach(() => {
        restartMock = jest.fn();
        playableCellsMock = jest.fn();
        playableCellsMock.mockReturnValue([]);
        store = createStore({
            mutations: {
                restart: restartMock,
            },
            getters: {
                playableCells: playableCellsMock,
            },
        });
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

    describe('restart button', () => {
        it('Restartボタンを押すとrestart mutationがcommitされること', () => {
            const restartButton = wrapper.find('button.restart');
            restartButton.trigger('click');
            expect(restartMock).toBeCalled();
        });
    });

    describe('pass buttons', () => {
        it('石を置く場所がない場合はpass buttonが表示されること', () => {
            expect(wrapper.contains('button.pass')).toBeTruthy();
        });

        it('石を置く場所がある場合はpass buttonを表示しないこと', () => {
            playableCellsMock = jest.fn();
            playableCellsMock.mockReturnValue([1, 2]);

            store = createStore({
                getters: {
                    playableCells: playableCellsMock,
                },
            });
            wrapper = mount(Dashboard, {
                store,
            });
            expect(wrapper.contains('button.pass')).toBeFalsy();
        });
    });

    it('pass buttonが押されたときにはchangePlayerがコミットされること', () => {
        let passMock = jest.fn();
        playableCellsMock = jest.fn();
        playableCellsMock.mockReturnValue([]);
        store = createStore({
            getters: {
                playableCells: playableCellsMock,
            },
            mutations: {
                changePlayer: passMock,
            },
        });
        wrapper = mount(Dashboard, {
            store,
        });
        const passButton = wrapper.find('button.pass');
        passButton.trigger('click');
        expect(passMock).toBeCalled();
    });
});
