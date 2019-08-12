export default {
    play(context, position) {
        const { currentPlayer } = context.state;
        context.commit('changePlayer');
    },
};
