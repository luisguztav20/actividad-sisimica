<template>
  <q-page>
    <div class="row justify-center q-py-md items-center">
      <q-card
        class="my-card col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 content-center q-pa-md"
      >
        <q-card-section>
          <h2 class="text-h5">Carga de datos</h2>
          <div class="column q-gutter-y-lg">
            <q-input
              v-model="date"
              type="date"
              label="Fecha"
              stack-label
              :dense="dense"
            />
            <q-select
              v-model="model"
              :options="optionsSelect"
              label="Estacion"
            />
            <q-input v-model="time" type="time" label="Hora" />
            <q-select v-model="model" :options="optionsEje" label="Eje" />
            <q-btn color="primary" label="Guardar datos" rounded />
            <q-linear-progress
              dark
              rounded
              indeterminate
              color="green"
              class="q-mt-xl"
            />
          </div>
        </q-card-section>
        <q-card-section> </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
const optionsSelect = ["Estacion A", "Estacion B", "Estacion C"];
const optionsEje = ["X", "Y", "Z"];
</script>

<style lang="scss" scoped></style>
