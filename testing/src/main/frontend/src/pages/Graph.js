import React, { useEffect } from 'react';
import * as d3 from 'd3';

const D3 = () => {
  useEffect(() => {
    makeGraph();
  }, []);

  const makeGraph = () => {
    // setting canvas
    const width = 400;
    const height = 400;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

    // data
    const data = [
      { month: '1월', value: 40, color: 'red' },
      { month: '2월', value: 10, color: 'orange' },
      { month: '3월', value: 60, color: 'yellow' },
      { month: '4월', value: 95, color: 'green' },
      { month: '5월', value: 30, color: 'blue' },
      { month: '6월', value: 78, color: 'indigo' },
    ];

    // setting axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) => {
      return g
        .attr('transform', `translate(0, ${height})`)
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
    };

    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).tickValues([0, 20, 40, 60, 80, 100]).tickSize(-width))
        .call((g) => g.select('.domain').remove())
        .attr('class', 'grid');

    // apply axis to canvas
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // vertical bar chart
    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (data) => x(data.month) + x.bandwidth() / 2 - 10)
      .attr('y', (data) => y(data.value))
      .attr('width', 20)
      .attr('height', (data) => y(0) - y(data.value))
      .attr('class', 'bar-chart')
      .attr('fill', (data) => data.color);

    //line chart
    const line = d3
      .line()
      .x((d) => x(d.month) + x.bandwidth() / 2)
      .y((d) => y(d.value));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1)
      .attr('d', line);

    // add text
    svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.value)
      .attr('x', (data) => x(data.month) + x.bandwidth() / 2)
      .attr('y', (data) => y(data.value) - 5)
      .attr('fill', 'black')
      .attr('font-family', 'Tahoma')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle');
  };

  return <></>;
};
export default D3;