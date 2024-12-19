<template>
    <div class="operatorPage">
        <div class="content">
            <h1>Welcome to the operator page</h1>
            <div>Do you have an account already?</div>
            <button @click="signinToggle">Sign In</button>
            <div>If you dont have an account</div>
            <button @click="signupToggle">Sign Up</button>
            <div><router-link to="/">-> Back to Home page</router-link></div>
        </div>
        <OperatorSignup v-if="isSignUpModelIsVisible" :onCloseModel="signupToggle" />
        <OperatorSignIn v-if="isSignInModelIsVisible" :onCloseModel="signinToggle" :operatorSignup="signupToggle"/>
    </div>
</template>
<script>
import OperatorSignup from './OperatorSignup.vue';
import OperatorSignIn from './OperatorSignIn.vue';

export default {
    name: 'OperatorPage',

    data() {
        return {
            isSignUpModelIsVisible: false,
            isSignInModelIsVisible: false,
        }
    },

    methods: {

        signinToggle(val = true) {
            this.isSignInModelIsVisible = val
        },

        signupToggle(val = true) {
            this.isSignUpModelIsVisible = val
        }
    },

    components: {
        OperatorSignup,
        OperatorSignIn,
    },
}
</script>

<style lang="scss">
.operatorPage{
    height: 100%;
    background-image: url("../images/tollimage3.jpg");
    background-repeat: no-repeat;
    background-size: cover;      
    background-position: center;
    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-shadow: 2px 2px 10px black; 
        a{
            text-decoration: none;
            color: white;
        }
    }
}
</style>