<template>
  <v-list-tile avatar class="restaurant-tile">
    <v-list-tile-action>
      <v-icon v-if="checked" color="pink">done</v-icon>
    </v-list-tile-action>
    <v-list-tile-avatar class="background-paint">
      <img :src="thumb || require('../assets/search_default_icon.jpg')">
    </v-list-tile-avatar>
    <v-list-tile-content @click="checkRestaurant(id, source)">
      <v-list-tile-title>{{name}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: ["id", "name", "thumb", "source"],
  data: () => ({
    checked: false
  }),
  mounted() {
    this.checked = this.$store.getters.restaurants.some(
      x => x.id == this.id && x.source == this.source
    );
  },
  methods: {
    checkRestaurant(id, source) {
      this.checked = !this.checked;
      var operation = this.checked ? "addRestaurant" : "removeRestaurant";
      this.$store.commit(operation, { id, source });
    }
  }
};
</script>

<style>
.background-paint img {
  background-color: black;
}

.restaurant-tile {
  cursor: pointer;
}
</style>
