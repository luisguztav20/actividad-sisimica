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
      <div v-for="dato in valoresH" :key="dato" class="q-my-lg">
        <p>Amplitud: {{ dato.amplitud }} fecha: {{ dato.fecha }}</p>
      </div>
    </div>

    <div class="q-my-lg">
      <p>DATA EJE Z</p>
      <div v-for="dato in valoresZ" :key="dato" class="q-my-lg">
        <p>Amplitud: {{ dato.amplitud }} fecha: {{ dato.fecha }}</p>
      </div>
    </div>

    <div class="q-my-lg">
      <p>DATA EJE E</p>
      <div v-for="dato in valoresE" :key="dato" class="q-my-lg">
        <p>Amplitud: {{ dato.amplitud }} fecha: {{ dato.fecha }}</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "../boot/axios";
//import FFT from "fft.js";
//import { sqrt } from "mathjs";
//import mathjs from "mathjs";
//import chart from "chartjs";
import Algebrite from "algebrite";

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
const resultadosH = []; //no se si es necesario en estos casos hacer reactivos estos arrays
const relacionHV = []; // lo mismo que el de arriba

const onSubmit = () => {
  getData("z"); //hace la peticon al backend con las fechas y horas de los inputs y recibe como parametro el eje a consultar4
  getData("e");
  getData("h");
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
        console.log("AMPLITUDES:" + valoresZ.value);
      }
      if (eje === "e") {
        data.value.docs.forEach((Element) => dataE.value.push(Element)); //asigna el valor al eje E
        valoresE.value = dataE.value.map((elemento) => ({
          amplitud: elemento.valor,
          fecha: elemento._id,
        }));
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
        calcularhv(); //es esta se calcula la relacion H/V (H de la relacion) y llena el array relacionHV
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
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
  console.log("resultados hv:", relacionHV);
};
</script>

<style lang="scss" scoped></style>
