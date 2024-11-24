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
              <q-input outlined v-model="date" type="text" label="Fecha" />
              <q-input
                outlined
                v-model="amplitudModel"
                type="number"
                label="Amplitud"
              />
              <q-select
                outlined
                v-model="stationModel"
                :options="stationOptions"
                label="Estacion"
              />
              <q-select
                outlined
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
import { api } from "src/boot/axios";
import { Notify } from "quasar";

// Definir variables reactivas
const date = ref(null);
const amplitudModel = ref(null);
const stationModel = ref("");
const axisModel = ref("");

const stationOptions = [{ label: "Estacion Nube", val: "estacion ABC" }]; //estaciones disponibles

const axisOptions = [
  //opciones para mostrar
  { label: "E", val: "e" },
  { label: "H", val: "h" },
  { label: "Z", val: "z" },
];

// const convertirFecha = (id) => {
//   //convierte la fecha para poder buscarla mas facil
//   const fecha = Number(id);
//   const fechaConvertir = new Date(fecha);

//   // Convertir a una cadena legible
//   const fechaFormateada = fechaConvertir.toISOString(); // Formato ISO 8601
//   return fechaFormateada;
// };

const postData = (eje) => {
  // peticion para enviar los datos se pasa como parametro el eje
  // const fechaFormateada = convertirFecha(date.value);
  const amplitud = Number(amplitudModel.value);

  api
    .post(`/volcanes-${eje}`, {
      _id: date.value,
      estacion: stationModel.value.val,
      valor: amplitud,
    })
    .then((response) => {
      console.log("DATOS GUARDADOS");
      console.log(response.data);

      Notify.create({
        message: `Datos guardados corectamente Fecha: ${date.value} Amplitud: ${amplitud}`,
        color: "positive",
        position: "top",
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);

      Notify.create({
        message: "Los datos no se enviaron",
        color: "red",
        position: "top",
      });
    });
};

const onSubmit = () => {
  postData(axisModel.value.val);

  resetForm();
};

const resetForm = () => {
  date.value = "";
  amplitudModel.value = "";
  // stationModel.value = "";
  // axisModel.value = "";
};
</script>

<style lang="scss" scoped></style>
