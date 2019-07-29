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

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
