SVGCountdown
============

An experimental format imitating old film leaders with content slides.

(GIF preview coming soon)

[See it in action](http://christophercarman.com/samples/countdown)


## Inspiration

I remember seeing those old countdowns a lot, referencing old film leaders, and I wondered how that style could be implemented in a webpage.

## Method

The primary challenge in making this work was figuring out how to best recreate the sweeping action of the countdown as a user scrolls throught the page. It was clear it would need to be scalable and procedurally generated, so the natural choice was to use SVG to render the elements.

To draw these SVG elements I opted to use [D3.js](http://d3js.org/). It's more commonly meant to be used with varying amounts of data, but it's fantastic at drawing SVGs from bound data, so I felt it was a goot fit for the job.

I used JQuery to update the viewport data during scrolling and resize events, updating D3 and thus keeping the SVG in sync. Add some clever styling to complete the effect and [presto](http://christophercarman.com/samples/countdown)!
