<template>
  <div class="about">
    <v-text-field label="Search" 
        solo 
        clearable 
        single-line 
        @click:append-outer="search" 
        @keyup.enter="search"
        append-outer-icon="search"
        v-model="searchTerm"></v-text-field>
    <restaurant-search-result-list :results="results" :loading="loading" />
  </div>
</template>

<script>
import { search } from "../services/LunchkeeperApiService";

import RestaurantSearchResultList from "../components/RestaurantSearchResultList";

export default {
  data: () => ({
    results: [],
    searchTerm: "",
    loading: false
  }),
  mounted() {},
  methods: {
    async search() {
      this.searchTerm = "";
      this.results = [];
      this.loading = true;
      this.results = await search(this.searchTerm);
      this.loading = false;
    }
  },
  components: { RestaurantSearchResultList }
};
</script>