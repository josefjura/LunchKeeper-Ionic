<template>
  <div>
    <ul v-if="!loading">
      <RestaurantSearchResult v-for="result in results" :key="result.id" :name="result.name" :thumb="result.thumb" :id="result.id" :source="result.source" />
    </ul>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="!loading && results.length == 0" class="text-xs-center">
      <h2>Search for restaurants you want to add to your menu list.</h2>
    </div>
  </div>
</template>

<script>
import RestaurantSearchResult from "../components/RestaurantSearchResult";

export default {
  props: ["results", "loading"],
  data: () => ({

  }),
  mounted() { },
  methods: {

  },
  components: {
    RestaurantSearchResult
  }
};
</script>

