export default {
    play(context, position) {
        const { currentPlayer } = context.state;
        context.commit('changePiece', { position: position, color: currentPlayer});
        context.commit('changePlayer');
    },
};
