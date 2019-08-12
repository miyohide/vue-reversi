export default {
    play(context, position) {
        const { currentPlayer } = context.state;
        const reversibleCells = context.getters.reversibleCells(position);
        reversibleCells.forEach((position) => {
            context.commit('changePiece', { position: position, color: currentPlayer});
        });
        context.commit('changePlayer');
    },
};
