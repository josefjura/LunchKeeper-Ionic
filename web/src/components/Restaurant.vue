<template>
     <v-data-iterator
      :items="menus"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
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
        <v-toolbar-title>{{name}}</v-toolbar-title>
      </v-toolbar>

      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title class="subheading font-weight-bold">{{ props.item.name }}</v-card-title>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Calories:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>

      </v-flex>
    </v-data-iterator>
</template>

<script>
export default {
    props: ['name', 'menus']
}
</script>

