export const  action = {
    setLogedinType(context,payload){
        context.commit('setLogedinType',payload);
    },
    addNewTolls(context,payload){
        context.commit('addNewTolls',payload);
    },
    deleteToll(context,payload){
        context.commit('deleteToll',payload);
    },
    logOut(context){
        context.commit('logOut');
    },
    makeNewVehicleEntry(context,payload){
        context.commit('makeNewVehicleEntry',payload);
    }
}