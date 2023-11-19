<script setup>
import { defineAsyncComponent } from "vue";

const Navbar = defineAsyncComponent(() =>
  import("@/components/AdminNavbar.vue")
);
import { RouterView } from "vue-router";
</script>
<template>
  <Navbar />
  <RouterView />
</template>
