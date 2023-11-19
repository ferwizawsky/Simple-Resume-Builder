<script setup>
import { useOption } from "@/stores/option";
useOption().api = import.meta.env.VITE_API;
useOption().url = import.meta.env.VITE_URL;
useOption().name = import.meta.env.VITE_NAME;
</script>

<template>
  <RouterView />
</template>
