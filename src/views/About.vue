<template>
  <div class="about">
    <p>{{message.ABOUT}}</p>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Message from '@/model/Message.ts';

@Component
export default class About extends Vue {
  @Prop() private message = Message;
}
</script>
