<template>
    <div class="page-container">
        <VAuthCard title="Signup to Dashy">
            <TheSignupForm />
        </VAuthCard>
    </div>
</template>

<script>
import VAuthCard from '@/components/VAuthCard.vue';
import TheSignupForm from '@/components/TheSignupForm.vue';
    export default {
        components: {
            VAuthCard,
            TheSignupForm
        },
    }
</script>

<style lang="scss" scoped>
.page-container {
    padding-top: 3%;
}
</style>