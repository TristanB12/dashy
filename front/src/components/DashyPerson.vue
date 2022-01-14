<template>
    <div class="person">
        <img v-if="person.images" :src="person.images[0].original" alt="">
        <div class="infos">
            <h4 v-if="person.title"> {{ person.title }} </h4>
            <span v-if="person.subjects"> {{ person.subjects[0] }} </span>
        </div>
        <a v-if="person.files" :href="person.files[0].url" target="_blank"> brief </a>
    </div>
</template>

<script>
    export default {
        props: {
            person: {
                type: Object,
                default: undefined
            },
        },
    }
</script>

<style lang="scss" scoped>
.person {
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
} 
img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
}
h4 {
    font-size: 16px;
}
span {
    font-size: 10px;
}
.infos {
    width: 60%;
}
.followers {
    width: 10%;

    span {
        font-size: 12px;
    }
}
a {
    color: #00A3FF;
    font-style: italic;
    font-weight: 600;
}
</style>