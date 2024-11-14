
# Moving from VizHub to Vite and GitHub Pages 

For one of my visualization projects, it became evident that using D3 for visualization wasn’t enough on its own.  I wanted to add a bunch of interactive filtering and chart settings - and the best tool for the job was a REACT app with a D3 enabled SVG embedded in it.

It wasn’t totally straight forward, and I found info in a bunch of different places, and there were a few challenges understanding how to hook things together.  I figured putting that all in one place made sense.  I want to credit some of the references though:

* [https://www.influxdata.com/blog/guide-d3js-react/]
* [https://blog.logrocket.com/getting-started-d3-js-react/]
* [https://2019.wattenberger.com/blog/react-and-d3]
* [https://www.sitepoint.com/d3-js-react-interactive-data-visualizations/]

So to start, we should have a VizHub project that we want to make a standalone deployment.  In order to show how we get several features from VizHub into a standalone app, I’m going to start with one of the samples that has the following features:

* External Data Loading
* Resizing
* Interactivity

I’m going to start with @curran’s Interactive Color Legend scatter plot:
[https://vizhub.com/curran/a446f43c024a49608f7ae418cde946a2]

We will use the following tools to get going:

* [Github](https://github.com) - where our code will go
* [Github Pages](https://pages.github.com) Pages - where our deployed application will be hosted
* [Vite](https://vite.dev) - frontend application tooling
* [npm](https://www.npmjs.com/) - dependency management, build tooling and installation
* [gh-pages npm plugin](https://www.npmjs.com/package/gh-pages) - to automate our deployment
* [D3](https://d3js.org/) - library for manipulating our SVG visualization

## Getting Started

First thing we’re going to do is create a new git repository.  We can do that any way you want.  But (as you know) the repository we’re going to use is (hopefully) where you are reading this from:

We will follow the [vite guide](https://vite.dev/guide/) to start our project.

To start our project, we are going to use npm to create our vite project:

```console
# npm create vite@latest vizhub-to-vite -- --template react
```

Followed by:

```console
# cd vishub-to-vite
# npm install
```

Now, lets go ahead and run the system:

```console
# npm run dev
```

You should see this output:
TODO: insert output image

And if you point a browser, you’ll get:
TODO: insert browser image

Ok.  Now we’re getting somewhere.  We have an app, and we can run it.

## Getting D3 integrated

Now it is time to get D3 installed and get an SVG we can use with D3.  We are first going to install D3, so from the command line, run:

```console
# npm install d3
```

This will install the d3 library for us.  You can see that our package.json has the following added line:

```json
  "dependencies": {
    // …
    "d3": "^7.9.0",
    //…
  }
```

This will let us access the D3 libraries now.

Next, we need to update our application and create a component that will house our Visualization.  We are going to make a new React component - we will call it "Viz" that will create the SVG, load our data, and invoke any D3 calls we have on it.

So lets create a new file src/Viz.jsx:

```javascript
import { useRef } from "react";


const Viz = () => {
    const width=900;
    const height=500;

    return <svg width={width} height={height} id="viz"/>;
};

export default Viz;
```

And let's include it in our application - replacing App.jsx with:

```javascript
import Viz from './Viz'

function App() {
  return <Viz></Viz>;
}

export default App
```

If we go back to our application, we're going to see a blank screen, but using our dev tools, we can see that we have a single SVG element on the page now - with a width and height of 900 x 500.

### Let's add some D3 calls

First, we need to reference our SVG.  In order to use D3, we need to have 2 things:

1) We need to be able to reference our SVG component
2) We need to be able to call D3 code to manipulate that component after it exists

In order to accomplish #1, we will use react's useRef.  That will let us get a javascript reference to a given component that is unique.  We are also going to do all of our D3 work inside a ```useEffect()``` block - which will allow us to run it after the initial draw, and set depenencies on how often it gets rendered.

At the beginning of our Viz method, we will add:

```javascript
    const ref=useRef();
```

And change our SVG render to reference that:

```javascript
    return <svg width={width} height={height} id="viz" ref={ref} />;
```

Now, we can use `ref.current` to be able to access the SVG via D3, and update it:

```javascript
    useEffect( () => {
        const svg = d3.select(ref.current)
        svg.selectAll('circle').data([null]).join('circle').attr('cx', 450).attr('cy', 250).attr('r', 50).attr('fill','red')
    }, []);
```
