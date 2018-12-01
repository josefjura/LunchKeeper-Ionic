<template>
  <div v-if="!loading">
    <div v-if="restaurants.length > 0">
      <restaurant v-for="res in restaurants" :name="res.name" :menus="res.menus" :key="res.id" :thumb="res.thumb" />
    </div>
    <div v-else class="text-xs-center">
      <h2>You have currently no restaurants selected. Try adding some.</h2>
      <router-link class="no-deco" :to="'/search'">
        <v-icon class="hyper">library_add</v-icon>
      </router-link>
    </div>
  </div>
  <div v-else class="text-xs-center">
    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
  </div>
</template>

<script>
import { getMenu, getDetails } from "../services/LunchkeeperApiService";
import Restaurant from "../components/Restaurant";

export default {
  data: () => ({
    restaurants: [],
    loading: false
  }),
  mounted() {
    this.readMenus();
  },
  methods: {
    async readMenus() {
      let rs = this.$store.getters.restaurants;
      if (rs == null || rs.length == 0) return;

      this.loading = true;
      for (let res of rs) {
        let name = await getDetails(res.id, res.source);
        let menus = await getMenu(res.id, res.source);
        this.restaurants.push({
          id: res.id,
          name: name.name,
          thumb: name.thumb,
          menus: menus.sections
        });
      }
      this.loading = false;
    }
  },
  components: { Restaurant }
};
</script>

<style>
.hyper {
  font-size: 40px;
  margin-top: 20px;
}

.hyper:hover {
  color: lightskyblue;
  cursor: copy;
}

.no-deco {
  text-decoration: none;
}
</style>

