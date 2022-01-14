<template>
    <body id="widgets-list">
        <VWidget
            v-for="widget in widgets"
            :key="widget._id"
            :infos="widget"
            @delete-widget="deleteWidgetById"
        />
    </body>
</template>

<script>
import VWidget from '@/components/VWidget.vue';
import { Sortable, Swap } from 'sortablejs/modular/sortable.core.esm';
Sortable.mount(new Swap());
import {
    getUserWidgets,
    deleteWidget

} from '@/services/apiWrapper.js';

    export default {
        components: {
            VWidget,
        },
        data() {
            return {
                widgets: undefined,
                error: undefined
            }
        },
        mounted () {
            this.getWidgets();
            this.initDragAndDrop();
        },
        methods: {
            async getWidgets() {
                let res = await getUserWidgets(this.$store.state.token);

                if (res[0])
                    this.widgets = res[0];
                else
                    this.error = res[1];
            },
            async deleteWidgetById(id) {
                let res = await deleteWidget(this.$store.state.token, id);

                if (res[0]) {
                    this.widgets = this.widgets.filter(e => e._id != id);
                }
                else
                    this.error = res[1];
            },
            initDragAndDrop() {
                let el = document.getElementById('widgets-list');
                new Sortable(el, {
                    swap: true,
                    swapClass: 'highlight',
                    animation: 200,
                    handle: '.drag-handler'
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
body {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 20px;
}
.highlight {
    border-radius: 15px;
    box-shadow: 0 0 8px #00A3FF;
}
</style>