import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import { scatterPlot } from "./scatterPlot.js"

const Viz = () => {

    const ref=useRef();
    const width=900;
    const height=500;

    const processData = (data) => {
        for (const d of data) {
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
        }
        return data;
    }

    const [ data, setData ] = useState(null)
    if (data == null) {
        d3.csv("iris.csv").then(function (csvData) {
            const processedData=processData(csvData)
            setData(processedData);
        });
    }

    const [ hoveredValue, setHoveredValue ] = useState(null)
    useEffect( () => {
        const svg = d3.select(ref.current)
        if (data === null)
            return;

        svg.call(scatterPlot, {
            data,
            width,
            height,
            xValue: (d) => d.sepal_length,
            yValue: (d) => d.petal_length,
            colorValue: (d) => d.species,
            xAxisLabel: 'Sepal Length',
            yAxisLabel: 'Petal Length',
            colorLegendLabel: 'Species',
            margin: {
              top: 10,
              right: 10,
              bottom: 50,
              left: 50,
            },
            colorLegendX: 850,
            colorLegendY: 320,
            setHoveredValue,
            hoveredValue,
          });
    }, [data, hoveredValue]);

    return <svg width={width} height={height} id="viz" ref={ref} />;
};

export default Viz;