<template>
    <div class="add-page" v-if="$store.state.user">
        <div class="header">
            <h2>Add Widget</h2>
            <VCloseButton
                @click.native="$router.push({name: 'DashboardPage'})"
            />
        </div>
        <div class="content">
            <TheServicesAside
                v-if="$store.state.widgetsConf"
            />
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import VCloseButton from '@/components/VCloseButton.vue';
import {getALlWidgetsConf} from '../services/apiWrapper';
import TheServicesAside from '@/components/TheServicesAside.vue';
    export default {
        components: {
            TheServicesAside,
            VCloseButton
        },
        data() {
            return {
                error: undefined
            }
        },
        async mounted () {
            await this.getWidgetsConf();
        },
        methods: {
            async getWidgetsConf() {
                let res = await getALlWidgetsConf();

                if (res[0])
                    this.$store.state.widgetsConf = res[0].widgets;
                else
                    this.error = res[1];
            }
        },
    }
</script>

<style lang="scss" scoped>
.add-page {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 700px;
    height: 70vh;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
}
.header {
    position: relative;
    padding: 15px;
    border-bottom: 2px solid #DDDDDD;
}
h2 {
    font-size: 25px;
    color: #474747;
    text-align: center;
}
.close {
    position: absolute;
    right: 10px;
    top: 50%;
    width: 30px;
    height: 30px;
    font-size: 25px;
    font-weight: 400;
    background-color: #FC5C65;
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transform: rotateZ(45deg) translateX(-50%);
    transition-duration: 200ms;

    &:hover {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.30);
    }
}
button {
    position: absolute;
    right: 10px;
    top: 50%;
}
.content {
    height: 100%;
    display: flex;
}
</style>