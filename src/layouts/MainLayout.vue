<template>
  <q-layout view="hHh lpR fFf">
    <!-- Encabezado de la aplicación -->
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="text-white no-decoration"
            >Mi Aplicación</router-link
          >
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Contenido principal donde se mostrarán las páginas -->
    <q-page-container>
      <router-view></router-view>
      <!-- Aquí se renderizan las páginas -->
    </q-page-container>

    <!-- Pie de página de la aplicación -->
    <q-footer>
      <div class="text-center">© 2024 - Mi Aplicación</div>
    </q-footer>
  </q-layout>
</template>

<script setup></script>

<style lang="scss" scoped></style>
