<template>
  <div>

    <h3 class="pa-1">{{name}}</h3>
    <div class="menu-row" v-for="(dish, index) in dishes" :key="index">
      <v-layout>
        <v-flex class="px-2 py-1">{{dish.name}}</v-flex>
        <v-flex class="pr-1 shrink">{{dish.price}}</v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "dishes"]
};
</script>

<style>
.flex.shrink {
  flex-grow: 0;
  /*   flex-shrink: 1; */
}

.alternate-base .menu-row:nth-child(odd) {
    background-color: #eee;
}
</style>
