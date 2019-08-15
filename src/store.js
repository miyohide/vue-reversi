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
