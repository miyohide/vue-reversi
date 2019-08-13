<template>
    <div class="dashboard">
        <div class="score">
            <h2>Scores</h2>
            <div class="scores-container">
                <div>
                    Black: {{blackPlayerScore}}
                </div>
                <div>
                    White: {{whitePlayerScore}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'blackPlayerScore',
            'whitePlayerScore',
        ]),
    },
};
</script>