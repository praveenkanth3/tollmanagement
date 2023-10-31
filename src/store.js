import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        logedin: { id:'',password:'', isAdmin:''},
        registeredUsers:[],
        tolls:[],
    },
    mutations:{
        setLogedinType(state,val){
            state.logedin.id = val.id;
            state.logedin.password = val.password;
            state.logedin.isAdmin = val.isAdmin;
       },
       addNewTolls(state, val){
        state.tolls.push(val)
       },
       deleteToll(state,val){
        const filteredArr = state.tolls.filter(item => item?.tollName !== val);
        state.tolls = filteredArr;
       },
       logOut(state){
        state.logedin = { id:'',password:'', isAdmin:''};
       }
    },
    actions:{
        setLogedinType(context,payload){
            context.commit('setLogedinType',payload);
        },
        addNewTolls(context,payload){
            context.commit('addNewTolls',payload)
        },
        deleteToll(context,payload){
            context.commit('deleteToll',payload)
        },
        logOut(context){
            context.commit('logOut')
        }
    }
}
);