<template>
  <img :src="this.src">
</template>

<script>

export default {
  props: ["source"],
  computed: {
    src: function() {
      if (this.source == 0) {
        return "https://b.zmtcdn.com/images/logo/square_zomato_logo_new-2.svg";
      }
      if (this.source == 1) {        
        return require("../assets/search_default_icon.jpg");
      }
    }
  }
};
</script>

<style>
</style>