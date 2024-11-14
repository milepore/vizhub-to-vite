import * as d3 from "d3";
import { useRef, useEffect } from "react";


const Viz = () => {

    const ref=useRef();
    const width=900;
    const height=500;

    useEffect( () => {
        const svg = d3.select(ref.current)
        svg.selectAll('circle').data([null]).join('circle').attr('cx', 450).attr('cy', 250).attr('r', 50).attr('fill','red')
    }, []);

    return <svg width={width} height={height} id="viz" ref={ref} />;
};

export default Viz;