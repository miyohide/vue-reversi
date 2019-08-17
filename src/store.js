/* storeについて
https://vuex.vuejs.org/ja/guide/
アプリの状態を保持するコンテナ。状態を変更するにはmutationをコミットする
必要がある。
*/
import Vue from 'vue'
import Vuex from 'vuex'
import {
  INITIAL_BOARD,
  BLACK,
} from '@/store/commons';

import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

Vue.use(Vuex)

export const state = {
  // slice(0)でシャローコピーをしないとINITIAL_BOARD自身が変更されてしまう
  board: INITIAL_BOARD.slice(0),
  currentPlayer: BLACK,
};

export const createStore = (options = {
  actions: {},
  mutations: {},
  getters: {},
  state: {},
}) => (
  new Vuex.Store({
    // TODO ...の意味を調べる。
    // スプレッド構文というやつらしい。 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    // https://vuex.vuejs.org/ja/guide/state.html#%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E6%BC%94%E7%AE%97%E5%AD%90
    state: {
      ...state,
      ...options.state,
    },
    mutations: {
      ...mutations,
      ...options.mutations,
    },
    actions: {
      ...actions,
      ...options.actions,
    },
    getters: {
      ...getters,
      ...options.getters,
    },
  })
);
