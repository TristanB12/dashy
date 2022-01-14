<template>
    <aside>
        <div class="container">
            <div class="service" v-for="conf in $store.state.widgetsConf" :key="conf.service">
                <router-link :to="{name: 'AddServicePage', params: {service: conf.service}}">
                    <div>
                        <img :src="getImgPath(conf.service)" alt="">
                    </div>
                </router-link>
            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        methods: {
            getImgPath(service) {
                return require('../assets/'+ service.toLowerCase() + '_logo.png');
            }
        },
    }
</script>

<style lang="scss" scoped>
aside {
    height: 100%;
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid #DDDDDD;
}
img {
    margin: 10px 0;
    width: 40px;
    height: 40px;
}
.container {
    width: 100%;
}
.service {
    display: flex;
    align-items: center;
    margin: 20px 0;
}
a {
    width: 100%;

    div {
        width: 100%;
        display: flex;
        align-items: center;

        img {
            margin: auto;
        }
    }
}
.router-link-active {
    div {
        width: 100%;
        display: flex;
        align-items: center;
        border-right: 5px solid #00A3FF;
    }
}
</style>