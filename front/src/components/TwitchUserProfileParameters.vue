<template>
    <div class="twitch-user-profile">
        <div class="username">
            <h4>{{ config.username.title }}</h4>
            <VInput
                placeholder="Twitch username"
                @input-updated="changeUsername"
                fontSize="17px"
                width="180px"
            />
        </div>
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
                <h4> {{ config.displayDescription.title }} </h4>
                <ToggleButton
                    :value="config.displayDescription.value"
                    @change="changeDescriptionValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displayViewCount.title }} </h4>
                <ToggleButton
                    :value="config.displayViewCount.value"
                    @change="changeViewCountValue"
                    color="#00A3FF"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'
import VInput from '@/components/VInput.vue';
    export default {
        components: {
            VInput,
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
            changeUsername(e) {
                this.config.username.value = e;
                this.sendChanges();
            },
            changeCreationDateValue(e) {
                this.config.displayCreationDate.value = e.value;
                this.sendChanges();
            },
            changeDescriptionValue(e) {
                this.config.displayDescription.value = e.value;
                this.sendChanges();
            },
            changeViewCountValue(e) {
                this.config.changeViewCountValue.value = e.value;
                this.sendChanges();
            },
        },
    }
</script>

<style lang="scss" scoped>
.username {
    display: flex;
    justify-content: space-between;
    align-items: center;
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