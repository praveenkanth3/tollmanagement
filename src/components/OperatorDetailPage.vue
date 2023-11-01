<template>
    <div v-if="logedin.id">
        <h1 class="pageHeading">Operator Page</h1>
        <div class="header">
            <div>Toll Management Application</div>
            <div>
                <div>Hello,{{ logedin.id }}</div>
                <div class="deleteBtn" @click="onClickLogOut">Logout</div>
            </div>
        </div>
        <div class="sectionHeader">
            <div class="searchContainer">
                <h2>Toll List</h2>
                <span>|</span>
                <input placeholder="Search toll" v-model="searchInput" />
            </div>
            <div>
                <button @click="isEntryModelIsVisible = true">Add new Entry</button>
            </div>
        </div>
        <div v-if="filteredList.length === 0" class="noTolls">No Tolls available</div>
        <div v-else>
            <table>
                <tr>
                    <th>Vehicle Type</th>
                    <th>Vehicle Number</th>
                    <th>Time</th>
                    <th>Traiff</th>
                </tr>
                <tr v-for="vehicle in filteredList" v-bind:key="vehicle.vehicleNo">
                    <td>{{ vehicle.type }}</td>
                    <td>{{ vehicle.vehicleNo }}</td>
                    <td>{{ vehicle.time }}</td>
                    <td>{{ vehicle.traiff }}</td>

                </tr>
            </table>
        </div>
        <OperatorEntryModal v-show="isEntryModelIsVisible">
            <template v-slot:addNewEntry>
                <transition name="modal-fade">
                    <div class="modal-backdrop">
                        <div class="modal">
                            <header class="modal-header" id="modalTitle">
                                Add New Entry
                                <button type="button" class="btn-close" @click="onModelClose">
                                    x
                                </button>
                            </header>

                            <section class="modal-body" id="modalDescription">
                                <div>Select Vehicle type<span>*</span></div>
                                <select v-model="newEntry.type">
                                    <option value="" disabled>select one</option>
                                    <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                                    <option value="LCV">LCV</option>
                                    <option value="Truck/Bus">Truck/Bus</option>
                                    <option value="Heavy vehicle">Heavy vehicle</option>

                                </select>
                                <div>Vehicle Number<span>*</span></div>
                                <input placeholder="enter the number" v-model="newEntry.vehicleNo" />
                                <div>Traiff<span>*</span></div>
                                <input placeholder="Traiff amount" v-model="newEntry.traiff" />
                            </section>
                            <footer class="modal-footer">
                                <button type="button" class="btn-green" @click="onClickNewEntry">
                                    Add Details
                                </button>
                            </footer>
                        </div>
                    </div>
                </transition>
            </template>
        </OperatorEntryModal>
    </div>
</template>
<script>
import './AdminDetailPage.css';
import OperatorEntryModal from './OperatorEntryModal.vue';
import { store } from '../store';

export default {
    name: 'OperatorDetailPage',
    data() {
        return {
            searchInput: '',
            isEntryModelIsVisible: false,
            newEntry: { toll: '', traiff: 0, vehicleNo: '', type: '', time: '' }
        }
    },
    mounted() {
        this.newEntry.toll = this.$route.query.tollLoc;
    },
    watch: {
        // eslint-disable-next-line 
        'newEntry.type': function (newVal, oldVal) {
            const SelectedTollData = store.state.tolls.find(val => val.tollName === this.newEntry.toll);
            const selectedVehicleTypeData = SelectedTollData?.fareDetails.find(val => val.name === newVal);
            this.newEntry.traiff = selectedVehicleTypeData?.single;
        },
        // eslint-disable-next-line
        /* eslint-disable */
        'newEntry.vehicleNo': {
            handler: 'updateVehicleNumber'
        }
    },
    computed: {
        filteredList() {
            return store.state.vehicleEntry.filter((vehicle) => vehicle.vehicleNo.toLowerCase().includes(this.searchInput.toLowerCase()));
        },
        logedin(){
        return this.$store.getters.logedin;
      }
    },
    components: {
        OperatorEntryModal,
    },
    methods: {
        onModelClose() {
            this.isEntryModelIsVisible = false;
        },
        onClickNewEntry() {
            console.log(this.$store.getters.logedin);
            if (this.newEntry.traiff !== 0 && this.newEntry.vehicleNo.length > 0 && this.newEntry.type.length > 0) {
                this.newEntry.time = new Date().toLocaleString('en-US', { timeStyle: 'medium' });
                this.$store.dispatch('makeNewVehicleEntry', this.newEntry);
                this.newEntry = { toll: this.$route.query.tollLoc, traiff: 0, vehicleNo: '', type: '', time: '' };
            }
            else {
                alert('all the fields are mandatory please fill');
            }
        },
        onClickLogOut(){
            this.$store.dispatch('logOut');
            this.$router.push('/')
        },
        fromSeconds(secs) {
            let hours = parseInt(secs / 3600);
            return hours;
        },
        toSeconds(time) {
            let splitTime = time.split(/[: ]/);
            if (splitTime[3].toUpperCase() == 'PM') splitTime[0] = +splitTime[0] + 12;
            return (splitTime[0] * 3600) + (splitTime[1] * 60) + +splitTime[2];
        },
        hoursDiff(sTime, eTime) {
            if (sTime && eTime) {
                let diff = this.toSeconds(eTime) - this.toSeconds(sTime);
                if (diff < 0) diff = 86400 + diff; // adding because diff is negative
                return this.fromSeconds(diff);
            }
        },
        updateVehicleNumber(newVal, oldVal){
            const SelectedTollData = this.$store.getters.tolls.find(val => val.tollName === this.newEntry.toll);
            const selectedVehicleTypeData = SelectedTollData?.fareDetails.find(val => val.name === newVal);
            const enteredVehicle = store.state.vehicleEntry.find((vehicle) => vehicle.vehicleNo === newVal);
            const diff= this.hoursDiff(enteredVehicle?.time, new Date().toLocaleString('en-US', { timeStyle: 'medium' }));
            if(diff >= 1){
                this.newEntry.traiff = selectedVehicleTypeData?.return;
            }
        }
    }
}
</script>