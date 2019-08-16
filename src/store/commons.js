export const INITIAL_BOARD = [
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

export const DIRECTIONS = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
export const DIRECTIONS_COUNT = DIRECTIONS.length;

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
  while (currentX >= 0 && currentX < WIDTH && currentY >= 0 && currentY < HEIGHT && hasOpponent) {
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

export const reversibleCellsByDirection = (board, [x, y], [xDir, yDir], player) => {
  let currentX = x + xDir;
  let currentY = y + yDir;
  let result = [];
  let playerFound = false;
  let blankFound = false;
  let currentCell;
  while (currentX >= 0 && currentX < WIDTH && currentY >= 0 && currentY < HEIGHT && !playerFound && !blankFound) {
    currentCell = board[cellIndex(currentX, currentY)];
    playerFound = currentCell === player;
    blankFound = currentCell === BLANK;
    // 自分の石でなく石が置かれている場合ひっくり返せる
    if (!playerFound && !blankFound) {
      result.push([currentX, currentY]);
    }
    currentX += xDir;
    currentY += yDir;
  }
  // 途中で石が置かれていないところがある場合、挟み込めていないので何もひっくり返せない
  // 途中でひっくり返せると判断しても全部キャンセル。
  if (blankFound) {
    result = [];
  }
  if (!playerFound) {
    if (currentX < 0 || currentY < 0) {
      result = [];
    }
  }
  return result;
}