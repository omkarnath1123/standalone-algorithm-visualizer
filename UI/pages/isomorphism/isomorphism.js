$(document).ready(function() {
  // disable Math jax menu
  MathJax.Hub.Config({
    showMathMenu: false
  });

  var graph,
    store,
    svg = d3.select("svg"),
    width = $(".svg-container > svg").width(),
    height = $(".svg-container > svg").height(),
    radius = 10;
  console.log(`current window height : ${height}, width : ${width}`);

  var color = d3.scaleOrdinal(d3.schemeCategory10),
    link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");

  var simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3.forceLink().id(function(d) {
        return d.id;
      })
    )
    .force(
      "charge",
      d3.forceManyBody().strength(function(d) {
        return -500;
      })
    )
    .force("center", d3.forceCenter(width / 2, height / 2));

  d3.json("isomorphic.json", function(err, g) {
    if (err) throw err;

    var nodeByID = {};
    g.nodes.forEach(function(n) {
      nodeByID[n.id] = n;
    });
    g.links1.forEach(function(l) {
      l.sourceGroup = nodeByID[l.source].group.toString();
      l.targetGroup = nodeByID[l.target].group.toString();
    });

    graph = g;
    store = $.extend(true, {}, g);
    update();
  });

  function update() {
    node = node.data(graph.nodes, function(d) {
      return d.id;
    });
    node.exit().remove();
    var newNode = node
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", radius)
      .attr("fill", function(d) {
        return color(d.group);
      })
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    newNode.append("title").text(function(d) {
      return `group: ${d.group}`;
    });
    node = node.merge(newNode);
    link = link.data(graph.links1, function(d) {
      return d.id;
    });
    link.exit().remove();
    newLink = link
      .enter()
      .append("line")
      .attr("class", "link");

    newLink.append("title").text(function(d) {
      return `source: ${d.source} \ntarget: ${d.target}`;
    });
    link = link.merge(newLink);
    simulation.nodes(graph.nodes).on("tick", ticked);
    simulation.force("link").links(graph.links1);
    simulation
      .alpha(1)
      .alphaTarget(0)
      .restart();
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function ticked() {
    node
      .attr("cx", function(d) {
        return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
      })
      .attr("cy", function(d) {
        return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
      });

    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });
  }

  $(window).on("resize", function() {
    width = $(".svg-container > svg").width();
    height = $(".svg-container > svg").height();
    console.log(`current window height : ${height}, width : ${width}`);
  });
});
