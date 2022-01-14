<template>
    <div class="spotify-top-artists-params">
        <div class="nb-artists">
            <div>
                <h4>{{ config.numberOfArtists.title }}</h4>
                <span>Maximum 5</span>
            </div>
            <div class="actions">
                <VButton
                    title="-"
                    width="10px"
                    height="10px"
                    @click.native="decNbArtists"
                />
                <span> {{ config.numberOfArtists.value }} </span>
                <VButton
                    title="+"
                    width="10px"
                    height="10px"
                    @click.native="incNbArtists"
                />
            </div>
        </div>
        <div class="displays">
            <div>
                <h4> {{ config.displayImage.title }} </h4>
                <ToggleButton
                    :value="config.displayImage.value"
                    @change="changeImageValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displayArtistName.title }} </h4>
                <ToggleButton
                    :value="config.displayArtistName.value"
                    @change="changeArtistNameValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displayGenre.title }} </h4>
                <ToggleButton
                    :value="config.displayGenre.value"
                    @change="changeGenreValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displaynumberOfFollowers.title }} </h4>
                <ToggleButton
                    :value="config.displaynumberOfFollowers.value"
                    @change="changeNumberOfFollowersValue"
                    color="#00A3FF"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'
import VButton from '@/components/VButton.vue';
    export default {
        components: {
            VButton,
            ToggleButton
        },
        props: {
            config: {
                type: Object,
                default: undefined
            },
        },
        methods: {
            sendChanges() {
                this.$emit('config-changed', this.config)
                this.$forceUpdate();
            },
            decNbArtists() {
                if (this.config.numberOfArtists.value == 1)
                    return;
                this.config.numberOfArtists.value--;
                this.sendChanges();
            },
            incNbArtists() {
                if (this.config.numberOfArtists.value == 5)
                    return;
                this.config.numberOfArtists.value++;
                this.sendChanges();
            },
            changeImageValue(e) {
                this.config.displayImage.value = e.value;
                this.sendChanges();
            },
            changeArtistNameValue(e) {
                this.config.displayArtistName.value = e.value;
                this.sendChanges();
            },
            changeGenreValue(e) {
                this.config.displayGenre.value = e.value;
                this.sendChanges();
            },
            changeNumberOfFollowersValue(e) {
                this.config.displaynumberOfFollowers.value = e.value;
                this.sendChanges();
            },
        },
    }
</script>

<style lang="scss" scoped>
.nb-artists {
    display: flex;
    justify-content: space-between;

    .actions {
        display: flex;
        align-items: center;

        span {
            font-size: 24px;
            margin: 0 10px;
        }
    }
}
.displays {
    margin-top: 50px;

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0;
    }
}
</style>