import Vue from 'vue'
import Vuex from 'vuex'
import {
  INITIAL_BOARD,
  BLACK,
  BLANK,
  DIRECTIONS,
  DIRECTIONS_COUNT,
  coordinates,
  playableCell,
  cellIndex,
 } from '@/store/commons';

Vue.use(Vuex)

export const state = {
  board: INITIAL_BOARD,
  currentPlayer: BLACK,
};

export const getters = {
  playableCells(state) {
    const { board, currentPlayer } = state;
    const cells = [];
    board.forEach((value, index) => {
      if (value === BLANK) {
        const coord = coordinates(index);

        let i = 0;
        let isPlayable = false;
        while (!isPlayable && i < DIRECTIONS_COUNT) {
          const direction = DIRECTIONS[i];
          i += 1;
          isPlayable = playableCell(board, coord, direction, currentPlayer);
        }
        if (isPlayable) {
          cells.push(cellIndex(coord[0], coord[1]));
        }
      }
    });
    return cells;
  },
};

export const mutations = {};

export const actions = {};

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
