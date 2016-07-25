(function($, d3) {

  // Calculate our data based on visible area
  function getData() {
    var w = $('.countdown-wrapper').width(),
        h = $(window).height(),
        numSlides = $(".slides .slide").length,
        // Clamp scrollY to overflow values from elastic scrolling
        scrollY = Math.min( Math.max( $(window).scrollTop(), 0 ), h * (numSlides - 1) ),
        dy = scrollY % h,
        currentSlide = Math.floor(scrollY / h);
    return [
      {
        dy  : dy,
        n   : numSlides - currentSlide,
        h   : h,
        w   : w
      }
    ];
  }

  // Get initial data
  var data = getData();

  // Size the svg to fill entire area
  var svg = d3.select("body .countdown-bg")
    .data(data)
    ;

  // Convert slide height to full circle (radians)
  var arcScale = d3.scaleLinear()
    .domain([0, data[0].h])
    .range([0, 2 * Math.PI])
    ;

  // Arc generator to produce sweep area
  var arc = d3.arc()
    .innerRadius(0)
    // Make outer radius the distance from center to the corner to ensure coverage
    .outerRadius( Math.sqrt( Math.pow(data[0].w,2) + Math.pow(data[0].h,2) ) )
    .startAngle(0)
    // Set end angle based on delta-y scrolling per frame
    .endAngle(function(d){return arcScale(d.dy);});

  // Simple line generator for croshairs
  var simpleLine = d3.line();


  //** Elements **//


  // Sweep area

  var sweep = svg.append("path")
    .attr("d", arc)
    .attr("class", "sweep")
    ;

  // Vignette

  var vignette = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    // Unfortunately, we can't do CSS gradients and must define the gradient in the svg <defs>
    .attr("fill", "url(#vignette)")
    ;

  // Crosshairs

  function makeCrossHair() {
    return svg.append('path')
      .attr("class", "crosshair")
      ;
  }

  var crossH = makeCrossHair()
    ;
  var crossV = makeCrossHair()
    ;

  // Circles

  function makeCircle( r ) {
    return svg.append("circle")
      .attr("r", r)
      .attr("class", "circle")
      ;
  }

  var circle1 = makeCircle( 100 )
    ;

  var circle2 = makeCircle( 130 )
    ;

  // Text

  var text = svg.append("text")
    .text(function(d) { return d.n; })
    .style("text-anchor", "middle")
    .style("alignment-baseline", "central")
    .attr("class", "text")
    ;

  //** Updates **//

  function update() {

    // arcScale domain
    arcScale
      .domain([0, data[0].h])
      ;

    // SVG

    svg
      .data(data)
      .attr("width", function(d){return d.w;})
      .attr("height", function(d){return d.h;})
      ;

    // Vignette

    vignette
      .data(data)
      .attr("width", function(d){return d.w;})
      .attr("height", function(d){return d.h;})
      ;

    // Sweep area
    svg.selectAll("path")
      .data(data)
      .attr("transform", function(d){return "translate(" + d.w/2 + "," + d.h/2 + ")";})
      .attr("d", arc)
      ;

    // Circles

    circle1
      .data(data)
      .attr("cx", function(d){return d.w/2;})
      .attr("cy", function(d){return d.h/2;})
      ;

    circle2
      .data(data)
      .attr("cx", function(d){return d.w/2;})
      .attr("cy", function(d){return d.h/2;})
      ;

    // Crosshairs

    crossH
      .data(data)
      .attr("d", function(d){ return simpleLine( [ [0,d.h/2], [d.w,d.h/2] ] ); })
      ;
    crossV
      .data(data)
      .attr("d", function(d){ return simpleLine( [ [d.w/2,0], [d.w/2,d.h] ] ); })
      ;

    // Text

    text
      .data(data)
      .attr("x", function(d) { return d.w/2; })
      .attr("y", function(d) { return d.h/2; })
      ;

  }

  // Initial draw
  update();

  //** Handlers **//

  // Update on window resize

  $(window).on("resize", function(e) {
    // Calculate data
    data = getData();

    update();
  });

  // Update data on scroll

  $(window).on("scroll", function(e) {
    // Calculate data
    data = getData();

    // Update sweep
    svg.selectAll("path")
      .data(data)
      .attr("d", arc)
      ;

    // Update text
    svg.selectAll("text")
      .data(data)
      .text(function(d) { return d.n; })
      ;
  });

})($, d3);
