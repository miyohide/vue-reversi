import {
    opponent
} from '@/store/commons';

export default {
    changePlayer(state) {
        state.currentPlayer = opponent(state.currentPlayer); 
    },
};
