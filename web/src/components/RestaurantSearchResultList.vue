<template>
  <div>
    <ul v-if="!loading">
      <!-- <RestaurantSearchResult v-for="result in results" :key="result.id" :name="result.name" :thumb="result.thumb" :id="result.id" :source="result.source" /> -->
      <v-data-table
        hide-headers
        hide-actions
        :headers="headers"
        :items="results"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="source-type">
            <source-icon :source="props.item.source" ></source-icon>
          </td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="background-paint">
            <img :src="props.item.thumb || require('../assets/search_default_icon.jpg')">
          </td>
        </template>
        <template slot="no-data">
          <h2 class="text-xs-center">Search for restaurants you want to add to your menu list.</h2>
        </template>
      </v-data-table>
    </ul>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-if="!loading && results.length == 0" class="text-xs-center"></div>
  </div>
</template>

<script>
import SourceIcon from './SourceIcon' 

export default {
  props: ["results", "loading"],
  data: () => ({
    headers: [
      { text: "Source", sortable: true },
      { text: "Name", sortable: true, align: "left" },
      { sortable: false, align: "right", width: "50px" }
    ]
  }),
  mounted() {},
  methods: {},
  components: {
    SourceIcon
  }
};
</script>

<style>

.source-type img{
  width:50px;
  height:50px;
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
</style>


