// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// Place any jQuery/helper plugins in here.

/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
  var t =
      [].indexOf ||
      function (t) {
        for (var e = 0, n = this.length; e < n; e++) {
          if (e in this && this[e] === t) return e;
        }
        return -1;
      },
    e = [].slice;
  (function (t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function (n) {
        return e(n, t);
      });
    } else {
      return e(t.jQuery, t);
    }
  })(this, function (n, r) {
    var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
    i = n(r);
    c = t.call(r, "ontouchstart") >= 0;
    s = { horizontal: {}, vertical: {} };
    f = 1;
    a = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = (function () {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
        this.waypoints = { horizontal: {}, vertical: {} };
        t.data(u, this.id);
        a[this.id] = this;
        t.bind(y, function () {
          var t;
          if (!(e.didScroll || c)) {
            e.didScroll = true;
            t = function () {
              e.doScroll();
              return (e.didScroll = false);
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle);
          }
        });
        t.bind(p, function () {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function () {
              n[m]("refresh");
              return (e.didResize = false);
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle);
          }
        });
      }
      t.prototype.doScroll = function () {
        var t,
          e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
          },
        };
        if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh");
        }
        n.each(t, function (t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function (t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e);
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e);
            }
          });
          l.sort(function (t, e) {
            return t.offset - e.offset;
          });
          if (!o) {
            l.reverse();
          }
          return n.each(l, function (t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i]);
            }
          });
        });
        return (this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll,
        });
      };
      t.prototype.refresh = function () {
        var t,
          e,
          r,
          i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left",
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r
              ? n[m]("viewportHeight")
              : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top",
          },
        };
        return n.each(t, function (t, e) {
          return n.each(i.waypoints[t], function (t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element);
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil((e.contextDimension * i) / 100);
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if ((r.options.onlyOnScroll && l != null) || !r.enabled) {
              return;
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward]);
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward]);
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward]);
            }
          });
        });
      };
      t.prototype.checkEmpty = function () {
        if (
          n.isEmptyObject(this.waypoints.horizontal) &&
          n.isEmptyObject(this.waypoints.vertical)
        ) {
          this.$element.unbind([p, y].join(" "));
          return delete a[this.id];
        }
      };
      return t;
    })();
    l = (function () {
      function t(t, e, r) {
        var i, o;
        r = n.extend({}, n.fn[g].defaults, r);
        if (r.offset === "bottom-in-view") {
          r.offset = function () {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height();
            }
            return t - n(this).outerHeight();
          };
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = t.data(w)) != null ? o : [];
        i.push(this.id);
        t.data(w, i);
      }
      t.prototype.trigger = function (t) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };
      t.prototype.disable = function () {
        return (this.enabled = false);
      };
      t.prototype.enable = function () {
        this.context.refresh();
        return (this.enabled = true);
      };
      t.prototype.destroy = function () {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };
      t.getWaypointsByElement = function (t) {
        var e, r;
        r = n(t).data(w);
        if (!r) {
          return [];
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function (t) {
          return e[t];
        });
      };
      return t;
    })();
    d = {
      init: function (t, e) {
        var r;
        if (e == null) {
          e = {};
        }
        if ((r = e.handler) == null) {
          e.handler = t;
        }
        this.each(function () {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i);
          }
          i = n(i);
          r = a[i.data(u)];
          if (!r) {
            r = new o(i);
          }
          return new l(t, r, e);
        });
        n[m]("refresh");
        return this;
      },
      disable: function () {
        return d._invoke(this, "disable");
      },
      enable: function () {
        return d._invoke(this, "enable");
      },
      destroy: function () {
        return d._invoke(this, "destroy");
      },
      prev: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1]);
          }
        });
      },
      next: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1]);
          }
        });
      },
      _traverse: function (t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical";
        }
        if (e == null) {
          e = r;
        }
        l = h.aggregate(e);
        o = [];
        this.each(function () {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t]);
        });
        return this.pushStack(o);
      },
      _invoke: function (t, e) {
        t.each(function () {
          var t;
          t = l.getWaypointsByElement(this);
          return n.each(t, function (t, n) {
            n[e]();
            return true;
          });
        });
        return this;
      },
    };
    n.fn[g] = function () {
      var t, r;
      (r = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (d[r]) {
        return d[r].apply(this, t);
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments);
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r]);
      } else if (!r) {
        return n.error(
          "jQuery Waypoints needs a callback function or handler option."
        );
      } else {
        return n.error(
          "The " + r + " method does not exist in jQuery Waypoints."
        );
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false,
    };
    h = {
      refresh: function () {
        return n.each(a, function (t, e) {
          return e.refresh();
        });
      },
      viewportHeight: function () {
        var t;
        return (t = r.innerHeight) != null ? t : i.height();
      },
      aggregate: function (t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
        }
        if (!e) {
          return [];
        }
        r = { horizontal: [], vertical: [] };
        n.each(r, function (t, i) {
          n.each(e[t], function (t, e) {
            return i.push(e);
          });
          i.sort(function (t, e) {
            return t.offset - e.offset;
          });
          r[t] = n.map(i, function (t) {
            return t.element;
          });
          return (r[t] = n.unique(r[t]));
        });
        return r;
      },
      above: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset <= t.oldScroll.y;
        });
      },
      below: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset > t.oldScroll.y;
        });
      },
      left: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset <= t.oldScroll.x;
        });
      },
      right: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset > t.oldScroll.x;
        });
      },
      enable: function () {
        return h._invoke("enable");
      },
      disable: function () {
        return h._invoke("disable");
      },
      destroy: function () {
        return h._invoke("destroy");
      },
      extendFn: function (t, e) {
        return (d[t] = e);
      },
      _invoke: function (t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function (e, n) {
          n[t]();
          return true;
        });
      },
      _filter: function (t, e, r) {
        var i, o;
        i = a[n(t).data(u)];
        if (!i) {
          return [];
        }
        o = [];
        n.each(i.waypoints[e], function (t, e) {
          if (r(i, e)) {
            return o.push(e);
          }
        });
        o.sort(function (t, e) {
          return t.offset - e.offset;
        });
        return n.map(o, function (t) {
          return t.element;
        });
      },
    };
    n[m] = function () {
      var t, n;
      (n = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (h[n]) {
        return h[n].apply(null, t);
      } else {
        return h.aggregate.call(null, n);
      }
    };
    n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
    return i.load(function () {
      return n[m]("refresh");
    });
  });
}).call(this);

//OWL Carousel

