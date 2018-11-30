<template >
  <v-app id="app">
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title dark>LunchKeeper</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item, index) in items" :key="index" flat :to="item.to">{{item.name}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer temporary v-model="drawer" light absolute>
      <v-toolbar flat class="transparent">
        <v-list>
          <v-list-tile avatar>
            <!-- <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>-->
            <v-list-tile-content>
              <v-list-tile-title>LunchKeeper</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-divider></v-divider>
        <v-list-tile v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
</style>


<script>
export default {
  data: () => ({
    items: [
      { name: "Menus", to: "/", icon: "restaurant" },
      { name: "Search", to: "/search", icon: "search" },
      { name: "Manage", to: "/manage", icon: "list" },
      { name: "Settings", to: "/settings", icon: "settings" }
    ],
    drawer: true,
    clipped: false
  })
};
</script>


// div#app
//   nav
//     v-toolbar.hidden-sm-and-down
//       v-toolbar-title
//         router-link.nav-item(to="/") MySite
//       v-spacer
//       v-toolbar-items
//         v-btn(flat)
//           router-link.nav-item(to="/about") About
//         v-btn(flat)
//           router-link.nav-item(to="/contact") Contact

//     div.hidden-md-and-up
//       v-expansion-panel
//         v-expansion-panel-content
//           div(slot="header")
//             router-link.nav-item(to="/") MySite
//           v-card
//             router-link.nav-item(to="/about")
//               v-card-text About
//           v-card
//               router-link.nav-item(to="/Contact")
//                 v-card-text Contact