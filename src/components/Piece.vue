<template>
    <div class="piece" :class="{ white, black }"></div>
</template>

<script>
import { WHITE, BLACK } from '@/store';

export default {
    props: {
        color: {
            required: true,
            type: String,
        },
    },
    computed: {
        white () {
            return this.color === WHITE;
        },
        black() {
            return this.color === BLACK;
        }
    }
}
</script>
