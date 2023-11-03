<template>
    <div>
        <DetailPageHeader :loggedInUser="logedIn.id" :onClickLogout="onClickLogout" />
        <div class="sectionHeader">
            <div class="searchContainer">
                <h2>Toll List</h2>
                <span>|</span>
                <select v-model="tollBooth">
                    <option value="">All</option>
                    <option :value="toll.tollName" v-bind:key="toll.tollName" v-for="toll in tolls">{{ toll.tollName }}
                    </option>
                </select>
                <input placeholder="Search vehicle" v-model="searchInput" />
            </div>
        </div>
        <div v-if="!filteredList.length" class="noTolls">No vehicles available</div>
        <div v-else>
            <table>
                <tr>
                    <th>Vehicle Type</th>
                    <th>Vehicle Number</th>
                    <th>Time</th>
                    <th>Toll Name</th>
                    <th>Traiff</th>
                </tr>
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
import '../styles/DetailPage.css';
import DetailPageHeader from './DetailPageHeader.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'AdminVehicleEntryListingPage',

    data() {
        return {
            searchInput: '',
            tollBooth: ''
        }
    },

    computed: {

        ...mapGetters({
            tolls: 'tolls',
            logedIn: 'logedin',
            vehicleEntry: 'vehicleEntry'
        }),

        filteredList() {
            return this.vehicleEntry.filter((vehicle) => vehicle.vehicleNo.toLowerCase().includes(this.searchInput.toLowerCase()) && vehicle.toll.toLowerCase().includes(this.tollBooth.toLowerCase()));
        }
    },

    methods: {
        onClickLogout() {
            this.$store.dispatch('logOut');
            this.$router.push({ name: 'Landing' })
        },
    },

    components: {
        DetailPageHeader
    }

}
</script>