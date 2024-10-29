<template>
  <q-page class="content-center">
    <div class="row justify-center q-py-md">
      <q-card
        class="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 content-center q-pa-md"
      >
        <q-card-section>
          <h2 class="text-h5">Carga de datos</h2>
          <q-form @submit="onSubmit">
            <div class="column q-gutter-y-lg">
              <q-input
                v-model="date"
                type="date"
                label="Fecha"
                stack-label
                :dense="dense"
              />
              <q-select
                v-model="stationModel"
                :options="stationOptions"
                label="Estacion"
                stack-label
                :dense="dense"
              />
              <q-input v-model="time" type="time" label="Hora" />
              <q-select
                v-model="axisModel"
                :options="axisOptions"
                label="Eje"
              />
              <q-btn
                type="submit"
                color="primary"
                label="Guardar datos"
                rounded
              />
              <q-linear-progress
                dark
                rounded
                indeterminate
                color="green"
                class="q-mt-xl"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// Definir variables reactivas
const date = ref("");
const time = ref("");
const stationModel = ref("");
const axisModel = ref("");
const stationOptions = [
  { label: "Estacion A", value: "estacionA" },
  { label: "Estacion B", value: "estacionB" },
  { label: "Estacion C", value: "estacionC" },
];
const axisOptions = [
  { label: "X", value: "ejeX" },
  { label: "Y", value: "ejeY" },
  { label: "Z", value: "ejeZ" },
];
const onSubmit = () => {
  // Handle form submission
  console.log("Form submitted");
  console.log("Fecha:", date.value);
  console.log("Hora:", time.value);
  console.log("Estacion:", stationModel.value);
  console.log("Eje:", axisModel.value);

  resetForm();
};

const resetForm = () => {
  date.value = "";
  time.value = "";
  stationModel.value = "";
  axisModel.value = "";
};
</script>

<style lang="scss" scoped></style>
