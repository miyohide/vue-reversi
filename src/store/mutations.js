import Vue from 'vue';
import {
    opponent
} from '@/store/commons';

export default {
    changePlayer(state) {
        state.currentPlayer = opponent(state.currentPlayer);
    },
    changePiece(state, { position, color }) {
        // データの変更をViewに通知するために直接プロパティ（state.board）を変更しない
        // see. https://jp.vuejs.org/v2/api/index.html#Vue-set
        Vue.set(state.board, position, color);
    },
};
