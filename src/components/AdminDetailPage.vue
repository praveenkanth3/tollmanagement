<template>
    <div class="adminDetail">
        <div class="headerContainer">
            <DetailPageHeader
            pageHeading="Admin Toll List Page"
            :onClickVehicleEntry="onClickVehicleEntry"
            :loggedInUser="logedin.id"
            :onClickLogout="onClickLogout"
            />
            <div class="sectionHeader">
                <div class="searchContainer">
                    <h2>Toll List</h2>
                    <span>|</span>
                    <input placeholder="Search toll" v-model="searchInput" />
                </div>
                <div>
                    <button @click="isAddNewTollModelVisible = true">Add new Toll</button>
                </div>
            </div>
            <div v-if="!filteredList.length" class="noTolls">No Tolls available</div>
            <div v-else>
                <table>
                    <tr>
                        <th>Toll name</th>
                        <th>Car/Jeep/Van</th>
                        <th>LCV</th>
                        <th>Truck/Bus</th>
                        <th>Heavy vehicle</th>
                    </tr>
                    <tr v-for="toll in filteredList" :key="toll?.tollName + randomNumber()">
                        <td>{{ toll?.tollName }}</td>
                        <td v-for="fare in toll.fareDetails" :key="fare.name + randomNumber()">{{fare.single}}/{{ fare.return }}</td>
                        <div @click="onClickDeleteToll(toll.tollName)" class="deleteBtn">Delete</div>
                    </tr>
                </table>
            </div>
        </div>
        <AddNewTollModel v-show="isAddNewTollModelVisible">
            <template  v-slot:addTollContent>
                <transition name="modal-fade">
                    <div class="modal-backdrop">
                        <div class="modal">
                            <header class="modal-header" id="modalTitle">
                                Add New Toll
                                <button type="button" class="btn-close" @click="onModelClose">
                                    x
                                </button>
                            </header>

                            <section class="modal-body" id="modalDescription">
                                <div>Toll Name<span>*</span></div>
                                <input placeholder="Enter the toll name" v-model="newTollData.tollName"/>
                                <div>Vehicle Fare details<span>*</span></div>
                                <div>
                                    <div v-for="(vehicle,index) in vehicleList" v-bind:key="index">
                                        <input :value="vehicle.name" disabled/>
                                        <input placeholder="single journey" type="number" v-model="newTollData.fareDetails[index].single"/>
                                        <input placeholder="return journey" type="number" v-model="newTollData.fareDetails[index].return"/>
                                    </div>
                                </div>
                            </section>
                            <footer class="modal-footer">
                                <button type="button" class="btn-green" @click="onClickAddNewToll">
                                    Add Details
                                </button>
                            </footer>
                        </div>
                    </div>
                </transition>
            </template>
        </AddNewTollModel>
    </div>
</template>
<script>
 /* eslint-disable */ 
import '../styles/DetailPage.css';
import AddNewTollModel from './AddNewTollModel.vue';
import DetailPageHeader from './DetailPageHeader.vue';
import {initialAddnewTollData} from '../constants/constants';
import { mapGetters } from 'vuex';


export default {
    name: 'AdminDetailPage',

    data() {
        return {
            isAddNewTollModelVisible: false,
            newTollData: JSON.parse(JSON.stringify(initialAddnewTollData)),
            searchInput:'',
        }
    },

    computed: {
        ...mapGetters({
            logedin: 'logedin',
            tollData: 'tolls'
        }),

        vehicleList(){
            return initialAddnewTollData.fareDetails
        },

        filteredList() {
            return this.tollData.filter((toll) => toll.tollName.toLowerCase().includes(this.searchInput.toLowerCase()));

        }
    },

    methods: {
        onModelClose() {
            this.isAddNewTollModelVisible = false
        },
        
        randomNumber(){
            return Math.floor(Math.random() * 10000);
        },

        onClickAddNewToll(){
            if(this.newTollData.fareDetails.every(val => val.single > 0 && val.return >0) && this.newTollData.tollName.length > 0){
                this.$store.dispatch('addNewTolls',this.newTollData);
                this.newTollData = JSON.parse(JSON.stringify(initialAddnewTollData));
            }
            else{
                alert('Please fill the all mandatory fields');
            }
        },

        onClickDeleteToll(val){
            this.$store.dispatch('deleteToll',val);
        },

        onClickLogout(){
            this.$store.dispatch('logOut');
            this.$router.push({name:'Landing'})
        },
        
        onClickVehicleEntry(){
            this.$router.push({name:'AdminVehicleEntryPage'})
        }
    },

    components: {
        AddNewTollModel,
        DetailPageHeader
    }
}
</script>

<style lang="scss" scoped>
.adminDetail {
    background-image: url("../images/roadimg.jpg");
    background-repeat: no-repeat;
    background-size: cover;      
    background-position: center;
    height: 100%;
    .headerContainer {
        color: white;
    }
    table {
        background-color: chocolate;
        
        tr:first-of-type {
            background-color: inherit;
        }
    }
    .sectionHeader{
        button{
            height: 30px;
        border-radius: 10px;
        background-color: white;
        }
        .searchContainer {
            input {
                border-radius: 10px;
            }
        }
    }
}
</style>