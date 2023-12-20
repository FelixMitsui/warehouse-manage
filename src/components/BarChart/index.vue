<template>
  <div class="container">
    <div id="chart" class="chart">
      <svg ref="svgRef"></svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { getMergedDate } from '@/utils/tools/mergedData'

import * as d3 from 'd3'
const { data, xName, yName } = defineProps(['xName', 'yName', 'data'])
const svgRef = ref()

const drawChart = async () => {
  if (!data) return
  d3.select(svgRef.value).selectAll('*').remove()

  const newItems = getMergedDate(data)

  const currentDate = new Date(newItems[0].date_at)
  const chartContainer = d3.select('#chart').node() as HTMLElement
  const margin = { top: 45, right: 40, bottom: 45, left: 35 }

  const parentWidth = chartContainer.clientWidth
  const parentHeight = chartContainer.clientHeight
  console.log(chartContainer.clientWidth)
  const width = Math.max(340, parentWidth - margin.left - margin.right)
  const height = parentHeight - margin.top - margin.bottom

  const svg = d3
    .select(svgRef.value)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
  svg
    .append('text')
    .attr('font-size', '18px')
    .attr('font-weight', 800)
    .attr('x', width / 2 - 50)
    .attr('y', -20)
    .text(`${currentDate.getMonth() + 1} 月`)

  svg
    .append('text')
    .attr('x', 10)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .attr('font-weight', 800)
    .text(yName)

  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', height + 35)
    .attr('text-anchor', 'middle')
    .attr('font-size', '18px')
    .attr('font-weight', 800)
    .text(xName)

  const timeParse = d3.timeParse('%Y-%m-%d')

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  )
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  )

  const numberOfDays = lastDayOfMonth.getDate()

  const x = d3
    .scaleTime()
    .domain([firstDayOfMonth, lastDayOfMonth])
    .range([0, width])

  const xAxis = d3
    .axisBottom(x)
    .ticks(d3.timeDay.every(2))
    .tickFormat((d) => {
      const dateObject = new Date(d as string | number)
      return (dateObject as Date).getDate().toString()
    })

  svg
    .append('g')
    .attr('class', 'x-axis')
    .style('font-size', '15px')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  const y = d3
    .scaleLinear()
    .domain([
      0,
      Math.max(20, d3.max(newItems.map((item) => item.total)) as number),
    ])
    .nice()
    .range([height, 0])

  const yAxis = d3.axisLeft(y)

  svg.append('g').attr('class', 'y-axis').style('font-size', '15px').call(yAxis)

  svg
    .selectAll('.bar')
    .data(newItems)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('fill', '#FFD306')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('x', (d) => x(timeParse(d.date_at) as Date) + 2)
    .attr('width', Math.max(0, width / numberOfDays - 4))
    .attr('y', y(0))
    .attr('height', 0)
    .transition()
    .duration(1500)
    .attr('y', (d) => y(d.total))
    .attr('height', (d) => Math.max(0, height - y(d.total)))

  const barGroup = svg
    .selectAll('.bar-group')
    .data(newItems)
    .enter()
    .append('g')
    .attr('class', 'bar-group')

  barGroup
    .append('text')
    .attr('x', (d) => x(timeParse(d.date_at) as Date))
    .attr('y', y(0) - 5)
    .transition()
    .duration(1500)
    .attr('y', (d) => y(d.total) - 5)
    .attr('font-size', '12px')
    .text((d) => d.total)
}

onMounted(() => {
  drawChart()
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  .chart {
    min-height: 350px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
