<template>
    <div>
        <h1>Welcome to the operator page</h1>
        <div>Do you have an account already?</div>
        <button  @click="onClickSigninModelOpen">Sign In</button>
        <div>If you dont have an account</div>
        <button @click="onClickSignupModelOpen">Sign Up</button>
        <OperatorSignup v-show="isSignUpModelIsVisible" :onCloseModel="onSignupCloseModel" />
        <OperatorSignIn v-show="isSignInModelIsVisible" :onCloseModel="onSigninModelClose" />
        <div><router-link to="/">-> Back to Home page</router-link></div>
    </div>
</template>
<script>
import OperatorSignup from './OperatorSignup.vue';
import OperatorSignIn from './OperatorSignIn.vue';
export default {
    name: 'OperatorPage',
    data(){
        return{
            isSignUpModelIsVisible: false,
            isSignInModelIsVisible: false,
        }
    },
    components:{
        OperatorSignup,
        OperatorSignIn,
    },
    methods:{
        onSignupCloseModel(){
            this.isSignUpModelIsVisible = false
        },
        onSigninModelClose(){
            this.isSignInModelIsVisible = false
        },
        onClickSignupModelOpen(){
            this.isSignUpModelIsVisible = true
        },
        onClickSigninModelOpen(){
            this.isSignInModelIsVisible=true
        }
    }
}
</script>