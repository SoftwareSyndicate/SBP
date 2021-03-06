
/* Inspired by Lee Byron's test data generator. */
window.stream_layers = function(n, m, o) {
  if (arguments.length < 3) o = 0;
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  return d3.range(n).map(function() {
    var a = [], i;
    for (i = 0; i < m; i++) a[i] = o + o * Math.random();
    for (i = 0; i < 5; i++) bump(a);
    return a.map(stream_index);
  });
}

/* Another layer generator using gamma distributions. */
window.stream_waves = function(n, m) {
  return d3.range(n).map(function(i) {
    return d3.range(m).map(function(j) {
      var x = 20 * j / m - i / 3;
      return 2 * x * Math.exp(-.5 * x);
    }).map(stream_index);
  });
}

window.stream_index = function(d, i) {
  return {x: i, y: Math.max(0, d)};
}

