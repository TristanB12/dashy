<template>
    <div class="signup-form">
        <VLightButton
            title="Sign up with Facebook"
            iconName="facebook_logo.png"
            width="100%"
            :isLoading="isLoading.facebook"
            @click.native="signupWithFacebook"
        />
        <VLightButton
            title="Signup with Github"
            iconName="github_logo.png"
            width="100%"
            :isLoading="isLoading.github"
            @click.native="signupWithGithub"
        />
        <div>
            <span class="line"></span>
            <span>or</span>
            <span class="line"></span>
        </div>
        <span  class="error" v-if="error" v-html="error"></span>
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
        <VInput
            type="password"
            placeholder="Confirm password"
            width="100%"
            iconName="password_icon.png"
            @input-updated="setConfirmPassword"
        />
        <VButton
            title="Sign up"
            width="100%"
            :isLoading="isLoading.signup"
            @click.native="signupWithEmail"
        />
        <span>Already have an account ? <router-link :to="{name: 'LoginPage'}" >Login</router-link></span>
    </div>
</template>

<script>
import {facebookAuthCode, githubAuthCode} from '../services/authCodeRedirections';
import VLightButton from '@/components/VLightButton.vue';
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import {signupUser} from '@/services/apiWrapper.js';

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
                    signup: false
                },
                inputs: {
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                error: undefined
            }
        },
        methods: {
            setEmail(data) {
                this.inputs.email = data;
            },
            setPassword(data) {
                this.inputs.password = data;
            },
            setConfirmPassword(data) {
                this.inputs.confirmPassword = data;
            },
            signupWithFacebook() {
                this.isLoading.facebook = true;
                let win = facebookAuthCode('signup');
                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.push({name: 'DashboardPage'});
                    }
                }, 500);
            },
            signupWithGithub() {
                this.isLoading.github = true;
                let win = githubAuthCode('signup');
                const timer = setInterval(() => {
                    if (win.closed) {
                        clearInterval(timer);
                        this.$router.push({name: 'DashboardPage'});
                    }
                }, 500);
            },
            async signupWithEmail() {
                if (this.inputs.password.trim() === "" ||
                    this.inputs.confirmPassword.trim() === "" ||
                    this.inputs.email.trim() === "") {
                    return;
                }
                if (this.inputs.password !== this.inputs.confirmPassword) {
                    this.error = "Passwords are not identical.";
                    return;
                }
                this.isLoading.signup = true;
                let res = await signupUser(this.inputs);
                if (res[0]) {
                    localStorage.setItem('access_token', res[0].access_token);
                    this.$router.push({name: 'DashboardPage'});
                }
                else {
                    this.error = res[1].message;
                    this.isLoading.signup = false;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.signup-form {
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