/*
 countdown.js v2.6.1 http://countdownjs.org
 Copyright (c)2006-2014 Stephen M. McKamey.
 Licensed under The MIT License.
*/
var countdown = (function () {
    function d(a, b) {
      var c = a.getTime();
      a.setMonth(a.getMonth() + b);
      return Math.round((a.getTime() - c) / 864e5);
    }
    function f(a) {
      var b = a.getTime(),
        c = new Date(b);
      c.setMonth(a.getMonth() + 1);
      return Math.round((c.getTime() - b) / 864e5);
    }
    function g(a, b) {
      b =
        b instanceof Date || (null !== b && isFinite(b))
          ? new Date(+b)
          : new Date();
      if (!a) return b;
      var c = +a.value || 0;
      if (c) return b.setTime(b.getTime() + c), b;
      (c = +a.milliseconds || 0) && b.setMilliseconds(b.getMilliseconds() + c);
      (c = +a.seconds || 0) && b.setSeconds(b.getSeconds() + c);
      (c = +a.minutes || 0) && b.setMinutes(b.getMinutes() + c);
      (c = +a.hours || 0) && b.setHours(b.getHours() + c);
      (c = +a.weeks || 0) && (c *= 7);
      (c += +a.days || 0) && b.setDate(b.getDate() + c);
      (c = +a.months || 0) && b.setMonth(b.getMonth() + c);
      (c = +a.millennia || 0) && (c *= 10);
      (c += +a.centuries || 0) && (c *= 10);
      (c += +a.decades || 0) && (c *= 10);
      (c += +a.years || 0) && b.setFullYear(b.getFullYear() + c);
      return b;
    }
    function r(a, b) {
      return A(a) + (1 === a ? v[b] : w[b]);
    }
    function q() {}
    function m(a, b, c, d, e, h) {
      0 <= a[c] && ((b += a[c]), delete a[c]);
      b /= e;
      if (1 >= b + 1) return 0;
      if (0 <= a[d]) {
        a[d] = +(a[d] + b).toFixed(h);
        switch (d) {
          case "seconds":
            if (60 !== a.seconds || isNaN(a.minutes)) break;
            a.minutes++;
            a.seconds = 0;
          case "minutes":
            if (60 !== a.minutes || isNaN(a.hours)) break;
            a.hours++;
            a.minutes = 0;
          case "hours":
            if (24 !== a.hours || isNaN(a.days)) break;
            a.days++;
            a.hours = 0;
          case "days":
            if (7 !== a.days || isNaN(a.weeks)) break;
            a.weeks++;
            a.days = 0;
          case "weeks":
            if (a.weeks !== f(a.refMonth) / 7 || isNaN(a.months)) break;
            a.months++;
            a.weeks = 0;
          case "months":
            if (12 !== a.months || isNaN(a.years)) break;
            a.years++;
            a.months = 0;
          case "years":
            if (10 !== a.years || isNaN(a.decades)) break;
            a.decades++;
            a.years = 0;
          case "decades":
            if (10 !== a.decades || isNaN(a.centuries)) break;
            a.centuries++;
            a.decades = 0;
          case "centuries":
            10 !== a.centuries ||
              isNaN(a.millennia) ||
              (a.millennia++, (a.centuries = 0));
        }
        return 0;
      }
      return b;
    }
    function u(a, b, c, l, e, g) {
      var n = new Date();
      a.start = b = b || n;
      a.end = c = c || n;
      a.units = l;
      a.value = c.getTime() - b.getTime();
      0 > a.value && ((n = c), (c = b), (b = n));
      if (0 < a.value)
        return (
          clearInterval(timerId),
          (a.millennia = 0),
          (a.centuries = 0),
          (a.decades = 0),
          (a.years = 0),
          (a.months = 0),
          (a.weeks = 0),
          (a.days = 0),
          (a.hours = 0),
          (a.minutes = 0),
          (a.seconds = 0),
          (a.milliseconds = 0),
          a
        );
      a.refMonth = new Date(b.getFullYear(), b.getMonth(), 15, 12, 0, 0);
      try {
        a.millennia = 0;
        a.centuries = 0;
        a.decades = 0;
        a.years = c.getFullYear() - b.getFullYear();
        a.months = c.getMonth() - b.getMonth();
        a.weeks = 0;
        a.days = c.getDate() - b.getDate();
        a.hours = c.getHours() - b.getHours();
        a.minutes = c.getMinutes() - b.getMinutes();
        a.seconds = c.getSeconds() - b.getSeconds();
        a.milliseconds = c.getMilliseconds() - b.getMilliseconds();
        if (0 > a.milliseconds) {
          var p = t(-a.milliseconds / 1e3);
          a.seconds -= p;
          a.milliseconds += 1e3 * p;
        } else
          1e3 <= a.milliseconds &&
            ((a.seconds += h(a.milliseconds / 1e3)), (a.milliseconds %= 1e3));
        0 > a.seconds
          ? ((p = t(-a.seconds / 60)), (a.minutes -= p), (a.seconds += 60 * p))
          : 60 <= a.seconds &&
            ((a.minutes += h(a.seconds / 60)), (a.seconds %= 60));
        0 > a.minutes
          ? ((p = t(-a.minutes / 60)), (a.hours -= p), (a.minutes += 60 * p))
          : 60 <= a.minutes &&
            ((a.hours += h(a.minutes / 60)), (a.minutes %= 60));
        0 > a.hours
          ? ((p = t(-a.hours / 24)), (a.days -= p), (a.hours += 24 * p))
          : 24 <= a.hours && ((a.days += h(a.hours / 24)), (a.hours %= 24));
        for (; 0 > a.days; ) a.months--, (a.days += d(a.refMonth, 1));
        7 <= a.days && ((a.weeks += h(a.days / 7)), (a.days %= 7));
        0 > a.months
          ? ((p = t(-a.months / 12)), (a.years -= p), (a.months += 12 * p))
          : 12 <= a.months && ((a.years += h(a.months / 12)), (a.months %= 12));
        10 <= a.years &&
          ((a.decades += h(a.years / 10)),
          (a.years %= 10),
          10 <= a.decades &&
            ((a.centuries += h(a.decades / 10)),
            (a.decades %= 10),
            10 <= a.centuries &&
              ((a.millennia += h(a.centuries / 10)), (a.centuries %= 10))));
        b = 0;
        !(l & 1024) || b >= e
          ? ((a.centuries += 10 * a.millennia), delete a.millennia)
          : a.millennia && b++;
        !(l & 512) || b >= e
          ? ((a.decades += 10 * a.centuries), delete a.centuries)
          : a.centuries && b++;
        !(l & 256) || b >= e
          ? ((a.years += 10 * a.decades), delete a.decades)
          : a.decades && b++;
        !(l & 128) || b >= e
          ? ((a.months += 12 * a.years), delete a.years)
          : a.years && b++;
        !(l & 64) || b >= e
          ? (a.months && (a.days += d(a.refMonth, a.months)),
            delete a.months,
            7 <= a.days && ((a.weeks += h(a.days / 7)), (a.days %= 7)))
          : a.months && b++;
        !(l & 32) || b >= e
          ? ((a.days += 7 * a.weeks), delete a.weeks)
          : a.weeks && b++;
        !(l & 16) || b >= e
          ? ((a.hours += 24 * a.days), delete a.days)
          : a.days && b++;
        !(l & 8) || b >= e
          ? ((a.minutes += 60 * a.hours), delete a.hours)
          : a.hours && b++;
        !(l & 4) || b >= e
          ? ((a.seconds += 60 * a.minutes), delete a.minutes)
          : a.minutes && b++;
        !(l & 2) || b >= e
          ? ((a.milliseconds += 1e3 * a.seconds), delete a.seconds)
          : a.seconds && b++;
        if (!(l & 1) || b >= e) {
          var k = m(a, 0, "milliseconds", "seconds", 1e3, g);
          if (
            k &&
            (k = m(a, k, "seconds", "minutes", 60, g)) &&
            (k = m(a, k, "minutes", "hours", 60, g)) &&
            (k = m(a, k, "hours", "days", 24, g)) &&
            (k = m(a, k, "days", "weeks", 7, g)) &&
            (k = m(a, k, "weeks", "months", f(a.refMonth) / 7, g))
          ) {
            l = k;
            var r = a.refMonth,
              q = r.getTime(),
              B = new Date(q);
            B.setFullYear(r.getFullYear() + 1);
            var E = Math.round((B.getTime() - q) / 864e5);
            if ((k = m(a, l, "months", "years", E / f(a.refMonth), g)))
              if ((k = m(a, k, "years", "decades", 10, g)))
                if ((k = m(a, k, "decades", "centuries", 10, g)))
                  if ((k = m(a, k, "centuries", "millennia", 10, g)))
                    throw Error("Fractional unit overflow");
          }
        }
      } finally {
        delete a.refMonth;
      }
      return a;
    }
    function e(a, b, c, d, e) {
      c = +c || 222;
      d = 0 < d ? d : NaN;
      e = 0 < e ? (20 > e ? Math.round(e) : 20) : 0;
      var l = null;
      if ("function" === typeof a) {
        var h = a;
        a = null;
      } else
        a instanceof Date ||
          (null !== a && isFinite(a)
            ? (a = new Date(+a))
            : ("object" === typeof l && (l = a), (a = null)));
      var f = null;
      "function" === typeof b
        ? ((h = b), (b = null))
        : b instanceof Date ||
          (null !== b && isFinite(b)
            ? (b = new Date(+b))
            : ("object" === typeof b && (f = b), (b = null)));
      l && (a = g(l, b));
      f && (b = g(f, a));
      if (!a && !b) return new q();
      if (!h) return u(new q(), a, b, c, d, e);
      l =
        c & 1
          ? 1e3 / 30
          : c & 2
          ? 1e3
          : c & 4
          ? 6e4
          : c & 8
          ? 36e5
          : c & 16
          ? 864e5
          : 6048e5;
      var k;
      f = function () {
        h(u(new q(), a, b, c, d, e), k);
      };
      f();
      return (k = setInterval(f, l));
    }
    var t = Math.ceil,
      h = Math.floor,
      v,
      w,
      x,
      y,
      z,
      n,
      A;
    q.prototype.toString = function (a) {
      var b = C(this),
        c = b.length;
      if (!c) return a ? "" + a : z;
      if (1 === c) return b[0];
      a = x + b.pop();
      return b.join(y) + a;
    };
    q.prototype.toHTML = function (a, b) {
      a = a || "span";
      var c = C(this),
        d = c.length;
      if (!d) return (b = b || z) ? "<" + a + ">" + b + "</" + a + ">" : b;
      for (b = 0; b < d; b++) c[b] = "<" + a + ">" + c[b] + "</" + a + ">";
      if (1 === d) return c[0];
      a = x + c.pop();
      return c.join(y) + a;
    };
    q.prototype.addTo = function (a) {
      return g(this, a);
    };
    var C = function (a) {
      var b = [],
        c = a.millennia;
      c && b.push(n(c, 10));
      (c = a.centuries) && b.push(n(c, 9));
      (c = a.decades) && b.push(n(c, 8));
      (c = a.years) && b.push(n(c, 7));
      (c = a.months) && b.push(n(c, 6));
      (c = a.weeks) && b.push(n(c, 5));
      (c = a.days) && b.push(n(c, 4));
      (c = a.hours) && b.push(n(c, 3));
      (c = a.minutes) && b.push(n(c, 2));
      (c = a.seconds) && b.push(n(c, 1));
      (c = a.milliseconds) && b.push(n(c, 0));
      return b;
    };
    e.MILLISECONDS = 1;
    e.SECONDS = 2;
    e.MINUTES = 4;
    e.HOURS = 8;
    e.DAYS = 16;
    e.WEEKS = 32;
    e.MONTHS = 64;
    e.YEARS = 128;
    e.DECADES = 256;
    e.CENTURIES = 512;
    e.MILLENNIA = 1024;
    e.DEFAULTS = 222;
    e.ALL = 2047;
    var F = (e.setFormat = function (a) {
        if (a) {
          if ("singular" in a || "plural" in a) {
            var b = a.singular || [];
            b.split && (b = b.split("|"));
            var c = a.plural || [];
            c.split && (c = c.split("|"));
            for (var d = 0; 10 >= d; d++)
              (v[d] = b[d] || v[d]), (w[d] = c[d] || w[d]);
          }
          "string" === typeof a.last && (x = a.last);
          "string" === typeof a.delim && (y = a.delim);
          "string" === typeof a.empty && (z = a.empty);
          "function" === typeof a.formatNumber && (A = a.formatNumber);
          "function" === typeof a.formatter && (n = a.formatter);
        }
      }),
      D = (e.resetFormat = function () {
        v =
          " millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(
            ";"
          );
        w =
          " milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(
            ";"
          );
        x = " and ";
        y = ", ";
        z = "";
        A = function (a) {
          return a;
        };
        n = r;
      });
    e.setLabels = function (a, b, c, d, e, g, f) {
      F({
        singular: a,
        plural: b,
        last: c,
        delim: d,
        empty: e,
        formatNumber: g,
        formatter: f,
      });
    };
    e.resetLabels = D;
    D();
    "undefined" !== typeof module && module.exports
      ? (module.exports = e)
      : "undefined" !== typeof window &&
        "function" === typeof window.define &&
        "undefined" !== typeof window.define.amd &&
        window.define("countdown", [], function () {
          return e;
        });
    return e;
  })(),
  DIRECTIVE_KEY_MAP = {
    Y: "years",
    m: "months",
    n: "daysToMonth",
    d: "daysToWeek",
    w: "weeks",
    W: "weeksToMonth",
    H: "hours",
    M: "minutes",
    S: "seconds",
    D: "days",
    I: "totalHours",
    N: "totalMinutes",
    T: "totalSeconds",
  };
