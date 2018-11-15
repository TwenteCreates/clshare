<template>
  <div class="sa-chart">
    <line-chart :chart-data="sentimentAnalysesChartData" :options="options"></line-chart>
  </div>
</template>

<style lang="scss" scoped>
.sa-chart {
    position: relative;
}
</style>


<script>
  import LineChart from '@/components/charts/LineChart.js'

  export default {
    components: {
        LineChart
    },
    data () {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    props: {
        sentimentAnalysesChartData: Object
    }
  }
</script>
