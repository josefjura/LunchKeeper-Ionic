<template>
     <v-data-iterator v-if="menus && menus.length > 0"
      :items="menus"
      hide-actions
      row
      wrap
    >
      <v-toolbar
        slot="header"
        class="mb-2"
        color="indigo darken-5"
        dark
        flat
      >
        <v-toolbar-title >{{name}}</v-toolbar-title>
      </v-toolbar>

      <v-flex
        slot="item"
        slot-scope="props"
        style="padding-bottom: 20px;"
      >
        <v-card>
          <v-card-title v-if="props.item.name && props.item.name.length > 0" class="subheading font-weight-bold">{{ props.item.name }}</v-card-title>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-tile v-for="(dish, index) in props.item.dishes" :key="index">
              <v-list-tile-content>{{ dish.name }}</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ dish.price }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>

      </v-flex>
    </v-data-iterator>
    <div v-else>
            <v-toolbar
        class="mb-2"
        color="pink"
        dark
        flat
      >
        <v-toolbar-title >Restaurant {{name}} does not have it's daily menu published</v-toolbar-title>
      </v-toolbar>
       
    </div>
</template>

<script>
export default {
  props: ["name", "menus"],
  mounted() {}
};
</script>

