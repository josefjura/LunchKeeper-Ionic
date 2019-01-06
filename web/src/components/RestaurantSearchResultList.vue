<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap v-if="!loading">
      <!-- <RestaurantSearchResult v-for="result in results" :key="result.id" :name="result.name" :thumb="result.thumb" :id="result.id" :source="result.source" /> -->
      <v-flex xs12 sm6 md4 lg3 xl2 v-for="result in results" :key="result.id">
        <v-card style="height:100%" v-bind:class="{unchecked: !result.checked, checked: result.checked}">
          <v-img :src="result.thumb  || require('../assets/search_default_icon.jpg')" height="120"></v-img>
          <source-icon height="70" :source="result.source"></source-icon>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{result.name}}</h3>
            </div>
          </v-card-title>

          <v-card-actions class="align-end">
            <v-btn
              @click="uncheckRestaurant(result)"
              v-if="result.checked"
              flat
              color="red"
            >Unsubscribe</v-btn>
            <v-btn class="sub-button" @click="checkRestaurant(result)" v-else color="green" flat style="opacity:1">Subscribe</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-if="!loading && results.length == 0" class="text-xs-center">No search results</div>
  </v-container>
</template>

<script>
import SourceIcon from "./SourceIcon";

export default {
  props: ["results", "loading"],
  data: () => ({
    headers: [
      { sortable: false },
      { text: "Source", sortable: true },
      { text: "Name", sortable: true, align: "left" },
      { sortable: false, align: "right" }
    ]
  }),
  methods: {
    checkRestaurant(item) {
      item.checked = true;
      this.$store.commit("addRestaurant", { id: item.id, source: item.source });
    },
    uncheckRestaurant(item) {
      item.checked = false;
      this.$store.commit("removeRestaurant", {
        id: item.id,
        source: item.source
      });
    }
  },
  mounted() {},
  components: {
    SourceIcon
  }
};
</script>

<style>
.source-type img {
  width: 50px;
  height: 50px;
  margin-top: 5px;
}

.background-paint {
  width: 60px;
}

.background-paint img {
  background-color: black;
  width: 50px;
  height: 50px;
  margin-top: 5px;
}

.background-paint span {
  font-size: 20px;
  margin-right: 10px;
}

.unchecked {
  opacity:0.5
}
</style>