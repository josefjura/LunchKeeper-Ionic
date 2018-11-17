<template>
  <div class="manage">
    <restaurant-search-result-list :results="results" :loading="loading" />
  </div>
</template>

<script>
import { search, getDetails } from "../services/LunchkeeperApiService";

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
        var items = this.$store.getters.restaurants;
        for (var i in items){
          var item = items[i];
          var result = await getDetails(item.id, item.source);
          this.results.push(result);
        }
    }
  },
  components: { RestaurantSearchResultList }
};
</script>
