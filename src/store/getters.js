import {
    BLANK,
    DIRECTIONS,
    DIRECTIONS_COUNT,
    coordinates,
    playableCell,
    cellIndex,
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
};
  