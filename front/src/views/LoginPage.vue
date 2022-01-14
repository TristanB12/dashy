<template>
    <div class="page-container">
        <VAuthCard title="Login to Dashy">
            <TheLoginForm />
        </VAuthCard>
    </div>
</template>

<script>
import VAuthCard from '@/components/VAuthCard.vue';
import TheLoginForm from '@/components/TheLoginForm.vue';
    export default {
        components: {
            VAuthCard,
            TheLoginForm
        },
    }
</script>

<style lang="scss" scoped>
.page-container {
    padding-top: 3%;
}
</style>