<template>
    <div class="dashboard">
        <div class="score">
            <h2>Scores</h2>
            <div v-if="winner" class="winner">
                {{ winnerContent }}
            </div>
            <button @click="restart" class="restart">Restart</button>
            <div v-if="hasNotPlayableCells">
                <button @click="pass" class="pass">Pass turn</button>
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
            'playableCells',
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
        hasNotPlayableCells() {
            return this.playableCells.length === 0;
        },
    },
    methods: {
        restart() {
            this.$store.commit('restart');
        },
        pass() {
            this.$store.commit('changePlayer');
        }
    },
};
</script>

<style scoped>
.dashboard {
  width: 50vw;
  margin: auto;
  min-width: 300px;
  max-width: 700px;
}
h2 {
  text-align: center;
  margin-bottom: 0;
}
@keyframes blink {
  0% { background: #fff; }
  100% { background: #C4E79A; }
}
h3 {
  padding: 6px 5px 3px;
  border: 1px solid #94C160;
  border-radius: 3px;
}
.scores-container {
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.currentPlayer {
  font-weight: bold;
  animation: blink 1s linear infinite;
}
.score-value {
  font-size: 1.5em;
}
@keyframes blinkText {
  0% { color: #000; }
  100% { color: #f00; }
}
.center {
  padding-top: 30px;
}
.winner {
  font-weight: bold;
  animation: blinkText 1s linear infinite;
}
</style>
