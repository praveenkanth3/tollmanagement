<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          Admin login
          <button
            type="button"
            class="btn-close"
            @click="onCloseModel"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <div>Admin Id</div>
          <input v-bind:value="adminLogin.id" @input="onChangeAdminId($event.target.value)"/>
          <div>Password</div>
          <input v-bind:value="adminLogin.password" @input="onChangeAdminPassword($event.target.value)"/>
        </section>

        <footer class="modal-footer">
          <button
           type="button"
           class="btn-green"
           @click="onSubmitAdminLogin"
          >
            Login
          </button>
          <button
            type="button"
            class="btn-green"
            @click="onCloseModel"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import './Popup.css';
export default {
    name: 'AdminPopup',
    props:{
        isAdminPopupVisible: Boolean,
        onCloseModel: Function,
        adminLogin: Object,
        onChangeAdminId: Function,
        onSubmitAdminLogin: Function,
        onChangeAdminPassword: Function,
    }
}
</script>