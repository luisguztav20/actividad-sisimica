<template>
  <q-page :style-fn="myTweak" padding>
    <div class="row justify-center q-gutter-y-lg">
      <h1
        class="text-h5 text-weight-bold col-11 col-md-10 text-primary q-mt-xl q-ma-none"
      >
        Mostrar datos
      </h1>

      <q-form
        @submit="onSubmit"
        class="row col-11 col-md-10 justify-between q-gutter-y-md"
      >
        <div class="row col-12 col-md-8 q-gutter-y-md">
          <q-input
            outlined
            v-model="fechaInicio"
            type="date"
            label="Fecha inicial"
            class="col-12 col-md-6 q-pr-sm"
          />

          <q-input
            outlined
            v-model="horaInicio"
            type="time"
            label="Hora"
            class="col-12 col-md-6 q-pr-sm"
          />
          <q-input
            outlined
            v-model="fechaFinal"
            type="date"
            label="Fecha final"
            class="col-12 col-md-6 q-pr-sm"
          />
          <q-input
            outlined
            v-model="horaFinal"
            type="time"
            label="Hora"
            class="col-12 col-md-6 q-pr-sm"
          />
        </div>
        <div class="row col-12 col-md-4 q-gutter-y-md">
          <q-select
            outlined
            v-model="estacionSeleccionada"
            :options="estacion"
            label="Estacion"
            class="col-12 col-md-12"
          />

          <q-btn
            color="primary"
            icon="search"
            label="consultar"
            @click="onSubmit"
            rounded
            class="col-12 col-md-12 q-pa-md"
          />
        </div>
      </q-form>
    </div>

    <div class="q-my-lg">
      <p>DATA EJE H</p>
      <div v-for="dato in dataH" :key="dato" class="q-my-lg">
        <p>Amplitud: {{ dato.valor }} fecha: {{ dato._id }}</p>
      </div>
    </div>

    <div class="q-my-lg">
      <p>DATA EJE Z</p>
      <div v-for="dato in dataZ" :key="dato" class="q-my-lg">
        <p>Amplitud: {{ dato.valor }} fecha: {{ dato._id }}</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "../boot/axios";

const estacionSeleccionada = ref(null);
const fechaInicio = ref(null);
const fechaFinal = ref(null);
const horaInicio = ref(null);
const horaFinal = ref(null);
const estacion = [{ label: "NUBE", value: "nube" }];
const data = ref([]);
const dataH = ref([]);
const dataZ = ref([]);
const dataE = ref([]);
const valoresZ = ref([]);

const onSubmit = () => {
  getData("z");

  amplitudes();
};

const convertirFechas = () => {
  const fechaHoraInicial = `${fechaInicio.value}T${horaInicio.value}:00.000Z`;
  const fechaHoraFinal = `${fechaFinal.value}T${horaFinal.value}:00.000Z`;

  return [fechaHoraInicial, fechaHoraFinal];
};

const getData = (eje) => {
  const [fechaHoraInicial, fechaHoraFinal] = convertirFechas();
  api
    .post(`/volcanes-${eje}/_find`, {
      selector: {
        $and: [
          { _id: { $gte: fechaHoraInicial } },
          { _id: { $lte: fechaHoraFinal } },
        ],
        estacion: "estacion ABC", // Ajusta el valor según lo que espera el backend
      },
    })
    .then((response) => {
      data.value = response.data;
      console.log(data.value);

      if (eje === "h") {
        data.value.docs.forEach((Element) => dataH.value.push(Element));
      }

      if (eje === "z") {
        data.value.docs.forEach((Element) => dataZ.value.push(Element));
        valoresZ.value = dataZ.value.filter((Element) =>
          valoresZ.value.push(Element.valor)
        );

        console.log(valoresZ.value);
      }
      if (eje === "e") {
        data.value.docs.forEach((Element) => dataE.value.push(Element));
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
};
onMounted(() => {});

const amplitudes = () => {
  return dataZ.value.forEach((dato) => console.log(dato.valor));
};
</script>

<style lang="scss" scoped></style>
