import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";


const Viz = () => {

    const ref=useRef();
    const width=900;
    const height=500;

    const processData = (data) => {
        newData = [...data]
        for (const d of newData) {
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
        }
        return newData;
    }

    const [ data, setData ] = useState(null)
    if (data == null) {
        d3.csv("iris.csv").then(function (csvData) {
            const processedData=processData(csvData, categoryData)
            setData(processedData);
        });
    }



    useEffect( () => {
        const svg = d3.select(ref.current)
        var [x,y]=[0,0];
        if (data != null)
            svg.selectAll('circle').data(data).join('circle').attr('cx', () => x+=25).attr('cy', () => y+=25).attr('r', 25).attr('fill','red')
    }, [data]);

    return <svg width={width} height={height} id="viz" ref={ref} />;
};

export default Viz;