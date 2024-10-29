<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
      <q-toolbar-title>
        <router-link to="/" class="text-dark no-decoration q-px-xl">
        <img src="/volcan-08.gif" alt="Logo" style="height: 40px; width: auto; vertical-align: middle;">
        </router-link>
      </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-footer>
      <div class="text-center">© {{ year }} - Mi Aplicación</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped></style>
