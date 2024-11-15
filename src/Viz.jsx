import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import { scatterPlot } from "./scatterPlot.js"

function computeSize() {
    const xMargin = 50;
    const yMargin = 50;
    const ratio = 1.92;
    const maxHeightRatio = .95;
    const maxWidth = 10000;

    var width = Math.min(window.innerWidth - xMargin, maxWidth);
    var height = width / 1.92;
    const maxHeight = Math.min(window.innerHeight - yMargin, window.innerHeight*maxHeightRatio)
    if (height > maxHeight) {
        height = maxHeight;
        width = height * ratio;
    }
    return [width, height];
}

const Viz = () => {

    const ref=useRef();

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
    const [ windowSize, setWindowSize ] = useState(computeSize())
    const [ width, height ] = windowSize;
    const scale  = 960 / width;

    useEffect(() => {
        function handleResize() {
            setWindowSize(computeSize())
        }

        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            colorLegendX: width - 100,
            colorLegendY: height - 150,
            setHoveredValue,
            hoveredValue,
          });
    }, [data, hoveredValue, windowSize]);

    return <svg width={width} height={height} id="viz" style={{'background-color':'white', 'color' : 'black'}} ref={ref} />;
};

export default Viz;