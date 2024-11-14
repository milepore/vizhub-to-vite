
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

Getting D3 integrated
