export const mutations = {
    setLogedinType(state, val) {
        state.logedin.id = val.id;
        state.logedin.password = val.password;
        state.logedin.isAdmin = val.isAdmin;
    },
    addNewTolls(state, val) {
        state.tolls.push(val)
    },
    deleteToll(state, val) {
        const filteredArr = state.tolls.filter(item => item?.tollName !== val);
        state.tolls = filteredArr;
    },
    logOut(state) {
        state.logedin = { id: '', password: '', isAdmin: '' };
    },
    makeNewVehicleEntry(state, payload) {
        state.vehicleEntry.push(payload);
    }
};