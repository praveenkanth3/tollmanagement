<template>
    <div>
        <h1 class="pageHeading" v-if="pageHeading">{{pageHeading}}</h1>
        <div class="header">
            <div>Toll Management Application <button class="vehicleListBtn" v-if="onClickVehicleEntry" @click="onClickVehicleEntry">click to see vehicles entry</button></div>
            <div>
                <div>Hello,{{ loggedInUser }}</div>
                <div class="logoutBtn" @click="onClickLogout">Logout</div>
            </div>
        </div>
    </div>
</template>
<script>
import '../styles/DetailPage.css';
export default {
    name: 'DetailsPageHeader',

    props:{
        pageHeading:{
            type: String,
            required:false
        },

        loggedInUser:{
            type: String,
            required: true
        },

        onClickLogout:{
            type: Function,
            required: true
        },

        onClickVehicleEntry: {
            type: Function,
            required: false
        }
    }
}

</script>

<style lang="scss" scoped>
.vehicleListBtn{
    border-radius: 10px;
}
</style>