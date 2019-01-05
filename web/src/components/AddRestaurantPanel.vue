<template>
  <router-link class="no-deco" :to="'/search'">
    <v-card flat class="mb-3">
      <v-layout class="grey lighten-3">
        <v-flex>
          <v-card-title>
            <div class="headline">Add new subscription</div>
          </v-card-title>
        </v-flex>
        <v-flex class="plus-icon shrink text-xs-center">
          <v-icon x-large>control_point</v-icon>
        </v-flex>
      </v-layout>
    </v-card>
  </router-link>
</template>

<script>
export default {};
</script>

<style>
.plus-icon{
    margin-top: auto;
    margin-bottom: auto;
    margin-right:10px;
}
</style>
