// copied directly from https://vizhub.com/curran/a446f43c024a49608f7ae418cde946a2?edit=files&file=scatterPlot.js

import {
    extent,
    scaleLinear,
    scaleOrdinal,
    schemeCategory10,
  } from 'd3';
  import { axes } from './axes';
  import { colorLegend } from './colorLegend';
  
  export const scatterPlot = (
    selection,
    {
      data,
      width,
      height,
      xValue,
      yValue,
      colorValue,
      margin,
      xAxisLabel,
      yAxisLabel,
      colorLegendLabel,
      colorLegendX,
      colorLegendY,
      setHoveredValue,
      hoveredValue,
    }
  ) => {
    const xScale = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right]);
  
    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top]);
  
    const colorScale = scaleOrdinal()
      .domain(data.map(colorValue))
      .range(schemeCategory10);
  
    selection.call(axes, {
      xScale,
      yScale,
      xAxisLabel,
      yAxisLabel,
    });
  
    selection.call(colorLegend, {
      colorScale,
      colorLegendLabel,
      colorLegendX,
      colorLegendY,
      setHoveredValue,
      hoveredValue,
    });
  
    selection
      .selectAll('circle.mark')
      .data(data)
      .join('circle')
      .attr('class', 'mark')
      .attr('cx', (d) => xScale(xValue(d)))
      .attr('cy', (d) => yScale(yValue(d)))
      .attr('fill', (d) =>
        colorScale(colorValue(d))
      )
      .attr('r', 10)
      .attr('opacity', (d) =>
        hoveredValue
          ? colorValue(d) === hoveredValue
            ? 1
            : 0.2
          : 1
      );
  };
  