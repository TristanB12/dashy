<template>
    <div>
        <div v-if="$store.state.user">
            <TheHeaderBar />
            <TheWidgetsList />
        </div>
        <transition name="appear">
            <div v-if="showModal" class="modal-route">
                <router-view class=""></router-view>
            </div>
        </transition>
        <TheAddWidgetButton />
    </div>
</template>

<script>
import TheWidgetsList from '@/components/TheWidgetsList.vue';
import TheHeaderBar from '@/components/TheHeaderBar.vue';
import {getUserInfos} from '@/services/apiWrapper.js';
import TheAddWidgetButton from '@/components/TheAddWidgetButton.vue';

export default {
    components: {
        TheHeaderBar,
        TheWidgetsList,
        TheAddWidgetButton
    },
    watch: {
        $route: {
            immediate: true,
            handler: function(to, from) {
                this.showModal = to.meta && to.meta.showModal;

                if (to && from && to.name == 'DashboardPage' && from.name == 'ServiceAdder')
                    this.$router.go(0);
            }
        }
    },
    data() {
        return {
            showModal: false
        }
    },
    mounted () {
        this.setAccessToken();
        this.setUserInfos();
    },
    methods: {
        async setUserInfos() {
            let res = await getUserInfos(this.$store.state.token);

            if (res[0])
                this.$store.state.user = res[0];
            else
                this.$router.push({name: 'LoginPage'});
        },
        setAccessToken() {
            this.$store.state.token = localStorage.getItem('access_token');
        }
    },
};
</script>

<style lang="scss" scoped>
#header-bar {
    margin-bottom: 50px;
}
body {
    width: 95%;
    margin: auto;
}
.modal-route {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.5);
}

.appear-enter-active {
    animation: appear-in .2s;
}
.appear-leave-active {
    animation: appear-in .2s reverse;
}
@keyframes appear-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 100;
    }
}
</style>