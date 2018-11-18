<template>
  <div class="manage">
    <restaurant-search-result-list :results="results" :loading="loading" />
  </div>
</template>

<script>
import { getDetails } from "../services/LunchkeeperApiService";

import RestaurantSearchResultList from "../components/RestaurantSearchResultList";

export default {
  data: () => ({
    results: [],
    loading: false
  }),
  mounted() {
    this.loadRestaurants();
  },
  methods: {
    async loadRestaurants() {
      this.loading = true;
      var items = this.$store.getters.restaurants;
      for (const item of items) {
        var result = await getDetails(item.id, item.source);
        this.results.push(result);
      }
      this.loading = false;
    }
  },
  components: { RestaurantSearchResultList }
};
</script>
