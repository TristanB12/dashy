<template>
    <div class="adder" v-if="widget">
        <div class="header">
            <img :src="getImgPath()" alt="">
            <h3>{{ widget.name }}</h3>
        </div>
        <div class="params-container">
            <component
                :is="correspondingWidgetParams"
                :config="widget.config"
                @config-changed="changeConfig"
            />
        </div>
        <div class="btn-container">
            <div>
                <h4>Refresh rate in secondes</h4>
                <VInput
                    width="100px"
                    type="number"
                    model="60"
                    @input-updated="changeRefreshRate"
                />
            </div>
            <VButton
                title="Add"
                titleSize="16px"
                width="110px"
                height="35px"
                :isLoading="isLoading"
                @click.native="addWidget"
            />
        </div>
    </div>
</template>

<script>
import {addWidget} from '../services/apiWrapper';
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import SpotifyTopTracksParameters from '@/components/SpotifyTopTracksParameters.vue';
import SpotifyTopArtistParameters from '@/components/SpotifyTopArtistParameters.vue';
import TwitchUserProfileParameters from '@/components/TwitchUserProfileParameters.vue';
import TwitchOnlineChannelsParameters from '@/components/TwitchOnlineChannelsParameters.vue';
import GithubUserProfileParameters from '@/components/GithubUserProfileParameters.vue';
import DashyWantedPeopleParameters from '@/components/DashyWantedPeopleParameters.vue';
    export default {
        components: {
            VButton,
            VInput,
            SpotifyTopArtistParameters,
            SpotifyTopTracksParameters,
            TwitchOnlineChannelsParameters,
            TwitchUserProfileParameters,
            TwitchUserProfileParameters,
            GithubUserProfileParameters,
            DashyWantedPeopleParameters
        },
        data() {
            return {
                widget: undefined,
                error: undefined,
                config: undefined,
                isLoading: false
            }
        },
        computed: {
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
                    if (widget.code == this.widget.code)
                        corresponding = widget.component;
                })
                return corresponding;
            }
        },
        mounted () {
            this.setWidget();
        },
        methods: {
            getImgPath() {
                return require('../assets/'+ this.widget.service.toLowerCase() + '_logo.png');
            },
            changeConfig(e) {
                this.config = e;
            },
            changeRefreshRate(e) {
                console.log(e);
                this.widget.refreshRate = e;
            },
            setWidget() {
                this.$store.state.widgetsConf.forEach(e => {
                    if (e.service == this.$route.params.service) {
                        e.widgets.forEach(e => {
                            if (e.code == this.$route.params.widgetCode)
                                this.widget = e;
                                this.config = e.config
                        })
                    }
                });
            },
            async addWidget() {
                this.isLoading = true;
                let res = await addWidget(this.$store.state.token, this.widget);

                if (res[0])
                    this.$router.push({name: 'DashboardPage'});
                else
                    this.error = res[1];
                this.isLoading = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
.adder {
    height: 100%;
    position: relative;
    width: 80%;
    margin: auto;
    margin-top: 40px;
}
.header {
    width: 50%;
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.params-container {
    width: 70%;
    margin: auto;
}
img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
}
.btn-container {
    margin-top: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
    }
}
</style>