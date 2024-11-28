<template>
  <div id="chart" ref="chart" style="height: 400px"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import * as echarts from "echarts";

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

// Referencia al contenedor del gráfico
const chart = ref(null);
let chartInstance = null;

// Método para renderizar el gráfico
const renderChart = () => {
  if (!chart.value) return;

  // Inicializar ECharts
  chartInstance = echarts.init(chart.value);

  const option = {
    title: {
      text: "FTT (H/V)",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",

      data: props.data.index,
      axisLabel: {
        formatter: (value) => (value += " min"),
      },
    },
    yAxis: {
      type: "value",
      min: -200,
      max: 200,
      splitLine: { lineStyle: { type: "dashed" } },
    },
    series: [
      {
        name: "Amplitud",
        type: "line",
        data: props.data,
        lineStyle: {
          color: "orange",
        },
        itemStyle: {
          color: (params) => {
            const value = params.value;
            if (value <= 50) return "green";
            if (value <= 100) return "yellow";
            if (value <= 150) return "orange";
            if (value <= 200) return "red";
            if (value <= 300) return "purple";
            return "brown";
          },
        },
        markLine: {
          silent: true,
          data: [
            { yAxis: 50 },
            { yAxis: 100 },
            { yAxis: 150 },
            { yAxis: 200 },
            { yAxis: -50 },
            { yAxis: -100 },
            { yAxis: -150 },
            { yAxis: -200 },
          ],
          lineStyle: {
            type: "dashed",
          },
        },
      },
    ],
    // visualMap: {
    //   //Indicador de colores
    //   top: 10,
    //   right: 10,
    //   pieces: [
    //     { gt: 0, lte: 50, color: "green" },
    //     { gt: 50, lte: 100, color: "yellow" },
    //     { gt: 100, lte: 150, color: "orange" },
    //     { gt: 150, lte: 200, color: "red" },
    //     { gt: 200, lte: 300, color: "purple" },
    //     { gt: 300, color: "brown" },
    //   ],
    //   outOfRange: {
    //     color: "#999",
    //   },
    // },
  };

  // Establecer las opciones en el gráfico
  chartInstance.setOption(option);
};

// Limpiar la instancia del gráfico antes de desmontar el componente
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});

// Renderizar el gráfico al montar el componente
onMounted(() => {
  renderChart();
});

// Si los datos cambian, vuelve a renderizar el gráfico
watch(
  () => props.data,
  () => {
    if (chartInstance) {
      chartInstance.dispose();
    }
    renderChart();
  }
);
</script>

<style>
/* Asegúrate de que el contenedor tenga un tamaño específico */
#chart {
  width: 100%;
  height: 100%;
}
</style>
