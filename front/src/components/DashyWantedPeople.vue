<template>
    <div class="dashy-wanted-people">
        <DashyPerson
            v-for="person in people"
            :key="person.uid"
            :person="person"
        />
    </div>
</template>

<script>
import DashyPerson from '@/components/DashyPerson.vue';
    export default {
        components: {
            DashyPerson,
        },
        props: {
            content: {
                type: Object,
                default: undefined
            },
        },
        computed: {
            people() {
                let array = [];
                
                for (let i = 0; i < 5 && this.content.content[i]; i++) {
                    console.log
                    array.push(this.content.content[i]);
                }
                return array;
            }
        },
    }
</script>

<style lang="scss" scoped>
.dashy-wanted-people {
    width: 100%;
}
</style>