!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this.drag = a.extend({}, m)),
      (this.state = a.extend({}, n)),
      (this.e = a.extend({}, o)),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._invalidated = {}),
      (this._pipe = []),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Pipe,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  function f(a) {
    if (a.touches !== d)
      return { x: a.touches[0].pageX, y: a.touches[0].pageY };
    if (a.touches === d) {
      if (a.pageX !== d) return { x: a.pageX, y: a.pageY };
      if (a.pageX === d) return { x: a.clientX, y: a.clientY };
    }
  }
  function g(a) {
    var b,
      d,
      e = c.createElement("div"),
      f = a;
    for (b in f)
      if (((d = f[b]), "undefined" != typeof e.style[d]))
        return (e = null), [d, b];
    return [!1];
  }
  function h() {
    return g([
      "transition",
      "WebkitTransition",
      "MozTransition",
      "OTransition",
    ])[1];
  }
  function i() {
    return g([
      "transform",
      "WebkitTransform",
      "MozTransform",
      "OTransform",
      "msTransform",
    ])[0];
  }
  function j() {
    return g([
      "perspective",
      "webkitPerspective",
      "MozPerspective",
      "OPerspective",
      "MsPerspective",
    ])[0];
  }
  function k() {
    return "ontouchstart" in b || !!navigator.msMaxTouchPoints;
  }
  function l() {
    return b.navigator.msPointerEnabled;
  }
  var m, n, o;
  (m = {
    start: 0,
    startX: 0,
    startY: 0,
    current: 0,
    currentX: 0,
    currentY: 0,
    offsetX: 0,
    offsetY: 0,
    distance: null,
    startTime: 0,
    endTime: 0,
    updatedX: 0,
    targetEl: null,
  }),
    (n = {
      isTouch: !1,
      isScrolling: !1,
      isSwiping: !1,
      direction: !1,
      inMotion: !1,
    }),
    (o = {
      _onDragStart: null,
      _onDragMove: null,
      _onDragEnd: null,
      _transitionEnd: null,
      _resizer: null,
      _responsiveCall: null,
      _goToLoop: null,
      _checkVisibile: null,
    }),
    (e.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: b,
      responsiveClass: !1,
      fallbackEasing: "swing",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      themeClass: "owl-theme",
      baseClass: "owl-carousel",
      itemClass: "owl-item",
      centerClass: "center",
      activeClass: "active",
    }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Plugins = {}),
    (e.Pipe = [
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var a = this._clones,
            b = this.$stage.children(".cloned");
          (b.length !== a.length || (!this.settings.loop && a.length > 0)) &&
            (this.$stage.children(".cloned").remove(), (this._clones = []));
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var a,
            b,
            c = this._clones,
            d = this._items,
            e = this.settings.loop
              ? c.length - Math.max(2 * this.settings.items, 4)
              : 0;
          for (a = 0, b = Math.abs(e / 2); b > a; a++)
            e > 0
              ? (this.$stage
                  .children()
                  .eq(d.length + c.length - 1)
                  .remove(),
                c.pop(),
                this.$stage.children().eq(0).remove(),
                c.pop())
              : (c.push(c.length / 2),
                this.$stage.append(
                  d[c[c.length - 1]].clone().addClass("cloned")
                ),
                c.push(d.length - 1 - (c.length - 1) / 2),
                this.$stage.prepend(
                  d[c[c.length - 1]].clone().addClass("cloned")
                ));
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d = this.settings.rtl ? 1 : -1,
            e = (this.width() / this.settings.items).toFixed(3),
            f = 0;
          for (
            this._coordinates = [],
              b = 0,
              c = this._clones.length + this._items.length;
            c > b;
            b++
          )
            (a = this._mergers[this.relative(b)]),
              (a =
                (this.settings.mergeFit && Math.min(a, this.settings.items)) ||
                a),
              (f +=
                (this.settings.autoWidth
                  ? this._items[this.relative(b)].width() + this.settings.margin
                  : e * a) * d),
              this._coordinates.push(f);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var b,
            c,
            d = (this.width() / this.settings.items).toFixed(3),
            e = {
              width:
                Math.abs(this._coordinates[this._coordinates.length - 1]) +
                2 * this.settings.stagePadding,
              "padding-left": this.settings.stagePadding || "",
              "padding-right": this.settings.stagePadding || "",
            };
          if (
            (this.$stage.css(e),
            (e = {
              width: this.settings.autoWidth
                ? "auto"
                : d - this.settings.margin,
            }),
            (e[this.settings.rtl ? "margin-left" : "margin-right"] =
              this.settings.margin),
            !this.settings.autoWidth &&
              a.grep(this._mergers, function (a) {
                return a > 1;
              }).length > 0)
          )
            for (b = 0, c = this._coordinates.length; c > b; b++)
              (e.width =
                Math.abs(this._coordinates[b]) -
                Math.abs(this._coordinates[b - 1] || 0) -
                this.settings.margin),
                this.$stage.children().eq(b).css(e);
          else this.$stage.children().css(e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current && this.reset(this.$stage.children().index(a.current));
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; d > c; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage
            .children("." + this.settings.activeClass)
            .removeClass(this.settings.activeClass),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass(this.settings.activeClass),
            this.settings.center &&
              (this.$stage
                .children("." + this.settings.centerClass)
                .removeClass(this.settings.centerClass),
              this.$stage
                .children()
                .eq(this.current())
                .addClass(this.settings.centerClass));
        },
      },
    ]),
    (e.prototype.initialize = function () {
      if (
        (this.trigger("initialize"),
        this.$element
          .addClass(this.settings.baseClass)
          .addClass(this.settings.themeClass)
          .toggleClass("owl-rtl", this.settings.rtl),
        this.browserSupport(),
        this.settings.autoWidth && this.state.imagesLoaded !== !0)
      ) {
        var b, c, e;
        if (
          ((b = this.$element.find("img")),
          (c = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && 0 >= e)
        )
          return this.preloadAutoWidthImages(b), !1;
      }
      this.$element.addClass("owl-loading"),
        (this.$stage = a(
          "<" + this.settings.stageElement + ' class="owl-stage"/>'
        ).wrap('<div class="owl-stage-outer">')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        (this._width = this.$element.width()),
        this.refresh(),
        this.$element.removeClass("owl-loading").addClass("owl-loaded"),
        this.eventsCall(),
        this.internalEvents(),
        this.addTriggerableEvents(),
        this.trigger("initialized");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            b >= a && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          delete e.responsive,
          e.responsiveClass &&
            this.$element
              .attr("class", function (a, b) {
                return b.replace(/\b owl-responsive-\S+/g, "");
              })
              .addClass("owl-responsive-" + d))
        : (e = a.extend({}, this.options)),
        (null === this.settings || this._breakpoint !== d) &&
          (this.trigger("change", { property: { name: "settings", value: e } }),
          (this._breakpoint = d),
          (this.settings = e),
          this.invalidate("settings"),
          this.trigger("changed", {
            property: { name: "settings", value: this.settings },
          }));
    }),
    (e.prototype.optionsLogic = function () {
      this.$element.toggleClass("owl-center", this.settings.center),
        this.settings.loop &&
          this._items.length < this.settings.items &&
          (this.settings.loop = !1),
        this.settings.autoWidth &&
          ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.settings.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        c > b;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      this._invalidated = {};
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      if (0 === this._items.length) return !1;
      new Date().getTime();
      this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$stage.addClass("owl-refresh"),
        this.update(),
        this.$stage.removeClass("owl-refresh"),
        (this.state.orientation = b.orientation),
        this.watchVisibility(),
        this.trigger("refreshed");
    }),
    (e.prototype.eventsCall = function () {
      (this.e._onDragStart = a.proxy(function (a) {
        this.onDragStart(a);
      }, this)),
        (this.e._onDragMove = a.proxy(function (a) {
          this.onDragMove(a);
        }, this)),
        (this.e._onDragEnd = a.proxy(function (a) {
          this.onDragEnd(a);
        }, this)),
        (this.e._onResize = a.proxy(function (a) {
          this.onResize(a);
        }, this)),
        (this.e._transitionEnd = a.proxy(function (a) {
          this.transitionEnd(a);
        }, this)),
        (this.e._preventClick = a.proxy(function (a) {
          this.preventClick(a);
        }, this));
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this.e._onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return this._items.length
        ? this._width === this.$element.width()
          ? !1
          : this.trigger("resize").isDefaultPrevented()
          ? !1
          : ((this._width = this.$element.width()),
            this.invalidate("width"),
            this.refresh(),
            void this.trigger("resized"))
        : !1;
    }),
    (e.prototype.eventsRouter = function (a) {
      var b = a.type;
      "mousedown" === b || "touchstart" === b
        ? this.onDragStart(a)
        : "mousemove" === b || "touchmove" === b
        ? this.onDragMove(a)
        : "mouseup" === b || "touchend" === b
        ? this.onDragEnd(a)
        : "touchcancel" === b && this.onDragEnd(a);
    }),
    (e.prototype.internalEvents = function () {
      var c = (k(), l());
      this.settings.mouseDrag
        ? (this.$stage.on(
            "mousedown",
            a.proxy(function (a) {
              this.eventsRouter(a);
            }, this)
          ),
          this.$stage.on("dragstart", function () {
            return !1;
          }),
          (this.$stage.get(0).onselectstart = function () {
            return !1;
          }))
        : this.$element.addClass("owl-text-select-on"),
        this.settings.touchDrag &&
          !c &&
          this.$stage.on(
            "touchstart touchcancel",
            a.proxy(function (a) {
              this.eventsRouter(a);
            }, this)
          ),
        this.transitionEndVendor &&
          this.on(
            this.$stage.get(0),
            this.transitionEndVendor,
            this.e._transitionEnd,
            !1
          ),
        this.settings.responsive !== !1 &&
          this.on(b, "resize", a.proxy(this.onThrottledResize, this));
    }),
    (e.prototype.onDragStart = function (d) {
      var e, g, h, i;
      if (
        ((e = d.originalEvent || d || b.event),
        3 === e.which || this.state.isTouch)
      )
        return !1;
      if (
        ("mousedown" === e.type && this.$stage.addClass("owl-grab"),
        this.trigger("drag"),
        (this.drag.startTime = new Date().getTime()),
        this.speed(0),
        (this.state.isTouch = !0),
        (this.state.isScrolling = !1),
        (this.state.isSwiping = !1),
        (this.drag.distance = 0),
        (g = f(e).x),
        (h = f(e).y),
        (this.drag.offsetX = this.$stage.position().left),
        (this.drag.offsetY = this.$stage.position().top),
        this.settings.rtl &&
          (this.drag.offsetX =
            this.$stage.position().left +
            this.$stage.width() -
            this.width() +
            this.settings.margin),
        this.state.inMotion && this.support3d)
      )
        (i = this.getTransformProperty()),
          (this.drag.offsetX = i),
          this.animate(i),
          (this.state.inMotion = !0);
      else if (this.state.inMotion && !this.support3d)
        return (this.state.inMotion = !1), !1;
      (this.drag.startX = g - this.drag.offsetX),
        (this.drag.startY = h - this.drag.offsetY),
        (this.drag.start = g - this.drag.startX),
        (this.drag.targetEl = e.target || e.srcElement),
        (this.drag.updatedX = this.drag.start),
        ("IMG" === this.drag.targetEl.tagName ||
          "A" === this.drag.targetEl.tagName) &&
          (this.drag.targetEl.draggable = !1),
        a(c).on(
          "mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",
          a.proxy(function (a) {
            this.eventsRouter(a);
          }, this)
        );
    }),
    (e.prototype.onDragMove = function (a) {
      var c, e, g, h, i, j;
      this.state.isTouch &&
        (this.state.isScrolling ||
          ((c = a.originalEvent || a || b.event),
          (e = f(c).x),
          (g = f(c).y),
          (this.drag.currentX = e - this.drag.startX),
          (this.drag.currentY = g - this.drag.startY),
          (this.drag.distance = this.drag.currentX - this.drag.offsetX),
          this.drag.distance < 0
            ? (this.state.direction = this.settings.rtl ? "right" : "left")
            : this.drag.distance > 0 &&
              (this.state.direction = this.settings.rtl ? "left" : "right"),
          this.settings.loop
            ? this.op(
                this.drag.currentX,
                ">",
                this.coordinates(this.minimum())
              ) && "right" === this.state.direction
              ? (this.drag.currentX -=
                  (this.settings.center && this.coordinates(0)) -
                  this.coordinates(this._items.length))
              : this.op(
                  this.drag.currentX,
                  "<",
                  this.coordinates(this.maximum())
                ) &&
                "left" === this.state.direction &&
                (this.drag.currentX +=
                  (this.settings.center && this.coordinates(0)) -
                  this.coordinates(this._items.length))
            : ((h = this.coordinates(
                this.settings.rtl ? this.maximum() : this.minimum()
              )),
              (i = this.coordinates(
                this.settings.rtl ? this.minimum() : this.maximum()
              )),
              (j = this.settings.pullDrag ? this.drag.distance / 5 : 0),
              (this.drag.currentX = Math.max(
                Math.min(this.drag.currentX, h + j),
                i + j
              ))),
          (this.drag.distance > 8 || this.drag.distance < -8) &&
            (c.preventDefault !== d ? c.preventDefault() : (c.returnValue = !1),
            (this.state.isSwiping = !0)),
          (this.drag.updatedX = this.drag.currentX),
          (this.drag.currentY > 16 || this.drag.currentY < -16) &&
            this.state.isSwiping === !1 &&
            ((this.state.isScrolling = !0),
            (this.drag.updatedX = this.drag.start)),
          this.animate(this.drag.updatedX)));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d, e, f;
      if (this.state.isTouch) {
        if (
          ("mouseup" === b.type && this.$stage.removeClass("owl-grab"),
          this.trigger("dragged"),
          this.drag.targetEl.removeAttribute("draggable"),
          (this.state.isTouch = !1),
          (this.state.isScrolling = !1),
          (this.state.isSwiping = !1),
          0 === this.drag.distance && this.state.inMotion !== !0)
        )
          return (this.state.inMotion = !1), !1;
        (this.drag.endTime = new Date().getTime()),
          (d = this.drag.endTime - this.drag.startTime),
          (e = Math.abs(this.drag.distance)),
          (e > 3 || d > 300) && this.removeClick(this.drag.targetEl),
          (f = this.closest(this.drag.updatedX)),
          this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(f),
          this.invalidate("position"),
          this.update(),
          this.settings.pullDrag ||
            this.drag.updatedX !== this.coordinates(f) ||
            this.transitionEnd(),
          (this.drag.distance = 0),
          a(c).off(".owl.dragEvents");
      }
    }),
    (e.prototype.removeClick = function (c) {
      (this.drag.targetEl = c),
        a(c).on("click.preventClick", this.e._preventClick),
        b.setTimeout(function () {
          a(c).off("click.preventClick");
        }, 300);
    }),
    (e.prototype.preventClick = function (b) {
      b.preventDefault ? b.preventDefault() : (b.returnValue = !1),
        b.stopPropagation && b.stopPropagation(),
        a(b.target).off("click.preventClick");
    }),
    (e.prototype.getTransformProperty = function () {
      var a, c;
      return (
        (a = b
          .getComputedStyle(this.$stage.get(0), null)
          .getPropertyValue(this.vendorName + "transform")),
        (a = a.replace(/matrix(3d)?\(|\)/g, "").split(",")),
        (c = 16 === a.length),
        c !== !0 ? a[4] : a[12]
      );
    }),
    (e.prototype.closest = function (b) {
      var c = -1,
        d = 30,
        e = this.width(),
        f = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            f,
            a.proxy(function (a, g) {
              return (
                b > g - d && g + d > b
                  ? (c = a)
                  : this.op(b, "<", g) &&
                    this.op(b, ">", f[a + 1] || g - e) &&
                    (c = "left" === this.state.direction ? a + 1 : a),
                -1 === c
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", f[this.minimum()])
            ? (c = b = this.minimum())
            : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())),
        c
      );
    }),
    (e.prototype.animate = function (b) {
      this.trigger("translate"),
        (this.state.inMotion = this.speed() > 0),
        this.support3d
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px, 0px)",
              transition: this.speed() / 1e3 + "s",
            })
          : this.state.isTouch
          ? this.$stage.css({ left: b + "px" })
          : this.$stage.animate(
              { left: b },
              this.speed() / 1e3,
              this.settings.fallbackEasing,
              a.proxy(function () {
                this.state.inMotion && this.transitionEnd();
              }, this)
            );
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (a) {
      this._invalidated[a] = !0;
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(a)),
          this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (b, c) {
      var e = c ? this._items.length : this._items.length + this._clones.length;
      return !a.isNumeric(b) || 1 > e
        ? d
        : (b = this._clones.length
            ? ((b % e) + e) % e
            : Math.max(this.minimum(c), Math.min(this.maximum(c), b)));
    }),
    (e.prototype.relative = function (a) {
      return (
        (a = this.normalize(a)),
        (a -= this._clones.length / 2),
        this.normalize(a, !0)
      );
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = 0,
        f = this.settings;
      if (a) return this._items.length - 1;
      if (!f.loop && f.center) b = this._items.length - 1;
      else if (f.loop || f.center)
        if (f.loop || f.center) b = this._items.length + f.items;
        else {
          if (!f.autoWidth && !f.merge)
            throw "Can not detect maximum absolute position.";
          for (
            revert = f.rtl ? 1 : -1,
              c = this.$stage.width() - this.$element.width();
            (d = this.coordinates(e)) && !(d * revert >= c);

          )
            b = ++e;
        }
      else b = this._items.length - f.items;
      return b;
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c = null;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? ((c = this._coordinates[b]),
              (c +=
                ((this.width() - c + (this._coordinates[b - 1] || 0)) / 2) *
                (this.settings.rtl ? -1 : 1)))
            : (c = this._coordinates[b - 1] || 0),
          c);
    }),
    (e.prototype.duration = function (a, b, c) {
      return (
        Math.min(Math.max(Math.abs(b - a), 1), 6) *
        Math.abs(c || this.settings.smartSpeed)
      );
    }),
    (e.prototype.to = function (c, d) {
      if (this.settings.loop) {
        var e = c - this.relative(this.current()),
          f = this.current(),
          g = this.current(),
          h = this.current() + e,
          i = 0 > g - h ? !0 : !1,
          j = this._clones.length + this._items.length;
        h < this.settings.items && i === !1
          ? ((f = g + this._items.length), this.reset(f))
          : h >= j - this.settings.items &&
            i === !0 &&
            ((f = g - this._items.length), this.reset(f)),
          b.clearTimeout(this.e._goToLoop),
          (this.e._goToLoop = b.setTimeout(
            a.proxy(function () {
              this.speed(this.duration(this.current(), f + e, d)),
                this.current(f + e),
                this.update();
            }, this),
            30
          ));
      } else
        this.speed(this.duration(this.current(), c, d)),
          this.current(c),
          this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.transitionEnd = function (a) {
      return a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
        ? !1
        : ((this.state.inMotion = !1), void this.trigger("translated"));
    }),
    (e.prototype.viewport = function () {
      var d;
      if (this.options.responsiveBaseElement !== b)
        d = a(this.options.responsiveBaseElement).width();
      else if (b.innerWidth) d = b.innerWidth;
      else {
        if (!c.documentElement || !c.documentElement.clientWidth)
          throw "Can not detect viewport width.";
        d = c.documentElement.clientWidth;
      }
      return d;
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .andSelf("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          a.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (a, b) {
      (b = b === d ? this._items.length : this.normalize(b, !0)),
        this.trigger("add", { content: a, position: b }),
        0 === this._items.length || b === this._items.length
          ? (this.$stage.append(a),
            this._items.push(a),
            this._mergers.push(
              1 *
                a
                  .find("[data-merge]")
                  .andSelf("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[b].before(a),
            this._items.splice(b, 0, a),
            this._mergers.splice(
              b,
              0,
              1 *
                a
                  .find("[data-merge]")
                  .andSelf("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this.invalidate("items"),
        this.trigger("added", { content: a, position: b });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger("remove", { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.addTriggerableEvents = function () {
      var b = a.proxy(function (b, c) {
        return a.proxy(function (a) {
          a.relatedTarget !== this &&
            (this.suppress([c]),
            b.apply(this, [].slice.call(arguments, 1)),
            this.release([c]));
        }, this);
      }, this);
      a.each(
        {
          next: this.next,
          prev: this.prev,
          to: this.to,
          destroy: this.destroy,
          refresh: this.refresh,
          replace: this.replace,
          add: this.add,
          remove: this.remove,
        },
        a.proxy(function (a, c) {
          this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"));
        }, this)
      );
    }),
    (e.prototype.watchVisibility = function () {
      function c(a) {
        return a.offsetWidth > 0 && a.offsetHeight > 0;
      }
      function d() {
        c(this.$element.get(0)) &&
          (this.$element.removeClass("owl-hidden"),
          this.refresh(),
          b.clearInterval(this.e._checkVisibile));
      }
      c(this.$element.get(0)) ||
        (this.$element.addClass("owl-hidden"),
        b.clearInterval(this.e._checkVisibile),
        (this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500)));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      var c, d, e, f;
      (c = 0),
        (d = this),
        b.each(function (g, h) {
          (e = a(h)),
            (f = new Image()),
            (f.onload = function () {
              c++,
                e.attr("src", f.src),
                e.css("opacity", 1),
                c >= b.length && ((d.state.imagesLoaded = !0), d.initialize());
            }),
            (f.src =
              e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"));
        });
    }),
    (e.prototype.destroy = function () {
      this.$element.hasClass(this.settings.themeClass) &&
        this.$element.removeClass(this.settings.themeClass),
        this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"),
        this.transitionEndVendor &&
          this.off(
            this.$stage.get(0),
            this.transitionEndVendor,
            this.e._transitionEnd
          );
      for (var d in this._plugins) this._plugins[d].destroy();
      (this.settings.mouseDrag || this.settings.touchDrag) &&
        (this.$stage.off("mousedown touchstart touchcancel"),
        a(c).off(".owl.dragEvents"),
        (this.$stage.get(0).onselectstart = function () {}),
        this.$stage.off("dragstart", function () {
          return !1;
        })),
        this.$element.off(".owl"),
        this.$stage.children(".cloned").remove(),
        (this.e = null),
        this.$element.removeData("owlCarousel"),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.unwrap();
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : c > a;
        case ">":
          return d ? c > a : a > c;
        case ">=":
          return d ? c >= a : a >= c;
        case "<=":
          return d ? a >= c : c >= a;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d) {
      var e = { item: { count: this._items.length, index: this.current() } },
        f = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        g = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, e, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(g);
          }),
          this.$element.trigger(g),
          this.settings &&
            "function" == typeof this.settings[f] &&
            this.settings[f].apply(this, g)),
        g
      );
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.browserSupport = function () {
      if (((this.support3d = j()), this.support3d)) {
        this.transformVendor = i();
        var a = [
          "transitionend",
          "webkitTransitionEnd",
          "transitionend",
          "oTransitionEnd",
        ];
        (this.transitionEndVendor = a[h()]),
          (this.vendorName = this.transformVendor.replace(/Transform/i, "")),
          (this.vendorName =
            "" !== this.vendorName
              ? "-" + this.vendorName.toLowerCase() + "-"
              : "");
      }
      this.state.orientation = b.orientation;
    }),
    (a.fn.owlCarousel = function (b) {
      return this.each(function () {
        a(this).data("owlCarousel") ||
          a(this).data("owlCarousel", new e(this, b));
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b) {
    var c = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
            if (
              b.namespace &&
              this._core.settings &&
              this._core.settings.lazyLoad &&
              ((b.property && "position" == b.property.name) ||
                "initialized" == b.type)
            )
              for (
                var c = this._core.settings,
                  d = (c.center && Math.ceil(c.items / 2)) || c.items,
                  e = (c.center && -1 * d) || 0,
                  f =
                    ((b.property && b.property.value) || this._core.current()) +
                    e,
                  g = this._core.clones().length,
                  h = a.proxy(function (a, b) {
                    this.load(b);
                  }, this);
                e++ < d;

              )
                this.load(g / 2 + this._core.relative(f)),
                  g && a.each(this._core.clones(this._core.relative(f++)), h);
          }, this),
        }),
        (this._core.options = a.extend({}, c.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (c.Defaults = { lazyLoad: !1 }),
      (c.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": "url(" + g + ")",
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (c.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = c);
  })(window.Zepto || window.jQuery, window, document),
  (function (a) {
    var b = function (c) {
      (this._core = c),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function () {
            this._core.settings.autoHeight && this.update();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            this._core.settings.autoHeight &&
              "position" == a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass) ===
                this._core.$stage.children().eq(this._core.current()) &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, b.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (b.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (b.prototype.update = function () {
        this._core.$stage
          .parent()
          .height(
            this._core.$stage.children().eq(this._core.current()).height()
          )
          .addClass(this._core.settings.autoHeightClass);
      }),
      (b.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c) {
    var d = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._fullscreen = !1),
        (this._handlers = {
          "resize.owl.carousel": a.proxy(function (a) {
            this._core.settings.video &&
              !this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
            this._playing && this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            var c = a(b.content).find(".owl-video");
            c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
          }, this),
        }),
        (this._core.options = a.extend({}, d.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (d.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (d.prototype.fetch = function (a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
          d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else {
          if (!(d[3].indexOf("vimeo") > -1))
            throw new Error("Video URL not supported.");
          c = "vimeo";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (d.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (a) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? '<div class="owl-video-tn ' +
                  j +
                  '" ' +
                  i +
                  '="' +
                  a +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  a +
                  ')"></div>'),
              b.after(d),
              b.after(e);
          };
        return (
          b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length
            ? (l(h.attr(i)), h.remove(), !1)
            : void ("youtube" === c.type
                ? ((f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg"),
                  l(f))
                : "vimeo" === c.type &&
                  a.ajax({
                    type: "GET",
                    url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function (a) {
                      (f = a[0].thumbnail_large), l(f);
                    },
                  }))
        );
      }),
      (d.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null);
      }),
      (d.prototype.play = function (b) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var c,
          d,
          e = a(b.target || b.srcElement),
          f = e.closest("." + this._core.settings.itemClass),
          g = this._videos[f.attr("data-video")],
          h = g.width || "100%",
          i = g.height || this._core.$stage.height();
        "youtube" === g.type
          ? (c =
              '<iframe width="' +
              h +
              '" height="' +
              i +
              '" src="http://www.youtube.com/embed/' +
              g.id +
              "?autoplay=1&v=" +
              g.id +
              '" frameborder="0" allowfullscreen></iframe>')
          : "vimeo" === g.type &&
            (c =
              '<iframe src="http://player.vimeo.com/video/' +
              g.id +
              '?autoplay=1" width="' +
              h +
              '" height="' +
              i +
              '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
          f.addClass("owl-video-playing"),
          (this._playing = f),
          (d = a(
            '<div style="height:' +
              i +
              "px; width:" +
              h +
              'px" class="owl-video-frame">' +
              c +
              "</div>"
          )),
          e.after(d);
      }),
      (d.prototype.isInFullScreen = function () {
        var d =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return (
          d &&
            a(d).parent().hasClass("owl-video-frame") &&
            (this._core.speed(0), (this._fullscreen = !0)),
          d && this._fullscreen && this._playing
            ? !1
            : this._fullscreen
            ? ((this._fullscreen = !1), !1)
            : this._playing && this._core.state.orientation !== b.orientation
            ? ((this._core.state.orientation = b.orientation), !1)
            : !0
        );
      }),
      (d.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = d);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              this.swapping = "translated" == a.type;
            }, this),
          "translate.owl.carousel": a.proxy(function () {
            this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (1 === this.core.settings.items && this.core.support3d) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  c
                )),
            f &&
              e
                .addClass("animated owl-animated-in")
                .addClass(f)
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  c
                ));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.transitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c) {
    var d = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, d.Defaults, this.core.options)),
        (this.handlers = {
          "translated.owl.carousel refreshed.owl.carousel": a.proxy(
            function () {
              this.autoplay();
            },
            this
          ),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function () {
            this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this.core.settings.autoplayHoverPause && this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this.core.settings.autoplayHoverPause && this.autoplay();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (d.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (d.prototype.autoplay = function () {
        this.core.settings.autoplay && !this.core.state.videoPlay
          ? (b.clearInterval(this.interval),
            (this.interval = b.setInterval(
              a.proxy(function () {
                this.play();
              }, this),
              this.core.settings.autoplayTimeout
            )))
          : b.clearInterval(this.interval);
      }),
      (d.prototype.play = function () {
        return c.hidden === !0 ||
          this.core.state.isTouch ||
          this.core.state.isScrolling ||
          this.core.state.isSwiping ||
          this.core.state.inMotion
          ? void 0
          : this.core.settings.autoplay === !1
          ? void b.clearInterval(this.interval)
          : void this.core.next(this.core.settings.autoplaySpeed);
      }),
      (d.prototype.stop = function () {
        b.clearInterval(this.interval);
      }),
      (d.prototype.pause = function () {
        b.clearInterval(this.interval);
      }),
      (d.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this.interval);
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = d);
  })(window.Zepto || window.jQuery, window, document),
  (function (a) {
    "use strict";
    var b = function (c) {
      (this._core = c),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            this._core.settings.dotsData &&
              this._templates.push(
                a(b.content)
                  .find("[data-dot]")
                  .andSelf("[data-dot]")
                  .attr("data-dot")
              );
          }, this),
          "add.owl.carousel": a.proxy(function (b) {
            this._core.settings.dotsData &&
              this._templates.splice(
                b.position,
                0,
                a(b.content)
                  .find("[data-dot]")
                  .andSelf("[data-dot]")
                  .attr("data-dot")
              );
          }, this),
          "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
            this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "change.owl.carousel": a.proxy(function (a) {
            if (
              "position" == a.property.name &&
              !this._core.state.revert &&
              !this._core.settings.loop &&
              this._core.settings.navRewind
            ) {
              var b = this._core.current(),
                c = this._core.maximum(),
                d = this._core.minimum();
              a.data =
                a.property.value > c
                  ? b >= c
                    ? d
                    : c
                  : a.property.value < d
                  ? c
                  : a.property.value;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            "position" == a.property.name && this.draw();
          }, this),
          "refreshed.owl.carousel": a.proxy(function () {
            this._initialized || (this.initialize(), (this._initialized = !0)),
              this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation");
          }, this),
        }),
        (this._core.options = a.extend({}, b.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (b.Defaults = {
      nav: !1,
      navRewind: !0,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
      controlsClass: "owl-controls",
    }),
      (b.prototype.initialize = function () {
        var b,
          c,
          d = this._core.settings;
        d.dotsData ||
          (this._templates = [
            a("<div>")
              .addClass(d.dotClass)
              .append(a("<span>"))
              .prop("outerHTML"),
          ]),
          (d.navContainer && d.dotsContainer) ||
            (this._controls.$container = a("<div>")
              .addClass(d.controlsClass)
              .appendTo(this.$element)),
          (this._controls.$indicators = d.dotsContainer
            ? a(d.dotsContainer)
            : a("<div>")
                .hide()
                .addClass(d.dotsClass)
                .appendTo(this._controls.$container)),
          this._controls.$indicators.on(
            "click",
            "div",
            a.proxy(function (b) {
              var c = a(b.target).parent().is(this._controls.$indicators)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(c, d.dotsSpeed);
            }, this)
          ),
          (b = d.navContainer
            ? a(d.navContainer)
            : a("<div>")
                .addClass(d.navContainerClass)
                .prependTo(this._controls.$container)),
          (this._controls.$next = a("<" + d.navElement + ">")),
          (this._controls.$previous = this._controls.$next.clone()),
          this._controls.$previous
            .addClass(d.navClass[0])
            .html(d.navText[0])
            .hide()
            .prependTo(b)
            .on(
              "click",
              a.proxy(function () {
                this.prev(d.navSpeed);
              }, this)
            ),
          this._controls.$next
            .addClass(d.navClass[1])
            .html(d.navText[1])
            .hide()
            .appendTo(b)
            .on(
              "click",
              a.proxy(function () {
                this.next(d.navSpeed);
              }, this)
            );
        for (c in this._overrides) this._core[c] = a.proxy(this[c], this);
      }),
      (b.prototype.destroy = function () {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (b.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.settings,
          e = this._core.clones().length / 2,
          f = e + this._core.items().length,
          g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
        if (
          ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)),
          d.dots || "page" == d.slideBy)
        )
          for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)
            (b >= g || 0 === b) &&
              (this._pages.push({ start: a - e, end: a - e + g - 1 }),
              (b = 0),
              ++c),
              (b += this._core.mergers(this._core.relative(a)));
      }),
      (b.prototype.draw = function () {
        var b,
          c,
          d = "",
          e = this._core.settings,
          f =
            (this._core.$stage.children(),
            this._core.relative(this._core.current()));
        if (
          (!e.nav ||
            e.loop ||
            e.navRewind ||
            (this._controls.$previous.toggleClass("disabled", 0 >= f),
            this._controls.$next.toggleClass(
              "disabled",
              f >= this._core.maximum()
            )),
          this._controls.$previous.toggle(e.nav),
          this._controls.$next.toggle(e.nav),
          e.dots)
        ) {
          if (
            ((b =
              this._pages.length -
              this._controls.$indicators.children().length),
            e.dotData && 0 !== b)
          ) {
            for (c = 0; c < this._controls.$indicators.children().length; c++)
              d += this._templates[this._core.relative(c)];
            this._controls.$indicators.html(d);
          } else
            b > 0
              ? ((d = new Array(b + 1).join(this._templates[0])),
                this._controls.$indicators.append(d))
              : 0 > b &&
                this._controls.$indicators.children().slice(b).remove();
          this._controls.$indicators.find(".active").removeClass("active"),
            this._controls.$indicators
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active");
        }
        this._controls.$indicators.toggle(e.dots);
      }),
      (b.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items),
        };
      }),
      (b.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(this._pages, function (a) {
            return a.start <= b && a.end >= b;
          })
          .pop();
      }),
      (b.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (b.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (b.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (b.prototype.to = function (b, c, d) {
        var e;
        d
          ? a.proxy(this._overrides.to, this._core)(b, c)
          : ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ));
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = b);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b) {
    "use strict";
    var c = function (d) {
      (this._core = d),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function () {
            "URLHash" == this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            var c = a(b.content)
              .find("[data-hash]")
              .andSelf("[data-hash]")
              .attr("data-hash");
            this._hashes[c] = b.content;
          }, this),
        }),
        (this._core.options = a.extend({}, c.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function () {
            var a = b.location.hash.substring(1),
              c = this._core.$stage.children(),
              d = (this._hashes[a] && c.index(this._hashes[a])) || 0;
            return a ? void this._core.to(d, !1, !0) : !1;
          }, this)
        );
    };
    (c.Defaults = { URLhashListener: !1 }),
      (c.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = c);
  })(window.Zepto || window.jQuery, window, document);

//Smooth scroll

!(function () {
  function e() {
    T.keyboardSupport && f("keydown", a);
  }
  function t() {
    if (!z && document.body) {
      z = !0;
      var t = document.body,
        o = document.documentElement,
        n = window.innerHeight,
        a = t.scrollHeight;
      if (
        ((X = document.compatMode.indexOf("CSS") >= 0 ? o : t),
        (S = t),
        e(),
        top != self)
      )
        C = !0;
      else if (a > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
        var r = document.createElement("div");
        (r.style.cssText =
          "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" +
          X.scrollHeight +
          "px"),
          document.body.appendChild(r);
        var l,
          i = function () {
            l ||
              (l = setTimeout(function () {
                H ||
                  ((r.style.height = "0"),
                  (r.style.height = X.scrollHeight + "px"),
                  (l = null));
              }, 500));
          };
        setTimeout(i, 10);
        var c = { attributes: !0, childList: !0, characterData: !1 };
        if (((x = new j(i)), x.observe(t, c), X.offsetHeight <= n)) {
          var u = document.createElement("div");
          (u.style.clear = "both"), t.appendChild(u);
        }
      }
      T.fixedBackground ||
        H ||
        ((t.style.backgroundAttachment = "scroll"),
        (o.style.backgroundAttachment = "scroll"));
    }
  }
  function o(e, t, o) {
    if ((h(t, o), 1 != T.accelerationMax)) {
      var n = Date.now(),
        a = n - N;
      if (a < T.accelerationDelta) {
        var r = (1 + 50 / a) / 2;
        r > 1 && ((r = Math.min(r, T.accelerationMax)), (t *= r), (o *= r));
      }
      N = Date.now();
    }
    if (
      (A.push({
        x: t,
        y: o,
        lastX: 0 > t ? 0.99 : -0.99,
        lastY: 0 > o ? 0.99 : -0.99,
        start: Date.now(),
      }),
      !K)
    ) {
      var l = e === document.body,
        i = function (n) {
          for (var a = Date.now(), r = 0, c = 0, u = 0; u < A.length; u++) {
            var d = A[u],
              s = a - d.start,
              f = s >= T.animationTime,
              m = f ? 1 : s / T.animationTime;
            T.pulseAlgorithm && (m = y(m));
            var h = (d.x * m - d.lastX) >> 0,
              p = (d.y * m - d.lastY) >> 0;
            (r += h),
              (c += p),
              (d.lastX += h),
              (d.lastY += p),
              f && (A.splice(u, 1), u--);
          }
          l
            ? window.scrollBy(r, c)
            : (r && (e.scrollLeft += r), c && (e.scrollTop += c)),
            t || o || (A = []),
            A.length ? P(i, e, 1e3 / T.frameRate + 1) : (K = !1);
        };
      P(i, e, 0), (K = !0);
    }
  }
  function n(e) {
    z || t();
    var n = e.target,
      a = c(n);
    if (!a || e.defaultPrevented || e.ctrlKey) return !0;
    if (
      m(S, "embed") ||
      (m(n, "embed") && /\.pdf/i.test(n.src)) ||
      m(S, "object")
    )
      return !0;
    var r = -e.wheelDeltaX || e.deltaX || 0,
      i = -e.wheelDeltaY || e.deltaY || 0;
    return (
      B &&
        (e.wheelDeltaX &&
          w(e.wheelDeltaX, 120) &&
          (r = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))),
        e.wheelDeltaY &&
          w(e.wheelDeltaY, 120) &&
          (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))),
      r || i || (i = -e.wheelDelta || 0),
      1 === e.deltaMode && ((r *= 40), (i *= 40)),
      !T.touchpadSupport && p(i)
        ? !0
        : (Math.abs(r) > 1.2 && (r *= T.stepSize / 120),
          Math.abs(i) > 1.2 && (i *= T.stepSize / 120),
          o(a, r, i),
          //   e.preventDefault(), 추후 확인 필요
          void l())
    );
  }
  function a(e) {
    var t = e.target,
      n =
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        (e.shiftKey && e.keyCode !== L.spacebar);
    document.contains(S) || (S = document.activeElement);
    var a = /^(textarea|select|embed|object)$/i,
      r = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if (
      a.test(t.nodeName) ||
      (m(t, "input") && !r.test(t.type)) ||
      m(S, "video") ||
      b(e) ||
      t.isContentEditable ||
      e.defaultPrevented ||
      n
    )
      return !0;
    if (
      (m(t, "button") || (m(t, "input") && r.test(t.type))) &&
      e.keyCode === L.spacebar
    )
      return !0;
    var i,
      u = 0,
      d = 0,
      s = c(S),
      f = s.clientHeight;
    switch ((s == document.body && (f = window.innerHeight), e.keyCode)) {
      case L.up:
        d = -T.arrowScroll;
        break;
      case L.down:
        d = T.arrowScroll;
        break;
      case L.spacebar:
        (i = e.shiftKey ? 1 : -1), (d = -i * f * 0.9);
        break;
      case L.pageup:
        d = 0.9 * -f;
        break;
      case L.pagedown:
        d = 0.9 * f;
        break;
      case L.home:
        d = -s.scrollTop;
        break;
      case L.end:
        var h = s.scrollHeight - s.scrollTop - f;
        d = h > 0 ? h + 10 : 0;
        break;
      case L.left:
        u = -T.arrowScroll;
        break;
      case L.right:
        u = T.arrowScroll;
        break;
      default:
        return !0;
    }
    o(s, u, d), e.preventDefault(), l();
  }
  function r(e) {
    S = e.target;
  }
  function l() {
    clearTimeout(D),
      (D = setInterval(function () {
        O = {};
      }, 1e3));
  }
  function i(e, t) {
    for (var o = e.length; o--; ) O[q(e[o])] = t;
    return t;
  }
  function c(e) {
    var t = [],
      o = document.body,
      n = X.scrollHeight;
    do {
      var a = O[q(e)];
      if (a) return i(t, a);
      if ((t.push(e), n === e.scrollHeight)) {
        var r = d(X) && d(o),
          l = r || s(X);
        if ((C && u(X)) || (!C && l)) return i(t, F());
      } else if (u(e) && s(e)) return i(t, e);
    } while ((e = e.parentElement));
  }
  function u(e) {
    return e.clientHeight + 10 < e.scrollHeight;
  }
  function d(e) {
    var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
    return "hidden" !== t;
  }
  function s(e) {
    var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
    return "scroll" === t || "auto" === t;
  }
  function f(e, t) {
    window.addEventListener(e, t, !1);
  }
  function m(e, t) {
    return (e.nodeName || "").toLowerCase() === t.toLowerCase();
  }
  function h(e, t) {
    (e = e > 0 ? 1 : -1),
      (t = t > 0 ? 1 : -1),
      (E.x !== e || E.y !== t) && ((E.x = e), (E.y = t), (A = []), (N = 0));
  }
  function p(e) {
    return e
      ? (Y.length || (Y = [e, e, e]),
        (e = Math.abs(e)),
        Y.push(e),
        Y.shift(),
        clearTimeout(k),
        (k = setTimeout(function () {
          window.localStorage && (localStorage.SS_deltaBuffer = Y.join(","));
        }, 1e3)),
        !v(120) && !v(100))
      : void 0;
  }
  function w(e, t) {
    return Math.floor(e / t) == e / t;
  }
  function v(e) {
    return w(Y[0], e) && w(Y[1], e) && w(Y[2], e);
  }
  function b(e) {
    var t = e.target,
      o = !1;
    if (-1 != document.URL.indexOf("www.youtube.com/watch"))
      do
        if ((o = t.classList && t.classList.contains("html5-video-controls")))
          break;
      while ((t = t.parentNode));
    return o;
  }
  function g(e) {
    var t, o, n;
    return (
      (e *= T.pulseScale),
      1 > e
        ? (t = e - (1 - Math.exp(-e)))
        : ((o = Math.exp(-1)),
          (e -= 1),
          (n = 1 - Math.exp(-e)),
          (t = o + n * (1 - o))),
      t * T.pulseNormalize
    );
  }
  function y(e) {
    return e >= 1
      ? 1
      : 0 >= e
      ? 0
      : (1 == T.pulseNormalize && (T.pulseNormalize /= g(1)), g(e));
  }
  var S,
    x,
    D,
    k,
    M = {
      frameRate: 150,
      animationTime: 400,
      stepSize: 120,
      pulseAlgorithm: !0,
      pulseScale: 4,
      pulseNormalize: 1,
      accelerationDelta: 20,
      accelerationMax: 1,
      keyboardSupport: !0,
      arrowScroll: 50,
      touchpadSupport: !0,
      fixedBackground: !0,
      excluded: "",
    },
    T = M,
    H = !1,
    C = !1,
    E = { x: 0, y: 0 },
    z = !1,
    X = document.documentElement,
    Y = [],
    B = /^Mac/.test(navigator.platform),
    L = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
    },
    T = M,
    A = [],
    K = !1,
    N = Date.now(),
    q = (function () {
      var e = 0;
      return function (t) {
        return t.uniqueID || (t.uniqueID = e++);
      };
    })(),
    O = {};
  window.localStorage &&
    localStorage.SS_deltaBuffer &&
    (Y = localStorage.SS_deltaBuffer.split(","));
  var R,
    P = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (e, t, o) {
          window.setTimeout(e, o || 1e3 / 60);
        }
      );
    })(),
    j =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver,
    F = (function () {
      var e;
      return function () {
        if (!e) {
          var t = document.createElement("div");
          (t.style.cssText = "height:10000px;width:1px;"),
            document.body.appendChild(t);
          var o = document.body.scrollTop;
          document.documentElement.scrollTop;
          window.scrollBy(0, 1),
            (e =
              document.body.scrollTop != o
                ? document.body
                : document.documentElement),
            window.scrollBy(0, -1),
            document.body.removeChild(t);
        }
        return e;
      };
    })();
  "onwheel" in document.createElement("div")
    ? (R = "wheel")
    : "onmousewheel" in document.createElement("div") && (R = "mousewheel"),
    R && (f(R, n), f("mousedown", r), f("load", t));
})();

