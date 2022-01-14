<template>
    <div class="widget">
        <img :src="getImgPath()" alt="">
        <h4>{{ widget.name }}</h4>
        <VButton
            title="Add"
            titleSize="14px"
            width="100px"
            height="25px"
            @click.native="$router.push({name: 'ServiceAdder', params: {service: $route.params.service, widgetCode: widget.code}})"
        />
    </div>
</template>

<script>
import VButton from '@/components/VButton.vue';
    export default {
        components: {
            VButton,
        },
        props: {
            widget: {
                type: Object,
                default: undefined
            },
        },
        methods: {
            getImgPath() {
                return require('../assets/'+ this.widget.service.toLowerCase() + '_logo.png');
            },
        },
    }
</script>

<style lang="scss" scoped>
.widget {
    margin: 20px;
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
    
    * {
        margin: 7px 0;
    }
}
h4 {
    text-align: center;
}
img {
    width: 40px;
    height: 40px;
}
</style>