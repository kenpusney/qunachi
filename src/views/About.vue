<template>
  <div class="about">
    <p>{{message.ABOUT}}</p>
    <p>
    <a href="https://jinshuju.net/f/mCk0CA">{{message.SEND_US_FEEDBACK}}</a>
    </p>
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
