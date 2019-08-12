import {
    opponent
} from '@/store/commons';

export default {
    changePlayer(state) {
        state.currentPlayer = opponent(state.currentPlayer); 
    },
    changePiece(state, { position, color }) {
        state.board[position] = color;
    },
};
