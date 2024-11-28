<template>
  <q-page :style-fn="myTweak" padding>
    <div class="row justify-center q-gutter-y-sm">
      <div class="col-11 col-md-10 text-primary">
        <h1 class="text-h5 text-weight-bold q-ma-none">Mostrar grafico FFT</h1>
        <p>Ingres un rango de fecha para consultar</p>
      </div>

      <q-form
        ref="form"
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="row col-11 col-md-10 justify-between q-gutter-y-md"
      >
        <div class="row col-12 col-md-8 q-gutter-y-md">
          <q-input
            outlined
            v-model="fechaInicio"
            type="date"
            label="Fecha inicial"
            class="col-12 col-md-6 q-pr-sm"
            :rules="[(val) => (val ? true : 'La fecha inicial es obligatoria')]"
          />

          <q-input
            outlined
            v-model="horaInicio"
            type="time"
            label="Hora"
            class="col-12 col-md-6 q-pr-sm"
            :rules="[(val) => (val ? true : 'La hora inicial es obligatoria')]"
          />
          <q-input
            outlined
            v-model="fechaFinal"
            type="date"
            label="Fecha final"
            class="col-12 col-md-6 q-pr-sm"
            :rules="[(val) => (val ? true : 'La fecha final es obligatoria')]"
          />
          <q-input
            outlined
            v-model="horaFinal"
            type="time"
            label="Hora"
            class="col-12 col-md-6 q-pr-sm"
            :rules="[(val) => (val ? true : 'La hora final es obligatoria')]"
          />
        </div>
        <div class="row col-12 col-md-4 q-gutter-y-md justify-start">
          <q-select
            outlined
            v-model="estacionSeleccionada"
            :options="estacion"
            label="Estacion"
            class="col-12 col-md-12"
            :rules="[(val) => (val ? true : 'Debe seleccionar una estacion')]"
          />

          <q-btn
            color="primary"
            icon="search"
            label="consultar"
            type="submit"
            rounded
            class="col-6 col-md-7 q-mb-lg"
          />
          <q-btn
            color="red"
            rounded
            icon="cleaning_services"
            label="Limpiar"
            type="reset"
            class="q-mb-lg q-ml-md"
          />
        </div>
      </q-form>
    </div>

    <div v-if="mostrarGrafico" class="row justify-center q-pt-xl">
      <q-card class="my-card col-11 col-md-10" style="border-radius: 15px">
        <h2 class="text-h5 text-center text-primary text-weight-bolder">
          Grafico de amplitudes (Transformada rápida de Fourier)
        </h2>
        <h3 class="text-h6 text-center text-primary">
          De: {{ fechaInicio }}:{{ horaInicio }}, Hasta: {{ fechaFinal }}:{{
            horaFinal
          }}
        </h3>
        <q-card-section>
          <q-scroll-area style="height: 400px">
            <div class="row no-wrap">
              <AirQualityChart :data="magnitudes" />
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "../boot/axios";
import FFT from "fft.js";
import AirQualityChart from "src/components/AirQualityChart.vue";
import { Notify } from "quasar";

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
const valoresH = ref([]);
const valoresE = ref([]);
let resultadosH = []; //no se si es necesario en estos casos hacer reactivos estos arrays
let relacionHV = []; // lo mismo que el de arriba
const magnitudes = ref([]);
const mostrarGrafico = ref(false);

const alertNotify = (message) => {
  Notify.create({
    message: message,
    color: "orange",
    position: "top",
  });
};

const onSubmit = () => {
  if (magnitudes.value.length > 0) {
    mostrarGrafico.value = false;
    alertNotify("Primero debe limpar los datos existentes");
  } else {
    getData("z"); //hace la peticon al backend con las fechas y horas de los inputs y recibe como parametro el eje a consultar4
    getData("e");
    getData("h");
  }
};

const convertirFechas = () => {
  // le da formatos a las fechas para consultarlas
  const fechaHoraInicial = `${fechaInicio.value}T${horaInicio.value}:00.000Z`;
  const fechaHoraFinal = `${fechaFinal.value}T${horaFinal.value}:00.000Z`;

  return [fechaHoraInicial, fechaHoraFinal];
};

