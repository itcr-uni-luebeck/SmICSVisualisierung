// https://github.com/d3/d3-sankey Version 0.7.1. Copyright 2017 Mike Bostock.
!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(
        exports,
        require("d3-array"),
        require("d3-collection"),
        require("d3-shape")
      )
    : "function" == typeof define && define.amd
    ? define(["exports", "d3-array", "d3-collection", "d3-shape"], t)
    : t((n.d3 = n.d3 || {}), n.d3, n.d3, n.d3)
})(this, function (n, t, e, r) {
  "use strict"
  function o(n) {
    return n.target.depth
  }
  function u(n) {
    return n.depth
  }
  function i(n, t) {
    return t - 1 - n.height
  }
  function c(n, t) {
    return n.sourceLinks.length ? n.depth : t - 1
  }
  function f(n) {
    return n.targetLinks.length
      ? n.depth
      : n.sourceLinks.length
      ? t.min(n.sourceLinks, o) - 1
      : 0
  }
  function s(n) {
    return function () {
      return n
    }
  }
  function a(n, t) {
    return d(n.source, t.source) || n.index - t.index
  }
  function h(n, t) {
    return d(n.target, t.target) || n.index - t.index
  }
  function d(n, t) {
    return n.y0 - t.y0
  }
  function l(n) {
    return n.value
  }
  function y(n) {
    return (n.y0 + n.y1) / 2
  }
  function g(n) {
    return y(n.source) * n.value
  }
  function k(n) {
    return y(n.target) * n.value
  }
  function p(n) {
    return n.index
  }
  function v(n) {
    return n.nodes
  }
  function L(n) {
    return n.links
  }
  function E(n, t) {
    var e = n.get(t)
    if (!e) throw new Error("missing: " + t)
    return e
  }
  function x(n) {
    return [n.source.x1, n.y0]
  }
  function m(n) {
    return [n.target.x0, n.y1]
  }
  var w = function () {
      function n() {
        var n = {
          nodes: O.apply(null, arguments),
          links: H.apply(null, arguments),
        }
        return r(n), o(n), u(n), i(n), f(n), n
      }
      function r(n) {
        n.nodes.forEach(function (n, t) {
          ;(n.index = t), (n.sourceLinks = []), (n.targetLinks = [])
        })
        var t = e.map(n.nodes, q)
        n.links.forEach(function (n, e) {
          n.index = e
          var r = n.source,
            o = n.target
          "object" != typeof r && (r = n.source = E(t, r)),
            "object" != typeof o && (o = n.target = E(t, o)),
            r.sourceLinks.push(n),
            o.targetLinks.push(n)
        })
      }
      function o(n) {
        n.nodes.forEach(function (n) {
          n.value = Math.max(t.sum(n.sourceLinks, l), t.sum(n.targetLinks, l))
        })
      }
      function u(n) {
        var t, e, r
        for (t = n.nodes, e = [], r = 0; t.length; ++r, t = e, e = [])
          t.forEach(function (n) {
            ;(n.depth = r),
              n.sourceLinks.forEach(function (n) {
                e.indexOf(n.target) < 0 && e.push(n.target)
              })
          })
        for (t = n.nodes, e = [], r = 0; t.length; ++r, t = e, e = [])
          t.forEach(function (n) {
            ;(n.height = r),
              n.targetLinks.forEach(function (n) {
                e.indexOf(n.source) < 0 && e.push(n.source)
              })
          })
        var o = (w - x - b) / (r - 1)
        n.nodes.forEach(function (n) {
          n.x1 =
            (n.x0 =
              x +
              Math.max(0, Math.min(r - 1, Math.floor(z.call(null, n, r)))) *
                o) + b
        })
      }
      function i(n) {
        function r() {
          o.forEach(function (n) {
            var t,
              e,
              r,
              o = m,
              u = n.length
            for (n.sort(d), r = 0; r < u; ++r)
              (e = o - (t = n[r]).y0) > 0 && ((t.y0 += e), (t.y1 += e)),
                (o = t.y1 + j)
            if ((e = o - j - M) > 0)
              for (o = t.y0 -= e, t.y1 -= e, r = u - 2; r >= 0; --r)
                (e = (t = n[r]).y1 + j - o) > 0 && ((t.y0 -= e), (t.y1 -= e)),
                  (o = t.y0)
          })
        }
        var o = e
          .nest()
          .key(function (n) {
            return n.x0
          })
          .sortKeys(t.ascending)
          .entries(n.nodes)
          .map(function (n) {
            return n.values
          })
        !(function () {
          var e = t.min(o, function (n) {
            return (M - m - (n.length - 1) * j) / t.sum(n, l)
          })
          o.forEach(function (n) {
            n.forEach(function (n, t) {
              n.y1 = (n.y0 = t) + n.value * e
            })
          }),
            n.links.forEach(function (n) {
              n.width = n.value * e
            })
        })(),
          r()
        for (var u = 1, i = P; i > 0; --i)
          !(function (n) {
            o.slice()
              .reverse()
              .forEach(function (e) {
                e.forEach(function (e) {
                  if (e.sourceLinks.length) {
                    var r =
                      (t.sum(e.sourceLinks, k) / t.sum(e.sourceLinks, l) -
                        y(e)) *
                      n
                    ;(e.y0 += r), (e.y1 += r)
                  }
                })
              })
          })((u *= 0.99)),
            r(),
            (function (n) {
              o.forEach(function (e) {
                e.forEach(function (e) {
                  if (e.targetLinks.length) {
                    var r =
                      (t.sum(e.targetLinks, g) / t.sum(e.targetLinks, l) -
                        y(e)) *
                      n
                    ;(e.y0 += r), (e.y1 += r)
                  }
                })
              })
            })(u),
            r()
      }
      function f(n) {
        n.nodes.forEach(function (n) {
          n.sourceLinks.sort(h), n.targetLinks.sort(a)
        }),
          n.nodes.forEach(function (n) {
            var t = n.y0,
              e = t
            n.sourceLinks.forEach(function (n) {
              ;(n.y0 = t + n.width / 2), (t += n.width)
            }),
              n.targetLinks.forEach(function (n) {
                ;(n.y1 = e + n.width / 2), (e += n.width)
              })
          })
      }
      var x = 0,
        m = 0,
        w = 1,
        M = 1,
        b = 24,
        j = 8,
        q = p,
        z = c,
        O = v,
        H = L,
        P = 32
      return (
        (n.update = function (n) {
          return f(n), n
        }),
        (n.nodeId = function (t) {
          return arguments.length
            ? ((q = "function" == typeof t ? t : s(t)), n)
            : q
        }),
        (n.nodeAlign = function (t) {
          return arguments.length
            ? ((z = "function" == typeof t ? t : s(t)), n)
            : z
        }),
        (n.nodeWidth = function (t) {
          return arguments.length ? ((b = +t), n) : b
        }),
        (n.nodePadding = function (t) {
          return arguments.length ? ((j = +t), n) : j
        }),
        (n.nodes = function (t) {
          return arguments.length
            ? ((O = "function" == typeof t ? t : s(t)), n)
            : O
        }),
        (n.links = function (t) {
          return arguments.length
            ? ((H = "function" == typeof t ? t : s(t)), n)
            : H
        }),
        (n.size = function (t) {
          return arguments.length
            ? ((x = m = 0), (w = +t[0]), (M = +t[1]), n)
            : [w - x, M - m]
        }),
        (n.extent = function (t) {
          return arguments.length
            ? ((x = +t[0][0]),
              (w = +t[1][0]),
              (m = +t[0][1]),
              (M = +t[1][1]),
              n)
            : [
                [x, m],
                [w, M],
              ]
        }),
        (n.iterations = function (t) {
          return arguments.length ? ((P = +t), n) : P
        }),
        n
      )
    },
    M = function () {
      return r.linkHorizontal().source(x).target(m)
    }
  ;(n.sankey = w),
    (n.sankeyCenter = f),
    (n.sankeyLeft = u),
    (n.sankeyRight = i),
    (n.sankeyJustify = c),
    (n.sankeyLinkHorizontal = M),
    Object.defineProperty(n, "__esModule", { value: !0 })
  module.exports = { sankey: w }
})
