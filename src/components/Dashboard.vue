<template>
    <div class="dashboard">
        <div class="score">
            <h2>Scores</h2>
            <div v-if="winner" class="winner">
                {{ winnerContent }}
            </div>
            <div class="scores-container">
                <div>
                    <h3 :class="{ currentPlayer: isBlackPlayerTurn }">
                        Black
                    </h3>
                    <div class="score-value">{{blackPlayerScore}}</div>
                </div>
                <div>
                    <h3 :class="{ currentPlayer: isWhitePlayerTurn }">
                        White
                    </h3>
                    <div class="score-value">{{whitePlayerScore}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { BLACK, WHITE } from '@/store/commons';

export default {
    computed: {
        ...mapGetters([
            'blackPlayerScore',
            'whitePlayerScore',
            'winner',
        ]),
        isBlackPlayerTurn() {
            return this.$store.state.currentPlayer === BLACK;
        },
        isWhitePlayerTurn() {
            return this.$store.state.currentPlayer === WHITE;
        },
        winnerContent() {
            if (this.winner === BLACK) {
                return 'Winner is Black';
            } else {
                return 'Winner is White';
            }
        },
    },
};
</script>