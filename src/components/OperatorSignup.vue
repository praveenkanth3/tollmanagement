<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle">
          Sign Up
          <button type="button" class="btn-close" @click="() => onCloseModel(false)">
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <div>Login Id</div>
          <input v-model="id" />
          <div>Password</div>
          <input v-model="password" />
        </section>

        <footer class="modal-footer">
          <button type="button" class="btn-green" @click="onClickSignUp">
            Sign Up
          </button>
          <button type="button" class="btn-green" @click="onCloseModel">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
  
<script>
import '../styles/Popup.css';
export default {
  name: 'OperatorSignUp',
  props: {
    onCloseModel: Function,
  },
  data() {
    return {
      id: '',
      password: ''
    }
  },
  methods: {
    onClickSignUp() {
      if (this.id !== '' && (this.password !== '' && this.password.length >= 8)) {
        let userFromLocalStorage = JSON.parse(localStorage.getItem(this.id.toLowerCase()));
        if (userFromLocalStorage) {
          alert('user already present');
        }
        else {
          localStorage.setItem(this.id, JSON.stringify({ id: this.id, password: this.password }))
          alert('successfully registered');
          this.id = '';
          this.password = '';
          this.onCloseModel();
        }
      }
      else {
        alert('id or password are not valid');
      }
    }
  },
}
</script>