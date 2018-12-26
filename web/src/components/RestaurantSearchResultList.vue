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
        select-all
      >
        <template slot="items" slot-scope="props">
          <tr @click="checkRestaurant(props.item)">
            <td>
              <v-checkbox primary hide-details :input-value="props.item.checked"></v-checkbox>
            </td>
            <td class="source-type">
              <source-icon :source="props.item.source"></source-icon>
            </td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="background-paint">
              <img :src="props.item.thumb || require('../assets/search_default_icon.jpg')">
            </td>
          </tr>
        </template>
        <template slot="no-data">
          <h2 class="text-xs-center">Search for restaurants you want to subscribe to.</h2>
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
      item.checked = !item.checked;
      var operation = item.checked ? "addRestaurant" : "removeRestaurant";
      this.$store.commit(operation, { id: item.id, source: item.source });
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
</style>


