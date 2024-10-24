<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="text-white no-decoration"
            >Mi Aplicación</router-link
          >
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-primary">
      <router-view></router-view>
    </q-page-container>

    <q-footer class="bg-info">
      <div class="text-center">© {{ year }} - Mi Aplicación</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped></style>
