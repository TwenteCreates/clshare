<template>
    <line-chart :chart-data="sentimentAnalysesChartData" :options="options"></line-chart>
</template>

<script>
  import LineChart from '@/components/charts/LineChart.js'

  export default {
    components: {
        LineChart
    },
    data () {
        return {
            options: {
                legend: {
                    display: false
                },
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
