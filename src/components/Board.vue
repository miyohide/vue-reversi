<template>
    <div class="board-container">
        <div
            v-for="cell in cells"
            class="cell"
            :key="cell.key">
            <piece
                v-if="cell.value !== 'E'"
                :color="cell.value" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Piece from '@/components/Piece.vue';

export default {
    components: {
        Piece,
    },
    computed: {
        ...mapState([
            'board',
        ]),
        cells() {
            return this.board.map((cell, index) => ({ key: `cell-${index}`, value: cell }));
        },
    },
};
</script>
