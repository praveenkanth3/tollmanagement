<template>
    <div>
        <slot name="addTollContent"></slot>
    </div>
  </template>
  
  <script>
  import '../styles/Popup.css';
  
  export default {
      name: 'AddNewTollModel',
  }
  </script>