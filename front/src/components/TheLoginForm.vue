<template>
    <div class="login-form">
        <VLightButton
            title="Login with Facebook"
            iconName="facebook_logo.png"
            width="100%"
            :isLoading="isLoading.facebook"
            @click.native="loginWithFacebook"
        />
        <VLightButton
            title="Login with Github"
            iconName="github_logo.png"
            width="100%"
            :isLoading="isLoading.github"
            @click.native="loginWithGithub"
        />
        <div>
            <span class="line"></span>
            <span>or</span>
            <span class="line"></span>
        </div>
            <span  class="error" v-if="error">{{ error }}</span>
        <VInput
            type="text"
            placeholder="Email"
            width="100%"
            iconName="email_icon.png"
            @input-updated="setEmail"
        />
        <VInput
            type="password"
            placeholder="Password"
            width="100%"
            iconName="password_icon.png"
            @input-updated="setPassword"
        />
        <VButton
            title="Login"
            width="100%"
            :isLoading="isLoading.login"
            @click.native="loginWithEmail"
        />
        <span>Don't have an account ? <router-link :to="{name: 'SignupPage'}" >Register</router-link></span>
    </div>
</template>

<script>
import VLightButton from '@/components/VLightButton.vue';
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import {loginUser} from '@/services/apiWrapper.js';
import {facebookAuthCode, githubAuthCode} from '../services/authCodeRedirections';
    export default {
        components: {
            VLightButton,
            VButton,
            VInput
        },
        data() {
            return {
                isLoading: {
                    facebook: false,
                    github: false,
                    login: false
                },
                inputs: {
                    email: "",
                    password: ""
                },
                error: undefined
            }
        },
        methods: {
            loginWithFacebook() {
                this.isLoading.facebook = true;
                let win = facebookAuthCode('login');

                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.push({name: 'DashboardPage'});
                    }
                }, 500);
            },
            loginWithGithub() {
                this.isLoading.github = true;

                let win = githubAuthCode('login');

                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.push({name: 'DashboardPage'});
                    }
                }, 500);
            },
            async loginWithEmail() {
                if (this.inputs.password.trim() === "" ||
                    this.inputs.email.trim() === "") {
                    return;
                }
                this.isLoading.login = true;
                let res = await loginUser(this.inputs);
                if (res[0]) {
                    localStorage.setItem('access_token', res[0].access_token);
                    this.$router.push({name: 'DashboardPage'});
                }
                else {
                    console.log(res);
                    this.error = res[1].message;
                    this.isLoading.login = false;
                }
            },
            setEmail(event) {
                this.inputs.email = event;
            },
            setPassword(event) {
                this.inputs.password = event;
            }
        },
    }
</script>

<style lang="scss" scoped>
.login-form {
    text-align: center;

    * {
        margin: 20px 0;
    }
    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .line {
            width: 42%;
            height: 1px;
            background-color: black;
        }
    }
}
.button {
    margin-top: 30px;
}
a {
    font-weight: 500;
    text-decoration: underline;
    color: black;
}
.error {
    color: #FC5C65;
    font-weight: 600;
}
</style>