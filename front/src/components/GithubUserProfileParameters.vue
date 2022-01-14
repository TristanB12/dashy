<template>
    <div>
        <div class="displays">
            <div>
                <h4> {{ config.displayCreationDate.title }} </h4>
                <ToggleButton
                    :value="config.displayCreationDate.value"
                    @change="changeCreationDateValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displayFollowersCount.title }} </h4>
                <ToggleButton
                    :value="config.displayFollowersCount.value"
                    @change="changeFollowersCountValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displayLocation.title }} </h4>
                <ToggleButton
                    :value="config.displayLocation.value"
                    @change="changeLocationValue"
                    color="#00A3FF"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'
    export default {
        components: {
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
            changeCreationDateValue(e) {
                this.config.displayCreationDate.value = e.value;
                this.sendChanges();
            },
            changeFollowersCountValue(e) {
                this.config.displayFollowersCount.value = e.value;
                this.sendChanges();
            },
            changeLocationValue(e) {
                this.config.displayLocation.value = e.value;
                this.sendChanges();
            },
        },
    }
</script>

<style lang="scss" scoped>
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