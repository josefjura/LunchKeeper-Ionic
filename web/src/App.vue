<template>
  <v-app id="app">
    <v-toolbar>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>LunchKeeper</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat :to="'/'">Menus</v-btn>
            <v-btn flat :to="'/search'">Search</v-btn>
            <v-btn flat :to="'/manage'">Manage</v-btn>
            <v-btn flat :to="'/settings'">Settings</v-btn>
          </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
</style>
