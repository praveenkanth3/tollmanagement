<template>
    <div v-if="logedin.isAdmin">
        <h1 class="pageHeading">Admin Toll List Page</h1>
        <div class="header">
            <div>Toll Management Application <button @click="onClickVehicleEntry">click to see vehicles entry</button></div>
            <div>
                <div>Hello,{{ logedin.id }}</div>
                <div class="deleteBtn" @click="onClickLogout">Logout</div>
            </div>
        </div>
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
        <div v-if="filteredList.length === 0 " class="noTolls">No Tolls available</div>
        <div v-else>
            <table>
                <tr>
                    <th>Toll name</th>
                    <th>Car/Jeep/Van</th>
                    <th>LCV</th>
                    <th>Truck/Bus</th>
                    <th>Heavy vehicle</th>
                </tr>
                <tr v-for="toll in filteredList" :key="toll?.tollName + Math.floor(Math.random() * 10000)">
                    <td>{{ toll?.tollName }}</td>
                    <td v-for="fare in toll.fareDetails" :key="fare.name+Math.floor(Math.random() * 10000)">{{fare.single}}/{{ fare.return }}</td>
                    <div @click="onClickDeleteToll(toll.tollName)" class="deleteBtn">Delete</div>
                </tr>
            </table>
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
                                    <div>
                                        <input value="Car/Jeep/Van" disabled/>
                                        <input placeholder="single journey" type="number" v-model="newTollData.fareDetails[0].single"/>
                                        <input placeholder="return journey" type="number" v-model="newTollData.fareDetails[0].return"/>
                                    </div>
                                    <div>
                                        <input value="LCV" disabled/>
                                        <input placeholder="single journey" type="number" v-model="newTollData.fareDetails[1].single"/>
                                        <input placeholder="return journey" type="number" v-model="newTollData.fareDetails[1].return"/>
                                    </div>
                                    <div>
                                        <input value="Truck/Bus" disabled/>
                                        <input placeholder="single journey" type="number" v-model="newTollData.fareDetails[2].single"/>
                                        <input placeholder="return journey" type="number" v-model="newTollData.fareDetails[2].return"/>
                                    </div>
                                    <div>
                                        <input value="Heavy vehicle" disabled/>
                                        <input placeholder="single journey" type="number" v-model="newTollData.fareDetails[3].single"/>
                                        <input placeholder="return journey" type="number" v-model="newTollData.fareDetails[3].return"/>
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
import './AdminDetailPage.css';
import { store } from '../store';
import AddNewTollModel from './AddNewTollModel.vue';
import {initialAddnewTollData} from './constants';
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
        logedin() {
            return store.state.logedin
        },
        tollData(){
            return store.state.tolls
        },
        filteredList() {
            return store.state.tolls.filter((toll) => toll.tollName.toLowerCase().includes(this.searchInput.toLowerCase()));
}
    },
    components: {
        AddNewTollModel,
    },
    methods: {
        onModelClose() {
            this.isAddNewTollModelVisible = false
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
            this.$router.push('/')
        },
        onClickVehicleEntry(){
            this.$router.push('/adminVehicleEntryPage')
        }
    }
}
</script>