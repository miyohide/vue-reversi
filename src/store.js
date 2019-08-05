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

export const BLANK = 'E';
export const BLACK = 'B';
export const WHITE = 'W';
export const WIDTH = 8;
export const HEIGHT = 8;
const DIRECTIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
const DIRECTIONS_COUNT = DIRECTIONS.length;

export const state = {
  board: INITIAL_BOARD,
  currentPlayer: BLACK,
};

export const coordinates = index => [index % WIDTH, Math.floor(index / WIDTH)];

export const cellIndex = (x, y) => x + y * WIDTH;

export const opponent = current => {
  if (current === WHITE) {
    return BLACK;
  } else {
    return WHITE;
  }
};

/**
 * 石を置くことができるか否かを判定する。
 * @param {Array.<string>} board 現在の盤の状態
 * @param {Array.<number>} param1 石を置く座標
 * @param {Array.<number>} param2 石が行けるかチェックする方向
 * @param {string} player 自分の手。定数BLACKもしくはWHITEを指定。
 */
export const playableCell = (board, [x, y], [xDir, yDir], player) => {
  let currentX = x;
  let currentY = y;
  let hasOpponent = true;
  let prevIsOpponent = false;
  let currentCell;
  // 石を置いたとき、指定した向きに対してひっくり返せる石が無くなるまでループする
  while (currentX > 0 && currentX < WIDTH && currentY > 0 && currentY < HEIGHT && hasOpponent) {
    currentX += xDir;
    currentY += yDir;
    currentCell = board[cellIndex(currentX, currentY)];
    // ひっくり返せる石があるかどうかチェック
    hasOpponent = currentCell === opponent(player);
    if (hasOpponent) {
      prevIsOpponent = hasOpponent;
    }
  }
  // 直前までひっくり返せる石があり、チェック対象が自分の石と同じ色かどうかチェック
  return prevIsOpponent && currentCell === player;
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
