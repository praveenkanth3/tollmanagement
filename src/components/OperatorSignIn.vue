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
            <select>
                <option>kls</option>
                <option>aff</option>
            </select>
          </section>
          <footer class="modal-footer">
            <button
             type="button"
             class="btn-green"
            >
              Sign Up
            </button>
            <!-- <button
              type="button"
              class="btn-green"
              @click="onCloseModel"
            >
              Cancel
            </button> -->
            <div>Dont have an account? <span @click="onClickCreateAccount" class="createAccount">Create new account</span></div>
          </footer>
        </div>
      </div>
    </transition>

</template>
<script>
import './Popup.css';
export default {
    name: 'OperatorSignIn',
    props:{
          onCloseModel: Function,
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