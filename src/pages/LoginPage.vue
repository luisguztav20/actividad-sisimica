<template>
  <div class="row justify-center">
    <div class="col-10">
      <h1 class="text-h4 text-weight-regular text-center">
        Monitoreo volcanico
      </h1>
      <p class="text-h5 text-weight-light text-center">Iniciar sesión</p>
    </div>

    <div class="form col-10 col-sm-6 col-md-5 col-lg-4 q-gutter-y-lg">
      <q-input outlined v-model="text" label="Correo" :dense="dense" class="" />
      <q-input
        outlined
        type="password"
        v-model="text"
        label="Contraseña"
        :dense="dense"
      />
      <div class="column q-gutter-y-lg">
        <q-btn
          color="primary"
          label="Iniciar sesión"
          @click="onClick"
          rounded
        />
        <q-btn color="btn-secondary" text-color="black">
          <q-avatar size="24px" class="q-mr-sm">
            <img src="/public/icons/google.png" />
          </q-avatar>
          Inicias sesión con google
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup></script>
