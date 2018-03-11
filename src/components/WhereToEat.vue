<template>
  <div class="wheretoeat">
    <h1>{{ message.WHERE_TO_EAT }}</h1>
    <ul >
      <li v-for="place in places" :key="place.name">
        {{place.name}}<button v-on:click="removePlace(place.name)" class="delete">x</button>
      </li>
    </ul>
    <button v-on:click="clear()" v-show="places.length > 0">{{message.CLEAR_DATA}}</button>
    <p/>
    <input :placeholder="message.HINT_ADD_PLACE" type="text" v-model="place">&nbsp;
    <button type="submit" v-on:click="addPlace(place)">{{message.ADD_BUTTON}}</button>
    <p/>
    <button v-on:click="showMeQunachi()">{{message.SHOW_ME_WHERE_TO_GO}}</button>
    <p/>
    <h3>{{message.VISIT_HISTORY}}<small><button v-on:click="clearHistory()">{{message.CLEAR_HISTORY}}</button></small></h3>
    <dl>
      <div v-for="hist in history" :key="hist.time">
        <dt>{{hist.time.toLocaleString()}} &nbsp;<button v-on:click="removeHistory(hist.time)" class="delete">x</button></dt>
        <dd>{{message.YOU_WENT_TO}}<strong>{{hist.place}}</strong></dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import Place from '@/model/Place.ts';
import VisitHistory from '@/model/VisitHistory.ts';
import Message from '@/model/Message.ts';

@Component
export default class WhereToEat extends Vue {
  @Prop() private places: Place[] = [];
  @Prop() private place: string = '';
  @Prop() private history: VisitHistory[] = [];
  @Prop() private message = Message;

  private mounted() {
    const storedPlaces = localStorage.getItem('places');
    const storedHistory = localStorage.getItem('history');

    this.places = storedPlaces ? JSON.parse(storedPlaces) : [];
    this.history = storedHistory ? this.parseHistory(storedHistory) : [];
  }

  private parseHistory(storedHistory: string) {
    const storedHistoryObj: Array<{place: string, time: string}> = JSON.parse(storedHistory);
    return storedHistoryObj.map((hist) =>
            new VisitHistory(hist.place, new Date(hist.time)));
  }

  private addPlace(place: string) {
    if (place && this.places.every((p) => p.name !== place)) {
      this.places.push(new Place(place));
    }

    localStorage.setItem('places', JSON.stringify(this.places));
  }

  private showMeQunachi() {
    const place = this.places[Math.floor(Math.random() * this.places.length)];
    if (!place) {
      return alert(Message.NOTHING_HERE_YET);
    }
    const confirmed = confirm(`${this.message.SUGGEST_TO_GO}${place.name}`);
    if (confirmed) {
      this.history.unshift(new VisitHistory(place.name, new Date()));
      localStorage.setItem('history', JSON.stringify(this.history));
    }
  }

  private clear() {
    this.places = [];
    localStorage.setItem('places', '[]');
  }

  private clearHistory() {
    this.history = [];
    localStorage.setItem('history', '[]');
  }

  private removeHistory(time: Date) {
    this.history = this.history.filter((hist) => hist.time !== time);
    localStorage.setItem('history', JSON.stringify(this.history));
  }

  private removePlace(place: string) {
    this.places = this.places.filter((p) => p.name !== place);
    localStorage.setItem('places', JSON.stringify(this.places));
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

button.delete {
  color: red;
  border: none;
}
</style>