//LocalScroll
/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.3.5
 */
(function (a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function ($) {
  var g = location.href.replace(/#.*/, "");
  var h = ($.localScroll = function (a) {
    $("body").localScroll(a);
  });
  h.defaults = {
    duration: 1000,
    axis: "y",
    event: "click",
    stop: true,
    target: window,
  };
  $.fn.localScroll = function (a) {
    a = $.extend({}, h.defaults, a);
    if (a.hash && location.hash) {
      if (a.target) window.scrollTo(0, 0);
      scroll(0, location, a);
    }
    return a.lazy
      ? this.on(a.event, "a,area", function (e) {
          if (filter.call(this)) {
            scroll(e, this, a);
          }
        })
      : this.find("a,area")
          .filter(filter)
          .bind(a.event, function (e) {
            scroll(e, this, a);
          })
          .end()
          .end();
    function filter() {
      return (
        !!this.href &&
        !!this.hash &&
        this.href.replace(this.hash, "") == g &&
        (!a.filter || $(this).is(a.filter))
      );
    }
  };
  h.hash = function () {};
  function scroll(e, a, b) {
    var c = a.hash.slice(1),
      elem = document.getElementById(c) || document.getElementsByName(c)[0];
    if (!elem) return;
    if (e) e.preventDefault();
    var d = $(b.target);
    if (
      (b.lock && d.is(":animated")) ||
      (b.onBefore && b.onBefore(e, elem, d) === false)
    )
      return;
    if (b.stop) d._scrollable().stop(true);
    if (b.hash) {
      var f = elem.id === c ? "id" : "name",
        $a = $("<a> </a>")
          .attr(f, c)
          .css({
            position: "absolute",
            top: $(window).scrollTop(),
            left: $(window).scrollLeft(),
          });
      elem[f] = "";
      $("body").prepend($a);
      location.hash = a.hash;
      $a.remove();
      elem[f] = c;
    }
    d.scrollTo(elem, b).trigger("notify.serialScroll", [elem]);
  }
  return h;
});

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.12
 */
(function (a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function ($) {
  var j = ($.scrollTo = function (a, b, c) {
    return $(window).scrollTo(a, b, c);
  });
  j.defaults = {
    axis: "xy",
    duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
    limit: true,
  };
  j.window = function (a) {
    return $(window)._scrollable();
  };
  $.fn._scrollable = function () {
    return this.map(function () {
      var a = this,
        isWin =
          !a.nodeName ||
          $.inArray(a.nodeName.toLowerCase(), [
            "iframe",
            "#document",
            "html",
            "body",
          ]) != -1;
      if (!isWin) return a;
      var b = (a.contentWindow || a).document || a.ownerDocument || a;
      return /webkit/i.test(navigator.userAgent) || b.compatMode == "BackCompat"
        ? b.body
        : b.documentElement;
    });
  };
  $.fn.scrollTo = function (f, g, h) {
    if (typeof g == "object") {
      h = g;
      g = 0;
    }
    if (typeof h == "function") h = { onAfter: h };
    if (f == "max") f = 9e9;
    h = $.extend({}, j.defaults, h);
    g = g || h.duration;
    h.queue = h.queue && h.axis.length > 1;
    if (h.queue) g /= 2;
    h.offset = both(h.offset);
    h.over = both(h.over);
    return this._scrollable()
      .each(function () {
        if (f == null) return;
        var d = this,
          $elem = $(d),
          targ = f,
          toff,
          attr = {},
          win = $elem.is("html,body");
        switch (typeof targ) {
          case "number":
          case "string":
            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
              targ = both(targ);
              break;
            }
            targ = win ? $(targ) : $(targ, this);
            if (!targ.length) return;
          case "object":
            if (targ.is || targ.style) toff = (targ = $(targ)).offset();
        }
        var e = ($.isFunction(h.offset) && h.offset(d, targ)) || h.offset;
        $.each(h.axis.split(""), function (i, a) {
          var b = a == "x" ? "Left" : "Top",
            pos = b.toLowerCase(),
            key = "scroll" + b,
            old = d[key],
            max = j.max(d, a);
          if (toff) {
            attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
            if (h.margin) {
              attr[key] -= parseInt(targ.css("margin" + b)) || 0;
              attr[key] -= parseInt(targ.css("border" + b + "Width")) || 0;
            }
            attr[key] += e[pos] || 0;
            if (h.over[pos])
              attr[key] += targ[a == "x" ? "width" : "height"]() * h.over[pos];
          } else {
            var c = targ[pos];
            attr[key] =
              c.slice && c.slice(-1) == "%" ? (parseFloat(c) / 100) * max : c;
          }
          if (h.limit && /^\d+$/.test(attr[key]))
            attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
          if (!i && h.queue) {
            if (old != attr[key]) animate(h.onAfterFirst);
            delete attr[key];
          }
        });
        animate(h.onAfter);
        function animate(a) {
          $elem.animate(
            attr,
            g,
            h.easing,
            a &&
              function () {
                a.call(this, targ, h);
              }
          );
        }
      })
      .end();
  };
  j.max = function (a, b) {
    var c = b == "x" ? "Width" : "Height",
      scroll = "scroll" + c;
    if (!$(a).is("html,body")) return a[scroll] - $(a)[c.toLowerCase()]();
    var d = "client" + c,
      html = a.ownerDocument.documentElement,
      body = a.ownerDocument.body;
    return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]);
  };
  function both(a) {
    return $.isFunction(a) || typeof a == "object" ? a : { top: a, left: a };
  }
  return j;
});