const getData = (eje) => {
  const [fechaHoraInicial, fechaHoraFinal] = convertirFechas(); //trae las fechas con formato para pasarlas al body
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
        data.value.docs.forEach((Element) => dataH.value.push(Element)); //asigna el valor al eje H
        valoresH.value = dataH.value.map((elemento) => ({
          amplitud: elemento.valor,
          fecha: elemento._id,
        }));
      }

      if (eje === "z") {
        data.value.docs.forEach((Element) => dataZ.value.push(Element)); //asigna el valor al eje Z
        // Aqui debesmos extraer los valores de cada dato
        valoresZ.value = dataZ.value.map((elemento) => ({
          amplitud: elemento.valor,
          fecha: elemento._id,
        }));
      }
      if (eje === "e") {
        data.value.docs.forEach((Element) => dataE.value.push(Element)); //asigna el valor al eje E
        valoresE.value = dataE.value.map((elemento) => ({
          amplitud: elemento.valor,
          fecha: elemento._id,
        }));
      }
      if (
        valoresE.value.length === 0 &&
        valoresH.value.length === 0 &&
        valoresZ.value.length === 0
      ) {
        alertNotify("No existen mediciones en el rango de fecha ingresado");
      } else {
        mostrarGrafico.value = true;
      }

      if (
        //este if lo puse aqui por que me permitia ya acceder a los arrays (cuando ya tenian datos)
        valoresE.value.length === valoresH.value.length &&
        valoresE.value.length > 0 &&
        valoresH.value.length > 0
      ) {
        calcularH(); // y use la funcion calcularH para sacar la raiz cuadrada de la suma de los cuadrados de E y H(esta no es de la relacion H/V)
        //llena el array calculosH(esta si es de la relacion H/V)
      }
      if (
        // esto aqui comprueba que valoresZ ya tenga datos para poder sacar la relacion H/V(este procedimiento requiere haber ejecutado la funcion calcularH antes de forma correcta)
        valoresZ.value.length === resultadosH.length &&
        valoresZ.value.length > 0 &&
        resultadosH.length > 0
      ) {
        magnitudes.value = calcularhv(); //es esta se calcula la relacion H/V (H de la relacion) y llena el array relacionHV
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      Notify.create({
        message: "Ocurrio un error al mostrar los datos",
        color: "red",
        position: "top",
      });
    });
};
onMounted(() => {});

const calcularH = () => {
  if (valoresH.value.length === 0 || valoresE.value.length === 0) {
    console.error("Los arrays valoresH o valoresE están vacíos");
    return;
  }
  let r = 0;
  for (let i = 0; i < valoresH.value.length; i++) {
    const h = Number(valoresH.value[i].amplitud);
    const e = Number(valoresE.value[i].amplitud);
    r = Math.sqrt(h ** 2 + e ** 2); //r es igual al H de la relacion H/V
    resultadosH.push(r);
  }
  console.log("resultados r:", resultadosH);
};

const calcularhv = () => {
  const magnitudes = [];
  const relacionHV = [];
  let hv = 0;
  for (let i = 0; i < valoresZ.value.length; i++) {
    const h = resultadosH[i];
    const z = Number(valoresZ.value[i].amplitud);
    if (z != 0) {
      //teniendo en cuenta que no se vayan a dar divisiones entre 0, por lo tanto si ese caso se da, el array de relacionHV nuevo tendra un tamaño menor al de los valores H,E y Z
      hv = h / z;
      relacionHV.push(hv);
    }
  }

  //para utilizar agregaremos 0 al array hasta llegar a la potencias de 2 mas cercana
  let potencia = 0;
  for (let i = 0; i < valoresZ.value.length; i++) {
    if (relacionHV.length <= 2 ** i) {
      potencia = 2 ** i;
      break;
    }
  }
  //Calcular la transformada se hizo en la misma funcion en la cual se hicieron los calculos de la relacion H/V aprovechando que esos datos se utilizan
  console.log("relaciones H/V", relacionHV);
  const hvTamanioPotencia = new Array(potencia).fill(0);
  relacionHV.forEach((value, index) => (hvTamanioPotencia[index] = value));
  const fft = new FFT(hvTamanioPotencia.length);
  let output = new Array(hvTamanioPotencia.length);
  fft.realTransform(output, hvTamanioPotencia);
  console.log("datos Transformada:", typeof output);
  //segun en el vector output se dan los valores reales en los pares y imaginarios en los impares
  for (let i = 0; i < output.length; i += 2) {
    magnitudes.push(Math.sqrt(output[i] ** 2 + output[i + 1] ** 2));
  }
  output = {};

  return magnitudes;
};

const onReset = () => {
  fechaInicio.value = null;
  horaInicio.value = null;
  fechaFinal.value = null;
  horaFinal.value = null;
  estacionSeleccionada.value = null;
  mostrarGrafico.value = false;
  resetData();
};

const resetData = () => {
  dataE.value = [];
  dataH.value = [];
  dataZ.value = [];
  valoresE.value = [];
  valoresH.value = [];
  valoresZ.value = [];
  resultadosH = [];
  relacionHV = [];
  magnitudes.value = [];
};
</script>

<style lang="scss" scoped></style>
