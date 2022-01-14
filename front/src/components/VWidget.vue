<template>   
    <div class="widget-handler">
        <transition name="slide-fade" mode="out-in">
            <VWidgetContent
                v-if="state === 'content'"
                :service="infos.service"
                :name="infos.name"
                :content="content"
                :error="error"
                @parameters="state = 'parameters'"
                @delete-widget="$emit('delete-widget', infos._id)"
            >
                <component
                    :is="correspondingWidgetContent"
                    :content="content"
                />
            </VWidgetContent>
            <VWidgetParameters
                v-else
                :service="infos.service"
                :name="infos.name"
                @go-back="state = 'content'"
                @save-config="saveConfig"
            >
                <component
                    :is="correspondingWidgetParams"
                    :config="JSON.parse(JSON.stringify(config))"
                    @config-changed="updateNewConfig"
                />
            </VWidgetParameters>
        </transition>
    </div>
</template>

<script>
import SpotifyTopTracksParameters from '@/components/SpotifyTopTracksParameters.vue';
import VWidgetContent from '@/components/VWidgetContent.vue';
import VWidgetParameters from '@/components/VWidgetParameters.vue';
import SpotifyTopArtists from '@/components/SpotifyTopArtists.vue';
import SpotifyTopTracks from '@/components/SpotifyTopTracks.vue';
import SpotifyTopArtistParameters from '@/components/SpotifyTopArtistParameters.vue';
import TwitchOnlineChannelsParameters from '@/components/TwitchOnlineChannelsParameters.vue';
import TwitchOnlineChannels from '@/components/TwitchOnlineChannels.vue';
import TwitchUserProfileParameters from '@/components/TwitchUserProfileParameters.vue';
import TwitchUserProfile from '@/components/TwitchUserProfile.vue';
import GithubUserProfileParameters from '@/components/GithubUserProfileParameters.vue';
import GithubUserProfile from '@/components/GithubUserProfile.vue';
import DashyWantedPeopleParameters from '@/components/DashyWantedPeopleParameters.vue';
import DashyWantedPeople from '@/components/DashyWantedPeople.vue';
import {
        getWidgetContent,
        updateWidgetConfig
} from '@/services/apiWrapper.js';

    export default {
        components: {
            VWidgetContent,
            VWidgetParameters,
            SpotifyTopArtists,
            SpotifyTopTracks,
            TwitchOnlineChannels,
            SpotifyTopArtistParameters,
            SpotifyTopTracksParameters,
            TwitchOnlineChannelsParameters,
            TwitchUserProfileParameters,
            TwitchUserProfile,
            GithubUserProfileParameters,
            GithubUserProfile,
            DashyWantedPeopleParameters,
            DashyWantedPeople
        },
        props: {
            infos: {
                type: Object,
                default: () => {}
            },
        },
        data() {
            return {
                state: 'content', // can be "content" or "parameters"
                config: this.infos.config,
                content: undefined,
                error: undefined,
                parametersError: undefined,
                newConfig: undefined,
                timer: ''
            }
        },
        computed: {
            correspondingWidgetContent() {
                let widgets = [
                    {code: 'STA', component: 'SpotifyTopArtists'},
                    {code: 'STT', component: 'SpotifyTopTracks'},
                    {code: 'TOC', component: 'TwitchOnlineChannels'},
                    {code: 'TUP', component: 'TwitchUserProfile'},
                    {code: 'GUP', component: 'GithubUserProfile'},
                    {code: 'FWP', component: 'DashyWantedPeople'},
                ]
                let corresponding = undefined;

                widgets.forEach(widget => {
                    if (widget.code == this.infos.code)
                        corresponding = widget.component;
                })
                return corresponding;
            },
            correspondingWidgetParams() {
                let widgets = [
                    {code: 'STA', component: 'SpotifyTopArtistParameters'},
                    {code: 'STT', component: 'SpotifyTopTracksParameters'},
                    {code: 'TOC', component: 'TwitchOnlineChannelsParameters'},
                    {code: 'TUP', component: 'TwitchUserProfileParameters'},
                    {code: 'GUP', component: 'GithubUserProfileParameters'},
                    {code: 'FWP', component: 'DashyWantedPeopleParameters'},
                ]
                let corresponding = undefined;

                widgets.forEach(widget => {
                    if (widget.code == this.infos.code)
                        corresponding = widget.component;
                })
                return corresponding;
            }
        },
        created () {
            this.getCurrentWidgetContent();
            this.setRefreshRate();
        },
        beforeDestroy () {
            this.cancelAutoUpdate();
        },
        methods: {
            getCurrentWidgetContent() {
                getWidgetContent(this.$store.state.token, this.infos.config, this.infos.code)
                    .then(res => {
                        if (res[0]) {
                            this.content = res[0];
                            console.log("widget refreshed")
                        }
                        else
                            this.error = res[1].message;
                    })
            },
            setRefreshRate() {
                this.timer = setInterval(this.getCurrentWidgetContent, this.infos.refreshRate * 1000);
            },
            updateNewConfig(e) {
                this.newConfig = e;
            },
            cancelAutoUpdate () {
                clearInterval(this.timer);
            },
            saveConfig() {
                if (!this.newConfig) {
                    this.state = "content";
                    return;
                }
                this.infos.config = this.newConfig;
                this.config = this.newConfig;

                updateWidgetConfig(this.$store.state.token, this.infos.config, this.infos._id)
                    .then(res => {
                        if (res[0]) {
                            this.content = undefined;
                            this.state = "content";
                            this.getCurrentWidgetContent();
                        }
                        else {
                            this.parametersError = err[1].message;
                        }
                    })
            }
        },
    }
</script>

<style lang="scss" scoped>
.widget-handler {
    height: 100%;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-leave-active {
    transition: all .8s rotate3d(0, 0, 1, 40deg);
}
.slide-fade-enter, .slide-fade-leave-to {
    transition: all transform 0.3s;
    transform: rotate3d(0, 1, 0, -180deg);
    opacity: 0;
}
</style>