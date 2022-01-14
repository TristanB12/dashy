<template>
    <div>
        <div class="displays">
            <div>
                <h4> {{ config.displayImages.title }} </h4>
                <ToggleButton
                    :value="config.displayImages.value"
                    @change="changeImagesValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displaySubjects.title }} </h4>
                <ToggleButton
                    :value="config.displaySubjects.value"
                    @change="changeSubjectsValue"
                    color="#00A3FF"
                />
            </div>
            <div>
                <h4> {{ config.displayFiles.title }} </h4>
                <ToggleButton
                    :value="config.displayFiles.value"
                    @change="changeFilesValue"
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
            changeImagesValue(e) {
                this.config.displayImages.value = e.value;
                this.sendChanges();
            },
            changeSubjectsValue(e) {
                this.config.displaySubjects.value = e.value;
                this.sendChanges();
            },
            changeFilesValue(e) {
                this.config.displayFiles.value = e.value;
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