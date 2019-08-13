import {
    BLACK,
    BLANK,
    DIRECTIONS,
    DIRECTIONS_COUNT,
    coordinates,
    playableCell,
    cellIndex,
    reversibleCellsByDirection,
} from '@/store/commons';

export default {
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
    reversibleCells: state => (position) => {
      const { board, currentPlayer } = state;
      const coord = coordinates(position);
      /* チェックする方向それぞれに対して`reversibleCellsByDirection`を呼び出し、
       * ひっくり返せる石のリストを集めて集計する。
      */
      return DIRECTIONS
        .map(direction=> reversibleCellsByDirection(board, coord, direction, currentPlayer))
        .reduce((acc, cur) => acc.concat(cur), [])
        .map(([x, y]) => cellIndex(x, y))
        .concat([position]);
    },
    blackPlayerScore(state) {
      return state.board.filter(cell => cell === BLACK).length;
    }
};
