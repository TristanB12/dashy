<template>
    <div class="connect-service">
        <img :src="getImgPath()" alt="">
        <p>To use this service you need to link your account.</p>
        <VLightButton
            :title="connectString"
            :iconName="this.$route.params.service  + '_logo.png'"
            @click.native="linkAccount"
        />
    </div>
</template>

<script>
import {
    spotifyAuthCode,
    twitchAuthCode,
    githubAuthCode
    
} from '../services/authCodeRedirections';
import VLightButton from '@/components/VLightButton.vue';
    export default {
        components: {
            VLightButton,
        },
        computed: {
            connectString() {
                return 'Connect with ' + this.$route.params.service
            },
        },
        methods: {
            getImgPath() {
                return require('../assets/'+ this.$route.params.service.toLowerCase() + '_logo.png');
            },
            linkAccount() {
                let servicesFuncs = [
                    {service: 'spotify', func: spotifyAuthCode},
                    {service: 'twitch', func: twitchAuthCode},
                    {service: 'github', func: githubAuthCode},
                ]
                let win;

                servicesFuncs.forEach(e => {
                    if (this.$route.params.service.toLowerCase() == e.service)
                        win = e.func('link');
                })
                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.go(0);
                    }
                }, 500);
            }
        },
    }
</script>

<style lang="scss" scoped>
img {
    width: 100%;
    width: 60px;
    height: 60px;
}
.connect-service {
    width: 60%;
    margin: auto;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    * {
        margin: 15px;
    }
}
p {
    color: #474747;
}
</style>