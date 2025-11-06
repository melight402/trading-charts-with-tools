import { bindToDevicePixelRatio as t } from "fancy-canvas/coordinate-space";
var i,
  n,
  s,
  h = (function () {
    function t(t, i) {
      ((this.x = t), (this.y = i));
    }
    return (
      (t.prototype.add = function (i) {
        return new t(this.x + i.x, this.y + i.y);
      }),
      (t.prototype.addScaled = function (i, n) {
        return new t(this.x + n * i.x, this.y + n * i.y);
      }),
      (t.prototype.subtract = function (i) {
        return new t(this.x - i.x, this.y - i.y);
      }),
      (t.prototype.dotProduct = function (t) {
        return this.x * t.x + this.y * t.y;
      }),
      (t.prototype.crossProduct = function (t) {
        return this.x * t.y - this.y * t.x;
      }),
      (t.prototype.signedAngle = function (t) {
        return Math.atan2(this.crossProduct(t), this.dotProduct(t));
      }),
      (t.prototype.angle = function (t) {
        return Math.acos(this.dotProduct(t) / (this.length() * t.length()));
      }),
      (t.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }),
      (t.prototype.scaled = function (i) {
        return new t(this.x * i, this.y * i);
      }),
      (t.prototype.normalized = function () {
        return this.scaled(1 / this.length());
      }),
      (t.prototype.transposed = function () {
        return new t(-this.y, this.x);
      }),
      (t.prototype.clone = function () {
        return new t(this.x, this.y);
      }),
      t
    );
  })(),
  r = function (t, i) {
    ((this.t = new h(Math.min(t.x, i.x), Math.min(t.y, i.y))),
      (this.i = new h(Math.max(t.x, i.x), Math.max(t.y, i.y))));
  },
  e = function (t, i) {
    ((this.h = t), (this.u = i));
  };
function u(t, i) {
  return t.x === i.x && t.y === i.y;
}
function o(t, i) {
  if (u(t, i)) throw new Error("Points should be distinct");
  return (function (t, i, n) {
    return { o: t, l: i, v: n };
  })(t.y - i.y, i.x - t.x, t.x * i.y - i.x * t.y);
}
function l(t, i) {
  if (u(t, i)) throw new Error("Points of a segment should be distinct");
  return [t, i];
}
function a(t, i) {
  var n = i.h;
  return n.o * t.x + n.l * t.y + n.v > 0 === i.u;
}
function f(t, i) {
  for (var n = 0; n < t.length; n++) if (u(t[n], i)) return !1;
  return (t.push(i), !0);
}
function c(t, i, n) {
  var s = v(t, i, n.t, new h(n.i.x, n.t.y)),
    r = v(t, i, new h(n.i.x, n.t.y), n.i),
    e = v(t, i, n.i, new h(n.t.x, n.i.y)),
    u = v(t, i, new h(n.t.x, n.i.y), n.t),
    o = [];
  if (
    (null !== s && s >= 0 && o.push(s),
    null !== r && r >= 0 && o.push(r),
    null !== e && e >= 0 && o.push(e),
    null !== u && u >= 0 && o.push(u),
    0 === o.length)
  )
    return null;
  o.sort(function (t, i) {
    return t - i;
  });
  var l = w(t, n) ? o[0] : o[o.length - 1];
  return t.addScaled(i.subtract(t), l);
}
function v(t, i, n, s) {
  var h = (function (t, i, n, s) {
    var h = i.subtract(t),
      r = s.subtract(n),
      e = h.x * r.y - h.y * r.x;
    if (Math.abs(e) < 1e-6) return null;
    var u = t.subtract(n);
    return (u.y * r.x - u.x * r.y) / e;
  })(t, i, n, s);
  if (null === h) return null;
  var r = _(n, s, i.subtract(t).scaled(h).add(t));
  return Math.abs(r._) < 1e-6 ? h : null;
}
function d(t, i, n) {
  var s = i.subtract(t),
    h = n.subtract(t).dotProduct(s) / s.dotProduct(s);
  return { M: h, _: t.addScaled(s, h).subtract(n).length() };
}
function _(t, i, n) {
  var s = d(t, i, n);
  if (0 <= s.M && s.M <= 1) return s;
  var h = t.subtract(n).length(),
    r = i.subtract(n).length();
  return h < r ? { M: 0, _: h } : { M: 1, _: r };
}
function w(t, i) {
  return t.x >= i.t.x && t.x <= i.i.x && t.y >= i.t.y && t.y <= i.i.y;
}
function M(t, i) {
  for (
    var n = t.x, s = t.y, h = !1, r = i.length - 1, e = 0;
    e < i.length;
    e++
  ) {
    var u = i[e],
      o = i[r];
    ((r = e),
      ((u.y < s && o.y >= s) || (o.y < s && u.y >= s)) &&
        u.x + ((s - u.y) / (o.y - u.y)) * (o.x - u.x) < n &&
        (h = !h));
  }
  return h;
}
function b(t, i) {
  var n = t.o * i.l - i.o * t.l;
  if (Math.abs(n) < 1e-6) return null;
  var s = (t.l * i.v - i.l * t.v) / n,
    r = (i.o * t.v - t.o * i.v) / n;
  return new h(s, r);
}
function m(t, i) {
  return (
    !(t.length <= 0 || !u(t[t.length - 1], i) || !u(t[0], i)) || (t.push(i), !1)
  );
}
function p(t) {
  return (
    [
      [t.lineWidth, t.lineWidth],
      [2 * t.lineWidth, 2 * t.lineWidth],
      [6 * t.lineWidth, 6 * t.lineWidth],
      [t.lineWidth, 4 * t.lineWidth],
      [2 * t.lineWidth, t.lineWidth],
    ][t.lineStyle - 1] || []
  );
}
function g(t) {
  var i = 1;
  switch (t) {
    case 1:
      i = 3.5;
      break;
    case 2:
      i = 2;
      break;
    case 3:
      i = 1.5;
      break;
    case 4:
      i = 1.25;
  }
  return i;
}
function y(t, i) {
  ((t.lineStyle = i), k(t, p(t)));
}
function k(t, i) {
  t.setLineDash
    ? t.setLineDash(i)
    : void 0 !== t.mozDash
      ? (t.mozDash = i)
      : void 0 !== t.webkitLineDash && (t.webkitLineDash = i);
}
function x(t, i, n, s) {
  t.beginPath();
  var h = t.lineWidth % 2 ? 0.5 : 0;
  (t.moveTo(n, i + h), t.lineTo(s, i + h), t.stroke());
}
function N(t, i, n, s) {
  t.beginPath();
  var h = t.lineWidth % 2 ? 0.5 : 0;
  (t.moveTo(i + h, n), t.lineTo(i + h, s), t.stroke());
}
function S(t, i, n, s, h) {
  isFinite(i) &&
    isFinite(n) &&
    isFinite(s) &&
    isFinite(h) &&
    (0 !== t.lineStyle
      ? (function (t, i, n, s, h) {
          (t.save(),
            t.beginPath(),
            k(t, p(t)),
            t.moveTo(i, n),
            t.lineTo(s, h),
            t.stroke(),
            t.restore());
        })(t, i, n, s, h)
      : (function (t, i, n, s, h) {
          (t.beginPath(), t.moveTo(i, n), t.lineTo(s, h), t.stroke());
        })(t, i, n, s, h));
}
function C(t, i, n, s, e, a) {
  if (u(t, i)) return null;
  var v = new h(0, 0),
    d = new h(n, s);
  if (e) {
    if (a) {
      var _ = (function (t, i) {
        if (0 === t.o) {
          var n = -t.v / t.l;
          return i.t.y <= n && n <= i.i.y
            ? l(new h(i.t.x, n), new h(i.i.x, n))
            : null;
        }
        if (0 === t.l) {
          var s = -t.v / t.o;
          return i.t.x <= s && s <= i.i.x
            ? l(new h(s, i.t.y), new h(s, i.i.y))
            : null;
        }
        var r = [],
          e = function (n) {
            var s = -(t.v + t.o * n) / t.l;
            i.t.y <= s && s <= i.i.y && f(r, new h(n, s));
          },
          o = function (n) {
            var s = -(t.v + t.l * n) / t.o;
            i.t.x <= s && s <= i.i.x && f(r, new h(s, n));
          };
        switch ((e(i.t.x), o(i.t.y), e(i.i.x), o(i.i.y), r.length)) {
          case 0:
            return null;
          case 1:
            return r[0];
          case 2:
            return u(r[0], r[1]) ? r[0] : l(r[0], r[1]);
        }
        throw new Error("We should have at most two intersection points");
      })(o(t, i), new r(v, d));
      return Array.isArray(_) ? _ : null;
    }
    var w;
    return null === (w = c(i, t, new r(v, d))) || u(i, w) ? null : l(i, w);
  }
  if (a) return null === (w = c(t, i, new r(v, d))) || u(t, w) ? null : l(t, w);
  _ = (function (t, i) {
    var n = t[0].x,
      s = t[0].y,
      r = t[1].x,
      e = t[1].y,
      o = i.t.x,
      a = i.t.y,
      f = i.i.x,
      c = i.i.y;
    function v(t, i, n, s, h, r) {
      var e = 0;
      return (
        t < n ? (e |= 1) : t > h && (e |= 2),
        i < s ? (e |= 4) : i > r && (e |= 8),
        e
      );
    }
    for (
      var d = !1, _ = v(n, s, o, a, f, c), w = v(r, e, o, a, f, c), M = 0;
      ;

    ) {
      if (M > 1e3)
        throw new Error("Cohen - Sutherland algorithm: infinity loop");
      if ((M++, !(_ | w))) {
        d = !0;
        break;
      }
      if (_ & w) break;
      var b = _ || w,
        m = void 0,
        p = void 0;
      (8 & b
        ? ((m = n + ((r - n) * (c - s)) / (e - s)), (p = c))
        : 4 & b
          ? ((m = n + ((r - n) * (a - s)) / (e - s)), (p = a))
          : 2 & b
            ? ((p = s + ((e - s) * (f - n)) / (r - n)), (m = f))
            : ((p = s + ((e - s) * (o - n)) / (r - n)), (m = o)),
        b === _
          ? (_ = v((n = m), (s = p), o, a, f, c))
          : (w = v((r = m), (e = p), o, a, f, c)));
    }
    return d
      ? u(new h(n, s), new h(r, e))
        ? new h(n, s)
        : l(new h(n, s), new h(r, e))
      : null;
  })(l(t, i), new r(v, d));
  return Array.isArray(_) ? _ : null;
}
function T(t, i, n, s) {
  var h = g(n);
  (i.save(),
    (i.fillStyle = "#000000"),
    i.beginPath(),
    i.arc(t.x * s, t.y * s, n * h * s, 0, 2 * Math.PI, !1),
    i.fill(),
    i.restore());
}
function L(t, i, n, s, h) {
  if (!(i.subtract(t).length() < 1))
    for (
      var r = (function (t, i, n) {
          var s = 0.5 * n,
            h = Math.sqrt(2),
            r = i.subtract(t),
            e = r.normalized(),
            u = g(n),
            o = 5 * n * u,
            l = 1 * s;
          if (o * h * 0.2 <= l) return [];
          var a = e.scaled(o),
            f = i.subtract(a),
            c = e.transposed(),
            v = 1 * o,
            d = c.scaled(v),
            _ = f.add(d),
            w = f.subtract(d),
            M = _.subtract(i).normalized().scaled(l),
            b = w.subtract(i).normalized().scaled(l),
            m = i.add(M),
            p = i.add(b),
            y = s * (h - 1),
            k = c.scaled(y),
            x = Math.min(o - (1 * s) / h, s * h * 1),
            N = e.scaled(x),
            S = i.subtract(k),
            C = i.add(k),
            T = i.subtract(N);
          return [
            [_, m],
            [w, p],
            [S, T.subtract(k)],
            [C, T.add(k)],
          ];
        })(t, i, s),
        e = 0;
      e < r.length;
      ++e
    ) {
      var u = r[e][0],
        o = r[e][1];
      S(n, u.x * h, u.y * h, o.x * h, o.y * h);
    }
}
function A(t, i) {
  if (!t) throw new Error("Assertion failed" + (i ? ": " + i : ""));
}
function P(t) {
  if (void 0 === t) throw new Error("Value is undefined");
  return t;
}
function F(t) {
  if (null === t) throw new Error("Value is null");
  return t;
}
function D(t) {
  if (void 0 === t) throw new Error("Value is undefined");
  if (null === t) throw new Error("Value is null");
  return t;
}
function $roundFloor(t, i) {
  return Math.round(t * i) - Math.floor(0.5 * i);
}
(!(function (t) {
  ((t[(t.Simple = 0)] = "Simple"), (t[(t.WithSteps = 1)] = "WithSteps"));
})(i || (i = {})),
  (function (t) {
    ((t[(t.Normal = 0)] = "Normal"),
      (t[(t.Arrow = 1)] = "Arrow"),
      (t[(t.Circle = 2)] = "Circle"));
  })(n || (n = {})),
  (function (t) {
    ((t[(t.Solid = 0)] = "Solid"),
      (t[(t.Dotted = 1)] = "Dotted"),
      (t[(t.Dashed = 2)] = "Dashed"),
      (t[(t.LargeDashed = 3)] = "LargeDashed"),
      (t[(t.SparseDotted = 4)] = "SparseDotted"),
      (t[(t.SmallDashed = 5)] = "SmallDashed"));
  })(s || (s = {})));
var B = {
  khaki: "#f0e68c",
  azure: "#f0ffff",
  aliceblue: "#f0f8ff",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gainsboro: "#dcdcdc",
  gray: "#808080",
  green: "#008000",
  honeydew: "#f0fff0",
  floralwhite: "#fffaf0",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lemonchiffon: "#fffacd",
  hotpink: "#ff69b4",
  lightyellow: "#ffffe0",
  greenyellow: "#adff2f",
  lightgoldenrodyellow: "#fafad2",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  lightcyan: "#e0ffff",
  magenta: "#f0f",
  maroon: "#800000",
  olive: "#808000",
  orange: "#ffa500",
  oldlace: "#fdf5e6",
  mediumblue: "#0000cd",
  transparent: "#0000",
  lime: "#0f0",
  lightpink: "#ffb6c1",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  midnightblue: "#191970",
  orchid: "#da70d6",
  mediumorchid: "#ba55d3",
  mediumturquoise: "#48d1cc",
  orangered: "#ff4500",
  royalblue: "#4169e1",
  powderblue: "#b0e0e6",
  red: "#f00",
  coral: "#ff7f50",
  turquoise: "#40e0d0",
  white: "#fff",
  whitesmoke: "#f5f5f5",
  wheat: "#f5deb3",
  teal: "#008080",
  steelblue: "#4682b4",
  bisque: "#ffe4c4",
  aquamarine: "#7fffd4",
  aqua: "#0ff",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  springgreen: "#00ff7f",
  antiquewhite: "#faebd7",
  burlywood: "#deb887",
  brown: "#a52a2a",
  beige: "#f5f5dc",
  chocolate: "#d2691e",
  chartreuse: "#7fff00",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cadetblue: "#5f9ea0",
  tomato: "#ff6347",
  fuchsia: "#f0f",
  blue: "#00f",
  salmon: "#fa8072",
  blanchedalmond: "#ffebcd",
  slateblue: "#6a5acd",
  slategray: "#708090",
  thistle: "#d8bfd8",
  tan: "#d2b48c",
  cyan: "#0ff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  blueviolet: "#8a2be2",
  black: "#000",
  darkmagenta: "#8b008b",
  darkslateblue: "#483d8b",
  darkkhaki: "#bdb76b",
  darkorchid: "#9932cc",
  darkorange: "#ff8c00",
  darkgreen: "#006400",
  darkred: "#8b0000",
  dodgerblue: "#1e90ff",
  darkslategray: "#2f4f4f",
  dimgray: "#696969",
  deepskyblue: "#00bfff",
  firebrick: "#b22222",
  forestgreen: "#228b22",
  indigo: "#4b0082",
  ivory: "#fffff0",
  lavenderblush: "#fff0f5",
  feldspar: "#d19275",
  indianred: "#cd5c5c",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightskyblue: "#87cefa",
  lightslategray: "#789",
  lightslateblue: "#8470ff",
  snow: "#fffafa",
  lightseagreen: "#20b2aa",
  lightsalmon: "#ffa07a",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  mediumpurple: "#9370d8",
  mediumaquamarine: "#66cdaa",
  skyblue: "#87ceeb",
  lavender: "#e6e6fa",
  lightsteelblue: "#b0c4de",
  mediumvioletred: "#c71585",
  mintcream: "#f5fffa",
  navajowhite: "#ffdead",
  navy: "#000080",
  olivedrab: "#6b8e23",
  palevioletred: "#d87093",
  violetred: "#d02090",
  yellow: "#ff0",
  yellowgreen: "#9acd32",
  lawngreen: "#7cfc00",
  pink: "#ffc0cb",
  paleturquoise: "#afeeee",
  palegoldenrod: "#eee8aa",
  darkolivegreen: "#556b2f",
  darkseagreen: "#8fbc8f",
  darkturquoise: "#00ced1",
  peachpuff: "#ffdab9",
  deeppink: "#ff1493",
  violet: "#ee82ee",
  palegreen: "#98fb98",
  mediumseagreen: "#3cb371",
  peru: "#cd853f",
  saddlebrown: "#8b4513",
  sandybrown: "#f4a460",
  rosybrown: "#bc8f8f",
  purple: "#800080",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  papayawhip: "#ffefd5",
  mediumslateblue: "#7b68ee",
  plum: "#dda0dd",
  mediumspringgreen: "#00fa9a",
};
function E(t) {
  return t < 0 ? 0 : t > 255 ? 255 : Math.round(t) || 0;
}
function O(t) {
  return t <= 0 || t > 0
    ? t < 0
      ? 0
      : t > 1
        ? 1
        : Math.round(1e4 * t) / 1e4
    : 0;
}
var z = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,
  R = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,
  W = /^rgb\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*\)$/,
  V =
    /^rgba\(\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?\d{1,10})\s*,\s*(-?[\d]{0,10}(?:\.\d+)?)\s*\)$/;
function I(t) {
  var i;
  if (((t = t.toLowerCase()) in B && (t = B[t]), (i = V.exec(t) || W.exec(t))))
    return [
      E(parseInt(i[1], 10)),
      E(parseInt(i[2], 10)),
      E(parseInt(i[3], 10)),
      O(i.length < 5 ? 1 : parseFloat(i[4])),
    ];
  if ((i = R.exec(t)))
    return [
      E(parseInt(i[1], 16)),
      E(parseInt(i[2], 16)),
      E(parseInt(i[3], 16)),
      1,
    ];
  if ((i = z.exec(t)))
    return [
      E(17 * parseInt(i[1], 16)),
      E(17 * parseInt(i[2], 16)),
      E(17 * parseInt(i[3], 16)),
      1,
    ];
  throw new Error("Cannot parse color: ".concat(t));
}
function j(t, i) {
  if ("transparent" === t) return t;
  var n = I(t),
    s = n[3];
  return "rgba("
    .concat(n[0], ", ")
    .concat(n[1], ", ")
    .concat(n[2], ", ")
    .concat(i * s, ")");
}
function H(t) {
  var i,
    n = I(t);
  return {
    m: "rgb(".concat(n[0], ", ").concat(n[1], ", ").concat(n[2], ")"),
    p:
      ((i = n),
      0.199 * i[0] + 0.687 * i[1] + 0.114 * i[2] > 160 ? "black" : "white"),
  };
}
var J = function (t, i) {
  return (
    (J =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, i) {
          t.__proto__ = i;
        }) ||
      function (t, i) {
        for (var n in i)
          Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
      }),
    J(t, i)
  );
};
function q(t, i) {
  if ("function" != typeof i && null !== i)
    throw new TypeError(
      "Class extends value " + String(i) + " is not a constructor or null",
    );
  function n() {
    this.constructor = t;
  }
  (J(t, i),
    (t.prototype =
      null === i ? Object.create(i) : ((n.prototype = i.prototype), new n())));
}
var U = function () {
  return (
    (U =
      Object.assign ||
      function (t) {
        for (var i, n = 1, s = arguments.length; n < s; n++)
          for (var h in (i = arguments[n]))
            Object.prototype.hasOwnProperty.call(i, h) && (t[h] = i[h]);
        return t;
      }),
    U.apply(this, arguments)
  );
};
function Y(t, i, n) {
  if (n || 2 === arguments.length)
    for (var s, h = 0, r = i.length; h < r; h++)
      (!s && h in i) ||
        (s || (s = Array.prototype.slice.call(i, 0, h)), (s[h] = i[h]));
  return t.concat(s || Array.prototype.slice.call(i));
}
var $ = (function () {
  function t() {
    this.k = [];
  }
  return (
    (t.prototype.N = function (t, i, n) {
      var s = { S: t, C: i, T: !0 === n };
      this.k.push(s);
    }),
    (t.prototype.L = function (t) {
      var i = this.k.findIndex(function (i) {
        return t === i.S;
      });
      i > -1 && this.k.splice(i, 1);
    }),
    (t.prototype.A = function (t) {
      this.k = this.k.filter(function (i) {
        return i.C !== t;
      });
    }),
    (t.prototype.P = function (t, i) {
      var n = Y([], this.k, !0);
      ((this.k = this.k.filter(function (t) {
        return !t.T;
      })),
        n.forEach(function (n) {
          return n.S(t, i);
        }));
    }),
    (t.prototype.F = function () {
      return this.k.length > 0;
    }),
    (t.prototype.D = function () {
      this.k = [];
    }),
    t
  );
})();
function K(t) {
  for (var i = [], n = 1; n < arguments.length; n++) i[n - 1] = arguments[n];
  for (var s = 0, h = i; s < h.length; s++) {
    var r = h[s];
    for (var e in r)
      if (void 0 !== r[e]) {
        var u = r[e],
          o = t[e];
        if (Array.isArray(u) && Array.isArray(o)) {
          u.length < o.length && (o.length = u.length);
          for (var l = 0; l < u.length; l++) {
            var a = u[l],
              f = o[l];
            "object" != typeof a || null === a || void 0 === f
              ? (o[l] = a)
              : "object" == typeof f && null !== f
                ? K(o[l], u[l])
                : (o[l] = u[l]);
          }
        } else
          "object" != typeof u || null === u || void 0 === o
            ? (t[e] = u)
            : K(o, u);
      }
  }
  return t;
}
function X(t) {
  return "number" == typeof t && isFinite(t);
}
function Z(t) {
  return "number" == typeof t && t % 1 == 0;
}
function Q(t) {
  return "string" == typeof t;
}
function G(t) {
  return "boolean" == typeof t;
}
function tt(t) {
  var i,
    n,
    s,
    h = t;
  if (!h || "object" != typeof h) return h;
  for (n in ((i = Array.isArray(h) ? [] : {}), h))
    Object.prototype.hasOwnProperty.call(h, n) &&
      ((s = h[n]), (i[n] = s && "object" == typeof s ? tt(s) : s));
  return i;
}
function it(t) {
  return null !== t;
}
function nt(t) {
  return null === t ? void 0 : t;
}
var st = "'Trebuchet MS', Roboto, Ubuntu, sans-serif";
function ht(t, i, n) {
  return (
    (n = void 0 !== n ? "".concat(n, " ") : ""),
    void 0 === i && (i = st),
    "".concat(n).concat(t, "px ").concat(i)
  );
}
var rt = (function () {
    function t(t) {
      ((this.B = {
        O: 1,
        R: 4,
        W: NaN,
        V: "",
        I: "",
        j: "",
        H: 0,
        J: 0,
        q: 0,
        U: 0,
        Y: 0,
      }),
        (this.$ = t));
    }
    return (
      (t.prototype.K = function () {
        var t = this.B,
          i = this.X(),
          n = this.Z();
        return (
          (t.W === i && t.I === n) ||
            ((t.W = i),
            (t.I = n),
            (t.V = ht(i, n)),
            (t.U = Math.floor(i / 3.5)),
            (t.H = t.U),
            (t.J = Math.max(Math.ceil(i / 2 - t.R / 2), 0)),
            (t.q = Math.ceil(i / 2 + t.R / 2)),
            (t.Y = Math.round(i / 10))),
          (t.j = this.G()),
          this.B
        );
      }),
      (t.prototype.G = function () {
        return this.$.K().layout.textColor;
      }),
      (t.prototype.X = function () {
        return this.$.K().layout.fontSize;
      }),
      (t.prototype.Z = function () {
        return this.$.K().layout.fontFamily;
      }),
      t
    );
  })(),
  et = (function () {
    function t() {
      ((this.tt = []), (this.it = 1));
    }
    return (
      (t.prototype.nt = function (t) {
        this.it = t;
      }),
      (t.prototype.st = function (t) {
        this.tt.push(t);
      }),
      (t.prototype.ht = function (t, i) {
        this.tt.splice(i, 0, t);
      }),
      (t.prototype.rt = function () {
        this.tt.length = 0;
      }),
      (t.prototype.et = function () {
        return 0 === this.tt.length;
      }),
      (t.prototype.ut = function (t) {
        this.tt = t;
      }),
      (t.prototype.ot = function (t, i, n, s) {
        var h = this;
        this.tt.forEach(function (r) {
          (t.save(), (t.globalAlpha = h.it), r.ot(t, i, n, s), t.restore());
        });
      }),
      (t.prototype.lt = function (t, i, n) {
        for (var s = null, h = this.tt.length - 1; h >= 0; h--) {
          var r = this.tt[h];
          if ((r.lt && (s = r.lt(t, i, n) || null), s)) break;
        }
        return s;
      }),
      t
    );
  })(),
  ut = (function () {
    function t() {}
    return (
      (t.prototype.ot = function (t, i, n, s) {
        (t.save(), t.scale(i, i), this.ft(t, n, s), t.restore());
      }),
      (t.prototype.ct = function (t, i, n, s) {
        (t.save(), t.scale(i, i), this.vt(t, n, s), t.restore());
      }),
      (t.prototype.vt = function (_t, _i, _n) {}),
      t
    );
  })(),
  ot = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.dt = null), i);
    }
    return (
      q(i, t),
      (i.prototype._t = function (t) {
        this.dt = t;
      }),
      (i.prototype.ft = function (t) {
        if (null !== this.dt && null !== this.dt.wt) {
          var i = this.dt.wt,
            n = this.dt,
            s = function (s) {
              t.beginPath();
              for (var h = i.to - 1; h >= i.from; --h) {
                var r = n.Mt[h];
                (t.moveTo(r.bt, r.gt), t.arc(r.bt, r.gt, s, 0, 2 * Math.PI));
              }
              t.fill();
            };
          ((t.fillStyle = n.yt), s(n.kt + 2), (t.fillStyle = n.xt), s(n.kt));
        }
      }),
      i
    );
  })(ut);
function lt() {
  return {
    Mt: [{ bt: 0, gt: 0, Nt: 0, St: 0 }],
    xt: "",
    yt: "",
    kt: 0,
    wt: null,
  };
}
var at = { from: 0, to: 1 },
  ft = (function () {
    function t(t, i) {
      ((this.Ct = new et()),
        (this.Tt = []),
        (this.Lt = []),
        (this.At = !0),
        (this.$ = t),
        (this.Pt = i),
        this.Ct.ut(this.Tt));
    }
    return (
      (t.prototype.Ft = function (_t) {
        var i = this.$.Dt();
        (i.length !== this.Tt.length &&
          ((this.Lt = i.map(lt)),
          (this.Tt = this.Lt.map(function (t) {
            var i = new ot();
            return (i._t(t), i);
          })),
          this.Ct.ut(this.Tt)),
          (this.At = !0));
      }),
      (t.prototype.Bt = function (t, _i, _n) {
        return (this.At && (this.Et(t), (this.At = !1)), this.Ct);
      }),
      (t.prototype.Et = function (t) {
        var i = this,
          n = this.$.Dt(),
          s = this.Pt.Ot(),
          h = this.$.zt();
        n.forEach(function (n, r) {
          var e,
            u = i.Lt[r],
            o = n.Rt(s);
          if (null !== o && n.Wt()) {
            var l = F(n.Vt());
            ((u.xt = o.It),
              (u.kt = o.kt),
              (u.Mt[0].St = o.St),
              (u.Mt[0].gt = n.Ht().jt(o.St, l.Jt)),
              (u.yt =
                null !== (e = o.qt) && void 0 !== e
                  ? e
                  : i.$.Ut(u.Mt[0].gt / t)),
              (u.Mt[0].Nt = s),
              (u.Mt[0].bt = h.Yt(s)),
              (u.wt = at));
          } else u.wt = null;
        });
      }),
      t
    );
  })(),
  ct = (function () {
    function t(t) {
      this.$t = t;
    }
    return (
      (t.prototype.ot = function (t, i, _n, _s) {
        if (null !== this.$t) {
          var h = this.$t.Kt.Wt,
            r = this.$t.Xt.Wt;
          if (h || r) {
            t.save();
            var e = Math.round(this.$t.bt * i),
              u = Math.round(this.$t.gt * i),
              o = Math.ceil(this.$t.Zt * i),
              l = Math.ceil(this.$t.Qt * i);
            ((t.lineCap = "butt"),
              h &&
                e >= 0 &&
                ((t.lineWidth = Math.floor(this.$t.Kt.Gt * i)),
                (t.strokeStyle = this.$t.Kt.j),
                (t.fillStyle = this.$t.Kt.j),
                y(t, this.$t.Kt.ti),
                N(t, e, 0, l)),
              r &&
                u >= 0 &&
                ((t.lineWidth = Math.floor(this.$t.Xt.Gt * i)),
                (t.strokeStyle = this.$t.Xt.j),
                (t.fillStyle = this.$t.Xt.j),
                y(t, this.$t.Xt.ti),
                x(t, u, 0, o)),
              t.restore());
          }
        }
      }),
      t
    );
  })(),
  vt = (function () {
    function t(t) {
      ((this.At = !0),
        (this.ii = {
          Kt: { Gt: 1, ti: 0, j: "", Wt: !1 },
          Xt: { Gt: 1, ti: 0, j: "", Wt: !1 },
          Zt: 0,
          Qt: 0,
          bt: 0,
          gt: 0,
        }),
        (this.ni = new ct(this.ii)),
        (this.si = t));
    }
    return (
      (t.prototype.Ft = function () {
        this.At = !0;
      }),
      (t.prototype.Bt = function (_t, _i) {
        return (this.At && (this.Et(), (this.At = !1)), this.ni);
      }),
      (t.prototype.Et = function () {
        var t = this.si.Wt(),
          i = F(this.si.hi()),
          n = i.ri().K().crosshair,
          s = this.ii;
        ((s.Xt.Wt = t && this.si.ei(i)),
          (s.Kt.Wt = t && this.si.ui()),
          (s.Xt.Gt = n.horzLine.width),
          (s.Xt.ti = n.horzLine.style),
          (s.Xt.j = n.horzLine.color),
          (s.Kt.Gt = n.vertLine.width),
          (s.Kt.ti = n.vertLine.style),
          (s.Kt.j = n.vertLine.color),
          (s.Zt = i.oi()),
          (s.Qt = i.li()),
          (s.bt = this.si.ai()),
          (s.gt = this.si.fi()));
      }),
      t
    );
  })();
function dt(t, i, n, s, h, r) {
  (t.fillRect(i + r, n, s - 2 * r, r),
    t.fillRect(i + r, n + h - r, s - 2 * r, r),
    t.fillRect(i, n, r, h),
    t.fillRect(i + s - r, n, r, h));
}
function _t(t, i, n) {
  (t.save(), t.scale(i, i), n(), t.restore());
}
function wt(t, i, n, s, h, r) {
  (t.save(),
    (t.globalCompositeOperation = "copy"),
    (t.fillStyle = r),
    t.fillRect(i, n, s, h),
    t.restore());
}
function Mt(t, i, n, s, h, r, e) {
  (t.save(), (t.globalCompositeOperation = "copy"));
  var u = t.createLinearGradient(0, 0, 0, h);
  (u.addColorStop(0, r),
    u.addColorStop(1, e),
    (t.fillStyle = u),
    t.fillRect(i, n, s, h),
    t.restore());
}
var bt = (function () {
    function t(t, i) {
      this._t(t, i);
    }
    return (
      (t.prototype._t = function (t, i) {
        ((this.$t = t), (this.ci = i));
      }),
      (t.prototype.ot = function (t, i, n, s, h, r) {
        if (this.$t.Wt) {
          t.font = i.V;
          var e = this.$t.di || !this.$t._i ? i.R : 0,
            u = i.O,
            o = i.U,
            l = i.H,
            a = i.J,
            f = i.q,
            c = this.$t.wi,
            v = Math.ceil(n.Mi(t, c)),
            d = i.Y,
            _ = i.W + o + l,
            w = Math.ceil(0.5 * _),
            M = u + v + a + f + e,
            b = this.ci.bi;
          this.ci.mi && (b = this.ci.mi);
          var m,
            p,
            g = (b = Math.round(b)) - w,
            y = g + _,
            k = "right" === h,
            x = k ? s : 0,
            N = Math.ceil(s * r),
            S = x;
          if (
            ((t.fillStyle = this.ci.m),
            (t.lineWidth = 1),
            (t.lineCap = "butt"),
            c)
          ) {
            k
              ? ((m = x - e), (p = (S = x - M) + f))
              : ((S = x + M), (m = x + e), (p = x + u + e + a));
            var C = Math.max(1, Math.floor(r)),
              T = Math.max(1, Math.floor(u * r)),
              L = k ? N : 0,
              A = Math.round(g * r),
              P = Math.round(S * r),
              F = $roundFloor(b, r),
              D = F + C + (F - A),
              B = Math.round(m * r);
            (t.save(),
              t.beginPath(),
              t.moveTo(L, A),
              t.lineTo(P, A),
              t.lineTo(P, D),
              t.lineTo(L, D),
              t.fill(),
              (t.fillStyle = this.$t.qt),
              t.fillRect(k ? N - T : 0, A, T, D - A),
              this.$t.di &&
                ((t.fillStyle = this.ci.j), t.fillRect(L, F, B - L, C)),
              (t.textAlign = "left"),
              (t.fillStyle = this.ci.j),
              _t(t, r, function () {
                t.fillText(c, p, y - l - d);
              }),
              t.restore());
          }
        }
      }),
      (t.prototype.li = function (t, _i) {
        return this.$t.Wt ? t.W + t.U + t.H : 0;
      }),
      t
    );
  })(),
  mt = (function () {
    function t(t) {
      ((this.pi = { bi: 0, j: "#FFF", m: "#000" }),
        (this.gi = { wi: "", Wt: !1, di: !0, _i: !1, qt: "" }),
        (this.yi = { wi: "", Wt: !1, di: !1, _i: !0, qt: "" }),
        (this.At = !0),
        (this.ki = new (t || bt)(this.gi, this.pi)),
        (this.xi = new (t || bt)(this.yi, this.pi)));
    }
    return (
      (t.prototype.wi = function () {
        return (this.Ni(), this.gi.wi);
      }),
      (t.prototype.bi = function () {
        return (this.Ni(), this.pi.bi);
      }),
      (t.prototype.Ft = function () {
        this.At = !0;
      }),
      (t.prototype.li = function (t, i) {
        return (
          void 0 === i && (i = !1),
          Math.max(this.ki.li(t, i), this.xi.li(t, i))
        );
      }),
      (t.prototype.Si = function () {
        return this.pi.mi || 0;
      }),
      (t.prototype.Ci = function (t) {
        this.pi.mi = t;
      }),
      (t.prototype.Ti = function () {
        return (this.Ni(), this.gi.Wt || this.yi.Wt);
      }),
      (t.prototype.Li = function () {
        return (this.Ni(), this.gi.Wt);
      }),
      (t.prototype.Bt = function (t) {
        return (
          this.Ni(),
          (this.gi.di = this.gi.di && t.K().drawTicks),
          (this.yi.di = this.yi.di && t.K().drawTicks),
          this.ki._t(this.gi, this.pi),
          this.xi._t(this.yi, this.pi),
          this.ki
        );
      }),
      (t.prototype.Ai = function () {
        return (
          this.Ni(),
          this.ki._t(this.gi, this.pi),
          this.xi._t(this.yi, this.pi),
          this.xi
        );
      }),
      (t.prototype.Ni = function () {
        this.At &&
          ((this.gi.di = !0),
          (this.yi.di = !1),
          this.Pi(this.gi, this.yi, this.pi));
      }),
      t
    );
  })(),
  pt = (function (t) {
    function i(i, n, s) {
      var h = t.call(this) || this;
      return ((h.si = i), (h.Fi = n), (h.Di = s), h);
    }
    return (
      q(i, t),
      (i.prototype.Pi = function (t, i, n) {
        t.Wt = !1;
        var s = this.si.K().horzLine;
        if (s.labelVisible) {
          var h = this.Fi.Vt();
          if (this.si.Wt() && !this.Fi.et() && null !== h) {
            var r = H(s.labelBackgroundColor);
            ((n.m = r.m), (n.j = r.p));
            var e = this.Di(this.Fi);
            ((n.bi = e.bi), (t.wi = this.Fi.Bi(e.St, h)), (t.Wt = !0));
          }
        }
      }),
      i
    );
  })(mt),
  gt = /[1-9]/g,
  yt = (function () {
    function t() {
      this.$t = null;
    }
    return (
      (t.prototype._t = function (t) {
        this.$t = t;
      }),
      (t.prototype.ot = function (t, i, n) {
        var s = this;
        if (null !== this.$t && !1 !== this.$t.Wt && 0 !== this.$t.wi.length) {
          t.font = i.V;
          var h = Math.round(i.Ei.Mi(t, this.$t.wi, gt));
          if (!(h <= 0)) {
            t.save();
            var r = i.Oi,
              e = h + 2 * r,
              u = e / 2,
              o = this.$t.oi,
              l = this.$t.bi,
              a = Math.floor(l - u) + 0.5;
            a < 0
              ? ((l += Math.abs(0 - a)), (a = Math.floor(l - u) + 0.5))
              : a + e > o &&
                ((l -= Math.abs(o - (a + e))), (a = Math.floor(l - u) + 0.5));
            var f = a + e,
              c = 0 + i.O + i.U + i.W + i.H;
            t.fillStyle = this.$t.m;
            var v = Math.round(a * n),
              d = Math.round(0 * n),
              _ = Math.round(f * n),
              w = Math.round(c * n);
            t.fillRect(v, d, _ - v, w - d);
            var M = Math.round(this.$t.bi * n),
              b = d,
              m = Math.round((b + i.O + i.R) * n);
            t.fillStyle = this.$t.j;
            var p = Math.max(1, Math.floor(n)),
              g = Math.floor(0.5 * n);
            t.fillRect(M - g, b, p, m - b);
            var y = c - i.Y - i.H;
            ((t.textAlign = "left"),
              (t.fillStyle = this.$t.j),
              _t(t, n, function () {
                t.fillText(F(s.$t).wi, a + r, y);
              }),
              t.restore());
          }
        }
      }),
      t
    );
  })(),
  kt = (function () {
    function t(t, i, n) {
      ((this.At = !0),
        (this.ni = new yt()),
        (this.ii = {
          Wt: !1,
          m: "#4c525e",
          j: "white",
          wi: "",
          oi: 0,
          bi: NaN,
        }),
        (this.Pt = t),
        (this.zi = i),
        (this.Di = n));
    }
    return (
      (t.prototype.Ft = function () {
        this.At = !0;
      }),
      (t.prototype.Bt = function () {
        return (
          this.At && (this.Et(), (this.At = !1)),
          this.ni._t(this.ii),
          this.ni
        );
      }),
      (t.prototype.Et = function () {
        var t = this.ii;
        t.Wt = !1;
        var i = this.Pt.K().vertLine;
        if (i.labelVisible) {
          var n = this.zi.zt();
          if (!n.et()) {
            var s = n.Ri(this.Pt.Ot());
            t.oi = n.oi();
            var h = this.Di();
            ((t.bi = h.bi),
              (t.bi = n.Wi(F(s))),
              (t.wi = n.Vi(F(s))),
              (t.Wt = !0));
            var r = H(i.labelBackgroundColor);
            ((t.m = r.m), (t.j = r.p));
          }
        }
      }),
      t
    );
  })(),
  xt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var Nt,
  St = (function () {
    function t() {
      ((this.Ii = null),
        (this.ji = (function (t) {
          for (var i = "", n = 0; n < t; ++n) {
            var s = Math.floor(62 * Math.random());
            i += xt[s];
          }
          return i;
        })(6)),
        (this.Hi = 0));
    }
    return (
      (t.prototype.Ji = function () {
        return this.ji;
      }),
      (t.prototype.qi = function (t) {
        this.ji = t;
      }),
      (t.prototype.Ui = function () {
        return this.Hi;
      }),
      (t.prototype.Yi = function (t) {
        this.Hi = t;
      }),
      (t.prototype.Ht = function () {
        return this.Ii;
      }),
      (t.prototype.$i = function (t) {
        this.Ii = t;
      }),
      (t.prototype.Ki = function () {
        return [];
      }),
      (t.prototype.Wt = function () {
        return !0;
      }),
      t
    );
  })();
!(function (t) {
  ((t[(t.Normal = 0)] = "Normal"), (t[(t.Magnet = 1)] = "Magnet"));
})(Nt || (Nt = {}));
var Ct = (function (t) {
  function i(i, n) {
    var s = t.call(this) || this;
    ((s.Xi = null),
      (s.Zi = NaN),
      (s.Qi = 0),
      (s.Gi = !0),
      (s.tn = new Map()),
      (s.nn = !1),
      (s.sn = NaN),
      (s.hn = NaN),
      (s.rn = NaN),
      (s.en = NaN),
      (s.zi = i),
      (s.un = n),
      (s.ln = new ft(i, s)));
    var h, r;
    s.an =
      ((h = function () {
        return s.Zi;
      }),
      (r = function () {
        return s.hn;
      }),
      function (t) {
        var i = r(),
          n = h();
        if (t === F(s.Xi).fn()) return { St: n, bi: i };
        var e = F(t.Vt());
        return { St: t.cn(i, e), bi: i };
      });
    var e = (function (t, i) {
      return function () {
        return { Nt: s.zi.zt().vn(t()), bi: i() };
      };
    })(
      function () {
        return s.Qi;
      },
      function () {
        return s.ai();
      },
    );
    return ((s.dn = new kt(s, i, e)), (s._n = new vt(s)), s);
  }
  return (
    q(i, t),
    (i.prototype.K = function () {
      return this.un;
    }),
    (i.prototype.wn = function (t, i) {
      ((this.rn = t), (this.en = i));
    }),
    (i.prototype.Mn = function () {
      ((this.rn = NaN), (this.en = NaN));
    }),
    (i.prototype.bn = function () {
      return this.rn;
    }),
    (i.prototype.mn = function () {
      return this.en;
    }),
    (i.prototype.pn = function (t, i, n) {
      (this.nn || (this.nn = !0), (this.Gi = !0), this.gn(t, i, n));
    }),
    (i.prototype.Ot = function () {
      return this.Qi;
    }),
    (i.prototype.ai = function () {
      return this.sn;
    }),
    (i.prototype.fi = function () {
      return this.hn;
    }),
    (i.prototype.Wt = function () {
      return this.Gi;
    }),
    (i.prototype.yn = function () {
      ((this.Gi = !1),
        this.kn(),
        (this.Zi = NaN),
        (this.sn = NaN),
        (this.hn = NaN),
        (this.Xi = null),
        this.Mn());
    }),
    (i.prototype.xn = function (_t) {
      return null !== this.Xi ? [this._n, this.ln] : [];
    }),
    (i.prototype.ei = function (t) {
      return t === this.Xi && this.un.horzLine.visible;
    }),
    (i.prototype.ui = function () {
      return this.un.vertLine.visible;
    }),
    (i.prototype.Nn = function (t, i) {
      (this.Gi && this.Xi === t) || this.tn.clear();
      var n = [];
      return (this.Xi === t && n.push(this.Sn(this.tn, i, this.an)), n);
    }),
    (i.prototype.Ki = function () {
      return this.Gi ? [this.dn] : [];
    }),
    (i.prototype.hi = function () {
      return this.Xi;
    }),
    (i.prototype.Cn = function () {
      (this._n.Ft(),
        this.tn.forEach(function (t) {
          return t.Ft();
        }),
        this.dn.Ft(),
        this.ln.Ft());
    }),
    (i.prototype.Tn = function (t) {
      return t && !t.fn().et() ? t.fn() : null;
    }),
    (i.prototype.gn = function (t, i, n) {
      this.Ln(t, i, n) && this.Cn();
    }),
    (i.prototype.Ln = function (t, i, n) {
      var s = this.sn,
        h = this.hn,
        r = this.Zi,
        e = this.Qi,
        u = this.Xi,
        o = this.Tn(n);
      ((this.Qi = t),
        (this.sn = isNaN(t) ? NaN : this.zi.zt().Yt(t)),
        (this.Xi = n));
      var l = null !== o ? o.Vt() : null;
      return (
        null !== o && null !== l
          ? ((this.Zi = i), (this.hn = o.jt(i, l)))
          : ((this.Zi = NaN), (this.hn = NaN)),
        s !== this.sn ||
          h !== this.hn ||
          e !== this.Qi ||
          r !== this.Zi ||
          u !== this.Xi
      );
    }),
    (i.prototype.kn = function () {
      var t = this.zi
          .Dt()
          .map(function (t) {
            return t.Pn().An();
          })
          .filter(it),
        i = 0 === t.length ? null : Math.max.apply(Math, t);
      this.Qi = null !== i ? i : NaN;
    }),
    (i.prototype.Sn = function (t, i, n) {
      var s = t.get(i);
      return (void 0 === s && ((s = new pt(this, i, n)), t.set(i, s)), s);
    }),
    i
  );
})(St);
function Tt(t) {
  return "left" === t || "right" === t;
}
var Lt = (function () {
    function t(t) {
      ((this.Fn = new Map()), (this.Dn = []), (this.Bn = t));
    }
    return (
      (t.prototype.En = function (t, i) {
        var n = (function (t, i) {
          return void 0 === t
            ? i
            : { On: Math.max(t.On, i.On), zn: t.zn || i.zn };
        })(this.Fn.get(t), i);
        this.Fn.set(t, n);
      }),
      (t.prototype.Rn = function () {
        return this.Bn;
      }),
      (t.prototype.Wn = function (t) {
        var i = this.Fn.get(t);
        return void 0 === i
          ? { On: this.Bn }
          : { On: Math.max(this.Bn, i.On), zn: i.zn };
      }),
      (t.prototype.Vn = function () {
        this.Dn = [{ In: 0 }];
      }),
      (t.prototype.jn = function (t) {
        this.Dn = [{ In: 1, Jt: t }];
      }),
      (t.prototype.Hn = function () {
        this.Dn = [{ In: 4 }];
      }),
      (t.prototype.Jn = function (t) {
        this.Dn.push({ In: 2, Jt: t });
      }),
      (t.prototype.qn = function (t) {
        this.Dn.push({ In: 3, Jt: t });
      }),
      (t.prototype.Un = function () {
        return this.Dn;
      }),
      (t.prototype.Yn = function (t) {
        for (var i = this, n = 0, s = t.Dn; n < s.length; n++) {
          var h = s[n];
          this.$n(h);
        }
        ((this.Bn = Math.max(this.Bn, t.Bn)),
          t.Fn.forEach(function (t, n) {
            i.En(n, t);
          }));
      }),
      (t.prototype.$n = function (t) {
        switch (t.In) {
          case 0:
            this.Vn();
            break;
          case 1:
            this.jn(t.Jt);
            break;
          case 2:
            this.Jn(t.Jt);
            break;
          case 3:
            this.qn(t.Jt);
            break;
          case 4:
            this.Hn();
        }
      }),
      t
    );
  })(),
  At = {
    value: "",
    padding: 0,
    wordWrapWidth: 0,
    forceTextAlign: !1,
    forceCalculateMaxLineWidth: !1,
    alignment: "left",
    font: { family: st, color: "#2962ff", size: 12, bold: !1, italic: !1 },
    box: {
      scale: 1,
      angle: 0,
      alignment: { vertical: "top", horizontal: "left" },
    },
  },
  Pt = {
    visible: !0,
    editable: !0,
    line: {
      width: 1,
      color: "#2962ff",
      style: 0,
      extend: { left: !1, right: !1 },
      end: { left: 0, right: 0 },
    },
    text: At,
  },
  Ft = {
    visible: !0,
    editable: !0,
    line: {
      width: 2,
      color: "rgba(74,144,226,1)",
      style: 0,
      extend: { left: !1, right: !1 },
      end: { left: 1, right: 0 },
    },
    text: {
      value: "this is some text",
      padding: 0,
      wordWrapWidth: 150,
      forceTextAlign: !1,
      forceCalculateMaxLineWidth: !0,
      alignment: "left",
      font: {
        family: st,
        color: "rgba(255,255,255,1)",
        size: 14,
        bold: !1,
        italic: !1,
      },
      box: {
        scale: 1,
        angle: 0,
        alignment: { vertical: "middle", horizontal: "center" },
        offset: { x: 0, y: 0 },
        padding: { x: 0, y: 0 },
        maxHeight: 500,
        shadow: {
          blur: 0,
          color: "rgba(255,255,255,1)",
          offset: { x: 0, y: 0 },
        },
        border: {
          color: "rgba(74,144,226,1)",
          width: 4,
          radius: 20,
          highlight: !1,
          style: 0,
        },
        background: { color: "rgba(19,73,133,1)", inflation: { x: 10, y: 10 } },
      },
    },
  },
  Dt = {
    visible: !0,
    editable: !0,
    line: {
      width: 1,
      color: "#2962ff",
      style: 0,
      extend: { left: !0, right: !0 },
      end: { left: 0, right: 0 },
    },
    text: At,
  },
  Bt = {
    visible: !0,
    editable: !0,
    showMiddleLine: !0,
    extend: { left: !1, right: !1 },
    background: { color: j("#2962ff", 0.2) },
    middleLine: { width: 1, color: "#2962ff", style: 2 },
    channelLine: { width: 1, color: "#2962ff", style: 0 },
  },
  Et = {
    visible: !0,
    editable: !0,
    rectangle: {
      extend: { left: !1, right: !1 },
      background: { color: j("#9c27b0", 0.2) },
      border: { width: 1, style: 0, color: "#9c27b0" },
    },
    text: At,
  },
  Ot = {
    visible: !0,
    editable: !0,
    showAutoText: !0,
    entryStopLossRectangle: {
      background: { color: j("red", 0.2) },
      border: { width: 1, style: 0, color: "red" },
      extend: { left: !1, right: !1 },
    },
    entryPtRectangle: {
      background: { color: j("green", 0.2) },
      border: { width: 1, style: 0, color: "green" },
      extend: { left: !1, right: !1 },
    },
    entryStopLossText: tt(At),
    entryPtText: tt(At),
    risk: 0,
    symbol: "",
  },
  zt = {
    visible: !0,
    editable: !0,
    circle: {
      extend: { left: !1, right: !1 },
      background: { color: j("#9c27b0", 0.2) },
      border: { width: 1, style: 0, color: "#9c27b0" },
    },
    text: At,
  },
  Rt = {
    visible: !0,
    editable: !0,
    priceRange: {
      extend: { left: !1, right: !1 },
      background: { color: j("#9c27b0", 0.2) },
      border: { width: 1, style: 0, color: "#9c27b0" },
      showCenterHorizontalLine: !0,
      showCenterVerticalLine: !0,
      centerHorizontalLineWidth: 1,
      centerHorizontalLineStyle: 1,
    },
    text: At,
  },
  Wt = {
    visible: !0,
    editable: !0,
    marketDepth: {
      lineWidth: 1,
      lineStyle: 0,
      lineOffset: 30,
      lineLength: 300,
      lineBidColor: j("#2a7a81", 1),
      lineAskColor: j("#d24949", 1),
      timestampStartOffset: 50,
      totalBidAskCalcMethod: "combined",
      marketDepthData: { Bids: [], Asks: [] },
    },
    text: At,
  },
  Vt = {
    visible: !0,
    editable: !0,
    triangle: {
      background: { color: j("#f57c00", 0.2) },
      border: { width: 1, style: 0, color: "#f57c00" },
    },
  },
  It = {
    visible: !0,
    editable: !0,
    text: At,
    line: { width: 1, color: "#2962ff", style: 0 },
  },
  jt = { visible: !0, editable: !0, line: { color: j("#f23645", 0.15) } },
  Ht = { visible: !0, editable: !0, text: K(tt(At), { value: "Text" }) },
  Jt = {
    Ray: K(tt(Pt), { line: { extend: { right: !0 } } }),
    Arrow: K(tt(Pt), { line: { end: { right: 1 } } }),
    ExtendedLine: K(tt(Pt), { line: { extend: { right: !0, left: !0 } } }),
    HorizontalRay: K(tt(Dt), { line: { extend: { left: !1 } } }),
    FibRetracement: {
      visible: !0,
      editable: !0,
      extend: { left: !1, right: !1 },
      line: { width: 1, style: 0 },
      levels: [
        {
          color: "#787b86",
          coeff: 0,
          opacity: 0,
          distanceFromCoeffEnabled: !1,
          distanceFromCoeff: 0,
        },
        {
          color: "#81c784",
          coeff: 0.382,
          opacity: 0,
          distanceFromCoeffEnabled: !1,
          distanceFromCoeff: 0,
        },
        {
          color: "#4caf50",
          coeff: 0.5,
          opacity: 0,
          distanceFromCoeffEnabled: !1,
          distanceFromCoeff: 0,
        },
        {
          color: "#089981",
          coeff: 0.618,
          opacity: 0,
          distanceFromCoeffEnabled: !1,
          distanceFromCoeff: 0,
        },
        {
          color: "#787b86",
          coeff: 1,
          opacity: 0,
          distanceFromCoeffEnabled: !1,
          distanceFromCoeff: 0,
        },
        {
          color: "#2962ff",
          coeff: 1.618,
          opacity: 0,
          distanceFromCoeffEnabled: !1,
          distanceFromCoeff: 0,
        },
      ],
      tradeStrategy: {
        enabled: !1,
        longOrShort: "",
        fibBracketOrders: [
          {
            uniqueId: null,
            conditionLevelCoeff: null,
            conditionLevelPrice: 0,
            entryLevelCoeff: null,
            entryLevelPrice: 0,
            stopMethod: "fib",
            stopLevelCoeff: null,
            stopPriceInput: null,
            stopPointsInput: null,
            finalStopPrice: 0,
            ptMethod: "fib",
            ptLevelCoeff: null,
            ptPriceInput: null,
            ptPointsInput: null,
            finalPtPrice: 0,
            isMoveStopToEnabled: !1,
            moveStopToMethod: "fib",
            moveStopToLevelCoeff: null,
            moveStopToPriceInput: null,
            moveStopToPointsInput: null,
            finalMoveStopToPrice: 0,
            triggerBracketUniqueId: null,
          },
        ],
      },
    },
    ParallelChannel: Bt,
    HorizontalLine: Dt,
    VerticalLine: It,
    Highlighter: jt,
    CrossLine: {
      visible: !0,
      editable: !0,
      line: { width: 1, color: "#2962ff", style: 0 },
    },
    TrendLine: Pt,
    Callout: Ft,
    Rectangle: Et,
    LongShortPosition: Ot,
    Circle: zt,
    PriceRange: Rt,
    Triangle: Vt,
    Brush: {
      visible: !0,
      editable: !0,
      line: {
        width: 1,
        color: "#00bcd4",
        join: "round",
        style: 0,
        end: { left: 0, right: 0 },
      },
    },
    Path: {
      visible: !0,
      editable: !0,
      line: {
        width: 1,
        color: "#2962ff",
        style: 0,
        end: { left: 0, right: 1 },
      },
    },
    Text: Ht,
    MarketDepth: Wt,
  },
  qt = (function () {
    function t() {
      this.$t = null;
    }
    return (
      (t.prototype._t = function (t) {
        this.$t = t;
      }),
      (t.prototype.ct = function (t, i, n) {
        if (null !== this.$t && !1 !== this.$t.Wt) {
          var s = this.$t,
            h = s.bi,
            r = s.li,
            e = s.j,
            u = t.canvas.clientWidth;
          _t(t, n, function () {
            ((t.fillStyle = e), t.fillRect(0, h, u, r));
          });
        }
      }),
      t
    );
  })(),
  Ut = (function (t) {
    function i(i) {
      var n = t.call(this) || this;
      return (
        (n.Kn = new qt()),
        (n.Xn = { j: "rgba(41, 98, 255, 0.25)", Wt: !1, bi: 0, li: 0 }),
        (n.Zn = i),
        (n.Qn = i.ri()),
        n.Kn._t(n.Xn),
        n
      );
    }
    return (
      q(i, t),
      (i.prototype.Pi = function () {
        this.Xn.Wt = !1;
        var t = this.Zn.Ht();
        if (t && !t.et() && this.Zn.Gn()) {
          var i = this.Zn.ts().map(function (i) {
              return t.jt(i.price, i.price);
            }),
            n = Math.max.apply(Math, i),
            s = Math.min.apply(Math, i);
          ((this.Xn.bi = s), (this.Xn.li = n - s), (this.Xn.Wt = !0));
        }
      }),
      i
    );
  })(mt),
  Yt = (function (t) {
    function i(i, n) {
      var s = t.call(this) || this;
      return ((s.ns = !1), (s.ns = !1), (s.Zn = i), (s.ss = n), s);
    }
    return (
      q(i, t),
      (i.prototype.hs = function (t) {
        this.ns = t;
      }),
      (i.prototype.Pi = function (t, i, n) {
        var s;
        t.Wt = !1;
        var h = this.Zn.ri();
        if (h.zt() && !h.zt().et()) {
          var r = this.rs();
          if (null !== r) {
            var e = this.Zn.Ht();
            if (null !== e && !e.et() && null !== h.zt().es()) {
              var u = this.Zn.ts();
              if (!(u.length <= this.ss)) {
                var o = u[this.ss];
                if (isFinite(o.price)) {
                  var l = this.Zn.us(),
                    a = null !== l ? l.Vt() : null;
                  null !== a &&
                    ((n.m = r),
                    (n.j = H(n.m).p),
                    (n.bi = e.jt(o.price, a.Jt)),
                    (t.wi =
                      (null === (s = this.Zn.Ht()) || void 0 === s
                        ? void 0
                        : s.Bi(o.price, a.Jt)) || ""),
                    (t.Wt = !0));
                }
              }
            }
          }
        }
      }),
      (i.prototype.rs = function () {
        return this.Zn.ls();
      }),
      i
    );
  })(mt),
  $t = (function () {
    function t() {
      this.$t = null;
    }
    return (
      (t.prototype._t = function (t) {
        this.$t = t;
      }),
      (t.prototype.ot = function (t, i, n) {
        if (null !== this.$t && !1 !== this.$t.Wt) {
          var s = this.$t,
            h = s.bi,
            r = s.oi,
            e = s.j,
            u = t.canvas.clientHeight;
          _t(t, n, function () {
            ((t.fillStyle = e), t.fillRect(h, 0, r, u));
          });
        }
      }),
      t
    );
  })(),
  Kt = (function () {
    function t(t) {
      ((this.Kn = new $t()),
        (this.fs = !0),
        (this.Xn = { j: "rgba(41, 98, 255, 0.25)", Wt: !1, bi: 0, oi: 0 }),
        (this.Zn = t),
        (this.Qn = t.ri()),
        this.Kn._t(this.Xn));
    }
    return (
      (t.prototype.Ft = function () {
        this.fs = !0;
      }),
      (t.prototype.Bt = function () {
        return (this.fs && this.cs(), (this.fs = !1), this.Kn);
      }),
      (t.prototype.cs = function () {
        var t = this;
        if (((this.Xn.Wt = !1), !this.Qn.zt().et() && this.Zn.Gn())) {
          var i = this.Zn.vs().map(function (i) {
              return t.Qn.zt().Wi({ timestamp: i.timestamp });
            }),
            n = Math.max.apply(Math, i),
            s = Math.min.apply(Math, i);
          ((this.Xn.bi = s),
            (this.Xn.oi = n - s),
            (this.Xn.Wt = !0),
            (this.fs = !1));
        }
      }),
      t
    );
  })(),
  Xt = (function () {
    function t(t, i, n) {
      ((this.Kn = new yt()),
        (this.fs = !0),
        (this.Xn = { m: "", bi: 0, j: "", wi: "", oi: 0, Wt: !1, di: !1 }),
        (this.Qn = t),
        (this.Zn = i),
        (this.ss = n),
        this.Kn._t(this.Xn));
    }
    return (
      (t.prototype.Ft = function () {
        this.fs = !0;
      }),
      (t.prototype.Bt = function () {
        return (this.fs && this.cs(), (this.fs = !1), this.Kn);
      }),
      (t.prototype.cs = function () {
        if (((this.Xn.Wt = !1), !this.Qn.zt().et())) {
          var t = this.rs();
          if (null !== t) {
            var i = this.ds();
            if (null !== i) {
              var n = H(t);
              ((this.Xn.m = n.m),
                (this.Xn.j = n.p),
                (this.Xn.bi = this.Qn.zt().Wi({ timestamp: i })),
                (this.Xn.wi = this.Qn.zt().Vi({ timestamp: i })),
                (this.Xn.oi = this.Qn.zt().oi()),
                (this.Xn.Wt = !0),
                (this.fs = !1));
            }
          }
        }
      }),
      (t.prototype.rs = function () {
        return this.Zn._s();
      }),
      (t.prototype.ds = function () {
        var t = this.Zn.vs();
        return t.length <= this.ss ? null : t[this.ss].timestamp;
      }),
      t
    );
  })(),
  Zt = (function (t) {
    function i(i) {
      var n = t.call(this) || this;
      return ((n.zi = i), n);
    }
    return (
      q(i, t),
      (i.prototype.ri = function () {
        return this.zi;
      }),
      i
    );
  })(St),
  Qt = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i) || this;
      ((h.ws = new $()),
        (h.Ms = new $()),
        (h.bs = []),
        (h.ps = []),
        (h.gs = []),
        (h.ys = !1),
        (h.ks = !1),
        (h.xs = !1),
        (h.Ns = !1),
        (h.Ss = !1),
        (h.Cs = null),
        (h.Ts = null),
        (h.Ls = []),
        (h.Ls = s),
        (h.As = n));
      for (var r = 0; r < h.Ps(); r++)
        (h.bs.push(new Yt(h, r)), h.ps.push(new Xt(i, h, r)));
      return (
        h.Ps() > 1 && (h.bs.push(new Ut(h)), h.ps.push(new Kt(h))),
        (h.Cs = i.Dt()[0]),
        (h.xs = h.Ls.length >= (-1 === h.Ps() ? 2 : h.Ps())),
        (h.Ss = 0 === h.Ls.length || !h.Fs()),
        h
      );
    }
    return (
      q(i, t),
      (i.prototype.Fs = function () {
        return this.xs;
      }),
      (i.prototype.Ds = function () {
        this.Ls.length >= Math.max(1, this.Ps()) &&
          ((this.xs = !0),
          (this.ks = !0),
          (this.Ss = !1),
          (this.Ts = null),
          this.ri().Bs(this));
      }),
      (i.prototype.Es = function () {
        var t = Y(Y([], this.Ls, !0), this.Ts ? [this.Ts] : [], !0);
        return -1 === this.Ps() ? t : t.slice(0, this.Ps());
      }),
      (i.prototype.Os = function (t) {
        this.Ls.push(t);
      }),
      (i.prototype.zs = function (t) {
        return this.Es()[t] || null;
      }),
      (i.prototype.Rs = function (t, i) {
        ((this.Ls[t].price = i.price), (this.Ls[t].timestamp = i.timestamp));
      }),
      (i.prototype.Ws = function (t) {
        this.Ls = t;
      }),
      (i.prototype.Vs = function (t) {
        this.Ts = t;
      }),
      (i.prototype.Is = function (t) {
        var i,
          n,
          s =
            (null ===
              (n =
                null === (i = this.us()) || void 0 === i ? void 0 : i.Vt()) ||
            void 0 === n
              ? void 0
              : n.Jt) || 0,
          r = this.Ht(),
          e = this.zt();
        if (!r || r.et() || e.et()) return null;
        var u = e.Wi({ timestamp: t.timestamp }),
          o = r.jt(t.price, s);
        return new h(u, o);
      }),
      (i.prototype.js = function (t) {
        var i,
          n,
          s =
            (null ===
              (n =
                null === (i = this.us()) || void 0 === i ? void 0 : i.Vt()) ||
            void 0 === n
              ? void 0
              : n.Jt) || 0,
          h = this.Ht(),
          r = this.zt();
        return h
          ? { price: h.cn(t.y, s), timestamp: r.Hs(t.x).timestamp }
          : null;
      }),
      (i.prototype.Js = function () {
        return { Ji: this.Ji(), In: this.qs, K: this.As };
      }),
      (i.prototype.Ht = function () {
        return this.ri().Ys()[0].Us();
      }),
      (i.prototype.zt = function () {
        return this.ri().zt();
      }),
      (i.prototype.us = function () {
        return this.Cs;
      }),
      (i.prototype.K = function () {
        return this.As;
      }),
      (i.prototype.Wt = function () {
        return this.As.visible;
      }),
      (i.prototype.$s = function (t) {
        (K(this.As, t),
          this.ri().Bs(this),
          this.gs.forEach(function (t) {
            t.Ft("options");
          }));
      }),
      (i.prototype.xn = function (_t) {
        return this.gs;
      }),
      (i.prototype.Cn = function () {
        if (this.K().visible) {
          this.Ks();
          for (var t = 0; t < this.bs.length; t++) this.bs[t].Ft();
          for (t = 0; t < this.ps.length; t++) this.ps[t].Ft();
        }
      }),
      (i.prototype.Xs = function () {
        return this.ys;
      }),
      (i.prototype.Zs = function (t) {
        var i = t !== this.ys;
        return ((this.ys = t), i);
      }),
      (i.prototype.Gn = function () {
        return this.ks;
      }),
      (i.prototype.Qs = function (t) {
        var i = t !== this.ks;
        return ((this.ks = t), i && this.Cn(), i);
      }),
      (i.prototype.Gs = function () {
        return this.Ns;
      }),
      (i.prototype.th = function (t) {
        var i = t !== this.Ns;
        return ((this.Ns = t), i);
      }),
      (i.prototype.ih = function () {
        return this.Ss;
      }),
      (i.prototype.nh = function (t) {
        var i = t !== this.Ss;
        return ((this.Ss = t), i);
      }),
      (i.prototype.sh = function () {
        return this.qs;
      }),
      (i.prototype.D = function () {}),
      (i.prototype.vs = function () {
        return this.Es();
      }),
      (i.prototype.ts = function () {
        return this.Es();
      }),
      (i.prototype._s = function () {
        return this.Gn() ? "#2962FF" : null;
      }),
      (i.prototype.ls = function () {
        return this.Gn() ? "#2962FF" : null;
      }),
      (i.prototype.Ki = function () {
        return this.ps;
      }),
      (i.prototype.Nn = function () {
        return this.bs;
      }),
      (i.prototype.hh = function () {
        return !1;
      }),
      (i.prototype.rh = function () {
        return !0;
      }),
      (i.prototype.eh = function () {
        return this.Cs ? this.Cs.eh() : 0.01;
      }),
      (i.prototype.uh = function (_t, _i) {
        return null;
      }),
      (i.prototype.Vt = function () {
        return null;
      }),
      (i.prototype.oh = function () {
        return this.ah;
      }),
      (i.prototype.fh = function (t) {
        return t;
      }),
      (i.prototype.dh = function () {
        return {
          id: this.Ji(),
          toolType: this.qs,
          options: this.K(),
          points: this.Es(),
        };
      }),
      (i.prototype._h = function (t) {
        this.gs = t;
      }),
      (i.prototype.Ks = function () {
        this.gs.forEach(function (t) {
          return t.Ft();
        });
      }),
      i
    );
  })(Zt);
function Gt(t) {
  var i;
  if ("object" != typeof t || null === t || "number" == typeof t.nodeType)
    i = t;
  else if (t instanceof Date) i = new Date(t.valueOf());
  else if (Array.isArray(t)) {
    i = [];
    for (var n = 0; n < t.length; n++)
      Object.prototype.hasOwnProperty.call(t, n) && (i[n] = Gt(t[n]));
  } else
    ((i = {}),
      Object.keys(t).forEach(function (n) {
        i[n] = Gt(t[n]);
      }));
  return i;
}
var ti,
  ii = (function () {
    function t(t, i) {
      ((this.wh = t), (this.$t = i || null));
    }
    return (
      (t.prototype.In = function () {
        return this.wh;
      }),
      (t.prototype.Mh = function () {
        return this.$t;
      }),
      t
    );
  })();
!(function (t) {
  ((t[(t.bh = 1)] = "_internal_Regular"),
    (t[(t.mh = 2)] = "_internal_MovePoint"),
    (t[(t.ph = 3)] = "_internal_MovePointBackground"),
    (t[(t.gh = 4)] = "_internal_ChangePoint"),
    (t[(t.yh = 5)] = "_internal_Custom"));
})(ti || (ti = {}));
var ni = 3,
  si = 2,
  hi = (function () {
    function t() {
      ((this.kh = 1e3),
        (this.xh = 1e3),
        (this.dt = null),
        (this.Nh = new ii(ti.mh)));
    }
    return (
      (t.prototype._t = function (t) {
        this.dt = t;
      }),
      (t.prototype.Sh = function (t) {
        this.Nh = t;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        if (this.dt && !(this.dt.Es.length < 2)) {
          ((this.xh = t.canvas.width), (this.kh = t.canvas.height));
          var h = this.dt.Ch.width || 1,
            r = this.dt.Ch.color || "white",
            e = this.dt.Ch.style || 0;
          ((t.lineCap = "butt"),
            (t.strokeStyle = r),
            (t.lineWidth = Math.max(1, Math.floor(h * i))),
            y(t, e));
          var u = this.dt.Es[0],
            o = this.dt.Es[1];
          this.Th(t, [u, o], h, i);
          var l = this.Lh(u, o);
          null !== l &&
            h > 0 &&
            (l[0].x === l[1].x
              ? N(t, Math.round(l[0].x * i), l[0].y * i, l[1].y * i)
              : l[0].y === l[1].y
                ? x(t, Math.round(l[0].y * i), l[0].x * i, l[1].x * i)
                : S(t, l[0].x * i, l[0].y * i, l[1].x * i, l[1].y * i));
        }
      }),
      (t.prototype.lt = function (t, i) {
        if (null === this.dt || this.dt.Es.length < 2) return null;
        var n = ni,
          s = this.Lh(this.dt.Es[0], this.dt.Es[1]);
        return null !== s && _(s[0], s[1], new h(t, i))._ <= n ? this.Nh : null;
      }),
      (t.prototype.Lh = function (t, i) {
        var n,
          s,
          h = F(this.dt);
        return C(
          t,
          i,
          this.xh,
          this.kh,
          !!((n = h.Ch.extend) != null && n.left),
          !!((s = h.Ch.extend) != null && s.right),
        );
      }),
      (t.prototype.Th = function (t, i, n, s) {
        var h,
          r,
          e = F(this.dt);
        switch ((h = e.Ch.end) != null ? h.left : void 0) {
          case 1:
            L(i[1], i[0], t, n, s);
            break;
          case 2:
            T(i[0], t, n, s);
        }
        switch ((r = e.Ch.end) != null ? r.right : void 0) {
          case 1:
            L(i[0], i[1], t, n, s);
            break;
          case 2:
            T(i[1], t, n, s);
        }
      }),
      t
    );
  })();
function ri(t, i, n, s, h, r, e) {
  var u, o, l, a;
  if (Array.isArray(r))
    if (2 === r.length) {
      var f = Math.max(0, r[0]),
        c = Math.max(0, r[1]);
      ((u = f), (o = f), (l = c), (a = c));
    } else {
      if (4 !== r.length)
        throw new Error(
          "Wrong border radius - it should be like css border radius",
        );
      ((u = Math.max(0, r[0])),
        (o = Math.max(0, r[1])),
        (l = Math.max(0, r[2])),
        (a = Math.max(0, r[3])));
    }
  else ((u = f = Math.max(0, r)), (o = f), (l = f), (a = f));
  (t.beginPath(),
    y(t, e || 0),
    t.moveTo(i + u, n),
    t.lineTo(i + s - o, n),
    0 !== o && t.arcTo(i + s, n, i + s, n + o, o),
    t.lineTo(i + s, n + h - l),
    0 !== l && t.arcTo(i + s, n + h, i + s - l, n + h, l),
    t.lineTo(i + a, n + h),
    0 !== a && t.arcTo(i, n + h, i, n + h - a, a),
    t.lineTo(i, n + u),
    0 !== u && t.arcTo(i, n, i + u, n, u),
    t.stroke());
}
function ei(t, i, n, s, r, e, u, o, l, a, f) {
  void 0 === e && (e = 0);
  var c = l ? 0 : i.x,
    v = a ? f : n.x;
  if (
    (void 0 !== s && ((t.fillStyle = s), t.fillRect(c, i.y, v - c, n.y - i.y)),
    void 0 !== r && e > 0)
  ) {
    (t.beginPath(), y(t, u || 0));
    var d = new h(0, 0),
      _ = new h(0, 0),
      w = new h(0, 0),
      M = new h(0, 0);
    switch (o) {
      case "outer":
        ((w = new h(0, (p = 0.5 * e))),
          (M = new h(0, p)),
          (d = new h(p, -e)),
          (_ = new h(p, -e)));
        break;
      case "center":
        var b = e % 2 ? 0.5 : 0,
          m = e % 2 ? 0.5 : 1;
        ((w = new h((p = 0.5 * e) - b, -b)),
          (M = new h(m + p, -b)),
          (d = new h(-b, b + p)),
          (_ = new h(m, b + p)));
        break;
      case "inner":
        var p;
        ((w = new h(0, -(p = 0.5 * e))),
          (M = new h(1, -p)),
          (d = new h(-p, e)),
          (_ = new h(1 - p, e)));
    }
    ((t.lineWidth = e),
      (t.strokeStyle = r),
      t.moveTo(c - w.x, i.y - w.y),
      t.lineTo(v + M.x, i.y - M.y),
      t.moveTo(n.x + _.x, i.y + _.y),
      t.lineTo(n.x + _.x, n.y - _.y),
      t.moveTo(c - w.x, n.y + w.y),
      t.lineTo(v + M.x, n.y + M.y),
      t.moveTo(i.x - d.x, i.y + d.y),
      t.lineTo(i.x - d.x, n.y - d.y),
      t.stroke());
  }
}
var ui,
  oi = (function () {
    function t(t, i) {
      ((this.Ah = null),
        (this.Ph = null),
        (this.Fh = null),
        (this.Dh = null),
        (this.Bh = null),
        (this.dt = null),
        (this.Nh = i || new ii(ti.mh)),
        void 0 !== t && this._t(t));
    }
    return (
      (t.prototype._t = function (t) {
        !(function (t, i) {
          var n,
            s,
            h,
            r,
            e,
            u,
            o,
            l,
            a,
            f,
            c,
            v,
            d,
            _,
            w,
            M,
            b,
            m,
            p,
            g,
            y,
            k,
            x,
            N,
            S,
            C,
            T,
            L,
            A,
            P,
            F,
            D,
            B,
            E,
            O,
            z,
            R,
            W,
            V,
            I,
            j,
            H,
            J,
            q,
            U,
            Y,
            $,
            K,
            X,
            Z,
            Q,
            G,
            tt,
            it,
            nt,
            st,
            ht,
            rt,
            et,
            ut,
            ot,
            lt,
            at,
            ft,
            ct,
            vt,
            dt,
            _t,
            wt,
            Mt,
            bt,
            mt,
            pt,
            gt,
            yt,
            kt,
            xt,
            Nt,
            St,
            Ct,
            Tt,
            Lt,
            At,
            Pt,
            Ft,
            Dt,
            Bt,
            Et,
            Ot,
            zt,
            Rt,
            Wt,
            Vt,
            It,
            jt,
            Ht,
            Jt,
            qt,
            Ut,
            Yt,
            $t,
            Kt,
            Xt,
            Zt,
            Qt,
            Gt,
            ti,
            ii,
            ni,
            si,
            hi,
            ri,
            ei,
            ui,
            oi,
            li,
            ai,
            fi,
            ci,
            vi,
            di,
            _i;
          if (null === t || null === i) return (null === t) == (null === i);
          if ((void 0 === t.Es) != (void 0 === i.Es)) return !1;
          if (void 0 !== t.Es && void 0 !== i.Es) {
            if (t.Es.length !== i.Es.length) return !1;
            for (var wi = 0; wi < t.Es.length; ++wi)
              if (t.Es[wi].x !== i.Es[wi].x || t.Es[wi].y !== i.Es[wi].y)
                return !1;
          }
          return (
            (null === (n = t.wi) || void 0 === n
              ? void 0
              : n.forceCalculateMaxLineWidth) ===
              (null === (s = i.wi) || void 0 === s
                ? void 0
                : s.forceCalculateMaxLineWidth) &&
            (null === (h = t.wi) || void 0 === h
              ? void 0
              : h.forceTextAlign) ===
              (null === (r = i.wi) || void 0 === r
                ? void 0
                : r.forceTextAlign) &&
            (null === (e = t.wi) || void 0 === e ? void 0 : e.wordWrapWidth) ===
              (null === (u = i.wi) || void 0 === u
                ? void 0
                : u.wordWrapWidth) &&
            (null === (o = t.wi) || void 0 === o ? void 0 : o.padding) ===
              (null === (l = i.wi) || void 0 === l ? void 0 : l.padding) &&
            (null === (a = t.wi) || void 0 === a ? void 0 : a.value) ===
              (null === (f = i.wi) || void 0 === f ? void 0 : f.value) &&
            (null === (c = t.wi) || void 0 === c ? void 0 : c.alignment) ===
              (null === (v = i.wi) || void 0 === v ? void 0 : v.alignment) &&
            (null ===
              (_ = null === (d = t.wi) || void 0 === d ? void 0 : d.font) ||
            void 0 === _
              ? void 0
              : _.bold) ===
              (null ===
                (M = null === (w = i.wi) || void 0 === w ? void 0 : w.font) ||
              void 0 === M
                ? void 0
                : M.bold) &&
            (null ===
              (m = null === (b = t.wi) || void 0 === b ? void 0 : b.font) ||
            void 0 === m
              ? void 0
              : m.size) ===
              (null ===
                (g = null === (p = i.wi) || void 0 === p ? void 0 : p.font) ||
              void 0 === g
                ? void 0
                : g.size) &&
            (null ===
              (k = null === (y = t.wi) || void 0 === y ? void 0 : y.font) ||
            void 0 === k
              ? void 0
              : k.family) ===
              (null ===
                (N = null === (x = i.wi) || void 0 === x ? void 0 : x.font) ||
              void 0 === N
                ? void 0
                : N.family) &&
            (null ===
              (C = null === (S = t.wi) || void 0 === S ? void 0 : S.font) ||
            void 0 === C
              ? void 0
              : C.italic) ===
              (null ===
                (L = null === (T = i.wi) || void 0 === T ? void 0 : T.font) ||
              void 0 === L
                ? void 0
                : L.italic) &&
            (null ===
              (P = null === (A = t.wi) || void 0 === A ? void 0 : A.box) ||
            void 0 === P
              ? void 0
              : P.angle) ===
              (null ===
                (D = null === (F = i.wi) || void 0 === F ? void 0 : F.box) ||
              void 0 === D
                ? void 0
                : D.angle) &&
            (null ===
              (E = null === (B = t.wi) || void 0 === B ? void 0 : B.box) ||
            void 0 === E
              ? void 0
              : E.scale) ===
              (null ===
                (z = null === (O = i.wi) || void 0 === O ? void 0 : O.box) ||
              void 0 === z
                ? void 0
                : z.scale) &&
            (null ===
              (V =
                null ===
                  (W = null === (R = t.wi) || void 0 === R ? void 0 : R.box) ||
                void 0 === W
                  ? void 0
                  : W.offset) || void 0 === V
              ? void 0
              : V.x) ===
              (null ===
                (H =
                  null ===
                    (j =
                      null === (I = i.wi) || void 0 === I ? void 0 : I.box) ||
                  void 0 === j
                    ? void 0
                    : j.offset) || void 0 === H
                ? void 0
                : H.x) &&
            (null ===
              (U =
                null ===
                  (q = null === (J = t.wi) || void 0 === J ? void 0 : J.box) ||
                void 0 === q
                  ? void 0
                  : q.offset) || void 0 === U
              ? void 0
              : U.y) ===
              (null ===
                (K =
                  null ===
                    ($ =
                      null === (Y = i.wi) || void 0 === Y ? void 0 : Y.box) ||
                  void 0 === $
                    ? void 0
                    : $.offset) || void 0 === K
                ? void 0
                : K.y) &&
            (null ===
              (Z = null === (X = t.wi) || void 0 === X ? void 0 : X.box) ||
            void 0 === Z
              ? void 0
              : Z.maxHeight) ===
              (null ===
                (G = null === (Q = i.wi) || void 0 === Q ? void 0 : Q.box) ||
              void 0 === G
                ? void 0
                : G.maxHeight) &&
            (null ===
              (nt =
                null ===
                  (it =
                    null === (tt = t.wi) || void 0 === tt ? void 0 : tt.box) ||
                void 0 === it
                  ? void 0
                  : it.padding) || void 0 === nt
              ? void 0
              : nt.x) ===
              (null ===
                (rt =
                  null ===
                    (ht =
                      null === (st = i.wi) || void 0 === st
                        ? void 0
                        : st.box) || void 0 === ht
                    ? void 0
                    : ht.padding) || void 0 === rt
                ? void 0
                : rt.x) &&
            (null ===
              (ot =
                null ===
                  (ut =
                    null === (et = t.wi) || void 0 === et ? void 0 : et.box) ||
                void 0 === ut
                  ? void 0
                  : ut.padding) || void 0 === ot
              ? void 0
              : ot.y) ===
              (null ===
                (ft =
                  null ===
                    (at =
                      null === (lt = i.wi) || void 0 === lt
                        ? void 0
                        : lt.box) || void 0 === at
                    ? void 0
                    : at.padding) || void 0 === ft
                ? void 0
                : ft.y) &&
            (null ===
              (dt =
                null ===
                  (vt =
                    null === (ct = t.wi) || void 0 === ct ? void 0 : ct.box) ||
                void 0 === vt
                  ? void 0
                  : vt.alignment) || void 0 === dt
              ? void 0
              : dt.vertical) ===
              (null ===
                (Mt =
                  null ===
                    (wt =
                      null === (_t = i.wi) || void 0 === _t
                        ? void 0
                        : _t.box) || void 0 === wt
                    ? void 0
                    : wt.alignment) || void 0 === Mt
                ? void 0
                : Mt.vertical) &&
            (null ===
              (pt =
                null ===
                  (mt =
                    null === (bt = t.wi) || void 0 === bt ? void 0 : bt.box) ||
                void 0 === mt
                  ? void 0
                  : mt.alignment) || void 0 === pt
              ? void 0
              : pt.horizontal) ===
              (null ===
                (kt =
                  null ===
                    (yt =
                      null === (gt = i.wi) || void 0 === gt
                        ? void 0
                        : gt.box) || void 0 === yt
                    ? void 0
                    : yt.alignment) || void 0 === kt
                ? void 0
                : kt.horizontal) &&
            (null ===
              (Ct =
                null ===
                  (St =
                    null ===
                      (Nt =
                        null === (xt = t.wi) || void 0 === xt
                          ? void 0
                          : xt.box) || void 0 === Nt
                      ? void 0
                      : Nt.background) || void 0 === St
                  ? void 0
                  : St.inflation) || void 0 === Ct
              ? void 0
              : Ct.x) ===
              (null ===
                (Pt =
                  null ===
                    (At =
                      null ===
                        (Lt =
                          null === (Tt = i.wi) || void 0 === Tt
                            ? void 0
                            : Tt.box) || void 0 === Lt
                        ? void 0
                        : Lt.background) || void 0 === At
                    ? void 0
                    : At.inflation) || void 0 === Pt
                ? void 0
                : Pt.x) &&
            (null ===
              (Et =
                null ===
                  (Bt =
                    null ===
                      (Dt =
                        null === (Ft = t.wi) || void 0 === Ft
                          ? void 0
                          : Ft.box) || void 0 === Dt
                      ? void 0
                      : Dt.background) || void 0 === Bt
                  ? void 0
                  : Bt.inflation) || void 0 === Et
              ? void 0
              : Et.y) ===
              (null ===
                (Wt =
                  null ===
                    (Rt =
                      null ===
                        (zt =
                          null === (Ot = i.wi) || void 0 === Ot
                            ? void 0
                            : Ot.box) || void 0 === zt
                        ? void 0
                        : zt.background) || void 0 === Rt
                    ? void 0
                    : Rt.inflation) || void 0 === Wt
                ? void 0
                : Wt.y) &&
            (null ===
              (jt =
                null ===
                  (It =
                    null === (Vt = t.wi) || void 0 === Vt ? void 0 : Vt.box) ||
                void 0 === It
                  ? void 0
                  : It.border) || void 0 === jt
              ? void 0
              : jt.highlight) ===
              (null ===
                (qt =
                  null ===
                    (Jt =
                      null === (Ht = i.wi) || void 0 === Ht
                        ? void 0
                        : Ht.box) || void 0 === Jt
                    ? void 0
                    : Jt.border) || void 0 === qt
                ? void 0
                : qt.highlight) &&
            (null ===
              ($t =
                null ===
                  (Yt =
                    null === (Ut = t.wi) || void 0 === Ut ? void 0 : Ut.box) ||
                void 0 === Yt
                  ? void 0
                  : Yt.border) || void 0 === $t
              ? void 0
              : $t.radius) ===
              (null ===
                (Zt =
                  null ===
                    (Xt =
                      null === (Kt = i.wi) || void 0 === Kt
                        ? void 0
                        : Kt.box) || void 0 === Xt
                    ? void 0
                    : Xt.border) || void 0 === Zt
                ? void 0
                : Zt.radius) &&
            (null ===
              (ti =
                null ===
                  (Gt =
                    null === (Qt = t.wi) || void 0 === Qt ? void 0 : Qt.box) ||
                void 0 === Gt
                  ? void 0
                  : Gt.shadow) || void 0 === ti
              ? void 0
              : ti.offset) ===
              (null ===
                (si =
                  null ===
                    (ni =
                      null === (ii = i.wi) || void 0 === ii
                        ? void 0
                        : ii.box) || void 0 === ni
                    ? void 0
                    : ni.shadow) || void 0 === si
                ? void 0
                : si.offset) &&
            (null ===
              (ei =
                null ===
                  (ri =
                    null === (hi = t.wi) || void 0 === hi ? void 0 : hi.box) ||
                void 0 === ri
                  ? void 0
                  : ri.shadow) || void 0 === ei
              ? void 0
              : ei.color) ===
              (null ===
                (li =
                  null ===
                    (oi =
                      null === (ui = i.wi) || void 0 === ui
                        ? void 0
                        : ui.box) || void 0 === oi
                    ? void 0
                    : oi.shadow) || void 0 === li
                ? void 0
                : li.color) &&
            (null ===
              (ci =
                null ===
                  (fi =
                    null === (ai = t.wi) || void 0 === ai ? void 0 : ai.box) ||
                void 0 === fi
                  ? void 0
                  : fi.shadow) || void 0 === ci
              ? void 0
              : ci.blur) ===
              (null ===
                (_i =
                  null ===
                    (di =
                      null === (vi = i.wi) || void 0 === vi
                        ? void 0
                        : vi.box) || void 0 === di
                    ? void 0
                    : di.shadow) || void 0 === _i
                ? void 0
                : _i.blur)
          );
        })(this.dt, t)
          ? ((this.dt = t),
            (this.Ph = null),
            (this.Ah = null),
            (this.Fh = null),
            (this.Dh = null),
            (this.Bh = null))
          : (this.dt = t);
      }),
      (t.prototype.lt = function (t, i) {
        return null === this.dt ||
          void 0 === this.dt.Es ||
          0 === this.dt.Es.length
          ? null
          : M(new h(t, i), this.Eh())
            ? this.Nh
            : null;
      }),
      (t.prototype.Oh = function (t) {
        return (
          null !== this.dt &&
          void 0 !== this.dt.Es &&
          0 !== this.dt.Es.length &&
          w(this.dt.Es[0], t)
        );
      }),
      (t.prototype.zh = function () {
        return null === this.dt ? { oi: 0, li: 0 } : this.Rh();
      }),
      (t.prototype.Wh = function () {
        if (null === this.dt) return { bt: 0, gt: 0, oi: 0, li: 0 };
        var t = this.Vh();
        return { bt: t.Ih, gt: t.jh, oi: t.Hh, li: t.Jh };
      }),
      (t.prototype.qh = function (t, i) {
        if (
          null === this.dt ||
          void 0 === this.dt.Es ||
          0 === this.dt.Es.length
        )
          return !0;
        var n = this.Vh();
        if (n.Ih + n.Hh < 0 || n.Ih > t) {
          var s = new r(new h(0, 0), new h(t, i));
          return this.Eh().every(function (t) {
            return !w(t, s);
          });
        }
        return !1;
      }),
      (t.prototype.Ws = function (t, i) {
        ((F(this.dt).Es = t), (this.Nh = i || new ii(ti.mh)));
      }),
      (t.prototype.Uh = function () {
        return null === this.dt ? "" : this.Yh().Uh;
      }),
      (t.prototype.$h = function (t, i, n) {
        return (function (t, i, n) {
          ui || li();
          ((n =
            "[object String]" === Object.prototype.toString.call(n)
              ? parseInt(n)
              : n),
            (t += ""));
          var s =
            !Number.isInteger(n) || !isFinite(n) || n <= 0
              ? t.split(/\r\n|\r|\n|$/)
              : t.split(/[^\S\r\n]*(?:\r\n|\r|\n|$)/);
          s[s.length - 1] || s.pop();
          if (!Number.isInteger(n) || !isFinite(n) || n <= 0) return s;
          ui.font = i;
          for (var h = [], r = 0; r < s.length; r++) {
            var e = s[r],
              u = ui.measureText(e).width;
            if (u <= n) h.push(e);
            else
              for (var o = e.split(/([-)\]},.!?:;])|(\s+)/); o.length; ) {
                var l = Math.floor(((n / u) * (o.length + 2)) / 3);
                if (
                  l <= 0 ||
                  ui.measureText(o.slice(0, 3 * l - 1).join("")).width <= n
                )
                  for (
                    ;
                    ui.measureText(o.slice(0, 3 * (l + 1) - 1).join(""))
                      .width <= n;

                  )
                    l++;
                else
                  for (
                    ;
                    l > 0 &&
                    ui.measureText(o.slice(0, 3 * --l - 1).join("")).width > n;

                  );
                if (l > 0)
                  (h.push(o.slice(0, 3 * l - 1).join("")), o.splice(0, 3 * l));
                else {
                  var a = o[0] + (o[1] || ""),
                    f = Math.floor((n / ui.measureText(a).width) * a.length);
                  if (ui.measureText(a.substring(0, f)).width <= n)
                    for (; ui.measureText(a.substring(0, f + 1)).width <= n; )
                      f++;
                  else
                    for (
                      ;
                      f > 1 && ui.measureText(a.substring(0, --f)).width > n;

                    );
                  ((f = Math.max(1, f)),
                    h.push(a.substring(0, f)),
                    (o[0] = a.substring(f)),
                    (o[1] = ""));
                }
                if (ui.measureText(o.join("")).width <= n) {
                  h.push(o.join(""));
                  break;
                }
              }
          }
          return h;
        })(t, n || this.Uh(), i);
      }),
      (t.prototype.ot = function (t, i) {
        var n, s, h, r, e, u, o, l, a, f, c, v, d, _, w, M, b, m, p, g, y;
        if (
          null !== this.dt &&
          void 0 !== this.dt.Es &&
          0 !== this.dt.Es.length
        ) {
          var k = t.canvas.width,
            x = t.canvas.height;
          if (!this.qh(k, x)) {
            var N = this.dt.wi,
              S = this.Vh(),
              C = this.Kh().scaled(i),
              T =
                (-(
                  (null === (n = N.box) || void 0 === n ? void 0 : n.angle) || 0
                ) *
                  Math.PI) /
                180;
            (t.save(),
              t.translate(C.x, C.y),
              t.rotate(T),
              t.translate(-C.x, -C.y));
            var L = this.Yh().W;
            ((t.textAlign = S.Xh),
              (t.textBaseline = "middle"),
              (t.font = this.Uh()));
            var A = Math.round(S.jh * i),
              P = Math.round(S.Ih * i),
              F = P + Math.round(S.Hh * i),
              D = A + Math.round(S.Jh * i);
            if (
              (null ===
                (h =
                  null === (s = N.box) || void 0 === s
                    ? void 0
                    : s.background) || void 0 === h
                ? void 0
                : h.color) ||
              (null ===
                (e =
                  null === (r = N.box) || void 0 === r ? void 0 : r.border) ||
              void 0 === e
                ? void 0
                : e.color) ||
              ((null ===
                (o =
                  null === (u = N.box) || void 0 === u ? void 0 : u.border) ||
              void 0 === o
                ? void 0
                : o.highlight) &&
                N.wordWrapWidth)
            ) {
              var B = Math.round(
                  ((null ===
                    (a =
                      null === (l = N.box) || void 0 === l
                        ? void 0
                        : l.border) || void 0 === a
                    ? void 0
                    : a.width) || Math.max(L / 12, 1)) * i,
                ),
                E = B / 2,
                O = !1;
              if (null === (f = N.box) || void 0 === f ? void 0 : f.shadow) {
                var z =
                    null === (c = N.box) || void 0 === c ? void 0 : c.shadow,
                  R = z.color,
                  W = z.blur,
                  V = z.offset;
                (t.save(),
                  (t.shadowColor = R),
                  (t.shadowBlur = W),
                  (t.shadowOffsetX = (null == V ? void 0 : V.x) || 0),
                  (t.shadowOffsetY = (null == V ? void 0 : V.y) || 0),
                  (O = !0));
              }
              if (
                null === (v = N.box.border) || void 0 === v ? void 0 : v.width
              ) {
                ((null === (d = N.box.border) || void 0 === d
                  ? void 0
                  : d.color) && (t.strokeStyle = N.box.border.color),
                  (t.lineWidth = B));
                var I =
                    null !==
                      (M =
                        null ===
                          (w =
                            null === (_ = N.box) || void 0 === _
                              ? void 0
                              : _.border) || void 0 === w
                          ? void 0
                          : w.radius) && void 0 !== M
                      ? M
                      : 0 * i + B,
                  j =
                    null ===
                      (m =
                        null === (b = N.box) || void 0 === b
                          ? void 0
                          : b.border) || void 0 === m
                      ? void 0
                      : m.style;
                (ri(t, P - E, A - E, F - P + B, D - A + B, I, j),
                  (null === (p = N.box.background) || void 0 === p
                    ? void 0
                    : p.color) &&
                    ((t.fillStyle = N.box.background.color), t.fill()),
                  O && (t.restore(), (O = !1)));
              } else
                ((null === (g = N.box.background) || void 0 === g
                  ? void 0
                  : g.color) &&
                  ((t.fillStyle = N.box.background.color),
                  t.fillRect(P, A, F - P, D - A)),
                  O && (t.restore(), (O = !1)));
            }
            t.fillStyle =
              null === (y = N.font) || void 0 === y ? void 0 : y.color;
            for (
              var H = this.Qh().Zh,
                J = 0.05 * L,
                q = Mi(this.dt),
                U = (P + Math.round(S.Gh * i)) / i,
                Y = (A + Math.round((S.tr + J) * i)) / i,
                $ = function (n) {
                  (_t(t, i, function () {
                    return t.fillText(n, U, Y);
                  }),
                    (Y += L + q));
                },
                K = 0,
                X = H;
              K < X.length;
              K++
            ) {
              $(X[K]);
            }
            t.restore();
          }
        }
      }),
      (t.prototype.Vh = function () {
        var t, i, n, s, h, r, e, u, o, l, a, f, c, v, d, _, w, M, b, m, p;
        if (null !== this.Ah) return this.Ah;
        var g = F(this.dt),
          y = di(g),
          k = vi(g),
          x = wi(g) + y,
          N = _i(g) + k,
          S = P(g.Es)[0],
          C = this.Rh(),
          T = C.oi,
          L = C.li,
          A = S.y,
          D = S.x;
        switch (
          null ===
            (n =
              null ===
                (i = null === (t = g.wi) || void 0 === t ? void 0 : t.box) ||
              void 0 === i
                ? void 0
                : i.alignment) || void 0 === n
            ? void 0
            : n.vertical
        ) {
          case "top":
            A -=
              L +
              ((null ===
                (r =
                  null ===
                    (h =
                      null === (s = g.wi) || void 0 === s ? void 0 : s.box) ||
                  void 0 === h
                    ? void 0
                    : h.offset) || void 0 === r
                ? void 0
                : r.y) || 0);
            break;
          case "middle":
            A -= L / 2;
            break;
          case "bottom":
            A +=
              (null ===
                (o =
                  null ===
                    (u =
                      null === (e = g.wi) || void 0 === e ? void 0 : e.box) ||
                  void 0 === u
                    ? void 0
                    : u.offset) || void 0 === o
                ? void 0
                : o.y) || 0;
        }
        var B = A + N + bi(g) / 2,
          E = "start",
          O = 0;
        switch (
          null ===
            (f =
              null ===
                (a = null === (l = g.wi) || void 0 === l ? void 0 : l.box) ||
              void 0 === a
                ? void 0
                : a.alignment) || void 0 === f
            ? void 0
            : f.horizontal
        ) {
          case "left":
            D +=
              (null ===
                (d =
                  null ===
                    (v =
                      null === (c = g.wi) || void 0 === c ? void 0 : c.box) ||
                  void 0 === v
                    ? void 0
                    : v.offset) || void 0 === d
                ? void 0
                : d.x) || 0;
            break;
          case "center":
            D -= T / 2;
            break;
          case "right":
            D -=
              T +
              ((null ===
                (M =
                  null ===
                    (w =
                      null === (_ = g.wi) || void 0 === _ ? void 0 : _.box) ||
                  void 0 === w
                    ? void 0
                    : w.offset) || void 0 === M
                ? void 0
                : M.x) || 0);
        }
        switch (P(null === (b = g.wi) || void 0 === b ? void 0 : b.alignment)) {
          case "start":
          case "left":
            ((E = "start"),
              (O = D + x),
              gi() &&
                ((
                  null === (m = g.wi) || void 0 === m
                    ? void 0
                    : m.forceTextAlign
                )
                  ? (E = "left")
                  : ((O = D + T - x), (E = "right"))));
            break;
          case "center":
            ((E = "center"), (O = D + T / 2));
            break;
          case "right":
          case "end":
            ((E = "end"),
              (O = D + T - x),
              gi() &&
                (null === (p = g.wi) || void 0 === p
                  ? void 0
                  : p.forceTextAlign) &&
                (E = "right"));
        }
        return (
          (this.Ah = {
            Ih: D,
            jh: A,
            Hh: T,
            Jh: L,
            Xh: E,
            tr: B - A,
            Gh: O - D,
          }),
          this.Ah
        );
      }),
      (t.prototype.ir = function (t) {
        var i, n, s;
        if (
          (ui || li(),
          (ui.textBaseline = "alphabetic"),
          (ui.font = this.Uh()),
          null !== this.dt &&
            (null === (i = this.dt.wi) || void 0 === i
              ? void 0
              : i.wordWrapWidth) &&
            !(null === (n = this.dt.wi) || void 0 === n
              ? void 0
              : n.forceCalculateMaxLineWidth))
        )
          return (
            (null === (s = this.dt.wi) || void 0 === s
              ? void 0
              : s.wordWrapWidth) * pi(this.dt)
          );
        for (var h = 0, r = 0, e = t; r < e.length; r++) {
          var u = e[r];
          h = Math.max(h, ui.measureText(u).width);
        }
        return h;
      }),
      (t.prototype.Qh = function () {
        var t, i, n, s, h, r;
        if (null === this.Fh) {
          var e = F(this.dt),
            u = this.$h(
              (null === (t = e.wi) || void 0 === t ? void 0 : t.value) || "",
              null === (i = e.wi) || void 0 === i ? void 0 : i.wordWrapWidth,
            );
          if (
            void 0 !==
            (null ===
              (s = null === (n = e.wi) || void 0 === n ? void 0 : n.box) ||
            void 0 === s
              ? void 0
              : s.maxHeight)
          ) {
            var o = P(
                null ===
                  (r = null === (h = e.wi) || void 0 === h ? void 0 : h.box) ||
                  void 0 === r
                  ? void 0
                  : r.maxHeight,
              ),
              l = bi(e),
              a = Mi(e),
              f = Math.floor((o + a) / (l + a));
            u.length > f && (u = u.slice(0, f));
          }
          this.Fh = { nr: this.ir(u), Zh: u };
        }
        return this.Fh;
      }),
      (t.prototype.Yh = function () {
        var t, i, n, s, h, r;
        if (null === this.Dh) {
          var e = F(this.dt),
            u = bi(e),
            o =
              ((
                null ===
                  (i = null === (t = e.wi) || void 0 === t ? void 0 : t.font) ||
                void 0 === i
                  ? void 0
                  : i.bold
              )
                ? "bold "
                : "") +
              ((
                null ===
                  (s = null === (n = e.wi) || void 0 === n ? void 0 : n.font) ||
                void 0 === s
                  ? void 0
                  : s.italic
              )
                ? "italic "
                : "") +
              u +
              "px " +
              (null ===
                (r = null === (h = e.wi) || void 0 === h ? void 0 : h.font) ||
              void 0 === r
                ? void 0
                : r.family);
          this.Dh = { Uh: o, W: u };
        }
        return this.Dh;
      }),
      (t.prototype.Rh = function () {
        if (null === this.Bh) {
          var t = this.Qh(),
            i = F(this.dt);
          this.Bh = { oi: fi(i, t.nr), li: ci(i, t.Zh.length) };
        }
        return this.Bh;
      }),
      (t.prototype.Eh = function () {
        var t, i;
        if (null !== this.Ph) return this.Ph;
        if (null === this.dt) return [];
        var n = this.Vh(),
          s = n.Ih,
          r = n.jh,
          e = n.Hh,
          u = n.Jh,
          o = this.Kh(),
          l =
            (-(
              (null ===
                (i =
                  null === (t = this.dt.wi) || void 0 === t ? void 0 : t.box) ||
              void 0 === i
                ? void 0
                : i.angle) || 0
            ) *
              Math.PI) /
            180;
        return (
          (this.Ph = [
            ai(new h(s, r), o, l),
            ai(new h(s + e, r), o, l),
            ai(new h(s + e, r + u), o, l),
            ai(new h(s, r + u), o, l),
          ]),
          this.Ph
        );
      }),
      (t.prototype.Kh = function () {
        var t,
          i,
          n,
          s = this.Vh(),
          r = s.Ih,
          e = s.jh,
          u = s.Hh,
          o = s.Jh,
          l = P(
            null ===
              (n =
                null ===
                  (i =
                    null === (t = this.dt) || void 0 === t ? void 0 : t.wi) ||
                void 0 === i
                  ? void 0
                  : i.box) || void 0 === n
              ? void 0
              : n.alignment,
          ),
          a = l.horizontal,
          f = l.vertical,
          c = 0,
          v = 0;
        switch (a) {
          case "center":
            c = r + u / 2;
            break;
          case "left":
            c = r;
            break;
          case "right":
            c = r + u;
        }
        switch (f) {
          case "middle":
            v = e + o / 2;
            break;
          case "bottom":
            v = e;
            break;
          case "top":
            v = e + o;
        }
        return new h(c, v);
      }),
      t
    );
  })();
function li() {
  var t = document.createElement("canvas");
  ((t.width = 0), (t.height = 0), (ui = F(t.getContext("2d"))));
}
function ai(t, i, n) {
  if (0 === n) return t.clone();
  var s = (t.x - i.x) * Math.cos(n) - (t.y - i.y) * Math.sin(n) + i.x,
    r = (t.x - i.x) * Math.sin(n) + (t.y - i.y) * Math.cos(n) + i.y;
  return new h(s, r);
}
function fi(t, i) {
  return i + 2 * wi(t) + 2 * di(t);
}
function ci(t, i) {
  return bi(t) * i + Mi(t) * (i - 1) + 2 * _i(t) + 2 * vi(t);
}
function vi(t) {
  var i, n, s, h, r, e;
  return void 0 !==
    (null ===
      (s =
        null === (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
        void 0 === n
          ? void 0
          : n.padding) || void 0 === s
      ? void 0
      : s.y)
    ? (null ===
        (e =
          null === (r = null === (h = t.wi) || void 0 === h ? void 0 : h.box) ||
          void 0 === r
            ? void 0
            : r.padding) || void 0 === e
        ? void 0
        : e.y) * pi(t)
    : bi(t) / 3;
}
function di(t) {
  var i, n, s, h, r, e;
  return (
    null ===
      (s =
        null === (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
        void 0 === n
          ? void 0
          : n.padding) || void 0 === s
      ? void 0
      : s.x
  )
    ? (null ===
        (e =
          null === (r = null === (h = t.wi) || void 0 === h ? void 0 : h.box) ||
          void 0 === r
            ? void 0
            : r.padding) || void 0 === e
        ? void 0
        : e.x) * pi(t)
    : bi(t) / 3;
}
function _i(t) {
  var i, n, s, h;
  return (
    ((null ===
      (h =
        null ===
          (s =
            null ===
              (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
            void 0 === n
              ? void 0
              : n.background) || void 0 === s
          ? void 0
          : s.inflation) || void 0 === h
      ? void 0
      : h.y) || 0) * pi(t)
  );
}
function wi(t) {
  var i, n, s, h;
  return (
    ((null ===
      (h =
        null ===
          (s =
            null ===
              (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
            void 0 === n
              ? void 0
              : n.background) || void 0 === s
          ? void 0
          : s.inflation) || void 0 === h
      ? void 0
      : h.x) || 0) * pi(t)
  );
}
function Mi(t) {
  var i;
  return (
    ((null === (i = t.wi) || void 0 === i ? void 0 : i.padding) || 0) * pi(t)
  );
}
function bi(t) {
  return Math.ceil(mi(t) * pi(t));
}
function mi(t) {
  var i, n;
  return (
    (null === (n = null === (i = t.wi) || void 0 === i ? void 0 : i.font) ||
    void 0 === n
      ? void 0
      : n.size) || 30
  );
}
function pi(t) {
  var i,
    n,
    s = Math.min(
      1,
      Math.max(
        0.2,
        (null === (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
        void 0 === n
          ? void 0
          : n.scale) || 1,
      ),
    );
  if (1 === s) return s;
  var h = mi(t);
  return Math.ceil(s * h) / h;
}
function gi() {
  return "rtl" === window.document.dir;
}
var yi = (function () {
    function t() {
      this.$t = null;
    }
    return (
      (t.prototype._t = function (t) {
        this.$t = t;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        var h = this;
        if (null !== this.$t) {
          var r = Math.max(1, Math.floor(i));
          t.lineWidth = r;
          var e = Math.ceil(this.$t.Qt * i),
            u = Math.ceil(this.$t.Zt * i);
          !(function (t, i) {
            (t.save(),
              t.lineWidth % 2 && t.translate(0.5, 0.5),
              i(),
              t.restore());
          })(t, function () {
            var n = F(h.$t);
            if (n.sr) {
              ((t.strokeStyle = n.hr), y(t, n.rr), t.beginPath());
              for (var s = 0, o = n.er; s < o.length; s++) {
                var l = o[s],
                  a = Math.round(l.ur * i);
                (t.moveTo(a, -r), t.lineTo(a, e + r));
              }
              t.stroke();
            }
            if (n.lr) {
              ((t.strokeStyle = n.ar), y(t, n.cr), t.beginPath());
              for (var f = 0, c = n.vr; f < c.length; f++) {
                var v = c[f],
                  d = Math.round(v.ur * i);
                (t.moveTo(-r, d), t.lineTo(u + r, d));
              }
              t.stroke();
            }
          });
        }
      }),
      t
    );
  })(),
  ki = (function () {
    function t(t) {
      ((this.ni = new yi()), (this.At = !0), (this.Xi = t));
    }
    return (
      (t.prototype.Ft = function () {
        this.At = !0;
      }),
      (t.prototype.Bt = function (t, i) {
        if (this.At) {
          var n = this.Xi.ri().K().grid,
            s = {
              Qt: t,
              Zt: i,
              lr: n.horzLines.visible,
              sr: n.vertLines.visible,
              ar: n.horzLines.color,
              hr: n.vertLines.color,
              cr: n.horzLines.style,
              rr: n.vertLines.style,
              vr: this.Xi.fn().dr(),
              er: this.Xi.ri().zt().dr() || [],
            };
          (this.ni._t(s), (this.At = !1));
        }
        return this.ni;
      }),
      t
    );
  })(),
  xi = (function () {
    function t(t) {
      this._n = new ki(t);
    }
    return (
      (t.prototype._r = function () {
        return this._n;
      }),
      t
    );
  })(),
  Ni = ".";
function Si(t, i) {
  if (!X(t)) return "n/a";
  if (!Z(i)) throw new TypeError("invalid length");
  if (i < 0 || i > 16) throw new TypeError("invalid length");
  if (0 === i) return t.toString();
  return ("0000000000000000" + t.toString()).slice(-i);
}
var Ci = (function () {
    function t(t, i) {
      if ((i || (i = 1), (X(t) && Z(t)) || (t = 100), t < 0))
        throw new TypeError("invalid base");
      ((this.Fi = t), (this.wr = i), this.Mr());
    }
    return (
      (t.prototype.format = function (t) {
        var i = t < 0 ? "−" : "";
        return ((t = Math.abs(t)), i + this.br(t));
      }),
      (t.prototype.Mr = function () {
        if (((this.mr = 0), this.Fi > 0 && this.wr > 0))
          for (var t = this.Fi; t > 1; ) ((t /= 10), this.mr++);
      }),
      (t.prototype.br = function (t) {
        var i = this.Fi / this.wr,
          n = Math.floor(t),
          s = "",
          h = void 0 !== this.mr ? this.mr : NaN;
        if (i > 1) {
          var r = +(Math.round(t * i) - n * i).toFixed(this.mr);
          (r >= i && ((r -= i), (n += 1)),
            (s = Ni + Si(+r.toFixed(this.mr) * this.wr, h)));
        } else ((n = Math.round(n * i) / i), h > 0 && (s = Ni + Si(0, h)));
        return n.toFixed(0) + s;
      }),
      t
    );
  })(),
  Ti = (function (t) {
    function i(i) {
      return (void 0 === i && (i = 100), t.call(this, i) || this);
    }
    return (
      q(i, t),
      (i.prototype.format = function (i) {
        return "".concat(t.prototype.format.call(this, i), "%");
      }),
      i
    );
  })(Ci),
  Li = (function () {
    function t(t, i) {
      ((this.pr = t), (this.gr = i));
    }
    return (
      (t.prototype.yr = function (t) {
        return null !== t && this.pr === t.pr && this.gr === t.gr;
      }),
      (t.prototype.kr = function () {
        return new t(this.pr, this.gr);
      }),
      (t.prototype.Nr = function () {
        return this.pr;
      }),
      (t.prototype.Sr = function () {
        return this.gr;
      }),
      (t.prototype.Cr = function () {
        return this.gr - this.pr;
      }),
      (t.prototype.et = function () {
        return (
          this.gr === this.pr || Number.isNaN(this.gr) || Number.isNaN(this.pr)
        );
      }),
      (t.prototype.Yn = function (i) {
        return null === i
          ? this
          : new t(Math.min(this.Nr(), i.Nr()), Math.max(this.Sr(), i.Sr()));
      }),
      (t.prototype.Tr = function (t) {
        if (X(t) && 0 !== this.gr - this.pr) {
          var i = 0.5 * (this.gr + this.pr),
            n = this.gr - i,
            s = this.pr - i;
          ((n *= t), (s *= t), (this.gr = i + n), (this.pr = i + s));
        }
      }),
      (t.prototype.Lr = function (t) {
        X(t) && ((this.gr += t), (this.pr += t));
      }),
      (t.prototype.Ar = function () {
        return { minValue: this.pr, maxValue: this.gr };
      }),
      (t.Pr = function (i) {
        return null === i ? null : new t(i.minValue, i.maxValue);
      }),
      t
    );
  })();
function Ai(t, i, n) {
  return Math.min(Math.max(t, i), n);
}
function Pi(t, i, n) {
  return i - t <= n;
}
function Fi(t) {
  return t <= 0 ? NaN : Math.log(t) / Math.log(10);
}
function Di(t) {
  var i = Math.ceil(t);
  return i % 2 != 0 ? i - 1 : i;
}
function Bi(t) {
  var i = Math.ceil(t);
  return i % 2 == 0 ? i - 1 : i;
}
var Ei = { Fr: 4, Dr: 1e-4 };
function Oi(t, i) {
  var n = (100 * (t - i)) / i;
  return i < 0 ? -n : n;
}
function zi(t, i) {
  var n = Oi(t.Nr(), i),
    s = Oi(t.Sr(), i);
  return new Li(n, s);
}
function Ri(t, i) {
  var n = (100 * (t - i)) / i + 100;
  return i < 0 ? -n : n;
}
function Wi(t, i) {
  var n = Ri(t.Nr(), i),
    s = Ri(t.Sr(), i);
  return new Li(n, s);
}
function Vi(t, i) {
  var n = Math.abs(t);
  if (n < 1e-15) return 0;
  var s = Fi(n + i.Dr) + i.Fr;
  return t < 0 ? -s : s;
}
function Ii(t, i) {
  var n = Math.abs(t);
  if (n < 1e-15) return 0;
  var s = Math.pow(10, n - i.Fr) - i.Dr;
  return t < 0 ? -s : s;
}
function ji(t, i) {
  if (null === t) return null;
  var n = Vi(t.Nr(), i),
    s = Vi(t.Sr(), i);
  return new Li(n, s);
}
function Hi(t, i) {
  if (null === t) return null;
  var n = Ii(t.Nr(), i),
    s = Ii(t.Sr(), i);
  return new Li(n, s);
}
function Ji(t) {
  if (null === t) return Ei;
  var i = Math.abs(t.Sr() - t.Nr());
  if (i >= 1 || i < 1e-15) return Ei;
  var n = Math.ceil(Math.abs(Math.log10(i))),
    s = Ei.Fr + n;
  return { Fr: s, Dr: 1 / Math.pow(10, s) };
}
var qi,
  Ui = (function () {
    function t(t, i) {
      if (
        ((this.Br = t),
        (this.Er = i),
        (function (t) {
          if (t < 0) return !1;
          for (var i = t; i > 1; i /= 10) if (i % 10 != 0) return !1;
          return !0;
        })(this.Br))
      )
        this.Or = [2, 2.5, 2];
      else {
        this.Or = [];
        for (var n = this.Br; 1 !== n; ) {
          if (n % 2 == 0) (this.Or.push(2), (n /= 2));
          else {
            if (n % 5 != 0) throw new Error("unexpected base");
            (this.Or.push(2, 2.5), (n /= 5));
          }
          if (this.Or.length > 100)
            throw new Error("something wrong with base");
        }
      }
    }
    return (
      (t.prototype.zr = function (t, i, n) {
        for (
          var s,
            h,
            r,
            e = 0 === this.Br ? 0 : 1 / this.Br,
            u = Math.pow(10, Math.max(0, Math.ceil(Fi(t - i)))),
            o = 0,
            l = this.Er[0];
          ;

        ) {
          var a = Pi(u, e, 1e-14) && u > e + 1e-14,
            f = Pi(u, n * l, 1e-14),
            c = Pi(u, 1, 1e-14);
          if (!(a && f && c)) break;
          ((u /= l), (l = this.Er[++o % this.Er.length]));
        }
        if (
          (u <= e + 1e-14 && (u = e),
          (u = Math.max(1, u)),
          this.Or.length > 0 &&
            ((s = u), (h = 1), (r = 1e-14), Math.abs(s - h) < r))
        )
          for (o = 0, l = this.Or[0]; Pi(u, n * l, 1e-14) && u > e + 1e-14; )
            ((u /= l), (l = this.Or[++o % this.Or.length]));
        return u;
      }),
      t
    );
  })(),
  Yi = (function () {
    function t(t, i, n, s) {
      ((this.Rr = []),
        (this.Fi = t),
        (this.Br = i),
        (this.Wr = n),
        (this.Vr = s));
    }
    return (
      (t.prototype.zr = function (t, i) {
        if (t < i) throw new Error("high < low");
        var n = this.Fi.li(),
          s = ((t - i) * this.Ir()) / n,
          h = new Ui(this.Br, [2, 2.5, 2]),
          r = new Ui(this.Br, [2, 2, 2.5]),
          e = new Ui(this.Br, [2.5, 2, 2]),
          u = [];
        return (
          u.push(h.zr(t, i, s), r.zr(t, i, s), e.zr(t, i, s)),
          (function (t) {
            if (t.length < 1) throw Error("array is empty");
            for (var i = t[0], n = 1; n < t.length; ++n) t[n] < i && (i = t[n]);
            return i;
          })(u)
        );
      }),
      (t.prototype.jr = function () {
        var t = this.Fi,
          i = t.Vt();
        if (null !== i) {
          var n = t.li(),
            s = this.Wr(n - 1, i),
            h = this.Wr(0, i),
            r = this.Fi.K().entireTextOnly ? this.Hr() / 2 : 0,
            e = r,
            u = n - 1 - r,
            o = Math.max(s, h),
            l = Math.min(s, h);
          if (o !== l) {
            for (
              var a = this.zr(o, l),
                f = o % a,
                c = o >= l ? 1 : -1,
                v = null,
                d = 0,
                _ = o - (f += f < 0 ? a : 0);
              _ > l;
              _ -= a
            ) {
              var w = this.Vr(_, i, !0);
              (null !== v && Math.abs(w - v) < this.Ir()) ||
                w < e ||
                w > u ||
                (d < this.Rr.length
                  ? ((this.Rr[d].ur = w), (this.Rr[d].Jr = t.qr(_)))
                  : this.Rr.push({ ur: w, Jr: t.qr(_) }),
                d++,
                (v = w),
                t.Ur() && (a = this.zr(_ * c, l)));
            }
            this.Rr.length = d;
          } else this.Rr = [];
        } else this.Rr = [];
      }),
      (t.prototype.dr = function () {
        return this.Rr;
      }),
      (t.prototype.Hr = function () {
        return this.Fi.W();
      }),
      (t.prototype.Ir = function () {
        return Math.ceil(2.5 * this.Hr());
      }),
      t
    );
  })();
function $i(t) {
  return t.slice().sort(function (t, i) {
    return F(t.Ui()) - F(i.Ui());
  });
}
!(function (t) {
  ((t[(t.Normal = 0)] = "Normal"),
    (t[(t.Logarithmic = 1)] = "Logarithmic"),
    (t[(t.Percentage = 2)] = "Percentage"),
    (t[(t.IndexedTo100 = 3)] = "IndexedTo100"));
})(qi || (qi = {}));
var Ki,
  Xi = new Ti(),
  Zi = new Ci(100, 1),
  Qi = (function () {
    function t(t, i, n, s) {
      ((this.Yr = 0),
        (this.$r = null),
        (this.Kr = null),
        (this.Xr = null),
        (this.Zr = { Qr: !1, Gr: null }),
        (this.te = 0),
        (this.ie = 0),
        (this.ne = new $()),
        (this.se = new $()),
        (this.he = []),
        (this.re = null),
        (this.ee = null),
        (this.ue = null),
        (this.oe = null),
        (this.ah = Zi),
        (this.le = Ji(null)),
        (this.ji = t),
        (this.un = i),
        (this.ae = n),
        (this.fe = s),
        (this.ce = new Yi(this, 100, this.ve.bind(this), this.de.bind(this))));
    }
    return (
      (t.prototype.Ji = function () {
        return this.ji;
      }),
      (t.prototype.K = function () {
        return this.un;
      }),
      (t.prototype.$s = function (t) {
        if (
          (K(this.un, t),
          this._e(),
          void 0 !== t.mode && this.we({ Me: t.mode }),
          void 0 !== t.scaleMargins)
        ) {
          var i = P(t.scaleMargins.top),
            n = P(t.scaleMargins.bottom);
          if (i < 0 || i > 1)
            throw new Error(
              "Invalid top margin - expect value between 0 and 1, given=".concat(
                i,
              ),
            );
          if (n < 0 || n > 1 || i + n > 1)
            throw new Error(
              "Invalid bottom margin - expect value between 0 and 1, given=".concat(
                n,
              ),
            );
          if (i + n > 1)
            throw new Error(
              "Invalid margins - sum of margins must be less than 1, given=".concat(
                i + n,
              ),
            );
          (this.be(), (this.ee = null));
        }
      }),
      (t.prototype.me = function () {
        return this.un.autoScale;
      }),
      (t.prototype.Ur = function () {
        return 1 === this.un.mode;
      }),
      (t.prototype.pe = function () {
        return 2 === this.un.mode;
      }),
      (t.prototype.ge = function () {
        return 3 === this.un.mode;
      }),
      (t.prototype.Me = function () {
        return {
          zn: this.un.autoScale,
          ye: this.un.invertScale,
          Me: this.un.mode,
        };
      }),
      (t.prototype.we = function (t) {
        var i = this.Me(),
          n = null;
        (void 0 !== t.zn && (this.un.autoScale = t.zn),
          void 0 !== t.Me &&
            ((this.un.mode = t.Me),
            (2 !== t.Me && 3 !== t.Me) || (this.un.autoScale = !0),
            (this.Zr.Qr = !1)),
          1 === i.Me &&
            t.Me !== i.Me &&
            (!(function (t, i) {
              if (null === t) return !1;
              var n = Ii(t.Nr(), i),
                s = Ii(t.Sr(), i);
              return isFinite(n) && isFinite(s);
            })(this.Kr, this.le)
              ? (this.un.autoScale = !0)
              : null !== (n = Hi(this.Kr, this.le)) && this.ke(n)),
          1 === t.Me &&
            t.Me !== i.Me &&
            null !== (n = ji(this.Kr, this.le)) &&
            this.ke(n));
        var s = i.Me !== this.un.mode;
        (s && (2 === i.Me || this.pe()) && this._e(),
          s && (3 === i.Me || this.ge()) && this._e(),
          void 0 !== t.ye &&
            i.ye !== t.ye &&
            ((this.un.invertScale = t.ye), this.xe()),
          this.se.P(i, this.Me()));
      }),
      (t.prototype.Ne = function () {
        return this.se;
      }),
      (t.prototype.W = function () {
        return this.ae.fontSize;
      }),
      (t.prototype.li = function () {
        return this.Yr;
      }),
      (t.prototype.Se = function (t) {
        this.Yr !== t && ((this.Yr = t), this.be(), (this.ee = null));
      }),
      (t.prototype.Ce = function () {
        if (this.$r) return this.$r;
        var t = this.li() - this.Te() - this.Le();
        return ((this.$r = t), t);
      }),
      (t.prototype.Ae = function () {
        return (this.Pe(), this.Kr);
      }),
      (t.prototype.ke = function (t, i) {
        var n = this.Kr;
        (i || (null === n && null !== t) || (null !== n && !n.yr(t))) &&
          ((this.ee = null), (this.Kr = t));
      }),
      (t.prototype.Fe = function () {
        return this.Ae();
      }),
      (t.prototype.De = function (t) {
        this.un.autoScale && (this.un.autoScale = !1);
        var i = Li.Pr(t);
        null === i || i.et() || (this.ke(i, !0), (this.ee = null));
      }),
      (t.prototype.et = function () {
        return (this.Pe(), 0 === this.Yr || !this.Kr || this.Kr.et());
      }),
      (t.prototype.Be = function (t) {
        return this.ye() ? t : this.li() - 1 - t;
      }),
      (t.prototype.jt = function (t, i) {
        return (
          this.pe() ? (t = Oi(t, i)) : this.ge() && (t = Ri(t, i)),
          this.de(t, i)
        );
      }),
      (t.prototype.Ee = function (t, i, n) {
        this.Pe();
        for (
          var s = this.Le(),
            h = F(this.Ae()),
            r = h.Nr(),
            e = h.Sr(),
            u = this.Ce() - 1,
            o = this.ye(),
            l = u / (e - r),
            a = void 0 === n ? 0 : n.from,
            f = void 0 === n ? t.length : n.to,
            c = this.Oe(),
            v = a;
          v < f;
          v++
        ) {
          var d = t[v],
            _ = d.St;
          if (!isNaN(_)) {
            var w = _;
            null !== c && (w = c(d.St, i));
            var M = s + l * (w - r),
              b = o ? M : this.Yr - 1 - M;
            d.gt = b;
          }
        }
      }),
      (t.prototype.ze = function (t, i, n) {
        this.Pe();
        for (
          var s = this.Le(),
            h = F(this.Ae()),
            r = h.Nr(),
            e = h.Sr(),
            u = this.Ce() - 1,
            o = this.ye(),
            l = u / (e - r),
            a = void 0 === n ? 0 : n.from,
            f = void 0 === n ? t.length : n.to,
            c = this.Oe(),
            v = a;
          v < f;
          v++
        ) {
          var d = t[v],
            _ = d.open,
            w = d.high,
            M = d.low,
            b = d.close;
          null !== c &&
            ((_ = c(d.open, i)),
            (w = c(d.high, i)),
            (M = c(d.low, i)),
            (b = c(d.close, i)));
          var m = s + l * (_ - r),
            p = o ? m : this.Yr - 1 - m;
          ((d.Re = p),
            (m = s + l * (w - r)),
            (p = o ? m : this.Yr - 1 - m),
            (d.We = p),
            (m = s + l * (M - r)),
            (p = o ? m : this.Yr - 1 - m),
            (d.Ve = p),
            (m = s + l * (b - r)),
            (p = o ? m : this.Yr - 1 - m),
            (d.Ie = p));
        }
      }),
      (t.prototype.cn = function (t, i) {
        var n = this.ve(t, i);
        return this.je(n, i);
      }),
      (t.prototype.je = function (t, i) {
        var n = t;
        return (
          this.pe()
            ? (n = (function (t, i) {
                return (i < 0 && (t = -t), (t / 100) * i + i);
              })(n, i))
            : this.ge() &&
              (n = (function (t, i) {
                return ((t -= 100), i < 0 && (t = -t), (t / 100) * i + i);
              })(n, i)),
          n
        );
      }),
      (t.prototype.He = function () {
        return this.he;
      }),
      (t.prototype.Je = function () {
        if (this.re) return this.re;
        for (var t = [], i = 0; i < this.he.length; i++) {
          var n = this.he[i];
          (null === n.Ui() && n.Yi(i + 1), t.push(n));
        }
        return ((t = $i(t)), (this.re = t), this.re);
      }),
      (t.prototype.qe = function (t) {
        -1 === this.he.indexOf(t) && (this.he.push(t), this._e(), this.Ue());
      }),
      (t.prototype.Ye = function (t) {
        var i = this.he.indexOf(t);
        if (-1 === i) throw new Error("source is not attached to scale");
        (this.he.splice(i, 1),
          0 === this.he.length && (this.we({ zn: !0 }), this.ke(null)),
          this._e(),
          this.Ue());
      }),
      (t.prototype.Vt = function () {
        for (var t = null, i = 0, n = this.he; i < n.length; i++) {
          var s = n[i].Vt();
          null !== s && (null === t || s.$e < t.$e) && (t = s);
        }
        return null === t ? null : t.Jt;
      }),
      (t.prototype.ye = function () {
        return this.un.invertScale;
      }),
      (t.prototype.dr = function () {
        var t = null === this.Vt();
        if (null !== this.ee && (t || this.ee.Ke === t)) return this.ee.dr;
        this.ce.jr();
        var i = this.ce.dr();
        return ((this.ee = { dr: i, Ke: t }), this.ne.P(), i);
      }),
      (t.prototype.Xe = function () {
        return this.ne;
      }),
      (t.prototype.Ze = function (t) {
        this.pe() ||
          this.ge() ||
          (null === this.ue &&
            null === this.Xr &&
            (this.et() ||
              ((this.ue = this.Yr - t), (this.Xr = F(this.Ae()).kr()))));
      }),
      (t.prototype.Qe = function (t) {
        if (!this.pe() && !this.ge() && null !== this.ue) {
          (this.we({ zn: !1 }), (t = this.Yr - t) < 0 && (t = 0));
          var i = (this.ue + 0.2 * (this.Yr - 1)) / (t + 0.2 * (this.Yr - 1)),
            n = F(this.Xr).kr();
          ((i = Math.max(i, 0.1)), n.Tr(i), this.ke(n));
        }
      }),
      (t.prototype.Ge = function () {
        this.pe() || this.ge() || ((this.ue = null), (this.Xr = null));
      }),
      (t.prototype.tu = function (t) {
        this.me() ||
          (null === this.ue &&
            null === this.oe &&
            (this.et() ||
              ((this.Xr = null),
              (this.oe = t),
              (this.Xr = F(this.Ae()).kr()))));
      }),
      (t.prototype.iu = function (t) {
        if (!this.me() && null !== this.oe) {
          var i = F(this.Ae()).Cr() / (this.Ce() - 1),
            n = t - this.oe;
          this.ye() && (n *= -1);
          var s = n * i,
            h = F(this.Xr).kr();
          (h.Lr(s), this.ke(h, !0), (this.ee = null));
        }
      }),
      (t.prototype.nu = function () {
        this.me() || (null !== this.oe && ((this.oe = null), (this.Xr = null)));
      }),
      (t.prototype.oh = function () {
        return (this.ah || this._e(), this.ah);
      }),
      (t.prototype.Bi = function (t, i) {
        switch (this.un.mode) {
          case 2:
            return this.oh().format(Oi(t, i));
          case 3:
            return this.oh().format(Ri(t, i));
          default:
            return this.su(t);
        }
      }),
      (t.prototype.qr = function (t) {
        switch (this.un.mode) {
          case 2:
          case 3:
            return this.oh().format(t);
          default:
            return this.su(t);
        }
      }),
      (t.prototype.hu = function (t) {
        return this.su(t, F(this.ru()).oh());
      }),
      (t.prototype.eu = function (t, i) {
        return ((t = Oi(t, i)), Xi.format(t));
      }),
      (t.prototype.uu = function () {
        return this.he;
      }),
      (t.prototype.ou = function (t) {
        this.Zr = { Gr: t, Qr: !1 };
      }),
      (t.prototype.Cn = function () {
        this.he.forEach(function (t) {
          return t.Cn();
        });
      }),
      (t.prototype._e = function () {
        this.ee = null;
        var t = this.ru(),
          i = 100;
        (null !== t && (i = Math.round(1 / t.eh())),
          (this.ah = Zi),
          this.pe()
            ? ((this.ah = Xi), (i = 100))
            : this.ge()
              ? ((this.ah = new Ci(100, 1)), (i = 100))
              : null !== t && (this.ah = t.oh()),
          (this.ce = new Yi(this, i, this.ve.bind(this), this.de.bind(this))),
          this.ce.jr());
      }),
      (t.prototype.Ue = function () {
        this.re = null;
      }),
      (t.prototype.ru = function () {
        return this.he[0] || null;
      }),
      (t.prototype.Te = function () {
        return this.ye()
          ? this.un.scaleMargins.bottom * this.li() + this.ie
          : this.un.scaleMargins.top * this.li() + this.te;
      }),
      (t.prototype.Le = function () {
        return this.ye()
          ? this.un.scaleMargins.top * this.li() + this.te
          : this.un.scaleMargins.bottom * this.li() + this.ie;
      }),
      (t.prototype.Pe = function () {
        this.Zr.Qr || ((this.Zr.Qr = !0), this.lu());
      }),
      (t.prototype.be = function () {
        this.$r = null;
      }),
      (t.prototype.de = function (t, _i) {
        if ((this.Pe(), this.et())) return 0;
        t = this.Ur() && t ? Vi(t, this.le) : t;
        var n = F(this.Ae()),
          s = this.Le() + ((this.Ce() - 1) * (t - n.Nr())) / n.Cr();
        return this.Be(s);
      }),
      (t.prototype.ve = function (t, _i) {
        if ((this.Pe(), this.et())) return 0;
        var n = this.Be(t),
          s = F(this.Ae()),
          h = s.Nr() + s.Cr() * ((n - this.Le()) / (this.Ce() - 1));
        return this.Ur() ? Ii(h, this.le) : h;
      }),
      (t.prototype.xe = function () {
        ((this.ee = null), this.ce.jr());
      }),
      (t.prototype.lu = function () {
        var t = this.Zr.Gr;
        if (null !== t) {
          for (
            var i, n, s = null, h = 0, r = 0, e = 0, u = this.uu();
            e < u.length;
            e++
          ) {
            var o = u[e];
            if (o.Wt()) {
              var l = o.Vt();
              if (null !== l) {
                var a = o.uh(t.au(), t.fu()),
                  f = a && a.Ae();
                if (null !== f) {
                  switch (this.un.mode) {
                    case 1:
                      f = ji(f, this.le);
                      break;
                    case 2:
                      f = zi(f, l.Jt);
                      break;
                    case 3:
                      f = Wi(f, l.Jt);
                  }
                  if (((s = null === s ? f : s.Yn(F(f))), null !== a)) {
                    var c = a.cu();
                    null !== c &&
                      ((h = Math.max(h, c.above)), (r = Math.max(h, c.below)));
                  }
                }
              }
            }
          }
          if (
            ((h === this.te && r === this.ie) ||
              ((this.te = h), (this.ie = r), (this.ee = null), this.be()),
            null !== s)
          ) {
            if (s.Nr() === s.Sr()) {
              var v = this.ru(),
                d = 5 * (null === v || this.pe() || this.ge() ? 1 : v.eh());
              (this.Ur() && (s = Hi(s, this.le)),
                (s = new Li(s.Nr() - d, s.Sr() + d)),
                this.Ur() && (s = ji(s, this.le)));
            }
            if (this.Ur()) {
              var _ = Hi(s, this.le),
                w = Ji(_);
              if (((i = w), (n = this.le), i.Fr !== n.Fr || i.Dr !== n.Dr)) {
                var M = null !== this.Xr ? Hi(this.Xr, this.le) : null;
                ((this.le = w),
                  (s = ji(_, w)),
                  null !== M && (this.Xr = ji(M, w)));
              }
            }
            this.ke(s);
          } else
            null === this.Kr &&
              (this.ke(new Li(-0.5, 0.5)), (this.le = Ji(null)));
          this.Zr.Qr = !0;
        }
      }),
      (t.prototype.Oe = function () {
        var t = this;
        return this.pe()
          ? Oi
          : this.ge()
            ? Ri
            : this.Ur()
              ? function (i) {
                  return Vi(i, t.le);
                }
              : null;
      }),
      (t.prototype.su = function (t, i) {
        return void 0 === this.fe.priceFormatter
          ? (void 0 === i && (i = this.oh()), i.format(t))
          : this.fe.priceFormatter(t);
      }),
      t
    );
  })();
!(function (t) {
  ((t.vu = "default"),
    (t.du = "crosshair"),
    (t._u = "pointer"),
    (t.wu = "grabbing"),
    (t.Mu = "zoom-in"),
    (t.bu = "n-resize"),
    (t.mu = "e-resize"),
    (t.pu = "nesw-resize"),
    (t.gu = "nwse-resize"),
    (t.yu = "not-allowed"));
})(Ki || (Ki = {}));
var Gi = (function () {
    function t(t, i) {
      ((this.he = []),
        (this.ku = new Map()),
        (this.Yr = 0),
        (this.xu = 0),
        (this.Nu = 1e3),
        (this.re = null),
        (this.Su = new $()),
        (this.Cu = t),
        (this.zi = i),
        (this.Tu = new xi(this)));
      var n = i.K();
      ((this.Lu = this.Au("left", n.leftPriceScale)),
        (this.Pu = this.Au("right", n.rightPriceScale)),
        this.Lu.Ne().N(this.Fu.bind(this, this.Lu), this),
        this.Pu.Ne().N(this.Fu.bind(this, this.Lu), this),
        this.Du(n));
    }
    return (
      (t.prototype.Du = function (t) {
        if (
          (t.leftPriceScale && this.Lu.$s(t.leftPriceScale),
          t.rightPriceScale && this.Pu.$s(t.rightPriceScale),
          t.localization && (this.Lu._e(), this.Pu._e()),
          t.overlayPriceScales)
        )
          for (var i = 0, n = Array.from(this.ku.values()); i < n.length; i++) {
            var s = F(n[i][0].Ht());
            (s.$s(t.overlayPriceScales), t.localization && s._e());
          }
      }),
      (t.prototype.Bu = function (t) {
        switch (t) {
          case "left":
            return this.Lu;
          case "right":
            return this.Pu;
        }
        return this.ku.has(t) ? P(this.ku.get(t))[0].Ht() : null;
      }),
      (t.prototype.D = function () {
        (this.ri().Eu().A(this),
          this.Lu.Ne().A(this),
          this.Pu.Ne().A(this),
          this.he.forEach(function (t) {
            t.D && t.D();
          }),
          this.Su.P());
      }),
      (t.prototype.Ou = function () {
        return this.Nu;
      }),
      (t.prototype.zu = function (t) {
        this.Nu = t;
      }),
      (t.prototype.ri = function () {
        return this.zi;
      }),
      (t.prototype.oi = function () {
        return this.xu;
      }),
      (t.prototype.li = function () {
        return this.Yr;
      }),
      (t.prototype.Ru = function (t) {
        ((this.xu = t), this.Wu());
      }),
      (t.prototype.Se = function (t) {
        var i = this;
        ((this.Yr = t),
          this.Lu.Se(t),
          this.Pu.Se(t),
          this.he.forEach(function (n) {
            if (i.Vu(n)) {
              var s = n.Ht();
              null !== s && s.Se(t);
            }
          }),
          this.Wu());
      }),
      (t.prototype.He = function () {
        return this.he;
      }),
      (t.prototype.Vu = function (t) {
        var i = t.Ht();
        return null === i || (this.Lu !== i && this.Pu !== i);
      }),
      (t.prototype.qe = function (t, i, n) {
        var s = void 0 !== n ? n : this.ju().Iu + 1;
        this.Hu(t, i, s);
      }),
      (t.prototype.Ye = function (t) {
        var i = this.he.indexOf(t);
        (A(-1 !== i, "removeDataSource: invalid data source"),
          this.he.splice(i, 1));
        var n = F(t.Ht()).Ji();
        if (this.ku.has(n)) {
          var s = P(this.ku.get(n)),
            h = s.indexOf(t);
          -1 !== h && (s.splice(h, 1), 0 === s.length && this.ku.delete(n));
        }
        var r = t.Ht();
        (r && r.He().indexOf(t) >= 0 && r.Ye(t),
          null !== r && (r.Ue(), this.Ju(r)),
          (this.re = null));
      }),
      (t.prototype.qu = function () {
        return this.he
          .filter(function (t) {
            return t instanceof Qt;
          })
          .map(function (t) {
            return t;
          });
      }),
      (t.prototype.Uu = function (t) {
        var i = this.he
          .filter(function (i) {
            return i instanceof Qt && i.Ji() === t;
          })
          .map(function (t) {
            return t;
          });
        return i.length > 0 ? i[0] : null;
      }),
      (t.prototype.Yu = function () {
        return this.he
          .filter(function (t) {
            return t instanceof Qt && t.Gn();
          })
          .map(function (t) {
            return t;
          });
      }),
      (t.prototype.$u = function (t) {
        return t === this.Lu ? "left" : t === this.Pu ? "right" : "overlay";
      }),
      (t.prototype.Ku = function () {
        return this.Lu;
      }),
      (t.prototype.Us = function () {
        return this.Pu;
      }),
      (t.prototype.Xu = function (t, i) {
        t.Ze(i);
      }),
      (t.prototype.Zu = function (t, i) {
        (t.Qe(i), this.Wu());
      }),
      (t.prototype.Qu = function (t) {
        t.Ge();
      }),
      (t.prototype.Gu = function (t, i) {
        t.tu(i);
      }),
      (t.prototype.io = function (t, i) {
        (t.iu(i), this.Wu());
      }),
      (t.prototype.no = function (t) {
        t.nu();
      }),
      (t.prototype.Wu = function () {
        this.he.forEach(function (t) {
          t.Cn();
        });
      }),
      (t.prototype.fn = function () {
        var t = null;
        return (
          this.zi.K().rightPriceScale.visible && 0 !== this.Pu.He().length
            ? (t = this.Pu)
            : this.zi.K().leftPriceScale.visible && 0 !== this.Lu.He().length
              ? (t = this.Lu)
              : 0 !== this.he.length && (t = this.he[0].Ht()),
          null === t && (t = this.Pu),
          t
        );
      }),
      (t.prototype.so = function () {
        var t = null;
        return (
          this.zi.K().rightPriceScale.visible
            ? (t = this.Pu)
            : this.zi.K().leftPriceScale.visible && (t = this.Lu),
          t
        );
      }),
      (t.prototype.Ju = function (t) {
        null !== t && t.me() && this.ho(t);
      }),
      (t.prototype.ro = function (t) {
        var i = this.Cu.es();
        (t.we({ zn: !0 }), null !== i && t.ou(i), this.Wu());
      }),
      (t.prototype.eo = function () {
        (this.ho(this.Lu), this.ho(this.Pu));
      }),
      (t.prototype.uo = function () {
        var t = this;
        (this.Ju(this.Lu),
          this.Ju(this.Pu),
          this.he.forEach(function (i) {
            t.Vu(i) && t.Ju(i.Ht());
          }),
          this.Wu(),
          this.zi.oo());
      }),
      (t.prototype.Je = function () {
        return (null === this.re && (this.re = $i(this.he)), this.re);
      }),
      (t.prototype.lo = function () {
        return this.Su;
      }),
      (t.prototype.ao = function () {
        return this.Tu;
      }),
      (t.prototype.ho = function (t) {
        var i = t.uu();
        if (i && i.length > 0 && !this.Cu.et()) {
          var n = this.Cu.es();
          null !== n && t.ou(n);
        }
        t.Cn();
      }),
      (t.prototype.ju = function () {
        var t = this.Je();
        if (0 === t.length) return { fo: 0, Iu: 0 };
        for (var i = 0, n = 0, s = 0; s < t.length; s++) {
          var h = t[s].Ui();
          null !== h && (h < i && (i = h), h > n && (n = h));
        }
        return { fo: i, Iu: n };
      }),
      (t.prototype.Hu = function (t, i, n) {
        var s = this.Bu(i);
        if (
          (null === s && (s = this.Au(i, this.zi.K().overlayPriceScales)),
          this.he.push(t),
          !Tt(i))
        ) {
          var h = this.ku.get(i) || [];
          (h.push(t), this.ku.set(i, h));
        }
        (s.qe(t), t.$i(s), t.Yi(n), this.Ju(s), (this.re = null));
      }),
      (t.prototype.Fu = function (t, i, n) {
        i.Me !== n.Me && this.ho(t);
      }),
      (t.prototype.Au = function (t, i) {
        var n = U({ visible: !0, autoScale: !0 }, tt(i)),
          s = new Qi(t, n, this.zi.K().layout, this.zi.K().localization);
        return (s.Se(this.li()), s);
      }),
      t
    );
  })(),
  tn = (function (t) {
    function i(i, n, s, h) {
      var r = t.call(this, i, n) || this;
      return ((r.Mh = s), (r.co = h), r);
    }
    return (
      q(i, t),
      (i.prototype.clone = function () {
        return new i(this.x, this.y, this.Mh, this.co);
      }),
      i
    );
  })(h),
  nn = (function () {
    function t(t) {
      this.dt = void 0 !== t ? t : null;
    }
    return (
      (t.prototype._t = function (t) {
        this.dt = t;
      }),
      (t.prototype.vo = function (t) {
        this.dt = K(this.dt, t);
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        if (null !== this.dt && this.dt.Wt) {
          for (
            var h = [], r = [], e = [], u = [], o = 0;
            o < this.dt.Es.length;
            ++o
          ) {
            var l = this.dt.Es[o],
              a = this.dt.do[o];
            l.co ? (h.push(l), r.push(a)) : (e.push(l), u.push(a));
          }
          ((t.strokeStyle = this.dt.j),
            h.length && this._o(t, i, h, r, rn, hn),
            e.length && this._o(t, i, e, u, un, en));
        }
      }),
      (t.prototype.lt = function (t, i) {
        if (null === this.dt) return null;
        for (var n = new h(t, i), s = 0; s < this.dt.Es.length; ++s) {
          var r = this.dt.Es[s];
          if (r.subtract(n).length() <= this.dt.kt + si) {
            var e = void 0 !== this.dt.wo ? this.dt.wo[s] : Ki.vu,
              u = r.Mh;
            return new ii(this.dt.Mo, { bo: u, mo: e });
          }
        }
        return null;
      }),
      (t.prototype._o = function (t, i, n, s, h, r) {
        var e = F(this.dt),
          u = e.po,
          o = Math.max(1, Math.floor((e.yo || 2) * i));
        e.Gn && (o += Math.max(1, Math.floor(i / 2)));
        var l = Math.max(1, Math.floor(i)),
          a = Math.round(e.kt * i * 2);
        i % 2 != l % 2 && (a += 1);
        for (var f = (l % 2) / 2, c = 0; c < n.length; ++c) {
          var v = n[c];
          if (
            ((t.fillStyle = s[c]), !Number.isInteger(v.Mh) || e.ko !== v.Mh)
          ) {
            var d = Math.round(v.x * i) + f,
              _ = Math.round(v.y * i) + f;
            if (
              (h(t, new tn(d, _, v.Mh, v.co), a / 2, o),
              v.subtract(u).length() <= e.kt + si)
            ) {
              var w = Math.max(1, Math.floor(e.xo * i));
              r(t, new tn(d, _, v.Mh, v.co), a / 2, w);
            }
          }
        }
      }),
      t
    );
  })();
function sn(t, i, n, s) {
  t.lineWidth = s;
  var h = n + s / 2;
  (ri(t, i.x - h, i.y - h, 2 * h, 2 * h, (n + s) / 2), t.closePath());
}
function hn(t, i, n, s) {
  ((t.globalAlpha = 0.2), sn(t, i, n, s), t.stroke(), (t.globalAlpha = 1));
}
function rn(t, i, n, s) {
  (sn(t, i, n - s, s), t.fill(), t.stroke());
}
function en(t, i, n, s) {
  ((t.lineWidth = s),
    (t.globalAlpha = 0.2),
    t.beginPath(),
    t.arc(i.x, i.y, n + s / 2, 0, 2 * Math.PI, !0),
    t.closePath(),
    t.stroke(),
    (t.globalAlpha = 1));
}
function un(t, i, n, s) {
  ((t.lineWidth = s),
    t.beginPath(),
    t.arc(i.x, i.y, n - s / 2, 0, 2 * Math.PI, !0),
    t.closePath(),
    t.fill(),
    t.stroke());
}
var on = (function () {
    function t(t, i) {
      ((this.Ls = []),
        (this.fs = !0),
        (this.No = null),
        (this.So = null),
        (this.Co = []),
        (this.Kn = null),
        (this.To = []),
        (this.Lo = !1),
        (this.Zn = t),
        (this.Qn = i));
    }
    return (
      (t.prototype.Ao = function (t, i, n, s) {
        if (s && ((this.Kn && this.Kn.lt) || !this.Zn.Fs())) {
          var r = this.Qn.Po(),
            e = new h(r.ai(), r.fi()),
            u = new h(r.bn(), r.mn()),
            o =
              11 !== n || s.Fo
                ? 9 === n
                  ? this.Do(t, i, u, e, s)
                  : 6 === n
                    ? this.Bo(t, i, u, e, s)
                    : 10 === n && this.Eo(t)
                : this.Oo(t, i, u, e, s);
          (s.Fo || (s.Fo = this.Zn.Gs() || !this.Zn.Fs()),
            (o || this.Zn.Xs() || this.Zn.Gs() || !this.Zn.Fs()) && this.zo());
        }
      }),
      (t.prototype.Bt = function (t, i, _n) {
        return this.Zn.K().visible ? (this.fs && this.cs(t, i), this.Kn) : null;
      }),
      (t.prototype.jt = function (t) {
        var i = this.Zn.Ht(),
          n = this.Zn.us();
        if (null === i) return null;
        var s = null !== n ? n.Vt() : null;
        return null === s ? null : i.jt(t, s.Jt);
      }),
      (t.prototype.po = function () {
        var t = this.Qn.Po();
        return new h(t.bn(), t.mn());
      }),
      (t.prototype.ko = function () {
        return this.Zn.Gs() ? this.So : null;
      }),
      (t.prototype.Ro = function () {
        return this.Zn.Xs() || this.Zn.Gn() || this.Zn.Gs() || !this.Zn.Fs();
      }),
      (t.prototype.Ft = function () {
        this.fs = !0;
      }),
      (t.prototype.Wo = function (t) {
        t.st(this.Vo({ Es: this.Ls }, 0));
      }),
      (t.prototype.zo = function () {
        var t = this;
        (this.Co.forEach(function (i) {
          i.vo({ Es: t.Ls, Gn: t.Zn.Gn(), Wt: t.Ro(), po: t.po(), ko: t.ko() });
        }),
          this.Qn.Bs(this.Zn),
          this.Zn.Cn());
      }),
      (t.prototype.Vo = function (t, i) {
        var n = this.Io(i);
        return (
          n._t(
            U(U({}, t), {
              kt: 6,
              yo: 1,
              j: "#1E53E5",
              xo: 4,
              Gn: this.Zn.Gn(),
              Wt: this.Ro(),
              po: this.po(),
              do: this.jo(t.Es),
              ko: this.Zn.Gs() ? this.ko() : null,
              Mo: ti.gh,
            }),
          ),
          n
        );
      }),
      (t.prototype.Ho = function (t, i, n) {
        var s = t.Js().Uu(n);
        if (null !== s) {
          var h = tt(s.dh());
          this.Qn.Jo(h, i);
        }
      }),
      Object.defineProperty(t.prototype, "qo", {
        get: function () {
          return this.Lo;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.Uo = function (t) {
        this.Lo = t;
      }),
      (t.prototype.Eo = function (t) {
        if (
          ("LongShortPosition" === this.Zn.sh() && this.Uo(!1), this.Zn.Fs())
        ) {
          if (this.Zn.Gs()) {
            (this.Qn.$o().Yo(),
              this.Ko(),
              (this.No = null),
              (this.So = null),
              this.Zn.th(!1),
              this.Zn.nh(!1));
            i = this.Zn.Ji();
            return (this.Ho(t, "lineToolEdited", i), !0);
          }
        } else {
          "LongShortPosition" !== this.Zn.sh() && this.Zn.Ds();
          var i = this.Zn.Ji();
          this.Zn.Gs() || this.Zn.ih()
            ? this.Zn.Fs() && this.Ho(t, "pathFinished", i)
            : this.Ho(t, "lineToolFinished", i);
        }
        return !1;
      }),
      (t.prototype.Oo = function (t, i, n, s, h) {
        var r;
        if (!this.Zn.Fs())
          return (this.Zn.hh() && this.Zn.Os(this.Zn.js(s)), !1);
        if (!this.Zn.Gn()) return !1;
        if (this.Zn.Gs()) {
          if ((t.Xo(null !== this.So ? Ki.vu : Ki.wu), null !== this.So))
            if ((this.Zo(s, h, !0, n), "LongShortPosition" === this.Zn.sh())) {
              var e = this.Zn,
                u = F(this.Zn.Ht()),
                o = this.Qn.zt(),
                l = F(this.Zn.us()).Vt(),
                a = JSON.parse(JSON.stringify(e.Qo())),
                f = JSON.parse(JSON.stringify(s));
              if (null !== l) {
                if (
                  ((0 !== this.So && 1 !== this.So) ||
                    !e.Go(this.So, f, a) ||
                    (e.tl(e.il()), this.Uo(!0), e.nl()),
                  0 === this.So || 1 === this.So)
                ) {
                  var c = o.Hs(s.x).timestamp,
                    v = u.cn(s.y, l.Jt);
                  ((v = Number(u.Bi(v, l.Jt))),
                    this.Zn.Rs(this.So, { price: v, timestamp: c }));
                  var d = o.Wi({ timestamp: c }),
                    _ = u.jt(v, l.Jt);
                  ((this.Ls[this.So].x = d), (this.Ls[this.So].y = _));
                } else if (2 === this.So) {
                  var w = u.cn(s.y, l.Jt);
                  ((w = Number(u.Bi(w, l.Jt))),
                    this.Zn.Rs(this.So, {
                      price: w,
                      timestamp: this.Zn.Es()[1].timestamp,
                    }));
                }
                ((this.Ls[2].x = o.Wi({
                  timestamp: this.Zn.Es()[2].timestamp,
                })),
                  (this.Ls[2].y = u.jt(this.Zn.Es()[2].price, l.Jt)));
              }
            } else this.Zn.Rs(this.So, this.Zn.js(s));
          else if (this.No) {
            var M = s.subtract(this.No);
            (this.Ls.forEach(function (t) {
              ((t.x = t.x + M.x), (t.y = t.y + M.y));
            }),
              (this.No = s),
              this.Ko());
          }
        } else {
          var b = this.Nh(t, i, n),
            m = null == b ? void 0 : b.Mh();
          (this.Zn.th(this.Zn.Xs() || !!b),
            (this.No = s),
            (this.So =
              null !== (r = null == m ? void 0 : m.bo) && void 0 !== r
                ? r
                : this.So),
            m && this.Qn.$o().sl());
        }
        return !1;
      }),
      (t.prototype.Do = function (t, i, n, s, h) {
        var r, e, u, o;
        if (this.Zn.Fs()) {
          var l = this.Nh(t, i, n),
            a = this.Zn.Zs(null !== l && !h.Fo);
          return (
            this.Zn.Xs() &&
              !h.Fo &&
              (!0 === this.Zn.K().editable
                ? (t.Xo(
                    (null === (r = null == l ? void 0 : l.Mh()) || void 0 === r
                      ? void 0
                      : r.mo) || Ki._u,
                  ),
                  (this.So =
                    null !==
                      (u =
                        null === (e = null == l ? void 0 : l.Mh()) ||
                        void 0 === e
                          ? void 0
                          : e.bo) && void 0 !== u
                      ? u
                      : null))
                : t.Xo(
                    (null === (o = null == l ? void 0 : l.Mh()) || void 0 === o
                      ? void 0
                      : o.mo) || Ki.yu,
                  )),
            a
          );
        }
        if ("LongShortPosition" === this.Zn.sh()) {
          var f = this.Zn;
          if (!this.Zn.Fs() && 1 === f.hl()) {
            this.Zn.rh() && this.Qn.$o().sl();
            var c = F(this.Zn.Ht()),
              v = c.Vt();
            this.Zo(s, h, !1, n);
            var d = this.Zn.js(s);
            (null !== v && (d.price = Number(c.Bi(d.price, v))), this.Zn.rl(d));
          }
        } else
          (this.Zn.rh() && this.Qn.$o().sl(),
            this.Zo(s, h, !1, n),
            this.Zn.Vs(this.Zn.js(s)));
        return !1;
      }),
      (t.prototype.Bo = function (t, i, n, s, h) {
        if (((this.To = this.Ls), "LongShortPosition" === this.Zn.sh())) {
          var r = this.Zn;
          if (3 === this.Zn.Es().length && 2 === r.hl()) {
            var e = F(this.Zn.Ht()),
              u = F(e.Vt()),
              o = Number(e.Bi(this.Zn.Es()[0].price, u)),
              l = Number(e.Bi(this.Zn.Es()[1].price, u));
            r.tl(o > l);
          }
        }
        if (!this.Zn.Fs()) {
          if ("LongShortPosition" === this.Zn.sh()) {
            this.Uo(!1);
            r = this.Zn;
            !this.Zn.Fs() &&
              r.hl() < 2 &&
              (r.el(r.hl() + 1), this.Zn.Os(this.Zn.js(s)));
          } else (this.Zo(s, h, !1, n), this.Zn.Os(this.Zn.js(s)));
          return !1;
        }
        if (!0 === this.Zn.K().editable) {
          var a = this.Nh(t, i, n);
          return null === a
            ? (this.Zn.Qs(!1), !0)
            : this.Zn.Qs(null !== a && !h.Fo);
        }
        return !1;
      }),
      (t.prototype.Ko = function () {
        var t = this;
        this.Zn.Ws(
          this.Ls.map(function (i) {
            return t.Zn.js(i);
          }),
        );
      }),
      (t.prototype.Nh = function (t, i, n) {
        var s;
        return (null === (s = this.Kn) || void 0 === s ? void 0 : s.lt)
          ? this.Kn.lt(n.x, n.y, i)
          : null;
      }),
      (t.prototype.jo = function (t) {
        var i = this,
          n = F(this.Qn.ul(this.Zn)).li();
        return t.map(function (t) {
          return i.Qn.Ut(t.y / n);
        });
      }),
      (t.prototype.cs = function (_t, _i) {
        if (((this.fs = !1), !this.Qn.zt().et() && this.ol())) {
          this.Ls = [];
          var n = this.Zn.Es(),
            s = F(this.Zn.Ht()),
            h = this.Qn.zt(),
            r = F(this.Zn.us()).Vt();
          if ("LongShortPosition" === this.Zn.sh()) {
            for (var e = this.Zn, u = 0; u < 2; u++) {
              if (void 0 !== (f = n[u])) {
                var o = h.Wi({ timestamp: f.timestamp }),
                  l = NaN;
                (null !== r && (l = s.jt(f.price, r.Jt)),
                  this.Ls.push(new tn(o, l, u, !1)));
              }
            }
            if (n.length >= 3) {
              var a = e.ll(e.Es()[2]);
              ((o = h.Wi({ timestamp: a.timestamp })), (l = NaN));
              (null !== r && (l = s.jt(a.price, r.Jt)),
                this.Ls.push(new tn(o, l, 2, !1)));
            }
          } else
            for (u = 0; u < n.length; u++) {
              var f;
              if (!(f = this.Zn.Is(n[u]))) return;
              ((f.Mh = u), this.Ls.push(f));
            }
        }
      }),
      (t.prototype.ol = function () {
        var t = this.Zn.Ht();
        return null !== t && !t.et();
      }),
      (t.prototype.Io = function (t) {
        for (; this.Co.length <= t; ) this.Co.push(new nn());
        return this.Co[t];
      }),
      (t.prototype.Zo = function (t, i, n, _s) {
        var h = this.al(),
          r = String(this.Zn.sh());
        if (!0 === i.fl && !0 === h && this.Ls.length > 0)
          if (n)
            if (1 === this.So) t.y = this.Ls[0].y;
            else if (0 === this.So) t.y = this.Ls[1].y;
            else if (2 === this.So) {
              var e = this.Ls[0].y - this.Ls[1].y;
              t.y = this.Ls[2].y - e;
            } else 3 === this.So && (t.y = this.Ls[2].y);
          else
            !0 === i.fl &&
              !0 === h &&
              this.Ls.length > 0 &&
              (t.y = this.Ls[0].y);
        ("FibRetracement" === r &&
          !0 === i.fl &&
          2 === this.Ls.length &&
          null !== this.So &&
          2 === this.To.length &&
          (t.y = this.To[this.So].y),
          "LongShortPosition" === r &&
            !0 === i.fl &&
            this.Ls.length >= 2 &&
            null !== this.So &&
            this.To.length >= 2 &&
            (0 === this.So
              ? (t.y = this.To[0].y)
              : 1 === this.So && (t.y = this.To[1].y)),
          "Rectangle" === r &&
            !0 === i.fl &&
            2 === this.Ls.length &&
            null !== this.So &&
            2 === this.To.length &&
            (0 === this.So || 3 === this.So
              ? (t.y = this.To[0].y)
              : (1 !== this.So && 2 !== this.So) || (t.y = this.To[1].y)),
          "PriceRange" === r &&
            !0 === i.fl &&
            2 === this.Ls.length &&
            null !== this.So &&
            2 === this.To.length &&
            (0 === this.So || 3 === this.So
              ? (t.y = this.To[0].y)
              : (1 !== this.So && 2 !== this.So) || (t.y = this.To[1].y)));
      }),
      (t.prototype.al = function () {
        var t = !1,
          i = String(this.Zn.sh());
        return (
          ("TrendLine" !== i &&
            "Ray" !== i &&
            "Arrow" !== i &&
            "ExtendedLine" !== i &&
            "ParallelChannel" !== i) ||
            (t = !0),
          t
        );
      }),
      t
    );
  })(),
  ln = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.cl = new hi()), (s.vl = new oi()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        var i,
          n = this.Zn.K();
        if (n.visible) {
          ((this.Kn = null), (this.fs = !1));
          var s = this.Zn.Ht(),
            r = this.Qn.zt();
          if (s && !s.et() && !r.et()) {
            var e = r.dl();
            if (null !== e) {
              var u = this.Zn.Es();
              if (!(u.length < 2)) {
                var o = u[0],
                  l = u[1];
                if (o && l) {
                  var a = this.Zn.us(),
                    f = null == a ? void 0 : a.Vt();
                  if (f) {
                    var c = s.jt(o.price, f.Jt),
                      v = s.jt(l.price, f.Jt),
                      d = this.Qn.ul(this.Zn),
                      _ =
                        null !== (i = null == d ? void 0 : d.li()) &&
                        void 0 !== i
                          ? i
                          : 0,
                      w = (c < 0 && v < 0) || (c > _ && v > _),
                      M =
                        Math.min(u[0].timestamp, u[1].timestamp) > Number(e.to),
                      b =
                        Math.max(u[0].timestamp, u[1].timestamp) <
                        Number(e.from);
                    if (
                      !(w || M || b) ||
                      n.line.extend.left ||
                      n.line.extend.right
                    ) {
                      if ((t.prototype.cs.call(this), this.Ls.length < 2))
                        return;
                      var m = new et();
                      if (
                        (this.cl._t({ Ch: n.line, Es: this.Ls }),
                        m.st(this.cl),
                        n.text.value)
                      ) {
                        var p = this.Ls[0],
                          g = this.Ls[1],
                          y = p.x < g.x ? p : g,
                          k = y === p ? g : p,
                          x =
                            (Math.atan((k.y - y.y) / (k.x - y.x)) / Math.PI) *
                            -180,
                          N = n.text.box.alignment.horizontal,
                          S =
                            "left" === N
                              ? y.clone()
                              : "right" === N
                                ? k.clone()
                                : new h((p.x + g.x) / 2, (p.y + g.y) / 2),
                          C = Gt(n.text);
                        ((C.box = U(U({}, C.box), { angle: x })),
                          this.vl._t({ wi: C, Es: [S] }),
                          m.st(this.vl));
                      }
                      (this.Wo(m), (this.Kn = m));
                    }
                  }
                }
              }
            }
          }
        }
      }),
      i
    );
  })(on),
  an = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "TrendLine"), h._h([new ln(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 2;
      }),
      i
    );
  })(Qt),
  fn = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.qs = "Arrow"), i);
    }
    return (q(i, t), i);
  })(an),
  cn = (function (t) {
    function i(i) {
      var n = t.call(this) || this;
      return (
        (n._l = new ii(ti.ph)),
        (n.Nh = i || new ii(ti.mh)),
        (n.dt = null),
        n
      );
    }
    return (
      q(i, t),
      (i.prototype._t = function (t) {
        this.dt = t;
      }),
      (i.prototype.lt = function (t, i) {
        if (null === this.dt) return null;
        var n = this.dt.Ch.width || 1,
          s = new h(t, i),
          r = Math.max(ni, Math.ceil(n / 2)),
          e = this.dt.Es.length;
        if (1 === e)
          return (function (t, i, n) {
            return (
              (t.x - i.x) * (t.x - i.x) + (t.y - i.y) * (t.y - i.y) <= n * n
            );
          })(s, this.dt.Es[0], r)
            ? this.Nh
            : null;
        for (var u = 1; u < e; u++)
          if (_(this.dt.Es[u - 1], this.dt.Es[u], s)._ <= r) return this.Nh;
        return this.dt.m &&
          e > 0 &&
          _(this.dt.Es[0], this.dt.Es[e - 1], s)._ <= r
          ? this.Nh
          : this.dt.m && M(s, this.dt.Es)
            ? this._l
            : null;
      }),
      (i.prototype.ft = function (t, _i, _n) {
        var s, h;
        if (null !== this.dt && this.dt.Es && this.dt.Es.length) {
          var r = this.dt.Es.length,
            e = this.dt.Ch.style || 0,
            u = this.dt.Ch.join || "round",
            o = this.dt.Ch.cap || "butt",
            l = this.dt.Ch.color || "white",
            a = this.dt.Ch.width || 1;
          if (1 === r) return this.wl(t, this.dt.Es[0], r / 2, l);
          (t.beginPath(),
            (t.lineCap = o),
            (t.lineJoin = u),
            (t.lineWidth = a),
            (t.strokeStyle = l),
            y(t, e),
            t.moveTo(this.dt.Es[0].x, this.dt.Es[0].y));
          for (var f = 0, c = this.dt.Es; f < c.length; f++) {
            var v = c[f];
            t.lineTo(v.x, v.y);
          }
          if (
            (this.dt.m && ((t.fillStyle = this.dt.m.color), t.fill()),
            a > 0 && t.stroke(),
            r > 1)
          ) {
            var d;
            if (
              ("butt" !== o && (t.lineCap = "butt"),
              1 === ((s = this.dt.Ch.end) != null ? s.left : void 0))
            )
              L(
                (d = this.Ml(this.dt.Es[1], this.dt.Es[0], a, o))[0],
                d[1],
                t,
                a,
                1,
              );
            if (1 === ((h = this.dt.Ch.end) != null ? h.right : void 0))
              L(
                (d = this.Ml(this.dt.Es[r - 2], this.dt.Es[r - 1], a, o))[0],
                d[1],
                t,
                a,
                1,
              );
          }
        }
      }),
      (i.prototype.wl = function (t, i, n, s) {
        0 === n &&
          (t.beginPath(),
          (t.fillStyle = s),
          t.arc(i.x, i.y, n, 0, 2 * Math.PI, !0),
          t.fill(),
          t.closePath());
      }),
      (i.prototype.Ml = function (t, i, n, s) {
        var h = i.subtract(t),
          r = h.length();
        if ("butt" === s || r < 1) return [t, i];
        var e = r + n / 2;
        return [t, h.scaled(e / r).add(t)];
      }),
      i
    );
  })(ut),
  vn = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.bl = new cn()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        if (
          (t.prototype.cs.call(this), (this.Kn = null), 0 !== this.Ls.length)
        ) {
          for (
            var i = this.Zn.ml(),
              n = Math.max(1, this.Zn.pl()),
              s = [this.Ls[0]],
              h = 1;
            h < this.Ls.length;
            h++
          ) {
            for (
              var r = this.Ls[h].subtract(this.Ls[h - 1]),
                e = r.length(),
                u = Math.min(5, Math.floor(e / n)),
                o = r.normalized().scaled(e / u),
                l = 0;
              l < u - 1;
              l++
            )
              s.push(this.Ls[h - 1].add(o.scaled(l)));
            s.push(this.Ls[h]);
          }
          var a = this.gl(s, n);
          this.bl._t({ Ch: i.line, m: i.background, Es: a });
          var f = new et();
          (f.st(this.bl), (this.Kn = f));
        }
      }),
      (i.prototype.gl = function (t, i) {
        var n = new Array(t.length);
        if (1 === t.length) return t;
        for (var s = 0; s < t.length; s++) {
          for (var r = new h(0, 0), e = 0; e < i; e++) {
            var u = Math.max(s - e, 0),
              o = Math.min(s + e, t.length - 1);
            r = (r = r.add(t[u])).add(t[o]);
          }
          n[s] = r.scaled(0.5 / i);
        }
        return (n.push(t[t.length - 1]), n);
      }),
      i
    );
  })(on),
  dn = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "Brush"), h._h([new vn(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return -1;
      }),
      (i.prototype.pl = function () {
        return 5;
      }),
      (i.prototype.ml = function () {
        return this.K();
      }),
      (i.prototype.Os = function (i) {
        if (!this.xs) {
          if (((this.Ts = null), this.Ls.length > 0)) {
            var n = this.Ls[this.Ls.length - 1],
              s = F(this.Is(n));
            if (F(this.Is(i)).subtract(s).length() < 2) return;
          }
          return t.prototype.Os.call(this, i);
        }
      }),
      (i.prototype.rh = function () {
        return !1;
      }),
      (i.prototype.hh = function () {
        return !0;
      }),
      i
    );
  })(Qt),
  _n = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.cl = new hi()), (s.vl = new oi()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        var i,
          n = this.Zn.K();
        if (n.visible) {
          ((this.Kn = null), (this.fs = !1));
          var s = this.Zn.Ht(),
            h = this.Qn.zt();
          if (s && !s.et() && !h.et()) {
            var r = h.dl();
            if (null !== r) {
              var e = this.Zn.Es();
              if (!(e.length < 2)) {
                var u = e[0],
                  o = e[1];
                if (u && o) {
                  var l = this.Zn.us(),
                    a = null == l ? void 0 : l.Vt();
                  if (a) {
                    var f = s.jt(u.price, a.Jt),
                      c = s.jt(o.price, a.Jt),
                      v = this.Qn.ul(this.Zn),
                      d =
                        null !== (i = null == v ? void 0 : v.li()) &&
                        void 0 !== i
                          ? i
                          : 0,
                      _ = (f < 0 && c < 0) || (f > d && c > d),
                      w =
                        Math.min(e[0].timestamp, e[1].timestamp) > Number(r.to),
                      M =
                        Math.max(e[0].timestamp, e[1].timestamp) <
                        Number(r.from);
                    if (
                      !(_ || w || M) ||
                      n.line.extend.left ||
                      n.line.extend.right
                    ) {
                      if ((t.prototype.cs.call(this), this.Ls.length < 2))
                        return;
                      var b = new et();
                      if (
                        (this.cl._t({ Ch: n.line, Es: this.Ls }),
                        b.st(this.cl),
                        n.text.value)
                      ) {
                        var m = this.Ls[1].clone(),
                          p = Gt(n.text);
                        ((p.box = U(U({}, p.box), { angle: 0 })),
                          this.vl._t({ wi: p, Es: [m] }),
                          b.st(this.vl));
                      }
                      (this.Wo(b), (this.Kn = b));
                    }
                  }
                }
              }
            }
          }
        }
      }),
      i
    );
  })(on),
  wn = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "Callout"), h._h([new _n(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 2;
      }),
      i
    );
  })(Qt),
  Mn = (function () {
    function t(t, i) {
      ((this._l = i || new ii(ti.ph)),
        (this.Nh = t || new ii(ti.mh)),
        (this.dt = null));
    }
    return (
      (t.prototype._t = function (t) {
        this.dt = t;
      }),
      (t.prototype.lt = function (t, i, _n) {
        if (null === this.dt || this.dt.points.length < 2) return null;
        var s = new h(t, i),
          r = this.dt.points,
          e = r[0],
          u = r[1],
          o = Math.sqrt(Math.pow(e.x - s.x, 2) + Math.pow(e.y - s.y, 2)),
          l = bn(e, u),
          a = this.yl(1);
        return (o >= l + a - 12 && o <= l + a) || o <= 24 ? this.Nh : null;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        var h;
        if (!(this.kl() || null === this.dt || this.dt.points.length < 2)) {
          t.save();
          var r = this.yl(i),
            e = this.dt.points,
            u = e[0],
            o = e[1],
            l = this.xl(u),
            a = l[0],
            f = l[1],
            c = this.Nl(u, o);
          if (this.Sl(t, a, f, c)) {
            var v = this.dt.background,
              d =
                null === (h = this.dt.border) || void 0 === h
                  ? void 0
                  : h.color;
            (this.Cl(t, a, f, this.Nl(u, o), null == v ? void 0 : v.color),
              this.Tl(t, a, f, this.Nl(u, o), r, d, void 0 !== d),
              t.restore());
          }
        }
      }),
      (t.prototype.kl = function () {
        var t, i, n, s;
        return (
          null === this.dt ||
          this.dt.points.length < 2 ||
          (((null ===
            (i = null === (t = this.dt) || void 0 === t ? void 0 : t.border) ||
          void 0 === i
            ? void 0
            : i.width) || 0) <= 0 &&
            !(null ===
              (s =
                null === (n = this.dt) || void 0 === n
                  ? void 0
                  : n.background) || void 0 === s
              ? void 0
              : s.color))
        );
      }),
      (t.prototype.yl = function (t) {
        var i,
          n,
          s =
            (null ===
              (n =
                null === (i = this.dt) || void 0 === i ? void 0 : i.border) ||
            void 0 === n
              ? void 0
              : n.width) || 0;
        return s ? Math.max(1, Math.floor(s * t)) : 0;
      }),
      (t.prototype.xl = function (t) {
        return [t.x, t.y];
      }),
      (t.prototype.Nl = function (t, i) {
        return bn(t, i);
      }),
      (t.prototype.Cl = function (t, i, n, s, h) {
        void 0 !== h &&
          ((t.fillStyle = h),
          t.beginPath(),
          t.arc(i, n, s, 0, 2 * Math.PI),
          t.fill());
      }),
      (t.prototype.Tl = function (t, i, n, s, h, r, e) {
        var u, o;
        e &&
          void 0 !== r &&
          h > 0 &&
          (t.beginPath(),
          y(
            t,
            (null ===
              (o =
                null === (u = this.dt) || void 0 === u ? void 0 : u.border) ||
            void 0 === o
              ? void 0
              : o.style) || 0,
          ),
          t.arc(i, n, s, 0, 2 * Math.PI),
          (t.lineWidth = h),
          (t.strokeStyle = r),
          t.stroke());
      }),
      (t.prototype.Sl = function (t, i, n, s) {
        var h = t.canvas.width,
          r = t.canvas.height;
        return i + s >= 0 && i - s <= h && n + s >= 0 && n - s <= r;
      }),
      t
    );
  })();
function bn(t, i) {
  var n = i.x - t.x,
    s = i.y - t.y;
  return Math.sqrt(n * n + s * s);
}
var mn,
  pn = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.Ll = new Mn()), (s.vl = new oi()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        var i = this.Zn.K();
        if (
          i.visible &&
          ((this.Kn = null),
          (this.fs = !1),
          !(
            this.Zn.Es().length < 2 ||
            (t.prototype.cs.call(this), this.Ls.length < 2)
          ))
        ) {
          var n = new et();
          (this.Ll._t(
            U(U({}, Gt(i.circle)), { points: this.Ls, hitTestBackground: !1 }),
          ),
            n.st(this.Ll));
          var s = this.Ls[0],
            h = this.Ls[1];
          if (i.text.value) {
            var r = bn(s, h),
              e = s.x - r,
              u = s.x + r,
              o = s.y - r,
              l = s.y + r,
              a = s.clone(),
              f = i.text.font.size / 3,
              c = 0;
            switch (i.text.box.alignment.vertical) {
              case "middle":
                ((a.y = (o + l) / 2), (c = f));
                break;
              case "top":
                a.y = o;
                break;
              case "bottom":
                a.y = l;
            }
            switch (i.text.box.alignment.horizontal) {
              case "center":
                a.x = (e + u) / 2;
                break;
              case "left":
                a.x = e;
                break;
              case "right":
                a.x = u;
            }
            var v = Gt(i.text);
            ((v.box = U(U({}, v.box), { padding: { y: f, x: c } })),
              "middle" === i.text.box.alignment.vertical &&
                (v.box.maxHeight = l - o),
              this.vl._t({ wi: v, Es: [a] }),
              n.st(this.vl));
          }
          (this.Al(s, h, n), (this.Kn = n));
        }
      }),
      (i.prototype.Al = function (t, i, n) {
        var s = {
          Es: [new tn(t.x, t.y, 0, !1), new tn(i.x, i.y, 1, !1)],
          wo: [Ki.vu, Ki.gu],
        };
        n.st(this.Vo(s, 0));
      }),
      i
    );
  })(on),
  gn = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "Circle"), h._h([new pn(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 2;
      }),
      (i.prototype.Rs = function (i, n) {
        switch ((i < 2 && t.prototype.Rs.call(this, i, n), i)) {
          case 2:
            ((this.Ls[1].price = n.price),
              (this.Ls[0].timestamp = n.timestamp));
            break;
          case 3:
            ((this.Ls[0].price = n.price),
              (this.Ls[1].timestamp = n.timestamp));
            break;
          case 4:
            this.Ls[0].timestamp = n.timestamp;
            break;
          case 5:
            this.Ls[1].timestamp = n.timestamp;
            break;
          case 6:
            this.Ls[0].price = n.price;
            break;
          case 7:
            this.Ls[1].price = n.price;
        }
      }),
      (i.prototype.zs = function (i) {
        return i < 2 ? t.prototype.zs.call(this, i) : this.Pl(i);
      }),
      (i.prototype.Pl = function (t) {
        var i = this.Es()[0],
          n = this.Es()[1];
        return [
          { St: i.price, Fl: i.timestamp },
          { St: n.price, Fl: n.timestamp },
          { St: n.price, Fl: i.timestamp },
          { St: i.price, Fl: n.timestamp },
          { St: (n.price + i.price) / 2, Fl: i.timestamp },
          { St: (n.price + i.price) / 2, Fl: n.timestamp },
          { St: i.price, Fl: (n.timestamp + i.timestamp) / 2 },
          { St: n.price, Fl: (n.timestamp + i.timestamp) / 2 },
        ][t];
      }),
      i
    );
  })(Qt),
  yn = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return (
        (s.Dl = new hi()),
        (s.Bl = new hi()),
        (s.Kn = null),
        s.Dl.Sh(new ii(ti.mh)),
        s.Bl.Sh(new ii(ti.mh)),
        s
      );
    }
    return (
      q(i, t),
      (i.prototype.cs = function (i, n) {
        this.Kn = null;
        var s = this.Zn.Ht(),
          h = this.Qn.zt();
        if (s && !s.et() && !h.et() && !(this.Zn.Es().length < 1)) {
          t.prototype.cs.call(this);
          var r = this.Zn.K();
          if (!(this.Ls.length < 1)) {
            var e = this.Ls[0],
              u = new tn(e.x, i, 0),
              o = new tn(e.x, 0, 1),
              l = new tn(0, e.y, 0),
              a = new tn(n, e.y, 1),
              f = { au: !1, fu: !1 },
              c = { au: 0, fu: 0 },
              v = new et();
            (this.Dl._t({
              Ch: U(U({}, Gt(r.line)), { end: c, extend: f }),
              Es: [u, o],
            }),
              this.Bl._t({
                Ch: U(U({}, Gt(r.line)), { end: c, extend: f }),
                Es: [l, a],
              }),
              v.st(this.Dl),
              v.st(this.Bl),
              this.Wo(v),
              (this.Kn = v));
          }
        }
      }),
      i
    );
  })(on),
  kn = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "CrossLine"), h._h([new yn(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 1;
      }),
      (i.prototype._s = function () {
        return this.K().line.color;
      }),
      (i.prototype.ls = function () {
        return this.K().line.color;
      }),
      i
    );
  })(Qt),
  xn = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.qs = "ExtendedLine"), i);
    }
    return (q(i, t), i);
  })(an),
  Nn = (function () {
    function t(t, i) {
      ((this._l = i || new ii(ti.ph)),
        (this.Nh = t || new ii(ti.mh)),
        (this.dt = null));
    }
    return (
      (t.prototype._t = function (t) {
        this.dt = t;
      }),
      (t.prototype.lt = function (t, i, n) {
        if (null === this.dt || this.dt.points.length < 2) return null;
        var s =
            (n.canvas.ownerDocument &&
              n.canvas.ownerDocument.defaultView &&
              n.canvas.ownerDocument.defaultView.devicePixelRatio) ||
            1,
          r = n.canvas.width,
          e = new h(t, i),
          u = this.El(s),
          o = u[0],
          l = u[1],
          a = new h(l.x, o.y),
          f = new h(o.x, l.y),
          c = this.Ol(e, o, a, r);
        if (null !== c) return c;
        var v = this.Ol(e, f, l, r);
        if (null !== v) return v;
        var d = this.zl(e, o, l, r);
        return this.dt.hitTestBackground && null !== d ? d : null;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        var h,
          r,
          e,
          u,
          o,
          l,
          a,
          f =
            (null ===
              (r =
                null === (h = this.dt) || void 0 === h ? void 0 : h.border) ||
            void 0 === r
              ? void 0
              : r.width) || 0,
          c =
            null ===
              (u =
                null === (e = this.dt) || void 0 === e ? void 0 : e.border) ||
            void 0 === u
              ? void 0
              : u.color,
          v =
            null ===
              (l =
                null === (o = this.dt) || void 0 === o
                  ? void 0
                  : o.background) || void 0 === l
              ? void 0
              : l.color;
        if (
          !(null === this.dt || this.dt.points.length < 2 || (f <= 0 && !v))
        ) {
          t.save();
          var d = f ? Math.max(1, Math.floor(f * i)) : 0,
            _ =
              (null === (a = this.dt.border) || void 0 === a
                ? void 0
                : a.style) || 0,
            w = this.El(i),
            M = w[0],
            b = w[1],
            m = this.dt.extend || {};
          (ei(
            t,
            M,
            b,
            v,
            c,
            d,
            _,
            "center",
            !!m.left,
            !!m.right,
            t.canvas.width,
          ),
            t.restore());
        }
      }),
      (t.prototype.El = function (t) {
        var i = F(this.dt).points,
          n = i[0],
          s = i[1],
          r = Math.min(n.x, s.x),
          e = Math.max(n.x, s.x),
          u = Math.min(n.y, s.y),
          o = Math.max(n.y, s.y),
          l = Math.round(r * t),
          a = Math.round(e * t),
          f = Math.round(u * t),
          c = Math.round(o * t);
        return [new h(l, f), new h(a, c)];
      }),
      (t.prototype.Rl = function (t, i, n) {
        var s,
          r,
          e = F(this.dt);
        if (u(t, i)) return null;
        var o = Math.min(t.x, i.x),
          l = Math.max(t.x, i.x),
          a = ((s = e.extend) != null && s.left) ? 0 : Math.max(o, 0),
          f = ((r = e.extend) != null && r.right) ? n : Math.min(l, n);
        return a > f || f <= 0 || a >= n
          ? null
          : [new h(a, t.y), new h(f, i.y)];
      }),
      (t.prototype.Ol = function (t, i, n, s) {
        var h = this.Rl(i, n, s);
        return null !== h && _(h[0], h[1], t)._ <= 3 ? this.Nh : null;
      }),
      (t.prototype.zl = function (t, i, n, s) {
        var h = this.Rl(i, n, s);
        return null !== h && w(t, new r(h[0], h[1])) ? this._l : null;
      }),
      t
    );
  })(),
  Sn = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.Wl = []), (s.Vl = []), (s.Il = []), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        var i = this.Zn.K();
        if (i.visible) {
          ((this.Kn = null), (this.fs = !1));
          var n = this.Zn.Ht(),
            s = this.Qn.zt();
          if (n && !n.et() && !s.et()) {
            var h = s.dl();
            if (null !== h) {
              var r = this.Zn.Es();
              if (!(r.length < 2)) {
                var e = Math.min(r[0].timestamp, r[1].timestamp) > Number(h.to),
                  u = Math.max(r[0].timestamp, r[1].timestamp) < Number(h.from);
                if (!(e || u) || i.extend.left || i.extend.right) {
                  if ((t.prototype.cs.call(this), this.Ls.length < 2)) return;
                  for (
                    var o = new et(),
                      l = Math.min(this.Ls[0].x, this.Ls[1].x),
                      a = Math.max(this.Ls[0].x, this.Ls[1].x),
                      f = this.jl(
                        this.Zn.Es()[0].price,
                        this.Zn.Es()[1].price,
                        i.levels,
                      ),
                      c = "",
                      v = function (t, i, n) {
                        for (var s = 0; s < t.length; s++)
                          if (t[s][i] === n) return s;
                        return -1;
                      },
                      d = 0,
                      _ = -1;
                    d < f.length;
                    d++, _++
                  ) {
                    if (i.levels[d].distanceFromCoeffEnabled) {
                      var w = v(
                        i.levels,
                        "coeff",
                        i.levels[d].distanceFromCoeff,
                      );
                      if (w >= 0) {
                        var M = Number(f[w].St),
                          b = Number(f[d].St),
                          m = Math.abs(b - M);
                        m > 0 &&
                          (c =
                            ">>>>" +
                            m +
                            " from " +
                            i.levels[w].coeff +
                            " line");
                      }
                    }
                    this.Il[d] ||
                      (this.Il.push(new hi()), this.Vl.push(new oi()));
                    var p = [new tn(l, f[d].bi, 0), new tn(a, f[d].bi, 0)];
                    (this.Il[d]._t({
                      Ch: U(U({}, i.line), {
                        extend: i.extend,
                        color: i.levels[d].color,
                      }),
                      Es: p,
                    }),
                      this.Vl[d]._t({
                        wi: {
                          alignment: "right",
                          value: ""
                            .concat(i.levels[d].coeff, "(")
                            .concat(f[d].St, ")")
                            .concat(c),
                          font: {
                            color: i.levels[d].color,
                            size: 11,
                            family: st,
                          },
                          box: {
                            alignment: {
                              horizontal: "right",
                              vertical: "middle",
                            },
                          },
                        },
                        Es: p,
                      }),
                      (c = ""),
                      o.st(this.Vl[d]),
                      o.st(this.Il[d]),
                      _ < 0 ||
                        (this.Wl[_] || this.Wl.push(new Nn()),
                        this.Wl[_]._t(
                          U(U({}, i.line), {
                            extend: i.extend,
                            background: {
                              color: j(i.levels[d].color, i.levels[d].opacity),
                            },
                            points: [
                              new tn(l, f[d - 1].bi, 0),
                              new tn(a, f[d].bi, 0),
                            ],
                          }),
                        ),
                        o.st(this.Wl[_])));
                  }
                  (this.Wo(o), (this.Kn = o));
                }
              }
            }
          }
        }
      }),
      (i.prototype.jl = function (t, i, n) {
        var s,
          h,
          r =
            (null ===
              (h =
                null === (s = this.Zn.us()) || void 0 === s
                  ? void 0
                  : s.Vt()) || void 0 === h
              ? void 0
              : h.Jt) || 0,
          e = this.Zn.Ht(),
          u = i - t;
        return e && r
          ? n.map(function (t) {
              var n = i - t.coeff * u;
              return { bi: e.jt(n, r), St: e.Bi(n, r) };
            })
          : [];
      }),
      i
    );
  })(on),
  Cn = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "FibRetracement"), h._h([new Sn(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 2;
      }),
      i
    );
  })(Qt),
  Tn = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.qs = "Highlighter"), i);
    }
    return (
      q(i, t),
      (i.prototype.ml = function () {
        var t = this.K();
        return {
          visible: t.visible,
          editable: t.editable,
          line: {
            width: 20,
            cap: "round",
            join: "round",
            style: 0,
            color: t.line.color,
            end: { left: 0, right: 0 },
          },
        };
      }),
      i
    );
  })(dn),
  Ln = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return (
        (s.cl = new hi()),
        (s.vl = new oi()),
        (s.Kn = null),
        s.cl.Sh(new ii(ti.mh)),
        s
      );
    }
    return (
      q(i, t),
      (i.prototype.cs = function (i, n) {
        var s,
          r = this.Zn.K();
        if (r.visible) {
          this.Kn = null;
          var e = this.Zn.Ht(),
            u = this.Qn.zt();
          if (e && !e.et() && !u.et()) {
            var o = this.Zn.Es();
            if (!(o.length < 1)) {
              var l = o[0],
                a = this.Zn.us(),
                f = null == a ? void 0 : a.Vt();
              if (f) {
                var c = e.jt(l.price, f.Jt),
                  v = this.Qn.ul(this.Zn),
                  d =
                    null !== (s = null == v ? void 0 : v.li()) && void 0 !== s
                      ? s
                      : 0,
                  _ = c < 0 || c > d,
                  w = r.line.extend || {},
                  M = w.left,
                  b = w.right;
                if (!_) {
                  if ((t.prototype.cs.call(this), this.Ls.length < 1)) return;
                  var m = this.Ls[0],
                    p = new tn(M ? 0 : m.x, m.y, 0),
                    g = new tn(b ? n : m.x, m.y, 1);
                  if (
                    Math.floor(p.x) === Math.floor(g.x) ||
                    Math.max(p.x, g.x) <= 0 ||
                    g.x < p.x
                  )
                    return;
                  M && b && ((m.x = n / 2), (m.co = !0));
                  var y = new et();
                  if (
                    (this.cl._t({
                      Ch: U(U({}, Gt(r.line)), { end: { au: 0, fu: 0 } }),
                      Es: [p, g],
                    }),
                    y.st(this.cl),
                    r.text.value)
                  ) {
                    var k =
                        (Math.atan((g.y - p.y) / (g.x - p.x)) / Math.PI) * -180,
                      x = r.text.box.alignment.horizontal,
                      N =
                        "left" === x
                          ? p.clone()
                          : "right" === x
                            ? g.clone()
                            : new h((p.x + g.x) / 2, (p.y + g.y) / 2),
                      S = Gt(r.text);
                    ((S.box = U(U({}, S.box), { angle: k })),
                      this.vl._t({ wi: S, Es: [N] }),
                      y.st(this.vl));
                  }
                  (this.Wo(y), (this.Kn = y));
                }
              }
            }
          }
        }
      }),
      i
    );
  })(on),
  An = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "HorizontalLine"), h._h([new Ln(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 1;
      }),
      (i.prototype.Ki = function () {
        return [];
      }),
      (i.prototype.vs = function () {
        return [];
      }),
      (i.prototype.ls = function () {
        return this.K().line.color;
      }),
      i
    );
  })(Qt),
  Pn = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.qs = "HorizontalRay"), i);
    }
    return (q(i, t), i);
  })(An),
  Fn = (function () {
    function t(t, i) {
      ((this._l = i || new ii(ti.ph)),
        (this.Nh = t || new ii(ti.mh)),
        (this.dt = null));
    }
    return (
      (t.prototype._t = function (t) {
        this.dt = t;
      }),
      (t.prototype.lt = function (t, i, n) {
        if (null === this.dt || this.dt.points.length < 2) return null;
        var s =
            (n.canvas.ownerDocument &&
              n.canvas.ownerDocument.defaultView &&
              n.canvas.ownerDocument.defaultView.devicePixelRatio) ||
            1,
          r = n.canvas.width,
          e = new h(t, i),
          u = this.El(s),
          o = u[0],
          l = u[1],
          a = new h(l.x, o.y),
          f = new h(o.x, l.y),
          c = this.Ol(e, o, a, r);
        if (null !== c) return c;
        var v = this.Ol(e, f, l, r);
        if (null !== v) return v;
        if (_(a, l, e)._ <= 3) return this.Nh;
        if (_(o, f, e)._ <= 3) return this.Nh;
        var d = this.zl(e, o, l, r);
        return this.dt.hitTestBackground && null !== d ? d : null;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        var h,
          r,
          e,
          u,
          o,
          l,
          a,
          f =
            (null ===
              (r =
                null === (h = this.dt) || void 0 === h ? void 0 : h.border) ||
            void 0 === r
              ? void 0
              : r.width) || 0,
          c =
            null ===
              (u =
                null === (e = this.dt) || void 0 === e ? void 0 : e.border) ||
            void 0 === u
              ? void 0
              : u.color,
          v =
            null ===
              (l =
                null === (o = this.dt) || void 0 === o
                  ? void 0
                  : o.background) || void 0 === l
              ? void 0
              : l.color;
        if (
          !(null === this.dt || this.dt.points.length < 2 || (f <= 0 && !v))
        ) {
          t.save();
          var d = f ? Math.max(1, Math.floor(f * i)) : 0,
            _ =
              (null === (a = this.dt.border) || void 0 === a
                ? void 0
                : a.style) || 0,
            w = this.El(i),
            M = w[0],
            b = w[1],
            m = this.dt.extend || {};
          (ei(
            t,
            M,
            b,
            v,
            c,
            d,
            _,
            "center",
            !!m.left,
            !!m.right,
            t.canvas.width,
          ),
            t.restore());
        }
      }),
      (t.prototype.El = function (t) {
        var i = F(this.dt).points,
          n = i[0],
          s = i[1],
          r = Math.min(n.x, s.x),
          e = Math.max(n.x, s.x),
          u = Math.min(n.y, s.y),
          o = Math.max(n.y, s.y),
          l = Math.round(r * t),
          a = Math.round(e * t),
          f = Math.round(u * t),
          c = Math.round(o * t);
        return [new h(l, f), new h(a, c)];
      }),
      (t.prototype.Rl = function (t, i, n) {
        var s,
          r,
          e = F(this.dt);
        if (u(t, i)) return null;
        var o = Math.min(t.x, i.x),
          l = Math.max(t.x, i.x),
          a = ((s = e.extend) != null && s.left) ? 0 : Math.max(o, 0),
          f = ((r = e.extend) != null && r.right) ? n : Math.min(l, n);
        return a > f || f <= 0 || a >= n
          ? null
          : [new h(a, t.y), new h(f, i.y)];
      }),
      (t.prototype.Ol = function (t, i, n, s) {
        var h = this.Rl(i, n, s);
        return null !== h && _(h[0], h[1], t)._ <= 3 ? this.Nh : null;
      }),
      (t.prototype.zl = function (t, i, n, s) {
        var h = this.Rl(i, n, s);
        return null !== h && w(t, new r(h[0], h[1])) ? this._l : null;
      }),
      t
    );
  })(),
  Dn = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return (
        (s.Hl = new Fn()),
        (s.Jl = new Fn()),
        (s.vl = new oi()),
        (s.ql = new oi()),
        (s.Ul = new oi()),
        (s.Yl = new oi()),
        (s.Kn = null),
        (i.$l = function (t) {
          s.Kl("lineToolFinished", t);
        }),
        s
      );
    }
    return (
      q(i, t),
      (i.prototype.Kl = function (t, _i) {
        var n = tt(this.Zn.dh());
        this.Qn.Jo(n, t);
      }),
      (i.prototype.cs = function () {
        var i,
          n = this.Zn.K();
        if (n.visible) {
          ((this.Kn = null), (this.fs = !1));
          var s = this.Zn.Ht(),
            h = this.Qn.zt();
          if (s && !s.et() && !h.et()) {
            var r = h.dl();
            if (null !== r) {
              var e = this.Zn.Es(),
                u = e[0],
                o = e[1],
                l = e[2];
              if (u && o && l) {
                var a = this.Zn.us(),
                  f = null == a ? void 0 : a.Vt();
                if (f) {
                  var c = s.jt(u.price, f.Jt),
                    v = s.jt(o.price, f.Jt),
                    d = s.jt(l.price, f.Jt),
                    _ = this.Qn.ul(this.Zn),
                    w =
                      null !== (i = null == _ ? void 0 : _.li()) && void 0 !== i
                        ? i
                        : 0,
                    M = (c < 0 && v < 0 && d < 0) || (c > w && v > w && d > w),
                    b =
                      Math.min(e[0].timestamp, e[1].timestamp, e[2].timestamp) >
                      Number(r.to),
                    m =
                      Math.max(e[0].timestamp, e[1].timestamp, e[2].timestamp) <
                      Number(r.from);
                  if (
                    !(M || b || m) ||
                    n.entryStopLossRectangle.extend.left ||
                    n.entryStopLossRectangle.extend.right ||
                    n.entryPtRectangle.extend.left ||
                    n.entryPtRectangle.extend.right
                  ) {
                    if ((t.prototype.cs.call(this), 0 === this.Ls.length))
                      return;
                    var p = new et(),
                      g = [this.Ls[0], this.Ls[1]],
                      y = [this.Ls[0], this.Ls[2]];
                    (this.Hl._t({
                      points: g,
                      background: n.entryStopLossRectangle.background,
                      border: n.entryStopLossRectangle.border,
                      extend: n.entryStopLossRectangle.extend,
                      hitTestBackground: !1,
                    }),
                      this.Jl._t({
                        points: y,
                        background: n.entryPtRectangle.background,
                        border: n.entryPtRectangle.border,
                        extend: n.entryPtRectangle.extend,
                        hitTestBackground: !1,
                      }),
                      p.st(this.Hl),
                      p.st(this.Jl));
                    var k = this.Xl(n.entryStopLossText, g, !1);
                    (n.entryStopLossText.value || "" !== k.wi.value) &&
                      (this.ql._t({ wi: k.wi, Es: [k.Zl] }), p.st(this.ql));
                    var x = this.Xl(n.entryPtText, y, !0);
                    if (
                      ((n.entryPtText.value || "" !== x.wi.value) &&
                        (this.Ul._t({ wi: x.wi, Es: [x.Zl] }), p.st(this.Ul)),
                      n.showAutoText && this.Ls.length >= 3)
                    ) {
                      var N = this.Ql(),
                        S = this.Gl(n);
                      M = null;
                      if (S && this.Zn.Es().length >= 3) {
                        i = this.Zn.Ht();
                        a = i ? i.Vt() : null;
                        if (i && a) {
                          f = Number(i.Bi(this.Zn.Es()[0].price, a));
                          c = parseFloat(S);
                          if (!isNaN(f) && !isNaN(c) && f > 0 && c > 0) {
                            v = f * c;
                            M = v.toFixed(2) + " USDT";
                          }
                        }
                      }
                      var C = null;
                      if (N && M) {
                        C = "".concat(N, " | Pos: ").concat(M);
                      } else if (M) {
                        C = "Pos: ".concat(M);
                      } else if (N && S) {
                        C = "".concat(N, " | Qty: ").concat(S);
                      } else if (N) {
                        C = N;
                      } else if (S) {
                        C = "Qty: ".concat(S);
                      }
                      if (C) {
                        var T = this.Ls[0].clone(),
                          L = Gt(At);
                        ((L.value = C),
                          (L.font = {
                            family: "Arial",
                            size: 16,
                            color: "rgba(255, 255, 255, 1)",
                            bold: !1,
                            italic: !1,
                          }),
                          (L.alignment = "center"),
                          (L.box = U(U({}, L.box), {
                            padding: { x: 8, y: 4 },
                            alignment: {
                              vertical: "top",
                              horizontal: "center",
                            },
                          })),
                          this.Yl._t({ wi: L, Es: [T] }),
                          p.st(this.Yl));
                      }
                    }
                    if (this.Zn.Es().length >= 3) {
                      var A = Number(this.Zn.eh()),
                        P = this.Zn.Es()[2].price,
                        D = this.Zn.Es()[0].price;
                      if (
                        ((P = this.Zn.il()
                          ? Math.max(P, D + A)
                          : Math.min(P, D - A)),
                        this.Zn.Rs(2, {
                          price: P,
                          timestamp: this.Zn.Es()[2].timestamp,
                        }),
                        null !== f)
                      ) {
                        var B = h.Wi({ timestamp: this.Zn.Es()[2].timestamp }),
                          E = s.jt(P, F(f.Jt));
                        ((this.Ls[2].x = B), (this.Ls[2].y = E));
                      }
                    }
                    (this.Al(p), (this.Kn = p));
                  }
                }
              }
            }
          }
        }
      }),
      (i.prototype.Al = function (t) {
        t.st(
          this.Vo(
            {
              Es: [this.Ls[0], this.Ls[1], this.Ls[2]],
              wo: [Ki.gu, Ki.pu, Ki.bu],
            },
            0,
          ),
        );
      }),
      (i.prototype.Xl = function (t, i, n) {
        void 0 === n && (n = !1);
        var s = i[0],
          h = i[1],
          r = Math.min(s.x, h.x),
          e = Math.max(s.x, h.x),
          u = Math.min(s.y, h.y),
          o = Math.max(s.y, h.y),
          l = s.clone(),
          a = t.font.size / 3,
          f = 0;
        switch (t.box.alignment.vertical) {
          case "middle":
            ((l.y = (u + o) / 2), (f = a));
            break;
          case "top":
            l.y = u;
            break;
          case "bottom":
            l.y = o;
        }
        switch (t.box.alignment.horizontal) {
          case "center":
            l.x = (r + e) / 2;
            break;
          case "left":
            l.x = r;
            break;
          case "right":
            l.x = e;
        }
        var c = Gt(t);
        if (
          ((c.box = U(U({}, c.box), { padding: { y: a, x: f } })),
          "middle" === t.box.alignment.vertical && (c.box.maxHeight = o - u),
          this.Zn.K().showAutoText)
        ) {
          var v = F(this.Zn.Ht()),
            d = F(v.Vt());
          switch (
            ((c.value = n
              ? "PT: " + v.Bi(this.Zn.Es()[2].price, d)
              : "Entry: " +
                v.Bi(this.Zn.Es()[0].price, d) +
                "\nStop: " +
                v.Bi(this.Zn.Es()[1].price, d)),
            (c.font = {
              family: "Arial",
              size: 14,
              color: "rgba(255, 255, 255, 1)",
              bold: !1,
              italic: !1,
            }),
            this.Zn.il()
              ? (c.box.alignment = n
                  ? { vertical: "top", horizontal: "center" }
                  : { vertical: "bottom", horizontal: "center" })
              : (c.box.alignment = n
                  ? { vertical: "bottom", horizontal: "center" }
                  : { vertical: "top", horizontal: "center" }),
            c.box.alignment.horizontal)
          ) {
            case "center":
              l.x = (r + e) / 2;
              break;
            case "left":
              l.x = r;
              break;
            case "right":
              l.x = e;
          }
          switch (c.box.alignment.vertical) {
            case "middle":
              l.y = (u + o) / 2;
              break;
            case "top":
              l.y = u;
              break;
            case "bottom":
              l.y = o;
          }
        }
        return { wi: c, Zl: l };
      }),
      (i.prototype.Ql = function () {
        var t = this.Zn.Es();
        if (t.length < 3) return null;
        var i = this.Zn.Ht();
        if (!i) return null;
        var n = i.Vt();
        if (!n) return null;
        var s = Number(i.Bi(t[0].price, n)),
          h = Number(i.Bi(t[2].price, n)),
          r = Number(i.Bi(t[1].price, n)),
          e = Math.abs(h - s),
          u = Math.abs(s - r);
        if (0 === u) return null;
        var o = e / u;
        if (o < 0.01) return "0.01:1";
        if (o >= 100) return "".concat(o.toFixed(2), ":1");
        if (Math.abs(o - Math.round(o)) < 0.01) {
          return "".concat(Math.round(o), ":1");
        }
        return "".concat(o.toFixed(2), ":1");
      }),
      (i.prototype.Gl = function (t) {
        var i,
          n = this.Zn.Es();
        if (n.length < 3 || !t.risk || isNaN(parseFloat(t.risk)) || parseFloat(t.risk) <= 0 || !t.symbol) return null;
        var s = n[0].price,
          h = n[1].price,
          r = this.Zn.il() ? Math.abs(s - h) : Math.abs(h - s);
        if (0 === r) return null;
        var e = t.risk / r;
        if (e <= 0) return null;
        var u =
            null === (i = window.__BINANCE_STEP_SIZES) || void 0 === i
              ? void 0
              : i[t.symbol];
        if (!u) return e.toFixed(8);
        var o = parseFloat(u);
        if (isNaN(o) || o <= 0) return e.toFixed(8);
        var l = 0;
        if (u.includes(".")) {
          var a = u.split(".");
          2 === a.length && (l = a[1].length);
        }
        var f = Math.floor(e / o) * o;
        if (f <= 0) {
          return e.toFixed(8);
        }
        return l > 0 ? f.toFixed(l) : Math.round(f).toString();
      }),
      i
    );
  })(on),
  Bn = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return (
        (h.$l = null),
        (h.qs = "LongShortPosition"),
        (h.ta = null),
        (h.ia = null),
        (h.na = 0),
        h._h([new Dn(h, i)]),
        3 === h.Ls.length && (h.na = 2),
        h
      );
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 3;
      }),
      (i.prototype.il = function () {
        return 3 === this.Ls.length && this.Ls[0].price > this.Ls[1].price;
      }),
      (i.prototype.hl = function () {
        return this.na;
      }),
      (i.prototype.el = function (t) {
        this.na = t;
      }),
      (i.prototype.Os = function (i) {
        var n = F(this.Ht()),
          s = F(n.Vt());
        ((i.price = Number(n.Bi(i.price, s))),
          0 === this.Ls.length && 1 === this.na
            ? (t.prototype.Os.call(this, i),
              this.Ls.push(i),
              this.Ls.push(this.ll(i, !0)))
            : this.xs || 1 !== this.na
              ? 2 !== this.na || this.xs
                ? t.prototype.Os.call(this, i)
                : ((this.Ls[1] = i),
                  (this.Ls[2] = this.ll(i, !0)),
                  this.Ds(),
                  this.Fs() && null !== this.$l && this.$l(this.Ji()),
                  this.th(!1),
                  this.nh(!1))
              : ((this.Ls[1] = i), (this.Ls[2] = this.ll(i, !0))));
      }),
      (i.prototype.rl = function (t) {
        if (!this.xs) {
          var i = F(this.Ht()),
            n = F(i.Vt());
          ((t.price = Number(i.Bi(t.price, n))),
            (this.Ls[1] = t),
            (this.ia = this.Ls[0].price > t.price),
            (this.Ls[2] = this.ll(t, !0)));
        }
      }),
      (i.prototype.Rs = function (i, n) {
        var s = F(this.Ht()),
          h = F(s.Vt());
        if (
          ((n.price = Number(s.Bi(n.price, h))),
          t.prototype.Rs.call(this, i, n),
          (0 === i || 1 === i || 2 === i) && 3 === this.Ls.length)
        ) {
          var r = this.ll(this.Ls[2]);
          this.Ls[2] = r;
        }
      }),
      (i.prototype.zs = function (i) {
        return i < this.Ps()
          ? t.prototype.zs.call(this, i)
          : 3 === i
            ? this.ll(this.Es()[2])
            : null;
      }),
      (i.prototype.qo = function () {
        return null !== this.ta && this.ta !== this.il();
      }),
      (i.prototype.Go = function (t, i, n) {
        if (this.Ls.length < 2 || (0 !== t && 1 !== t)) return !1;
        var s = F(this.Ht()),
          h = F(this.us()),
          r = F(h.Vt()),
          e = s.cn(i.y, r.Jt);
        if (null === e) return !1;
        var u = Number(s.Bi(e, r.Jt)),
          o = !1;
        return (
          0 === t
            ? ((n && u < this.Ls[1].price) || (!n && u > this.Ls[1].price)) &&
              (o = !0)
            : 1 === t &&
              ((n && u > this.Ls[0].price) || (!n && u < this.Ls[0].price)) &&
              (o = !0),
          o
        );
      }),
      (i.prototype.nl = function () {
        if (3 === this.Ls.length) {
          var i = this.ll(this.Ls[2]);
          t.prototype.Rs.call(this, 2, i);
        }
      }),
      (i.prototype.tl = function (t) {
        this.ta = t;
      }),
      (i.prototype.Qo = function () {
        return this.ta;
      }),
      (i.prototype.ll = function (t, i) {
        if ((void 0 === i && (i = !1), this.Ls.length < 2))
          return { price: 0, timestamp: 0 };
        var n = Number(this.eh()),
          s = F(this.Ht()),
          h = F(s.Vt()),
          r = Number(s.Bi(this.Ls[0].price, h)),
          e = Number(s.Bi(this.Ls[1].price, h)),
          u = Math.abs(r - e),
          o = Number(s.Bi(t.price, h));
        i
          ? (o = this.ia ? r + 1 * u : r - 1 * u)
          : (this.gs[0].qo && (o = this.il() ? r + 1 * u : r - 1 * u),
            (o = this.il() ? Math.max(o, r + n) : Math.min(o, r - n)));
        return { price: o, timestamp: this.Ls[1].timestamp };
      }),
      (i.prototype.Pl = function (t) {
        var i = this.Es()[0],
          n = this.Es()[1],
          s = this.Es()[2];
        return [
          { St: i.price, Fl: i.timestamp },
          { St: n.price, Fl: n.timestamp },
          { St: s.price, Fl: s.timestamp },
          { St: n.price, Fl: s.timestamp },
        ][t];
      }),
      i
    );
  })(Qt),
  En = (function () {
    function t(t, i) {
      ((this.Ah = null),
        (this.Ph = null),
        (this.Fh = null),
        (this.Dh = null),
        (this.Bh = null),
        (this.dt = null),
        (this.Nh = i || new ii(ti.mh)),
        void 0 !== t && this._t(t));
    }
    return (
      (t.prototype._t = function (t) {
        ((this.dt = t),
          (this.Ph = null),
          (this.Ah = null),
          (this.Fh = null),
          (this.Dh = null),
          (this.Bh = null));
      }),
      (t.prototype.lt = function (t, i) {
        return null === this.dt ||
          void 0 === this.dt.Es ||
          0 === this.dt.Es.length
          ? null
          : M(new h(t, i), this.Eh())
            ? this.Nh
            : null;
      }),
      (t.prototype.Oh = function (t) {
        return (
          null !== this.dt &&
          void 0 !== this.dt.Es &&
          0 !== this.dt.Es.length &&
          w(this.dt.Es[0], t)
        );
      }),
      (t.prototype.zh = function () {
        return null === this.dt ? { oi: 0, li: 0 } : this.Rh();
      }),
      (t.prototype.Wh = function (t) {
        if (null === this.dt) return { bt: 0, gt: 0, oi: 0, li: 0 };
        var i = this.Vh(t);
        return { bt: i.Ih, gt: i.jh, oi: i.Hh, li: i.Jh };
      }),
      (t.prototype.qh = function (t, i, n) {
        if (
          null === this.dt ||
          void 0 === this.dt.Es ||
          0 === this.dt.Es.length
        )
          return !0;
        var s = this.Vh(n);
        if (s.Ih + s.Hh < 0 || s.Ih > t) {
          var e = new r(new h(0, 0), new h(t, i));
          return this.Eh().every(function (t) {
            return !w(t, e);
          });
        }
        return !1;
      }),
      (t.prototype.Ws = function (t, i) {
        ((F(this.dt).Es = t), (this.Nh = i || new ii(ti.mh)));
      }),
      (t.prototype.Uh = function () {
        return null === this.dt ? "" : this.Yh().Uh;
      }),
      (t.prototype.$h = function (t, i, n) {
        return (function (t, i, n) {
          mn || On();
          ((n =
            "[object String]" === Object.prototype.toString.call(n)
              ? parseInt(n)
              : n),
            (t += ""));
          var s =
            !Number.isInteger(n) || !isFinite(n) || n <= 0
              ? t.split(/\r\n|\r|\n|$/)
              : t.split(/[^\S\r\n]*(?:\r\n|\r|\n|$)/);
          s[s.length - 1] || s.pop();
          if (!Number.isInteger(n) || !isFinite(n) || n <= 0) return s;
          mn.font = i;
          for (var h = [], r = 0; r < s.length; r++) {
            var e = s[r],
              u = mn.measureText(e).width;
            if (u <= n) h.push(e);
            else
              for (var o = e.split(/([-)\]},.!?:;])|(\s+)/); o.length; ) {
                var l = Math.floor(((n / u) * (o.length + 2)) / 3);
                if (
                  l <= 0 ||
                  mn.measureText(o.slice(0, 3 * l - 1).join("")).width <= n
                )
                  for (
                    ;
                    mn.measureText(o.slice(0, 3 * (l + 1) - 1).join(""))
                      .width <= n;

                  )
                    l++;
                else
                  for (
                    ;
                    l > 0 &&
                    mn.measureText(o.slice(0, 3 * --l - 1).join("")).width > n;

                  );
                if (l > 0)
                  (h.push(o.slice(0, 3 * l - 1).join("")), o.splice(0, 3 * l));
                else {
                  var a = o[0] + (o[1] || ""),
                    f = Math.floor((n / mn.measureText(a).width) * a.length);
                  if (mn.measureText(a.substring(0, f)).width <= n)
                    for (; mn.measureText(a.substring(0, f + 1)).width <= n; )
                      f++;
                  else
                    for (
                      ;
                      f > 1 && mn.measureText(a.substring(0, --f)).width > n;

                    );
                  ((f = Math.max(1, f)),
                    h.push(a.substring(0, f)),
                    (o[0] = a.substring(f)),
                    (o[1] = ""));
                }
                if (mn.measureText(o.join("")).width <= n) {
                  h.push(o.join(""));
                  break;
                }
              }
          }
          return h;
        })(t, n || this.Uh(), i);
      }),
      (t.prototype.ot = function (t, i) {
        var n = this;
        if (
          null !== this.dt &&
          void 0 !== this.dt.Es &&
          0 !== this.dt.Es.length
        ) {
          var s,
            h = function (s, h) {
              var e,
                u,
                o,
                l,
                a,
                f,
                c,
                v,
                d,
                _,
                w,
                M,
                b,
                m,
                p,
                g,
                y,
                k,
                x,
                N,
                S,
                C;
              if (null !== n.dt && null !== n.dt.wi) {
                var T = F(n.dt.Ht),
                  L = F(T.Vt()),
                  A = 0;
                void 0 !== n.dt.Es &&
                  n.dt.Es.length > 0 &&
                  void 0 !== r.timestampStartOffset &&
                  (A = Number(F(n.dt.Es[0]).x * i) + r.timestampStartOffset);
                var P = Number(T.jt(Number(h), Number(L))),
                  D = n.dt.wi,
                  B = n.Vh(s, A, P),
                  E = n.Kh(s, A, P).scaled(i),
                  O =
                    (-(
                      (null === (e = D.box) || void 0 === e
                        ? void 0
                        : e.angle) || 0
                    ) *
                      Math.PI) /
                    180,
                  z = B.Hh,
                  R = B.Jh,
                  W = A,
                  V = P - R / 2;
                (t.save(),
                  t.translate(E.x, E.y),
                  t.rotate(O),
                  t.translate(-E.x, -E.y));
                var I = n.Yh().W;
                if (
                  ((t.textAlign = B.Xh),
                  (t.textBaseline = "middle"),
                  (t.font = n.Uh()),
                  (null ===
                    (o =
                      null === (u = D.box) || void 0 === u
                        ? void 0
                        : u.background) || void 0 === o
                    ? void 0
                    : o.color) ||
                    (null ===
                      (a =
                        null === (l = D.box) || void 0 === l
                          ? void 0
                          : l.border) || void 0 === a
                      ? void 0
                      : a.color) ||
                    ((null ===
                      (c =
                        null === (f = D.box) || void 0 === f
                          ? void 0
                          : f.border) || void 0 === c
                      ? void 0
                      : c.highlight) &&
                      D.wordWrapWidth))
                ) {
                  var j = Math.round(
                      ((null ===
                        (d =
                          null === (v = D.box) || void 0 === v
                            ? void 0
                            : v.border) || void 0 === d
                        ? void 0
                        : d.width) || Math.max(I / 12, 1)) * i,
                    ),
                    H = j / 2,
                    J = !1;
                  if (
                    null === (_ = D.box) || void 0 === _ ? void 0 : _.shadow
                  ) {
                    var q =
                        null === (w = D.box) || void 0 === w
                          ? void 0
                          : w.shadow,
                      U = q.color,
                      Y = q.blur,
                      $ = q.offset;
                    (t.save(),
                      (t.shadowColor = U),
                      (t.shadowBlur = Y),
                      (t.shadowOffsetX = (null == $ ? void 0 : $.x) || 0),
                      (t.shadowOffsetY = (null == $ ? void 0 : $.y) || 0),
                      (J = !0));
                  }
                  var K = 0,
                    X = 0;
                  if (
                    null === (M = D.box.border) || void 0 === M
                      ? void 0
                      : M.width
                  ) {
                    ((null === (b = D.box.border) || void 0 === b
                      ? void 0
                      : b.color) && (t.strokeStyle = D.box.border.color),
                      (t.lineWidth = j));
                    var Z =
                        null !==
                          (g =
                            null ===
                              (p =
                                null === (m = D.box) || void 0 === m
                                  ? void 0
                                  : m.border) || void 0 === p
                              ? void 0
                              : p.radius) && void 0 !== g
                          ? g
                          : 0 * i + j,
                      Q =
                        null ===
                          (k =
                            null === (y = D.box) || void 0 === y
                              ? void 0
                              : y.border) || void 0 === k
                          ? void 0
                          : k.style;
                    (ri(
                      t,
                      (K = W - H - z / 2),
                      (X = V - H),
                      z * i + j,
                      R * i + j,
                      Z,
                      Q,
                    ),
                      (null === (x = D.box.background) || void 0 === x
                        ? void 0
                        : x.color) &&
                        ((t.fillStyle = D.box.background.color), t.fill()),
                      J && (t.restore(), (J = !1)));
                  } else
                    ((null === (N = D.box.background) || void 0 === N
                      ? void 0
                      : N.color) &&
                      ((t.fillStyle = D.box.background.color),
                      t.fillRect(K, X, z * i, R * i)),
                      J && (t.restore(), (J = !1)));
                }
                t.fillStyle =
                  null === (S = D.font) || void 0 === S ? void 0 : S.color;
                for (
                  var G = n.Qh(s).Zh,
                    tt = null !== (C = r.lineWidth) && void 0 !== C ? C : 1,
                    it = function (n) {
                      _t(t, i, function () {
                        return t.fillText(n, A, P + tt * i);
                      });
                    },
                    nt = 0,
                    st = G;
                  nt < st.length;
                  nt++
                ) {
                  it(st[nt]);
                }
                t.restore();
              }
            },
            r = F(this.dt).sa,
            e = F(r.marketDepthData),
            u = 0,
            o = 0,
            l = 0;
          ((s = r),
            void 0 !== e &&
              void 0 !== s.marketDepthData &&
              void 0 !== s.marketDepthData.Bids &&
              void 0 !== s.marketDepthData.Asks &&
              ((u = Math.max.apply(
                Math,
                s.marketDepthData.Bids.map(function (t) {
                  return Number(t.TotalSize);
                }),
              )),
              (o = Math.max.apply(
                Math,
                s.marketDepthData.Asks.map(function (t) {
                  return Number(t.TotalSize);
                }),
              )),
              (l = u >= o ? u : o)),
            void 0 !== e &&
              void 0 !== e.Bids &&
              e.Bids.forEach(function (s, e) {
                var o, a;
                (h(
                  null !== (o = s.TotalSize) && void 0 !== o ? o : "",
                  null !== (a = s.Price) && void 0 !== a ? a : "",
                ),
                  "combined" === r.totalBidAskCalcMethod
                    ? n.ha(t, i, s, r, "bid", l, e)
                    : n.ha(t, i, s, r, "bid", u, e));
              }),
            void 0 !== e &&
              void 0 !== e.Asks &&
              e.Asks.forEach(function (s, e) {
                var u, a;
                (h(
                  null !== (u = s.TotalSize) && void 0 !== u ? u : "",
                  null !== (a = s.Price) && void 0 !== a ? a : "",
                ),
                  "combined" === r.totalBidAskCalcMethod
                    ? n.ha(t, i, s, r, "ask", l, e)
                    : n.ha(t, i, s, r, "ask", o, e));
              }),
            t.restore());
        }
      }),
      (t.prototype.ha = function (t, i, n, s, h, r, _e) {
        var u, o, l, a, f;
        if (
          null !== this.dt &&
          void 0 !== this.dt.Es &&
          0 !== this.dt.Es.length
        ) {
          var c = JSON.parse(JSON.stringify(n)),
            v = F(this.dt.Ht),
            d = F(v.Vt()),
            _ = null === (u = this.Ah) || void 0 === u ? void 0 : u.Hh,
            w = F(this.dt.Es[0]).x * i + s.timestampStartOffset,
            M = v.jt(Number(c.Price), Number(d)),
            b = w + (null !== (o = s.lineOffset) && void 0 !== o ? o : 0) * i,
            m = "yellow";
          ("bid" === h
            ? (m = s.lineBidColor)
            : "ask" === h && (m = s.lineAskColor),
            (t.strokeStyle = m),
            (t.lineWidth =
              (null !== (l = s.lineWidth) && void 0 !== l ? l : 1) * i),
            y(t, null !== (a = s.lineStyle) && void 0 !== a ? a : 0),
            t.beginPath(),
            void 0 !== _ && t.moveTo(b, M));
          var p =
            (Number(c.TotalSize) / r) *
            (null !== (f = s.lineLength) && void 0 !== f ? f : 100) *
            i;
          (t.lineTo(b + p, M), t.stroke());
        }
      }),
      (t.prototype.Vh = function (t, i, n) {
        var s,
          r,
          e,
          u,
          o,
          l,
          a,
          f,
          c,
          v,
          d,
          _,
          w,
          M,
          b,
          m,
          p,
          g,
          y,
          k,
          x,
          N,
          S = F(this.dt),
          C = In(S),
          T = Vn(S),
          L = Hn(S) + C,
          A = jn(S) + T,
          D =
            void 0 !== i && void 0 !== n
              ? new h(i, n)
              : P(null === (s = this.dt) || void 0 === s ? void 0 : s.Es)[0],
          B = t || "",
          E = this.Rh(B),
          O = E.oi,
          z = E.li,
          R = D.y,
          W = D.x;
        switch (
          null ===
            (u =
              null ===
                (e = null === (r = S.wi) || void 0 === r ? void 0 : r.box) ||
              void 0 === e
                ? void 0
                : e.alignment) || void 0 === u
            ? void 0
            : u.vertical
        ) {
          case "top":
            R -=
              z +
              ((null ===
                (a =
                  null ===
                    (l =
                      null === (o = S.wi) || void 0 === o ? void 0 : o.box) ||
                  void 0 === l
                    ? void 0
                    : l.offset) || void 0 === a
                ? void 0
                : a.y) || 0);
            break;
          case "middle":
            R -= z / 2;
            break;
          case "bottom":
            R +=
              (null ===
                (v =
                  null ===
                    (c =
                      null === (f = S.wi) || void 0 === f ? void 0 : f.box) ||
                  void 0 === c
                    ? void 0
                    : c.offset) || void 0 === v
                ? void 0
                : v.y) || 0;
        }
        var V = R + A + qn(S) / 2,
          I = "start",
          j = 0;
        switch (
          null ===
            (w =
              null ===
                (_ = null === (d = S.wi) || void 0 === d ? void 0 : d.box) ||
              void 0 === _
                ? void 0
                : _.alignment) || void 0 === w
            ? void 0
            : w.horizontal
        ) {
          case "left":
            W +=
              (null ===
                (m =
                  null ===
                    (b =
                      null === (M = S.wi) || void 0 === M ? void 0 : M.box) ||
                  void 0 === b
                    ? void 0
                    : b.offset) || void 0 === m
                ? void 0
                : m.x) || 0;
            break;
          case "center":
            W -= O / 2;
            break;
          case "right":
            W -=
              O +
              ((null ===
                (y =
                  null ===
                    (g =
                      null === (p = S.wi) || void 0 === p ? void 0 : p.box) ||
                  void 0 === g
                    ? void 0
                    : g.offset) || void 0 === y
                ? void 0
                : y.x) || 0);
        }
        switch (P(null === (k = S.wi) || void 0 === k ? void 0 : k.alignment)) {
          case "start":
          case "left":
            ((I = "start"),
              (j = W + L),
              $n() &&
                ((
                  null === (x = S.wi) || void 0 === x
                    ? void 0
                    : x.forceTextAlign
                )
                  ? (I = "left")
                  : ((j = W + O - L), (I = "right"))));
            break;
          case "center":
            ((I = "center"), (j = W + O / 2));
            break;
          case "right":
          case "end":
            ((I = "end"),
              (j = W + O - L),
              $n() &&
                (null === (N = S.wi) || void 0 === N
                  ? void 0
                  : N.forceTextAlign) &&
                (I = "right"));
        }
        return (
          (this.Ah = {
            Ih: W,
            jh: R,
            Hh: O,
            Jh: z,
            Xh: I,
            tr: V - R,
            Gh: j - W,
          }),
          this.Ah
        );
      }),
      (t.prototype.ir = function (t) {
        var i, n, s;
        if (
          (mn || On(),
          (mn.textBaseline = "alphabetic"),
          (mn.font = this.Uh()),
          null !== this.dt &&
            (null === (i = this.dt.wi) || void 0 === i
              ? void 0
              : i.wordWrapWidth) &&
            !(null === (n = this.dt.wi) || void 0 === n
              ? void 0
              : n.forceCalculateMaxLineWidth))
        )
          return (
            (null === (s = this.dt.wi) || void 0 === s
              ? void 0
              : s.wordWrapWidth) * Yn(this.dt)
          );
        for (var h = 0, r = 0, e = t; r < e.length; r++) {
          var u = e[r];
          h = Math.max(h, mn.measureText(u).width);
        }
        return h;
      }),
      (t.prototype.Qh = function (t) {
        var i,
          n,
          s,
          h,
          r,
          e = F(this.dt),
          u = t || "",
          o = this.$h(
            u,
            null === (i = e.wi) || void 0 === i ? void 0 : i.wordWrapWidth,
          );
        if (
          void 0 !==
          (null ===
            (s = null === (n = e.wi) || void 0 === n ? void 0 : n.box) ||
          void 0 === s
            ? void 0
            : s.maxHeight)
        ) {
          var l = P(
              null ===
                (r = null === (h = e.wi) || void 0 === h ? void 0 : h.box) ||
                void 0 === r
                ? void 0
                : r.maxHeight,
            ),
            a = qn(e),
            f = Jn(e),
            c = Math.floor((l + f) / (a + f));
          o.length > c && (o = o.slice(0, c));
        }
        return ((this.Fh = { nr: this.ir(o), Zh: o }), this.Fh);
      }),
      (t.prototype.Yh = function () {
        var t,
          i,
          n,
          s,
          h,
          r,
          e = F(this.dt),
          u = qn(e),
          o =
            ((
              null ===
                (i = null === (t = e.wi) || void 0 === t ? void 0 : t.font) ||
              void 0 === i
                ? void 0
                : i.bold
            )
              ? "bold "
              : "") +
            ((
              null ===
                (s = null === (n = e.wi) || void 0 === n ? void 0 : n.font) ||
              void 0 === s
                ? void 0
                : s.italic
            )
              ? "italic "
              : "") +
            u +
            "px " +
            (null ===
              (r = null === (h = e.wi) || void 0 === h ? void 0 : h.font) ||
            void 0 === r
              ? void 0
              : r.family);
        return ((this.Dh = { Uh: o, W: u }), this.Dh);
      }),
      (t.prototype.Rh = function (t) {
        var i = this.Qh(t),
          n = F(this.dt);
        return (
          (this.Bh = { oi: Rn(n, i.nr), li: Wn(n, i.Zh.length) }),
          this.Bh
        );
      }),
      (t.prototype.Eh = function (t) {
        var i, n;
        if (null === this.dt) return [];
        var s = this.Vh(t),
          r = s.Ih,
          e = s.jh,
          u = s.Hh,
          o = s.Jh,
          l = this.Kh(t),
          a =
            (-(
              (null ===
                (n =
                  null === (i = this.dt.wi) || void 0 === i ? void 0 : i.box) ||
              void 0 === n
                ? void 0
                : n.angle) || 0
            ) *
              Math.PI) /
            180;
        return (
          (this.Ph = [
            zn(new h(r, e), l, a),
            zn(new h(r + u, e), l, a),
            zn(new h(r + u, e + o), l, a),
            zn(new h(r, e + o), l, a),
          ]),
          this.Ph
        );
      }),
      (t.prototype.Kh = function (t, i, n) {
        var s,
          r,
          e,
          u = this.Vh(t, i, n),
          o = u.Ih,
          l = u.jh,
          a = u.Hh,
          f = u.Jh,
          c = P(
            null ===
              (e =
                null ===
                  (r =
                    null === (s = this.dt) || void 0 === s ? void 0 : s.wi) ||
                void 0 === r
                  ? void 0
                  : r.box) || void 0 === e
              ? void 0
              : e.alignment,
          ),
          v = c.horizontal,
          d = c.vertical,
          _ = 0,
          w = 0;
        switch (v) {
          case "center":
            _ = o + a / 2;
            break;
          case "left":
            _ = o;
            break;
          case "right":
            _ = o + a;
        }
        switch (d) {
          case "middle":
            w = l + f / 2;
            break;
          case "bottom":
            w = l;
            break;
          case "top":
            w = l + f;
        }
        return new h(_, w);
      }),
      t
    );
  })();
function On() {
  var t = document.createElement("canvas");
  ((t.width = 0), (t.height = 0), (mn = F(t.getContext("2d"))));
}
function zn(t, i, n) {
  if (0 === n) return t.clone();
  var s = (t.x - i.x) * Math.cos(n) - (t.y - i.y) * Math.sin(n) + i.x,
    r = (t.x - i.x) * Math.sin(n) + (t.y - i.y) * Math.cos(n) + i.y;
  return new h(s, r);
}
function Rn(t, i) {
  return i + 2 * Hn(t) + 2 * In(t);
}
function Wn(t, i) {
  return qn(t) * i + Jn(t) * (i - 1) + 2 * jn(t) + 2 * Vn(t);
}
function Vn(t) {
  var i, n, s, h, r, e;
  return void 0 !==
    (null ===
      (s =
        null === (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
        void 0 === n
          ? void 0
          : n.padding) || void 0 === s
      ? void 0
      : s.y)
    ? (null ===
        (e =
          null === (r = null === (h = t.wi) || void 0 === h ? void 0 : h.box) ||
          void 0 === r
            ? void 0
            : r.padding) || void 0 === e
        ? void 0
        : e.y) * Yn(t)
    : qn(t) / 3;
}
function In(t) {
  var i, n, s, h, r, e;
  return (
    null ===
      (s =
        null === (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
        void 0 === n
          ? void 0
          : n.padding) || void 0 === s
      ? void 0
      : s.x
  )
    ? (null ===
        (e =
          null === (r = null === (h = t.wi) || void 0 === h ? void 0 : h.box) ||
          void 0 === r
            ? void 0
            : r.padding) || void 0 === e
        ? void 0
        : e.x) * Yn(t)
    : qn(t) / 3;
}
function jn(t) {
  var i, n, s, h;
  return (
    ((null ===
      (h =
        null ===
          (s =
            null ===
              (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
            void 0 === n
              ? void 0
              : n.background) || void 0 === s
          ? void 0
          : s.inflation) || void 0 === h
      ? void 0
      : h.y) || 0) * Yn(t)
  );
}
function Hn(t) {
  var i, n, s, h;
  return (
    ((null ===
      (h =
        null ===
          (s =
            null ===
              (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
            void 0 === n
              ? void 0
              : n.background) || void 0 === s
          ? void 0
          : s.inflation) || void 0 === h
      ? void 0
      : h.x) || 0) * Yn(t)
  );
}
function Jn(t) {
  var i;
  return (
    ((null === (i = t.wi) || void 0 === i ? void 0 : i.padding) || 0) * Yn(t)
  );
}
function qn(t) {
  return Math.ceil(Un(t) * Yn(t));
}
function Un(t) {
  var i, n;
  return (
    (null === (n = null === (i = t.wi) || void 0 === i ? void 0 : i.font) ||
    void 0 === n
      ? void 0
      : n.size) || 30
  );
}
function Yn(t) {
  var i,
    n,
    s = Math.min(
      1,
      Math.max(
        0.2,
        (null === (n = null === (i = t.wi) || void 0 === i ? void 0 : i.box) ||
        void 0 === n
          ? void 0
          : n.scale) || 1,
      ),
    );
  if (1 === s) return s;
  var h = Un(t);
  return Math.ceil(s * h) / h;
}
function $n() {
  return "rtl" === window.document.dir;
}
var Kn = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.vl = new En()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function (_i, _n) {
        this.Kn = null;
        var s = this.Zn.Ht(),
          h = this.Qn.zt();
        if (
          s &&
          !s.et() &&
          !h.et() &&
          (t.prototype.cs.call(this), !(this.Ls.length < 1))
        ) {
          var r = this.Zn.K(),
            e = Gt(r.text),
            u = Gt(r.marketDepth);
          ((e.box.alignment = { vertical: "top", horizontal: "center" }),
            (e.alignment = "center"));
          var o = this.Ls[0].clone(),
            l = new et();
          (this.vl._t({ wi: e, Es: [o], sa: u, Ht: s }),
            l.st(this.vl),
            this.Wo(l),
            (this.Kn = l));
        }
      }),
      i
    );
  })(on),
  Xn = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "MarketDepth"), h._h([new Kn(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 1;
      }),
      i
    );
  })(Qt),
  Zn = (function (t) {
    function i(i, n) {
      var s = t.call(this) || this;
      return (
        (s.kh = 1e3),
        (s.xh = 1e3),
        (s._l = n || new ii(ti.ph)),
        (s.Nh = i || new ii(ti.mh)),
        (s.dt = null),
        s
      );
    }
    return (
      q(i, t),
      (i.prototype._t = function (t) {
        this.dt = t;
      }),
      (i.prototype.lt = function (t, i) {
        if (null === this.dt || this.dt.points.length < 2) return null;
        var n = this.dt.points,
          s = n[0],
          r = n[1],
          e = new h(t, i),
          u = this.Ol(e, s, r);
        if (null !== u) return u;
        if (4 === this.dt.points.length) {
          var o = this.dt.points,
            l = o[2],
            a = o[3],
            f = this.Ol(e, l, a);
          if (null !== f) return f;
          if (this.dt.showMiddleLine) {
            var c = s.add(l).scaled(0.5),
              v = r.add(a).scaled(0.5),
              d = this.Ol(e, c, v);
            if (null !== d) return d;
          }
        }
        return this.dt.hitTestBackground ? this.zl(e) : null;
      }),
      (i.prototype.ft = function (t) {
        var i, n, s, h, r, e;
        if (!(null === this.dt || this.dt.points.length < 2)) {
          (y(
            t,
            (null === (i = this.dt.channelLine) || void 0 === i
              ? void 0
              : i.style) || 0,
          ),
            (t.strokeStyle =
              (null === (n = this.dt.channelLine) || void 0 === n
                ? void 0
                : n.color) || "transparent"),
            (t.lineWidth =
              (null === (s = this.dt.channelLine) || void 0 === s
                ? void 0
                : s.width) || 0),
            (t.lineCap = "butt"),
            (this.xh = t.canvas.width),
            (this.kh = t.canvas.height));
          var u = this.dt.points,
            o = u[0],
            l = u[1];
          if ((this.ra(t, o, l), 4 === this.dt.points.length)) {
            var a = this.dt.points,
              f = a[2],
              c = a[3];
            if (
              (this.ra(t, f, c),
              this.ea(t, this.dt.points),
              this.dt.showMiddleLine)
            ) {
              (y(
                t,
                (null === (h = this.dt.middleLine) || void 0 === h
                  ? void 0
                  : h.style) || 0,
              ),
                (t.strokeStyle =
                  (null === (r = this.dt.middleLine) || void 0 === r
                    ? void 0
                    : r.color) || "transparent"),
                (t.lineWidth =
                  (null === (e = this.dt.middleLine) || void 0 === e
                    ? void 0
                    : e.width) || 0));
              var v = o.add(f).scaled(0.5),
                d = l.add(c).scaled(0.5);
              this.ra(t, v, d);
            }
          }
        }
      }),
      (i.prototype.ra = function (t, i, n) {
        var s = this.Rl(i, n);
        null !== s && S(t, s[0].x, s[0].y, s[1].x, s[1].y);
      }),
      (i.prototype.Ol = function (t, i, n) {
        var s = this.Rl(i, n);
        return null !== s && _(s[0], s[1], t)._ <= 3 ? this.Nh : null;
      }),
      (i.prototype.Rl = function (t, i) {
        var n,
          s,
          h = F(this.dt);
        return C(
          t,
          i,
          this.xh,
          this.kh,
          !!((n = h.extend) != null && n.left),
          !!((s = h.extend) != null && s.right),
        );
      }),
      (i.prototype.ea = function (t, i) {
        var n,
          s,
          r,
          e,
          o,
          l,
          a = F(this.dt),
          f = i[0],
          c = i[1],
          v = i[2],
          _ = i[3],
          w = t.canvas.width,
          M = t.canvas.height;
        if (
          !u(f, c) &&
          !u(v, _) &&
          !(w <= 0 || M <= 0 || d(f, c, v)._ < 1e-6 || d(f, c, _)._ < 1e-6)
        ) {
          var b = [new h(0, 0), new h(w, 0), new h(w, M), new h(0, M)];
          if (
            ((b = this.ua(b, f, c, _)),
            ((n = a.extend) != null && n.right) ||
              (b = this.ua(b, c, _, v)),
            (b = this.ua(b, _, v, f)),
            ((s = a.extend) != null && s.left) ||
              (b = this.ua(b, v, f, c)),
            null !== b)
          ) {
            (t.beginPath(), t.moveTo(b[0].x, b[0].y));
            for (var m = 1; m < b.length; m++) t.lineTo(b[m].x, b[m].y);
            ((t.fillStyle =
              (null ===
                (e =
                  null === (r = this.dt) || void 0 === r
                    ? void 0
                    : r.background) || void 0 === e
                ? void 0
                : e.color) || "transparent"),
              (null ===
                (l =
                  null === (o = this.dt) || void 0 === o
                    ? void 0
                    : o.background) || void 0 === l
                ? void 0
                : l.color) && t.fill());
          }
        }
      }),
      (i.prototype.zl = function (t) {
        var i,
          n,
          s = F(this.dt);
        if (4 !== s.points.length) return null;
        var h = s.points,
          r = h[0],
          e = h[1],
          u = h[2],
          o = (e.y - r.y) / (e.x - r.x),
          l = u.y + o * (t.x - u.x),
          a = r.y + o * (t.x - r.x),
          f = Math.max(a, l),
          c = Math.min(a, l),
          v = Math.max(r.x, e.x),
          d = Math.min(r.x, e.x);
        return (!((i = s.extend) != null && i.left) &&
          t.x < d) ||
          (!((n = s.extend) != null && n.right) &&
            t.x > v)
          ? null
          : t.y >= c && t.y <= f
            ? this._l
            : null;
      }),
      (i.prototype.ua = function (t, i, n, s) {
        return null !== t
          ? (function (t, i) {
              for (var n = [], s = 0; s < t.length; ++s) {
                var h = t[s],
                  r = t[(s + 1) % t.length],
                  e = o(h, r);
                if (a(h, i))
                  (m(n, h), a(r, i) || (null !== (u = b(e, i.h)) && m(n, u)));
                else if (a(r, i)) {
                  var u;
                  null !== (u = b(e, i.h)) && m(n, u);
                }
              }
              return n.length >= 3 ? n : null;
            })(
              t,
              ((h = o(i, n)),
              (r = s),
              new e(h, h.o * r.x + h.l * r.y + h.v > 0)),
            )
          : null;
        var h, r;
      }),
      i
    );
  })(ut),
  Qn = [Ki.vu, Ki.vu, Ki.vu, Ki.vu, Ki.bu, Ki.bu],
  Gn = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.oa = new Zn()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        var i,
          n = this.Zn.K();
        if (n.visible) {
          (t.prototype.cs.call(this), (this.Kn = null));
          var s = this.Zn.Ht();
          if (
            s &&
            !s.et() &&
            0 !== this.Zn.Es().length &&
            !(this.Ls.length <= 1)
          ) {
            var h = !1;
            if (3 === this.Ls.length) {
              var r = this.Qn.zt().dl();
              if (null === r) return;
              var e = this.Zn.Es(),
                u = e[0],
                o = e[1],
                l = e[2],
                a = this.Zn.us(),
                f = null == a ? void 0 : a.Vt();
              if (!f) return;
              var c = s.jt(u.price, f.Jt),
                v = s.jt(o.price, f.Jt),
                d = s.jt(l.price, f.Jt),
                _ = this.Qn.ul(this.Zn),
                w =
                  null !== (i = null == _ ? void 0 : _.li()) && void 0 !== i
                    ? i
                    : 0,
                M = (c < 0 && v < 0 && d < 0) || (c > w && v > w && d > w),
                b =
                  Math.min(u.timestamp, o.timestamp, l.timestamp) >
                  Number(r.to),
                m =
                  Math.max(u.timestamp, o.timestamp, l.timestamp) <
                  Number(r.from);
              h = M || b || m;
            }
            if (!h || n.extend.left || n.extend.right) {
              var p = this.Ls[0],
                g = this.Ls[1],
                y = null,
                k = null;
              if (3 === this.Ls.length) {
                var x = this.Ls[2].y - this.Ls[0].y;
                ((y = new tn(p.x, p.y + x, 2)), (k = new tn(g.x, g.y + x, 3)));
              }
              var N = y && k ? [p, g, y, k] : [p, g];
              this.oa._t(U(U({}, Gt(n)), { points: N, hitTestBackground: !1 }));
              var S = new et();
              S.st(this.oa);
              var C = [];
              if (
                (this.Ls[0] && C.push(new tn(p.x, p.y, 0)),
                this.Ls[1] && C.push(new tn(g.x, g.y, 1)),
                y && k)
              ) {
                C.push(new tn(y.x, y.y, 2), new tn(k.x, k.y, 3));
                var T = y.add(k).scaled(0.5);
                ((T.Mh = 4), (T.co = !0), C.push(T));
                var L = C[0].add(C[1]).scaled(0.5);
                ((L.co = !0), (L.Mh = 5), C.push(L));
              }
              var A = { Es: C, wo: Qn };
              (S.st(this.Vo(A, 0)), (this.Kn = S));
            }
          }
        }
      }),
      i
    );
  })(on),
  ts = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return (
        (h.qs = "ParallelChannel"),
        h.bs.push(new Yt(h, 3)),
        h._h([new Gn(h, i)]),
        h
      );
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 3;
      }),
      (i.prototype.Os = function (i) {
        2 === this.Ls.length
          ? t.prototype.Os.call(this, this.la(i))
          : t.prototype.Os.call(this, i);
      }),
      (i.prototype.Es = function () {
        var i = t.prototype.Es.call(this);
        return 3 !== i.length || this.Fs() ? i : [i[0], i[1], this.la(i[2])];
      }),
      (i.prototype.Rs = function (i, n) {
        if (!(this.Ls[0].timestamp === this.Ls[1].timestamp && i >= 4)) {
          var s = F(this.Is(this.Ls[0])),
            h = F(this.Is(this.Ls[1])),
            r = F(this.Is(n)),
            e = this.aa() || 0,
            u = F(this.Ht()),
            o = this.us(),
            l = D(null === o ? void 0 : o.Vt());
          if (0 === i)
            (t.prototype.Rs.call(this, i, n),
              (this.Ls[2].price = u.cn(r.y + e, l.Jt)));
          else if (1 === i) t.prototype.Rs.call(this, i, n);
          else if (2 === i)
            (t.prototype.Rs.call(this, i, n),
              (this.Ls[0].timestamp = n.timestamp),
              (this.Ls[0].price = u.cn(r.y - e, l.Jt)));
          else if (3 === i)
            ((this.Ls[1].timestamp = n.timestamp),
              (this.Ls[1].price = u.cn(r.y - e, l.Jt)));
          else if (4 === i) {
            var a = h.subtract(s),
              f = (r.x - s.x) / a.x,
              c = r.y - s.addScaled(a, f).y;
            this.Ls[2].price = u.cn(s.y + c, l.Jt);
          } else if (5 === i) {
            ((a = h.subtract(s)),
              (f = (r.x - s.x) / a.x),
              (c = r.y - s.addScaled(a, f).y));
            ((this.Ls[0].price = u.cn(s.y + c, l.Jt)),
              (this.Ls[1].price = u.cn(h.y + c, l.Jt)));
          }
        }
      }),
      (i.prototype.zs = function (i) {
        if (i < 3) return t.prototype.zs.call(this, i);
        var n = this.Is(this.Ls[0]),
          s = this.Is(this.Ls[1]),
          r = this.Is(this.Ls[2]);
        if (!n || !s || !r) return null;
        switch (i) {
          case 3:
            var e = r.y - n.y,
              u = s.add(new h(0, e));
            return this.js(u);
          case 4:
            ((e = r.y - n.y), (u = s.add(new h(0, e))));
            var o = r.add(u).scaled(0.5);
            return this.js(o);
          case 5:
            var l = n.add(s).scaled(0.5);
            return this.js(l);
        }
        return null;
      }),
      (i.prototype.ts = function () {
        return this.fa();
      }),
      (i.prototype.vs = function () {
        return this.fa().slice(0, 2);
      }),
      (i.prototype.aa = function () {
        var t = this.Is(this.Ls[2]),
          i = this.Is(this.Ls[0]);
        return t && i ? t.y - i.y : null;
      }),
      (i.prototype.fa = function () {
        var t = this.Es(),
          i = this.Ls[0] ? this.Is(this.Ls[0]) : null,
          n = this.Ls[1] ? this.Is(this.Ls[1]) : null,
          s = this.Ls[2] ? this.Is(this.Ls[2]) : null;
        if (i && n && s) {
          var r = n.y - i.y,
            e = s.add(new h(0, r));
          t.push(F(this.js(e)));
        }
        return t;
      }),
      (i.prototype.la = function (t) {
        if (this.Ls.length < 2 || this.Ls[1].timestamp === this.Ls[0].timestamp)
          return t;
        var i = F(this.Is(t)),
          n = F(this.Is(this.Ls[1])),
          s = F(this.Is(this.Ls[0])),
          r = n.subtract(s),
          e = (i.x - s.x) / r.x,
          u = s.addScaled(r, e),
          o = i.y - u.y,
          l = s.add(new h(0, o));
        return F(this.js(l));
      }),
      i
    );
  })(Qt),
  is = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.bl = new cn()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        (t.prototype.cs.call(this), (this.Kn = null));
        var i = this.Zn.K();
        this.bl._t({ Ch: Gt(i.line), Es: this.Ls });
        var n = new et();
        (n.st(this.bl), (this.Kn = n), this.Wo(n));
      }),
      i
    );
  })(on),
  ns = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "Path"), h._h([new is(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 4;
      }),
      (i.prototype.Ds = function () {
        if (this.Ls.length >= 4)
          ((this.xs = !0),
            (this.ks = !0),
            (this.Ss = !1),
            (this.Ts = null),
            this.ri().Bs(this));
        else if (this.Ls.length > 1) {
          var t = this.Ls[this.Ls.length - 1],
            i = this.Ls[this.Ls.length - 2],
            n = F(this.Is(t)),
            s = F(this.Is(i));
          n.subtract(s).length() < 10 &&
            (this.Ls.pop(), (this.xs = !0), (this.ks = !0), (this.Ts = null));
        }
      }),
      i
    );
  })(Qt),
  ss = (function () {
    function t(t, i) {
      ((this._l = i || new ii(ti.ph)),
        (this.Nh = t || new ii(ti.mh)),
        (this.dt = null));
    }
    return (
      (t.prototype._t = function (t) {
        this.dt = t;
      }),
      (t.prototype.lt = function (t, i, n) {
        if (null === this.dt || this.dt.points.length < 2) return null;
        var s =
            (n.canvas.ownerDocument &&
              n.canvas.ownerDocument.defaultView &&
              n.canvas.ownerDocument.defaultView.devicePixelRatio) ||
            1,
          r = n.canvas.width,
          e = new h(t, i),
          u = this.El(s),
          o = u[0],
          l = u[1],
          a = new h(l.x, o.y),
          f = new h(o.x, l.y),
          c = this.Ol(e, o, a, r);
        if (null !== c) return c;
        var v = this.Ol(e, f, l, r);
        if (null !== v) return v;
        if (_(a, l, e)._ <= 3) return this.Nh;
        if (_(o, f, e)._ <= 3) return this.Nh;
        var d = this.zl(e, o, l, r);
        return this.dt.hitTestBackground && null !== d ? d : null;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        var h,
          r,
          e,
          u,
          o,
          l,
          a,
          f =
            (null ===
              (r =
                null === (h = this.dt) || void 0 === h ? void 0 : h.border) ||
            void 0 === r
              ? void 0
              : r.width) || 0,
          c =
            null ===
              (u =
                null === (e = this.dt) || void 0 === e ? void 0 : e.border) ||
            void 0 === u
              ? void 0
              : u.color,
          v =
            null ===
              (l =
                null === (o = this.dt) || void 0 === o
                  ? void 0
                  : o.background) || void 0 === l
              ? void 0
              : l.color;
        if (
          !(null === this.dt || this.dt.points.length < 2 || (f <= 0 && !v))
        ) {
          t.save();
          var d = f ? Math.max(1, Math.floor(f * i)) : 0,
            _ = 10,
            w =
              (null === (a = this.dt.border) || void 0 === a
                ? void 0
                : a.style) || 0,
            M = this.dt.points,
            b = M[0],
            m = M[1],
            p = this.dt.extend || {},
            g = p.left,
            k = p.right;
          if (
            (void 0 !== v &&
              ((t.fillStyle = v), t.fillRect(b.x, b.y, m.x - b.x, m.y - b.y)),
            void 0 !== c && f > 0)
          ) {
            (t.beginPath(),
              y(t, w || 0),
              (t.lineWidth = d),
              (t.strokeStyle = c));
            var x = 0.5 * d;
            if (
              (t.moveTo(b.x - (g ? x : 0), b.y - x),
              t.lineTo(m.x + (k ? x : 0), b.y - x),
              t.moveTo(b.x - (g ? x : 0), m.y + x),
              t.lineTo(m.x + (k ? x : 0), m.y + x),
              this.dt.showCenterVerticalLine)
            ) {
              var N = (b.x + m.x) / 2;
              (t.moveTo(N, b.y), t.lineTo(N, m.y));
              var S = 0,
                C = Math.abs(b.y - m.y);
              b.y >= m.y && C > _
                ? ((S = m.y + d),
                  t.moveTo(N - _, S + _),
                  t.lineTo(N, S),
                  t.lineTo(N + _, S + _))
                : b.y < m.y &&
                  C > _ &&
                  ((S = m.y - d),
                  t.moveTo(N - _, S - _),
                  t.lineTo(N, S),
                  t.lineTo(N + _, S - _));
            }
            t.stroke();
          }
          if (this.dt.showCenterHorizontalLine && void 0 !== c && f > 0) {
            (t.beginPath(), y(t, this.dt.centerHorizontalLineStyle));
            var T = this.dt.centerHorizontalLineWidth
              ? Math.max(1, Math.floor(this.dt.centerHorizontalLineWidth * i))
              : 0;
            ((t.lineWidth = T), (t.strokeStyle = c));
            x = 0.5 * d;
            var L = (b.y + m.y) / 2,
              A = b.x,
              P = (b.y + m.y) / 2,
              F = m.x;
            (t.moveTo(A - (g ? x : 0), L),
              t.lineTo(F + (k ? x : 0), P),
              t.stroke());
          }
          t.restore();
        }
      }),
      (t.prototype.El = function (t) {
        var i = F(this.dt).points,
          n = i[0],
          s = i[1],
          r = Math.min(n.x, s.x),
          e = Math.max(n.x, s.x),
          u = Math.min(n.y, s.y),
          o = Math.max(n.y, s.y),
          l = Math.round(r * t),
          a = Math.round(e * t),
          f = Math.round(u * t),
          c = Math.round(o * t);
        return [new h(l, f), new h(a, c)];
      }),
      (t.prototype.Rl = function (t, i, n) {
        var s,
          r,
          e = F(this.dt);
        if (u(t, i)) return null;
        var o = Math.min(t.x, i.x),
          l = Math.max(t.x, i.x),
          a = ((s = e.extend) != null && s.left) ? 0 : Math.max(o, 0),
          f = ((r = e.extend) != null && r.right) ? n : Math.min(l, n);
        return a > f || f <= 0 || a >= n
          ? null
          : [new h(a, t.y), new h(f, i.y)];
      }),
      (t.prototype.Ol = function (t, i, n, s) {
        var h = this.Rl(i, n, s);
        return null !== h && _(h[0], h[1], t)._ <= 3 ? this.Nh : null;
      }),
      (t.prototype.zl = function (t, i, n, s) {
        var h = this.Rl(i, n, s);
        return null !== h && w(t, new r(h[0], h[1])) ? this._l : null;
      }),
      t
    );
  })(),
  hs = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return (
        (s.ca = new ss()),
        (s.vl = new oi()),
        (s.va = new oi()),
        (s.Kn = null),
        s
      );
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        var i,
          n = this.Zn.K();
        if (n.visible) {
          ((this.Kn = null), (this.fs = !1));
          var s = this.Zn.Ht(),
            h = this.Qn.zt();
          if (s && !s.et() && !h.et()) {
            var r = h.dl();
            if (null !== r) {
              var e = this.Zn.Es();
              if (!(e.length < 2)) {
                var u = e[0],
                  o = e[1];
                if (u && o) {
                  var l = this.Zn.us(),
                    a = null == l ? void 0 : l.Vt();
                  if (a) {
                    var f = s.jt(u.price, a.Jt),
                      c = s.jt(o.price, a.Jt),
                      v = this.Qn.ul(this.Zn),
                      d =
                        null !== (i = null == v ? void 0 : v.li()) &&
                        void 0 !== i
                          ? i
                          : 0,
                      _ = (f < 0 && c < 0) || (f > d && c > d),
                      w =
                        Math.min(e[0].timestamp, e[1].timestamp) > Number(r.to),
                      M =
                        Math.max(e[0].timestamp, e[1].timestamp) <
                        Number(r.from);
                    if (
                      !(_ || w || M) ||
                      n.priceRange.extend.left ||
                      n.priceRange.extend.right
                    ) {
                      if ((t.prototype.cs.call(this), this.Ls.length < 2))
                        return;
                      var b = new et();
                      (this.ca._t(
                        U(U({}, Gt(n.priceRange)), {
                          points: this.Ls,
                          hitTestBackground: !1,
                        }),
                      ),
                        b.st(this.ca));
                      var m = this.Ls[0],
                        p = this.Ls[1];
                      if (n.text.value) {
                        var g = Math.min(m.x, p.x),
                          y = Math.max(m.x, p.x),
                          k = Math.min(m.y, p.y),
                          x = Math.max(m.y, p.y),
                          N = m.clone(),
                          S = n.text.font.size / 3,
                          C = 0;
                        switch (n.text.box.alignment.vertical) {
                          case "middle":
                            ((N.y = (k + x) / 2), (C = S));
                            break;
                          case "top":
                            N.y = k;
                            break;
                          case "bottom":
                            N.y = x;
                        }
                        switch (n.text.box.alignment.horizontal) {
                          case "center":
                            N.x = (g + y) / 2;
                            break;
                          case "left":
                            N.x = g;
                            break;
                          case "right":
                            N.x = y;
                        }
                        var T = Gt(n.text);
                        ((T.box = U(U({}, T.box), { padding: { y: S, x: C } })),
                          "middle" === n.text.box.alignment.vertical &&
                            (T.box.maxHeight = x - k),
                          this.vl._t({ wi: T, Es: [N] }),
                          b.st(this.vl));
                      }
                      var L = Math.min(m.x, p.x),
                        A = Math.max(m.x, p.x),
                        P = Math.min(m.y, p.y),
                        F = Math.max(m.y, p.y),
                        D = m.clone(),
                        B = n.text.font.size / 3,
                        E = 0,
                        O = Gt(n.text);
                      ((O.box.alignment.horizontal = "center"),
                        (O.box.alignment.vertical = "top"));
                      var z = s.Vt();
                      switch (
                        (p.y >= m.y
                          ? ((O.box.alignment.vertical = "bottom"),
                            null !== z &&
                              (O.value = String(
                                Number(s.Bi(s.cn(p.y, z), z)) -
                                  Number(s.Bi(s.cn(m.y, z), z)),
                              )))
                          : m.y > p.y &&
                            ((O.box.alignment.vertical = "top"),
                            null !== z &&
                              (O.value =
                                "+" +
                                String(
                                  Number(s.Bi(s.cn(p.y, z), z)) -
                                    Number(s.Bi(s.cn(m.y, z), z)),
                                ))),
                        O.box.alignment.vertical)
                      ) {
                        case "middle":
                          ((D.y = (P + F) / 2), (E = B));
                          break;
                        case "top":
                          D.y = P;
                          break;
                        case "bottom":
                          D.y = F;
                      }
                      switch (O.box.alignment.horizontal) {
                        case "center":
                          D.x = (L + A) / 2;
                          break;
                        case "left":
                          D.x = L;
                          break;
                        case "right":
                          D.x = A;
                      }
                      ((O.box = U(U({}, O.box), { padding: { y: B, x: E } })),
                        (O.font.size = 28),
                        (O.font.color = n.text.font.color),
                        (O.font.bold = !0),
                        (O.box.offset = { x: 0, y: 10 }),
                        "middle" === O.box.alignment.vertical &&
                          (O.box.maxHeight = F - P),
                        this.va._t({ wi: O, Es: [D] }),
                        b.st(this.va),
                        this.Al(m, p, b),
                        (this.Kn = b));
                    }
                  }
                }
              }
            }
          }
        }
      }),
      (i.prototype.Al = function (t, i, n) {
        var s = new tn(t.x, i.y, 2),
          h = new tn(i.x, t.y, 3),
          r = new tn(t.x, 0.5 * (t.y + i.y), 4, !0),
          e = new tn(i.x, 0.5 * (t.y + i.y), 5, !0),
          u = new tn(0.5 * (t.x + i.x), t.y, 6, !0),
          o = new tn(0.5 * (t.x + i.x), i.y, 7, !0),
          l = t.x - i.x,
          a = t.y - i.y,
          f = Math.sign(l * a),
          c = {
            Es: [t, i, s, h, r, e, u, o],
            wo: [
              f < 0 ? Ki.pu : Ki.gu,
              f < 0 ? Ki.pu : Ki.gu,
              f > 0 ? Ki.pu : Ki.gu,
              f > 0 ? Ki.pu : Ki.gu,
              Ki.mu,
              Ki.mu,
              Ki.bu,
              Ki.bu,
            ],
          };
        n.st(this.Vo(c, 0));
      }),
      i
    );
  })(on),
  rs = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "PriceRange"), h._h([new hs(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 2;
      }),
      (i.prototype.Rs = function (i, n) {
        switch ((i < 2 && t.prototype.Rs.call(this, i, n), i)) {
          case 2:
            ((this.Ls[1].price = n.price),
              (this.Ls[0].timestamp = n.timestamp));
            break;
          case 3:
            ((this.Ls[0].price = n.price),
              (this.Ls[1].timestamp = n.timestamp));
            break;
          case 4:
            this.Ls[0].timestamp = n.timestamp;
            break;
          case 5:
            this.Ls[1].timestamp = n.timestamp;
            break;
          case 6:
            this.Ls[0].price = n.price;
            break;
          case 7:
            this.Ls[1].price = n.price;
        }
      }),
      (i.prototype.zs = function (i) {
        return i < 2 ? t.prototype.zs.call(this, i) : this.Pl(i);
      }),
      (i.prototype.Pl = function (t) {
        var i = this.Es()[0],
          n = this.Es()[1];
        return [
          { St: i.price, Fl: i.timestamp },
          { St: n.price, Fl: n.timestamp },
          { St: n.price, Fl: i.timestamp },
          { St: i.price, Fl: n.timestamp },
          { St: (n.price + i.price) / 2, Fl: i.timestamp },
          { St: (n.price + i.price) / 2, Fl: n.timestamp },
          { St: i.price, Fl: (n.timestamp + i.timestamp) / 2 },
          { St: n.price, Fl: (n.timestamp + i.timestamp) / 2 },
        ][t];
      }),
      i
    );
  })(Qt),
  es = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.qs = "Ray"), i);
    }
    return (q(i, t), i);
  })(an),
  us = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.da = new Fn()), (s.vl = new oi()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        var i,
          n = this.Zn.K();
        if (n.visible) {
          ((this.Kn = null), (this.fs = !1));
          var s = this.Zn.Ht(),
            h = this.Qn.zt();
          if (s && !s.et() && !h.et()) {
            var r = h.dl();
            if (null !== r) {
              var e = this.Zn.Es();
              if (!(e.length < 2)) {
                var u = e[0],
                  o = e[1];
                if (u && o) {
                  var l = this.Zn.us(),
                    a = null == l ? void 0 : l.Vt();
                  if (a) {
                    var f = s.jt(u.price, a.Jt),
                      c = s.jt(o.price, a.Jt),
                      v = this.Qn.ul(this.Zn),
                      d =
                        null !== (i = null == v ? void 0 : v.li()) &&
                        void 0 !== i
                          ? i
                          : 0,
                      _ = (f < 0 && c < 0) || (f > d && c > d),
                      w =
                        Math.min(e[0].timestamp, e[1].timestamp) > Number(r.to),
                      M =
                        Math.max(e[0].timestamp, e[1].timestamp) <
                        Number(r.from);
                    if (
                      !(_ || w || M) ||
                      n.rectangle.extend.left ||
                      n.rectangle.extend.right
                    ) {
                      if ((t.prototype.cs.call(this), this.Ls.length < 2))
                        return;
                      var b = new et();
                      (this.da._t(
                        U(U({}, Gt(n.rectangle)), {
                          points: this.Ls,
                          hitTestBackground: !1,
                        }),
                      ),
                        b.st(this.da));
                      var m = this.Ls[0],
                        p = this.Ls[1];
                      if (n.text.value) {
                        var g = Math.min(m.x, p.x),
                          y = Math.max(m.x, p.x),
                          k = Math.min(m.y, p.y),
                          x = Math.max(m.y, p.y),
                          N = m.clone(),
                          S = n.text.font.size / 3,
                          C = 0;
                        switch (n.text.box.alignment.vertical) {
                          case "middle":
                            ((N.y = (k + x) / 2), (C = S));
                            break;
                          case "top":
                            N.y = k;
                            break;
                          case "bottom":
                            N.y = x;
                        }
                        switch (n.text.box.alignment.horizontal) {
                          case "center":
                            N.x = (g + y) / 2;
                            break;
                          case "left":
                            N.x = g;
                            break;
                          case "right":
                            N.x = y;
                        }
                        var T = Gt(n.text);
                        ((T.box = U(U({}, T.box), { padding: { y: S, x: C } })),
                          "middle" === n.text.box.alignment.vertical &&
                            (T.box.maxHeight = x - k),
                          this.vl._t({ wi: T, Es: [N] }),
                          b.st(this.vl));
                      }
                      (this.Al(m, p, b), (this.Kn = b));
                    }
                  }
                }
              }
            }
          }
        }
      }),
      (i.prototype.Al = function (t, i, n) {
        var s = new tn(t.x, i.y, 2),
          h = new tn(i.x, t.y, 3),
          r = new tn(t.x, 0.5 * (t.y + i.y), 4, !0),
          e = new tn(i.x, 0.5 * (t.y + i.y), 5, !0),
          u = new tn(0.5 * (t.x + i.x), t.y, 6, !0),
          o = new tn(0.5 * (t.x + i.x), i.y, 7, !0),
          l = t.x - i.x,
          a = t.y - i.y,
          f = Math.sign(l * a),
          c = {
            Es: [t, i, s, h, r, e, u, o],
            wo: [
              f < 0 ? Ki.pu : Ki.gu,
              f < 0 ? Ki.pu : Ki.gu,
              f > 0 ? Ki.pu : Ki.gu,
              f > 0 ? Ki.pu : Ki.gu,
              Ki.mu,
              Ki.mu,
              Ki.bu,
              Ki.bu,
            ],
          };
        n.st(this.Vo(c, 0));
      }),
      i
    );
  })(on),
  os = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "Rectangle"), h._h([new us(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 2;
      }),
      (i.prototype.Rs = function (i, n) {
        switch ((i < 2 && t.prototype.Rs.call(this, i, n), i)) {
          case 2:
            ((this.Ls[1].price = n.price),
              (this.Ls[0].timestamp = n.timestamp));
            break;
          case 3:
            ((this.Ls[0].price = n.price),
              (this.Ls[1].timestamp = n.timestamp));
            break;
          case 4:
            this.Ls[0].timestamp = n.timestamp;
            break;
          case 5:
            this.Ls[1].timestamp = n.timestamp;
            break;
          case 6:
            this.Ls[0].price = n.price;
            break;
          case 7:
            this.Ls[1].price = n.price;
        }
      }),
      (i.prototype.zs = function (i) {
        return i < 2 ? t.prototype.zs.call(this, i) : this.Pl(i);
      }),
      (i.prototype.Pl = function (t) {
        var i = this.Es()[0],
          n = this.Es()[1];
        return [
          { St: i.price, Fl: i.timestamp },
          { St: n.price, Fl: n.timestamp },
          { St: n.price, Fl: i.timestamp },
          { St: i.price, Fl: n.timestamp },
          { St: (n.price + i.price) / 2, Fl: i.timestamp },
          { St: (n.price + i.price) / 2, Fl: n.timestamp },
          { St: i.price, Fl: (n.timestamp + i.timestamp) / 2 },
          { St: n.price, Fl: (n.timestamp + i.timestamp) / 2 },
        ][t];
      }),
      i
    );
  })(Qt),
  ls = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.vl = new oi()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function (_i, _n) {
        var s,
          h = this.Zn.K();
        if (h.visible) {
          this.Kn = null;
          var r = this.Zn.Ht(),
            e = this.Qn.zt();
          if (
            r &&
            !r.et() &&
            !e.et() &&
            (t.prototype.cs.call(this), !(this.Ls.length < 1))
          ) {
            var u = e.dl();
            if (null !== u) {
              var o = this.Zn.Es(),
                l = o[0];
              if (l) {
                var a = this.Zn.us(),
                  f = null == a ? void 0 : a.Vt();
                if (f) {
                  var c = r.jt(l.price, f.Jt),
                    v = this.Qn.ul(this.Zn),
                    d =
                      null !== (s = null == v ? void 0 : v.li()) && void 0 !== s
                        ? s
                        : 0,
                    _ = c < 0 || c > d,
                    w = Math.min(o[0].timestamp) > Number(u.to),
                    M = Math.max(o[0].timestamp) < Number(u.from);
                  if (!(_ || w || M)) {
                    var b = Gt(h.text);
                    ((b.box.alignment = {
                      vertical: "top",
                      horizontal: "center",
                    }),
                      (b.alignment = "center"));
                    var m = this.Ls[0].clone(),
                      p = new et();
                    (this.vl._t({ wi: b, Es: [m] }),
                      p.st(this.vl),
                      this.Wo(p),
                      (this.Kn = p));
                  }
                }
              }
            }
          }
        }
      }),
      i
    );
  })(on),
  as = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "Text"), h._h([new ls(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 1;
      }),
      i
    );
  })(Qt),
  fs = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.dt = null), i);
    }
    return (
      q(i, t),
      (i.prototype._t = function (t) {
        this.dt = t;
      }),
      (i.prototype.lt = function (t, i) {
        if (null === this.dt || this.dt.points.length < 2) return null;
        var n = this.dt.points,
          s = n[0],
          r = n[1],
          e = new h(t, i);
        if (_(s, r, e)._ <= ni) return new ii(ti.mh);
        if (3 !== this.dt.points.length) return null;
        var u = this.dt.points[2];
        return _(r, u, e)._ <= ni || _(u, s, e)._ <= ni
          ? new ii(ti.mh)
          : this.dt.hitTestBackground &&
              (function (t, i, n, s) {
                var h = i.add(n).scaled(0.5).add(s).scaled(0.5);
                return (
                  null === v(i, n, h, t) &&
                  null === v(n, s, h, t) &&
                  null === v(s, i, h, t)
                );
              })(e, s, r, u)
            ? new ii(ti.ph)
            : null;
      }),
      (i.prototype.ft = function (t) {
        var i, n, s, h;
        if (!(null === this.dt || this.dt.points.length < 2)) {
          var r = this.dt.points,
            e = r[0],
            u = r[1],
            o = 2 === this.dt.points.length ? u : this.dt.points[2];
          ((t.lineCap = "butt"),
            (t.lineWidth =
              (null === (i = this.dt.border) || void 0 === i
                ? void 0
                : i.width) || 0),
            (t.strokeStyle =
              (null === (n = this.dt.border) || void 0 === n
                ? void 0
                : n.color) || "transparent"),
            void 0 !==
              (null === (s = this.dt.border) || void 0 === s
                ? void 0
                : s.style) && y(t, this.dt.border.style),
            t.beginPath(),
            (t.fillStyle =
              (null === (h = this.dt.background) || void 0 === h
                ? void 0
                : h.color) || "transparent"),
            t.moveTo(e.x, e.y),
            t.lineTo(u.x, u.y),
            t.lineTo(o.x, o.y),
            t.lineTo(e.x, e.y),
            t.fill(),
            t.stroke());
        }
      }),
      i
    );
  })(ut),
  cs = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s._a = new fs()), (s.Kn = null), s);
    }
    return (
      q(i, t),
      (i.prototype.cs = function () {
        var i,
          n = this.Zn.K();
        if (n.visible) {
          var s = this.Zn.Es(),
            h = !1;
          if (3 === this.Ls.length) {
            var r = this.Zn.Ht(),
              e = this.Qn.zt();
            if (!r || r.et() || e.et()) return;
            var u = e.dl();
            if (null === u) return;
            var o = s[0],
              l = s[1],
              a = s[2];
            if (!o || !l || !a) return;
            var f = this.Zn.us(),
              c = null == f ? void 0 : f.Vt();
            if (!c) return;
            var v = r.jt(o.price, c.Jt),
              d = r.jt(l.price, c.Jt),
              _ = r.jt(a.price, c.Jt),
              w = this.Qn.ul(this.Zn),
              M =
                null !== (i = null == w ? void 0 : w.li()) && void 0 !== i
                  ? i
                  : 0,
              b = (v < 0 && d < 0 && _ < 0) || (v > M && d > M && _ > M),
              m =
                Math.min(s[0].timestamp, s[1].timestamp, s[2].timestamp) >
                Number(u.to),
              p =
                Math.max(s[0].timestamp, s[1].timestamp, s[2].timestamp) <
                Number(u.from);
            h = b || m || p;
          }
          if (!h && n.visible) {
            (t.prototype.cs.call(this),
              (this.Kn = null),
              this._a._t(
                U(U({}, n.triangle), {
                  points: this.Ls,
                  hitTestBackground: !1,
                }),
              ));
            var g = new et();
            (g.st(this._a), this.Wo(g), (this.Kn = g));
          }
        }
      }),
      i
    );
  })(on),
  vs = (function (t) {
    function i(i, n, s) {
      void 0 === s && (s = []);
      var h = t.call(this, i, n, s) || this;
      return ((h.qs = "Triangle"), h._h([new cs(h, i)]), h);
    }
    return (
      q(i, t),
      (i.prototype.Ps = function () {
        return 3;
      }),
      i
    );
  })(Qt),
  ds = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return (
        (s.cl = new hi()),
        (s.vl = new oi()),
        (s.Kn = null),
        s.cl.Sh(new ii(ti.mh)),
        s
      );
    }
    return (
      q(i, t),
      (i.prototype.cs = function (i, n) {
        this.Kn = null;
        var s = this.Zn.Ht(),
          r = this.Qn.zt();
        if (s && !s.et() && !r.et()) {
          var e = this.Zn.Es();
          if (!(e.length < 1)) {
            var u = r.Hs(0),
              o = r.Hs(n),
              l = this.Zn.K();
            if (
              !(e[0].timestamp > o.timestamp || e[0].timestamp < u.timestamp)
            ) {
              if ((t.prototype.cs.call(this), this.Ls.length < 1)) return;
              var a = this.Ls[0],
                f = new tn(a.x, i, 0),
                c = new tn(a.x, 0, 1);
              ((a.y = i / 2), (a.co = !0));
              var v = new et();
              if (
                (this.cl._t({
                  Ch: U(U({}, Gt(l.line)), {
                    end: { au: 0, fu: 0 },
                    extend: { au: !1, fu: !1 },
                  }),
                  Es: [f, c],
                }),
                v.st(this.cl),
                l.text.value)
              ) {
                var d = (Math.atan((c.y - f.y) / (c.x - f.x)) / Math.PI) * -180,
                  _ = l.text.box.alignment.horizontal,
                  w =
                    "left" === _
                      ? f.clone()
                      : "right" === _
                        ? c.clone()
                        : new h((f.x + c.x) / 2, (f.y + c.y) / 2),
                  M = Gt(l.text);
                ((M.box = U(U({}, M.box), { angle: d })),
                  this.vl._t({ wi: M, Es: [w] }),
                  v.st(this.vl));
              }
              (this.Wo(v), (this.Kn = v));
            }
          }
        }
      }),
      i
    );
  })(on),
  _s = {
    FibRetracement: Cn,
    ParallelChannel: ts,
    HorizontalLine: An,
    VerticalLine: (function (t) {
      function i(i, n, s) {
        void 0 === s && (s = []);
        var h = t.call(this, i, n, s) || this;
        return ((h.qs = "VerticalLine"), h._h([new ds(h, i)]), h);
      }
      return (
        q(i, t),
        (i.prototype.Ps = function () {
          return 1;
        }),
        (i.prototype.Nn = function () {
          return [];
        }),
        (i.prototype.ts = function () {
          return [];
        }),
        (i.prototype._s = function () {
          return this.K().line.color;
        }),
        i
      );
    })(Qt),
    Highlighter: Tn,
    CrossLine: kn,
    TrendLine: an,
    Callout: wn,
    Rectangle: os,
    LongShortPosition: Bn,
    Circle: gn,
    PriceRange: rs,
    Triangle: vs,
    Brush: dn,
    Path: ns,
    Text: as,
    Ray: es,
    Arrow: fn,
    ExtendedLine: xn,
    HorizontalRay: Pn,
    MarketDepth: Xn,
  },
  ws = (function () {
    function t(t) {
      ((this.wa = null), (this.Ma = null), (this.ba = null), (this.Qn = t));
    }
    return (
      (t.prototype.ma = function (t, i) {
        ((this.Ma = i || {}),
          (this.ba = t),
          this.Qn.He().forEach(function (t) {
            t instanceof Qt && (t.Qs(!1), t.Zs(!1), t.th(!1), t.nh(!1));
          }),
          this.Qn.oo());
      }),
      (t.prototype.pa = function () {
        return null !== this.ba;
      }),
      (t.prototype.Ao = function (t, i, n, s) {
        var h;
        if (this.ba && this.Ma && ((s.Fo = !0), 6 === n)) {
          var r =
              (null === (h = t.Js().He()[0].Ht()) || void 0 === h
                ? void 0
                : h.Ji()) || t.Js().ri().ga(),
            e = K(tt(Jt[this.ba]), this.Ma || {});
          ((this.wa = new _s[this.ba](this.Qn, e, [])),
            t.Js().qe(this.wa, r),
            (this.ba = null),
            (this.Ma = null));
        }
      }),
      t
    );
  })(),
  Ms = (function () {
    function t(t) {
      this.ya = t;
    }
    return (
      (t.prototype.format = function (t) {
        var i = "";
        return (
          t < 0 && ((i = "-"), (t = -t)),
          t < 995
            ? i + this.ka(t)
            : t < 999995
              ? i + this.ka(t / 1e3) + "K"
              : t < 999999995
                ? ((t = 1e3 * Math.round(t / 1e3)), i + this.ka(t / 1e6) + "M")
                : ((t = 1e6 * Math.round(t / 1e6)), i + this.ka(t / 1e9) + "B")
        );
      }),
      (t.prototype.ka = function (t) {
        var i = Math.pow(10, this.ya);
        return (
          (t = Math.round(t * i) / i) >= 1e-15 && t < 1
            ? t.toFixed(this.ya).replace(/\.?0+$/, "")
            : String(t)
        ).replace(/(\.[1-9]*)0+$/, function (t, i) {
          return i;
        });
      }),
      t
    );
  })();
function bs(t, i, n, s) {
  if (0 !== i.length) {
    var h = i[s.from].bt,
      r = i[s.from].gt;
    t.moveTo(h, r);
    for (var e = s.from + 1; e < s.to; ++e) {
      var u = i[e];
      if (1 === n) {
        var o = i[e - 1].gt,
          l = u.bt;
        t.lineTo(l, o);
      }
      t.lineTo(u.bt, u.gt);
    }
  }
}
var ms = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.dt = null), i);
    }
    return (
      q(i, t),
      (i.prototype._t = function (t) {
        this.dt = t;
      }),
      (i.prototype.ft = function (t) {
        if (
          null !== this.dt &&
          0 !== this.dt.Mt.length &&
          null !== this.dt.wt
        ) {
          if (
            ((t.lineCap = "butt"),
            (t.lineJoin = "round"),
            (t.lineWidth = this.dt.Gt),
            y(t, this.dt.ti),
            (t.lineWidth = 1),
            t.beginPath(),
            1 === this.dt.Mt.length)
          ) {
            var i = this.dt.Mt[0],
              n = this.dt.xa / 2;
            (t.moveTo(i.bt - n, this.dt.Na),
              t.lineTo(i.bt - n, i.gt),
              t.lineTo(i.bt + n, i.gt),
              t.lineTo(i.bt + n, this.dt.Na));
          } else
            (t.moveTo(this.dt.Mt[this.dt.wt.from].bt, this.dt.Na),
              t.lineTo(
                this.dt.Mt[this.dt.wt.from].bt,
                this.dt.Mt[this.dt.wt.from].gt,
              ),
              bs(t, this.dt.Mt, this.dt.Sa, this.dt.wt),
              this.dt.wt.to > this.dt.wt.from &&
                (t.lineTo(this.dt.Mt[this.dt.wt.to - 1].bt, this.dt.Na),
                t.lineTo(this.dt.Mt[this.dt.wt.from].bt, this.dt.Na)));
          (t.closePath(), (t.fillStyle = this.Ca(t)), t.fill());
        }
      }),
      i
    );
  })(ut),
  ps = (function (t) {
    function i() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      q(i, t),
      (i.prototype.Ca = function (t) {
        var i = this.dt,
          n = t.createLinearGradient(0, 0, 0, i.Ta);
        return (n.addColorStop(0, i.La), n.addColorStop(1, i.Aa), n);
      }),
      i
    );
  })(ms),
  gs = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.dt = null), i);
    }
    return (
      q(i, t),
      (i.prototype._t = function (t) {
        this.dt = t;
      }),
      (i.prototype.ft = function (t) {
        if (null !== this.dt && 0 !== this.dt.Mt.length && null !== this.dt.wt)
          if (
            ((t.lineCap = "butt"),
            (t.lineWidth = this.dt.Gt),
            y(t, this.dt.ti),
            (t.strokeStyle = this.Pa(t)),
            (t.lineJoin = "round"),
            1 === this.dt.Mt.length)
          ) {
            t.beginPath();
            var i = this.dt.Mt[0];
            (t.moveTo(i.bt - this.dt.xa / 2, i.gt),
              t.lineTo(i.bt + this.dt.xa / 2, i.gt),
              void 0 !== i.j && (t.strokeStyle = i.j),
              t.stroke());
          } else this.Fa(t, this.dt);
      }),
      (i.prototype.Fa = function (t, i) {
        (t.beginPath(), bs(t, i.Mt, i.Sa, i.wt), t.stroke());
      }),
      i
    );
  })(ut),
  ys = (function (t) {
    function i() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      q(i, t),
      (i.prototype.Fa = function (t, i) {
        var n,
          s,
          h = i.Mt,
          r = i.wt,
          e = i.Sa,
          u = i.xt;
        if (0 !== h.length && null !== r) {
          t.beginPath();
          var o = h[r.from];
          t.moveTo(o.bt, o.gt);
          var l = null !== (n = o.j) && void 0 !== n ? n : u;
          t.strokeStyle = l;
          for (
            var a = function (i) {
                (t.stroke(), t.beginPath(), (t.strokeStyle = i), (l = i));
              },
              f = r.from + 1;
            f < r.to;
            ++f
          ) {
            var c = h[f],
              v = h[f - 1],
              d = null !== (s = c.j) && void 0 !== s ? s : u;
            (1 === e &&
              (t.lineTo(c.bt, v.gt), d !== l && (a(d), t.moveTo(c.bt, v.gt))),
              t.lineTo(c.bt, c.gt),
              1 !== e && d !== l && (a(d), t.moveTo(c.bt, c.gt)));
          }
          t.stroke();
        }
      }),
      (i.prototype.Pa = function () {
        return this.dt.xt;
      }),
      i
    );
  })(gs);
function ks(t, i, n, s, h) {
  (void 0 === s && (s = 0), void 0 === h && (h = t.length));
  for (var r = h - s; 0 < r; ) {
    var e = r >> 1,
      u = s + e;
    n(t[u], i) ? ((s = u + 1), (r -= e + 1)) : (r = e);
  }
  return s;
}
function xs(t, i, n, s, h) {
  (void 0 === s && (s = 0), void 0 === h && (h = t.length));
  for (var r = h - s; 0 < r; ) {
    var e = r >> 1,
      u = s + e;
    n(i, t[u]) ? (r = e) : ((s = u + 1), (r -= e + 1));
  }
  return s;
}
function Ns(t, i) {
  return t.Nt < i;
}
function Ss(t, i) {
  return t < i.Nt;
}
function Cs(t, i, n) {
  var s = i.au(),
    h = i.fu(),
    r = ks(t, s, Ns),
    e = xs(t, h, Ss);
  if (!n) return { from: r, to: e };
  var u = r,
    o = e;
  return (
    r > 0 && r < t.length && t[r].Nt >= s && (u = r - 1),
    e > 0 && e < t.length && t[e - 1].Nt <= h && (o = e + 1),
    { from: u, to: o }
  );
}
var Ts = (function () {
    function t(t, i, n) {
      ((this.fs = !0),
        (this.Da = !0),
        (this.Ba = !0),
        (this.Ea = []),
        (this.Oa = null),
        (this.za = t),
        (this.Qn = i),
        (this.Ra = n));
    }
    return (
      (t.prototype.Ft = function (t) {
        ((this.fs = !0),
          "data" === t && (this.Da = !0),
          "options" === t && (this.Ba = !0));
      }),
      (t.prototype.Wa = function () {
        (this.Da && (this.Va(), (this.Da = !1)),
          this.fs && (this.Ia(), (this.fs = !1)),
          this.Ba && (this.ja(), (this.Ba = !1)));
      }),
      (t.prototype.Ha = function () {
        this.Oa = null;
      }),
      (t.prototype.Ia = function () {
        var t = this.za.Ht(),
          i = this.Qn.zt();
        if ((this.Ha(), !i.et() && !t.et())) {
          var n = i.es();
          if (null !== n && 0 !== this.za.Pn().Ja()) {
            var s = this.za.Vt();
            null !== s &&
              ((this.Oa = Cs(this.Ea, n, this.Ra)), this.qa(t, i, s.Jt));
          }
        }
      }),
      t
    );
  })(),
  Ls = (function (t) {
    function i(i, n) {
      return t.call(this, i, n, !0) || this;
    }
    return (
      q(i, t),
      (i.prototype.qa = function (t, i, n) {
        (i.Ua(this.Ea, nt(this.Oa)), t.Ee(this.Ea, n, nt(this.Oa)));
      }),
      (i.prototype.Ya = function (t, i) {
        return { Nt: t, St: i, bt: NaN, gt: NaN };
      }),
      (i.prototype.ja = function () {}),
      (i.prototype.Va = function () {
        var t = this,
          i = this.za.$a();
        this.Ea = this.za
          .Pn()
          .Ka()
          .map(function (n) {
            var s = n.value[3];
            return t.Xa(n.index, s, i);
          });
      }),
      i
    );
  })(Ts),
  As = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return (
        (s.ni = new et()),
        (s.Za = new ps()),
        (s.Qa = new ys()),
        s.ni.ut([s.Za, s.Qa]),
        s
      );
    }
    return (
      q(i, t),
      (i.prototype.Bt = function (t, _i) {
        if (!this.za.Wt()) return null;
        var n = this.za.K();
        return (
          this.Wa(),
          this.Za._t({
            Sa: n.lineType,
            Mt: this.Ea,
            ti: n.lineStyle,
            Gt: n.lineWidth,
            La: n.topColor,
            Aa: n.bottomColor,
            Na: t,
            Ta: t,
            wt: this.Oa,
            xa: this.Qn.zt().Ga(),
          }),
          this.Qa._t({
            Sa: n.lineType,
            Mt: this.Ea,
            xt: n.lineColor,
            ti: n.lineStyle,
            Gt: n.lineWidth,
            wt: this.Oa,
            xa: this.Qn.zt().Ga(),
          }),
          this.ni
        );
      }),
      (i.prototype.Xa = function (t, i) {
        return this.Ya(t, i);
      }),
      i
    );
  })(Ls),
  Ps = (function () {
    function t() {
      ((this.$t = null), (this.tf = 0), (this.if = 0));
    }
    return (
      (t.prototype._t = function (t) {
        this.$t = t;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        if (
          null !== this.$t &&
          0 !== this.$t.Pn.length &&
          null !== this.$t.wt
        ) {
          if (((this.tf = this.nf(i)), this.tf >= 2))
            Math.max(1, Math.floor(i)) % 2 != this.tf % 2 && this.tf--;
          this.if = this.$t.sf ? Math.min(this.tf, Math.floor(i)) : this.tf;
          for (
            var h = null,
              r = this.if <= this.tf && this.$t.Ga >= Math.floor(1.5 * i),
              e = this.$t.wt.from;
            e < this.$t.wt.to;
            ++e
          ) {
            var u = this.$t.Pn[e];
            h !== u.j && ((t.fillStyle = u.j), (h = u.j));
            var o = Math.floor(0.5 * this.if),
              l = Math.round(u.bt * i),
              a = l - o,
              f = this.if,
              c = a + f - 1,
              v = Math.min(u.We, u.Ve),
              d = Math.max(u.We, u.Ve),
              _ = Math.round(v * i) - o,
              w = Math.round(d * i) + o,
              M = Math.max(w - _, this.if);
            t.fillRect(a, _, f, M);
            var b = Math.ceil(1.5 * this.tf);
            if (r) {
              if (this.$t.hf) {
                var m = l - b,
                  p = Math.max(_, Math.round(u.Re * i) - o),
                  g = p + f - 1;
                (g > _ + M - 1 && (p = (g = _ + M - 1) - f + 1),
                  t.fillRect(m, p, a - m, g - p + 1));
              }
              var y = l + b,
                k = Math.max(_, Math.round(u.Ie * i) - o),
                x = k + f - 1;
              (x > _ + M - 1 && (k = (x = _ + M - 1) - f + 1),
                t.fillRect(c + 1, k, y - c, x - k + 1));
            }
          }
        }
      }),
      (t.prototype.nf = function (t) {
        var i = Math.floor(t);
        return Math.max(
          i,
          Math.floor(
            (function (t, i) {
              return Math.floor(0.3 * t * i);
            })(F(this.$t).Ga, t),
          ),
        );
      }),
      t
    );
  })(),
  Fs = (function (t) {
    function i(i, n) {
      return t.call(this, i, n, !1) || this;
    }
    return (
      q(i, t),
      (i.prototype.qa = function (t, i, n) {
        (i.Ua(this.Ea, nt(this.Oa)), t.ze(this.Ea, n, nt(this.Oa)));
      }),
      (i.prototype.rf = function (t, i, _n) {
        return {
          Nt: t,
          open: i.value[0],
          high: i.value[1],
          low: i.value[2],
          close: i.value[3],
          bt: NaN,
          Re: NaN,
          We: NaN,
          Ve: NaN,
          Ie: NaN,
        };
      }),
      (i.prototype.Va = function () {
        var t = this,
          i = this.za.$a();
        this.Ea = this.za
          .Pn()
          .Ka()
          .map(function (n) {
            return t.Xa(n.index, n, i);
          });
      }),
      i
    );
  })(Ts),
  Ds = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.ni = new Ps()), i);
    }
    return (
      q(i, t),
      (i.prototype.Bt = function (_t, _i) {
        if (!this.za.Wt()) return null;
        var n = this.za.K();
        this.Wa();
        var s = {
          Pn: this.Ea,
          Ga: this.Qn.zt().Ga(),
          hf: n.openVisible,
          sf: n.thinBars,
          wt: this.Oa,
        };
        return (this.ni._t(s), this.ni);
      }),
      (i.prototype.ja = function () {
        var t = this;
        this.Ea.forEach(function (i) {
          i.j = t.za.$a().uf(i.Nt).ef;
        });
      }),
      (i.prototype.Xa = function (t, i, n) {
        return U(U({}, this.rf(t, i, n)), { j: n.uf(t).ef });
      }),
      i
    );
  })(Fs),
  Bs = (function (t) {
    function i() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      q(i, t),
      (i.prototype.Ca = function (t) {
        var i = this.dt,
          n = t.createLinearGradient(0, 0, 0, i.Ta),
          s = Ai(i.Na / i.Ta, 0, 1);
        return (
          n.addColorStop(0, i.lf),
          n.addColorStop(s, i.af),
          n.addColorStop(s, i.ff),
          n.addColorStop(1, i.cf),
          n
        );
      }),
      i
    );
  })(ms),
  Es = (function (t) {
    function i() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      q(i, t),
      (i.prototype.Pa = function (t) {
        var i = this.dt,
          n = t.createLinearGradient(0, 0, 0, i.Ta),
          s = Ai(i.Na / i.Ta, 0, 1);
        return (
          n.addColorStop(0, i.La),
          n.addColorStop(s, i.La),
          n.addColorStop(s, i.Aa),
          n.addColorStop(1, i.Aa),
          n
        );
      }),
      i
    );
  })(gs),
  Os = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return (
        (s.vf = new Bs()),
        (s.df = new Es()),
        (s.Ct = new et()),
        s.Ct.ut([s.vf, s.df]),
        s
      );
    }
    return (
      q(i, t),
      (i.prototype.Bt = function (_t, _i) {
        if (!this.za.Wt()) return null;
        var n = this.za.Vt();
        if (null === n) return null;
        var s = this.za.K();
        this.Wa();
        var h = this.za.Ht().jt(s.baseValue.price, n.Jt),
          r = this.Qn.zt().Ga();
        return (
          this.vf._t({
            Mt: this.Ea,
            lf: s.topFillColor1,
            af: s.topFillColor2,
            ff: s.bottomFillColor1,
            cf: s.bottomFillColor2,
            Gt: s.lineWidth,
            ti: s.lineStyle,
            Sa: 0,
            Na: h,
            Ta: t,
            wt: this.Oa,
            xa: r,
          }),
          this.df._t({
            Mt: this.Ea,
            La: s.topLineColor,
            Aa: s.bottomLineColor,
            Gt: s.lineWidth,
            ti: s.lineStyle,
            Sa: 0,
            Na: h,
            Ta: t,
            wt: this.Oa,
            xa: r,
          }),
          this.Ct
        );
      }),
      (i.prototype.Xa = function (t, i) {
        return this.Ya(t, i);
      }),
      i
    );
  })(Ls),
  zs = (function () {
    function t() {
      ((this.$t = null), (this.tf = 0));
    }
    return (
      (t.prototype._t = function (t) {
        this.$t = t;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        if (
          null !== this.$t &&
          0 !== this.$t.Pn.length &&
          null !== this.$t.wt
        ) {
          if (
            ((this.tf = (function (t, i) {
              if (t >= 2.5 && t <= 4) return Math.floor(3 * i);
              var n =
                  1 - (0.2 * Math.atan(Math.max(4, t) - 4)) / (0.5 * Math.PI),
                s = Math.floor(t * n * i),
                h = Math.floor(t * i),
                r = Math.min(s, h);
              return Math.max(Math.floor(i), r);
            })(this.$t.Ga, i)),
            this.tf >= 2)
          )
            Math.floor(i) % 2 != this.tf % 2 && this.tf--;
          var h = this.$t.Pn;
          (this.$t._f && this.wf(t, h, this.$t.wt, i),
            this.$t.Mf && this.Tl(t, h, this.$t.wt, this.$t.Ga, i));
          var r = this.bf(i);
          (!this.$t.Mf || this.tf > 2 * r) && this.mf(t, h, this.$t.wt, i);
        }
      }),
      (t.prototype.wf = function (t, i, n, s) {
        if (null !== this.$t) {
          var h = "",
            r = Math.min(Math.floor(s), Math.floor(this.$t.Ga * s));
          r = Math.max(Math.floor(s), Math.min(r, this.tf));
          for (
            var e = Math.floor(0.5 * r), u = null, o = n.from;
            o < n.to;
            o++
          ) {
            var l = i[o];
            l.pf !== h && ((t.fillStyle = l.pf), (h = l.pf));
            var a = Math.round(Math.min(l.Re, l.Ie) * s),
              f = Math.round(Math.max(l.Re, l.Ie) * s),
              c = Math.round(l.We * s),
              v = Math.round(l.Ve * s),
              d = Math.round(s * l.bt) - e,
              _ = d + r - 1;
            null !== u && ((d = Math.max(u + 1, d)), (d = Math.min(d, _)));
            var w = _ - d + 1;
            (t.fillRect(d, c, w, a - c),
              t.fillRect(d, f + 1, w, v - f),
              (u = _));
          }
        }
      }),
      (t.prototype.bf = function (t) {
        var i = Math.floor(1 * t);
        this.tf <= 2 * i && (i = Math.floor(0.5 * (this.tf - 1)));
        var n = Math.max(Math.floor(t), i);
        return this.tf <= 2 * n
          ? Math.max(Math.floor(t), Math.floor(1 * t))
          : n;
      }),
      (t.prototype.Tl = function (t, i, n, s, h) {
        if (null !== this.$t)
          for (
            var r = "", e = this.bf(h), u = null, o = n.from;
            o < n.to;
            o++
          ) {
            var l = i[o];
            l.qt !== r && ((t.fillStyle = l.qt), (r = l.qt));
            var a = Math.round(l.bt * h) - Math.floor(0.5 * this.tf),
              f = a + this.tf - 1,
              c = Math.round(Math.min(l.Re, l.Ie) * h),
              v = Math.round(Math.max(l.Re, l.Ie) * h);
            if (
              (null !== u && ((a = Math.max(u + 1, a)), (a = Math.min(a, f))),
              this.$t.Ga * h > 2 * e)
            )
              dt(t, a, c, f - a + 1, v - c + 1, e);
            else {
              var d = f - a + 1;
              t.fillRect(a, c, d, v - c + 1);
            }
            u = f;
          }
      }),
      (t.prototype.mf = function (t, i, n, s) {
        if (null !== this.$t)
          for (var h = "", r = this.bf(s), e = n.from; e < n.to; e++) {
            var u = i[e],
              o = Math.round(Math.min(u.Re, u.Ie) * s),
              l = Math.round(Math.max(u.Re, u.Ie) * s),
              a = Math.round(u.bt * s) - Math.floor(0.5 * this.tf),
              f = a + this.tf - 1;
            if (u.j !== h) {
              var c = u.j;
              ((t.fillStyle = c), (h = c));
            }
            (this.$t.Mf && ((a += r), (o += r), (f -= r), (l -= r)),
              o > l || t.fillRect(a, o, f - a + 1, l - o + 1));
          }
      }),
      t
    );
  })(),
  Rs = (function (t) {
    function i() {
      var i = (null !== t && t.apply(this, arguments)) || this;
      return ((i.ni = new zs()), i);
    }
    return (
      q(i, t),
      (i.prototype.Bt = function (_t, _i) {
        if (!this.za.Wt()) return null;
        var n = this.za.K();
        this.Wa();
        var s = {
          Pn: this.Ea,
          Ga: this.Qn.zt().Ga(),
          _f: n.wickVisible,
          Mf: n.borderVisible,
          wt: this.Oa,
        };
        return (this.ni._t(s), this.ni);
      }),
      (i.prototype.ja = function () {
        var t = this;
        this.Ea.forEach(function (i) {
          var n = t.za.$a().uf(i.Nt);
          ((i.j = n.ef), (i.pf = n.gf), (i.qt = n.yf));
        });
      }),
      (i.prototype.Xa = function (t, i, n) {
        var s = n.uf(t);
        return U(U({}, this.rf(t, i, n)), { j: s.ef, pf: s.gf, qt: s.yf });
      }),
      i
    );
  })(Fs),
  Ws = (function () {
    function t() {
      ((this.$t = null), (this.kf = []));
    }
    return (
      (t.prototype._t = function (t) {
        ((this.$t = t), (this.kf = []));
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        if (
          null !== this.$t &&
          0 !== this.$t.Mt.length &&
          null !== this.$t.wt
        ) {
          this.kf.length || this.xf(i);
          for (
            var h = Math.max(1, Math.floor(i)),
              r = Math.round(this.$t.Nf * i) - Math.floor(h / 2),
              e = r + h,
              u = this.$t.wt.from;
            u < this.$t.wt.to;
            u++
          ) {
            var o = this.$t.Mt[u],
              l = this.kf[u - this.$t.wt.from],
              a = Math.round(o.gt * i);
            t.fillStyle = o.j;
            var f = void 0,
              c = void 0;
            (a <= r
              ? ((f = a), (c = e))
              : ((f = r), (c = a - Math.floor(h / 2) + h)),
              t.fillRect(l.au, f, l.fu - l.au + 1, c - f));
          }
        }
      }),
      (t.prototype.xf = function (t) {
        if (
          null !== this.$t &&
          0 !== this.$t.Mt.length &&
          null !== this.$t.wt
        ) {
          var i =
              Math.ceil(this.$t.Ga * t) <= 1 ? 0 : Math.max(1, Math.floor(t)),
            n = Math.round(this.$t.Ga * t) - i;
          this.kf = new Array(this.$t.wt.to - this.$t.wt.from);
          for (var s = this.$t.wt.from; s < this.$t.wt.to; s++) {
            var h,
              r = this.$t.Mt[s],
              e = Math.round(r.bt * t),
              u = void 0,
              o = void 0;
            if (n % 2) ((u = e - (h = (n - 1) / 2)), (o = e + h));
            else ((u = e - (h = n / 2)), (o = e + h - 1));
            this.kf[s - this.$t.wt.from] = {
              au: u,
              fu: o,
              Sf: e,
              Cf: r.bt * t,
              Nt: r.Nt,
            };
          }
          for (s = this.$t.wt.from + 1; s < this.$t.wt.to; s++) {
            var l = this.kf[s - this.$t.wt.from],
              a = this.kf[s - this.$t.wt.from - 1];
            l.Nt === a.Nt + 1 &&
              l.au - a.fu !== i + 1 &&
              (a.Sf > a.Cf ? (a.fu = l.au - i - 1) : (l.au = a.fu + i + 1));
          }
          var f = Math.ceil(this.$t.Ga * t);
          for (s = this.$t.wt.from; s < this.$t.wt.to; s++) {
            (l = this.kf[s - this.$t.wt.from]).fu < l.au && (l.fu = l.au);
            var c = l.fu - l.au + 1;
            f = Math.min(c, f);
          }
          if (i > 0 && f < 4)
            for (s = this.$t.wt.from; s < this.$t.wt.to; s++) {
              (c = (l = this.kf[s - this.$t.wt.from]).fu - l.au + 1) > f &&
                (l.Sf > l.Cf ? (l.fu -= 1) : (l.au += 1));
            }
        } else this.kf = [];
      }),
      t
    );
  })();
function Vs(t) {
  return { Mt: [], Ga: t, Nf: NaN, wt: null };
}
function Is(t, i, n) {
  return { Nt: t, St: i, bt: NaN, gt: NaN, j: n };
}
var js = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n, !1) || this;
      return ((s.Ct = new et()), (s.Tf = Vs(0)), (s.ni = new Ws()), s);
    }
    return (
      q(i, t),
      (i.prototype.Bt = function (_t, _i) {
        return this.za.Wt() ? (this.Wa(), this.Ct) : null;
      }),
      (i.prototype.Va = function () {
        var t = this.Qn.zt().Ga();
        this.Tf = Vs(t);
        for (
          var i = 0, n = 0, s = this.za.K().color, h = 0, r = this.za.Pn().Ka();
          h < r.length;
          h++
        ) {
          var e = r[h],
            u = e.value[3],
            o = void 0 !== e.color ? e.color : s,
            l = Is(e.index, u, o);
          (++i < this.Tf.Mt.length ? (this.Tf.Mt[i] = l) : this.Tf.Mt.push(l),
            (this.Ea[n++] = { Nt: e.index, bt: 0 }));
        }
        (this.ni._t(this.Tf), this.Ct.ut([this.ni]));
      }),
      (i.prototype.ja = function () {}),
      (i.prototype.Ha = function () {
        (t.prototype.Ha.call(this), (this.Tf.wt = null));
      }),
      (i.prototype.qa = function (t, i, n) {
        if (null !== this.Oa) {
          var s = i.Ga(),
            h = F(i.es()),
            r = t.jt(this.za.K().base, n);
          (i.Ua(this.Tf.Mt),
            t.Ee(this.Tf.Mt, n),
            (this.Tf.Nf = r),
            (this.Tf.wt = Cs(this.Tf.Mt, h, !1)),
            (this.Tf.Ga = s),
            this.ni._t(this.Tf));
        }
      }),
      i
    );
  })(Ts),
  Hs = (function (t) {
    function i(i, n) {
      var s = t.call(this, i, n) || this;
      return ((s.Qa = new ys()), s);
    }
    return (
      q(i, t),
      (i.prototype.Bt = function (_t, _i) {
        if (!this.za.Wt()) return null;
        var n = this.za.K();
        this.Wa();
        var s = {
          Mt: this.Ea,
          xt: n.color,
          ti: n.lineStyle,
          Sa: n.lineType,
          Gt: n.lineWidth,
          wt: this.Oa,
          xa: this.Qn.zt().Ga(),
        };
        return (this.Qa._t(s), this.Qa);
      }),
      (i.prototype.ja = function () {
        var t = this;
        this.Ea.forEach(function (i) {
          i.j = t.za.$a().uf(i.Nt).ef;
        });
      }),
      (i.prototype.Xa = function (t, i, n) {
        var s = this.Ya(t, i);
        return ((s.j = n.uf(t).ef), s);
      }),
      i
    );
  })(Ls),
  Js = /[2-9]/g,
  qs = (function () {
    function t(t) {
      (void 0 === t && (t = 50),
        (this.Lf = new Map()),
        (this.Af = 0),
        (this.Pf = Array.from(new Array(t))));
    }
    return (
      (t.prototype.Ff = function () {
        (this.Lf.clear(), this.Pf.fill(void 0));
      }),
      (t.prototype.Mi = function (t, i, n) {
        var s = n || Js,
          h = String(i).replace(s, "0"),
          r = this.Lf.get(h);
        if (void 0 === r) {
          if (0 === (r = t.measureText(h).width) && 0 !== i.length) return 0;
          var e = this.Pf[this.Af];
          (void 0 !== e && this.Lf.delete(e),
            (this.Pf[this.Af] = h),
            (this.Af = (this.Af + 1) % this.Pf.length),
            this.Lf.set(h, r));
        }
        return r;
      }),
      t
    );
  })(),
  Us = (function () {
    function t(t) {
      ((this.Df = null),
        (this.B = null),
        (this.Bf = "right"),
        (this.xu = 0),
        (this.Ef = t));
    }
    return (
      (t.prototype.Of = function (t, i, n, s) {
        ((this.Df = t), (this.B = i), (this.xu = n), (this.Bf = s));
      }),
      (t.prototype.ot = function (t, i) {
        null !== this.B &&
          null !== this.Df &&
          this.Df.ot(t, this.B, this.Ef, this.xu, this.Bf, i);
      }),
      t
    );
  })(),
  Ys = (function () {
    function t(t, i, n) {
      ((this.zf = t),
        (this.Ef = new qs(50)),
        (this.Rf = i),
        (this.$ = n),
        (this.X = -1),
        (this.ni = new Us(this.Ef)));
    }
    return (
      (t.prototype.Bt = function (t, i) {
        var n = this.$.ul(this.Rf);
        if (null === n) return null;
        var s = n.Vu(this.Rf) ? n.so() : this.Rf.Ht();
        if (null === s) return null;
        var h = n.$u(s);
        if ("overlay" === h) return null;
        var r = this.$.Wf();
        return (
          r.W !== this.X && ((this.X = r.W), this.Ef.Ff()),
          this.ni.Of(this.zf.Ai(), r, i, h),
          this.ni
        );
      }),
      t
    );
  })(),
  $s = (function () {
    function t() {
      this.$t = null;
    }
    return (
      (t.prototype._t = function (t) {
        this.$t = t;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        if (null !== this.$t && !1 !== this.$t.Wt) {
          var h = Math.round(this.$t.gt * i);
          if (!(h < 0 || h > Math.ceil(this.$t.li * i))) {
            var r = 0;
            !0 === this.$t.Vf && (r = this.$t.If);
            var e = Math.ceil(this.$t.oi * i);
            ((t.lineCap = "butt"),
              (t.strokeStyle = this.$t.j),
              (t.lineWidth = Math.floor(this.$t.Gt * i)),
              y(t, this.$t.ti),
              x(t, h, r, e));
          }
        }
      }),
      t
    );
  })(),
  Ks = (function () {
    function t(t) {
      ((this.jf = {
        oi: 0,
        li: 0,
        gt: 0,
        j: "rgba(0, 0, 0, 0)",
        Gt: 1,
        ti: 0,
        Wt: !1,
        Vf: !1,
        If: 0,
      }),
        (this.cl = new $s()),
        (this.At = !0),
        (this.za = t),
        (this.Qn = t.ri()),
        this.cl._t(this.jf));
    }
    return (
      (t.prototype.Ft = function () {
        this.At = !0;
      }),
      (t.prototype.Bt = function (t, i) {
        return this.za.Wt()
          ? (this.At && (this.cs(t, i), (this.At = !1)), this.cl)
          : null;
      }),
      t
    );
  })(),
  Xs = (function (t) {
    function i(i) {
      return t.call(this, i) || this;
    }
    return (
      q(i, t),
      (i.prototype.cs = function (t, i) {
        this.jf.Wt = !1;
        var n = this.za.Ht(),
          s = n.Me().Me;
        if (2 === s || 3 === s) {
          var h = this.za.K();
          if (h.baseLineVisible && this.za.Wt()) {
            var r = this.za.Vt();
            null !== r &&
              ((this.jf.Wt = !0),
              (this.jf.gt = n.jt(r.Jt, r.Jt)),
              (this.jf.oi = i),
              (this.jf.li = t),
              (this.jf.j = h.baseLineColor),
              (this.jf.Gt = h.baseLineWidth),
              (this.jf.ti = h.baseLineStyle));
          }
        }
      }),
      i
    );
  })(Ks),
  Zs = (function () {
    function t() {
      this.$t = null;
    }
    return (
      (t.prototype._t = function (t) {
        this.$t = t;
      }),
      (t.prototype.Mh = function () {
        return this.$t;
      }),
      (t.prototype.ot = function (t, i, _n, _s) {
        var h = this.$t;
        if (null !== h) {
          t.save();
          var r = Math.max(1, Math.floor(i)),
            e = (r % 2) / 2,
            u = Math.round(h.Cf.x * i) + e,
            o = h.Cf.y * i;
          ((t.fillStyle = h.Hf), t.beginPath());
          var l = Math.max(2, 1.5 * h.Jf) * i;
          (t.arc(u, o, l, 0, 2 * Math.PI, !1),
            t.fill(),
            (t.fillStyle = h.qf),
            t.beginPath(),
            t.arc(u, o, h.kt * i, 0, 2 * Math.PI, !1),
            t.fill(),
            (t.lineWidth = r),
            (t.strokeStyle = h.Uf),
            t.beginPath(),
            t.arc(u, o, h.kt * i + r / 2, 0, 2 * Math.PI, !1),
            t.stroke(),
            t.restore());
        }
      }),
      t
    );
  })(),
  Qs = [
    { Yf: 0, $f: 0.25, Kf: 4, Xf: 10, Zf: 0.25, Qf: 0, Gf: 0.4, tc: 0.8 },
    { Yf: 0.25, $f: 0.525, Kf: 10, Xf: 14, Zf: 0, Qf: 0, Gf: 0.8, tc: 0 },
    { Yf: 0.525, $f: 1, Kf: 14, Xf: 14, Zf: 0, Qf: 0, Gf: 0, tc: 0 },
  ];
function Gs(t, i, n, s) {
  return j(t, n + (s - n) * i);
}
function th(t, i) {
  for (var n, s = (t % 2600) / 2600, h = 0, r = Qs; h < r.length; h++) {
    var e = r[h];
    if (s >= e.Yf && s <= e.$f) {
      n = e;
      break;
    }
  }
  A(void 0 !== n, "Last price animation internal logic error");
  var u,
    o,
    l,
    a = (s - n.Yf) / (n.$f - n.Yf);
  return {
    qf: Gs(i, a, n.Zf, n.Qf),
    Uf: Gs(i, a, n.Gf, n.tc),
    kt: ((u = a), (o = n.Kf), (l = n.Xf), o + (l - o) * u),
  };
}
var ih = (function () {
  function t(t) {
    ((this.ni = new Zs()),
      (this.At = !0),
      (this.nc = !0),
      (this.sc = performance.now()),
      (this.hc = this.sc - 1),
      (this.rc = t));
  }
  return (
    (t.prototype.ec = function () {
      ((this.hc = this.sc - 1), this.Ft());
    }),
    (t.prototype.uc = function () {
      if ((this.Ft(), 2 === this.rc.K().lastPriceAnimation)) {
        var t = performance.now(),
          i = this.hc - t;
        if (i > 0) return void (i < 650 && (this.hc += 2600));
        ((this.sc = t), (this.hc = t + 2600));
      }
    }),
    (t.prototype.Ft = function () {
      this.At = !0;
    }),
    (t.prototype.oc = function () {
      this.nc = !0;
    }),
    (t.prototype.Wt = function () {
      return 0 !== this.rc.K().lastPriceAnimation;
    }),
    (t.prototype.lc = function () {
      switch (this.rc.K().lastPriceAnimation) {
        case 0:
          return !1;
        case 1:
          return !0;
        case 2:
          return performance.now() <= this.hc;
      }
    }),
    (t.prototype.Bt = function (t, i) {
      return (
        this.At
          ? (this.Et(t, i), (this.At = !1), (this.nc = !1))
          : this.nc && (this.ac(), (this.nc = !1)),
        this.ni
      );
    }),
    (t.prototype.Et = function (_t, _i) {
      this.ni._t(null);
      var n = this.rc.ri().zt(),
        s = n.es(),
        r = this.rc.Vt();
      if (null !== s && null !== r) {
        var e = this.rc.fc(!0);
        if (!e.cc && s.vc(e.dc)) {
          var u = new h(n.Yt(e.dc), this.rc.Ht().jt(e.St, r.Jt)),
            o = e.j,
            l = this.rc.K().lineWidth,
            a = th(this._c(), o);
          this.ni._t({ Hf: o, Jf: l, qf: a.qf, Uf: a.Uf, kt: a.kt, Cf: u });
        }
      }
    }),
    (t.prototype.ac = function () {
      var t = this.ni.Mh();
      if (null !== t) {
        var i = th(this._c(), t.Hf);
        ((t.qf = i.qf), (t.Uf = i.Uf), (t.kt = i.kt));
      }
    }),
    (t.prototype._c = function () {
      return this.lc() ? performance.now() - this.sc : 2599;
    }),
    t
  );
})();
function nh(t, i) {
  return Bi(Math.min(Math.max(t, 12), 30) * i);
}
function sh(t, i) {
  switch (t) {
    case "arrowDown":
    case "arrowUp":
    case "triangle":
      return nh(i, 1);
    case "circle":
      return nh(i, 0.8);
    case "square":
      return nh(i, 0.7);
  }
}
function hh(t) {
  return Di(nh(t, 1));
}
function rh(t) {
  return Math.max(nh(t, 0.1), 3);
}
function eh(t, i, n, s, h) {
  var r = (sh("arrowUp", h) - 1) / 2,
    e = (Bi(h / 2) - 1) / 2;
  (i.beginPath(),
    t
      ? (i.moveTo(n - r, s),
        i.lineTo(n, s - r),
        i.lineTo(n + r, s),
        i.lineTo(n + e, s),
        i.lineTo(n + e, s + r),
        i.lineTo(n - e, s + r),
        i.lineTo(n - e, s))
      : (i.moveTo(n - r, s),
        i.lineTo(n, s + r),
        i.lineTo(n + r, s),
        i.lineTo(n + e, s),
        i.lineTo(n + e, s - r),
        i.lineTo(n - e, s - r),
        i.lineTo(n - e, s)),
    i.fill());
}
var uh = (function (t) {
  function i() {
    var i = (null !== t && t.apply(this, arguments)) || this;
    return (
      (i.$t = null),
      (i.Ef = new qs()),
      (i.X = -1),
      (i.Z = ""),
      (i.wc = ""),
      i
    );
  }
  return (
    q(i, t),
    (i.prototype._t = function (t) {
      this.$t = t;
    }),
    (i.prototype.Of = function (t, i) {
      (this.X === t && this.Z === i) ||
        ((this.X = t), (this.Z = i), (this.wc = ht(t, i)), this.Ef.Ff());
    }),
    (i.prototype.lt = function (_t, _i) {
      return null;
    }),
    (i.prototype.ft = function (t, _i, _n) {
      if (null !== this.$t && null !== this.$t.wt) {
        ((t.textBaseline = "middle"), (t.font = this.wc));
        for (var s = this.$t.wt.from; s < this.$t.wt.to; s++) {
          var h = this.$t.Mt[s];
          (void 0 !== h.wi &&
            ((h.wi.oi = this.Ef.Mi(t, h.wi.Mc)), (h.wi.li = this.X)),
            oh(h, t));
        }
      }
    }),
    i
  );
})(ut);
function oh(t, i) {
  var n,
    s,
    h =
      t.bc ||
      ("bottom" === t.mc
        ? 180
        : "right" === t.mc
          ? 90
          : "left" === t.mc
            ? -90
            : 0);
  ((i.strokeStyle =
    (null === (n = t.gc) || void 0 === n ? void 0 : n.color) || "transparent"),
    (i.lineWidth =
      (null === (s = t.gc) || void 0 === s ? void 0 : s.width) || 1),
    (i.fillStyle = t.j),
    void 0 !== t.wi &&
      (function (t, i, n, s) {
        t.fillText(i, n, s);
      })(i, t.wi.Mc, t.bt - t.wi.oi / 2, t.wi.gt),
    h &&
      (i.save(),
      i.translate(t.bt, t.gt),
      i.rotate(h * (Math.PI / 180)),
      i.translate(-t.bt, -t.gt)),
    (function (t, i) {
      if (0 === t.Ja) return;
      switch (t.yc) {
        case "triangle":
          return void (function (t, i, n, s) {
            var h = s / 2;
            (t.beginPath(),
              t.moveTo(i, n - h),
              t.lineTo(i + h, n + h),
              t.lineTo(i - h, n + h),
              t.closePath(),
              t.fill(),
              t.stroke());
          })(i, t.bt, t.gt, t.Ja);
        case "arrowDown":
          return void eh(!1, i, t.bt, t.gt, t.Ja);
        case "arrowUp":
          return void eh(!0, i, t.bt, t.gt, t.Ja);
        case "circle":
          return void (function (t, i, n, s) {
            var h = (sh("circle", s) - 1) / 2;
            (t.beginPath(), t.arc(i, n, h, 0, 2 * Math.PI, !1), t.fill());
          })(i, t.bt, t.gt, t.Ja);
        case "square":
          return void (function (t, i, n, s) {
            var h = sh("square", s),
              r = (h - 1) / 2,
              e = i - r,
              u = n - r;
            t.fillRect(e, u, h, h);
          })(i, t.bt, t.gt, t.Ja);
      }
      t.yc;
    })(t, i),
    h && i.restore());
}
function lh(t, i, n, s, h, r, e, u, o) {
  var l = X(n) ? n : n.close,
    a = X(n) ? n : n.high,
    f = X(n) ? n : n.low,
    c = X(i.size) ? Math.max(i.size, 0) : 1,
    v = hh(u.Ga()) * c,
    d = v / 2;
  switch (((t.Ja = v), i.position)) {
    case "price":
      var _ = i.price || l,
        w = i.anchor || "center",
        M = "top" === w ? 1 : "bottom" === w ? -1 : 0,
        b = "left" === w ? 1 : "right" === w ? -1 : 0;
      return (
        (t.gt = e.jt(_, o) + d * M),
        (t.bt = t.bt + d * b),
        void (void 0 !== t.wi && (t.wi.gt = t.gt + (d + r + 0.6 * h) * M || 1))
      );
    case "inBar":
      return (
        (t.gt = e.jt(l, o)),
        void (void 0 !== t.wi && (t.wi.gt = t.gt + d + r + 0.6 * h))
      );
    case "aboveBar":
      return (
        (t.gt = e.jt(a, o) - d - s.kc),
        void 0 !== t.wi && ((t.wi.gt = t.gt - d - 0.6 * h), (s.kc += 1.2 * h)),
        void (s.kc += v + r)
      );
    case "belowBar":
      return (
        (t.gt = e.jt(f, o) + d + s.xc),
        void 0 !== t.wi &&
          ((t.wi.gt = t.gt + d + r + 0.6 * h), (s.xc += 1.2 * h)),
        void (s.xc += v + r)
      );
  }
  i.position;
}
var ah = (function () {
    function t(t, i) {
      ((this.At = !0),
        (this.Nc = !0),
        (this.Sc = !0),
        (this.Cc = null),
        (this.ni = new uh()),
        (this.rc = t),
        (this.zi = i),
        (this.$t = { Mt: [], wt: null }));
    }
    return (
      (t.prototype.Ft = function (t) {
        ((this.At = !0), (this.Sc = !0), "data" === t && (this.Nc = !0));
      }),
      (t.prototype.Bt = function (_t, _i, _n) {
        if (!this.rc.Wt()) return null;
        this.At && this.Wa();
        var s = this.zi.K().layout;
        return (
          this.ni.Of(s.fontSize, s.fontFamily),
          this.ni._t(this.$t),
          this.ni
        );
      }),
      (t.prototype.Tc = function () {
        if (this.Sc) {
          if (this.rc.Lc().length > 0) {
            var t = this.zi.zt().Ga(),
              i = rh(t),
              n = 1.5 * hh(t) + 2 * i;
            this.Cc = { above: n, below: n };
          } else this.Cc = null;
          this.Sc = !1;
        }
        return this.Cc;
      }),
      (t.prototype.Wa = function () {
        var t = this.rc.Ht(),
          i = this.zi.zt(),
          n = this.rc.Lc();
        this.Nc &&
          ((this.$t.Mt = n.map(function (t) {
            return {
              Nt: t.time,
              bt: 0,
              gt: 0,
              Ja: 0,
              yc: t.shape,
              j: t.color,
              Ac: t.Ac,
              Pc: t.id,
              wi: void 0,
            };
          })),
          (this.Nc = !1));
        var s = this.zi.K().layout;
        this.$t.wt = null;
        var h = i.es();
        if (null !== h) {
          var r = this.rc.Vt();
          if (null !== r && 0 !== this.$t.Mt.length) {
            var e = NaN,
              u = rh(i.Ga()),
              o = { kc: u, xc: u };
            this.$t.wt = Cs(this.$t.Mt, h, !0);
            for (var l = this.$t.wt.from; l < this.$t.wt.to; l++) {
              var a = n[l];
              a.time !== e && ((o.kc = u), (o.xc = u), (e = a.time));
              var f = this.$t.Mt[l];
              ((f.bt = i.Yt(a.time)),
                void 0 !== a.text &&
                  a.text.length > 0 &&
                  (f.wi = { Mc: a.text, gt: 0, oi: 0, li: 0 }));
              var c = this.rc.Fc(a.time);
              null !== c && lh(f, a, c, o, s.fontSize, u, t, i, r.Jt);
            }
            this.At = !1;
          }
        }
      }),
      t
    );
  })(),
  fh = (function (t) {
    function i(i) {
      return t.call(this, i) || this;
    }
    return (
      q(i, t),
      (i.prototype.cs = function (t, i) {
        var n = this.jf;
        n.Wt = !1;
        var s = this.za.K();
        if (s.priceLineVisible && this.za.Wt()) {
          var h = this.za.fc(0 === s.priceLineSource);
          h.cc ||
            ((n.Wt = !0),
            (n.gt = h.bi),
            (n.j = this.za.fh(h.j)),
            (n.oi = i),
            (n.li = t),
            (n.Gt = s.priceLineWidth),
            (n.ti = s.priceLineStyle));
        }
      }),
      i
    );
  })(Ks),
  ch = (function (t) {
    function i(i) {
      var n = t.call(this) || this;
      return ((n.si = i), n);
    }
    return (
      q(i, t),
      (i.prototype.Pi = function (t, i, n) {
        ((t.Wt = !1), (i.Wt = !1));
        var s = this.si;
        if (s.Wt()) {
          var h = s.K(),
            r = h.lastValueVisible,
            e = "" !== s.Dc(),
            u = 0 === h.seriesLastValueMode,
            o = s.fc(!1);
          if (!o.cc) {
            (r && ((t.wi = this.Bc(o, r, u)), (t.Wt = 0 !== t.wi.length)),
              (e || u) &&
                ((i.wi = this.Ec(o, r, e, u)), (i.Wt = i.wi.length > 0)));
            var l = s.fh(o.j),
              a = H(l);
            ((n.m = a.m),
              (n.j = a.p),
              (n.bi = o.bi),
              (i.qt = s.ri().Ut(o.bi / s.Ht().li())),
              (t.qt = l));
          }
        }
      }),
      (i.prototype.Ec = function (t, i, n, s) {
        var h = "",
          r = this.si.Dc();
        return (
          n && 0 !== r.length && (h += "".concat(r, " ")),
          i && s && (h += this.si.Ht().pe() ? t.Oc : t.zc),
          h.trim()
        );
      }),
      (i.prototype.Bc = function (t, i, n) {
        return i ? (n ? (this.si.Ht().pe() ? t.zc : t.Oc) : t.wi) : "";
      }),
      i
    );
  })(mt),
  vh = (function () {
    function t(t, i) {
      ((this.Kr = t), (this.Rc = i || null));
    }
    return (
      (t.prototype.Ae = function () {
        return this.Kr;
      }),
      (t.prototype.cu = function () {
        return this.Rc;
      }),
      (t.prototype.Ar = function () {
        return null === this.Kr
          ? null
          : { priceRange: this.Kr.Ar(), margins: this.Rc || void 0 };
      }),
      (t.Pr = function (i) {
        return null === i ? null : new t(Li.Pr(i.priceRange), i.margins);
      }),
      t
    );
  })(),
  dh = (function (t) {
    function i(i, n) {
      var s = t.call(this, i) || this;
      return ((s.Wc = n), s);
    }
    return (
      q(i, t),
      (i.prototype.Vc = function () {
        var t = this.Wc.K();
        return this.Ic(t.rayStart);
      }),
      (i.prototype.cs = function (t, i) {
        var n = this.jf;
        n.Wt = !1;
        var s = this.Wc.K();
        if (this.za.Wt() && s.lineVisible) {
          var h = this.Wc.jc();
          if (null !== h) {
            var r = this.Vc();
            null !== r &&
              ((n.Wt = !0),
              (n.gt = h),
              (n.j = s.color),
              (n.oi = i),
              (n.li = t),
              (n.Gt = s.lineWidth),
              (n.ti = s.lineStyle),
              (n.Vf = s.ray),
              (n.If = r));
          }
        }
      }),
      (i.prototype.Ic = function (t) {
        var i = this.za.ri().zt(),
          n = i.Hc({ timestamp: t }, !0);
        return i.et() || null === n ? null : i.Yt(n);
      }),
      i
    );
  })(Ks),
  _h = (function (t) {
    function i(i, n) {
      var s = t.call(this) || this;
      return ((s.rc = i), (s.Wc = n), s);
    }
    return (
      q(i, t),
      (i.prototype.Pi = function (t, i, n) {
        ((t.Wt = !1), (i.Wt = !1));
        var s = this.Wc.K(),
          h = s.axisLabelVisible,
          r = "" !== s.title,
          e = this.rc;
        if (h && e.Wt()) {
          var u = this.Wc.jc();
          if (null !== u) {
            (r && ((i.wi = s.title), (i.Wt = !0)),
              (i.qt = e.ri().Ut(u / e.Ht().li())),
              (t.wi = e.Ht().hu(s.price)),
              (t.Wt = !0));
            var o = H(s.color);
            ((n.m = o.m), (n.j = o.p), (n.bi = u));
          }
        }
      }),
      i
    );
  })(mt),
  wh = (function () {
    function t(t, i) {
      ((this.rc = t),
        (this.un = i),
        (this.Jc = new dh(t, this)),
        (this.zf = new _h(t, this)),
        (this.qc = new Ys(this.zf, t, t.ri())));
    }
    return (
      (t.prototype.$s = function (t) {
        (K(this.un, t), this.Ft(), this.rc.ri().oo());
      }),
      (t.prototype.K = function () {
        return this.un;
      }),
      (t.prototype.xn = function () {
        return [this.Jc, this.qc];
      }),
      (t.prototype.Uc = function () {
        return this.zf;
      }),
      (t.prototype.Ft = function () {
        (this.Jc.Ft(), this.zf.Ft());
      }),
      (t.prototype.jc = function () {
        var t = this.rc,
          i = t.Ht();
        if (t.ri().zt().et() || i.et()) return null;
        var n = t.Vt();
        return null === n ? null : i.jt(this.un.price, n.Jt);
      }),
      t
    );
  })(),
  Mh = { ef: "", yf: "", gf: "" },
  bh = (function () {
    function t(t) {
      this.rc = t;
    }
    return (
      (t.prototype.uf = function (t, i) {
        var n = this.rc.Yc(),
          s = this.rc.K();
        switch (n) {
          case "Line":
            return this.$c(s, t, i);
          case "Area":
            return this.Kc(s);
          case "Baseline":
            return this.Xc(s, t, i);
          case "Bar":
            return this.Zc(s, t, i);
          case "Candlestick":
            return this.Qc(s, t, i);
          case "Histogram":
            return this.Gc(s, t, i);
        }
        throw new Error("Unknown chart style");
      }),
      (t.prototype.Zc = function (t, i, n) {
        var s = U({}, Mh),
          h = t.upColor,
          r = t.downColor,
          e = h,
          u = r,
          o = F(this.tv(i, n)),
          l = D(o.value[0]) <= D(o.value[3]);
        return (
          void 0 !== o.color
            ? ((s.ef = o.color), (s.yf = o.color))
            : ((s.ef = l ? h : r), (s.yf = l ? e : u)),
          s
        );
      }),
      (t.prototype.Qc = function (t, i, n) {
        var s,
          h,
          r,
          e = U({}, Mh),
          u = t.upColor,
          o = t.downColor,
          l = t.borderUpColor,
          a = t.borderDownColor,
          f = t.wickUpColor,
          c = t.wickDownColor,
          v = F(this.tv(i, n)),
          d = D(v.value[0]) <= D(v.value[3]);
        return (
          (e.ef = null !== (s = v.color) && void 0 !== s ? s : d ? u : o),
          (e.yf = null !== (h = v.borderColor) && void 0 !== h ? h : d ? l : a),
          (e.gf = null !== (r = v.wickColor) && void 0 !== r ? r : d ? f : c),
          e
        );
      }),
      (t.prototype.Kc = function (t) {
        return U(U({}, Mh), { ef: t.lineColor });
      }),
      (t.prototype.Xc = function (t, i, n) {
        var s = F(this.tv(i, n)).value[3] >= t.baseValue.price;
        return U(U({}, Mh), { ef: s ? t.topLineColor : t.bottomLineColor });
      }),
      (t.prototype.$c = function (t, i, n) {
        var s,
          h = F(this.tv(i, n));
        return U(U({}, Mh), {
          ef: null !== (s = h.color) && void 0 !== s ? s : t.color,
        });
      }),
      (t.prototype.Gc = function (t, i, n) {
        var s = U({}, Mh),
          h = F(this.tv(i, n));
        return ((s.ef = void 0 !== h.color ? h.color : t.color), s);
      }),
      (t.prototype.tv = function (t, i) {
        return void 0 !== i ? i.Jt : this.rc.Pn().iv(t);
      }),
      t
    );
  })(),
  mh = 30,
  ph = (function () {
    function t() {
      ((this.nv = []), (this.sv = new Map()), (this.hv = new Map()));
    }
    return (
      (t.prototype.rv = function () {
        return this.Ja() > 0 ? this.nv[this.nv.length - 1] : null;
      }),
      (t.prototype.ev = function () {
        return this.Ja() > 0 ? this.uv(0) : null;
      }),
      (t.prototype.An = function () {
        return this.Ja() > 0 ? this.uv(this.nv.length - 1) : null;
      }),
      (t.prototype.Ja = function () {
        return this.nv.length;
      }),
      (t.prototype.et = function () {
        return 0 === this.Ja();
      }),
      (t.prototype.vc = function (t) {
        return null !== this.ov(t, 0);
      }),
      (t.prototype.iv = function (t) {
        return this.lv(t);
      }),
      (t.prototype.lv = function (t, i) {
        void 0 === i && (i = 0);
        var n = this.ov(t, i);
        return null === n ? null : U(U({}, this.av(n)), { index: this.uv(n) });
      }),
      (t.prototype.Ka = function () {
        return this.nv;
      }),
      (t.prototype.fv = function (t, i, n) {
        if (this.et()) return null;
        for (var s = null, h = 0, r = n; h < r.length; h++) {
          var e = r[h];
          s = gh(s, this.cv(t, i, e));
        }
        return s;
      }),
      (t.prototype._t = function (t) {
        (this.hv.clear(), this.sv.clear(), (this.nv = t));
      }),
      (t.prototype.uv = function (t) {
        return this.nv[t].index;
      }),
      (t.prototype.av = function (t) {
        return this.nv[t];
      }),
      (t.prototype.ov = function (t, i) {
        var n = this.vv(t);
        if (null === n && 0 !== i)
          switch (i) {
            case -1:
              return this.dv(t);
            case 1:
              return this._v(t);
            default:
              throw new TypeError("Unknown search mode");
          }
        return n;
      }),
      (t.prototype.dv = function (t) {
        var i = this.wv(t);
        return (
          i > 0 && (i -= 1),
          i !== this.nv.length && this.uv(i) < t ? i : null
        );
      }),
      (t.prototype._v = function (t) {
        var i = this.Mv(t);
        return i !== this.nv.length && t < this.uv(i) ? i : null;
      }),
      (t.prototype.vv = function (t) {
        var i = this.wv(t);
        return i === this.nv.length || t < this.nv[i].index ? null : i;
      }),
      (t.prototype.wv = function (t) {
        return ks(this.nv, t, function (t, i) {
          return t.index < i;
        });
      }),
      (t.prototype.Mv = function (t) {
        return xs(this.nv, t, function (t, i) {
          return i.index > t;
        });
      }),
      (t.prototype.bv = function (t, i, n) {
        for (var s = null, h = t; h < i; h++) {
          var r = this.nv[h].value[n];
          Number.isNaN(r) ||
            (null === s
              ? (s = { t: r, i: r })
              : (r < s.t && (s.t = r), r > s.i && (s.i = r)));
        }
        return s;
      }),
      (t.prototype.cv = function (t, i, n) {
        if (this.et()) return null;
        var s = null,
          h = F(this.ev()),
          r = F(this.An()),
          e = Math.max(t, h),
          u = Math.min(i, r),
          o = Math.ceil(e / mh) * mh,
          l = Math.max(o, Math.floor(u / mh) * mh),
          a = this.wv(e),
          f = this.Mv(Math.min(u, o, i));
        s = gh(s, this.bv(a, f, n));
        var c = this.sv.get(n);
        void 0 === c && ((c = new Map()), this.sv.set(n, c));
        for (var v = Math.max(o + 1, e); v < l; v += mh) {
          var d = Math.floor(v / mh),
            _ = c.get(d);
          if (void 0 === _) {
            var w = this.wv(d * mh),
              M = this.Mv((d + 1) * mh - 1);
            ((_ = this.bv(w, M, n)), c.set(d, _));
          }
          s = gh(s, _);
        }
        ((a = this.wv(l)), (f = this.Mv(u)));
        return (s = gh(s, this.bv(a, f, n)));
      }),
      t
    );
  })();
function gh(t, i) {
  return null === t
    ? i
    : null === i
      ? t
      : { t: Math.min(t.t, i.t), i: Math.max(t.i, i.i) };
}
var yh = (function (t) {
    function i(i, n, s) {
      var h = t.call(this, i) || this;
      ((h.$t = new ph()),
        (h.Jc = new fh(h)),
        (h.mv = []),
        (h.pv = new Xs(h)),
        (h.gv = null),
        (h.yv = null),
        (h.kv = []),
        (h.xv = []),
        (h.Nv = null),
        (h.un = n),
        (h.Sv = s));
      var r = new ch(h);
      return (
        (h.tn = [r]),
        (h.qc = new Ys(r, h, i)),
        ("Area" !== s && "Line" !== s && "Baseline" !== s) ||
          (h.gv = new ih(h)),
        h.Cv(),
        h.Tv(),
        h
      );
    }
    return (
      q(i, t),
      (i.prototype.D = function () {
        null !== this.Nv && clearTimeout(this.Nv);
      }),
      (i.prototype.fh = function (t) {
        return this.un.priceLineColor || t;
      }),
      (i.prototype.fc = function (t) {
        var i = { cc: !0 },
          n = this.Ht();
        if (this.ri().zt().et() || n.et() || this.$t.et()) return i;
        var s,
          h,
          r = this.ri().zt().es(),
          e = this.Vt();
        if (null === r || null === e) return i;
        if (t) {
          var u = this.$t.rv();
          if (null === u) return i;
          ((s = u), (h = u.index));
        } else {
          var o = this.$t.lv(r.fu(), -1);
          if (null === o) return i;
          if (null === (s = this.$t.iv(o.index))) return i;
          h = o.index;
        }
        var l = s.value[3],
          a = this.$a().uf(h, { Jt: s }),
          f = n.jt(l, e.Jt);
        return {
          cc: !1,
          St: l,
          wi: n.Bi(l, e.Jt),
          Oc: n.hu(l),
          zc: n.eu(l, e.Jt),
          j: a.ef,
          bi: f,
          dc: h,
        };
      }),
      (i.prototype.$a = function () {
        return (null !== this.yv || (this.yv = new bh(this)), this.yv);
      }),
      (i.prototype.K = function () {
        return this.un;
      }),
      (i.prototype.$s = function (t) {
        var i = t.priceScaleId;
        (void 0 !== i && i !== this.un.priceScaleId && this.ri().Lv(this, i),
          K(this.un, t),
          null !== this.Ii &&
            void 0 !== t.scaleMargins &&
            this.Ii.$s({ scaleMargins: t.scaleMargins }),
          void 0 !== t.priceFormat && (this.Cv(), this.ri().Av()),
          this.ri().Bs(this),
          this.ri().Pv(),
          this._n.Ft("options"));
      }),
      (i.prototype._t = function (t, i) {
        (this.$t._t(t),
          this.Fv(),
          this._n.Ft("data"),
          this.ln.Ft("data"),
          null !== this.gv &&
            (i && i.Dv ? this.gv.uc() : 0 === t.length && this.gv.ec()));
        var n = this.ri().ul(this);
        (this.ri().Bv(n), this.ri().Bs(this), this.ri().Pv(), this.ri().oo());
      }),
      (i.prototype.Ev = function (t) {
        ((this.kv = t.map(function (t) {
          return U({}, t);
        })),
          this.Fv());
        var i = this.ri().ul(this);
        (this.ln.Ft("data"),
          this.ri().Bv(i),
          this.ri().Bs(this),
          this.ri().Pv(),
          this.ri().oo());
      }),
      (i.prototype.Lc = function () {
        return this.xv;
      }),
      (i.prototype.Ov = function (t) {
        var i = new wh(this, t);
        return (this.mv.push(i), this.ri().Bs(this), i);
      }),
      (i.prototype.zv = function (t) {
        var i = this.mv.indexOf(t);
        (-1 !== i && this.mv.splice(i, 1), this.ri().Bs(this));
      }),
      (i.prototype.Yc = function () {
        return this.Sv;
      }),
      (i.prototype.Vt = function () {
        var t = this.Rv();
        return null === t ? null : { Jt: t.value[3], $e: t.time };
      }),
      (i.prototype.Rv = function () {
        var t = this.ri().zt().es();
        if (null === t) return null;
        var i = t.au();
        return this.$t.lv(i, 1);
      }),
      (i.prototype.Pn = function () {
        return this.$t;
      }),
      (i.prototype.Fc = function (t) {
        var i = this.$t.iv(t);
        return null === i
          ? null
          : "Bar" === this.Sv || "Candlestick" === this.Sv
            ? {
                open: i.value[0],
                high: i.value[1],
                low: i.value[2],
                close: i.value[3],
              }
            : i.value[3];
      }),
      (i.prototype.Wv = function (_t) {
        var i = this,
          n = this.gv;
        return null !== n && n.Wt()
          ? (null === this.Nv &&
              n.lc() &&
              (this.Nv = setTimeout(function () {
                ((i.Nv = null), i.ri().Vv());
              }, 0)),
            n.oc(),
            [n])
          : [];
      }),
      (i.prototype.xn = function () {
        var t = [];
        this.Iv() || t.push(this.pv);
        for (var i = 0, n = this.mv; i < n.length; i++) {
          var s = n[i];
          t.push.apply(t, s.xn());
        }
        return (t.push(this._n, this.Jc, this.qc, this.ln), t);
      }),
      (i.prototype.Nn = function (t, i) {
        if (i !== this.Ii && !this.Iv()) return [];
        for (
          var n = Y([], this.tn, !0), s = 0, h = this.mv;
          s < h.length;
          s++
        ) {
          var r = h[s];
          n.push(r.Uc());
        }
        return n;
      }),
      (i.prototype.uh = function (t, i) {
        var n = this;
        if (void 0 !== this.un.autoscaleInfoProvider) {
          var s = this.un.autoscaleInfoProvider(function () {
            var s = n.jv(t, i);
            return null === s ? null : s.Ar();
          });
          return vh.Pr(s);
        }
        return this.jv(t, i);
      }),
      (i.prototype.eh = function () {
        return this.un.priceFormat.minMove;
      }),
      (i.prototype.oh = function () {
        return this.ah;
      }),
      (i.prototype.Cn = function () {
        var t;
        (this._n.Ft(), this.ln.Ft());
        for (var i = 0, n = this.tn; i < n.length; i++) {
          n[i].Ft();
        }
        for (var s = 0, h = this.mv; s < h.length; s++) {
          h[s].Ft();
        }
        (this.Jc.Ft(),
          this.pv.Ft(),
          (t = this.gv) != null && t.Ft());
      }),
      (i.prototype.Ht = function () {
        return F(t.prototype.Ht.call(this));
      }),
      (i.prototype.Rt = function (t) {
        if (
          !(
            ("Line" === this.Sv ||
              "Area" === this.Sv ||
              "Baseline" === this.Sv) &&
            this.un.crosshairMarkerVisible
          )
        )
          return null;
        var i = this.$t.iv(t);
        return null === i
          ? null
          : { St: i.value[3], kt: this.Hv(), qt: this.Jv(), It: this.qv(t) };
      }),
      (i.prototype.Dc = function () {
        return this.un.title;
      }),
      (i.prototype.Wt = function () {
        return this.un.visible;
      }),
      (i.prototype.Iv = function () {
        return !Tt(this.Ht().Ji());
      }),
      (i.prototype.jv = function (t, i) {
        if (!Z(t) || !Z(i) || this.$t.et()) return null;
        var n =
            "Line" === this.Sv ||
            "Area" === this.Sv ||
            "Baseline" === this.Sv ||
            "Histogram" === this.Sv
              ? [3]
              : [2, 1],
          s = this.$t.fv(t, i, n),
          h = null !== s ? new Li(s.t, s.i) : null;
        if ("Histogram" === this.Yc()) {
          var r = this.un.base,
            e = new Li(r, r);
          h = null !== h ? h.Yn(e) : e;
        }
        return new vh(h, this.ln.Tc());
      }),
      (i.prototype.Hv = function () {
        switch (this.Sv) {
          case "Line":
          case "Area":
          case "Baseline":
            return this.un.crosshairMarkerRadius;
        }
        return 0;
      }),
      (i.prototype.Jv = function () {
        switch (this.Sv) {
          case "Line":
          case "Area":
          case "Baseline":
            var t = this.un.crosshairMarkerBorderColor;
            if (0 !== t.length) return t;
        }
        return null;
      }),
      (i.prototype.qv = function (t) {
        switch (this.Sv) {
          case "Line":
          case "Area":
          case "Baseline":
            var i = this.un.crosshairMarkerBackgroundColor;
            if (0 !== i.length) return i;
        }
        return this.$a().uf(t).ef;
      }),
      (i.prototype.Cv = function () {
        switch (this.un.priceFormat.type) {
          case "custom":
            this.ah = { format: this.un.priceFormat.formatter };
            break;
          case "volume":
            this.ah = new Ms(this.un.priceFormat.precision);
            break;
          case "percent":
            this.ah = new Ti(this.un.priceFormat.precision);
            break;
          default:
            var t = Math.pow(10, this.un.priceFormat.precision);
            this.ah = new Ci(t, this.un.priceFormat.minMove * t);
        }
        null !== this.Ii && this.Ii._e();
      }),
      (i.prototype.Fv = function () {
        var t = this,
          i = this.ri().zt();
        if (i.et() || 0 === this.$t.Ja()) this.xv = [];
        else {
          var n = F(this.$t.ev());
          this.xv = this.kv.map(function (s, h) {
            var r = F(i.Hc(s.time, !0)),
              e = r < n ? 1 : -1;
            return {
              time: F(t.$t.lv(r, e)).index,
              position: s.position,
              shape: s.shape,
              color: s.color,
              id: s.id,
              Ac: h,
              text: s.text,
              size: s.size,
            };
          });
        }
      }),
      (i.prototype.Tv = function () {
        switch (((this.ln = new ah(this, this.ri())), this.Sv)) {
          case "Bar":
            this._n = new Ds(this, this.ri());
            break;
          case "Candlestick":
            this._n = new Rs(this, this.ri());
            break;
          case "Line":
            this._n = new Hs(this, this.ri());
            break;
          case "Area":
            this._n = new As(this, this.ri());
            break;
          case "Baseline":
            this._n = new Os(this, this.ri());
            break;
          case "Histogram":
            this._n = new js(this, this.ri());
            break;
          default:
            throw Error("Unknown chart style assigned: " + this.Sv);
        }
      }),
      i
    );
  })(Zt),
  kh = (function () {
    function t(t) {
      ((this.Uv = !0), (this.un = t));
    }
    return (
      (t.prototype.sl = function () {
        this.Uv = !0;
      }),
      (t.prototype.Yo = function () {
        this.Uv = !1;
      }),
      (t.prototype.Yv = function (t, i, n) {
        var s = t;
        if (0 === this.un.mode) return s;
        if (!this.Uv) return t;
        var h = n.fn(),
          r = h.Vt();
        if (null === r) return s;
        var e = h.jt(t, r),
          u = n
            .He()
            .filter(function (t) {
              return t instanceof yh;
            })
            .reduce(function (t, s) {
              if (n.Vu(s) || !s.Wt()) return t;
              var h = s.Ht(),
                r = s.Pn();
              if (h.et() || !r.vc(i)) return t;
              var e = r.iv(i);
              if (null === e) return t;
              var u = D(s.Vt());
              return t.concat(
                [h.jt(e.value[3], u.Jt)],
                [h.jt(e.value[2], u.Jt)],
                [h.jt(e.value[1], u.Jt)],
                [h.jt(e.value[0], u.Jt)],
              );
            }, []);
        if (0 === u.length) return s;
        u.sort(function (t, i) {
          return Math.abs(t - e) - Math.abs(i - e);
        });
        var o = u[0];
        return (
          Math.abs(o - e) < this.un.magnetThreshold && (s = h.cn(o, r)),
          s
        );
      }),
      t
    );
  })(),
  xh = function (t) {
    return t.getUTCFullYear();
  };
function Nh(t, i, n) {
  return i
    .replace(
      /yyyy/g,
      (function (t) {
        return Si(xh(t), 4);
      })(t),
    )
    .replace(
      /yy/g,
      (function (t) {
        return Si(xh(t) % 100, 2);
      })(t),
    )
    .replace(
      /MMMM/g,
      (function (t, i) {
        return new Date(t.getUTCFullYear(), t.getUTCMonth(), 1).toLocaleString(
          i,
          { month: "long" },
        );
      })(t, n),
    )
    .replace(
      /MMM/g,
      (function (t, i) {
        return new Date(t.getUTCFullYear(), t.getUTCMonth(), 1).toLocaleString(
          i,
          { month: "short" },
        );
      })(t, n),
    )
    .replace(
      /MM/g,
      (function (t) {
        return Si(
          (function (t) {
            return t.getUTCMonth() + 1;
          })(t),
          2,
        );
      })(t),
    )
    .replace(
      /dd/g,
      (function (t) {
        return Si(
          (function (t) {
            return t.getUTCDate();
          })(t),
          2,
        );
      })(t),
    );
}
var Sh = (function () {
    function t(t, i) {
      (void 0 === t && (t = "yyyy-MM-dd"),
        void 0 === i && (i = "default"),
        (this.$v = t),
        (this.Kv = i));
    }
    return (
      (t.prototype.Xv = function (t) {
        return Nh(t, this.$v, this.Kv);
      }),
      t
    );
  })(),
  Ch = (function () {
    function t(t) {
      this.Zv = t || "%h:%m:%s";
    }
    return (
      (t.prototype.Xv = function (t) {
        return this.Zv.replace("%h", Si(t.getUTCHours(), 2))
          .replace("%m", Si(t.getUTCMinutes(), 2))
          .replace("%s", Si(t.getUTCSeconds(), 2));
      }),
      t
    );
  })(),
  Th = { Qv: "yyyy-MM-dd", Gv: "%h:%m:%s", td: " ", nd: "default" },
  Lh = (function () {
    function t(t) {
      void 0 === t && (t = {});
      var i = U(U({}, Th), t);
      ((this.sd = new Sh(i.Qv, i.nd)),
        (this.hd = new Ch(i.Gv)),
        (this.rd = i.td));
    }
    return (
      (t.prototype.Xv = function (t) {
        return "".concat(this.sd.Xv(t)).concat(this.rd).concat(this.hd.Xv(t));
      }),
      t
    );
  })();
var Ah = (function () {
    function t(t, i) {
      (void 0 === i && (i = 50),
        (this.ed = 0),
        (this.ud = 1),
        (this.od = 1),
        (this.Lf = new Map()),
        (this.ld = new Map()),
        (this.ad = t),
        (this.fd = i));
    }
    return (
      (t.prototype.Xv = function (t) {
        var i =
            void 0 === t.businessDay
              ? new Date(1e3 * t.timestamp).getTime()
              : new Date(
                  Date.UTC(
                    t.businessDay.year,
                    t.businessDay.month - 1,
                    t.businessDay.day,
                  ),
                ).getTime(),
          n = this.Lf.get(i);
        if (void 0 !== n) return n.vd;
        if (this.ed === this.fd) {
          var s = this.ld.get(this.od);
          (this.ld.delete(this.od), this.Lf.delete(P(s)), this.od++, this.ed--);
        }
        var h = this.ad(t);
        return (
          this.Lf.set(i, { vd: h, dd: this.ud }),
          this.ld.set(this.ud, i),
          this.ed++,
          this.ud++,
          h
        );
      }),
      t
    );
  })(),
  Ph = (function () {
    function t(t, i) {
      (A(t <= i, "right should be >= left"), (this._d = t), (this.wd = i));
    }
    return (
      (t.prototype.au = function () {
        return this._d;
      }),
      (t.prototype.fu = function () {
        return this.wd;
      }),
      (t.prototype.Md = function () {
        return this.wd - this._d + 1;
      }),
      (t.prototype.vc = function (t) {
        return this._d <= t && t <= this.wd;
      }),
      (t.prototype.yr = function (t) {
        return this._d === t.au() && this.wd === t.fu();
      }),
      t
    );
  })();
function Fh(t, i) {
  return null === t || null === i ? t === i : t.yr(i);
}
var Dh,
  Bh = (function () {
    function t() {
      ((this.bd = new Map()), (this.Lf = null));
    }
    return (
      (t.prototype.md = function (t, i) {
        (this.pd(i), (this.Lf = null));
        for (var n = i; n < t.length; ++n) {
          var s = t[n],
            h = this.bd.get(s.gd);
          (void 0 === h && ((h = []), this.bd.set(s.gd, h)),
            h.push({ dc: n, Nt: s.Nt, yd: s.gd }));
        }
      }),
      (t.prototype.kd = function (t, i) {
        var n = Math.ceil(i / t);
        return (
          (null !== this.Lf && this.Lf.xd === n) ||
            (this.Lf = { dr: this.Nd(n), xd: n }),
          this.Lf.dr
        );
      }),
      (t.prototype.pd = function (t) {
        if (0 !== t) {
          var i = [];
          this.bd.forEach(function (n, s) {
            t <= n[0].dc
              ? i.push(s)
              : n.splice(
                  ks(n, t, function (i) {
                    return i.dc < t;
                  }),
                  1 / 0,
                );
          });
          for (var n = 0, s = i; n < s.length; n++) {
            var h = s[n];
            this.bd.delete(h);
          }
        } else this.bd.clear();
      }),
      (t.prototype.Nd = function (t) {
        for (
          var i = [],
            n = 0,
            s = Array.from(this.bd.keys()).sort(function (t, i) {
              return i - t;
            });
          n < s.length;
          n++
        ) {
          var h = s[n];
          if (this.bd.get(h)) {
            var r = i;
            i = [];
            for (
              var e = r.length,
                u = 0,
                o = P(this.bd.get(h)),
                l = o.length,
                a = 1 / 0,
                f = -1 / 0,
                c = 0;
              c < l;
              c++
            ) {
              for (var v = o[c], d = v.dc; u < e; ) {
                var _ = r[u],
                  w = _.dc;
                if (!(w < d)) {
                  a = w;
                  break;
                }
                (u++, i.push(_), (f = w), (a = 1 / 0));
              }
              a - d >= t && d - f >= t && (i.push(v), (f = d));
            }
            for (; u < e; u++) i.push(r[u]);
          }
        }
        return i;
      }),
      t
    );
  })(),
  Eh = (function () {
    function t(t) {
      this.Sd = t;
    }
    return (
      (t.prototype.Cd = function () {
        return null === this.Sd
          ? null
          : new Ph(Math.floor(this.Sd.au()), Math.ceil(this.Sd.fu()));
      }),
      (t.prototype.Td = function () {
        return this.Sd;
      }),
      (t.Ld = function () {
        return new t(null);
      }),
      t
    );
  })();
!(function (t) {
  ((t[(t.Year = 0)] = "Year"),
    (t[(t.Month = 1)] = "Month"),
    (t[(t.DayOfMonth = 2)] = "DayOfMonth"),
    (t[(t.Time = 3)] = "Time"),
    (t[(t.TimeWithSeconds = 4)] = "TimeWithSeconds"));
})(Dh || (Dh = {}));
var Oh = (function () {
  function t(t, i, n) {
    ((this.xu = 0),
      (this.Ad = null),
      (this.Pd = []),
      (this.oe = null),
      (this.ue = null),
      (this.Fd = new Bh()),
      (this.Dd = new Map()),
      (this.Bd = Eh.Ld()),
      (this.Ed = !0),
      (this.Od = new $()),
      (this.zd = new $()),
      (this.Rd = new $()),
      (this.Wd = null),
      (this.Vd = null),
      (this.Id = []),
      (this.un = i),
      (this.fe = n),
      (this.jd = i.rightOffset),
      (this.Hd = i.barSpacing),
      (this.zi = t),
      this.Jd());
  }
  return (
    (t.prototype.K = function () {
      return this.un;
    }),
    (t.prototype.qd = function (t) {
      (K(this.fe, t), this.Ud(), this.Jd());
    }),
    (t.prototype.$s = function (t, _i) {
      var n;
      (K(this.un, t),
        this.un.fixLeftEdge && this.Yd(),
        this.un.fixRightEdge && this.$d(),
        void 0 !== t.barSpacing && this.zi.Jn(t.barSpacing),
        void 0 !== t.rightOffset && this.zi.qn(t.rightOffset),
        void 0 !== t.minBarSpacing &&
          this.zi.Jn(null !== (n = t.barSpacing) && void 0 !== n ? n : this.Hd),
        this.Ud(),
        this.Jd(),
        this.Rd.P());
    }),
    (t.prototype.vn = function (t) {
      var i;
      return (
        (null === (i = this.Pd[t]) || void 0 === i ? void 0 : i.Nt) || null
      );
    }),
    (t.prototype.Ri = function (t) {
      var i,
        n,
        s,
        h,
        r = Math.floor(t),
        e = Math.ceil(t),
        u = null === (i = this.Pd[r]) || void 0 === i ? void 0 : i.Nt.timestamp,
        o = null === (n = this.Pd[e]) || void 0 === n ? void 0 : n.Nt.timestamp,
        l = null === (s = this.Pd[0]) || void 0 === s ? void 0 : s.Nt.timestamp,
        a =
          null === (h = this.Pd[this.Pd.length - 1]) || void 0 === h
            ? void 0
            : h.Nt.timestamp,
        f = this.Pd[1].Nt.timestamp - this.Pd[0].Nt.timestamp;
      return t >= this.Pd.length - 1
        ? { timestamp: a + f * (t - this.Pd.length + 1) }
        : t < 0
          ? { timestamp: l - f * -t }
          : u && o
            ? { timestamp: u + (o - u) * (t - r) }
            : null;
    }),
    (t.prototype.Hc = function (t, i) {
      if (this.Pd.length < 1) return null;
      if (t.timestamp > this.Pd[this.Pd.length - 1].Nt.timestamp)
        return i ? this.Pd.length - 1 : null;
      var n = ks(this.Pd, t.timestamp, function (t, i) {
        return t.Nt.timestamp < i;
      });
      return t.timestamp < this.Pd[n].Nt.timestamp ? (i ? n : null) : n;
    }),
    (t.prototype.et = function () {
      return 0 === this.xu || 0 === this.Pd.length || null === this.Ad;
    }),
    (t.prototype.es = function () {
      return (this.Kd(), this.Bd.Cd());
    }),
    (t.prototype.Xd = function () {
      return (this.Kd(), this.Bd.Td());
    }),
    (t.prototype.Zd = function () {
      var t = this.es();
      if (null === t) return null;
      var i = { from: t.au(), to: t.fu() };
      return this.Qd(i);
    }),
    (t.prototype.Qd = function (t) {
      var i = Math.round(t.from),
        n = Math.round(t.to),
        s = F(this.Gd()),
        h = F(this.t_());
      return {
        from: F(this.vn(Math.max(s, i))),
        to: F(this.vn(Math.min(h, n))),
      };
    }),
    (t.prototype.i_ = function (t) {
      return { from: F(this.Hc(t.from, !0)), to: F(this.Hc(t.to, !0)) };
    }),
    (t.prototype.oi = function () {
      return this.xu;
    }),
    (t.prototype.Ru = function (t) {
      if (isFinite(t) && !(t <= 0) && this.xu !== t) {
        if (this.un.lockVisibleTimeRangeOnResize && this.xu) {
          var i = (this.Hd * t) / this.xu;
          this.Hd = i;
        }
        if (this.un.fixLeftEdge) {
          var n = this.es();
          if (null !== n)
            if (n.au() <= 0) {
              var s = this.xu - t;
              this.jd -= Math.round(s / this.Hd) + 1;
            }
        }
        ((this.xu = t), (this.Ed = !0), this.n_(), this.s_());
      }
    }),
    (t.prototype.Yt = function (t) {
      if (this.et() || !Z(t)) return 0;
      var i = this.h_() + this.jd - t;
      return this.xu - (i + 0.5) * this.Hd - 1;
    }),
    (t.prototype.Ua = function (t, i) {
      for (
        var n = this.h_(),
          s = void 0 === i ? 0 : i.from,
          h = void 0 === i ? t.length : i.to,
          r = s;
        r < h;
        r++
      ) {
        var e = t[r].Nt,
          u = n + this.jd - e,
          o = this.xu - (u + 0.5) * this.Hd - 1;
        t[r].bt = o;
      }
    }),
    (t.prototype.Wi = function (t) {
      var i = this.Hc(t, !0),
        n = this.Pd[i].Nt.timestamp,
        s = this.Yt(i);
      if (n === t.timestamp) return s;
      if (0 === i || i === this.Pd.length - 1) {
        var h = this.Pd[1].Nt.timestamp - this.Pd[0].Nt.timestamp;
        return s + ((t.timestamp - n) / h) * this.Ga();
      }
      return s;
    }),
    (t.prototype.r_ = function (t) {
      return Math.ceil(this.e_(t));
    }),
    (t.prototype.Hs = function (t) {
      var i = this.Pd[1].Nt.timestamp - this.Pd[0].Nt.timestamp,
        n = this.r_(t);
      if (n >= this.Pd.length) {
        var s = i * (n - this.Pd.length + 1);
        return { timestamp: this.Pd[this.Pd.length - 1].Nt.timestamp + s };
      }
      if (n < 0) {
        s = i * -n;
        return { timestamp: this.Pd[0].Nt.timestamp - s };
      }
      return this.Pd[n].Nt;
    }),
    (t.prototype.u_ = function (t) {
      return this.et() ? null : this.Yt(t);
    }),
    (t.prototype.o_ = function (t) {
      return this.et() ? null : this.r_(t);
    }),
    (t.prototype.dl = function () {
      var t = this.Xd();
      if (null === t) return null;
      var i = t.au(),
        n = t.fu(),
        s = this.u_(Math.floor(i)),
        h = this.u_(Math.ceil(n)),
        r = this.Hs(s),
        e = this.Hs(h);
      return { from: r.timestamp, to: e.timestamp };
    }),
    (t.prototype.qn = function (t) {
      ((this.Ed = !0), (this.jd = t), this.s_(), this.zi.l_(), this.zi.oo());
    }),
    (t.prototype.Ga = function () {
      return this.Hd;
    }),
    (t.prototype.Jn = function (t) {
      (this.a_(t), this.s_(), this.zi.l_(), this.zi.oo());
    }),
    (t.prototype.f_ = function () {
      return this.jd;
    }),
    (t.prototype.dr = function () {
      if (this.et()) return null;
      if (null !== this.Vd) return this.Vd;
      for (
        var t = this.Hd,
          i = 5 * (this.zi.K().layout.fontSize + 4),
          n = Math.round(i / t),
          s = F(this.es()),
          h = Math.max(s.au(), s.au() - n),
          r = Math.max(s.fu(), s.fu() - n),
          e = this.Fd.kd(t, i),
          u = this.Gd() + n,
          o = this.t_() - n,
          l = this.c_(),
          a = this.un.fixLeftEdge || l,
          f = this.un.fixRightEdge || l,
          c = 0,
          v = 0,
          d = e;
        v < d.length;
        v++
      ) {
        var _ = d[v];
        if (h <= _.dc && _.dc <= r) {
          var w = void 0;
          (c < this.Id.length
            ? (((w = this.Id[c]).ur = this.Yt(_.dc)),
              (w.Jr = this.v_(_.Nt, _.yd)),
              (w.yd = _.yd))
            : ((w = {
                d_: !1,
                ur: this.Yt(_.dc),
                Jr: this.v_(_.Nt, _.yd),
                yd: _.yd,
              }),
              this.Id.push(w)),
            this.Hd > i / 2 && !l
              ? (w.d_ = !1)
              : (w.d_ = (a && _.dc <= u) || (f && _.dc >= o)),
            c++);
        }
      }
      return ((this.Id.length = c), (this.Vd = this.Id), this.Id);
    }),
    (t.prototype.__ = function () {
      ((this.Ed = !0),
        this.Jn(this.un.barSpacing),
        this.qn(this.un.rightOffset));
    }),
    (t.prototype.w_ = function (t) {
      ((this.Ed = !0), (this.Ad = t), this.s_(), this.Yd());
    }),
    (t.prototype.M_ = function (t, i) {
      var n = this.e_(t),
        s = this.Ga(),
        h = s + i * (s / 10);
      (this.Jn(h),
        this.un.rightBarStaysOnScroll || this.qn(this.f_() + (n - this.e_(t))));
    }),
    (t.prototype.Ze = function (t) {
      (this.oe && this.nu(),
        null === this.ue &&
          null === this.Wd &&
          (this.et() || ((this.ue = t), this.b_())));
    }),
    (t.prototype.Qe = function (t) {
      if (null !== this.Wd) {
        var i = Ai(this.xu - t, 0, this.xu),
          n = Ai(this.xu - F(this.ue), 0, this.xu);
        0 !== i && 0 !== n && this.Jn((this.Wd.Ga * i) / n);
      }
    }),
    (t.prototype.Ge = function () {
      null !== this.ue && ((this.ue = null), this.m_());
    }),
    (t.prototype.tu = function (t) {
      null === this.oe &&
        null === this.Wd &&
        (this.et() || ((this.oe = t), this.b_()));
    }),
    (t.prototype.iu = function (t) {
      if (null !== this.oe) {
        var i = (this.oe - t) / this.Ga();
        ((this.jd = F(this.Wd).f_ + i), (this.Ed = !0), this.s_());
      }
    }),
    (t.prototype.nu = function () {
      null !== this.oe && ((this.oe = null), this.m_());
    }),
    (t.prototype.p_ = function () {
      this.g_(this.un.rightOffset);
    }),
    (t.prototype.g_ = function (t, i) {
      var n = this;
      if ((void 0 === i && (i = 400), !isFinite(t)))
        throw new RangeError("offset is required and must be finite number");
      if (!isFinite(i) || i <= 0)
        throw new RangeError(
          "animationDuration (optional) must be finite positive number",
        );
      var s = this.jd,
        h = performance.now(),
        r = function () {
          var e = (performance.now() - h) / i,
            u = e >= 1,
            o = u ? t : s + (t - s) * e;
          (n.qn(o), u || setTimeout(r, 20));
        };
      r();
    }),
    (t.prototype.Ft = function (t, i) {
      ((this.Ed = !0), (this.Pd = t), this.Fd.md(t, i), this.s_());
    }),
    (t.prototype.y_ = function () {
      return this.Od;
    }),
    (t.prototype.k_ = function () {
      return this.zd;
    }),
    (t.prototype.x_ = function () {
      return this.Rd;
    }),
    (t.prototype.h_ = function () {
      return this.Ad || 0;
    }),
    (t.prototype.De = function (t) {
      var i = t.Md();
      (this.a_(this.xu / i),
        (this.jd = t.fu() - this.h_()),
        this.s_(),
        (this.Ed = !0),
        this.zi.l_(),
        this.zi.oo());
    }),
    (t.prototype.N_ = function () {
      var t = this.Gd(),
        i = this.t_();
      null !== t && null !== i && this.De(new Ph(t, i + this.un.rightOffset));
    }),
    (t.prototype.S_ = function (t) {
      var i = new Ph(t.from, t.to);
      this.De(i);
    }),
    (t.prototype.Vi = function (t) {
      return void 0 !== this.fe.timeFormatter
        ? this.fe.timeFormatter(t.businessDay || t.timestamp)
        : this.C_.Xv(new Date(1e3 * t.timestamp));
    }),
    (t.prototype.c_ = function () {
      var t = this.zi.K(),
        i = t.handleScroll,
        n = t.handleScale;
      return !(
        i.horzTouchDrag ||
        i.mouseWheel ||
        i.pressedMouseMove ||
        i.vertTouchDrag ||
        n.axisDoubleClickReset ||
        n.axisPressedMouseMove.time ||
        n.mouseWheel ||
        n.pinch
      );
    }),
    (t.prototype.Gd = function () {
      return 0 === this.Pd.length ? null : 0;
    }),
    (t.prototype.t_ = function () {
      return 0 === this.Pd.length ? null : this.Pd.length - 1;
    }),
    (t.prototype.T_ = function (t) {
      return (this.xu - 1 - t) / this.Hd;
    }),
    (t.prototype.e_ = function (t) {
      var i = this.T_(t),
        n = this.h_() + this.jd - i;
      return Math.round(1e6 * n) / 1e6;
    }),
    (t.prototype.a_ = function (t) {
      var i = this.Hd;
      ((this.Hd = t), this.n_(), i !== this.Hd && ((this.Ed = !0), this.L_()));
    }),
    (t.prototype.Kd = function () {
      if (this.Ed)
        if (((this.Ed = !1), this.et())) this.A_(Eh.Ld());
        else {
          var t = this.h_(),
            i = this.xu / this.Hd,
            n = this.jd + t,
            s = new Ph(n - i + 1, n);
          this.A_(new Eh(s));
        }
    }),
    (t.prototype.n_ = function () {
      var t = this.P_();
      if ((this.Hd < t && ((this.Hd = t), (this.Ed = !0)), 0 !== this.xu)) {
        var i = 0.5 * this.xu;
        this.Hd > i && ((this.Hd = i), (this.Ed = !0));
      }
    }),
    (t.prototype.P_ = function () {
      return this.un.fixLeftEdge && this.un.fixRightEdge && 0 !== this.Pd.length
        ? this.xu / this.Pd.length
        : this.un.minBarSpacing;
    }),
    (t.prototype.s_ = function () {
      var t = this.F_();
      this.jd > t && ((this.jd = t), (this.Ed = !0));
      var i = this.D_();
      null !== i && this.jd < i && ((this.jd = i), (this.Ed = !0));
    }),
    (t.prototype.D_ = function () {
      var t = this.Gd(),
        i = this.Ad;
      return null === t || null === i
        ? null
        : t -
            i -
            1 +
            (this.un.fixLeftEdge
              ? this.xu / this.Hd
              : Math.min(2, this.Pd.length));
    }),
    (t.prototype.F_ = function () {
      return this.un.fixRightEdge
        ? 0
        : this.xu / this.Hd - Math.min(2, this.Pd.length);
    }),
    (t.prototype.b_ = function () {
      this.Wd = { Ga: this.Ga(), f_: this.f_() };
    }),
    (t.prototype.m_ = function () {
      this.Wd = null;
    }),
    (t.prototype.v_ = function (t, i) {
      var n = this,
        s = this.Dd.get(i);
      return (
        void 0 === s &&
          ((s = new Ah(function (t) {
            return n.B_(t, i);
          })),
          this.Dd.set(i, s)),
        s.Xv(t)
      );
    }),
    (t.prototype.B_ = function (t, i) {
      var n,
        s = (function (t, i, n) {
          switch (t) {
            case 0:
            case 10:
              return i ? (n ? 4 : 3) : 2;
            case 20:
            case 21:
            case 22:
            case 30:
            case 31:
            case 32:
            case 33:
              return i ? 3 : 2;
            case 50:
              return 2;
            case 60:
              return 1;
            case 70:
              return 0;
          }
        })(i, this.un.timeVisible, this.un.secondsVisible);
      return void 0 !== this.un.tickMarkFormatter
        ? this.un.tickMarkFormatter(
            null !== (n = t.businessDay) && void 0 !== n ? n : t.timestamp,
            s,
            this.fe.locale,
          )
        : (function (t, i, n) {
            var s = {};
            switch (i) {
              case 0:
                s.year = "numeric";
                break;
              case 1:
                s.month = "short";
                break;
              case 2:
                s.day = "numeric";
                break;
              case 3:
                ((s.hour12 = !1), (s.hour = "2-digit"), (s.minute = "2-digit"));
                break;
              case 4:
                ((s.hour12 = !1),
                  (s.hour = "2-digit"),
                  (s.minute = "2-digit"),
                  (s.second = "2-digit"));
            }
            var h =
              void 0 === t.businessDay
                ? new Date(1e3 * t.timestamp)
                : new Date(
                    Date.UTC(
                      t.businessDay.year,
                      t.businessDay.month - 1,
                      t.businessDay.day,
                    ),
                  );
            return new Date(
              h.getUTCFullYear(),
              h.getUTCMonth(),
              h.getUTCDate(),
              h.getUTCHours(),
              h.getUTCMinutes(),
              h.getUTCSeconds(),
              h.getUTCMilliseconds(),
            ).toLocaleString(n, s);
          })(t, s, this.fe.locale);
    }),
    (t.prototype.A_ = function (t) {
      var i = this.Bd;
      ((this.Bd = t),
        Fh(i.Cd(), this.Bd.Cd()) || this.Od.P(),
        Fh(i.Td(), this.Bd.Td()) || this.zd.P(),
        this.L_());
    }),
    (t.prototype.L_ = function () {
      this.Vd = null;
    }),
    (t.prototype.Ud = function () {
      (this.L_(), this.Dd.clear());
    }),
    (t.prototype.Jd = function () {
      var t = this.fe.dateFormat;
      this.un.timeVisible
        ? (this.C_ = new Lh({
            Qv: t,
            Gv: this.un.secondsVisible ? "%h:%m:%s" : "%h:%m",
            td: "   ",
            nd: this.fe.locale,
          }))
        : (this.C_ = new Sh(t, this.fe.locale));
    }),
    (t.prototype.Yd = function () {
      if (this.un.fixLeftEdge) {
        var t = this.Gd();
        if (null !== t) {
          var i = this.es();
          if (null !== i) {
            var n = i.au() - t;
            if (n < 0) {
              var s = this.jd - n - 1;
              this.qn(s);
            }
            this.n_();
          }
        }
      }
    }),
    (t.prototype.$d = function () {
      (this.s_(), this.n_());
    }),
    t
  );
})();
var zh,
  Rh = (function (t) {
    function i(i) {
      var n = t.call(this) || this;
      return ((n.E_ = new Map()), (n.$t = i), n);
    }
    return (
      q(i, t),
      (i.prototype.ft = function (_t) {}),
      (i.prototype.vt = function (t) {
        if (this.$t.Wt) {
          t.save();
          for (var i = 0, n = 0, s = this.$t.Zh; n < s.length; n++) {
            if (0 !== (o = s[n]).wi.length) {
              t.font = o.V;
              var h = this.O_(t, o.wi);
              (h > this.$t.oi ? (o.M_ = this.$t.oi / h) : (o.M_ = 1),
                (i += o.z_ * o.M_));
            }
          }
          var r = 0;
          switch (this.$t.R_) {
            case "top":
              r = 0;
              break;
            case "center":
              r = Math.max((this.$t.li - i) / 2, 0);
              break;
            case "bottom":
              r = Math.max(this.$t.li - i, 0);
          }
          t.fillStyle = this.$t.j;
          for (var e = 0, u = this.$t.Zh; e < u.length; e++) {
            var o = u[e];
            t.save();
            var l = 0;
            switch (this.$t.W_) {
              case "left":
                ((t.textAlign = "left"), (l = o.z_ / 2));
                break;
              case "center":
                ((t.textAlign = "center"), (l = this.$t.oi / 2));
                break;
              case "right":
                ((t.textAlign = "right"), (l = this.$t.oi - 1 - o.z_ / 2));
            }
            (t.translate(l, r),
              (t.textBaseline = "top"),
              (t.font = o.V),
              t.scale(o.M_, o.M_),
              t.fillText(o.wi, 0, o.V_),
              t.restore(),
              (r += o.z_ * o.M_));
          }
          t.restore();
        }
      }),
      (i.prototype.O_ = function (t, i) {
        var n = this.I_(t.font),
          s = n.get(i);
        return (void 0 === s && ((s = t.measureText(i).width), n.set(i, s)), s);
      }),
      (i.prototype.I_ = function (t) {
        var i = this.E_.get(t);
        return (void 0 === i && ((i = new Map()), this.E_.set(t, i)), i);
      }),
      i
    );
  })(ut),
  Wh = (function () {
    function t(t) {
      ((this.At = !0),
        (this.ii = {
          Wt: !1,
          j: "",
          li: 0,
          oi: 0,
          Zh: [],
          R_: "center",
          W_: "center",
        }),
        (this.ni = new Rh(this.ii)),
        (this.si = t));
    }
    return (
      (t.prototype.Ft = function () {
        this.At = !0;
      }),
      (t.prototype.Bt = function (t, i) {
        return (this.At && (this.Et(t, i), (this.At = !1)), this.ni);
      }),
      (t.prototype.Et = function (t, i) {
        var n = this.si.K(),
          s = this.ii;
        ((s.Wt = n.visible),
          s.Wt &&
            ((s.j = n.color),
            (s.oi = i),
            (s.li = t),
            (s.W_ = n.horzAlign),
            (s.R_ = n.vertAlign),
            (s.Zh = [
              {
                wi: n.text,
                V: ht(n.fontSize, n.fontFamily, n.fontStyle),
                z_: 1.2 * n.fontSize,
                V_: 0,
                M_: 0,
              },
            ])));
      }),
      t
    );
  })(),
  Vh = (function (t) {
    function i(i, n) {
      var s = t.call(this) || this;
      return ((s.un = n), (s._n = new Wh(s)), s);
    }
    return (
      q(i, t),
      (i.prototype.Nn = function () {
        return [];
      }),
      (i.prototype.xn = function () {
        return [this._n];
      }),
      (i.prototype.K = function () {
        return this.un;
      }),
      (i.prototype.Cn = function () {
        this._n.Ft();
      }),
      i
    );
  })(St);
!(function (t) {
  ((t[(t.OnTouchEnd = 0)] = "OnTouchEnd"),
    (t[(t.OnNextTap = 1)] = "OnNextTap"));
})(zh || (zh = {}));
var Ih,
  jh,
  Hh,
  Jh,
  qh,
  Uh,
  Yh = (function () {
    function t(t, i) {
      ((this.j_ = []),
        (this.H_ = []),
        (this.xu = 0),
        (this.J_ = null),
        (this.q_ = null),
        (this.U_ = new $()),
        (this.Y_ = new $()),
        (this.K_ = new $()),
        (this.X_ = new $()),
        (this.Z_ = null),
        (this.Q_ = t),
        (this.un = i),
        (this.G_ = new rt(this)),
        (this.Cu = new Oh(this, i.timeScale, this.un.localization)),
        (this.Pt = new Ct(this, i.crosshair)),
        (this.tw = new kh(i.crosshair)),
        (this.iw = new Vh(this, i.watermark)),
        (this.nw = new ws(this)),
        this.sw(),
        this.j_[0].zu(2e3),
        (this.hw = this.rw(0)),
        (this.ew = this.rw(1)));
    }
    return (
      (t.prototype.Av = function () {
        this.uw(new Lt(3));
      }),
      (t.prototype.oo = function () {
        this.uw(new Lt(2));
      }),
      (t.prototype.Vv = function () {
        this.uw(new Lt(1));
      }),
      (t.prototype.Bs = function (t) {
        var i = this.ow(t);
        this.uw(i);
      }),
      (t.prototype.lw = function () {
        return this.q_;
      }),
      (t.prototype.He = function () {
        for (var t = [], i = 0, n = this.j_; i < n.length; i++)
          for (var s = 0, h = n[i].He(); s < h.length; s++) {
            var r = h[s];
            t.push(r);
          }
        return t;
      }),
      (t.prototype.aw = function (t) {
        var i = this.q_;
        ((this.q_ = t),
          null !== i && this.Bs(i.fw),
          null !== t && this.Bs(t.fw));
      }),
      (t.prototype.K = function () {
        return this.un;
      }),
      (t.prototype.$s = function (t) {
        (K(this.un, t),
          this.j_.forEach(function (i) {
            return i.Du(t);
          }),
          void 0 !== t.timeScale && this.Cu.$s(t.timeScale),
          void 0 !== t.localization && this.Cu.qd(t.localization),
          (t.leftPriceScale || t.rightPriceScale) && this.U_.P(),
          (this.hw = this.rw(0)),
          (this.ew = this.rw(1)),
          this.Av());
      }),
      (t.prototype.cw = function (t, i) {
        if ("left" !== t)
          if ("right" !== t) {
            var n = this.dw(t);
            null !== n && (n.Ht.$s(i), this.U_.P());
          } else this.$s({ rightPriceScale: i });
        else this.$s({ leftPriceScale: i });
      }),
      (t.prototype.dw = function (t) {
        for (var i = 0, n = this.j_; i < n.length; i++) {
          var s = n[i],
            h = s.Bu(t);
          if (null !== h) return { hi: s, Ht: h };
        }
        return null;
      }),
      (t.prototype.zt = function () {
        return this.Cu;
      }),
      (t.prototype._w = function () {
        return this.j_.length > 0 ? this.j_[0] : null;
      }),
      (t.prototype.Ys = function () {
        return this.j_;
      }),
      (t.prototype.ww = function () {
        return this.iw;
      }),
      (t.prototype.Mw = function () {
        return this.nw;
      }),
      (t.prototype.Po = function () {
        return this.Pt;
      }),
      (t.prototype.$o = function () {
        return this.tw;
      }),
      (t.prototype.bw = function () {
        return this.Y_;
      }),
      (t.prototype.mw = function () {
        return this.K_;
      }),
      (t.prototype.pw = function () {
        return this.X_;
      }),
      (t.prototype.gw = function (t, i) {
        (t.Se(i), this.l_());
      }),
      (t.prototype.Ru = function (t) {
        ((this.xu = t),
          this.Cu.Ru(this.xu),
          this.j_.forEach(function (i) {
            return i.Ru(t);
          }),
          this.l_());
      }),
      (t.prototype.sw = function (t) {
        var i = new Gi(this.Cu, this);
        void 0 !== t ? this.j_.splice(t, 0, i) : this.j_.push(i);
        var n = void 0 === t ? this.j_.length - 1 : t,
          s = new Lt(3);
        return (s.En(n, { On: 0, zn: !0 }), this.uw(s), i);
      }),
      (t.prototype.Xu = function (t, i, n) {
        t.Xu(i, n);
      }),
      (t.prototype.Zu = function (t, i, n) {
        (t.Zu(i, n), this.Pv(), this.uw(this.yw(t, 2)));
      }),
      (t.prototype.Qu = function (t, i) {
        (t.Qu(i), this.uw(this.yw(t, 2)));
      }),
      (t.prototype.Gu = function (t, i, n) {
        i.me() || t.Gu(i, n);
      }),
      (t.prototype.io = function (t, i, n) {
        i.me() || (t.io(i, n), this.Pv(), this.uw(this.yw(t, 2)));
      }),
      (t.prototype.no = function (t, i) {
        i.me() || (t.no(i), this.uw(this.yw(t, 2)));
      }),
      (t.prototype.ro = function (t, i) {
        (t.ro(i), this.uw(this.yw(t, 2)));
      }),
      (t.prototype.kw = function (t) {
        this.Cu.Ze(t);
      }),
      (t.prototype.xw = function (t, i) {
        var n = this.zt();
        if (!n.et() && 0 !== i) {
          var s = n.oi();
          ((t = Math.max(1, Math.min(t, s))), n.M_(t, i), this.l_());
        }
      }),
      (t.prototype.Nw = function (t) {
        (this.Sw(0), this.Cw(t), this.Tw());
      }),
      (t.prototype.Lw = function (t) {
        (this.Cu.Qe(t), this.l_());
      }),
      (t.prototype.Aw = function () {
        (this.Cu.Ge(), this.oo());
      }),
      (t.prototype.Sw = function (t) {
        ((this.J_ = t), this.Cu.tu(t));
      }),
      (t.prototype.Cw = function (t) {
        var i = !1;
        return (
          null !== this.J_ &&
            Math.abs(t - this.J_) > 20 &&
            ((this.J_ = null), (i = !0)),
          this.Cu.iu(t),
          this.l_(),
          i
        );
      }),
      (t.prototype.Tw = function () {
        (this.Cu.nu(), this.oo(), (this.J_ = null));
      }),
      (t.prototype.Dt = function () {
        return this.H_;
      }),
      (t.prototype.Pw = function (t, i, n) {
        this.Pt.wn(t, i);
        var s = NaN,
          r = this.Cu.r_(t),
          e = this.Cu.es();
        null !== e && (r = Math.min(Math.max(e.au(), r), e.fu()));
        var u = n.fn(),
          o = u.Vt();
        (null !== o && (s = u.cn(i, o)),
          (s = this.tw.Yv(s, r, n)),
          this.Pt.pn(r, s, n),
          this.Vv(),
          this.Y_.P(this.Pt.Ot(), new h(t, i)));
      }),
      (t.prototype.Fw = function () {
        (this.Po().yn(), this.Vv(), this.Y_.P(null, null));
      }),
      (t.prototype.Pv = function () {
        var t = this.Pt.hi();
        if (null !== t) {
          var i = this.Pt.bn(),
            n = this.Pt.mn();
          this.Pw(i, n, t);
        }
        this.Pt.Cn();
      }),
      (t.prototype.Dw = function (t, i, n, s) {
        this.Pt.wn(t, i);
        var r = NaN,
          e = this.Cu.r_(t),
          u = this.Cu.es();
        null !== u && (e = Math.min(Math.max(u.au(), e), u.fu()));
        var o = s.fn(),
          l = o.Vt();
        (null !== l && (r = o.cn(i, l)),
          (r = this.tw.Yv(r, e, s)),
          this.Pt.pn(e, r, s),
          this.Vv(),
          n && this.Y_.P(this.Pt.Ot(), new h(t, i)));
      }),
      (t.prototype.Bw = function (t, i, n) {
        var s = this.Cu.vn(0);
        void 0 !== i && void 0 !== n && this.Cu.Ft(i, n);
        var h = this.Cu.vn(0),
          r = this.Cu.h_(),
          e = this.Cu.es();
        if (null !== e && null !== s && null !== h) {
          var u = e.vc(r),
            o = s.timestamp > h.timestamp,
            l = null !== t && t > r && !o,
            a = u && this.Cu.K().shiftVisibleRangeOnNewBar;
          if (l && !a) {
            var f = t - r;
            this.Cu.qn(this.Cu.f_() - f);
          }
        }
        this.Cu.w_(t);
      }),
      (t.prototype.Bv = function (t) {
        null !== t && t.uo();
      }),
      (t.prototype.ul = function (t) {
        var i = this.j_.find(function (i) {
          return i.Je().includes(t);
        });
        return void 0 === i ? null : i;
      }),
      (t.prototype.l_ = function () {
        (this.iw.Cn(),
          this.j_.forEach(function (t) {
            return t.uo();
          }),
          this.Pv());
      }),
      (t.prototype.Ew = function (t) {
        this.K_.P(t);
      }),
      (t.prototype.Jo = function (t, i) {
        this.X_.P(t, i);
      }),
      (t.prototype.D = function () {
        (this.j_.forEach(function (t) {
          return t.D();
        }),
          (this.j_.length = 0),
          (this.un.localization.priceFormatter = void 0),
          (this.un.localization.timeFormatter = void 0));
      }),
      (t.prototype.Ow = function () {
        return this.G_;
      }),
      (t.prototype.Wf = function () {
        return this.G_.K();
      }),
      (t.prototype.Eu = function () {
        return this.U_;
      }),
      (t.prototype.zw = function (t, i) {
        var n = this.j_[0],
          s = this.Rw(i, t, n);
        return (
          this.H_.push(s),
          1 === this.H_.length ? this.Av() : this.oo(),
          s
        );
      }),
      (t.prototype.Ww = function (t) {
        var i = this.ul(t),
          n = this.H_.indexOf(t);
        (A(-1 !== n, "Series not found"),
          this.H_.splice(n, 1),
          F(i).Ye(t),
          t.D && t.D());
      }),
      (t.prototype.Vw = function (t, i, n) {
        var s = new _s[t](this, i, n);
        return (this.j_[0].qe(s, this.ga()), s);
      }),
      (t.prototype.Lv = function (t, i) {
        var n = F(this.ul(t));
        n.Ye(t);
        var s = this.dw(i);
        if (null === s) {
          var h = t.Ui();
          n.qe(t, i, h);
        } else {
          h = s.hi === n ? t.Ui() : void 0;
          s.hi.qe(t, i, h);
        }
      }),
      (t.prototype.N_ = function () {
        var t = new Lt(2);
        (t.Vn(), this.uw(t));
      }),
      (t.prototype.Iw = function (t) {
        var i = new Lt(2);
        (i.jn(t), this.uw(i));
      }),
      (t.prototype.Hn = function () {
        var t = new Lt(2);
        (t.Hn(), this.uw(t));
      }),
      (t.prototype.Jn = function (t) {
        var i = new Lt(2);
        (i.Jn(t), this.uw(i));
      }),
      (t.prototype.qn = function (t) {
        var i = new Lt(2);
        (i.qn(t), this.uw(i));
      }),
      (t.prototype.ga = function () {
        return this.un.rightPriceScale.visible ? "right" : "left";
      }),
      (t.prototype.jw = function () {
        return this.ew;
      }),
      (t.prototype.Hw = function () {
        return this.hw;
      }),
      (t.prototype.Ut = function (t) {
        var i = this.ew,
          n = this.hw;
        if (i === n) return i;
        if (
          ((t = Math.max(0, Math.min(100, Math.round(100 * t)))),
          null === this.Z_ || this.Z_.La !== n || this.Z_.Aa !== i)
        )
          this.Z_ = { La: n, Aa: i, Jw: new Map() };
        else {
          var s = this.Z_.Jw.get(t);
          if (void 0 !== s) return s;
        }
        var h = (function (t, i, n) {
          var s = I(t),
            h = s[0],
            r = s[1],
            e = s[2],
            u = s[3],
            o = I(i),
            l = o[0],
            a = o[1],
            f = o[2],
            c = o[3],
            v = [
              E(h + n * (l - h)),
              E(r + n * (a - r)),
              E(e + n * (f - e)),
              O(u + n * (c - u)),
            ];
          return "rgba("
            .concat(v[0], ", ")
            .concat(v[1], ", ")
            .concat(v[2], ", ")
            .concat(v[3], ")");
        })(n, i, t / 100);
        return (this.Z_.Jw.set(t, h), h);
      }),
      (t.prototype.yw = function (t, i) {
        var n = new Lt(i);
        if (null !== t) {
          var s = this.j_.indexOf(t);
          n.En(s, { On: i });
        }
        return n;
      }),
      (t.prototype.ow = function (t, i) {
        return (void 0 === i && (i = 2), this.yw(this.ul(t), i));
      }),
      (t.prototype.uw = function (t) {
        (this.Q_ && this.Q_(t),
          this.j_.forEach(function (t) {
            return t.ao()._r().Ft();
          }));
      }),
      (t.prototype.Rw = function (t, i, n) {
        var s = new yh(this, t, i),
          h = void 0 !== t.priceScaleId ? t.priceScaleId : this.ga();
        return (n.qe(s, h), Tt(h) || s.$s(t), s);
      }),
      (t.prototype.rw = function (t) {
        var i = this.un.layout;
        return "gradient" === i.background.type
          ? 0 === t
            ? i.background.topColor
            : i.background.bottomColor
          : i.background.color;
      }),
      t
    );
  })();
function $h(t) {
  (void 0 !== t.borderColor &&
    ((t.borderUpColor = t.borderColor), (t.borderDownColor = t.borderColor)),
    void 0 !== t.wickColor &&
      ((t.wickUpColor = t.wickColor), (t.wickDownColor = t.wickColor)));
}
function Kh(t) {
  return !X(t) && !Q(t);
}
function Xh(t) {
  return X(t);
}
(!(function (t) {
  ((t[(t.Disabled = 0)] = "Disabled"),
    (t[(t.Continuous = 1)] = "Continuous"),
    (t[(t.OnDataUpdate = 2)] = "OnDataUpdate"));
})(Ih || (Ih = {})),
  (function (t) {
    ((t[(t.LastBar = 0)] = "LastBar"),
      (t[(t.LastVisible = 1)] = "LastVisible"));
  })(jh || (jh = {})),
  (function (t) {
    ((t.Top = "top"), (t.Middle = "middle"), (t.Bottom = "bottom"));
  })(Hh || (Hh = {})),
  (function (t) {
    ((t.Left = "left"), (t.Center = "center"), (t.Right = "right"));
  })(Jh || (Jh = {})),
  (function (t) {
    ((t.Start = "start"),
      (t.Center = "center"),
      (t.End = "end"),
      (t.Left = "left"),
      (t.Right = "right"));
  })(qh || (qh = {})),
  (function (t) {
    ((t.Solid = "solid"), (t.VerticalGradient = "gradient"));
  })(Uh || (Uh = {})));
var Zh = (function () {
  function t(t, i) {
    ((this.Zt = t), (this.Qt = i));
  }
  return (
    (t.prototype.yr = function (t) {
      return this.Zt === t.Zt && this.Qt === t.Qt;
    }),
    t
  );
})();
function Qh(t) {
  return (
    (t.ownerDocument &&
      t.ownerDocument.defaultView &&
      t.ownerDocument.defaultView.devicePixelRatio) ||
    1
  );
}
function Gh(t) {
  var i = F(t.getContext("2d"));
  return (i.setTransform(1, 0, 0, 1, 0, 0), i);
}
function tr(t, i) {
  var n = t.createElement("canvas"),
    s = Qh(n);
  return (
    (n.style.width = "".concat(i.Zt, "px")),
    (n.style.height = "".concat(i.Qt, "px")),
    (n.width = i.Zt * s),
    (n.height = i.Qt * s),
    n
  );
}
function ir(i, n) {
  var s = F(i.ownerDocument).createElement("canvas");
  i.appendChild(s);
  var h = t(s, { allowDownsampling: !1 });
  return (h.resizeCanvas({ width: n.Zt, height: n.Qt }), h);
}
function nr(t, i) {
  return t.qw - i.qw;
}
function sr(t, i, n) {
  var s = (t.qw - i.qw) / (t.Nt - i.Nt);
  return Math.sign(s) * Math.min(Math.abs(s), n);
}
var hr = (function () {
    function t(t, i, n, s) {
      ((this.Uw = null),
        (this.Yw = null),
        (this.$w = null),
        (this.Kw = null),
        (this.Xw = null),
        (this.Zw = 0),
        (this.Qw = 0),
        (this.Gw = !1),
        (this.tM = t),
        (this.iM = i),
        (this.nM = n),
        (this.wr = s));
    }
    return (
      (t.prototype.sM = function (t, i) {
        if (null !== this.Uw) {
          if (this.Uw.Nt === i) return void (this.Uw.qw = t);
          if (Math.abs(this.Uw.qw - t) < this.wr) return;
        }
        ((this.Kw = this.$w),
          (this.$w = this.Yw),
          (this.Yw = this.Uw),
          (this.Uw = { Nt: i, qw: t }));
      }),
      (t.prototype.Yf = function (t, i) {
        if (null !== this.Uw && null !== this.Yw && !(i - this.Uw.Nt > 50)) {
          var n = 0,
            s = sr(this.Uw, this.Yw, this.iM),
            h = nr(this.Uw, this.Yw),
            r = [s],
            e = [h];
          if (((n += h), null !== this.$w)) {
            var u = sr(this.Yw, this.$w, this.iM);
            if (Math.sign(u) === Math.sign(s)) {
              var o = nr(this.Yw, this.$w);
              if ((r.push(u), e.push(o), (n += o), null !== this.Kw)) {
                var l = sr(this.$w, this.Kw, this.iM);
                if (Math.sign(l) === Math.sign(s)) {
                  var a = nr(this.$w, this.Kw);
                  (r.push(l), e.push(a), (n += a));
                }
              }
            }
          }
          for (var f, c, v, d = 0, _ = 0; _ < r.length; ++_)
            d += (e[_] / n) * r[_];
          if (!(Math.abs(d) < this.tM))
            ((this.Xw = { qw: t, Nt: i }),
              (this.Qw = d),
              (this.Zw =
                ((f = Math.abs(d)),
                (c = this.nM),
                (v = Math.log(c)),
                Math.log((1 * v) / -f) / v)));
        }
      }),
      (t.prototype.hM = function (t) {
        var i = F(this.Xw),
          n = t - i.Nt;
        return (
          i.qw + (this.Qw * (Math.pow(this.nM, n) - 1)) / Math.log(this.nM)
        );
      }),
      (t.prototype.Fs = function (t) {
        return null === this.Xw || this.rM(t) === this.Zw;
      }),
      (t.prototype.eM = function () {
        return this.Gw;
      }),
      (t.prototype.uM = function () {
        this.Gw = !0;
      }),
      (t.prototype.rM = function (t) {
        var i = t - F(this.Xw).Nt;
        return Math.min(i, this.Zw);
      }),
      t
    );
  })(),
  rr = "undefined" != typeof window;
function er() {
  return (
    !!rr && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
  );
}
function ur() {
  return !!rr && /iPhone|iPad|iPod/.test(window.navigator.platform);
}
function or(t) {
  rr &&
    void 0 !== window.chrome &&
    t.addEventListener("mousedown", function (t) {
      if (1 === t.button) return (t.preventDefault(), !1);
    });
}
var lr = (function () {
  function t(t, i, n) {
    var s = this;
    ((this.na = 0),
      (this.oM = null),
      (this.lM = {
        bt: Number.NEGATIVE_INFINITY,
        gt: Number.POSITIVE_INFINITY,
      }),
      (this.aM = 0),
      (this.fM = null),
      (this.cM = {
        bt: Number.NEGATIVE_INFINITY,
        gt: Number.POSITIVE_INFINITY,
      }),
      (this.vM = null),
      (this.dM = !1),
      (this._M = null),
      (this.wM = null),
      (this.MM = !1),
      (this.bM = !1),
      (this.mM = !1),
      (this.pM = null),
      (this.gM = null),
      (this.yM = null),
      (this.kM = null),
      (this.xM = null),
      (this.NM = null),
      (this.SM = null),
      (this.CM = 0),
      (this.TM = !1),
      (this.LM = !1),
      (this.AM = !1),
      (this.PM = 0),
      (this.FM = null),
      (this.DM = !ur()),
      (this.BM = function (t) {
        s.EM(t);
      }),
      (this.OM = function (t) {
        if (s.zM(t)) {
          var i = s.RM(t);
          if ((++s.aM, s.fM && s.aM > 1))
            (s.VM(cr(t), s.cM).WM < 30 && !s.mM && s.IM(i, s.HM.jM), s.JM());
        } else {
          i = s.RM(t);
          if ((++s.na, s.oM && s.na > 1))
            (s.VM(cr(t), s.lM).WM < 5 && !s.bM && s.qM(i, s.HM.UM), s.YM());
        }
      }),
      (this.$M = t),
      (this.HM = i),
      (this.un = n),
      this.KM());
  }
  return (
    (t.prototype.D = function () {
      (null !== this.pM && (this.pM(), (this.pM = null)),
        null !== this.gM && (this.gM(), (this.gM = null)),
        null !== this.kM && (this.kM(), (this.kM = null)),
        null !== this.xM && (this.xM(), (this.xM = null)),
        null !== this.NM && (this.NM(), (this.NM = null)),
        null !== this.yM && (this.yM(), (this.yM = null)),
        this.XM(),
        this.YM());
    }),
    (t.prototype.ZM = function (t) {
      var i = this;
      this.kM && this.kM();
      var n = this.QM.bind(this);
      if (
        ((this.kM = function () {
          i.$M.removeEventListener("mousemove", n);
        }),
        this.$M.addEventListener("mousemove", n),
        !this.zM(t))
      ) {
        var s = this.RM(t);
        (this.qM(s, this.HM.GM), (this.DM = !0));
      }
    }),
    (t.prototype.YM = function () {
      (null !== this.oM && clearTimeout(this.oM),
        (this.na = 0),
        (this.oM = null),
        (this.lM = {
          bt: Number.NEGATIVE_INFINITY,
          gt: Number.POSITIVE_INFINITY,
        }));
    }),
    (t.prototype.JM = function () {
      (null !== this.fM && clearTimeout(this.fM),
        (this.aM = 0),
        (this.fM = null),
        (this.cM = {
          bt: Number.NEGATIVE_INFINITY,
          gt: Number.POSITIVE_INFINITY,
        }));
    }),
    (t.prototype.QM = function (t) {
      if (!this.AM && null === this.wM && !this.zM(t)) {
        var i = this.RM(t);
        (this.qM(i, this.HM.tb), (this.DM = !0));
      }
    }),
    (t.prototype.ib = function (t) {
      var i = dr(t.changedTouches, F(this.FM));
      if (null !== i && ((this.PM = vr(t)), null === this.SM && !this.LM)) {
        this.TM = !0;
        var n = this.VM(cr(i), F(this.wM)),
          s = n.nb,
          h = n.sb,
          r = n.WM;
        if (this.MM || !(r < 5)) {
          if (!this.MM) {
            var e = 0.5 * s,
              u = h >= e && !this.un.hb(),
              o = e > h && !this.un.rb();
            (u || o || (this.LM = !0),
              (this.MM = !0),
              (this.mM = !0),
              this.XM(),
              this.JM());
          }
          if (!this.LM) {
            var l = this.RM(t, i);
            (this.IM(l, this.HM.eb), fr(t));
          }
        }
      }
    }),
    (t.prototype.ub = function (t) {
      if (
        0 === t.button &&
        (this.VM(cr(t), F(this._M)).WM >= 5 && ((this.bM = !0), this.YM()),
        this.bM)
      ) {
        var i = this.RM(t);
        this.qM(i, this.HM.ob);
      }
    }),
    (t.prototype.VM = function (t, i) {
      var n = Math.abs(i.bt - t.bt),
        s = Math.abs(i.gt - t.gt);
      return { nb: n, sb: s, WM: n + s };
    }),
    (t.prototype.lb = function (t) {
      var i = dr(t.changedTouches, F(this.FM));
      if (
        (null === i && 0 === t.touches.length && (i = t.changedTouches[0]),
        null !== i)
      ) {
        ((this.FM = null),
          (this.PM = vr(t)),
          this.XM(),
          (this.wM = null),
          this.NM && (this.NM(), (this.NM = null)));
        var n = this.RM(t, i);
        if ((this.IM(n, this.HM.ab), ++this.aM, this.fM && this.aM > 1))
          (this.VM(cr(i), this.cM).WM < 30 &&
            !this.mM &&
            this.IM(n, this.HM.jM),
            this.JM());
        else this.mM || (this.IM(n, this.HM.fb), this.HM.fb && fr(t));
        (0 === this.aM && fr(t),
          0 === t.touches.length && this.dM && ((this.dM = !1), fr(t)));
      }
    }),
    (t.prototype.EM = function (t) {
      if (0 === t.button) {
        var i = this.RM(t);
        if (
          ((this._M = null),
          (this.AM = !1),
          this.xM && (this.xM(), (this.xM = null)),
          er())
        )
          this.$M.ownerDocument.documentElement.removeEventListener(
            "mouseleave",
            this.BM,
          );
        if (!this.zM(t))
          if ((this.qM(i, this.HM.cb), ++this.na, this.oM && this.na > 1))
            (this.VM(cr(t), this.lM).WM < 5 &&
              !this.bM &&
              this.qM(i, this.HM.UM),
              this.YM());
          else this.bM || this.qM(i, this.HM._b);
      }
    }),
    (t.prototype.XM = function () {
      null !== this.vM && (clearTimeout(this.vM), (this.vM = null));
    }),
    (t.prototype.wb = function (t) {
      if (null === this.FM) {
        var i = t.changedTouches[0];
        ((this.FM = i.identifier), (this.PM = vr(t)));
        var n = this.$M.ownerDocument.documentElement;
        ((this.mM = !1),
          (this.MM = !1),
          (this.LM = !1),
          (this.wM = cr(i)),
          this.NM && (this.NM(), (this.NM = null)));
        var s = this.ib.bind(this),
          h = this.lb.bind(this);
        ((this.NM = function () {
          (n.removeEventListener("touchmove", s),
            n.removeEventListener("touchend", h));
        }),
          n.addEventListener("touchmove", s, { passive: !1 }),
          n.addEventListener("touchend", h, { passive: !1 }),
          this.XM(),
          (this.vM = setTimeout(this.Mb.bind(this, t), 240)));
        var r = this.RM(t, i);
        (this.IM(r, this.HM.bb),
          this.fM ||
            ((this.aM = 0),
            (this.fM = setTimeout(this.JM.bind(this), 500)),
            (this.cM = cr(i))));
      }
    }),
    (t.prototype.mb = function (t) {
      if (0 === t.button) {
        var i = this.$M.ownerDocument.documentElement;
        (er() && i.addEventListener("mouseleave", this.BM),
          (this.bM = !1),
          (this._M = cr(t)),
          this.xM && (this.xM(), (this.xM = null)));
        var n = this.ub.bind(this),
          s = this.EM.bind(this);
        if (
          ((this.xM = function () {
            (i.removeEventListener("mousemove", n),
              i.removeEventListener("mouseup", s));
          }),
          i.addEventListener("mousemove", n),
          i.addEventListener("mouseup", s),
          (this.AM = !0),
          !this.zM(t))
        ) {
          var h = this.RM(t);
          (this.qM(h, this.HM.pb),
            this.oM ||
              ((this.na = 0),
              (this.oM = setTimeout(this.YM.bind(this), 500)),
              (this.lM = cr(t))));
        }
      }
    }),
    (t.prototype.KM = function () {
      var t = this;
      (this.$M.addEventListener("mouseenter", this.ZM.bind(this)),
        this.$M.addEventListener("touchcancel", this.XM.bind(this)));
      var i = this.$M.ownerDocument,
        n = function (i) {
          t.HM.gb && ((i.target && t.$M.contains(i.target)) || t.HM.gb());
        };
      ((this.gM = function () {
        i.removeEventListener("touchstart", n);
      }),
        (this.pM = function () {
          i.removeEventListener("mousedown", n);
        }),
        i.addEventListener("mousedown", n),
        i.addEventListener("touchstart", n, { passive: !0 }),
        ur() &&
          ((this.yM = function () {
            t.$M.removeEventListener("dblclick", t.OM);
          }),
          this.$M.addEventListener("dblclick", this.OM)),
        this.$M.addEventListener("mouseleave", this.yb.bind(this)),
        this.$M.addEventListener("touchstart", this.wb.bind(this), {
          passive: !0,
        }),
        or(this.$M),
        this.$M.addEventListener("mousedown", this.mb.bind(this)),
        this.kb(),
        this.$M.addEventListener("touchmove", function () {}, { passive: !1 }));
    }),
    (t.prototype.kb = function () {
      var t = this;
      (void 0 === this.HM.xb &&
        void 0 === this.HM.Nb &&
        void 0 === this.HM.Sb) ||
        (this.$M.addEventListener(
          "touchstart",
          function (i) {
            return t.Cb(i.touches);
          },
          { passive: !0 },
        ),
        this.$M.addEventListener(
          "touchmove",
          function (i) {
            if (2 === i.touches.length && null !== t.SM && void 0 !== t.HM.Nb) {
              var n = ar(i.touches[0], i.touches[1]) / t.CM;
              (t.HM.Nb(t.SM, n), fr(i));
            }
          },
          { passive: !1 },
        ),
        this.$M.addEventListener("touchend", function (i) {
          t.Cb(i.touches);
        }));
    }),
    (t.prototype.Cb = function (t) {
      (1 === t.length && (this.TM = !1),
        2 !== t.length || this.TM || this.dM ? this.Tb() : this.Lb(t));
    }),
    (t.prototype.Lb = function (t) {
      var i = this.$M.getBoundingClientRect() || { left: 0, top: 0 };
      ((this.SM = {
        bt: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
        gt: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2,
      }),
        (this.CM = ar(t[0], t[1])),
        void 0 !== this.HM.xb && this.HM.xb(),
        this.XM());
    }),
    (t.prototype.Tb = function () {
      null !== this.SM &&
        ((this.SM = null), void 0 !== this.HM.Sb && this.HM.Sb());
    }),
    (t.prototype.yb = function (t) {
      if ((this.kM && this.kM(), !this.zM(t) && this.DM)) {
        var i = this.RM(t);
        (this.qM(i, this.HM.Ab), (this.DM = !ur()));
      }
    }),
    (t.prototype.Mb = function (t) {
      var i = dr(t.touches, F(this.FM));
      if (null !== i) {
        var n = this.RM(t, i);
        (this.IM(n, this.HM.Pb), (this.mM = !0), (this.dM = !0));
      }
    }),
    (t.prototype.zM = function (t) {
      return t.sourceCapabilities &&
        void 0 !== t.sourceCapabilities.firesTouchEvents
        ? t.sourceCapabilities.firesTouchEvents
        : vr(t) < this.PM + 500;
    }),
    (t.prototype.IM = function (t, i) {
      i && i.call(this.HM, t);
    }),
    (t.prototype.qM = function (t, i) {
      i && i.call(this.HM, t);
    }),
    (t.prototype.RM = function (t, i) {
      var n = i || t,
        s = this.$M.getBoundingClientRect() || { left: 0, top: 0 };
      return {
        Fb: n.clientX,
        Db: n.clientY,
        Bb: n.pageX,
        Eb: n.pageY,
        Ob: n.screenX,
        zb: n.screenY,
        Rb: n.clientX - s.left,
        Wb: n.clientY - s.top,
        Vb: t.ctrlKey,
        Ib: t.altKey,
        fl: t.shiftKey,
        jb: t.metaKey,
        Hb:
          !t.type.startsWith("mouse") &&
          "contextmenu" !== t.type &&
          "click" !== t.type,
        Jb: t.type,
        qb: n.target,
        Ub: t.view,
        Yb: function () {
          "touchstart" !== t.type && fr(t);
        },
      };
    }),
    t
  );
})();
function ar(t, i) {
  var n = t.clientX - i.clientX,
    s = t.clientY - i.clientY;
  return Math.sqrt(n * n + s * s);
}
function fr(t) {
  t.cancelable && t.preventDefault();
}
function cr(t) {
  return { bt: t.pageX, gt: t.pageY };
}
function vr(t) {
  return t.timeStamp || performance.now();
}
function dr(t, i) {
  for (var n = 0; n < t.length; ++n) if (t[n].identifier === i) return t[n];
  return null;
}
var _r = (function () {
    function t(t, i, n, s) {
      ((this.Ef = new qs(200)),
        (this.X = 0),
        (this.$b = ""),
        (this.wc = ""),
        (this.Pf = []),
        (this.Kb = new Map()),
        (this.X = t),
        (this.$b = i),
        (this.wc = ht(t, n, s)));
    }
    return (
      (t.prototype.D = function () {
        (this.Ef.Ff(), (this.Pf = []), this.Kb.clear());
      }),
      (t.prototype.Xb = function (t, i, n, s, h) {
        var r = this.Zb(t, i);
        if ("left" !== h) {
          var e = Qh(t.canvas);
          n -= Math.floor(r.Qb * e);
        }
        ((s -= Math.floor(r.li / 2)), t.drawImage(r.Gb, n, s, r.oi, r.li));
      }),
      (t.prototype.Zb = function (t, i) {
        var n,
          s = this;
        if (this.Kb.has(i)) n = P(this.Kb.get(i));
        else {
          if (this.Pf.length >= 200) {
            var h = P(this.Pf.shift());
            this.Kb.delete(h);
          }
          var r = Qh(t.canvas),
            e = Math.ceil(this.X / 4.5),
            u = Math.round(this.X / 10),
            o = Math.ceil(this.Ef.Mi(t, i)),
            l = Di(Math.round(o + 2 * e)),
            a = Di(this.X + 2 * e),
            f = tr(document, new Zh(l, a));
          ((n = {
            wi: i,
            Qb: Math.round(Math.max(1, o)),
            oi: Math.ceil(l * r),
            li: Math.ceil(a * r),
            Gb: f,
          }),
            0 !== o && (this.Pf.push(n.wi), this.Kb.set(n.wi, n)),
            _t((t = Gh(n.Gb)), r, function () {
              ((t.font = s.wc),
                (t.fillStyle = s.$b),
                t.fillText(i, 0, a - e - u));
            }));
        }
        return n;
      }),
      t
    );
  })(),
  wr = (function () {
    function t(t, i, n, s) {
      var h = this;
      ((this.Fi = null),
        (this.tm = null),
        (this.im = !1),
        (this.nm = new qs(50)),
        (this.sm = new _r(11, "#000")),
        (this.$b = null),
        (this.wc = null),
        (this.hm = 0),
        (this.rm = !1),
        (this.um = function () {
          (h.om(h.G_.K()), h.rm || h.Xi.lm().ri().oo());
        }),
        (this.am = function () {
          h.rm || h.Xi.lm().ri().oo();
        }),
        (this.Xi = t),
        (this.un = i),
        (this.G_ = n),
        (this.fm = "left" === s),
        (this.vm = document.createElement("div")),
        (this.vm.style.height = "100%"),
        (this.vm.style.overflow = "hidden"),
        (this.vm.style.width = "25px"),
        (this.vm.style.left = "0"),
        (this.vm.style.position = "relative"),
        (this.dm = ir(this.vm, new Zh(16, 16))),
        this.dm.subscribeCanvasConfigured(this.um));
      var r = this.dm.canvas;
      ((r.style.position = "absolute"),
        (r.style.zIndex = "1"),
        (r.style.left = "0"),
        (r.style.top = "0"),
        (this._m = ir(this.vm, new Zh(16, 16))),
        this._m.subscribeCanvasConfigured(this.am));
      var e = this._m.canvas;
      ((e.style.position = "absolute"),
        (e.style.zIndex = "2"),
        (e.style.left = "0"),
        (e.style.top = "0"));
      var u = {
        pb: this.wm.bind(this),
        bb: this.wm.bind(this),
        ob: this.Mm.bind(this),
        eb: this.Mm.bind(this),
        gb: this.bm.bind(this),
        cb: this.pm.bind(this),
        ab: this.pm.bind(this),
        UM: this.gm.bind(this),
        jM: this.gm.bind(this),
        GM: this.ym.bind(this),
        Ab: this.km.bind(this),
      };
      this.xm = new lr(this._m.canvas, u, {
        hb: function () {
          return !1;
        },
        rb: function () {
          return !0;
        },
      });
    }
    return (
      (t.prototype.D = function () {
        (this.xm.D(),
          this._m.unsubscribeCanvasConfigured(this.am),
          this._m.destroy(),
          this.dm.unsubscribeCanvasConfigured(this.um),
          this.dm.destroy(),
          null !== this.Fi && this.Fi.Xe().A(this),
          (this.Fi = null),
          this.sm.D());
      }),
      (t.prototype.Nm = function () {
        return this.vm;
      }),
      (t.prototype.xt = function () {
        return F(this.Fi).K().borderColor;
      }),
      (t.prototype.Sm = function () {
        return this.un.textColor;
      }),
      (t.prototype.W = function () {
        return this.un.fontSize;
      }),
      (t.prototype.Cm = function () {
        return ht(this.W(), this.un.fontFamily);
      }),
      (t.prototype.Tm = function () {
        var t = this.G_.K(),
          i = this.$b !== t.j,
          n = this.wc !== t.V;
        return (
          (i || n) && (this.om(t), (this.$b = t.j)),
          n && (this.nm.Ff(), (this.wc = t.V)),
          t
        );
      }),
      (t.prototype.Lm = function () {
        if (null === this.Fi) return 0;
        var t = 0,
          i = this.Tm(),
          n = Gh(this.dm.canvas),
          s = this.Fi.dr();
        ((n.font = this.Cm()),
          s.length > 0 &&
            (t = Math.max(
              this.nm.Mi(n, s[0].Jr),
              this.nm.Mi(n, s[s.length - 1].Jr),
            )));
        for (var h = this.Am(), r = h.length; r--; ) {
          var e = this.nm.Mi(n, h[r].wi());
          e > t && (t = e);
        }
        var u = this.Fi.Vt();
        if (null !== u && null !== this.tm) {
          var o = this.Fi.cn(1, u),
            l = this.Fi.cn(this.tm.Qt - 2, u);
          t = Math.max(
            t,
            this.nm.Mi(
              n,
              this.Fi.Bi(Math.floor(Math.min(o, l)) + 0.11111111111111, u),
            ),
            this.nm.Mi(
              n,
              this.Fi.Bi(Math.ceil(Math.max(o, l)) - 0.11111111111111, u),
            ),
          );
        }
        var a = t || 34,
          f = Math.ceil(i.O + i.R + i.J + i.q + a);
        return (f += f % 2);
      }),
      (t.prototype.Pm = function (t) {
        if (t.Zt < 0 || t.Qt < 0)
          throw new Error(
            "Try to set invalid size to PriceAxisWidget " + JSON.stringify(t),
          );
        (null !== this.tm && this.tm.yr(t)) ||
          ((this.tm = t),
          (this.rm = !0),
          this.dm.resizeCanvas({ width: t.Zt, height: t.Qt }),
          this._m.resizeCanvas({ width: t.Zt, height: t.Qt }),
          (this.rm = !1),
          (this.vm.style.width = t.Zt + "px"),
          (this.vm.style.height = t.Qt + "px"),
          (this.vm.style.minWidth = t.Zt + "px"));
      }),
      (t.prototype.Fm = function () {
        return F(this.tm).Zt;
      }),
      (t.prototype.$i = function (t) {
        this.Fi !== t &&
          (null !== this.Fi && this.Fi.Xe().A(this),
          (this.Fi = t),
          t.Xe().N(this.ne.bind(this), this));
      }),
      (t.prototype.Ht = function () {
        return this.Fi;
      }),
      (t.prototype.Ff = function () {
        var t = this.Xi.Js();
        this.Xi.lm().ri().ro(t, F(this.Ht()));
      }),
      (t.prototype.Dm = function (t) {
        if (null !== this.tm) {
          if (1 !== t) {
            var i = Gh(this.dm.canvas);
            (this.Bm(),
              this.Cl(i, this.dm.pixelRatio),
              this.Tl(i, this.dm.pixelRatio),
              this.Em(i, this.dm.pixelRatio),
              this.Om(i, this.dm.pixelRatio));
          }
          var n = Gh(this._m.canvas),
            s = this.tm.Zt,
            h = this.tm.Qt;
          (_t(n, this._m.pixelRatio, function () {
            n.clearRect(0, 0, s, h);
          }),
            this.zm(n, this._m.pixelRatio));
        }
      }),
      (t.prototype.Rm = function () {
        return this.dm.canvas;
      }),
      (t.prototype.Ft = function () {
        var t;
        (t = this.Fi) != null && t.dr();
      }),
      (t.prototype.wm = function (t) {
        if (
          null !== this.Fi &&
          !this.Fi.et() &&
          this.Xi.lm().K().handleScale.axisPressedMouseMove.price
        ) {
          var i = this.Xi.lm().ri(),
            n = this.Xi.Js();
          ((this.im = !0), i.Xu(n, this.Fi, t.Wb));
        }
      }),
      (t.prototype.Mm = function (t) {
        if (
          null !== this.Fi &&
          this.Xi.lm().K().handleScale.axisPressedMouseMove.price
        ) {
          var i = this.Xi.lm().ri(),
            n = this.Xi.Js(),
            s = this.Fi;
          i.Zu(n, s, t.Wb);
        }
      }),
      (t.prototype.bm = function () {
        if (
          null !== this.Fi &&
          this.Xi.lm().K().handleScale.axisPressedMouseMove.price
        ) {
          var t = this.Xi.lm().ri(),
            i = this.Xi.Js(),
            n = this.Fi;
          this.im && ((this.im = !1), t.Qu(i, n));
        }
      }),
      (t.prototype.pm = function (_t) {
        if (
          null !== this.Fi &&
          this.Xi.lm().K().handleScale.axisPressedMouseMove.price
        ) {
          var i = this.Xi.lm().ri(),
            n = this.Xi.Js();
          ((this.im = !1), i.Qu(n, this.Fi));
        }
      }),
      (t.prototype.gm = function (_t) {
        this.Xi.lm().K().handleScale.axisDoubleClickReset && this.Ff();
      }),
      (t.prototype.ym = function (_t) {
        null !== this.Fi &&
          (!this.Xi.lm().ri().K().handleScale.axisPressedMouseMove.price ||
            this.Fi.pe() ||
            this.Fi.ge() ||
            this.Wm(1));
      }),
      (t.prototype.km = function (_t) {
        this.Wm(0);
      }),
      (t.prototype.Am = function () {
        var t = this,
          i = [],
          n = null === this.Fi ? void 0 : this.Fi;
        return (
          (function (s) {
            for (var h = 0; h < s.length; ++h)
              for (var r = s[h].Nn(t.Xi.Js(), n), e = 0; e < r.length; e++)
                i.push(r[e]);
          })(this.Xi.Js().Je()),
          i
        );
      }),
      (t.prototype.Cl = function (t, i) {
        var n = this;
        if (null !== this.tm) {
          var s = this.tm.Zt,
            h = this.tm.Qt;
          _t(t, i, function () {
            var i = n.Xi.Js().ri(),
              r = i.Hw(),
              e = i.jw();
            r === e ? wt(t, 0, 0, s, h, r) : Mt(t, 0, 0, s, h, r, e);
          });
        }
      }),
      (t.prototype.Tl = function (t, i) {
        if (null !== this.tm && null !== this.Fi && this.Fi.K().borderVisible) {
          (t.save(), (t.fillStyle = this.xt()));
          var n,
            s = Math.max(1, Math.floor(this.Tm().O * i));
          ((n = this.fm ? Math.floor(this.tm.Zt * i) - s : 0),
            t.fillRect(n, 0, s, Math.ceil(this.tm.Qt * i)),
            t.restore());
        }
      }),
      (t.prototype.Em = function (t, i) {
        if (null !== this.tm && null !== this.Fi) {
          var n = this.Fi.dr();
          (t.save(),
            (t.strokeStyle = this.xt()),
            (t.font = this.Cm()),
            (t.fillStyle = this.xt()));
          var s = this.Tm(),
            h = this.Fi.K().borderVisible && this.Fi.K().drawTicks,
            r = this.fm
              ? Math.floor((this.tm.Zt - s.R) * i - s.O * i)
              : Math.floor(s.O * i),
            e = this.fm
              ? Math.round(r - s.J * i)
              : Math.round(r + s.R * i + s.J * i),
            u = this.fm ? "right" : "left",
            o = Math.max(1, Math.floor(i)),
            l = Math.floor(0.5 * i);
          if (h) {
            var a = Math.round(s.R * i);
            t.beginPath();
            for (var f = 0, c = n; f < c.length; f++) {
              var v = c[f];
              t.rect(r, Math.round(v.ur * i) - l, a, o);
            }
            t.fill();
          }
          t.fillStyle = this.Sm();
          for (var d = 0, _ = n; d < _.length; d++) {
            v = _[d];
            this.sm.Xb(t, v.Jr, e, Math.round(v.ur * i), u);
          }
          t.restore();
        }
      }),
      (t.prototype.Bm = function () {
        if (null !== this.tm && null !== this.Fi) {
          var t = this.tm.Qt / 2,
            i = [],
            n = this.Fi.Je().slice(),
            s = this.Xi.Js(),
            h = this.Tm();
          this.Fi === s.so() &&
            this.Xi.Js()
              .Je()
              .forEach(function (t) {
                s.Vu(t) && n.push(t);
              });
          var r = this.Fi.He()[0],
            e = this.Fi;
          n.forEach(function (n) {
            var h = n.Nn(s, e);
            (h.forEach(function (t) {
              (t.Ci(null), t.Ti() && i.push(t));
            }),
              r === n && h.length > 0 && (t = h[0].bi()));
          });
          var u = i.filter(function (i) {
              return i.bi() <= t;
            }),
            o = i.filter(function (i) {
              return i.bi() > t;
            });
          if (
            (u.sort(function (t, i) {
              return i.bi() - t.bi();
            }),
            u.length && o.length && o.push(u[0]),
            o.sort(function (t, i) {
              return t.bi() - i.bi();
            }),
            i.forEach(function (t) {
              return t.Ci(t.bi());
            }),
            this.Fi.K().alignLabels)
          ) {
            for (var l = 1; l < u.length; l++) {
              var a = u[l],
                f = (v = u[l - 1]).li(h, !1);
              a.bi() > (d = v.Si()) - f && a.Ci(d - f);
            }
            for (var c = 1; c < o.length; c++) {
              var v, d;
              ((a = o[c]), (f = (v = o[c - 1]).li(h, !0)));
              a.bi() < (d = v.Si()) + f && a.Ci(d + f);
            }
          }
        }
      }),
      (t.prototype.Om = function (t, i) {
        var n = this;
        if (null !== this.tm) {
          t.save();
          var s = this.tm,
            h = this.Am(),
            r = this.Tm(),
            e = this.fm ? "right" : "left";
          (h.forEach(function (h) {
            if (h.Li()) {
              var u = h.Bt(F(n.Fi));
              (t.save(), u.ot(t, r, n.nm, s.Zt, e, i), t.restore());
            }
          }),
            t.restore());
        }
      }),
      (t.prototype.zm = function (t, i) {
        var n = this;
        if (null !== this.tm && null !== this.Fi) {
          t.save();
          var s = this.tm,
            h = this.Xi.lm().ri(),
            r = [],
            e = this.Xi.Js(),
            u = h.Po().Nn(e, this.Fi);
          u.length && r.push(u);
          var o = this.Tm(),
            l = this.fm ? "right" : "left";
          (r.forEach(function (h) {
            h.forEach(function (h) {
              (t.save(), h.Bt(F(n.Fi)).ot(t, o, n.nm, s.Zt, l, i), t.restore());
            });
          }),
            t.restore());
        }
      }),
      (t.prototype.Wm = function (t) {
        this.vm.style.cursor = 1 === t ? "ns-resize" : "default";
      }),
      (t.prototype.ne = function () {
        var t = this.Lm();
        (this.hm < t && this.Xi.lm().ri().Av(), (this.hm = t));
      }),
      (t.prototype.om = function (t) {
        (this.sm.D(), (this.sm = new _r(t.W, t.j, t.I)));
      }),
      t
    );
  })();
function Mr(t, i, n, s, h) {
  t.ct && t.ct(i, n, s, h);
}
function br(t, i, n, s, h) {
  t.ot(i, n, s, h);
}
function mr(t, i) {
  return t.xn(i);
}
function pr(t, i) {
  return void 0 !== t.Wv ? t.Wv(i) : [];
}
var gr = (function () {
    function t(t, i) {
      var n = this;
      ((this.tm = new Zh(0, 0)),
        (this.Vm = null),
        (this.Im = null),
        (this.jm = null),
        (this.Hm = !1),
        (this.Jm = new $()),
        (this.qm = 0),
        (this.Um = !1),
        (this.Ym = null),
        (this.$m = !1),
        (this.Km = null),
        (this.Xm = null),
        (this.rm = !1),
        (this.um = function () {
          n.rm || null === n.Zm || n.zi().oo();
        }),
        (this.am = function () {
          n.rm || null === n.Zm || n.zi().oo();
        }),
        (this.Qm = t),
        (this.Zm = i),
        this.Zm.lo().N(this.Gm.bind(this), this, !0),
        (this.tp = document.createElement("td")),
        (this.tp.style.padding = "0"),
        (this.tp.style.position = "relative"));
      var s = document.createElement("div");
      ((s.style.width = "100%"),
        (s.style.height = "100%"),
        (s.style.position = "relative"),
        (s.style.overflow = "hidden"),
        (this.ip = document.createElement("td")),
        (this.ip.style.padding = "0"),
        (this.np = document.createElement("td")),
        (this.np.style.padding = "0"),
        this.tp.appendChild(s),
        (this.dm = ir(s, new Zh(16, 16))),
        this.dm.subscribeCanvasConfigured(this.um));
      var h = this.dm.canvas;
      ((h.style.position = "absolute"),
        (h.style.zIndex = "1"),
        (h.style.left = "0"),
        (h.style.top = "0"),
        (this._m = ir(s, new Zh(16, 16))),
        this._m.subscribeCanvasConfigured(this.am));
      var r = this._m.canvas;
      ((r.style.position = "absolute"),
        (r.style.zIndex = "2"),
        (r.style.left = "0"),
        (r.style.top = "0"),
        (this.sp = document.createElement("tr")),
        this.sp.appendChild(this.ip),
        this.sp.appendChild(this.tp),
        this.sp.appendChild(this.np),
        this.hp(),
        (this.xm = new lr(this._m.canvas, this, {
          hb: function () {
            return null === n.Ym && !n.Qm.K().handleScroll.vertTouchDrag;
          },
          rb: function () {
            return null === n.Ym && !n.Qm.K().handleScroll.horzTouchDrag;
          },
        })));
    }
    return (
      (t.prototype.D = function () {
        (null !== this.Vm && this.Vm.D(),
          null !== this.Im && this.Im.D(),
          this._m.unsubscribeCanvasConfigured(this.am),
          this._m.destroy(),
          this.dm.unsubscribeCanvasConfigured(this.um),
          this.dm.destroy(),
          null !== this.Zm && this.Zm.lo().A(this),
          this.xm.D());
      }),
      (t.prototype.Js = function () {
        return F(this.Zm);
      }),
      (t.prototype.rp = function (i) {
        (null !== this.Zm && this.Zm.lo().A(this),
          (this.Zm = i),
          null !== this.Zm &&
            this.Zm.lo().N(t.prototype.Gm.bind(this), this, !0),
          this.hp());
      }),
      (t.prototype.Xo = function (t) {
        var i = t.toString();
        this.tp.style.cursor !== i && (this.tp.style.cursor = i);
      }),
      (t.prototype.lm = function () {
        return this.Qm;
      }),
      (t.prototype.Nm = function () {
        return this.sp;
      }),
      (t.prototype.hp = function () {
        if (null !== this.Zm && (this.ep(), 0 !== this.zi().Dt().length)) {
          if (null !== this.Vm) {
            var t = this.Zm.Ku();
            this.Vm.$i(F(t));
          }
          if (null !== this.Im) {
            var i = this.Zm.Us();
            this.Im.$i(F(i));
          }
        }
      }),
      (t.prototype.up = function () {
        (null !== this.Vm && this.Vm.Ft(), null !== this.Im && this.Im.Ft());
      }),
      (t.prototype.Ou = function () {
        return null !== this.Zm ? this.Zm.Ou() : 0;
      }),
      (t.prototype.zu = function (t) {
        this.Zm && this.Zm.zu(t);
      }),
      (t.prototype.GM = function (t) {
        if (this.Zm) {
          this.op();
          var i = t.Rb,
            n = t.Wb;
          this.lp(i, n);
        }
      }),
      (t.prototype.pb = function (t) {
        (this.op(), this.ap(), this.lp(t.Rb, t.Wb), this.fp(6, t));
      }),
      (t.prototype.tb = function (t) {
        if (this.Zm) {
          var i = t.Rb,
            n = t.Wb;
          (this.cp() && this.vp(), this.lp(i, n), this.fp(9, t));
        }
      }),
      (t.prototype._b = function (t) {
        if (null !== this.Zm) {
          (this.op(), this.fp(3, t));
          var i = t.Rb,
            n = t.Wb;
          if (this.Jm.F()) {
            var s = this.zi().Po().Ot();
            this.Jm.P(s, new h(i, n));
          }
          this.dp();
        }
      }),
      (t.prototype.UM = function (t) {
        if (null !== this.Zm) {
          (this.op(), this.fp(4, t));
          var i = this.Js().Yu();
          if (i.length > 0) {
            var n = i[0];
            if (n.ih()) n.nh(!1);
            else {
              var s = tt(i[0].dh());
              this.zi().Ew(s);
            }
          }
        }
      }),
      (t.prototype.ob = function (t) {
        this._p(t);
      }),
      (t.prototype.cb = function (t) {
        null !== this.Zm &&
          (this.op(), this.fp(10, t), (this.Um = !1), this.wp(t));
      }),
      (t.prototype.Pb = function (t) {
        if (((this.Um = !0), null === this.Ym)) {
          var i = new h(t.Rb, t.Wb);
          this.Mp(i, i);
        }
      }),
      (t.prototype.Ab = function (_t) {
        null !== this.Zm && (this.op(), this.Zm.ri().aw(null), this.vp());
      }),
      (t.prototype.bp = function () {
        return this.Jm;
      }),
      (t.prototype.xb = function () {
        ((this.qm = 1), this.mp());
      }),
      (t.prototype.Nb = function (t, i) {
        if (this.Qm.K().handleScale.pinch) {
          var n = 5 * (i - this.qm);
          ((this.qm = i), this.zi().xw(t.bt, n));
        }
      }),
      (t.prototype.bb = function (t) {
        if (
          ((this.Um = !1),
          (this.$m = null !== this.Ym),
          this.ap(),
          this.fp(6, t),
          null !== this.Ym)
        ) {
          var i = this.zi().Po();
          ((this.Km = new h(i.ai(), i.fi())), (this.Ym = new h(t.Rb, t.Wb)));
        }
      }),
      (t.prototype.eb = function (t) {
        if (null !== this.Zm) {
          var i = t.Rb,
            n = t.Wb;
          if (null !== this.Ym) {
            this.$m = !1;
            var s = F(this.Km),
              h = s.x + (i - this.Ym.x),
              r = s.y + (n - this.Ym.y);
            this.lp(h, r);
          } else this.cp() || this.lp(i, n);
          this._p(t);
        }
      }),
      (t.prototype.ab = function (t) {
        (0 === this.lm().K().trackingMode.exitMode && (this.$m = !0),
          this.fp(10, t),
          this.dp(),
          this.wp(t));
      }),
      (t.prototype.pp = function (t, i) {
        F("left" === i ? this.Vm : this.Im).Pm(new Zh(t, this.tm.Qt));
      }),
      (t.prototype.gp = function () {
        return this.tm;
      }),
      (t.prototype.Pm = function (t) {
        if (t.Zt < 0 || t.Qt < 0)
          throw new Error(
            "Try to set invalid size to PaneWidget " + JSON.stringify(t),
          );
        this.tm.yr(t) ||
          ((this.tm = t),
          (this.rm = !0),
          this.dm.resizeCanvas({ width: t.Zt, height: t.Qt }),
          this._m.resizeCanvas({ width: t.Zt, height: t.Qt }),
          (this.rm = !1),
          (this.tp.style.width = t.Zt + "px"),
          (this.tp.style.height = t.Qt + "px"));
      }),
      (t.prototype.yp = function () {
        var t = F(this.Zm);
        (t.Ju(t.Ku()), t.Ju(t.Us()));
        for (var i = 0, n = t.He(); i < n.length; i++) {
          var s = n[i];
          if (t.Vu(s)) {
            var h = s.Ht();
            (null !== h && t.Ju(h), s.Cn());
          }
        }
      }),
      (t.prototype.Rm = function () {
        return this.dm.canvas;
      }),
      (t.prototype.Dm = function (t) {
        if (0 !== t && null !== this.Zm) {
          if (
            (t > 1 && this.yp(),
            null !== this.Vm && this.Vm.Dm(t),
            null !== this.Im && this.Im.Dm(t),
            1 !== t)
          ) {
            var i = Gh(this.dm.canvas);
            (i.save(),
              this.Cl(i, this.dm.pixelRatio),
              this.Zm &&
                (this.kp(i, this.dm.pixelRatio),
                this.xp(i, this.dm.pixelRatio),
                this.Np(i, this.dm.pixelRatio, mr)),
              i.restore());
          }
          var n = Gh(this._m.canvas);
          (n.clearRect(
            0,
            0,
            Math.ceil(this.tm.Zt * this._m.pixelRatio),
            Math.ceil(this.tm.Qt * this._m.pixelRatio),
          ),
            this.Np(n, this.dm.pixelRatio, pr),
            this.Sp(n, this._m.pixelRatio));
        }
      }),
      (t.prototype.Cp = function () {
        return this.Vm;
      }),
      (t.prototype.Tp = function () {
        return this.Im;
      }),
      (t.prototype.Lp = function (t, i) {
        this.zi().Pw(this.Ap(t), this.Pp(i), F(this.Zm));
      }),
      (t.prototype.Fp = function (t, i, n) {
        if (this.Zm)
          if (n) {
            var s = t,
              h = i;
            this.Dp(s, h);
          } else (this.Zm.ri().aw(null), this.vp());
      }),
      (t.prototype.Bp = function () {
        this.vp();
      }),
      (t.prototype.fp = function (t, i) {
        var n = this;
        if (null !== this.Zm) {
          this.Xo(Ki.du);
          var s = Gh(this.Rm());
          this.zi().Mw().Ao(this, s, t, i);
          for (var h = this.Zm.Je(), r = h.length - 1; r >= 0; r--) {
            var e = this.zi().ul(h[r]);
            if (null !== e)
              h[r].xn(e).forEach(function (h) {
                void 0 !== h.Ao && h.Ao(n, s, t, i);
              });
          }
        }
      }),
      (t.prototype.Gm = function () {
        (null !== this.Zm && this.Zm.lo().A(this), (this.Zm = null));
      }),
      (t.prototype.Cl = function (t, i) {
        var n = this;
        _t(t, i, function () {
          var i = n.zi(),
            s = i.Hw(),
            h = i.jw();
          s === h
            ? wt(t, 0, 0, n.tm.Zt, n.tm.Qt, h)
            : Mt(t, 0, 0, n.tm.Zt, n.tm.Qt, s, h);
        });
      }),
      (t.prototype.kp = function (t, i) {
        var n = F(this.Zm),
          s = n.ao()._r().Bt(n.li(), n.oi());
        null !== s && (t.save(), s.ot(t, i, !1), t.restore());
      }),
      (t.prototype.xp = function (t, i) {
        var n = this.zi().ww();
        (this.Ep(t, i, mr, Mr, n), this.Ep(t, i, mr, br, n));
      }),
      (t.prototype.Sp = function (t, i) {
        this.Ep(t, i, mr, br, this.zi().Po());
      }),
      (t.prototype.Np = function (t, i, n) {
        for (var s = F(this.Zm).Je(), h = 0, r = s; h < r.length; h++) {
          var e = r[h];
          this.Ep(t, i, n, Mr, e);
        }
        for (var u = 0, o = s; u < o.length; u++) {
          e = o[u];
          this.Ep(t, i, n, br, e);
        }
      }),
      (t.prototype.Ep = function (t, i, n, s, h) {
        for (
          var r = F(this.Zm),
            e = n(h, r),
            u = r.li(),
            o = r.oi(),
            l = r.ri().lw(),
            a = null !== l && l.fw === h,
            f = null !== l && a && void 0 !== l.Op ? l.Op.zp : void 0,
            c = 0,
            v = e;
          c < v.length;
          c++
        ) {
          var d = v[c].Bt(u, o);
          null !== d && (t.save(), s(d, t, i, a, f), t.restore());
        }
      }),
      (t.prototype.ep = function () {
        if (null !== this.Zm) {
          var t = this.Qm,
            i = this.Zm.Ku().K().visible,
            n = this.Zm.Us().K().visible;
          (i ||
            null === this.Vm ||
            (this.ip.removeChild(this.Vm.Nm()), this.Vm.D(), (this.Vm = null)),
            n ||
              null === this.Im ||
              (this.np.removeChild(this.Im.Nm()),
              this.Im.D(),
              (this.Im = null)));
          var s = t.ri().Ow();
          (i &&
            null === this.Vm &&
            ((this.Vm = new wr(this, t.K().layout, s, "left")),
            this.ip.appendChild(this.Vm.Nm())),
            n &&
              null === this.Im &&
              ((this.Im = new wr(this, t.K().layout, s, "right")),
              this.np.appendChild(this.Im.Nm())));
        }
      }),
      (t.prototype.cp = function () {
        return null === this.Ym;
      }),
      (t.prototype.Rp = function (t) {
        return (t.Hb && this.Um) || null !== this.Ym;
      }),
      (t.prototype.Ap = function (t) {
        return Math.max(0, Math.min(t, this.tm.Zt - 1));
      }),
      (t.prototype.Pp = function (t) {
        return Math.max(0, Math.min(t, this.tm.Qt - 1));
      }),
      (t.prototype.lp = function (t, i) {
        this.zi().Pw(this.Ap(t), this.Pp(i), F(this.Zm));
      }),
      (t.prototype.vp = function () {
        this.zi().Fw();
      }),
      (t.prototype.Dp = function (t, i) {
        this.zi().Dw(this.Ap(t), this.Pp(i), !1, F(this.Zm));
      }),
      (t.prototype.dp = function () {
        this.$m && ((this.Ym = null), this.vp());
      }),
      (t.prototype.Mp = function (t, i) {
        ((this.Ym = t), (this.$m = !1), this.lp(i.x, i.y));
        var n = this.zi().Po();
        this.Km = new h(n.ai(), n.fi());
      }),
      (t.prototype.zi = function () {
        return this.Qm.ri();
      }),
      (t.prototype.Wp = function () {
        var t = this.zi(),
          i = this.Js(),
          n = i.fn();
        (t.no(i, n), t.Tw(), (this.jm = null), (this.Hm = !1));
      }),
      (t.prototype.wp = function (t) {
        var i = this;
        if (this.Hm) {
          var n = performance.now();
          if (
            (null !== this.Xm && this.Xm.Yf(t.Rb, n),
            null === this.Xm || this.Xm.Fs(n))
          )
            this.Wp();
          else {
            var s = this.zi(),
              h = s.zt(),
              r = this.Xm,
              e = function () {
                if (!r.eM()) {
                  var t = performance.now(),
                    n = r.Fs(t);
                  if (!r.eM()) {
                    var u = h.f_();
                    (s.Cw(r.hM(t)), u === h.f_() && ((n = !0), (i.Xm = null)));
                  }
                  n ? i.Wp() : requestAnimationFrame(e);
                }
              };
            requestAnimationFrame(e);
          }
        }
      }),
      (t.prototype.op = function () {
        this.Ym = null;
      }),
      (t.prototype.ap = function () {
        if (this.Zm) {
          if (
            (this.mp(),
            document.activeElement !== document.body &&
              document.activeElement !== document.documentElement)
          )
            F(document.activeElement).blur();
          else {
            var t = document.getSelection();
            null !== t && t.removeAllRanges();
          }
          !this.Zm.fn().et() && this.zi().zt().et();
        }
      }),
      (t.prototype._p = function (t) {
        if (null !== this.Zm) {
          var i = this.zi(),
            n = t.Rb,
            s = t.Wb;
          if (null !== this.Ym) {
            this.$m = !1;
            var r = F(this.Km),
              e = r.x + (n - this.Ym.x),
              u = r.y + (s - this.Ym.y);
            this.lp(e, u);
          } else this.lp(n, s);
          if ((null === this.jm && this.fp(11, t), !i.zt().et() && !t.Fo)) {
            var o = this.Qm.K(),
              l = o.handleScroll,
              a = o.kineticScroll;
            if (
              (l.pressedMouseMove && !t.Hb) ||
              ((l.horzTouchDrag || l.vertTouchDrag) && t.Hb)
            ) {
              var f = this.Zm.fn(),
                c = performance.now();
              (null !== this.jm ||
                this.Rp(t) ||
                ((this.jm = new h(t.Fb, t.Db)),
                (this.jm.Fl = c),
                (this.jm.Rb = t.Rb),
                (this.jm.Wb = t.Wb)),
                null !== this.Xm && this.Xm.sM(t.Rb, c),
                null === this.jm ||
                  this.Hm ||
                  (this.jm.x === t.Fb && this.jm.y === t.Db) ||
                  (null === this.Xm &&
                    ((t.Hb && a.touch) || (!t.Hb && a.mouse)) &&
                    ((this.Xm = new hr(0.2, 7, 0.997, 15)),
                    this.Xm.sM(this.jm.Rb, this.jm.Fl),
                    this.Xm.sM(t.Rb, c)),
                  !f.et() && f.me() && f.we({ zn: !1 }),
                  f.et() || i.Gu(this.Zm, f, t.Wb),
                  i.Sw(t.Rb),
                  (this.Hm = !0)),
                this.Hm &&
                  (null !== this.jm &&
                    (!f.et() && f.me() && f.we({ zn: !1 }),
                    i.Gu(this.Zm, f, this.jm.Wb),
                    f.et() || i.io(this.Zm, f, t.Wb)),
                  i.Cw(t.Rb)));
            }
          }
        }
      }),
      (t.prototype.mp = function () {
        var t = performance.now(),
          i = null === this.Xm || this.Xm.Fs(t);
        (null !== this.Xm && (i || this.Wp()),
          null !== this.Xm && (this.Xm.uM(), (this.Xm = null)));
      }),
      t
    );
  })(),
  yr = (function () {
    function t(t, i, n, s, h) {
      var r = this;
      ((this.At = !0),
        (this.tm = new Zh(0, 0)),
        (this.um = function () {
          return r.Dm(3);
        }),
        (this.fm = "left" === t),
        (this.G_ = n.Ow),
        (this.un = i),
        (this.Vp = s),
        (this.Ip = h),
        (this.vm = document.createElement("div")),
        (this.vm.style.width = "25px"),
        (this.vm.style.height = "100%"),
        (this.vm.style.overflow = "hidden"),
        (this.dm = ir(this.vm, new Zh(16, 16))),
        this.dm.subscribeCanvasConfigured(this.um));
    }
    return (
      (t.prototype.D = function () {
        (this.dm.unsubscribeCanvasConfigured(this.um), this.dm.destroy());
      }),
      (t.prototype.Nm = function () {
        return this.vm;
      }),
      (t.prototype.gp = function () {
        return this.tm;
      }),
      (t.prototype.Pm = function (t) {
        if (t.Zt < 0 || t.Qt < 0)
          throw new Error(
            "Try to set invalid size to PriceAxisStub " + JSON.stringify(t),
          );
        this.tm.yr(t) ||
          ((this.tm = t),
          this.dm.resizeCanvas({ width: t.Zt, height: t.Qt }),
          (this.vm.style.width = "".concat(t.Zt, "px")),
          (this.vm.style.minWidth = "".concat(t.Zt, "px")),
          (this.vm.style.height = "".concat(t.Qt, "px")),
          (this.At = !0));
      }),
      (t.prototype.Dm = function (t) {
        if ((!(t < 3) || this.At) && 0 !== this.tm.Zt && 0 !== this.tm.Qt) {
          this.At = !1;
          var i = Gh(this.dm.canvas);
          (this.Cl(i, this.dm.pixelRatio), this.Tl(i, this.dm.pixelRatio));
        }
      }),
      (t.prototype.Rm = function () {
        return this.dm.canvas;
      }),
      (t.prototype.Tl = function (t, i) {
        if (this.Vp()) {
          var n = this.tm.Zt;
          (t.save(), (t.fillStyle = this.un.timeScale.borderColor));
          var s = Math.floor(this.G_.K().O * i),
            h = this.fm ? Math.round(n * i) - s : 0;
          (t.fillRect(h, 0, s, s), t.restore());
        }
      }),
      (t.prototype.Cl = function (t, i) {
        var n = this;
        _t(t, i, function () {
          wt(t, 0, 0, n.tm.Zt, n.tm.Qt, n.Ip());
        });
      }),
      t
    );
  })();
function kr(t, i) {
  return t.yd > i.yd ? t : i;
}
var xr = (function () {
    function t(t) {
      var i = this;
      ((this.jp = null),
        (this.Hp = null),
        (this.B = null),
        (this.Jp = !1),
        (this.tm = new Zh(0, 0)),
        (this.qp = new $()),
        (this.nm = new qs(5)),
        (this.rm = !1),
        (this.um = function () {
          i.rm || i.Qm.ri().oo();
        }),
        (this.am = function () {
          i.rm || i.Qm.ri().oo();
        }),
        (this.Qm = t),
        (this.un = t.K().layout),
        (this.Up = document.createElement("tr")),
        (this.Yp = document.createElement("td")),
        (this.Yp.style.padding = "0"),
        (this.$p = document.createElement("td")),
        (this.$p.style.padding = "0"),
        (this.vm = document.createElement("td")),
        (this.vm.style.height = "25px"),
        (this.vm.style.padding = "0"),
        (this.Kp = document.createElement("div")),
        (this.Kp.style.width = "100%"),
        (this.Kp.style.height = "100%"),
        (this.Kp.style.position = "relative"),
        (this.Kp.style.overflow = "hidden"),
        this.vm.appendChild(this.Kp),
        (this.dm = ir(this.Kp, new Zh(16, 16))),
        this.dm.subscribeCanvasConfigured(this.um));
      var n = this.dm.canvas;
      ((n.style.position = "absolute"),
        (n.style.zIndex = "1"),
        (n.style.left = "0"),
        (n.style.top = "0"),
        (this._m = ir(this.Kp, new Zh(16, 16))),
        this._m.subscribeCanvasConfigured(this.am));
      var s = this._m.canvas;
      ((s.style.position = "absolute"),
        (s.style.zIndex = "2"),
        (s.style.left = "0"),
        (s.style.top = "0"),
        this.Up.appendChild(this.Yp),
        this.Up.appendChild(this.vm),
        this.Up.appendChild(this.$p),
        this.Xp(),
        this.Qm.ri().Eu().N(this.Xp.bind(this), this),
        (this.xm = new lr(this._m.canvas, this, {
          hb: function () {
            return !0;
          },
          rb: function () {
            return !1;
          },
        })));
    }
    return (
      (t.prototype.D = function () {
        (this.xm.D(),
          null !== this.jp && this.jp.D(),
          null !== this.Hp && this.Hp.D(),
          this._m.unsubscribeCanvasConfigured(this.am),
          this._m.destroy(),
          this.dm.unsubscribeCanvasConfigured(this.um),
          this.dm.destroy());
      }),
      (t.prototype.Nm = function () {
        return this.Up;
      }),
      (t.prototype.Zp = function () {
        return this.jp;
      }),
      (t.prototype.Qp = function () {
        return this.Hp;
      }),
      (t.prototype.pb = function (t) {
        if (!this.Jp) {
          this.Jp = !0;
          var i = this.Qm.ri();
          !i.zt().et() &&
            this.Qm.K().handleScale.axisPressedMouseMove.time &&
            i.kw(t.Rb);
        }
      }),
      (t.prototype.bb = function (t) {
        this.pb(t);
      }),
      (t.prototype.gb = function () {
        var t = this.Qm.ri();
        !t.zt().et() &&
          this.Jp &&
          ((this.Jp = !1),
          this.Qm.K().handleScale.axisPressedMouseMove.time && t.Aw());
      }),
      (t.prototype.ob = function (t) {
        var i = this.Qm.ri();
        !i.zt().et() &&
          this.Qm.K().handleScale.axisPressedMouseMove.time &&
          i.Lw(t.Rb);
      }),
      (t.prototype.eb = function (t) {
        this.ob(t);
      }),
      (t.prototype.cb = function () {
        this.Jp = !1;
        var t = this.Qm.ri();
        (t.zt().et() && !this.Qm.K().handleScale.axisPressedMouseMove.time) ||
          t.Aw();
      }),
      (t.prototype.ab = function () {
        this.cb();
      }),
      (t.prototype.UM = function () {
        this.Qm.K().handleScale.axisDoubleClickReset && this.Qm.ri().Hn();
      }),
      (t.prototype.jM = function () {
        this.UM();
      }),
      (t.prototype.GM = function () {
        this.Qm.ri().K().handleScale.axisPressedMouseMove.time && this.Wm(1);
      }),
      (t.prototype.Ab = function () {
        this.Wm(0);
      }),
      (t.prototype.gp = function () {
        return this.tm;
      }),
      (t.prototype.Gp = function () {
        return this.qp;
      }),
      (t.prototype.tg = function (t, i, n) {
        ((this.tm && this.tm.yr(t)) ||
          ((this.tm = t),
          (this.rm = !0),
          this.dm.resizeCanvas({ width: t.Zt, height: t.Qt }),
          this._m.resizeCanvas({ width: t.Zt, height: t.Qt }),
          (this.rm = !1),
          (this.vm.style.width = t.Zt + "px"),
          (this.vm.style.height = t.Qt + "px"),
          this.qp.P(t)),
          null !== this.jp && this.jp.Pm(new Zh(i, t.Qt)),
          null !== this.Hp && this.Hp.Pm(new Zh(n, t.Qt)));
      }),
      (t.prototype.ig = function () {
        var t = this.ng();
        return Math.ceil(t.O + t.R + t.W + t.U + t.H);
      }),
      (t.prototype.Ft = function () {
        this.Qm.ri().zt().dr();
      }),
      (t.prototype.Rm = function () {
        return this.dm.canvas;
      }),
      (t.prototype.Dm = function (t) {
        if (0 !== t) {
          if (1 !== t) {
            var i = Gh(this.dm.canvas);
            (this.Cl(i, this.dm.pixelRatio),
              this.Tl(i, this.dm.pixelRatio),
              this.Em(i, this.dm.pixelRatio),
              this.sg(this.Qm.ri().He(), i, this.dm.pixelRatio),
              null !== this.jp && this.jp.Dm(t),
              null !== this.Hp && this.Hp.Dm(t));
          }
          var n = Gh(this._m.canvas),
            s = this._m.pixelRatio;
          (n.clearRect(
            0,
            0,
            Math.ceil(this.tm.Zt * s),
            Math.ceil(this.tm.Qt * s),
          ),
            this.sg([this.Qm.ri().Po()], n, s));
        }
      }),
      (t.prototype.Cl = function (t, i) {
        var n = this;
        _t(t, i, function () {
          wt(t, 0, 0, n.tm.Zt, n.tm.Qt, n.Qm.ri().jw());
        });
      }),
      (t.prototype.Tl = function (t, i) {
        if (this.Qm.K().timeScale.borderVisible) {
          (t.save(), (t.fillStyle = this.hg()));
          var n = Math.max(1, Math.floor(this.ng().O * i));
          (t.fillRect(0, 0, Math.ceil(this.tm.Zt * i), n), t.restore());
        }
      }),
      (t.prototype.Em = function (t, i) {
        var n = this,
          s = this.Qm.ri().zt().dr();
        if (s && 0 !== s.length) {
          var h = s.reduce(kr, s[0]).yd;
          (h > 30 && h < 50 && (h = 30), t.save(), (t.strokeStyle = this.hg()));
          var r = this.ng(),
            e = r.O + r.R + r.U + r.W - r.Y;
          ((t.textAlign = "center"), (t.fillStyle = this.hg()));
          var u = Math.floor(this.ng().O * i),
            o = Math.max(1, Math.floor(i)),
            l = Math.floor(0.5 * i);
          if (this.Qm.ri().zt().K().borderVisible) {
            t.beginPath();
            for (var a = Math.round(r.R * i), f = s.length; f--; ) {
              var c = Math.round(s[f].ur * i);
              t.rect(c - l, u, o, a);
            }
            t.fill();
          }
          ((t.fillStyle = this.G()),
            _t(t, i, function () {
              t.font = n.rg();
              for (var i = 0, r = s; i < r.length; i++) {
                if ((a = r[i]).yd < h) {
                  var u = a.d_ ? n.eg(t, a.ur, a.Jr) : a.ur;
                  t.fillText(a.Jr, u, e);
                }
              }
              t.font = n.ug();
              for (var o = 0, l = s; o < l.length; o++) {
                var a;
                if ((a = l[o]).yd >= h) {
                  u = a.d_ ? n.eg(t, a.ur, a.Jr) : a.ur;
                  t.fillText(a.Jr, u, e);
                }
              }
            }),
            t.restore());
        }
      }),
      (t.prototype.eg = function (t, i, n) {
        var s = this.nm.Mi(t, n),
          h = s / 2,
          r = Math.floor(i - h) + 0.5;
        return (
          r < 0
            ? (i += Math.abs(0 - r))
            : r + s > this.tm.Zt && (i -= Math.abs(this.tm.Zt - (r + s))),
          i
        );
      }),
      (t.prototype.sg = function (t, i, n) {
        for (var s = this.ng(), h = 0, r = t; h < r.length; h++)
          for (var e = 0, u = r[h].Ki(); e < u.length; e++) {
            var o = u[e].Bt();
            (i.save(), o.ot(i, s, n), i.restore());
          }
      }),
      (t.prototype.hg = function () {
        return this.Qm.K().timeScale.borderColor;
      }),
      (t.prototype.G = function () {
        return this.un.textColor;
      }),
      (t.prototype.X = function () {
        return this.un.fontSize;
      }),
      (t.prototype.rg = function () {
        return ht(this.X(), this.un.fontFamily);
      }),
      (t.prototype.ug = function () {
        return ht(this.X(), this.un.fontFamily, "bold");
      }),
      (t.prototype.ng = function () {
        null === this.B &&
          (this.B = {
            O: 1,
            Y: NaN,
            U: NaN,
            H: NaN,
            Oi: NaN,
            R: 3,
            W: NaN,
            V: "",
            Ei: new qs(),
          });
        var t = this.B,
          i = this.rg();
        if (t.V !== i) {
          var n = this.X();
          ((t.W = n),
            (t.V = i),
            (t.U = Math.ceil(n / 2.5)),
            (t.H = t.U),
            (t.Oi = Math.ceil(n / 2)),
            (t.Y = Math.round(this.X() / 5)),
            t.Ei.Ff());
        }
        return this.B;
      }),
      (t.prototype.Wm = function (t) {
        this.vm.style.cursor = 1 === t ? "ew-resize" : "default";
      }),
      (t.prototype.Xp = function () {
        var t = this.Qm.ri(),
          i = t.K();
        (i.leftPriceScale.visible ||
          null === this.jp ||
          (this.Yp.removeChild(this.jp.Nm()), this.jp.D(), (this.jp = null)),
          i.rightPriceScale.visible ||
            null === this.Hp ||
            (this.$p.removeChild(this.Hp.Nm()), this.Hp.D(), (this.Hp = null)));
        var n = { Ow: this.Qm.ri().Ow() },
          s = function () {
            return i.leftPriceScale.borderVisible && t.zt().K().borderVisible;
          },
          h = function () {
            return t.jw();
          };
        (i.leftPriceScale.visible &&
          null === this.jp &&
          ((this.jp = new yr("left", i, n, s, h)),
          this.Yp.appendChild(this.jp.Nm())),
          i.rightPriceScale.visible &&
            null === this.Hp &&
            ((this.Hp = new yr("right", i, n, s, h)),
            this.$p.appendChild(this.Hp.Nm())));
      }),
      t
    );
  })(),
  Nr = (function () {
    function t(t, i) {
      var n;
      ((this.og = []),
        (this.lg = 0),
        (this.Yr = 0),
        (this.xu = 0),
        (this.ag = 0),
        (this.fg = 0),
        (this.cg = null),
        (this.vg = !1),
        (this.Jm = new $()),
        (this.Y_ = new $()),
        (this.K_ = new $()),
        (this.X_ = new $()),
        (this.un = i),
        (this.Up = document.createElement("div")),
        this.Up.classList.add("tv-lightweight-charts"),
        (this.Up.style.overflow = "hidden"),
        (this.Up.style.width = "100%"),
        (this.Up.style.height = "100%"),
        ((n = this.Up).style.userSelect = "none"),
        (n.style.webkitUserSelect = "none"),
        (n.style.msUserSelect = "none"),
        (n.style.MozUserSelect = "none"),
        (n.style.webkitTapHighlightColor = "transparent"),
        (this.dg = document.createElement("table")),
        this.dg.setAttribute("cellspacing", "0"),
        this.Up.appendChild(this.dg),
        (this._g = this.wg.bind(this)),
        this.Up.addEventListener("wheel", this._g, { passive: !1 }),
        (this.zi = new Yh(this.Q_.bind(this), this.un)),
        this.ri().bw().N(this.Mg.bind(this), this),
        this.ri().mw().N(this.bg.bind(this), this),
        this.ri().pw().N(this.mg.bind(this), this),
        (this.pg = new xr(this)),
        this.dg.appendChild(this.pg.Nm()));
      var s = this.un.width,
        h = this.un.height;
      if (0 === s || 0 === h) {
        var r = t.getBoundingClientRect();
        (0 === s && ((s = Math.floor(r.width)), (s -= s % 2)),
          0 === h && ((h = Math.floor(r.height)), (h -= h % 2)));
      }
      (this.gg(s, h),
        this.yg(),
        t.appendChild(this.Up),
        this.kg(),
        this.zi.zt().x_().N(this.zi.Av.bind(this.zi), this),
        this.zi.Eu().N(this.zi.Av.bind(this.zi), this));
    }
    return (
      (t.prototype.ri = function () {
        return this.zi;
      }),
      (t.prototype.K = function () {
        return this.un;
      }),
      (t.prototype.xg = function () {
        return this.og;
      }),
      (t.prototype.Ng = function () {
        return this.pg;
      }),
      (t.prototype.D = function () {
        (this.Up.removeEventListener("wheel", this._g),
          0 !== this.lg && window.cancelAnimationFrame(this.lg),
          this.zi.bw().A(this),
          this.zi.mw().A(this),
          this.zi.zt().x_().A(this),
          this.zi.Eu().A(this),
          this.zi.D());
        for (var t = 0, i = this.og; t < i.length; t++) {
          var n = i[t];
          (this.dg.removeChild(n.Nm()), n.bp().A(this), n.D());
        }
        ((this.og = []),
          F(this.pg).D(),
          null !== this.Up.parentElement &&
            this.Up.parentElement.removeChild(this.Up),
          this.Y_.D(),
          this.Jm.D());
      }),
      (t.prototype.gg = function (t, i, n) {
        if ((void 0 === n && (n = !1), this.Yr !== i || this.xu !== t)) {
          ((this.Yr = i), (this.xu = t));
          var s = i + "px",
            h = t + "px";
          ((F(this.Up).style.height = s),
            (F(this.Up).style.width = h),
            (this.dg.style.height = s),
            (this.dg.style.width = h),
            n ? this.Sg(new Lt(3)) : this.zi.Av());
        }
      }),
      (t.prototype.Dm = function (t) {
        void 0 === t && (t = new Lt(3));
        for (var i = 0; i < this.og.length; i++) this.og[i].Dm(t.Wn(i).On);
        this.un.timeScale.visible && this.pg.Dm(t.Rn());
      }),
      (t.prototype.$s = function (t) {
        (this.zi.$s(t), this.kg());
        var i = t.width || this.xu,
          n = t.height || this.Yr;
        this.gg(i, n);
      }),
      (t.prototype.bp = function () {
        return this.Jm;
      }),
      (t.prototype.bw = function () {
        return this.Y_;
      }),
      (t.prototype.mw = function () {
        return this.K_;
      }),
      (t.prototype.pw = function () {
        return this.X_;
      }),
      (t.prototype.Cg = function () {
        var t = this;
        null !== this.cg && (this.Sg(this.cg), (this.cg = null));
        var i = this.og[0],
          n = tr(document, new Zh(this.xu, this.Yr)),
          s = Gh(n),
          h = Qh(n);
        return (
          _t(s, h, function () {
            var n = 0,
              h = 0,
              r = function (i) {
                for (var r = 0; r < t.og.length; r++) {
                  var e = t.og[r],
                    u = e.gp().Qt,
                    o = F("left" === i ? e.Cp() : e.Tp()),
                    l = o.Rm();
                  (s.drawImage(l, n, h, o.Fm(), u), (h += u));
                }
              };
            (t.Tg() && (r("left"), (n = F(i.Cp()).Fm())), (h = 0));
            for (var e = 0; e < t.og.length; e++) {
              var u = t.og[e],
                o = u.gp(),
                l = u.Rm();
              (s.drawImage(l, n, h, o.Zt, o.Qt), (h += o.Qt));
            }
            ((n += i.gp().Zt), t.Lg() && ((h = 0), r("right")));
            var a = function (i) {
              var r = F("left" === i ? t.pg.Zp() : t.pg.Qp()),
                e = r.gp(),
                u = r.Rm();
              s.drawImage(u, n, h, e.Zt, e.Qt);
            };
            if (t.un.timeScale.visible) {
              ((n = 0), t.Tg() && (a("left"), (n = F(i.Cp()).Fm())));
              var f = t.pg.gp();
              l = t.pg.Rm();
              (s.drawImage(l, n, h, f.Zt, f.Qt),
                t.Lg() && ((n += i.gp().Zt), a("right"), s.restore()));
            }
          }),
          n
        );
      }),
      (t.prototype.Ag = function (t) {
        return "none" === t
          ? 0
          : ("left" !== t || this.Tg()) && ("right" !== t || this.Lg())
            ? 0 === this.og.length
              ? 0
              : F("left" === t ? this.og[0].Cp() : this.og[0].Tp()).Fm()
            : 0;
      }),
      (t.prototype.Pg = function () {
        for (var t = 0, i = 0, n = 0, s = 0, h = this.og; s < h.length; s++) {
          var r = h[s];
          (this.Tg() && (i = Math.max(i, F(r.Cp()).Lm())),
            this.Lg() && (n = Math.max(n, F(r.Tp()).Lm())),
            (t += r.Ou()));
        }
        var e = this.xu,
          u = this.Yr,
          o = Math.max(e - i - n, 0),
          l = this.un.timeScale.visible,
          a = l ? this.pg.ig() : 0;
        a % 2 && (a += 1);
        for (
          var f = 0 + a, c = u < f ? 0 : u - f, v = c / t, d = 0, _ = 0;
          _ < this.og.length;
          ++_
        ) {
          (r = this.og[_]).rp(this.zi.Ys()[_]);
          var w,
            M = 0;
          ((M = _ === this.og.length - 1 ? c - d : Math.round(r.Ou() * v)),
            (d += w = Math.max(M, 2)),
            r.Pm(new Zh(o, w)),
            this.Tg() && r.pp(i, "left"),
            this.Lg() && r.pp(n, "right"),
            r.Js() && this.zi.gw(r.Js(), w));
        }
        (this.pg.tg(new Zh(l ? o : 0, a), l ? i : 0, l ? n : 0),
          this.zi.Ru(o),
          this.ag !== i && (this.ag = i),
          this.fg !== n && (this.fg = n));
      }),
      (t.prototype.wg = function (t) {
        var i = t.deltaX / 100,
          n = -t.deltaY / 100;
        if (
          (0 !== i && this.un.handleScroll.mouseWheel) ||
          (0 !== n && this.un.handleScale.mouseWheel)
        ) {
          switch ((t.cancelable && t.preventDefault(), t.deltaMode)) {
            case t.DOM_DELTA_PAGE:
              ((i *= 120), (n *= 120));
              break;
            case t.DOM_DELTA_LINE:
              ((i *= 32), (n *= 32));
          }
          if (0 !== n && this.un.handleScale.mouseWheel) {
            var s = Math.sign(n) * Math.min(1, Math.abs(n)),
              h = t.clientX - this.Up.getBoundingClientRect().left;
            this.ri().xw(h, s);
          }
          0 !== i && this.un.handleScroll.mouseWheel && this.ri().Nw(-80 * i);
        }
      }),
      (t.prototype.Sg = function (t) {
        var i,
          n = t.Rn();
        (3 === n && this.Fg(),
          (3 !== n && 2 !== n) ||
            (this.Dg(t),
            this.Bg(t),
            this.pg.Ft(),
            this.og.forEach(function (t) {
              t.up();
            }),
            3 === (null === (i = this.cg) || void 0 === i ? void 0 : i.Rn()) &&
              (this.cg.Yn(t),
              this.Fg(),
              this.Dg(this.cg),
              this.Bg(this.cg),
              (t = this.cg),
              (this.cg = null))),
          this.Dm(t));
      }),
      (t.prototype.Bg = function (t) {
        for (var i = 0, n = t.Un(); i < n.length; i++) {
          var s = n[i];
          this.$n(s);
        }
      }),
      (t.prototype.Dg = function (t) {
        for (var i = this.zi.Ys(), n = 0; n < i.length; n++)
          t.Wn(n).zn && i[n].eo();
      }),
      (t.prototype.$n = function (t) {
        var i = this.zi.zt();
        switch (t.In) {
          case 0:
            i.N_();
            break;
          case 1:
            i.S_(t.Jt);
            break;
          case 2:
            i.Jn(t.Jt);
            break;
          case 3:
            i.qn(t.Jt);
            break;
          case 4:
            i.__();
        }
      }),
      (t.prototype.Q_ = function (t) {
        var i = this;
        (null !== this.cg ? this.cg.Yn(t) : (this.cg = t),
          this.vg ||
            ((this.vg = !0),
            (this.lg = window.requestAnimationFrame(function () {
              if (((i.vg = !1), (i.lg = 0), null !== i.cg)) {
                var t = i.cg;
                ((i.cg = null), i.Sg(t));
              }
            }))));
      }),
      (t.prototype.Fg = function () {
        this.yg();
      }),
      (t.prototype.yg = function () {
        for (
          var t = this.zi.Ys(), i = t.length, n = this.og.length, s = i;
          s < n;
          s++
        ) {
          var h = P(this.og.pop());
          (this.dg.removeChild(h.Nm()), h.bp().A(this), h.D());
        }
        for (s = n; s < i; s++) {
          ((h = new gr(this, t[s])).bp().N(this.Eg.bind(this), this),
            this.og.push(h),
            this.dg.insertBefore(h.Nm(), this.pg.Nm()));
        }
        for (s = 0; s < i; s++) {
          var r = t[s];
          (h = this.og[s]).Js() !== r ? h.rp(r) : h.hp();
        }
        (this.kg(), this.Pg());
      }),
      (t.prototype.Og = function (t, i) {
        var n,
          s = new Map();
        null !== t &&
          this.zi.Dt().forEach(function (i) {
            var n = i.Fc(t);
            null !== n && s.set(i, n);
          });
        if (null !== t) {
          var h = this.zi.zt().vn(t);
          null !== h && (n = h);
        }
        var r = this.ri().lw(),
          e = null !== r && r.fw instanceof yh ? r.fw : void 0,
          u = null !== r && void 0 !== r.Op ? r.Op.Pc : void 0;
        return { Nt: n, Zl: i || void 0, zg: e, Rg: s, Wg: u };
      }),
      (t.prototype.Vg = function (t) {
        return { Ig: t };
      }),
      (t.prototype.jg = function (t, i) {
        return { Ig: t, Hg: i };
      }),
      (t.prototype.Eg = function (t, i) {
        var n = this;
        this.Jm.P(function () {
          return n.Og(t, i);
        });
      }),
      (t.prototype.Mg = function (t, i) {
        var n = this;
        this.Y_.P(function () {
          return n.Og(t, i);
        });
      }),
      (t.prototype.bg = function (t) {
        var i = this;
        this.K_.P(function () {
          return i.Vg(t);
        });
      }),
      (t.prototype.mg = function (t, i) {
        var n = this;
        this.X_.P(function () {
          return n.jg(t, i);
        });
      }),
      (t.prototype.kg = function () {
        var t = this.un.timeScale.visible ? "" : "none";
        this.pg.Nm().style.display = t;
      }),
      (t.prototype.Tg = function () {
        return this.og[0].Js().Ku().K().visible;
      }),
      (t.prototype.Lg = function () {
        return this.og[0].Js().Us().K().visible;
      }),
      t
    );
  })();
function Sr(t, i, n) {
  var s = n.value;
  return { index: i, time: t, value: [s, s, s, s] };
}
function Cr(t, i, n) {
  var s = n.value,
    h = { index: i, time: t, value: [s, s, s, s] };
  return ("color" in n && void 0 !== n.color && (h.color = n.color), h);
}
function Tr(t) {
  return void 0 !== t.value;
}
function Lr(t) {
  return function (i, n, s) {
    return void 0 === (h = s).open && void 0 === h.value
      ? { time: i, index: n }
      : t(i, n, s);
    var h;
  };
}
var Ar = {
  Candlestick: Lr(function (t, i, n) {
    var s = { index: i, time: t, value: [n.open, n.high, n.low, n.close] };
    return (
      "color" in n && void 0 !== n.color && (s.color = n.color),
      "borderColor" in n &&
        void 0 !== n.borderColor &&
        (s.borderColor = n.borderColor),
      "wickColor" in n && void 0 !== n.wickColor && (s.wickColor = n.wickColor),
      s
    );
  }),
  Bar: Lr(function (t, i, n) {
    var s = { index: i, time: t, value: [n.open, n.high, n.low, n.close] };
    return ("color" in n && void 0 !== n.color && (s.color = n.color), s);
  }),
  Area: Lr(Sr),
  Baseline: Lr(Sr),
  Histogram: Lr(Cr),
  Line: Lr(Cr),
};
function Pr(t) {
  return Ar[t];
}
function Fr(t) {
  return 60 * t * 60 * 1e3;
}
function Dr(t) {
  return 60 * t * 1e3;
}
var Br,
  Er = [
    { Jg: ((Br = 1), 1e3 * Br), yd: 10 },
    { Jg: Dr(1), yd: 20 },
    { Jg: Dr(5), yd: 21 },
    { Jg: Dr(30), yd: 22 },
    { Jg: Fr(1), yd: 30 },
    { Jg: Fr(3), yd: 31 },
    { Jg: Fr(6), yd: 32 },
    { Jg: Fr(12), yd: 33 },
  ];
function Or(t, i) {
  if (t.getUTCFullYear() !== i.getUTCFullYear()) return 70;
  if (t.getUTCMonth() !== i.getUTCMonth()) return 60;
  if (t.getUTCDate() !== i.getUTCDate()) return 50;
  for (var n = Er.length - 1; n >= 0; --n)
    if (
      Math.floor(i.getTime() / Er[n].Jg) !== Math.floor(t.getTime() / Er[n].Jg)
    )
      return Er[n].yd;
  return 0;
}
function zr(t, i) {
  if ((void 0 === i && (i = 0), 0 !== t.length)) {
    for (
      var n = 0 === i ? null : t[i - 1].Nt.timestamp,
        s = null !== n ? new Date(1e3 * n) : null,
        h = 0,
        r = i;
      r < t.length;
      ++r
    ) {
      var e = t[r],
        u = new Date(1e3 * e.Nt.timestamp);
      (null !== s && (e.gd = Or(u, s)),
        (h += e.Nt.timestamp - (n || e.Nt.timestamp)),
        (n = e.Nt.timestamp),
        (s = u));
    }
    if (0 === i && t.length > 1) {
      var o = Math.ceil(h / (t.length - 1)),
        l = new Date(1e3 * (t[0].Nt.timestamp - o));
      t[0].gd = Or(new Date(1e3 * t[0].Nt.timestamp), l);
    }
  }
}
function Rr(t) {
  if (!Kh(t)) throw new Error("time must be of type BusinessDay");
  var i = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0));
  return { timestamp: Math.round(i.getTime() / 1e3), businessDay: t };
}
function Wr(t) {
  if (!Xh(t)) throw new Error("time must be of type isUTCTimestamp");
  return { timestamp: t };
}
function Vr(t) {
  return 0 === t.length ? null : Kh(t[0].time) ? Rr : Wr;
}
function Ir(t) {
  return Xh(t) ? Wr(t) : Kh(t) ? Rr(t) : Rr(jr(t));
}
function jr(t) {
  var i = new Date(t);
  if (isNaN(i.getTime()))
    throw new Error(
      "Invalid date string=".concat(t, ", expected format=yyyy-mm-dd"),
    );
  return {
    day: i.getUTCDate(),
    month: i.getUTCMonth() + 1,
    year: i.getUTCFullYear(),
  };
}
function Hr(t) {
  Q(t.time) && (t.time = jr(t.time));
}
function Jr(t) {
  return { dc: 0, qg: new Map(), $e: t };
}
function qr(t) {
  if (void 0 !== t && 0 !== t.length)
    return { Ug: t[0].time.timestamp, Yg: t[t.length - 1].time.timestamp };
}
var Ur = (function () {
  function t() {
    ((this.$g = new Map()),
      (this.Kg = new Map()),
      (this.Xg = new Map()),
      (this.Zg = []));
  }
  return (
    (t.prototype.D = function () {
      (this.$g.clear(), this.Kg.clear(), this.Xg.clear(), (this.Zg = []));
    }),
    (t.prototype.Qg = function (t, i) {
      var n = this,
        s = 0 !== this.$g.size,
        h = !1,
        r = this.Kg.get(t);
      if (void 0 !== r)
        if (1 === this.Kg.size) ((s = !1), (h = !0), this.$g.clear());
        else
          for (var e = 0, u = this.Zg; e < u.length; e++) {
            u[e].pointData.qg.delete(t) && (h = !0);
          }
      var o = [];
      if (0 !== i.length) {
        !(function (t) {
          t.forEach(Hr);
        })(i);
        var l = F(Vr(i)),
          a = Pr(t.Yc());
        o = i.map(function (i) {
          var s = l(i.time),
            r = n.$g.get(s.timestamp);
          void 0 === r && ((r = Jr(s)), n.$g.set(s.timestamp, r), (h = !0));
          var e = a(s, r.dc, i);
          return (r.qg.set(t, e), e);
        });
      }
      (s && this.Gg(), this.ty(t, o));
      var f = -1;
      if (h) {
        var c = [];
        (this.$g.forEach(function (t) {
          c.push({ gd: 0, Nt: t.$e, pointData: t });
        }),
          c.sort(function (t, i) {
            return t.Nt.timestamp - i.Nt.timestamp;
          }),
          (f = this.iy(c)));
      }
      return this.ny(
        t,
        f,
        (function (t, i) {
          var n = qr(t),
            s = qr(i);
          if (void 0 !== n && void 0 !== s)
            return { Dv: n.Yg >= s.Yg && n.Ug >= s.Ug };
        })(this.Kg.get(t), r),
      );
    }),
    (t.prototype.Ww = function (t) {
      return this.Qg(t, []);
    }),
    (t.prototype.sy = function (t, i) {
      Hr(i);
      var n = F(Vr([i]))(i.time),
        s = this.Xg.get(t);
      if (void 0 !== s && n.timestamp < s.timestamp)
        throw new Error(
          "Cannot update oldest data, last time="
            .concat(s.timestamp, ", new time=")
            .concat(n.timestamp),
        );
      var h = this.$g.get(n.timestamp),
        r = void 0 === h;
      void 0 === h && ((h = Jr(n)), this.$g.set(n.timestamp, h));
      var e = Pr(t.Yc())(n, h.dc, i);
      (h.qg.set(t, e), this.hy(t, e));
      var u = { Dv: Tr(e) };
      if (!r) return this.ny(t, -1, u);
      var o = { gd: 0, Nt: h.$e, pointData: h },
        l = ks(this.Zg, o.Nt.timestamp, function (t, i) {
          return t.Nt.timestamp < i;
        });
      this.Zg.splice(l, 0, o);
      for (var a = l; a < this.Zg.length; ++a) Yr(this.Zg[a].pointData, a);
      return (zr(this.Zg, l), this.ny(t, l, u));
    }),
    (t.prototype.hy = function (t, i) {
      var n = this.Kg.get(t);
      void 0 === n && ((n = []), this.Kg.set(t, n));
      var s = 0 !== n.length ? n[n.length - 1] : null;
      (null === s || i.time.timestamp > s.time.timestamp
        ? Tr(i) && n.push(i)
        : Tr(i)
          ? (n[n.length - 1] = i)
          : n.splice(-1, 1),
        this.Xg.set(t, i.time));
    }),
    (t.prototype.ty = function (t, i) {
      0 !== i.length
        ? (this.Kg.set(t, i.filter(Tr)), this.Xg.set(t, i[i.length - 1].time))
        : (this.Kg.delete(t), this.Xg.delete(t));
    }),
    (t.prototype.Gg = function () {
      for (var t = 0, i = this.Zg; t < i.length; t++) {
        var n = i[t];
        0 === n.pointData.qg.size && this.$g.delete(n.Nt.timestamp);
      }
    }),
    (t.prototype.iy = function (t) {
      for (var i = -1, n = 0; n < this.Zg.length && n < t.length; ++n) {
        var s = this.Zg[n],
          h = t[n];
        if (s.Nt.timestamp !== h.Nt.timestamp) {
          i = n;
          break;
        }
        ((h.gd = s.gd), Yr(h.pointData, n));
      }
      if (
        (-1 === i &&
          this.Zg.length !== t.length &&
          (i = Math.min(this.Zg.length, t.length)),
        -1 === i)
      )
        return -1;
      for (n = i; n < t.length; ++n) Yr(t[n].pointData, n);
      return (zr(t, i), (this.Zg = t), i);
    }),
    (t.prototype.ey = function () {
      if (0 === this.Kg.size) return null;
      var t = 0;
      return (
        this.Kg.forEach(function (i) {
          0 !== i.length && (t = Math.max(t, i[i.length - 1].index));
        }),
        t
      );
    }),
    (t.prototype.ny = function (t, i, n) {
      var s = { uy: new Map(), zt: { h_: this.ey() } };
      if (-1 !== i)
        (this.Kg.forEach(function (i, h) {
          s.uy.set(h, { Mh: i, oy: h === t ? n : void 0 });
        }),
          this.Kg.has(t) || s.uy.set(t, { Mh: [], oy: n }),
          (s.zt.Es = this.Zg),
          (s.zt.ly = i));
      else {
        var h = this.Kg.get(t);
        s.uy.set(t, { Mh: h || [], oy: n });
      }
      return s;
    }),
    t
  );
})();
function Yr(t, i) {
  ((t.dc = i),
    t.qg.forEach(function (t) {
      t.index = i;
    }));
}
var $r = {
    color: "#FF0000",
    price: 0,
    lineStyle: 2,
    lineWidth: 1,
    lineVisible: !0,
    axisLabelVisible: !0,
    title: "",
    ray: !1,
    rayStart: 0,
  },
  Kr = (function () {
    function t(t) {
      this.Wc = t;
    }
    return (
      (t.prototype.applyOptions = function (t) {
        this.Wc.$s(t);
      }),
      (t.prototype.options = function () {
        return this.Wc.K();
      }),
      (t.prototype.vy = function () {
        return this.Wc;
      }),
      t
    );
  })();
function Xr(t) {
  var i = t.overlay,
    n = (function (t, i) {
      var n = {};
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) &&
          i.indexOf(s) < 0 &&
          (n[s] = t[s]);
      if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
        var h = 0;
        for (s = Object.getOwnPropertySymbols(t); h < s.length; h++)
          i.indexOf(s[h]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(t, s[h]) &&
            (n[s[h]] = t[s[h]]);
      }
      return n;
    })(t, ["overlay"]);
  return (i && (n.priceScaleId = ""), n);
}
var Zr = (function () {
    function t(t, i, n) {
      ((this.za = t), (this._y = i), (this.wy = n));
    }
    return (
      (t.prototype.priceFormatter = function () {
        return this.za.oh();
      }),
      (t.prototype.priceToCoordinate = function (t) {
        var i = this.za.Vt();
        return null === i ? null : this.za.Ht().jt(t, i.Jt);
      }),
      (t.prototype.coordinateToPrice = function (t) {
        var i = this.za.Vt();
        return null === i ? null : this.za.Ht().cn(t, i.Jt);
      }),
      (t.prototype.barsInLogicalRange = function (t) {
        if (null === t) return null;
        var i = new Eh(new Ph(t.from, t.to)).Cd(),
          n = this.za.Pn();
        if (n.et()) return null;
        var s = n.lv(i.au(), 1),
          h = n.lv(i.fu(), -1),
          r = F(n.ev()),
          e = F(n.An());
        if (null !== s && null !== h && s.index > h.index)
          return { barsBefore: t.from - r, barsAfter: e - t.to };
        var u = {
          barsBefore: null === s || s.index === r ? t.from - r : s.index - r,
          barsAfter: null === h || h.index === e ? e - t.to : e - h.index,
        };
        return (
          null !== s &&
            null !== h &&
            ((u.from = s.time.businessDay || s.time.timestamp),
            (u.to = h.time.businessDay || h.time.timestamp)),
          u
        );
      }),
      (t.prototype.setData = function (t) {
        (this.za.Yc(), this._y.My(this.za, t));
      }),
      (t.prototype.update = function (t) {
        (this.za.Yc(), this._y.vo(this.za, t));
      }),
      (t.prototype.setMarkers = function (t) {
        var i = t.map(function (t) {
          return U(U({}, t), { time: Ir(t.time) });
        });
        this.za.Ev(i);
      }),
      (t.prototype.applyOptions = function (t) {
        var i = Xr(t);
        this.za.$s(i);
      }),
      (t.prototype.options = function () {
        return tt(this.za.K());
      }),
      (t.prototype.priceScale = function () {
        return this.wy.priceScale(this.za.Ht().Ji());
      }),
      (t.prototype.createPriceLine = function (t) {
        var i = K(tt($r), t),
          n = this.za.Ov(i);
        return new Kr(n);
      }),
      (t.prototype.removePriceLine = function (t) {
        this.za.zv(t.vy());
      }),
      (t.prototype.seriesType = function () {
        return this.za.Yc();
      }),
      (t.prototype.getDataInRange = function (t) {
        var i = this.za.Pn();
        if (i.et()) return [];
        var n = this.za.ri().zt(),
          s = n.Hc(Ir(t.from), !0),
          h = n.Hc(Ir(t.to), !0);
        if (null === s || null === h) return [];
        var r = new Eh(new Ph(s, h)).Cd(),
          e = i.lv(r.au(), 1),
          u = i.lv(r.fu(), -1);
        if (null === e || null === u) return [];
        var o = e.index,
          l = u.index + 1;
        return i.Ka().slice(o, l);
      }),
      t
    );
  })(),
  Qr = (function (t) {
    function i() {
      return (null !== t && t.apply(this, arguments)) || this;
    }
    return (
      q(i, t),
      (i.prototype.applyOptions = function (i) {
        ($h(i), t.prototype.applyOptions.call(this, i));
      }),
      i
    );
  })(Zr),
  Gr = (function () {
    function t(t) {
      this.by = t;
    }
    return (
      (t.prototype.setPoints = function (t) {
        this.by.Ws(t);
      }),
      (t.prototype.applyOptions = function (t) {
        this.by.$s(t);
      }),
      (t.prototype.options = function () {
        return tt(this.by.K());
      }),
      (t.prototype.toolType = function () {
        return this.by.sh();
      }),
      t
    );
  })(),
  te = {
    autoScale: !0,
    mode: 0,
    invertScale: !1,
    alignLabels: !0,
    borderVisible: !0,
    borderColor: "#2B2B43",
    entireTextOnly: !1,
    visible: !1,
    drawTicks: !0,
    scaleMargins: { bottom: 0.1, top: 0.2 },
  },
  ie = {
    color: "rgba(0, 0, 0, 0)",
    visible: !1,
    fontSize: 48,
    fontFamily: st,
    fontStyle: "",
    text: "",
    horzAlign: "center",
    vertAlign: "center",
  },
  ne = {
    width: 0,
    height: 0,
    layout: {
      background: { type: "solid", color: "#FFFFFF" },
      textColor: "#191919",
      fontSize: 11,
      fontFamily: st,
    },
    crosshair: {
      vertLine: {
        color: "#758696",
        width: 1,
        style: 3,
        visible: !0,
        labelVisible: !0,
        labelBackgroundColor: "#4c525e",
      },
      horzLine: {
        color: "#758696",
        width: 1,
        style: 3,
        visible: !0,
        labelVisible: !0,
        labelBackgroundColor: "#4c525e",
      },
      mode: 1,
      magnetThreshold: 14,
    },
    grid: {
      vertLines: { color: "#D6DCDE", style: 0, visible: !0 },
      horzLines: { color: "#D6DCDE", style: 0, visible: !0 },
    },
    overlayPriceScales: U({}, te),
    leftPriceScale: U(U({}, te), { visible: !1 }),
    rightPriceScale: U(U({}, te), { visible: !0 }),
    timeScale: {
      rightOffset: 0,
      barSpacing: 6,
      minBarSpacing: 0.5,
      fixLeftEdge: !1,
      fixRightEdge: !1,
      lockVisibleTimeRangeOnResize: !1,
      rightBarStaysOnScroll: !1,
      borderVisible: !0,
      borderColor: "#2B2B43",
      visible: !0,
      timeVisible: !1,
      secondsVisible: !0,
      shiftVisibleRangeOnNewBar: !0,
    },
    watermark: ie,
    localization: {
      locale: rr ? navigator.language : "",
      dateFormat: "dd MMM 'yy",
    },
    handleScroll: {
      mouseWheel: !0,
      pressedMouseMove: !0,
      horzTouchDrag: !0,
      vertTouchDrag: !0,
    },
    handleScale: {
      axisPressedMouseMove: { time: !0, price: !0 },
      axisDoubleClickReset: !0,
      mouseWheel: !0,
      pinch: !0,
    },
    kineticScroll: { mouse: !1, touch: !0 },
    trackingMode: { exitMode: 1 },
  },
  se = {
    upColor: "#26a69a",
    downColor: "#ef5350",
    wickVisible: !0,
    borderVisible: !0,
    borderColor: "#378658",
    borderUpColor: "#26a69a",
    borderDownColor: "#ef5350",
    wickColor: "#737375",
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
  },
  he = {
    upColor: "#26a69a",
    downColor: "#ef5350",
    openVisible: !0,
    thinBars: !0,
  },
  re = {
    color: "#2196f3",
    lineStyle: 0,
    lineWidth: 3,
    lineType: 0,
    crosshairMarkerVisible: !0,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: "",
    crosshairMarkerBackgroundColor: "",
    lastPriceAnimation: 0,
  },
  ee = {
    topColor: "rgba( 46, 220, 135, 0.4)",
    bottomColor: "rgba( 40, 221, 100, 0)",
    lineColor: "#33D778",
    lineStyle: 0,
    lineWidth: 3,
    lineType: 0,
    crosshairMarkerVisible: !0,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: "",
    crosshairMarkerBackgroundColor: "",
    lastPriceAnimation: 0,
  },
  ue = {
    baseValue: { type: "price", price: 0 },
    topFillColor1: "rgba(38, 166, 154, 0.28)",
    topFillColor2: "rgba(38, 166, 154, 0.05)",
    topLineColor: "rgba(38, 166, 154, 1)",
    bottomFillColor1: "rgba(239, 83, 80, 0.05)",
    bottomFillColor2: "rgba(239, 83, 80, 0.28)",
    bottomLineColor: "rgba(239, 83, 80, 1)",
    lineWidth: 3,
    lineStyle: 0,
    crosshairMarkerVisible: !0,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: "",
    crosshairMarkerBackgroundColor: "",
    lastPriceAnimation: 0,
  },
  oe = { color: "#26a69a", base: 0 },
  le = {
    title: "",
    visible: !0,
    lastValueVisible: !0,
    priceLineVisible: !0,
    priceLineSource: 0,
    priceLineWidth: 1,
    priceLineColor: "",
    priceLineStyle: 2,
    baseLineVisible: !0,
    baseLineWidth: 1,
    baseLineColor: "#B2B5BE",
    baseLineStyle: 0,
    priceFormat: { type: "price", precision: 2, minMove: 0.01 },
  },
  ae = (function () {
    function t(t, i) {
      ((this.my = t), (this.py = i));
    }
    return (
      (t.prototype.applyOptions = function (t) {
        this.my.ri().cw(this.py, t);
      }),
      (t.prototype.options = function () {
        return this.Fi().K();
      }),
      (t.prototype.width = function () {
        return Tt(this.py)
          ? this.my.Ag("left" === this.py ? "left" : "right")
          : 0;
      }),
      (t.prototype.getVisibleRange = function () {
        var t = this.Fi().Fe();
        return null === t ? null : { minValue: t.Nr(), maxValue: t.Sr() };
      }),
      (t.prototype.setVisibleRange = function (t) {
        this.Fi().De(t);
      }),
      (t.prototype.Fi = function () {
        return F(this.my.ri().dw(this.py)).Ht;
      }),
      t
    );
  })(),
  fe = (function () {
    function t(t, i) {
      ((this.gy = new $()),
        (this.zd = new $()),
        (this.qp = new $()),
        (this.zi = t),
        (this.Cu = t.zt()),
        (this.pg = i),
        this.Cu.y_().N(this.yy.bind(this)),
        this.Cu.k_().N(this.ky.bind(this)),
        this.pg.Gp().N(this.xy.bind(this)));
    }
    return (
      (t.prototype.D = function () {
        (this.Cu.y_().A(this),
          this.Cu.k_().A(this),
          this.pg.Gp().A(this),
          this.gy.D(),
          this.zd.D(),
          this.qp.D());
      }),
      (t.prototype.scrollPosition = function () {
        return this.Cu.f_();
      }),
      (t.prototype.scrollToPosition = function (t, i) {
        i ? this.Cu.g_(t, 1e3) : this.zi.qn(t);
      }),
      (t.prototype.scrollToRealTime = function () {
        this.Cu.p_();
      }),
      (t.prototype.getVisibleRange = function () {
        var t,
          i,
          n = this.Cu.Zd();
        return null === n
          ? null
          : {
              from:
                null !== (t = n.from.businessDay) && void 0 !== t
                  ? t
                  : n.from.timestamp,
              to:
                null !== (i = n.to.businessDay) && void 0 !== i
                  ? i
                  : n.to.timestamp,
            };
      }),
      (t.prototype.setVisibleRange = function (t) {
        var i = { from: Ir(t.from), to: Ir(t.to) },
          n = this.Cu.i_(i);
        this.zi.Iw(n);
      }),
      (t.prototype.getVisibleLogicalRange = function () {
        var t = this.Cu.Xd();
        return null === t ? null : { from: t.au(), to: t.fu() };
      }),
      (t.prototype.setVisibleLogicalRange = function (t) {
        (A(t.from <= t.to, "The from index cannot be after the to index."),
          this.zi.Iw(t));
      }),
      (t.prototype.resetTimeScale = function () {
        this.zi.Hn();
      }),
      (t.prototype.fitContent = function () {
        this.zi.N_();
      }),
      (t.prototype.logicalToCoordinate = function (t) {
        var i = this.zi.zt();
        return i.et() ? null : i.Yt(t);
      }),
      (t.prototype.coordinateToLogical = function (t) {
        return this.Cu.et() ? null : this.Cu.r_(t);
      }),
      (t.prototype.timeToCoordinate = function (t) {
        var i = Ir(t),
          n = this.Cu.Hc(i, !1);
        return null === n ? null : this.Cu.Yt(n);
      }),
      (t.prototype.coordinateToTime = function (t) {
        var i,
          n = this.zi.zt(),
          s = n.r_(t),
          h = n.vn(s);
        return null === h
          ? null
          : null !== (i = h.businessDay) && void 0 !== i
            ? i
            : h.timestamp;
      }),
      (t.prototype.width = function () {
        return this.pg.gp().Zt;
      }),
      (t.prototype.height = function () {
        return this.pg.gp().Qt;
      }),
      (t.prototype.subscribeVisibleTimeRangeChange = function (t) {
        this.gy.N(t);
      }),
      (t.prototype.unsubscribeVisibleTimeRangeChange = function (t) {
        this.gy.L(t);
      }),
      (t.prototype.subscribeVisibleLogicalRangeChange = function (t) {
        this.zd.N(t);
      }),
      (t.prototype.unsubscribeVisibleLogicalRangeChange = function (t) {
        this.zd.L(t);
      }),
      (t.prototype.subscribeSizeChange = function (t) {
        this.qp.N(t);
      }),
      (t.prototype.unsubscribeSizeChange = function (t) {
        this.qp.L(t);
      }),
      (t.prototype.applyOptions = function (t) {
        this.Cu.$s(t);
      }),
      (t.prototype.options = function () {
        return tt(this.Cu.K());
      }),
      (t.prototype.yy = function () {
        this.gy.F() && this.gy.P(this.getVisibleRange());
      }),
      (t.prototype.ky = function () {
        this.zd.F() && this.zd.P(this.getVisibleLogicalRange());
      }),
      (t.prototype.xy = function (t) {
        this.qp.P(t.Zt, t.Qt);
      }),
      t
    );
  })();
function ce(t) {
  if (void 0 !== t && "custom" !== t.type) {
    var i = t;
    void 0 !== i.minMove &&
      void 0 === i.precision &&
      (i.precision = (function (t) {
        if (t >= 1) return 0;
        for (var i = 0; i < 8; i++) {
          var n = Math.round(t);
          if (Math.abs(n - t) < 1e-8) return i;
          t *= 10;
        }
        return i;
      })(i.minMove));
  }
}
function ve(t) {
  return (
    (function (t) {
      if (G(t.handleScale)) {
        var i = t.handleScale;
        t.handleScale = {
          axisDoubleClickReset: i,
          axisPressedMouseMove: { time: i, price: i },
          mouseWheel: i,
          pinch: i,
        };
      } else if (
        void 0 !== t.handleScale &&
        G(t.handleScale.axisPressedMouseMove)
      ) {
        var n = t.handleScale.axisPressedMouseMove;
        t.handleScale.axisPressedMouseMove = { time: n, price: n };
      }
      var s = t.handleScroll;
      G(s) &&
        (t.handleScroll = {
          horzTouchDrag: s,
          vertTouchDrag: s,
          mouseWheel: s,
          pressedMouseMove: s,
        });
    })(t),
    (function (t) {
      if (t.priceScale) {
        ((t.leftPriceScale = t.leftPriceScale || {}),
          (t.rightPriceScale = t.rightPriceScale || {}));
        var i = t.priceScale.position;
        (delete t.priceScale.position,
          (t.leftPriceScale = K(t.leftPriceScale, t.priceScale)),
          (t.rightPriceScale = K(t.rightPriceScale, t.priceScale)),
          "left" === i &&
            ((t.leftPriceScale.visible = !0), (t.rightPriceScale.visible = !1)),
          "right" === i &&
            ((t.leftPriceScale.visible = !1), (t.rightPriceScale.visible = !0)),
          "none" === i &&
            ((t.leftPriceScale.visible = !1), (t.rightPriceScale.visible = !1)),
          (t.overlayPriceScales = t.overlayPriceScales || {}),
          void 0 !== t.priceScale.invertScale &&
            (t.overlayPriceScales.invertScale = t.priceScale.invertScale),
          void 0 !== t.priceScale.scaleMargins &&
            (t.overlayPriceScales.scaleMargins = t.priceScale.scaleMargins));
      }
    })(t),
    (function (t) {
      t.layout &&
        t.layout.backgroundColor &&
        !t.layout.background &&
        (t.layout.background = {
          type: "solid",
          color: t.layout.backgroundColor,
        });
    })(t),
    t
  );
}
var de = (function () {
  function t(t, i) {
    var n = this;
    ((this.Ny = new Ur()),
      (this.Sy = new Map()),
      (this.Cy = new Map()),
      (this.Ty = new $()),
      (this.Ly = new $()),
      (this.Ay = new $()),
      (this.Py = new $()));
    var s = void 0 === i ? tt(ne) : K(tt(ne), ve(i));
    ((this.my = new Nr(t, s)),
      this.my.bp().N(function (t) {
        n.Ty.F() && n.Ty.P(n.Fy(t()));
      }, this),
      this.my.bw().N(function (t) {
        n.Ly.F() && n.Ly.P(n.Fy(t()));
      }, this),
      this.my.mw().N(function (t) {
        n.Ay.F() && n.Ay.P(n.Dy(t()));
      }, this),
      this.my.pw().N(function (t) {
        n.Py.F() && n.Py.P(n.By(t()));
      }, this));
    var h = this.my.ri();
    this.Ey = new fe(h, this.my.Ng());
  }
  return (
    (t.prototype.setCrossHairXY = function (t, i, n) {
      this.my.xg()[0].Fp(t, i, n);
    }),
    (t.prototype.clearCrossHair = function () {
      this.my.xg()[0].Bp();
    }),
    (t.prototype.remove = function () {
      (this.my.bp().A(this),
        this.my.bw().A(this),
        this.my.mw().A(this),
        this.my.pw().A(this),
        this.Ey.D(),
        this.my.D(),
        this.Sy.clear(),
        this.Cy.clear(),
        this.Ty.D(),
        this.Ly.D(),
        this.Ay.D(),
        this.Py.D(),
        this.Ny.D());
    }),
    (t.prototype.resize = function (t, i, n) {
      this.my.gg(t, i, n);
    }),
    (t.prototype.addAreaSeries = function (t) {
      (void 0 === t && (t = {}), ce((t = Xr(t)).priceFormat));
      var i = K(tt(le), ee, t),
        n = this.my.ri().zw("Area", i),
        s = new Zr(n, this, this);
      return (this.Sy.set(s, n), this.Cy.set(n, s), s);
    }),
    (t.prototype.addBaselineSeries = function (t) {
      (void 0 === t && (t = {}), ce((t = Xr(t)).priceFormat));
      var i = K(tt(le), tt(ue), t),
        n = this.my.ri().zw("Baseline", i),
        s = new Zr(n, this, this);
      return (this.Sy.set(s, n), this.Cy.set(n, s), s);
    }),
    (t.prototype.addBarSeries = function (t) {
      (void 0 === t && (t = {}), ce((t = Xr(t)).priceFormat));
      var i = K(tt(le), he, t),
        n = this.my.ri().zw("Bar", i),
        s = new Zr(n, this, this);
      return (this.Sy.set(s, n), this.Cy.set(n, s), s);
    }),
    (t.prototype.addCandlestickSeries = function (t) {
      (void 0 === t && (t = {}), $h((t = Xr(t))), ce(t.priceFormat));
      var i = K(tt(le), se, t),
        n = this.my.ri().zw("Candlestick", i),
        s = new Qr(n, this, this);
      return (this.Sy.set(s, n), this.Cy.set(n, s), s);
    }),
    (t.prototype.addHistogramSeries = function (t) {
      (void 0 === t && (t = {}), ce((t = Xr(t)).priceFormat));
      var i = K(tt(le), oe, t),
        n = this.my.ri().zw("Histogram", i),
        s = new Zr(n, this, this);
      return (this.Sy.set(s, n), this.Cy.set(n, s), s);
    }),
    (t.prototype.addLineSeries = function (t) {
      (void 0 === t && (t = {}), ce((t = Xr(t)).priceFormat));
      var i = K(tt(le), re, t),
        n = this.my.ri().zw("Line", i),
        s = new Zr(n, this, this);
      return (this.Sy.set(s, n), this.Cy.set(n, s), s);
    }),
    (t.prototype.removeSeries = function (t) {
      var i = P(this.Sy.get(t)),
        n = this.Ny.Ww(i);
      (this.my.ri().Ww(i), this.Oy(n), this.Sy.delete(t), this.Cy.delete(i));
    }),
    (t.prototype.addLineTool = function (t, i, n) {
      var s = K(tt(Jt[t]), n || {}),
        h = this.my.ri().Vw(t, s, i);
      return new Gr(h);
    }),
    (t.prototype.setActiveLineTool = function (t, i) {
      this.my.ri().Mw().ma(t, i);
    }),
    (t.prototype.removeLineToolsById = function (t) {
      if (Array.isArray(t)) {
        var i = this.zy();
        if (null === i) return;
        (t.forEach(function (t) {
          var n = i.Uu(t);
          null !== n && i.Ye(n);
        }),
          i.uo());
      }
    }),
    (t.prototype.getSelectedLineTools = function () {
      var t = [],
        i = this.zy();
      if (null === i) return JSON.stringify(t);
      var n = i.Yu();
      return (
        n.length > 0 &&
          (t = n.map(function (t) {
            return t.dh();
          })),
        JSON.stringify(t)
      );
    }),
    (t.prototype.removeSelectedLineTools = function () {
      var t = this.zy();
      if (null !== t) {
        var i = t.Yu();
        i.length > 0 &&
          (i.forEach(function (i) {
            t.Ye(i);
          }),
          t.uo());
      }
    }),
    (t.prototype.removeAllLineTools = function () {
      var t = this.zy();
      if (null !== t) {
        var i = t.qu();
        i.length > 0 &&
          (i.forEach(function (i) {
            t.Ye(i);
          }),
          t.uo());
      }
    }),
    (t.prototype.exportLineTools = function () {
      var t = [],
        i = this.zy();
      if (null === i) return JSON.stringify(t);
      var n = i.qu();
      return (
        n.length > 0 &&
          (t = n.map(function (t) {
            return t.dh();
          })),
        JSON.stringify(t)
      );
    }),
    (t.prototype.importLineTools = function (t) {
      var i,
        n = this;
      if ("undefined" === t || !t) return !1;
      try {
        var s = JSON.parse(t);
        if (!Array.isArray(s)) return !1;
        i = s;
      } catch {
        return !1;
      }
      var h = !1;
      i.forEach(function (t) {
        if (t && "object" == typeof t)
          if (t.toolType && t.points && t.options && t.id)
            if (Array.isArray(t.points))
              if (_s[t.toolType])
                try {
                  n.addLineTool(t.toolType, t.points, t.options).by.qi(t.id);
                } catch {
                  h = !0;
                }
              else h = !0;
            else h = !0;
          else h = !0;
        else h = !0;
      });
      var r = this.zy();
      return (null !== r && r.uo(), !h);
    }),
    (t.prototype.applyLineToolOptions = function (t) {
      var i = this.zy();
      if (null === i) return !1;
      var n = i.Uu(t.id);
      return (
        null !== n &&
        (n.Gn() && n.Qs(!1),
        n.Ws(t.points),
        new Gr(n).applyOptions(t.options),
        !0)
      );
    }),
    (t.prototype.createOrUpdateLineTool = function (t, i, n, s) {
      var h = this.zy();
      if (null !== h) {
        var r,
          e = h.Uu(s);
        if (null !== e) ((r = new Gr(e)).setPoints(i), r.applyOptions(n));
        else (r = this.addLineTool(t, i, n)).by.qi(s);
      }
    }),
    (t.prototype.getLineToolByID = function (t) {
      var i = this.zy();
      if (null === i) return JSON.stringify([]);
      var n = i.Uu(t);
      return null === n ? JSON.stringify([]) : JSON.stringify([n.dh()]);
    }),
    (t.prototype.getLineToolsByIdRegex = function (t) {
      if (!(t instanceof RegExp)) return JSON.stringify([]);
      var i = this.zy();
      if (null === i) return JSON.stringify([]);
      for (var n = [], s = 0, h = i.qu(); s < h.length; s++) {
        var r = h[s];
        ((t.lastIndex = 0), t.test(r.Ji()) && n.push(r.dh()));
      }
      return JSON.stringify(n);
    }),
    (t.prototype.removeLineToolsByIdRegex = function (t) {
      if (t instanceof RegExp) {
        var i = this.zy();
        if (null !== i) {
          for (var n = 0, s = i.qu(); n < s.length; n++) {
            var h = s[n];
            ((t.lastIndex = 0), t.test(h.Ji()) && i.Ye(h));
          }
          i.uo();
        }
      }
    }),
    (t.prototype.My = function (t, i) {
      this.Oy(this.Ny.Qg(t, i));
    }),
    (t.prototype.vo = function (t, i) {
      this.Oy(this.Ny.sy(t, i));
    }),
    (t.prototype.subscribeClick = function (t) {
      this.Ty.N(t);
    }),
    (t.prototype.unsubscribeClick = function (t) {
      this.Ty.L(t);
    }),
    (t.prototype.subscribeCrosshairMove = function (t) {
      this.Ly.N(t);
    }),
    (t.prototype.unsubscribeCrosshairMove = function (t) {
      this.Ly.L(t);
    }),
    (t.prototype.subscribeLineToolsDoubleClick = function (t) {
      this.Ay.N(t);
    }),
    (t.prototype.unsubscribeLineToolsDoubleClick = function (t) {
      this.Ay.L(t);
    }),
    (t.prototype.subscribeLineToolsAfterEdit = function (t) {
      this.Py.N(t);
    }),
    (t.prototype.unsubscribeLineToolsAfterEdit = function (t) {
      this.Py.L(t);
    }),
    (t.prototype.priceScale = function (t) {
      return (void 0 === t && (t = this.my.ri().ga()), new ae(this.my, t));
    }),
    (t.prototype.timeScale = function () {
      return this.Ey;
    }),
    (t.prototype.applyOptions = function (t) {
      this.my.$s(ve(t));
    }),
    (t.prototype.options = function () {
      return this.my.K();
    }),
    (t.prototype.takeScreenshot = function () {
      return this.my.Cg();
    }),
    (t.prototype.Oy = function (t) {
      var i = this.my.ri();
      (i.Bw(t.zt.h_, t.zt.Es, t.zt.ly),
        t.uy.forEach(function (t, i) {
          return i._t(t.Mh, t.oy);
        }),
        i.l_());
    }),
    (t.prototype.Ry = function (t) {
      return P(this.Cy.get(t));
    }),
    (t.prototype.zy = function () {
      return this.my.ri()._w();
    }),
    (t.prototype.Fy = function (t) {
      var i = this,
        n = new Map();
      t.Rg.forEach(function (t, s) {
        n.set(i.Ry(s), t);
      });
      var s = void 0 === t.zg ? void 0 : this.Ry(t.zg);
      return {
        time: t.Nt && (t.Nt.businessDay || t.Nt.timestamp),
        point: t.Zl,
        hoveredSeries: s,
        hoveredMarkerId: t.Wg,
        seriesPrices: n,
      };
    }),
    (t.prototype.Dy = function (t) {
      return { selectedLineTool: t.Ig };
    }),
    (t.prototype.By = function (t) {
      return { selectedLineTool: t.Ig, stage: t.Hg };
    }),
    t
  );
})();
function _e(t, i) {
  var n;
  if (Q(t)) {
    var s = document.getElementById(t);
    (A(null !== s, "Cannot find element in DOM with id=".concat(t)), (n = s));
  } else n = t;
  return new de(n, i);
}
export {
  Jh as BoxHorizontalAlignment,
  Hh as BoxVerticalAlignment,
  Uh as ColorType,
  Nt as CrosshairMode,
  Ih as LastPriceAnimationMode,
  n as LineEnd,
  s as LineStyle,
  i as LineType,
  jh as PriceLineSource,
  qi as PriceScaleMode,
  qh as TextAlignment,
  Dh as TickMarkType,
  zh as TrackingModeExitMode,
  _e as createChart,
  Kh as isBusinessDay,
  Xh as isUTCTimestamp,
};
