<template>
    <div class="spotify-top-tracks-params">
        <div class="nb-tracks">
            <div>
                <h4>{{ config.numberOfTracks.title }}</h4>
                <span>Maximum 5</span>
            </div>
            <div class="actions">
                <VButton
                    title="-"
                    width="10px"
                    height="10px"
                    @click.native="decNbTracks"
                />
                <span> {{ config.numberOfTracks.value }} </span>
                <VButton
                    title="+"
                    width="10px"
                    height="10px"
                    @click.native="incNbTracks"
                />
            </div>
        </div>
        <div class="displays">
            <div>
                <h4> {{ config.displayAlbum.title }} </h4>
                <ToggleButton
                    :value="config.displayAlbum.value"
                    @change="changeAlbumValue"
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
            decNbTracks() {
                if (this.config.numberOfTracks.value == 1)
                    return;
                this.config.numberOfTracks.value--;
                this.sendChanges();
            },
            incNbTracks() {
                if (this.config.numberOfTracks.value == 5)
                    return;
                this.config.numberOfTracks.value++;
                this.sendChanges();
            },
            changeAlbumValue(e) {
                this.config.displayAlbum.value = e.value;
                this.sendChanges();
            },
            changeArtistNameValue(e) {
                this.config.displayArtistName.value = e.value;
                this.sendChanges();
            },
        },
    }
</script>

<style lang="scss" scoped>
.nb-tracks {
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