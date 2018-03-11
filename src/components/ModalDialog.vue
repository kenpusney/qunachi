<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{header || "Notice!"}}</h3>
          </div>
          <div class="modal-body" v-html="body || 'Are you sure?' ">
          </div>

          <div class="modal-footer">
              <button class="modal-default-button" @click="$emit('ok')">
                {{textOk || "OK"}}
              </button>
              <button v-if="textCancel != null" class="modal-default-button" @click="$emit('cancel')">
                {{textCancel}}
              </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">

import { Component, Prop, Vue, Provide } from 'vue-property-decorator';

@Component
export default class ModalDialog extends Vue {
  @Prop() private body?: string;
  @Prop() private header?: string;
  @Prop() private textOk = 'OK';
  @Prop() private textCancel?: string;
}
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: left;
}

.modal-container {
  width: 15em;
  margin: 0 auto;
  padding: 1em 1.5em;
  background-color: #fff;
  border-radius: 0.1em;
  box-shadow: 0 0.1em 0.4em rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 1em 0;
}

.modal-footer {
    margin: 1em 0;
    padding: 1em 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

