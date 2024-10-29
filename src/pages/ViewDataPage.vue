<template>
  <q-page :style-fn="myTweak" padding>
    <div class="q-gutter-y-lg">
      <div class="row q-gutter-y-md justify-center q-gutter-x-md">
        <q-input
          class="col-11 col-md-5 col-lg-4"
          outlined
          v-model="time"
          type="time"
          label="Hora"
        />
        <q-select
          outlined
          class="col-11 col-md-5 col-lg-4"
          v-model="model"
          :options="optionsSelect"
          label="Estacion"
        />
      </div>
      <div class="row justify-center q-gutter-x-md q-gutter-y-md">
        <q-table
          class="col-11"
          title="Data"
          :rows="rows"
          :columns="columns"
          row-key="name"
        />
        <q-btn
          class="col-11 col-sm-3 col-xl-1 justify-end"
          color="primary"
          icon="picture_as_pdf"
          label="Descaragar PDF"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
const columns = [
  {
    name: "fecha",
    required: true,
    label: "Fecha",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "ejex",
    align: "center",
    label: "Eje X",
    field: "ejex",
    sortable: true,
  },
  { name: "ejey", label: "Eje Y", field: "ejey", sortable: true },
  { name: "ejez", label: "Eje Z", field: "ejez" },
];

const rows = [
  {
    name: "202410120022",
    ejex: 159,
    ejey: 6.0,
    ejez: 24,
  },
  {
    name: "202410120022",
    ejex: 159,
    ejey: 6.0,
    ejez: 24,
  },
  {
    name: "202410120022",
    ejex: 159,
    ejey: 6.0,
    ejez: 24,
  },
];
</script>

<style lang="scss" scoped></style>
