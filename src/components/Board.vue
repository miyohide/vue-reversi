<template>
    <div class="board-container">
        <div class="board">
            <div
                v-for="cell in cells"
                class="cell"
                :class="{ playable: cell.isPlayable }"
                :key="cell.key"
                @click="play(cell)"
                >
                <piece
                    v-if="cell.value !== 'E'"
                    :color="cell.value" />
            </div>
        </div>
    </div>
</template>

<script>
/* mapState
https://vuex.vuejs.org/ja/guide/state.html#mapstate-%E3%83%98%E3%83%AB%E3%83%91%E3%83%BC
   mapGetters
https://vuex.vuejs.org/ja/guide/getters.html#mapgetters-%E3%83%98%E3%83%AB%E3%83%91%E3%83%BC
*/
import { mapState, mapGetters } from 'vuex';
import Piece from '@/components/Piece.vue';

export default {
    components: {
        Piece,
    },
    computed: {
        ...mapState([
            'board',
        ]),
        ...mapGetters([
            'playableCells',
        ]),
        cells() {
            const { playableCells } = this;
            return this.board.map((cell, index) => ({
                key: `cell-${index}`,
                value: cell,
                position: index,
                isPlayable: playableCells.indexOf(index) > -1,
            }));
        },
    },
    methods: {
        play(cell) {
            if (cell.isPlayable) {
                this.$store.dispatch('play', cell.position);
            }
        },
    },
};
</script>

<style scoped>
.board-container {
  width: 50vw;
  height: 50vw;
  border: 12px solid #6D5720;
  border-radius: 12px;
  margin: 0 auto;
  min-width: 300px;
  min-height: 300px;
  max-width: 700px;
  max-height: 700px;
}
.board {
  display: grid;
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
  grid-template-rows: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
  width: 100%;
  height: 100%;
  background: #6C9A33;
}
.cell {
  width: 100%;
  height: 100%;
  box-shadow: inset 1px 1px 0 #94C160, inset -1px -1px 0 #477413;
  display: flex;
}
.playable {
  background: #C4E79A;
  cursor: pointer;
}
</style>
