<template>
  <div class="landingPageContent">
    <h1>Welcome to the Tollz App</h1>
    <h2>Choose any one to proceed...</h2>
    <div class="btns">
      <button  @click="isAdminPopupVisible = true">Admin</button>
      <button><router-link to="/operator">Operator</router-link></button>
    </div>
    <AdminPopupModal v-show="isAdminPopupVisible" :onCloseModel="onCloseModel" :adminLogin="adminLogin" :onChangeAdminId="onChangeAdminId" :onChangeAdminPassword="onChangeAdminPassword" :onSubmitAdminLogin="onSubmitAdminLogin"/>
  </div>
</template>

<script>
import AdminPopupModal from './AdminPopupModal.vue';
import { store } from '../store'
export default {
  name: 'LandingPage',
  components:{
    AdminPopupModal,
  },
  data (){
    return{
      isAdminPopupVisible: false,
      adminLogin: { id:'',password:''},
    }
  },
  props: {
  },
  computed:{
    logedin(){
      return store.state.logedin;
    }
  },
  methods:{
    onCloseModel(){
      this.isAdminPopupVisible = false;
    },
    onChangeAdminId(value){
      this.adminLogin.id = value
    },
    onChangeAdminPassword(value){
      this.adminLogin.password = value
    },
    onSubmitAdminLogin(){
      if(this.adminLogin.id === 'admin' && this.adminLogin.password === 'admin'){
        alert(`Successfully logedin as a Admin`)
        this.adminLogin.id = '';
        this.adminLogin.password = '';
        this.isAdminPopupVisible = false;
        this.$store.dispatch('setLogedinType',{ id: 'admin', password:'admin', isAdmin: true});
        this.$router.push('/admindetail')
      }
      else{
        alert(`invalid username or password`)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.landingPageContent{
  display: flex;
  flex-direction: column;
}
.btns{
  display: flex;
  column-gap: 30px;
}
button{
  width: fit-content;
}
</style>