function escapedRegExp(d) {
  d = d.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  return new RegExp(d);
}
function strftime(d) {
  return function (f) {
    var g = f.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
    if (g)
      for (var r = 0, q = g.length; r < q; ++r) {
        var m = g[r].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
          u = escapedRegExp(m[0]),
          e = m[1] || "",
          t = m[3] || "",
          h = null;
        m = m[2];
        DIRECTIVE_KEY_MAP.hasOwnProperty(m) &&
          ((h = DIRECTIVE_KEY_MAP[m]), (h = Number(d[h])));
        null !== h &&
          ("!" === e && (h = pluralize(t, h)),
          "" === e && 10 > h && (h = "0" + h.toString()),
          (f = f.replace(u, h.toString())));
      }
    return (f = f.replace(/%%/, "%"));
  };
}
function pluralize(d, f) {
  var g = "s",
    r = "";
  d &&
    ((d = d.replace(/(:|;|\s)/gi, "").split(/,/)),
    1 === d.length ? (g = d[0]) : ((r = d[0]), (g = d[1])));
  return 1 < Math.abs(f) ? g : r;
}
var matchers = [];
matchers.push(/^[0-9]*$/.source);
matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
matchers.push(
  /[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source
);
matchers = new RegExp(matchers.join("|"));
function parseDateString(d) {
  if (d instanceof Date) return d;
  if (String(d).match(matchers))
    return (
      String(d).match(/^[0-9]*$/) && (d = Number(d)),
      String(d).match(/\//) && (d = String(d).replace(/\//g, "-")),
      new Date(d)
    );
  throw Error("Couldn't cast `" + d + "` to a date object.");
}
var isBuilder = document.querySelector("html").classList.contains("is-builder"),
  timerId = null;
function initCountdown() {
  document
    .querySelectorAll(".countdown:not(.countdown-inited)")
    .forEach(function (d, f) {
      d.classList.add("countdown-inited");
      f = parseDateString(d.getAttribute("data-due-date"));
      clearInterval(timerId);
      timerId = countdown(f, function (g) {
        g.strftime = strftime(g);
        var f = d
            .closest(".countdown-cont")
            .querySelector("div.daysCountdown")
            .getAttribute("title"),
          q = d
            .closest(".countdown-cont")
            .querySelector("div.hoursCountdown")
            .getAttribute("title"),
          m = d
            .closest(".countdown-cont")
            .querySelector("div.minutesCountdown")
            .getAttribute("title"),
          u = d
            .closest(".countdown-cont")
            .querySelector("div.secondsCountdown")
            .getAttribute("title");
        d.innerHTML = g.strftime(
          [
            '<div class="row"><div class="col-3"><div class="number-wrap"><span class="number display-2"><b>%D</b></span><span mbr-text class="period display-7">',
            f,
            '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number display-2"><b>%H</b></span><span mbr-text class="period display-7">',
            q,
            '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number display-2"><b>%M</b></span><span mbr-text class="period display-7">',
            m,
            '</span><span class="dot">:</span></div></div><div class="col-3"><div class="number-wrap"><span class="number display-2"><b>%S</b></span><span mbr-text class="period display-7">',
            u,
            "</span></div></div></div>",
          ].join("")
        );
      });
    });
  document
    .querySelectorAll(".countdown:not(.countdown-inited)")
    .forEach(function (d) {
      new countdown(d.getAttribute("data-due-date"), function (f) {
        d.textContent = f.strftime("%D days %H:%M:%S");
      });
    });
}
function changeCountdown(d, f) {
  var g = /\d\d:\d\d/g;
  target = d.querySelector(".countdown");
  if (-1 < f.search(/\d\d\d\d\/\d\d\/\d\d/g) || -1 < f.search(g))
    target.classList.remove("countdown-inited"), initCountdown();
}
if (isBuilder)
  $(document)
    .on("add.cards", function (d) {
      0 != $(".countdown").length && initCountdown();
    })
    .on("changeParameter.cards", function (d, f, g) {
      ("countdownDate" !== f && "countdownTime" !== f) ||
        changeCountdown(d.target, g);
    })
    .on("delete.cards", function (d) {
      clearInterval(timerId);
    });
else 0 != document.querySelectorAll(".countdown").length && initCountdown();


