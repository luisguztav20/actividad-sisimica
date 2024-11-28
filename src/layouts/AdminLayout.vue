<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row justify-between">
        <img
          src="/volcan-08.gif"
          alt="Logo"
          style="height: 40px; width: auto; vertical-align: middle"
        />
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="mail" />
            </q-item-section>

            <q-item-section class="text-weight-light">{{
              user?.email
            }}</q-item-section>
          </q-item>
        </q-list>
        <q-separator class="q-my-lg" />
        <div class="flex full-width justify-center q-my-lg">
          <q-btn
            color="primary"
            rounded
            icon="logout"
            label="Cerrar sesion"
            @click="logout"
          />
        </div>
      </q-scroll-area>

      <q-img class="absolute-top" style="height: 150px">
        <img src="/src/assets/backUser.jpg" alt="background" />
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="user?.photoURL" alt="Foto del usuario" />
          </q-avatar>
          <div class="text-weight-bold">{{ user?.displayName }}</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { Notify } from "quasar";

const drawer = ref(false);
const authStore = useAuthStore();
const user = authStore.user; // Vincular con el estado del usuario
const router = useRouter();

const logout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      Notify.create({
        message: "Sesion cerrada con exito",
        type: "positive",
        position: "top",
      });
      router.push("/");
    })
    .catch((error) => {
      // An error happened.
    });
};
</script>
