<template>
  <q-layout view="hHh lpR fFf">
    <q-header style="box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.75);">
      <q-toolbar>
      <q-toolbar-title>
        <router-link to="/" class="text-dark no-decoration q-px-xl">
        <img src="/volcan-08.gif" alt="Logo" style="height: 40px; width: auto; vertical-align: middle;">
        </router-link>
      </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-primary">
      <router-view></router-view>
    </q-page-container>

    <q-footer class="bg-secondary">
      <div class="text-center text-black">© {{ year }} - Mi Aplicación</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped></style>
