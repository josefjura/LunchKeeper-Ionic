<template>
  <div v-if="menus && menus.length > 0">
    <v-card class="mb-3">
      <v-layout  class="blue lighten-3">
        <v-flex class="shrink">
          <v-avatar class="avatar ma-2">
            <img :src="thumb">
          </v-avatar>
        </v-flex>
        <v-flex>
          <v-card-title>
            <div class="headline">{{name}}</div>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-card-text>
        <Menu v-for="(menu, index) in menus" :key="index" :name="menu.name" :dishes="menu.dishes"/>
      </v-card-text>
    </v-card>
  </div>
  <div v-else>
    <v-toolbar class="mb-2" color="pink darken-1" dark flat>
      <v-toolbar-title>Restaurant {{name}} does not have it's daily menu published</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import Menu from "./Menu";

export default {
  props: ["name", "menus", "thumb"],
  mounted() {},
  components: { Menu }
};
</script>

<style>
.align-end {
  align-items: flex-end;
}

.avatar {
  background-color: black;
  width: 64px;
  height: 64px;
}

.flex.shrink {
  flex-grow: 0;
  /*   flex-shrink: 1; */
}
</style>


