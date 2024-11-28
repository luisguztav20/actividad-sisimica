<template>
  <q-page class="content-center">
    <div class="row justify-center q-py-md">
      <q-card
        class="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4 content-center q-pa-md"
        style="border-radius: 15px"
      >
        <q-card-section>
          <h2 class="text-h5">Carga de datos</h2>
          <q-btn
            href="https://www.unixtimestamp.com/"
            label="Convertir fecha a Unix Timestamp"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          />
          <q-form
            class="q-mt-sm"
            ref="form"
            @submit.prevent="onSubmit"
            @reset="onSubmit"
          >
            <div class="column q-gutter-y-lg">
              <q-input
                outlined
                v-model="date"
                type="text"
                label="Fecha en formato Unix Timestamp"
                required
              />
              <q-input
                outlined
                v-model="amplitudModel"
                type="number"
                label="Amplitud"
                required
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
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
import { getAuth } from "firebase/auth";

// Definir variables reactivas
const date = ref(null);
const amplitudModel = ref(null);
const stationModel = ref("");
const axisModel = ref("");
const form = ref(null);

const stationOptions = [{ label: "Estacion Nube", val: "estacion ABC" }]; //estaciones disponibles

const axisOptions = [
  //opciones para mostrar
  { label: "E", val: "e" },
  { label: "H", val: "h" },
  { label: "Z", val: "z" },
];

const convertirFecha = (id) => {
  //convierte la fecha para poder buscarla mas facil
  const fecha = Number(id);
  const fechaConvertir = new Date(fecha);

  // Convertir a una cadena legible
  const fechaFormateada = fechaConvertir.toISOString(); // Formato ISO 8601
  return fechaFormateada;
};

const postData = (eje) => {
  //peticion para enviar los datos se pasa como parametro el eje
  const fechaFormateada = convertirFecha(date.value);
  const amplitud = Number(amplitudModel.value);

  api
    .post(`/volcanes-${eje}`, {
      _id: fechaFormateada,
      estacion: stationModel.value.val,
      valor: amplitud,
    })
    .then((response) => {
      console.log("DATOS GUARDADOS");
      console.log(response.data);

      Notify.create({
        message: `Datos guardados corectamente\nFecha: ${fechaFormateada}`,
        type: "positive",
        position: "top",
      });
      onReset();
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);

      Notify.create({
        type: "negative",
        message: "Los datos no se pudieron guardar",
        position: "top",
      });
      onReset();
    });
};

const onSubmit = () => {
  // Validar el formulario antes de proceder

  postData(axisModel.value.val);
};

onMounted(() => {});

const onReset = () => {
  date.value = null;
  amplitudModel.value = null;
  stationModel.value = null;
  axisModel.value = null;
};
</script>

<style lang="scss" scoped></style>
