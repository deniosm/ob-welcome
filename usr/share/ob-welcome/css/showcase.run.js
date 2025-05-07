(self.webpackChunkmvp = self.webpackChunkmvp || []).push([
	[249], {
		491: function(e, t, n) {
			var i, s, o;
			o = function() {
				var e, t, n = document,
					i = n.getElementsByTagName("head")[0],
					s = !1,
					o = "push",
					r = "readyState",
					c = "onreadystatechange",
					a = {},
					h = {},
					u = {},
					d = {};

				function l(e, t) {
					for (var n = 0, i = e.length; n < i; ++n)
						if (!t(e[n])) return s;
					return 1
				}

				function f(e, t) {
					l(e, (function(e) {
						return t(e), 1
					}))
				}

				function v(t, n, i) {
					t = t[o] ? t : [t];
					var s = n && n.call,
						r = s ? n : i,
						c = s ? t.join("") : n,
						p = t.length;

					function w(e) {
						return e.call ? e() : a[e]
					}

					function x() {
						if (!--p)
							for (var e in a[c] = 1, r && r(), u) l(e.split("|"), w) && !f(u[e], w) && (u[e] = [])
					}
					return setTimeout((function() {
						f(t, (function t(n, i) {
							return null === n ? x() : (i || /^file?:\/\//.test(n) || !e || (n = -1 === n.indexOf(".js") ? e + n + ".js" : e + n), d[n] ? (c && (h[c] = 1), 2 == d[n] ? x() : setTimeout((function() {
								t(n, !0)
							}), 0)) : (d[n] = 1, c && (h[c] = 1), void g(n, x)))
						}))
					}), 0), v
				}

				function g(e, s) {
					var o, a = n.createElement("script");
					a.onload = a.onerror = a[c] = function() {
						a[r] && !/^c|loade/.test(a[r]) || o || (a.onload = a[c] = null, o = 1, d[e] = 2, s())
					}, a.async = 1, a.src = t ? e + (-1 === e.indexOf("?") ? "?" : "&") + t : e, i.insertBefore(a, i.lastChild)
				}
				return v.get = g, v.order = function(e, t, n) {
					! function i(s) {
						s = e.shift(), e.length ? v(s, i) : v(s, t, n)
					}()
				}, v.path = function(t) {
					e = t
				}, v.urlArgs = function(e) {
					t = e
				}, v.ready = function(e, t, n) {
					e = e[o] ? e : [e];
					var i, s = [];
					return !f(e, (function(e) {
						a[e] || s[o](e)
					})) && l(e, (function(e) {
						return a[e]
					})) ? t() : (i = e.join("|"), u[i] = u[i] || [], u[i][o](t), n && n(s)), v
				}, v.done = function(e) {
					v([null], e)
				}, v
			}, e.exports ? e.exports = o() : void 0 === (s = "function" == typeof(i = o) ? i.call(t, n, t, e) : i) || (e.exports = s)
		},
		713: function(e, t, n) {
			"use strict";
			var i = n(491);
			t.A = new Promise(((e, t) => {
				i("file:///usr/share/ob-welcome/css/jquery.min.js", (() => (console.log("jQuery loaded"), e(window.jQuery))))
			}))
		},
		831: function(e, t, n) {
			"use strict";
			var i = n(713);
			class s {
				constructor(e) {
					this.container = e.container || "#showcase", this.index = e.index || "#showcase-index", this.slides = e.slides || [], this.fixed = e.fixed || !1, this.current = null
				}
				start() {
					for (var e = 0; e < this.slides.length; e++) {
						var t = this.slides[e],
							n = $("[href$='" + t + "']", this.container);
						$("#" + t, this.container).prepend('<div class="showcase-back"></div>');
						const i = this;
						n.on("click", (function(e) {
							e.preventDefault(), i.slideTo($(this).attr("href").split("#").pop())
						}))
					}
					$(window).resize((() => this.resize())), this.slideTo("index"), $(this.container).addClass("initialized"), $(this.container).scrollLeft(0);
					var i = null,
						s = null;
					$(document).on("touchstart", this.container, (e => {
						i = e.touches[0].pageX, s = e.touches[0].pageY
					})), $(document).on("touchend", (e => {
						var t = e.changedTouches[e.changedTouches.length - 1].pageX,
							n = e.changedTouches[e.changedTouches.length - 1].pageY,
							o = t - i,
							r = n - s;
						Math.abs(r) < o / 3 && o > 100 && this.slideTo("index"), i = null, s = null
					}))
				}
				slideTo(e) {
					if ("index" !== e && -1 === this.slides.indexOf(e)) return console.error("could not find requested slide '" + e + "'");
					"index" === e ? $(this.index, this.container).addClass("active") : $(this.index, this.container).removeClass("active");
					for (var t = 0; t < this.slides.length; t++) {
						var n = this.slides[t],
							i = $("#" + n, this.container);
						n === e ? i.addClass("active") : i.removeClass("active")
					}
					this.current = e, $(this.container).trigger("change", {
						active: e
					}), "index" !== this.current && $("body").animate({
						scrollTop: $(this.container).offset().top
					}, 100), this.resize()
				}
				resize() {
					var e = 0;
					this.fixed ? (e = $(this.index, this.container).outerHeight(!0), $.each(this.slides, (function(t, n) {
						var i = $("#" + n, this.container);
						i.outerHeight(!0) > e && (e = i.outerHeight(!0))
					})), $(this.container).height(e)) : (e = "index" === this.current ? $(this.index, this.container).outerHeight(!0) : $("#" + this.current, this.container).outerHeight(!0), $(this.container).height(e))
				}
			}
			i.A.then((e => {
				e(document).ready((() => {
					const t = new s({
						container: "#showcase",
						index: "#showcase-index",
						slides: ["showcase-music", "showcase-epiphany", "showcase-mail", "showcase-photos", "showcase-videos", "showcase-calendar", "showcase-files", "showcase-terminal", "showcase-code", "showcase-camera"],
						fixed: !1
					});
					t.start(), e("#showcase .showcase-tab .showcase-back").on("click", (e => {
						e.preventDefault(), t.slideTo("index")
					})), console.log("Loaded showcase.run.js")
				}))
			}))
		}
	},
	function(e) {
		e(e.s = 831)
	}
]);
