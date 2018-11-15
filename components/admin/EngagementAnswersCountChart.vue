<template>
  <div class="answers-count-chart">
    <line-chart :chart-data="answersCountChartData" :options="options"></line-chart>
  </div>
</template>

<style lang="scss" scoped>
.answers-count-chart {
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
        answersCountChartData: Object
    }
  }
</script>
