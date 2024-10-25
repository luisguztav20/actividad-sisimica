<template>
  <q-page class="content-center">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 content-center text-grey-4">
        <div
          class="text-center presentation q-mx-auto q-pa-lg"
          style="max-width: 600px"
        >
          <img
            src="/volcan-08.gif"
            alt="Logo monitoreo volcanico"
            style="width: auto; height: 150px"
            class="q-mx-auto q-mb-md"
          />
          <h1 class="text-h4 text-weight-bold text-secondary">
            App de Monitoreo Volcánico
          </h1>
          <p class="text-body1">
            Inicia sesión para acceder a la plataforma
          </p>
        </div>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-6 content-center">
        <div class="q-mx-auto q-pa-lg" style="max-width: 600px">
          <q-form
            @submit="onSubmit"
            class="form q-gutter-y-md q-pa-md bg-secondary"
            style="border: solid 1px #ccc; border-radius: 5px"
          >
            <h4 class="text-center">Formulario de registro</h4>
            <q-input
              v-model="email"
              label="Correo"
              type="email"
              required
              style="color: aliceblue;"
            />

            <q-input
              type="password"
              v-model="password"
              label="Contraseña"
              required
            />

            <div class="column q-gutter-y-md">
              <q-btn
                color="primary"
                label="Iniciar sesión"
                type="submit"
                rounded
              />

              <q-btn outline color="primary" rounded>
                <q-avatar size="20px" class="q-mr-sm">
                  <img src="/icons/google.png" />
                </q-avatar>
                Iniciar con Google
              </q-btn>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// Definir variables reactivas
const email = ref("");
const password = ref("");

const onSubmit = () => {
  console.log("Correo:", email.value);
  console.log("Contraseña:", password.value);
};
</script>

<style lang="scss" scoped></style>
