<template>
  <div class="row justify-center q-py-md items-center">
    <q-card
      class="my-card col-11 col-sm-auto col-md-auto col-lg-auto col-xl-auto content-center q-pa-md"
    >
      <q-card-section>
        <div class="column q-gutter-y-sm">
          <img
            src="/public/icons/logo-log.png"
            alt="Logo monitoreo volcanico"
            style="width: 50%"
            class="q-mx-auto"
          />
          <h1 class="text-h5 text-weight-regular text-center">
            Monitoreo volcanico
          </h1>
          <p class="text-h6 text-weight-light text-center">Iniciar sesión</p>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="form q-gutter-y-lg">
          <q-input
            outlined
            v-model="text"
            label="Correo"
            :dense="dense"
            class=""
          />
          <q-input
            outlined
            type="password"
            v-model="text"
            label="Contraseña"
            :dense="dense"
          />
          <div class="column q-gutter-y-md">
            <q-btn
              color="primary"
              label="Iniciar sesión"
              @click="onClick"
              rounded
            />
            <q-btn outline color="primary" rounded>
              <q-avatar size="20px" class="q-mr-sm">
                <img src="/public/icons/google.png" />
              </q-avatar>
              Iniciar con google
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup></script>
