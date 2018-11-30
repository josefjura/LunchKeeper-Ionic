<template>
  <div>
    <div v-if="restaurants.length > 0">
      <restaurant v-for="res in restaurants" :key="res.id" :menus="res.menus" :name="res.name"></restaurant>
    </div>
    <div v-else class="text-xs-center">
      <h2>You have currently no restaurants selected. Try adding some.</h2>
      <router-link class="no-deco" :to="'/search'">
        <v-icon class="hyper">library_add</v-icon>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getMenu, getDetails } from "../services/LunchkeeperApiService";
import Restaurant from "../components/Restaurant";

export default {
  data: () => ({ restaurants: [] }),
  mounted() {
    this.readMenus();
  },
  methods: {
    async readMenus() {
      let rs = this.$store.getters.restaurants;
      for (let res of rs) {
        let name = await getDetails(res.id, res.source);
        let menus = await getMenu(res.id, res.source);
        this.restaurants.push({
          id: res.id,
          name: name.name,
          menus: menus.sections
        });
      }
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

