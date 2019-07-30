import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const INITIAL_BOARD = [
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'E', 'E', 'E', 'B', 'W', 'E', 'E', 'E',
  'E', 'E', 'E', 'W', 'B', 'E', 'E', 'E',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
];

export const BLACK = 'B';
export const WHITE = 'W';

export const state = {
  board: INITIAL_BOARD,
  currentPlayer: BLACK,
};

export const mutations = {};

export const actions = {};

export const createStore = (options = {
  actions: {},
  mutations: {},
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
  })
);
