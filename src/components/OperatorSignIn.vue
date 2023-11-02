<template>
     <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal"
        >
          <header
            class="modal-header"
            id="modalTitle"
          >
            Operator Login
            <button
              type="button"
              class="btn-close"
              @click="onCloseModel"
            >
              x
            </button>
          </header>
  
          <section
            class="modal-body"
            id="modalDescription"
          >
            <div>Login Id</div>
            <input v-model="id" />
            <div>Password</div>
            <input v-model="password"/>
            <div>Select toll location</div>
            <select v-model="tollLocation">
                <!-- <option>kls</option>
                <option>aff</option> -->
                <option disabled value="">Please select one</option>
                <option v-for="toll in tolls" :value="toll.tollName" :key="toll.tollName">{{ toll.tollName }}</option>
            </select>
          </section>
          <footer class="modal-footer">
            <button
             type="button"
             class="btn-green"
             @click="onClickSignIn"
            >
              Sign In
            </button>
            <div>Dont have an account? <span @click="onClickCreateAccount" class="createAccount">Create new account</span></div>
          </footer>
        </div>
      </div>
    </transition>

</template>
<script>
import './Popup.css';
// import { store } from '../store';
export default {
    name: 'OperatorSignIn',
    props:{
          onCloseModel: Function,
    },
    computed:{
      tolls(){
        return this.$store.getters.tolls
      },
    },
    data (){
        return{
            id:'',
            password:'',
            tollLocation:'',
        }
    },
    methods:{
        onClickCreateAccount(){
            this.$parent.onSigninModelClose();
            this.$parent.onClickSignupModelOpen();
        },
        onClickSignIn(){
          if(this.id.length !== 0  && this.password.length >=8){
            console.log('ans')
            let userFromLocalStorage = JSON.parse(localStorage.getItem(this.id));
            if(!userFromLocalStorage){
              alert('invalid user');
            }
            else{
              if(userFromLocalStorage.id === this.id && userFromLocalStorage.password === this.password && this.tollLocation!== ''){
                this.$store.dispatch('setLogedinType',{id:this.id,password:this.password,isAdmin:false});
                this.$router.push({path: '/operatorDetail', query : { tollLoc: this.tollLocation}});
              }
              else{
                alert('id or password wrong');
              }
            }
          }
          else{
            alert('Id should be valid,password must be 8 digit');
          }

        }
    }
}

</script>
<style scoped>
.createAccount{
    color: blue;
    cursor: pointer;
}
</style>