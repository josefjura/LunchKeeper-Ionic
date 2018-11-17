<template>
  <div>
    <restaurant v-for="res in restaurants" :key="res.id" :menus="res.menus" :name="res.name"></restaurant>
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
          id : res.id,
          name: name.name,
          menus: menus.sections
        });
      }
    }
  },
  components: { Restaurant }
};
</script>
