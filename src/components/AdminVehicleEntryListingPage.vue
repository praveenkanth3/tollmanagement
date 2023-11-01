<template>
    <div v-if="logedIn.isAdmin">
        <div class="header">
            <div>Toll Management Application </div>
            <div>
                <div>Hello,{{ logedIn.id }}</div>
                <div class="deleteBtn" @click="onClickLogout">Logout</div>
            </div>
        </div>
        <div class="sectionHeader">
            <div class="searchContainer">
                <h2>Toll List</h2>
                <span>|</span>
                <select v-model="tollBooth">
                    <option value="" >All</option>
                    <option :value="toll.tollName" v-bind:key="toll.tollName" v-for="toll in tolls">{{toll.tollName}}</option>
                </select>
                <input placeholder="Search vehicle" v-model="searchInput"/>
            </div>
        </div>
        <div v-if="filteredList.length === 0 " class="noTolls">No vehicles available</div>
        <div v-else>
            <table>
                <tr>
                    <th>Vehicle Type</th>
                    <th>Vehicle Number</th>
                    <th>Time</th>
                    <th>Toll Name</th>
                    <th>Traiff</th>
                </tr>
                <!-- <tr v-for="toll in filteredList" :key="toll?.tollName + Math.floor(Math.random() * 10000)">
                    <td>{{ toll?.tollName }}</td>
                    <td v-for="fare in toll.fareDetails" :key="fare.name+Math.floor(Math.random() * 10000)">{{fare.single}}/{{ fare.return }}</td>
                    <div @click="onClickDeleteToll(toll.tollName)" class="deleteBtn">Delete</div>
                </tr> -->
                <tr v-for="data in filteredList" v-bind:key="data.vehicleNo">
                    <td>{{ data.type }}</td>
                    <td>{{ data.vehicleNo }}</td>
                    <td>{{ data.time }}</td>
                    <td>{{ data.toll }}</td>
                    <td>{{ data.traiff }}</td>
                </tr>
            </table>
        </div>
    </div>

</template>
<script>
import './AdminDetailPage.css';
export default {
    name:'AdminVehicleEntryListingPage',
    data(){
        return{
            searchInput:'',
            tollBooth:''
        }
    },
    computed:{
        tolls(){
            return this.$store.state.tolls
        },
        logedIn(){
            return this.$store.getters.logedin;
        },
        filteredList() {
            return this.$store.getters.vehicleEntry.filter((vehicle) => vehicle.vehicleNo.toLowerCase().includes(this.searchInput.toLowerCase()) && vehicle.toll.toLowerCase().includes(this.tollBooth.toLowerCase()));
        }   
    },
    methods:{
        onClickLogout(){
            this.$store.dispatch('logOut');
            this.$router.push('/')
        },
    }
}
</script>