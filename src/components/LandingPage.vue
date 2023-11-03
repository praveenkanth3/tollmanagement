<template>
  <div class="landingPageContent">
    <h1>Welcome to the Tollz App</h1>
    <h2>Choose any one to proceed...</h2>
    <div class="btns">
      <button  @click="isAdminPopupVisible = true">Admin</button>
      <button><router-link to="/operator">Operator</router-link></button>
    </div>
    <AdminPopupModal
     v-if="isAdminPopupVisible" 
     :onCloseModel="onCloseModel" 
     :adminLogin="adminLogin" 
     :onChangeAdminId="onChangeAdminId" 
     :onChangeAdminPassword="onChangeAdminPassword" 
     :onSubmitAdminLogin="onSubmitAdminLogin"
    />
  </div>
</template>

<script>
import AdminPopupModal from './AdminPopupModal.vue';
import { mapGetters } from 'vuex';

const ADMIN = 'admin';

export default {
  name: 'LandingPage',

  data (){
    return{
      isAdminPopupVisible: false,
      adminLogin: { id:'',password:''},
    }
  },

  computed:{

    ...mapGetters({
            logedin: 'logedin',
        }),
  },

  methods:{
    onCloseModel(){
      this.isAdminPopupVisible = false;
      window.adminLogged = false;
    },

    onChangeAdminId(value){
      this.adminLogin.id = value
    },

    onChangeAdminPassword(value){
      this.adminLogin.password = value
    },

    onSubmitAdminLogin(){
      if(this.adminLogin.id === ADMIN && this.adminLogin.password === ADMIN){
        window.adminLogged = true;
        alert(`Successfully logedin as a Admin`)
        this.adminLogin.id = '';
        this.adminLogin.password = '';
        this.isAdminPopupVisible = false;
        this.$store.dispatch('setLogedinType',{ id: ADMIN, password:ADMIN, isAdmin: true});
        this.$router.push({name: 'AdminDetail'})
      }else{
        alert(`invalid username or password`)
      }
    }
  },
  
  components:{
    AdminPopupModal,
  },
  
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
