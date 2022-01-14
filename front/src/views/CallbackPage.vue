<template>
    <div>
        <div class="error" v-if="error">{{ error }}</div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                error: undefined
            }
        },
        mounted () {
            this.processCallback();
        },
        methods: {
            processCallback() {
                if (this.$route.query.error) {
                    this.error = this.$route.query.error;
                    return;
                }
                if (this.$route.query.state == 'link')
                    this.processLink();
                else if (this.$route.query.state == 'login')
                    this.processLogin();
                else if (this.$route.query.state == 'signup')
                    this.processSignup();
            },
            processLink() {
                let data = JSON.stringify({
                    code: this.$route.query.code
                });
                let config = {
                    method: 'post',
                    url: '/api/services/' + this.$route.params.service + '/link',
                    headers: { 
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };
                axios(config)
                    .then(() => window.close())
                    .catch(err => {his.error = err.response.data});
            },
            processLogin() {
                let data = JSON.stringify({
                    code: this.$route.query.code
                });
                let config = {
                    method: 'post',
                    url: '/api/auth/login/' + this.$route.params.service,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };
                axios(config)
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access_token)
                        window.close();
                    })
                    .catch(err => this.error = err.response.data);
            },
            processSignup() {
                let data = JSON.stringify({
                    code: this.$route.query.code
                });
                let config = {
                    method: 'post',
                    url: '/api/auth/signup/' + this.$route.params.service,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };
                axios(config)
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access_token)
                        window.close();
                    })
                    .catch(err => this.error = err.response.data);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>