import Vue from "vue";
import Vuex from 'vuex';
import { action } from './action';
import { mutations } from "./mutations";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        logedin: { id:'',password:'', isAdmin:''},
        registeredUsers:[],
        tolls:[],
        vehicleEntry:[],
    },
    getters:{
        logedin: state => state.logedin,
        registeredUsers:state => state.registeredUsers,
        tolls:state => state.tolls,
        vehicleEntry:state => state.vehicleEntry,
    },
    mutations:{
        ...mutations
    },
    // mutations:{
    //     setLogedinType(state,val){
    //         state.logedin.id = val.id;
    //         state.logedin.password = val.password;
    //         state.logedin.isAdmin = val.isAdmin;
    //    },
    //    addNewTolls(state, val){
    //     state.tolls.push(val)
    //    },
    //    deleteToll(state,val){
    //     const filteredArr = state.tolls.filter(item => item?.tollName !== val);
    //     state.tolls = filteredArr;
    //    },
    //    logOut(state){
    //     state.logedin = { id:'',password:'', isAdmin:''};
    //    },
    //    makeNewVehicleEntry(state,payload){
    //     state.vehicleEntry.push(payload);
    //    }
    // },
    actions:{
        ...action
    }
}
);