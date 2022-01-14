<template>
    <div class="twitch-online-channels-params">
        <div class="nb-artists">
            <div>
                <h4>{{ config.numberOfChannels.title }}</h4>
                <span>Maximum 5</span>
            </div>
            <div class="actions">
                <VButton
                    title="-"
                    width="10px"
                    height="10px"
                    @click.native="decNbChannels"
                />
                <span> {{ config.numberOfChannels.value }} </span>
                <VButton
                    title="+"
                    width="10px"
                    height="10px"
                    @click.native="incNbChannels"
                />
            </div>
        </div>
        <div class="displays">
            <div>
                <h4> {{ config.displayGame.title }} </h4>
                <ToggleButton
                    :value="config.displayGame.value"
                    @change="changeGameValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displayImage.title }} </h4>
                <ToggleButton
                    :value="config.displayImage.value"
                    @change="changeImageValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displayViewerCount.title }} </h4>
                <ToggleButton
                    :value="config.displayViewerCount.value"
                    @change="changeViewerCountValue"
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
            decNbChannels() {
                if (this.config.numberOfChannels.value == 1)
                    return;
                this.config.numberOfChannels.value--;
                this.sendChanges();
            },
            incNbChannels() {
                if (this.config.numberOfChannels.value == 5)
                    return;
                this.config.numberOfChannels.value++;
                this.sendChanges();
            },
            changeGameValue(e) {
                this.config.displayGame.value = e.value;
                this.sendChanges();
            },
            changeImageValue(e) {
                this.config.displayImage.value = e.value;
                this.sendChanges();
            },
            changeViewerCountValue(e) {
                this.config.displayViewerCount.value = e.value;
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