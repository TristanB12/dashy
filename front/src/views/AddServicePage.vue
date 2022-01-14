<template>
    <div class="add-service">
        <VConnectToService v-if="needToConnect"/>
        <div class="widgets" v-else>
            <VWidgetPreview
                v-for="widget in widgets"
                :key="widget.code"
                :widget="widget"
                @params-widget="goToWidgetParams(widget)"
            />
        </div>
    </div>
</template>

<script>
import SpotifyTopArtistParameters from '@/components/SpotifyTopArtistParameters.vue';
import VWidgetPreview from '@/components/VWidgetPreview.vue';
import VConnectToService from '@/components/VConnectToService.vue';
    export default {
        components: {
            VConnectToService,
            VWidgetPreview,
            SpotifyTopArtistParameters,
        },
        watch: {
            $route: {
                immediate: true,
                handler: function(to, from) {
                    if (to && from && to.params.service != from.params.service)
                        this.setWidgets();
                }
            }
        },
        data() {
            return {
                widgets: undefined,
                currentWidget: undefined
            }
        },
        computed: {
            needToConnect() {
                console.log(this.$route.params.service)
                if (this.$route.params.service == 'dashy') {
                    return false;
                }
                if(!this.$store.state.user.services[this.$route.params.service].access_token)
                    return true;
                return false;
            }
        },
        mounted () {
            this.setWidgets();
        },
        methods: {
            setWidgets() {
                this.$store.state.widgetsConf.forEach(e => {
                    if (e.service == this.$route.params.service)
                        this.widgets = e.widgets;
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
.add-service {
    width: 90%;
}
.widgets {
    display: flex;
}
.adder {
    width: 50%;
    margin: auto;
}
</style>