/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */ (function (e) {
  "use strict";
  e.fn.counterUp = function (t) {
    var n = e.extend({ time: 400, delay: 10 }, t);
    return this.each(function () {
      var t = e(this),
        r = n,
        i = function () {
          var e = [],
            n = r.time / r.delay,
            i = t.text(),
            s = /[0-9]+,[0-9]+/.test(i);
          i = i.replace(/,/g, "");
          var o = /^[0-9]+$/.test(i),
            u = /^[0-9]+\.[0-9]+$/.test(i),
            a = u ? (i.split(".")[1] || []).length : 0;
          for (var f = n; f >= 1; f--) {
            var l = parseInt((i / n) * f);
            u && (l = parseFloat((i / n) * f).toFixed(a));
            if (s)
              while (/(\d+)(\d{3})/.test(l.toString()))
                l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            e.unshift(l);
          }
          t.data("counterup-nums", e);
          t.text("0");
          var c = function () {
            t.text(t.data("counterup-nums").shift());
            if (t.data("counterup-nums").length)
              setTimeout(t.data("counterup-func"), r.delay);
            else {
              delete t.data("counterup-nums");
              t.data("counterup-nums", null);
              t.data("counterup-func", null);
            }
          };
          t.data("counterup-func", c);
          setTimeout(t.data("counterup-func"), r.delay);
        };
      t.waypoint(i, { offset: "100%", triggerOnce: !0 });
    });
  };
})(jQuery);

