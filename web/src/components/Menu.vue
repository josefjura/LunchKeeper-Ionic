<template>
  <div>

    <h3>{{name}}</h3>
    <div v-for="(dish, index) in dishes" :key="index">
      <v-layout>
        <v-flex class="pr-2">{{dish.name}}</v-flex>
        <v-flex class="shrink">{{dish.price}}</v-flex>
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
</style>
