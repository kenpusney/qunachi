<template>
  <div class="home">
    <WhereToEat/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WhereToEat from '@/components/WhereToEat.vue';

@Component({
  components: {
    WhereToEat,
  },
})
export default class Home extends Vue {}
</script>