/*! WOW - v1.0.2 - 2014-09-24
 * Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */
(function () {
  var a,
    b,
    c,
    d,
    e,
    f = function (a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    },
    g =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  (b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        );
      }),
      (a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener
          ? a.addEventListener(b, c, !1)
          : null != a.attachEvent
          ? a.attachEvent("on" + b, c)
          : (a[b] = c);
      }),
      (a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener
          ? a.removeEventListener(b, c, !1)
          : null != a.detachEvent
          ? a.detachEvent("on" + b, c)
          : delete a[b];
      }),
      (a.prototype.innerHeight = function () {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          "undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
              );
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
      })())),
    (d =
      this.getComputedStyle ||
      function (a) {
        return (
          (this.getPropertyValue = function (b) {
            var c;
            return (
              "float" === b && (b = "styleFloat"),
              e.test(b) &&
                b.replace(e, function (a, b) {
                  return b.toUpperCase();
                }),
              (null != (c = a.currentStyle) ? c[b] : void 0) || null
            );
          }),
          this
        );
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function e(a) {
        null == a && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          (this.animationNameCache = new c());
      }
      return (
        (e.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
        }),
        (e.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (e.prototype.start = function () {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, c, d, e;
              for (
                d = this.element.querySelectorAll("." + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            (this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else {
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0);
              this.util().addEvent(window, "scroll", this.scrollHandler),
                this.util().addEvent(window, "resize", this.scrollHandler),
                (this.interval = setInterval(this.scrollCallback, 50));
            }
          return this.config.live
            ? new a(
                (function (a) {
                  return function (b) {
                    var c, d, e, f, g;
                    for (g = [], e = 0, f = b.length; f > e; e++)
                      (d = b[e]),
                        g.push(
                          function () {
                            var a, b, e, f;
                            for (
                              e = d.addedNodes || [],
                                f = [],
                                a = 0,
                                b = e.length;
                              b > a;
                              a++
                            )
                              (c = e[a]), f.push(this.doSync(c));
                            return f;
                          }.call(a)
                        );
                    return g;
                  };
                })(this)
              ).observe(document.body, { childList: !0, subtree: !0 })
            : void 0;
        }),
        (e.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(window, "scroll", this.scrollHandler),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (e.prototype.sync = function () {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (e.prototype.doSync = function (a) {
          var b, c, d, e, f;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll("." + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              (b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0);
            return f;
          }
        }),
        (e.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = "" + a.className + " " + this.config.animateClass)
          );
        }),
        (e.prototype.applyStyle = function (a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this)
            )
          );
        }),
        (e.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (e.prototype.resetStyle = function () {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push((a.style.visibility = "visible"));
          return e;
        }),
        (e.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (e.prototype.vendors = ["moz", "webkit"]),
        (e.prototype.vendorSet = function (a, b) {
          var c, d, e, f;
          f = [];
          for (c in b)
            (d = b[c]),
              (a["" + c] = d),
              f.push(
                function () {
                  var b, f, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, f = g.length;
                    f > b;
                    b++
                  )
                    (e = g[b]),
                      h.push(
                        (a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] =
                          d)
                      );
                  return h;
                }.call(this)
              );
          return f;
        }),
        (e.prototype.vendorCSS = function (a, b) {
          var c, e, f, g, h, i;
          for (
            e = d(a),
              c = e.getPropertyCSSValue(b),
              i = this.vendors,
              g = 0,
              h = i.length;
            h > g;
            g++
          )
            (f = i[g]), (c = c || e.getPropertyCSSValue("-" + f + "-" + b));
          return c;
        }),
        (e.prototype.animationName = function (a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = d(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (e.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (e.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (e.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (e.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (e.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (e.prototype.isVisible = function (a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f = window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (e.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (e.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        e
      );
    })());
}).call(this);

/**!
 * MixItUp v2.1.11
 *
 * @copyright Copyright 2015 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
//!function(a,b){"use strict";a.MixItUp=function(){var b=this;b._execAction("_constructor",0),a.extend(b,{selectors:{target:".mix",filter:".filter",sort:".sort"},animation:{enable:!0,effects:"fade scale",duration:600,easing:"ease",perspectiveDistance:"3000",perspectiveOrigin:"50% 50%",queue:!0,queueLimit:1,animateChangeLayout:!1,animateResizeContainer:!0,animateResizeTargets:!1,staggerSequence:!1,reverseOut:!1},callbacks:{onMixLoad:!1,onMixStart:!1,onMixBusy:!1,onMixEnd:!1,onMixFail:!1,_user:!1},controls:{enable:!0,live:!1,toggleFilterButtons:!1,toggleLogic:"or",activeClass:"active"},layout:{display:"inline-block",containerClass:"",containerClassFail:"fail"},load:{filter:"all",sort:!1},_$body:null,_$container:null,_$targets:null,_$parent:null,_$sortButtons:null,_$filterButtons:null,_suckMode:!1,_mixing:!1,_sorting:!1,_clicking:!1,_loading:!0,_changingLayout:!1,_changingClass:!1,_changingDisplay:!1,_origOrder:[],_startOrder:[],_newOrder:[],_activeFilter:null,_toggleArray:[],_toggleString:"",_activeSort:"default:asc",_newSort:null,_startHeight:null,_newHeight:null,_incPadding:!0,_newDisplay:null,_newClass:null,_targetsBound:0,_targetsDone:0,_queue:[],_$show:a(),_$hide:a()}),b._execAction("_constructor",1)},a.MixItUp.prototype={constructor:a.MixItUp,_instances:{},_handled:{_filter:{},_sort:{}},_bound:{_filter:{},_sort:{}},_actions:{},_filters:{},extend:function(b){for(var c in b)a.MixItUp.prototype[c]=b[c]},addAction:function(b,c,d,e){a.MixItUp.prototype._addHook("_actions",b,c,d,e)},addFilter:function(b,c,d,e){a.MixItUp.prototype._addHook("_filters",b,c,d,e)},_addHook:function(b,c,d,e,f){var g=a.MixItUp.prototype[b],h={};f=1===f||"post"===f?"post":"pre",h[c]={},h[c][f]={},h[c][f][d]=e,a.extend(!0,g,h)},_init:function(b,c){var d=this;if(d._execAction("_init",0,arguments),c&&a.extend(!0,d,c),d._$body=a("body"),d._domNode=b,d._$container=a(b),d._$container.addClass(d.layout.containerClass),d._id=b.id,d._platformDetect(),d._brake=d._getPrefixedCSS("transition","none"),d._refresh(!0),d._$parent=d._$targets.parent().length?d._$targets.parent():d._$container,d.load.sort&&(d._newSort=d._parseSort(d.load.sort),d._newSortString=d.load.sort,d._activeSort=d.load.sort,d._sort(),d._printSort()),d._activeFilter="all"===d.load.filter?d.selectors.target:"none"===d.load.filter?"":d.load.filter,d.controls.enable&&d._bindHandlers(),d.controls.toggleFilterButtons){d._buildToggleArray();for(var e=0;e<d._toggleArray.length;e++)d._updateControls({filter:d._toggleArray[e],sort:d._activeSort},!0)}else d.controls.enable&&d._updateControls({filter:d._activeFilter,sort:d._activeSort});d._filter(),d._init=!0,d._$container.data("mixItUp",d),d._execAction("_init",1,arguments),d._buildState(),d._$targets.css(d._brake),d._goMix(d.animation.enable)},_platformDetect:function(){var a=this,c=["Webkit","Moz","O","ms"],d=["webkit","moz"],e=window.navigator.appVersion.match(/Chrome\/(\d+)\./)||!1,f="undefined"!=typeof InstallTrigger,g=function(a){for(var b=0;b<c.length;b++)if(c[b]+"Transition"in a.style)return{prefix:"-"+c[b].toLowerCase()+"-",vendor:c[b]};return"transition"in a.style?"":!1},h=g(a._domNode);a._execAction("_platformDetect",0),a._chrome=e?parseInt(e[1],10):!1,a._ff=f?parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]):!1,a._prefix=h.prefix,a._vendor=h.vendor,a._suckMode=window.atob&&a._prefix?!1:!0,a._suckMode&&(a.animation.enable=!1),a._ff&&a._ff<=4&&(a.animation.enable=!1);for(var i=0;i<d.length&&!window.requestAnimationFrame;i++)window.requestAnimationFrame=window[d[i]+"RequestAnimationFrame"];"function"!=typeof Object.getPrototypeOf&&("object"==typeof"test".__proto__?Object.getPrototypeOf=function(a){return a.__proto__}:Object.getPrototypeOf=function(a){return a.constructor.prototype}),a._domNode.nextElementSibling===b&&Object.defineProperty(Element.prototype,"nextElementSibling",{get:function(){for(var a=this.nextSibling;a;){if(1===a.nodeType)return a;a=a.nextSibling}return null}}),a._execAction("_platformDetect",1)},_refresh:function(a,c){var d=this;d._execAction("_refresh",0,arguments),d._$targets=d._$container.find(d.selectors.target);for(var e=0;e<d._$targets.length;e++){var f=d._$targets[e];if(f.dataset===b||c){f.dataset={};for(var g=0;g<f.attributes.length;g++){var h=f.attributes[g],i=h.name,j=h.value;if(i.indexOf("data-")>-1){var k=d._helpers._camelCase(i.substring(5,i.length));f.dataset[k]=j}}}f.mixParent===b&&(f.mixParent=d._id)}if(d._$targets.length&&a||!d._origOrder.length&&d._$targets.length){d._origOrder=[];for(var e=0;e<d._$targets.length;e++){var f=d._$targets[e];d._origOrder.push(f)}}d._execAction("_refresh",1,arguments)},_bindHandlers:function(){var c=this,d=a.MixItUp.prototype._bound._filter,e=a.MixItUp.prototype._bound._sort;c._execAction("_bindHandlers",0),c.controls.live?c._$body.on("click.mixItUp."+c._id,c.selectors.sort,function(){c._processClick(a(this),"sort")}).on("click.mixItUp."+c._id,c.selectors.filter,function(){c._processClick(a(this),"filter")}):(c._$sortButtons=a(c.selectors.sort),c._$filterButtons=a(c.selectors.filter),c._$sortButtons.on("click.mixItUp."+c._id,function(){c._processClick(a(this),"sort")}),c._$filterButtons.on("click.mixItUp."+c._id,function(){c._processClick(a(this),"filter")})),d[c.selectors.filter]=d[c.selectors.filter]===b?1:d[c.selectors.filter]+1,e[c.selectors.sort]=e[c.selectors.sort]===b?1:e[c.selectors.sort]+1,c._execAction("_bindHandlers",1)},_processClick:function(c,d){var e=this,f=function(c,d,f){var g=a.MixItUp.prototype;g._handled["_"+d][e.selectors[d]]=g._handled["_"+d][e.selectors[d]]===b?1:g._handled["_"+d][e.selectors[d]]+1,g._handled["_"+d][e.selectors[d]]===g._bound["_"+d][e.selectors[d]]&&(c[(f?"remove":"add")+"Class"](e.controls.activeClass),delete g._handled["_"+d][e.selectors[d]])};if(e._execAction("_processClick",0,arguments),!e._mixing||e.animation.queue&&e._queue.length<e.animation.queueLimit){if(e._clicking=!0,"sort"===d){var g=c.attr("data-sort");(!c.hasClass(e.controls.activeClass)||g.indexOf("random")>-1)&&(a(e.selectors.sort).removeClass(e.controls.activeClass),f(c,d),e.sort(g))}if("filter"===d){var h,i=c.attr("data-filter"),j="or"===e.controls.toggleLogic?",":"";e.controls.toggleFilterButtons?(e._buildToggleArray(),c.hasClass(e.controls.activeClass)?(f(c,d,!0),h=e._toggleArray.indexOf(i),e._toggleArray.splice(h,1)):(f(c,d),e._toggleArray.push(i)),e._toggleArray=a.grep(e._toggleArray,function(a){return a}),e._toggleString=e._toggleArray.join(j),e.filter(e._toggleString)):c.hasClass(e.controls.activeClass)||(a(e.selectors.filter).removeClass(e.controls.activeClass),f(c,d),e.filter(i))}e._execAction("_processClick",1,arguments)}else"function"==typeof e.callbacks.onMixBusy&&e.callbacks.onMixBusy.call(e._domNode,e._state,e),e._execAction("_processClickBusy",1,arguments)},_buildToggleArray:function(){var a=this,b=a._activeFilter.replace(/\s/g,"");if(a._execAction("_buildToggleArray",0,arguments),"or"===a.controls.toggleLogic)a._toggleArray=b.split(",");else{a._toggleArray=b.split("."),!a._toggleArray[0]&&a._toggleArray.shift();for(var c,d=0;c=a._toggleArray[d];d++)a._toggleArray[d]="."+c}a._execAction("_buildToggleArray",1,arguments)},_updateControls:function(c,d){var e=this,f={filter:c.filter,sort:c.sort},g=function(a,b){try{d&&"filter"===h&&"none"!==f.filter&&""!==f.filter?a.filter(b).addClass(e.controls.activeClass):a.removeClass(e.controls.activeClass).filter(b).addClass(e.controls.activeClass)}catch(c){}},h="filter",i=null;e._execAction("_updateControls",0,arguments),c.filter===b&&(f.filter=e._activeFilter),c.sort===b&&(f.sort=e._activeSort),f.filter===e.selectors.target&&(f.filter="all");for(var j=0;2>j;j++)i=e.controls.live?a(e.selectors[h]):e["_$"+h+"Buttons"],i&&g(i,"[data-"+h+'="'+f[h]+'"]'),h="sort";e._execAction("_updateControls",1,arguments)},_filter:function(){var b=this;b._execAction("_filter",0);for(var c=0;c<b._$targets.length;c++){var d=a(b._$targets[c]);d.is(b._activeFilter)?b._$show=b._$show.add(d):b._$hide=b._$hide.add(d)}b._execAction("_filter",1)},_sort:function(){var a=this,b=function(a){for(var b=a.slice(),c=b.length,d=c;d--;){var e=parseInt(Math.random()*c),f=b[d];b[d]=b[e],b[e]=f}return b};a._execAction("_sort",0),a._startOrder=[];for(var c=0;c<a._$targets.length;c++){var d=a._$targets[c];a._startOrder.push(d)}switch(a._newSort[0].sortBy){case"default":a._newOrder=a._origOrder;break;case"random":a._newOrder=b(a._startOrder);break;case"custom":a._newOrder=a._newSort[0].order;break;default:a._newOrder=a._startOrder.concat().sort(function(b,c){return a._compare(b,c)})}a._execAction("_sort",1)},_compare:function(a,b,c){c=c?c:0;var d=this,e=d._newSort[c].order,f=function(a){return a.dataset[d._newSort[c].sortBy]||0},g=isNaN(1*f(a))?f(a).toLowerCase():1*f(a),h=isNaN(1*f(b))?f(b).toLowerCase():1*f(b);return h>g?"asc"===e?-1:1:g>h?"asc"===e?1:-1:g===h&&d._newSort.length>c+1?d._compare(a,b,c+1):0},_printSort:function(a){var b=this,c=a?b._startOrder:b._newOrder,d=b._$parent[0].querySelectorAll(b.selectors.target),e=d.length?d[d.length-1].nextElementSibling:null,f=document.createDocumentFragment();b._execAction("_printSort",0,arguments);for(var g=0;g<d.length;g++){var h=d[g],i=h.nextSibling;"absolute"!==h.style.position&&(i&&"#text"===i.nodeName&&b._$parent[0].removeChild(i),b._$parent[0].removeChild(h))}for(var g=0;g<c.length;g++){var j=c[g];if("default"!==b._newSort[0].sortBy||"desc"!==b._newSort[0].order||a)f.appendChild(j),f.appendChild(document.createTextNode(" "));else{var k=f.firstChild;f.insertBefore(j,k),f.insertBefore(document.createTextNode(" "),j)}}e?b._$parent[0].insertBefore(f,e):b._$parent[0].appendChild(f),b._execAction("_printSort",1,arguments)},_parseSort:function(a){for(var b=this,c="string"==typeof a?a.split(" "):[a],d=[],e=0;e<c.length;e++){var f="string"==typeof a?c[e].split(":"):["custom",c[e]],g={sortBy:b._helpers._camelCase(f[0]),order:f[1]||"asc"};if(d.push(g),"default"===g.sortBy||"random"===g.sortBy)break}return b._execFilter("_parseSort",d,arguments)},_parseEffects:function(){var a=this,b={opacity:"",transformIn:"",transformOut:"",filter:""},c=function(b,c,d){if(a.animation.effects.indexOf(b)>-1){if(c){var e=a.animation.effects.indexOf(b+"(");if(e>-1){var f=a.animation.effects.substring(e),g=/\(([^)]+)\)/.exec(f),h=g[1];return{val:h}}}return!0}return!1},d=function(a,b){return b?"-"===a.charAt(0)?a.substr(1,a.length):"-"+a:a},e=function(a,e){for(var f=[["scale",".01"],["translateX","20px"],["translateY","20px"],["translateZ","20px"],["rotateX","90deg"],["rotateY","90deg"],["rotateZ","180deg"]],g=0;g<f.length;g++){var h=f[g][0],i=f[g][1],j=e&&"scale"!==h;b[a]+=c(h)?h+"("+d(c(h,!0).val||i,j)+") ":""}};return b.opacity=c("fade")?c("fade",!0).val||"0":"1",e("transformIn"),a.animation.reverseOut?e("transformOut",!0):b.transformOut=b.transformIn,b.transition={},b.transition=a._getPrefixedCSS("transition","all "+a.animation.duration+"ms "+a.animation.easing+", opacity "+a.animation.duration+"ms linear"),a.animation.stagger=c("stagger")?!0:!1,a.animation.staggerDuration=parseInt(c("stagger")&&c("stagger",!0).val?c("stagger",!0).val:100),a._execFilter("_parseEffects",b)},_buildState:function(a){var b=this,c={};return b._execAction("_buildState",0),c={activeFilter:""===b._activeFilter?"none":b._activeFilter,activeSort:a&&b._newSortString?b._newSortString:b._activeSort,fail:!b._$show.length&&""!==b._activeFilter,$targets:b._$targets,$show:b._$show,$hide:b._$hide,totalTargets:b._$targets.length,totalShow:b._$show.length,totalHide:b._$hide.length,display:a&&b._newDisplay?b._newDisplay:b.layout.display},a?b._execFilter("_buildState",c):(b._state=c,void b._execAction("_buildState",1))},_goMix:function(a){var b=this,c=function(){b._chrome&&31===b._chrome&&f(b._$parent[0]),b._setInter(),d()},d=function(){var a=window.pageYOffset,c=window.pageXOffset;document.documentElement.scrollHeight;b._getInterMixData(),b._setFinal(),b._getFinalMixData(),window.pageYOffset!==a&&window.scrollTo(c,a),b._prepTargets(),window.requestAnimationFrame?requestAnimationFrame(e):setTimeout(function(){e()},20)},e=function(){b._animateTargets(),0===b._targetsBound&&b._cleanUp()},f=function(a){var b=a.parentElement,c=document.createElement("div"),d=document.createDocumentFragment();b.insertBefore(c,a),d.appendChild(a),b.replaceChild(a,c)},g=b._buildState(!0);b._execAction("_goMix",0,arguments),!b.animation.duration&&(a=!1),b._mixing=!0,b._$container.removeClass(b.layout.containerClassFail),"function"==typeof b.callbacks.onMixStart&&b.callbacks.onMixStart.call(b._domNode,b._state,g,b),b._$container.trigger("mixStart",[b._state,g,b]),b._getOrigMixData(),a&&!b._suckMode?window.requestAnimationFrame?requestAnimationFrame(c):c():b._cleanUp(),b._execAction("_goMix",1,arguments)},_getTargetData:function(a,b){var c,d=this;a.dataset[b+"PosX"]=a.offsetLeft,a.dataset[b+"PosY"]=a.offsetTop,d.animation.animateResizeTargets&&(c=d._suckMode?{marginBottom:"",marginRight:""}:window.getComputedStyle(a),a.dataset[b+"MarginBottom"]=parseInt(c.marginBottom),a.dataset[b+"MarginRight"]=parseInt(c.marginRight),a.dataset[b+"Width"]=a.offsetWidth,a.dataset[b+"Height"]=a.offsetHeight)},_getOrigMixData:function(){var a=this,b=a._suckMode?{boxSizing:""}:window.getComputedStyle(a._$parent[0]),c=b.boxSizing||b[a._vendor+"BoxSizing"];a._incPadding="border-box"===c,a._execAction("_getOrigMixData",0),!a._suckMode&&(a.effects=a._parseEffects()),a._$toHide=a._$hide.filter(":visible"),a._$toShow=a._$show.filter(":hidden"),a._$pre=a._$targets.filter(":visible"),a._startHeight=a._incPadding?a._$parent.outerHeight():a._$parent.height();for(var d=0;d<a._$pre.length;d++){var e=a._$pre[d];a._getTargetData(e,"orig")}a._execAction("_getOrigMixData",1)},_setInter:function(){var a=this;a._execAction("_setInter",0),a._changingLayout&&a.animation.animateChangeLayout?(a._$toShow.css("display",a._newDisplay),a._changingClass&&a._$container.removeClass(a.layout.containerClass).addClass(a._newClass)):a._$toShow.css("display",a.layout.display),a._execAction("_setInter",1)},_getInterMixData:function(){var a=this;a._execAction("_getInterMixData",0);for(var b=0;b<a._$toShow.length;b++){var c=a._$toShow[b];a._getTargetData(c,"inter")}for(var b=0;b<a._$pre.length;b++){var c=a._$pre[b];a._getTargetData(c,"inter")}a._execAction("_getInterMixData",1)},_setFinal:function(){var a=this;a._execAction("_setFinal",0),a._sorting&&a._printSort(),a._$toHide.removeStyle("display"),a._changingLayout&&a.animation.animateChangeLayout&&a._$pre.css("display",a._newDisplay),a._execAction("_setFinal",1)},_getFinalMixData:function(){var a=this;a._execAction("_getFinalMixData",0);for(var b=0;b<a._$toShow.length;b++){var c=a._$toShow[b];a._getTargetData(c,"final")}for(var b=0;b<a._$pre.length;b++){var c=a._$pre[b];a._getTargetData(c,"final")}a._newHeight=a._incPadding?a._$parent.outerHeight():a._$parent.height(),a._sorting&&a._printSort(!0),a._$toShow.removeStyle("display"),a._$pre.css("display",a.layout.display),a._changingClass&&a.animation.animateChangeLayout&&a._$container.removeClass(a._newClass).addClass(a.layout.containerClass),a._execAction("_getFinalMixData",1)},_prepTargets:function(){var b=this,c={_in:b._getPrefixedCSS("transform",b.effects.transformIn),_out:b._getPrefixedCSS("transform",b.effects.transformOut)};b._execAction("_prepTargets",0),b.animation.animateResizeContainer&&b._$parent.css("height",b._startHeight+"px");for(var d=0;d<b._$toShow.length;d++){var e=b._$toShow[d],f=a(e);e.style.opacity=b.effects.opacity,e.style.display=b._changingLayout&&b.animation.animateChangeLayout?b._newDisplay:b.layout.display,f.css(c._in),b.animation.animateResizeTargets&&(e.style.width=e.dataset.finalWidth+"px",e.style.height=e.dataset.finalHeight+"px",e.style.marginRight=-(e.dataset.finalWidth-e.dataset.interWidth)+1*e.dataset.finalMarginRight+"px",e.style.marginBottom=-(e.dataset.finalHeight-e.dataset.interHeight)+1*e.dataset.finalMarginBottom+"px")}for(var d=0;d<b._$pre.length;d++){var e=b._$pre[d],f=a(e),g={x:e.dataset.origPosX-e.dataset.interPosX,y:e.dataset.origPosY-e.dataset.interPosY},c=b._getPrefixedCSS("transform","translate("+g.x+"px,"+g.y+"px)");f.css(c),b.animation.animateResizeTargets&&(e.style.width=e.dataset.origWidth+"px",e.style.height=e.dataset.origHeight+"px",e.dataset.origWidth-e.dataset.finalWidth&&(e.style.marginRight=-(e.dataset.origWidth-e.dataset.interWidth)+1*e.dataset.origMarginRight+"px"),e.dataset.origHeight-e.dataset.finalHeight&&(e.style.marginBottom=-(e.dataset.origHeight-e.dataset.interHeight)+1*e.dataset.origMarginBottom+"px"))}b._execAction("_prepTargets",1)},_animateTargets:function(){var b=this;b._execAction("_animateTargets",0),b._targetsDone=0,b._targetsBound=0,b._$parent.css(b._getPrefixedCSS("perspective",b.animation.perspectiveDistance+"px")).css(b._getPrefixedCSS("perspective-origin",b.animation.perspectiveOrigin)),b.animation.animateResizeContainer&&b._$parent.css(b._getPrefixedCSS("transition","height "+b.animation.duration+"ms ease")).css("height",b._newHeight+"px");for(var c=0;c<b._$toShow.length;c++){var d=b._$toShow[c],e=a(d),f={x:d.dataset.finalPosX-d.dataset.interPosX,y:d.dataset.finalPosY-d.dataset.interPosY},g=b._getDelay(c),h={};d.style.opacity="";for(var i=0;2>i;i++){var j=0===i?j=b._prefix:"";b._ff&&b._ff<=20&&(h[j+"transition-property"]="all",h[j+"transition-timing-function"]=b.animation.easing+"ms",h[j+"transition-duration"]=b.animation.duration+"ms"),h[j+"transition-delay"]=g+"ms",h[j+"transform"]="translate("+f.x+"px,"+f.y+"px)"}(b.effects.transform||b.effects.opacity)&&b._bindTargetDone(e),b._ff&&b._ff<=20?e.css(h):e.css(b.effects.transition).css(h)}for(var c=0;c<b._$pre.length;c++){var d=b._$pre[c],e=a(d),f={x:d.dataset.finalPosX-d.dataset.interPosX,y:d.dataset.finalPosY-d.dataset.interPosY},g=b._getDelay(c);(d.dataset.finalPosX!==d.dataset.origPosX||d.dataset.finalPosY!==d.dataset.origPosY)&&b._bindTargetDone(e),e.css(b._getPrefixedCSS("transition","all "+b.animation.duration+"ms "+b.animation.easing+" "+g+"ms")),e.css(b._getPrefixedCSS("transform","translate("+f.x+"px,"+f.y+"px)")),b.animation.animateResizeTargets&&(d.dataset.origWidth-d.dataset.finalWidth&&1*d.dataset.finalWidth&&(d.style.width=d.dataset.finalWidth+"px",d.style.marginRight=-(d.dataset.finalWidth-d.dataset.interWidth)+1*d.dataset.finalMarginRight+"px"),d.dataset.origHeight-d.dataset.finalHeight&&1*d.dataset.finalHeight&&(d.style.height=d.dataset.finalHeight+"px",d.style.marginBottom=-(d.dataset.finalHeight-d.dataset.interHeight)+1*d.dataset.finalMarginBottom+"px"))}b._changingClass&&b._$container.removeClass(b.layout.containerClass).addClass(b._newClass);for(var c=0;c<b._$toHide.length;c++){for(var d=b._$toHide[c],e=a(d),g=b._getDelay(c),k={},i=0;2>i;i++){var j=0===i?j=b._prefix:"";k[j+"transition-delay"]=g+"ms",k[j+"transform"]=b.effects.transformOut,k.opacity=b.effects.opacity}e.css(b.effects.transition).css(k),(b.effects.transform||b.effects.opacity)&&b._bindTargetDone(e)}b._execAction("_animateTargets",1)},_bindTargetDone:function(b){var c=this,d=b[0];c._execAction("_bindTargetDone",0,arguments),d.dataset.bound||(d.dataset.bound=!0,c._targetsBound++,b.on("webkitTransitionEnd.mixItUp transitionend.mixItUp",function(e){(e.originalEvent.propertyName.indexOf("transform")>-1||e.originalEvent.propertyName.indexOf("opacity")>-1)&&a(e.originalEvent.target).is(c.selectors.target)&&(b.off(".mixItUp"),d.dataset.bound="",c._targetDone())})),c._execAction("_bindTargetDone",1,arguments)},_targetDone:function(){var a=this;a._execAction("_targetDone",0),a._targetsDone++,a._targetsDone===a._targetsBound&&a._cleanUp(),a._execAction("_targetDone",1)},_cleanUp:function(){var b=this,c=b.animation.animateResizeTargets?"transform opacity width height margin-bottom margin-right":"transform opacity",d=function(){b._$targets.removeStyle("transition",b._prefix)};b._execAction("_cleanUp",0),b._changingLayout?b._$show.css("display",b._newDisplay):b._$show.css("display",b.layout.display),b._$targets.css(b._brake),b._$targets.removeStyle(c,b._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"),b._$hide.removeStyle("display"),b._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin",b._prefix),b._sorting&&(b._printSort(),b._activeSort=b._newSortString,b._sorting=!1),b._changingLayout&&(b._changingDisplay&&(b.layout.display=b._newDisplay,b._changingDisplay=!1),b._changingClass&&(b._$parent.removeClass(b.layout.containerClass).addClass(b._newClass),b.layout.containerClass=b._newClass,b._changingClass=!1),b._changingLayout=!1),b._refresh(),b._buildState(),b._state.fail&&b._$container.addClass(b.layout.containerClassFail),b._$show=a(),b._$hide=a(),window.requestAnimationFrame&&requestAnimationFrame(d),b._mixing=!1,"function"==typeof b.callbacks._user&&b.callbacks._user.call(b._domNode,b._state,b),"function"==typeof b.callbacks.onMixEnd&&b.callbacks.onMixEnd.call(b._domNode,b._state,b),b._$container.trigger("mixEnd",[b._state,b]),b._state.fail&&("function"==typeof b.callbacks.onMixFail&&b.callbacks.onMixFail.call(b._domNode,b._state,b),b._$container.trigger("mixFail",[b._state,b])),b._loading&&("function"==typeof b.callbacks.onMixLoad&&b.callbacks.onMixLoad.call(b._domNode,b._state,b),b._$container.trigger("mixLoad",[b._state,b])),b._queue.length&&(b._execAction("_queue",0),b.multiMix(b._queue[0][0],b._queue[0][1],b._queue[0][2]),b._queue.splice(0,1)),b._execAction("_cleanUp",1),b._loading=!1},_getPrefixedCSS:function(a,b,c){var d=this,e={},f="",g=-1;for(g=0;2>g;g++)f=0===g?d._prefix:"",c?e[f+a]=f+b:e[f+a]=b;return d._execFilter("_getPrefixedCSS",e,arguments)},_getDelay:function(a){var b=this,c="function"==typeof b.animation.staggerSequence?b.animation.staggerSequence.call(b._domNode,a,b._state):a,d=b.animation.stagger?c*b.animation.staggerDuration:0;return b._execFilter("_getDelay",d,arguments)},_parseMultiMixArgs:function(a){for(var b=this,c={command:null,animate:b.animation.enable,callback:null},d=0;d<a.length;d++){var e=a[d];null!==e&&("object"==typeof e||"string"==typeof e?c.command=e:"boolean"==typeof e?c.animate=e:"function"==typeof e&&(c.callback=e))}return b._execFilter("_parseMultiMixArgs",c,arguments)},_parseInsertArgs:function(b){for(var c=this,d={index:0,$object:a(),multiMix:{filter:c._state.activeFilter},callback:null},e=0;e<b.length;e++){var f=b[e];"number"==typeof f?d.index=f:"object"==typeof f&&f instanceof a?d.$object=f:"object"==typeof f&&c._helpers._isElement(f)?d.$object=a(f):"object"==typeof f&&null!==f?d.multiMix=f:"boolean"!=typeof f||f?"function"==typeof f&&(d.callback=f):d.multiMix=!1}return c._execFilter("_parseInsertArgs",d,arguments)},_execAction:function(a,b,c){var d=this,e=b?"post":"pre";if(!d._actions.isEmptyObject&&d._actions.hasOwnProperty(a))for(var f in d._actions[a][e])d._actions[a][e][f].call(d,c)},_execFilter:function(a,b,c){var d=this;if(d._filters.isEmptyObject||!d._filters.hasOwnProperty(a))return b;for(var e in d._filters[a])return d._filters[a][e].call(d,c)},_helpers:{_camelCase:function(a){return a.replace(/-([a-z])/g,function(a){return a[1].toUpperCase()})},_isElement:function(a){return window.HTMLElement?a instanceof HTMLElement:null!==a&&1===a.nodeType&&"string"===a.nodeName}},isMixing:function(){var a=this;return a._execFilter("isMixing",a._mixing)},filter:function(){var a=this,b=a._parseMultiMixArgs(arguments);a._clicking&&(a._toggleString=""),a.multiMix({filter:b.command},b.animate,b.callback)},sort:function(){var a=this,b=a._parseMultiMixArgs(arguments);a.multiMix({sort:b.command},b.animate,b.callback)},changeLayout:function(){var a=this,b=a._parseMultiMixArgs(arguments);a.multiMix({changeLayout:b.command},b.animate,b.callback)},multiMix:function(){var a=this,c=a._parseMultiMixArgs(arguments);if(a._execAction("multiMix",0,arguments),a._mixing)a.animation.queue&&a._queue.length<a.animation.queueLimit?(a._queue.push(arguments),a.controls.enable&&!a._clicking&&a._updateControls(c.command),a._execAction("multiMixQueue",1,arguments)):("function"==typeof a.callbacks.onMixBusy&&a.callbacks.onMixBusy.call(a._domNode,a._state,a),a._$container.trigger("mixBusy",[a._state,a]),a._execAction("multiMixBusy",1,arguments));else{a.controls.enable&&!a._clicking&&(a.controls.toggleFilterButtons&&a._buildToggleArray(),a._updateControls(c.command,a.controls.toggleFilterButtons)),a._queue.length<2&&(a._clicking=!1),delete a.callbacks._user,c.callback&&(a.callbacks._user=c.callback);var d=c.command.sort,e=c.command.filter,f=c.command.changeLayout;a._refresh(),d&&(a._newSort=a._parseSort(d),a._newSortString=d,a._sorting=!0,a._sort()),e!==b&&(e="all"===e?a.selectors.target:e,a._activeFilter=e),a._filter(),f&&(a._newDisplay="string"==typeof f?f:f.display||a.layout.display,a._newClass=f.containerClass||"",(a._newDisplay!==a.layout.display||a._newClass!==a.layout.containerClass)&&(a._changingLayout=!0,a._changingClass=a._newClass!==a.layout.containerClass,a._changingDisplay=a._newDisplay!==a.layout.display)),a._$targets.css(a._brake),a._goMix(c.animate^a.animation.enable?c.animate:a.animation.enable),a._execAction("multiMix",1,arguments)}},insert:function(){var a=this,b=a._parseInsertArgs(arguments),c="function"==typeof b.callback?b.callback:null,d=document.createDocumentFragment(),e=function(){return a._refresh(),a._$targets.length?b.index<a._$targets.length||!a._$targets.length?a._$targets[b.index]:a._$targets[a._$targets.length-1].nextElementSibling:a._$parent[0].children[0]}();if(a._execAction("insert",0,arguments),b.$object){for(var f=0;f<b.$object.length;f++){var g=b.$object[f];d.appendChild(g),d.appendChild(document.createTextNode(" "))}a._$parent[0].insertBefore(d,e)}a._execAction("insert",1,arguments),"object"==typeof b.multiMix&&a.multiMix(b.multiMix,c)},prepend:function(){var a=this,b=a._parseInsertArgs(arguments);a.insert(0,b.$object,b.multiMix,b.callback)},append:function(){var a=this,b=a._parseInsertArgs(arguments);a.insert(a._state.totalTargets,b.$object,b.multiMix,b.callback)},getOption:function(a){var c=this,d=function(a,c){for(var d=c.split("."),e=d.pop(),f=d.length,g=1,h=d[0]||c;(a=a[h])&&f>g;)h=d[g],g++;return a!==b?a[e]!==b?a[e]:a:void 0};return a?c._execFilter("getOption",d(c,a),arguments):c},setOptions:function(b){var c=this;c._execAction("setOptions",0,arguments),"object"==typeof b&&a.extend(!0,c,b),c._execAction("setOptions",1,arguments)},getState:function(){var a=this;return a._execFilter("getState",a._state,a)},forceRefresh:function(){var a=this;a._refresh(!1,!0)},destroy:function(b){var c=this,d=a.MixItUp.prototype._bound._filter,e=a.MixItUp.prototype._bound._sort;c._execAction("destroy",0,arguments),c._$body.add(a(c.selectors.sort)).add(a(c.selectors.filter)).off(".mixItUp");for(var f=0;f<c._$targets.length;f++){var g=c._$targets[f];b&&(g.style.display=""),delete g.mixParent}c._execAction("destroy",1,arguments),d[c.selectors.filter]&&d[c.selectors.filter]>1?d[c.selectors.filter]--:1===d[c.selectors.filter]&&delete d[c.selectors.filter],e[c.selectors.sort]&&e[c.selectors.sort]>1?e[c.selectors.sort]--:1===e[c.selectors.sort]&&delete e[c.selectors.sort],delete a.MixItUp.prototype._instances[c._id]}},a.fn.mixItUp=function(){var c,d=arguments,e=[],f=function(b,c){var d=new a.MixItUp,e=function(){return("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase()};d._execAction("_instantiate",0,arguments),b.id=b.id?b.id:"MixItUp"+e(),d._instances[b.id]||(d._instances[b.id]=d,d._init(b,c)),d._execAction("_instantiate",1,arguments)};return c=this.each(function(){if(d&&"string"==typeof d[0]){var c=a.MixItUp.prototype._instances[this.id];if("isLoaded"===d[0])e.push(c?!0:!1);else{var g=c[d[0]](d[1],d[2],d[3]);g!==b&&e.push(g)}}else f(this,d[0])}),e.length?e.length>1?e:e[0]:c},a.fn.removeStyle=function(c,d){return d=d?d:"",this.each(function(){for(var e=this,f=c.split(" "),g=0;g<f.length;g++)for(var h=0;4>h;h++){switch(h){case 0:var i=f[g];break;case 1:var i=a.MixItUp.prototype._helpers._camelCase(i);break;case 2:var i=d+f[g];break;case 3:var i=a.MixItUp.prototype._helpers._camelCase(d+f[g])}if(e.style[i]!==b&&"unknown"!=typeof e.style[i]&&e.style[i].length>0&&(e.style[i]=""),!d&&1===h)break}e.attributes&&e.attributes.style&&e.attributes.style!==b&&""===e.attributes.style.value&&e.attributes.removeNamedItem("style")})}}(jQuery);
