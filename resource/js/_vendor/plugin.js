(function() {
    "use strict";

    function t() {}

    function e(t, e) {
        for (var i = t.length; i--;)
            if (t[i].listener === e) return i;
        return -1
    }
    var i = t.prototype;
    i.getListeners = function(t) {
        var e, i, r = this._getEvents();
        if ("object" == typeof t) {
            e = {};
            for (i in r) r.hasOwnProperty(i) && t.test(i) && (e[i] = r[i])
        } else e = r[t] || (r[t] = []);
        return e
    }, i.flattenListeners = function(t) {
        var e, i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i
    }, i.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {}, e[t] = i), e || i
    }, i.addListener = function(t, i) {
        var r, n = this.getListenersAsObject(t),
            s = "object" == typeof i;
        for (r in n) n.hasOwnProperty(r) && -1 === e(n[r], i) && n[r].push(s ? i : {
            listener: i,
            once: !1
        });
        return this
    }, i.on = i.addListener, i.addOnceListener = function(t, e) {
        return this.addListener(t, {
            listener: e,
            once: !0
        })
    }, i.once = i.addOnceListener, i.defineEvent = function(t) {
        return this.getListeners(t), this
    }, i.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this
    }, i.removeListener = function(t, i) {
        var r, n, s = this.getListenersAsObject(t);
        for (n in s) s.hasOwnProperty(n) && (r = e(s[n], i), -1 !== r && s[n].splice(r, 1));
        return this
    }, i.off = i.removeListener, i.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function(t, e, i) {
        var r, n, s = t ? this.removeListener : this.addListener,
            a = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (r = i.length; r--;) s.call(this, e, i[r]);
        else
            for (r in e) e.hasOwnProperty(r) && (n = e[r]) && ("function" == typeof n ? s.call(this, r, n) : a.call(this, r, n));
        return this
    }, i.removeEvent = function(t) {
        var e, i = typeof t,
            r = this._getEvents();
        if ("string" === i) delete r[t];
        else if ("object" === i)
            for (e in r) r.hasOwnProperty(e) && t.test(e) && delete r[e];
        else delete this._events;
        return this
    }, i.emitEvent = function(t, e) {
        var i, r, n, s, a = this.getListenersAsObject(t);
        for (n in a)
            if (a.hasOwnProperty(n))
                for (r = a[n].length; r--;) i = a[n][r], s = i.listener.apply(this, e || []), (s === this._getOnceReturnValue() || i.once === !0) && this.removeListener(t, a[n][r].listener);
        return this
    }, i.trigger = i.emitEvent, i.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function(t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, "function" == typeof define && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}).call(this),
    function(t) {
        "use strict";
        var e = document.documentElement,
            i = function() {};
        e.addEventListener ? i = function(t, e, i) {
            t.addEventListener(e, i, !1)
        } : e.attachEvent && (i = function(e, i, r) {
            e[i + r] = r.handleEvent ? function() {
                var e = t.event;
                e.target = e.target || e.srcElement, r.handleEvent.call(r, e)
            } : function() {
                var i = t.event;
                i.target = i.target || i.srcElement, r.call(e, i)
            }, e.attachEvent("on" + i, e[i + r])
        });
        var r = function() {};
        e.removeEventListener ? r = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        } : e.detachEvent && (r = function(t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
                delete t[e + i]
            } catch (r) {
                t[e + i] = void 0
            }
        });
        var n = {
            bind: i,
            unbind: r
        };
        "function" == typeof define && define.amd ? define(n) : t.eventie = n
    }(this),
    function(t) {
        "use strict";

        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function i(t) {
            return "[object Array]" === l.call(t)
        }

        function r(t) {
            var e = [];
            if (i(t)) e = t;
            else if ("number" == typeof t.length)
                for (var r = 0, n = t.length; n > r; r++) e.push(t[r]);
            else e.push(t);
            return e
        }

        function n(t, i) {
            function n(t, i, a) {
                if (!(this instanceof n)) return new n(t, i);
                "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = r(t), this.options = e({}, this.options), "function" == typeof i ? a = i : e(this.options, i), a && this.on("always", a), this.getImages(), s && (this.jqDeferred = new s.Deferred);
                var o = this;
                setTimeout(function() {
                    o.check()
                })
            }

            function l(t) {
                this.img = t
            }
            n.prototype = new t, n.prototype.options = {}, n.prototype.getImages = function() {
                this.images = [];
                for (var t = 0, e = this.elements.length; e > t; t++) {
                    var i = this.elements[t];
                    "IMG" === i.nodeName && this.addImage(i);
                    for (var r = i.querySelectorAll("img"), n = 0, s = r.length; s > n; n++) {
                        var a = r[n];
                        this.addImage(a)
                    }
                }
            }, n.prototype.addImage = function(t) {
                var e = new l(t);
                this.images.push(e)
            }, n.prototype.check = function() {
                function t(t, n) {
                    return e.options.debug && o && a.log("confirm", t, n), e.progress(t), i++, i === r && e.complete(), !0
                }
                var e = this,
                    i = 0,
                    r = this.images.length;
                if (this.hasAnyBroken = !1, !r) return void this.complete();
                for (var n = 0; r > n; n++) {
                    var s = this.images[n];
                    s.on("confirm", t), s.check()
                }
            }, n.prototype.progress = function(t) {
                this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
                var e = this;
                setTimeout(function() {
                    e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify(e, t)
                })
            }, n.prototype.complete = function() {
                var t = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var e = this;
                setTimeout(function() {
                    if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                        var i = e.hasAnyBroken ? "reject" : "resolve";
                        e.jqDeferred[i](e)
                    }
                })
            }, s && (s.fn.imagesLoaded = function(t, e) {
                var i = new n(this, t, e);
                return i.jqDeferred.promise(s(this))
            });
            var h = {};
            return l.prototype = new t, l.prototype.check = function() {
                var t = h[this.img.src];
                if (t) return void this.useCached(t);
                if (h[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
                var e = this.proxyImage = new Image;
                i.bind(e, "load", this), i.bind(e, "error", this), e.src = this.img.src
            }, l.prototype.useCached = function(t) {
                if (t.isConfirmed) this.confirm(t.isLoaded, "cached was confirmed");
                else {
                    var e = this;
                    t.on("confirm", function(t) {
                        return e.confirm(t.isLoaded, "cache emitted confirmed"), !0
                    })
                }
            }, l.prototype.confirm = function(t, e) {
                this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
            }, l.prototype.handleEvent = function(t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, l.prototype.onload = function() {
                this.confirm(!0, "onload"), this.unbindProxyEvents()
            }, l.prototype.onerror = function() {
                this.confirm(!1, "onerror"), this.unbindProxyEvents()
            }, l.prototype.unbindProxyEvents = function() {
                i.unbind(this.proxyImage, "load", this), i.unbind(this.proxyImage, "error", this)
            }, n
        }
        var s = t.jQuery,
            a = t.console,
            o = void 0 !== a,
            l = Object.prototype.toString;
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], n) : t.imagesLoaded = n(t.EventEmitter, t.eventie)
    }(window);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var r = function(t) {
                        var e, i = [],
                            r = t.length;
                        for (e = 0; e !== r; i.push(t[e++]));
                        return i
                    },
                    n = function(t, e, i) {
                        var r, n, s = t.cycle;
                        for (r in s) n = s[r], t[r] = "function" == typeof n ? n(i, e[i]) : n[i % n.length];
                        delete t.cycle
                    },
                    s = function(t, e, r) {
                        i.call(this, t, e, r), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = s.prototype.render
                    },
                    a = 1e-10,
                    o = i._internals,
                    l = o.isSelector,
                    h = o.isArray,
                    u = s.prototype = i.to({}, .1, {}),
                    c = [];
                s.version = "1.19.1", u.constructor = s, u.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, s.render = i.render, u.invalidate = function() {
                    return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                }, u.updateTo = function(t, e) {
                    var r, n = this.ratio,
                        s = this.vars.immediateRender || t.immediateRender;
                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (r in t) this.vars[r] = t[r];
                    if (this._initted || s)
                        if (e) this._initted = !1, s && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var a = this._totalTime;
                        this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1)
                    } else if (this._initted = !1, this._init(), this._time > 0 || s)
                        for (var o, l = 1 / (1 - n), h = this._firstPT; h;) o = h.s + h.c, h.c *= l, h.s = o - h.c, h = h._next;
                    return this
                }, u.render = function(t, e, i) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var r, n, s, l, h, u, c, f, _ = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        d = this._totalTime,
                        m = this._cycle,
                        g = this._duration,
                        v = this._rawPrevTime;
                    if (t >= _ - 1e-7 && t >= 0 ? (this._totalTime = _, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = g, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, n = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === g && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > v || 0 >= t && t >= -1e-7 || v === a && "isPause" !== this.data) && v !== t && (i = !0, v > a && (n = "onReverseComplete")), this._rawPrevTime = f = !e || t || v === t ? t : a)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== d || 0 === g && v > 0) && (n = "onReverseComplete", r = this._reversed), 0 > t && (this._active = !1, 0 === g && (this._initted || !this.vars.lazy || i) && (v >= 0 && (i = !0), this._rawPrevTime = f = !e || t || v === t ? t : a)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (l = g + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && t >= d && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 != (1 & this._cycle) && (this._time = g - this._time), this._time > g ? this._time = g : this._time < 0 && (this._time = 0)), this._easeType ? (h = this._time / g, u = this._easeType, c = this._easePower, (1 === u || 3 === u && h >= .5) && (h = 1 - h), 3 === u && (h *= 2), 1 === c ? h *= h : 2 === c ? h *= h * h : 3 === c ? h *= h * h * h : 4 === c && (h *= h * h * h * h), 1 === u ? this.ratio = 1 - h : 2 === u ? this.ratio = h : this._time / g < .5 ? this.ratio = h / 2 : this.ratio = 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / g)), p !== this._time || i || m !== this._cycle) {
                        if (!this._initted) {
                            if (this._init(), !this._initted || this._gc) return;
                            if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = p, this._totalTime = d, this._rawPrevTime = v, this._cycle = m, o.lazyTweens.push(this), void(this._lazy = [t, e]);
                            this._time && !r ? this.ratio = this._ease.getRatio(this._time / g) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                        }
                        for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== p && t >= 0 && (this._active = !0), 0 === d && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === g) && (e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                        this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== d || n) && this._callback("onUpdate")), this._cycle !== m && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), n && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this._callback(n), 0 === g && this._rawPrevTime === a && f !== a && (this._rawPrevTime = 0))
                    } else d !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
                }, s.to = function(t, e, i) {
                    return new s(t, e, i)
                }, s.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(t, e, i)
                }, s.fromTo = function(t, e, i, r) {
                    return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, new s(t, e, r)
                }, s.staggerTo = s.allTo = function(t, e, a, o, u, f, _) {
                    o = o || 0;
                    var p, d, m, g, v = 0,
                        y = [],
                        x = a.cycle,
                        T = a.startAt && a.startAt.cycle;
                    for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = r(t))), t = t || [], 0 > o && ((t = r(t)).reverse(), o *= -1), p = t.length - 1, m = 0; p >= m; m++) {
                        d = {};
                        for (g in a) d[g] = a[g];
                        if (x && (n(d, t, m), null != d.duration && (e = d.duration, delete d.duration)), T) {
                            T = d.startAt = {};
                            for (g in a.startAt) T[g] = a.startAt[g];
                            n(d.startAt, t, m)
                        }
                        d.delay = v + (d.delay || 0), m === p && u && (d.onComplete = function() {
                            a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments), u.apply(_ || a.callbackScope || this, f || c)
                        }), y[m] = new s(t[m], e, d), v += o
                    }
                    return y
                }, s.staggerFrom = s.allFrom = function(t, e, i, r, n, a, o) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(t, e, i, r, n, a, o)
                }, s.staggerFromTo = s.allFromTo = function(t, e, i, r, n, a, o, l) {
                    return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, s.staggerTo(t, e, r, n, a, o, l)
                }, s.delayedCall = function(t, e, i, r, n) {
                    return new s(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: r,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        useFrames: n,
                        overwrite: 0
                    })
                }, s.set = function(t, e) {
                    return new s(t, 0, e)
                }, s.isTweening = function(t) {
                    return i.getTweensOf(t, !0).length > 0
                };
                var f = function(t, e) {
                        for (var r = [], n = 0, s = t._first; s;) s instanceof i ? r[n++] = s : (e && (r[n++] = s), r = r.concat(f(s, e)), n = r.length), s = s._next;
                        return r
                    },
                    _ = s.getAllTweens = function(e) {
                        return f(t._rootTimeline, e).concat(f(t._rootFramesTimeline, e))
                    };
                s.killAll = function(t, i, r, n) {
                    null == i && (i = !0), null == r && (r = !0);
                    var s, a, o, l = _(0 != n),
                        h = l.length,
                        u = i && r && n;
                    for (o = 0; h > o; o++) a = l[o], (u || a instanceof e || (s = a.target === a.vars.onComplete) && r || i && !s) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
                }, s.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var n, a, u, c, f, _ = o.tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = r(t)), h(t))
                            for (c = t.length; --c > -1;) s.killChildTweensOf(t[c], e);
                        else {
                            n = [];
                            for (u in _)
                                for (a = _[u].target.parentNode; a;) a === t && (n = n.concat(_[u].tweens)), a = a.parentNode;
                            for (f = n.length, c = 0; f > c; c++) e && n[c].totalTime(n[c].totalDuration()), n[c]._enabled(!1, !1)
                        }
                    }
                };
                var p = function(t, i, r, n) {
                    i = !1 !== i, r = !1 !== r;
                    for (var s, a, o = _(n = !1 !== n), l = i && r && n, h = o.length; --h > -1;) a = o[h], (l || a instanceof e || (s = a.target === a.vars.onComplete) && r || i && !s) && a.paused(t)
                };
                return s.pauseAll = function(t, e, i) {
                    p(!0, t, e, i)
                }, s.resumeAll = function(t, e, i) {
                    p(!1, t, e, i)
                }, s.globalTimeScale = function(e) {
                    var r = t._rootTimeline,
                        n = i.ticker.time;
                    return arguments.length ? (e = e || a, r._startTime = n - (n - r._startTime) * r._timeScale / e, r = t._rootFramesTimeline, n = i.ticker.frame, r._startTime = n - (n - r._startTime) * r._timeScale / e, r._timeScale = t._rootTimeline._timeScale = e, e) : r._timeScale
                }, u.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }, u.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }, u.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, u.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, u.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, u.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, s
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var r = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, r, n = this.vars;
                        for (r in n) i = n[r], l(i) && -1 !== i.join("").indexOf("{self}") && (n[r] = this._swapSelfInParams(i));
                        l(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger)
                    },
                    n = 1e-10,
                    s = i._internals,
                    a = r._internals = {},
                    o = s.isSelector,
                    l = s.isArray,
                    h = s.lazyTweens,
                    u = s.lazyRender,
                    c = _gsScope._gsDefine.globals,
                    f = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    _ = function(t, e, i) {
                        var r, n, s = t.cycle;
                        for (r in s) n = s[r], t[r] = "function" == typeof n ? n(i, e[i]) : n[i % n.length];
                        delete t.cycle
                    },
                    p = a.pauseCallback = function() {},
                    d = function(t) {
                        var e, i = [],
                            r = t.length;
                        for (e = 0; e !== r; i.push(t[e++]));
                        return i
                    },
                    m = r.prototype = new e;
                return r.version = "1.19.1", m.constructor = r, m.kill()._gc = m._forcingPlayhead = m._hasPause = !1, m.to = function(t, e, r, n) {
                    var s = r.repeat && c.TweenMax || i;
                    return e ? this.add(new s(t, e, r), n) : this.set(t, r, n)
                }, m.from = function(t, e, r, n) {
                    return this.add((r.repeat && c.TweenMax || i).from(t, e, r), n)
                }, m.fromTo = function(t, e, r, n, s) {
                    var a = n.repeat && c.TweenMax || i;
                    return e ? this.add(a.fromTo(t, e, r, n), s) : this.set(t, n, s)
                }, m.staggerTo = function(t, e, n, s, a, l, h, u) {
                    var c, p, m = new r({
                            onComplete: l,
                            onCompleteParams: h,
                            callbackScope: u,
                            smoothChildTiming: this.smoothChildTiming
                        }),
                        g = n.cycle;
                    for ("string" == typeof t && (t = i.selector(t) || t), o(t = t || []) && (t = d(t)), 0 > (s = s || 0) && ((t = d(t)).reverse(), s *= -1), p = 0; p < t.length; p++)(c = f(n)).startAt && (c.startAt = f(c.startAt), c.startAt.cycle && _(c.startAt, t, p)), g && (_(c, t, p), null != c.duration && (e = c.duration, delete c.duration)), m.to(t[p], e, c, p * s);
                    return this.add(m, a)
                }, m.staggerFrom = function(t, e, i, r, n, s, a, o) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, r, n, s, a, o)
                }, m.staggerFromTo = function(t, e, i, r, n, s, a, o, l) {
                    return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, r, n, s, a, o, l)
                }, m.call = function(t, e, r, n) {
                    return this.add(i.delayedCall(0, t, e, r), n)
                }, m.set = function(t, e, r) {
                    return r = this._parseTimeOrLabel(r, 0, !0), null == e.immediateRender && (e.immediateRender = r === this._time && !this._paused), this.add(new i(t, 0, e), r)
                }, r.exportRoot = function(t, e) {
                    null == (t = t || {}).smoothChildTiming && (t.smoothChildTiming = !0);
                    var n, s, a = new r(t),
                        o = a._timeline;
                    for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, n = o._first; n;) s = n._next, e && n instanceof i && n.target === n.vars.onComplete || a.add(n, n._startTime - n._delay), n = s;
                    return o.add(a, 0), a
                }, m.add = function(n, s, a, o) {
                    var h, u, c, f, _, p;
                    if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, n)), !(n instanceof t)) {
                        if (n instanceof Array || n && n.push && l(n)) {
                            for (a = a || "normal", o = o || 0, h = s, u = n.length, c = 0; u > c; c++) l(f = n[c]) && (f = new r({
                                tweens: f
                            })), this.add(f, h), "string" != typeof f && "function" != typeof f && ("sequence" === a ? h = f._startTime + f.totalDuration() / f._timeScale : "start" === a && (f._startTime -= f.delay())), h += o;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof n) return this.addLabel(n, s);
                        if ("function" != typeof n) throw "Cannot add " + n + " into the timeline; it is not a tween, timeline, function, or string.";
                        n = i.delayedCall(0, n)
                    }
                    if (e.prototype.add.call(this, n, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (_ = this, p = _.rawTime() > n._startTime; _._timeline;) p && _._timeline.smoothChildTiming ? _.totalTime(_._totalTime, !0) : _._gc && _._enabled(!0, !1), _ = _._timeline;
                    return this
                }, m.remove = function(e) {
                    if (e instanceof t) {
                        this._remove(e, !1);
                        var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                        return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                    }
                    if (e instanceof Array || e && e.push && l(e)) {
                        for (var r = e.length; --r > -1;) this.remove(e[r]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, m._remove = function(t, i) {
                    return e.prototype._remove.call(this, t, i), this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, m.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, m.insert = m.insertMultiple = function(t, e, i, r) {
                    return this.add(t, e || 0, i, r)
                }, m.appendMultiple = function(t, e, i, r) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, r)
                }, m.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, m.addPause = function(t, e, r, n) {
                    var s = i.delayedCall(0, p, r, n || this);
                    return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, this.add(s, t)
                }, m.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, m.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, m._parseTimeOrLabel = function(e, i, r, n) {
                    var s;
                    if (n instanceof t && n.timeline === this) this.remove(n);
                    else if (n && (n instanceof Array || n.push && l(n)))
                        for (s = n.length; --s > -1;) n[s] instanceof t && n[s].timeline === this && this.remove(n[s]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, r && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, r);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (-1 === (s = e.indexOf("="))) return null == this._labels[e] ? r ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(s - 1) + "1", 10) * Number(e.substr(s + 1)), e = s > 1 ? this._parseTimeOrLabel(e.substr(0, s - 1), 0, r) : this.duration()
                    }
                    return Number(e) + i
                }, m.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
                }, m.stop = function() {
                    return this.paused(!0)
                }, m.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, m.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, m.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var r, s, a, o, l, c, f, _ = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        d = this._startTime,
                        m = this._timeScale,
                        g = this._paused;
                    if (t >= _ - 1e-7 && t >= 0) this._totalTime = this._time = _, this._reversed || this._hasPausedChild() || (s = !0, o = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === n) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > n && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n, t = _ + 1e-4;
                    else if (1e-7 > t)
                        if (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== n && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n, 0 === t && s)
                                for (r = this._first; r && 0 === r._startTime;) r._duration || (s = !1), r = r._next;
                            t = 0, this._initted || (l = !0)
                        } else {
                        if (this._hasPause && !this._forcingPlayhead && !e) {
                            if (t >= p)
                                for (r = this._first; r && r._startTime <= t && !c;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (c = r), r = r._next;
                            else
                                for (r = this._last; r && r._startTime >= t && !c;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (c = r), r = r._prev;
                            c && (this._time = t = c._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = t
                    }
                    if (this._time !== p && this._first || i || l || c) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), (f = this._time) >= p)
                            for (r = this._first; r && (a = r._next, f === this._time && (!this._paused || g));)(r._active || r._startTime <= f && !r._paused && !r._gc) && (c === r && this.pause(), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = a;
                        else
                            for (r = this._last; r && (a = r._prev, f === this._time && (!this._paused || g));) {
                                if (r._active || r._startTime <= p && !r._paused && !r._gc) {
                                    if (c === r) {
                                        for (c = r._prev; c && c.endTime() > this._time;) c.render(c._reversed ? c.totalDuration() - (t - c._startTime) * c._timeScale : (t - c._startTime) * c._timeScale, e, i), c = c._prev;
                                        c = null, this.pause()
                                    }
                                    r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)
                                }
                                r = a
                            }
                        this._onUpdate && (e || (h.length && u(), this._callback("onUpdate"))), o && (this._gc || (d === this._startTime || m !== this._timeScale) && (0 === this._time || _ >= this.totalDuration()) && (s && (h.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this._callback(o)))
                    }
                }, m._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof r && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, m.getChildren = function(t, e, r, n) {
                    n = n || -9999999999;
                    for (var s = [], a = this._first, o = 0; a;) a._startTime < n || (a instanceof i ? !1 !== e && (s[o++] = a) : (!1 !== r && (s[o++] = a), !1 !== t && (s = s.concat(a.getChildren(!0, e, r)), o = s.length))), a = a._next;
                    return s
                }, m.getTweensOf = function(t, e) {
                    var r, n, s = this._gc,
                        a = [],
                        o = 0;
                    for (s && this._enabled(!0, !0), n = (r = i.getTweensOf(t)).length; --n > -1;)(r[n].timeline === this || e && this._contains(r[n])) && (a[o++] = r[n]);
                    return s && this._enabled(!1, !0), a
                }, m.recent = function() {
                    return this._recent
                }, m._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, m.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var r, n = this._first, s = this._labels; n;) n._startTime >= i && (n._startTime += t), n = n._next;
                    if (e)
                        for (r in s) s[r] >= i && (s[r] += t);
                    return this._uncache(!0)
                }, m._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), r = i.length, n = !1; --r > -1;) i[r]._kill(t, e) && (n = !0);
                    return n
                }, m.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return !1 !== t && (this._labels = {}), this._uncache(!0)
                }, m.invalidate = function() {
                    for (var e = this._first; e;) e.invalidate(), e = e._next;
                    return t.prototype.invalidate.call(this)
                }, m._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var r = this._first; r;) r._enabled(t, !0), r = r._next;
                    return e.prototype._enabled.call(this, t, i)
                }, m.totalTime = function(e, i, r) {
                    this._forcingPlayhead = !0;
                    var n = t.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, n
                }, m.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, m.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, r = 0, n = this._last, s = 999999999999; n;) e = n._prev, n._dirty && n.totalDuration(), n._startTime > s && this._sortChildren && !n._paused ? this.add(n, n._startTime - n._delay) : s = n._startTime, n._startTime < 0 && !n._paused && (r -= n._startTime, this._timeline.smoothChildTiming && (this._startTime += n._startTime / this._timeScale), this.shiftChildren(-n._startTime, !1, -9999999999), s = 0), (i = n._startTime + n._totalDuration / n._timeScale) > r && (r = i), n = e;
                            this._duration = this._totalDuration = r, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
                }, m.paused = function(e) {
                    if (!e)
                        for (var i = this._first, r = this._time; i;) i._startTime === r && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                    return t.prototype.paused.apply(this, arguments)
                }, m.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, m.rawTime = function(t) {
                    return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
                }, r
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var r = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
                    },
                    n = 1e-10,
                    s = e._internals,
                    a = s.lazyTweens,
                    o = s.lazyRender,
                    l = _gsScope._gsDefine.globals,
                    h = new i(null, null, 1, 0),
                    u = r.prototype = new t;
                return u.constructor = r, u.kill()._gc = !1, r.version = "1.19.1", u.invalidate = function() {
                    return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, u.addCallback = function(t, i, r, n) {
                    return this.add(e.delayedCall(0, t, r, n), i)
                }, u.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), r = i.length, n = this._parseTimeOrLabel(e); --r > -1;) i[r]._startTime === n && i[r]._enabled(!1, !1);
                    return this
                }, u.removePause = function(e) {
                    return this.removeCallback(t._internals.pauseCallback, e)
                }, u.tweenTo = function(t, i) {
                    i = i || {};
                    var r, n, s, a = {
                            ease: h,
                            useFrames: this.usesFrames(),
                            immediateRender: !1
                        },
                        o = i.repeat && l.TweenMax || e;
                    for (n in i) a[n] = i[n];
                    return a.time = this._parseTimeOrLabel(t), r = Math.abs(Number(a.time) - this._time) / this._timeScale || .001, s = new o(this, r, a), a.onStart = function() {
                        s.target.paused(!0), s.vars.time !== s.target.time() && r === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
                    }, s
                }, u.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        callbackScope: this
                    }, i.immediateRender = !1 !== i.immediateRender;
                    var r = this.tweenTo(e, i);
                    return r.duration(Math.abs(r.vars.time - t) / this._timeScale || .001)
                }, u.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var r, s, l, h, u, c, f, _, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        d = this._duration,
                        m = this._time,
                        g = this._totalTime,
                        v = this._startTime,
                        y = this._timeScale,
                        x = this._rawPrevTime,
                        T = this._paused,
                        b = this._cycle;
                    if (t >= p - 1e-7 && t >= 0) this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, h = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || 0 > x || x === n) && x !== t && this._first && (u = !0, x > n && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = d, t = d + 1e-4);
                    else if (1e-7 > t)
                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === d && x !== n && (x > 0 || 0 > t && x >= 0) && !this._locked) && (h = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = s = !0, h = "onReverseComplete") : x >= 0 && this._first && (u = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = d || !e || t || this._rawPrevTime === t ? t : n, 0 === t && s)
                                for (r = this._first; r && 0 === r._startTime;) r._duration || (s = !1), r = r._next;
                            t = 0, this._initted || (u = !0)
                        } else if (0 === d && 0 > x && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (c = d + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && t >= g && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 != (1 & this._cycle) && (this._time = d - this._time), this._time > d ? (this._time = d, t = d + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e && d > t) {
                        if ((t = this._time) >= m || this._repeat && b !== this._cycle)
                            for (r = this._first; r && r._startTime <= t && !f;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (f = r), r = r._next;
                        else
                            for (r = this._last; r && r._startTime >= t && !f;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (f = r), r = r._prev;
                        f && (this._time = t = f._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== b && !this._locked) {
                        var w = this._yoyo && 0 != (1 & b),
                            P = w === (this._yoyo && 0 != (1 & this._cycle)),
                            S = this._totalTime,
                            O = this._cycle,
                            k = this._rawPrevTime,
                            C = this._time;
                        if (this._totalTime = b * d, this._cycle < b ? w = !w : this._totalTime += d, this._time = m, this._rawPrevTime = 0 === d ? x - 1e-4 : x, this._cycle = b, this._locked = !0, m = w ? 0 : d, this.render(m, e, 0 === d), e || this._gc || this.vars.onRepeat && (this._cycle = O, this._locked = !1, this._callback("onRepeat")), m !== this._time) return;
                        if (P && (this._cycle = b, this._locked = !0, m = w ? d + 1e-4 : -1e-4, this.render(m, !0, !1)), this._locked = !1, this._paused && !T) return;
                        this._time = C, this._totalTime = S, this._cycle = O, this._rawPrevTime = k
                    }
                    if (this._time !== m && this._first || i || u || f) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0), 0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), (_ = this._time) >= m)
                            for (r = this._first; r && (l = r._next,
                                    _ === this._time && (!this._paused || T));)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (f === r && this.pause(), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = l;
                        else
                            for (r = this._last; r && (l = r._prev, _ === this._time && (!this._paused || T));) {
                                if (r._active || r._startTime <= m && !r._paused && !r._gc) {
                                    if (f === r) {
                                        for (f = r._prev; f && f.endTime() > this._time;) f.render(f._reversed ? f.totalDuration() - (t - f._startTime) * f._timeScale : (t - f._startTime) * f._timeScale, e, i), f = f._prev;
                                        f = null, this.pause()
                                    }
                                    r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)
                                }
                                r = l
                            }
                        this._onUpdate && (e || (a.length && o(), this._callback("onUpdate"))), h && (this._locked || this._gc || (v === this._startTime || y !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (a.length && o(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this._callback(h)))
                    } else g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
                }, u.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var r, n, s = [],
                        a = this.getChildren(t, e, i),
                        o = 0,
                        l = a.length;
                    for (r = 0; l > r; r++)(n = a[r]).isActive() && (s[o++] = n);
                    return s
                }, u.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        r = i.length;
                    for (e = 0; r > e; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, u.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (e[i].time < t) return e[i].name;
                    return null
                }, u.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, u.invalidate = function() {
                    return this._locked = !1, t.prototype.invalidate.call(this)
                }, u.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }, u.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }, u.totalDuration = function(e) {
                    return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, u.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, u.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, u.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, r
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = [],
                    i = [],
                    r = [],
                    n = {},
                    s = _gsScope._gsDefine.globals,
                    a = function(t, e, i, r) {
                        i === r && (i = r - (r - e) / 1e6), t === e && (e = t + (i - t) / 1e6), this.a = t, this.b = e, this.c = i, this.d = r, this.da = r - t, this.ca = i - t, this.ba = e - t
                    },
                    o = function(t, e, i, r) {
                        var n = {
                                a: t
                            },
                            s = {},
                            a = {},
                            o = {
                                c: r
                            },
                            l = (t + e) / 2,
                            h = (e + i) / 2,
                            u = (i + r) / 2,
                            c = (l + h) / 2,
                            f = (h + u) / 2,
                            _ = (f - c) / 8;
                        return n.b = l + (t - l) / 4, s.b = c + _, n.c = s.a = (n.b + s.b) / 2, s.c = a.a = (c + f) / 2, a.b = f - _, o.b = u + (r - u) / 4, a.c = o.a = (a.b + o.b) / 2, [n, s, a, o]
                    },
                    l = function(t, n, s, a, l) {
                        var h, u, c, f, _, p, d, m, g, v, y, x, T, b = t.length - 1,
                            w = 0,
                            P = t[0].a;
                        for (h = 0; b > h; h++) _ = t[w], u = _.a, c = _.d, f = t[w + 1].d, l ? (y = e[h], x = i[h], T = (x + y) * n * .25 / (a ? .5 : r[h] || .5), p = c - (c - u) * (a ? .5 * n : 0 !== y ? T / y : 0), d = c + (f - c) * (a ? .5 * n : 0 !== x ? T / x : 0), m = c - (p + ((d - p) * (3 * y / (y + x) + .5) / 4 || 0))) : (p = c - (c - u) * n * .5, d = c + (f - c) * n * .5, m = c - (p + d) / 2), p += m, d += m, _.c = g = p, _.b = 0 !== h ? P : P = _.a + .6 * (_.c - _.a), _.da = c - u, _.ca = g - u, _.ba = P - u, s ? (v = o(u, P, g, c), t.splice(w, 1, v[0], v[1], v[2], v[3]), w += 4) : w++, P = d;
                        (_ = t[w]).b = P, _.c = P + .4 * (_.d - P), _.da = _.d - _.a, _.ca = _.c - _.a, _.ba = P - _.a, s && (v = o(_.a, P, _.c, _.d), t.splice(w, 1, v[0], v[1], v[2], v[3]))
                    },
                    h = function(t, r, n, s) {
                        var o, l, h, u, c, f, _ = [];
                        if (s)
                            for (t = [s].concat(t), l = t.length; --l > -1;) "string" == typeof(f = t[l][r]) && "=" === f.charAt(1) && (t[l][r] = s[r] + Number(f.charAt(0) + f.substr(2)));
                        if (0 > (o = t.length - 2)) return _[0] = new a(t[0][r], 0, 0, t[-1 > o ? 0 : 1][r]), _;
                        for (l = 0; o > l; l++) h = t[l][r], u = t[l + 1][r], _[l] = new a(h, 0, 0, u), n && (c = t[l + 2][r], e[l] = (e[l] || 0) + (u - h) * (u - h), i[l] = (i[l] || 0) + (c - u) * (c - u));
                        return _[l] = new a(t[l][r], 0, 0, t[l + 1][r]), _
                    },
                    u = function(t, s, a, o, u, c) {
                        var f, _, p, d, m, g, v, y, x = {},
                            T = [],
                            b = c || t[0];
                        u = "string" == typeof u ? "," + u + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == s && (s = 1);
                        for (_ in t[0]) T.push(_);
                        if (t.length > 1) {
                            for (y = t[t.length - 1], v = !0, f = T.length; --f > -1;)
                                if (_ = T[f], Math.abs(b[_] - y[_]) > .05) {
                                    v = !1;
                                    break
                                }
                            v && (t = t.concat(), c && t.unshift(c), t.push(t[1]), c = t[t.length - 3])
                        }
                        for (e.length = i.length = r.length = 0, f = T.length; --f > -1;) _ = T[f], n[_] = -1 !== u.indexOf("," + _ + ","), x[_] = h(t, _, n[_], c);
                        for (f = e.length; --f > -1;) e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
                        if (!o) {
                            for (f = T.length; --f > -1;)
                                if (n[_])
                                    for (p = x[T[f]], g = p.length - 1, d = 0; g > d; d++) m = p[d + 1].da / i[d] + p[d].da / e[d] || 0, r[d] = (r[d] || 0) + m * m;
                            for (f = r.length; --f > -1;) r[f] = Math.sqrt(r[f])
                        }
                        for (f = T.length, d = a ? 4 : 1; --f > -1;) _ = T[f], p = x[_], l(p, s, a, o, n[_]), v && (p.splice(0, d), p.splice(p.length - d, d));
                        return x
                    },
                    c = function(t, e, i) {
                        var r, n, s, o, l, h, u, c, f, _, p, d = {},
                            m = "cubic" === (e = e || "soft") ? 3 : 2,
                            g = "soft" === e,
                            v = [];
                        if (g && i && (t = [i].concat(t)), null == t || t.length < m + 1) throw "invalid Bezier data";
                        for (f in t[0]) v.push(f);
                        for (h = v.length; --h > -1;) {
                            for (d[f = v[h]] = l = [], _ = 0, c = t.length, u = 0; c > u; u++) r = null == i ? t[u][f] : "string" == typeof(p = t[u][f]) && "=" === p.charAt(1) ? i[f] + Number(p.charAt(0) + p.substr(2)) : Number(p), g && u > 1 && c - 1 > u && (l[_++] = (r + l[_ - 2]) / 2), l[_++] = r;
                            for (c = _ - m + 1, _ = 0, u = 0; c > u; u += m) r = l[u], n = l[u + 1], s = l[u + 2], o = 2 === m ? 0 : l[u + 3], l[_++] = p = 3 === m ? new a(r, n, s, o) : new a(r, (2 * n + r) / 3, (2 * n + s) / 3, s);
                            l.length = _
                        }
                        return d
                    },
                    f = function(t, e, i) {
                        for (var r, n, s, a, o, l, h, u, c, f, _, p = 1 / i, d = t.length; --d > -1;)
                            for (f = t[d], s = f.a, a = f.d - s, o = f.c - s, l = f.b - s, r = n = 0, u = 1; i >= u; u++) h = p * u, c = 1 - h, r = n - (n = (h * h * a + 3 * c * (h * o + c * l)) * h), _ = d * i + u - 1, e[_] = (e[_] || 0) + r * r
                    },
                    _ = function(t, e) {
                        var i, r, n, s, a = [],
                            o = [],
                            l = 0,
                            h = 0,
                            u = (e = e >> 0 || 6) - 1,
                            c = [],
                            _ = [];
                        for (i in t) f(t[i], a, e);
                        for (n = a.length, r = 0; n > r; r++) l += Math.sqrt(a[r]), s = r % e, _[s] = l, s === u && (h += l, s = r / e >> 0, c[s] = _, o[s] = h, l = 0, _ = []);
                        return {
                            length: h,
                            lengths: o,
                            segments: c
                        }
                    },
                    p = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.7",
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var r, n, s, a, o, l = e.values || [],
                                h = {},
                                f = l[0],
                                p = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = p ? p instanceof Array ? p : [
                                ["x", "y", "rotation", !0 === p ? 0 : Number(p) || 0]
                            ] : null;
                            for (r in f) this._props.push(r);
                            for (s = this._props.length; --s > -1;) r = this._props[s], this._overwriteProps.push(r), n = this._func[r] = "function" == typeof t[r], h[r] = n ? t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(t[r]), o || h[r] !== l[0][r] && (o = h);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : c(l, e.type, h), this._segCount = this._beziers[r].length, this._timeRes) {
                                var d = _(this._beziers, this._timeRes);
                                this._length = d.length, this._lengths = d.lengths, this._segments = d.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (p = this._autoRotate)
                                for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1;) {
                                    for (a = 0; 3 > a; a++) r = p[s][a], this._func[r] = "function" == typeof t[r] && t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)];
                                    r = p[s][2], this._initialRotations[s] = (this._func[r] ? this._func[r].call(this._target) : this._target[r]) || 0, this._overwriteProps.push(r)
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(e) {
                            var i, r, n, s, a, o, l, h, u, c, f = this._segCount,
                                _ = this._func,
                                p = this._target,
                                d = e !== this._startRatio;
                            if (this._timeRes) {
                                if (u = this._lengths, c = this._curSeg, e *= this._length, n = this._li, e > this._l2 && f - 1 > n) {
                                    for (h = f - 1; h > n && (this._l2 = u[++n]) <= e;);
                                    this._l1 = u[n - 1], this._li = n, this._curSeg = c = this._segments[n], this._s2 = c[this._s1 = this._si = 0]
                                } else if (e < this._l1 && n > 0) {
                                    for (; n > 0 && (this._l1 = u[--n]) >= e;);
                                    0 === n && e < this._l1 ? this._l1 = 0 : n++, this._l2 = u[n], this._li = n, this._curSeg = c = this._segments[n], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                                }
                                if (i = n, e -= this._l1, n = this._si, e > this._s2 && n < c.length - 1) {
                                    for (h = c.length - 1; h > n && (this._s2 = c[++n]) <= e;);
                                    this._s1 = c[n - 1], this._si = n
                                } else if (e < this._s1 && n > 0) {
                                    for (; n > 0 && (this._s1 = c[--n]) >= e;);
                                    0 === n && e < this._s1 ? this._s1 = 0 : n++, this._s2 = c[n], this._si = n
                                }
                                o = (n + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                            } else i = 0 > e ? 0 : e >= 1 ? f - 1 : f * e >> 0, o = (e - i * (1 / f)) * f;
                            for (r = 1 - o, n = this._props.length; --n > -1;) s = this._props[n], a = this._beziers[s][i], l = (o * o * a.da + 3 * r * (o * a.ca + r * a.ba)) * o + a.a, this._mod[s] && (l = this._mod[s](l, p)), _[s] ? p[s](l) : p[s] = l;
                            if (this._autoRotate) {
                                var m, g, v, y, x, T, b, w = this._autoRotate;
                                for (n = w.length; --n > -1;) s = w[n][2], T = w[n][3] || 0, b = !0 === w[n][4] ? 1 : t, a = this._beziers[w[n][0]], m = this._beziers[w[n][1]], a && m && (a = a[i], m = m[i], g = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, g += (y - g) * o, y += (a.c + (a.d - a.c) * o - y) * o, v = m.a + (m.b - m.a) * o, x = m.b + (m.c - m.b) * o, v += (x - v) * o, x += (m.c + (m.d - m.c) * o - x) * o, l = d ? Math.atan2(x - v, y - g) * b + T : this._initialRotations[n], this._mod[s] && (l = this._mod[s](l, p)), _[s] ? p[s](l) : p[s] = l)
                            }
                        }
                    }),
                    d = p.prototype;
                p.bezierThrough = u, p.cubicToQuadratic = o, p._autoCSS = !0, p.quadraticToCubic = function(t, e, i) {
                    return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, p._cssRegister = function() {
                    var t = s.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            r = e._setPluginRatio,
                            n = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, s, a, o, l) {
                                e instanceof Array && (e = {
                                    values: e
                                }), l = new p;
                                var h, u, c, f = e.values,
                                    _ = f.length - 1,
                                    d = [],
                                    m = {};
                                if (0 > _) return o;
                                for (h = 0; _ >= h; h++) c = i(t, f[h], a, o, l, _ !== h), d[h] = c.end;
                                for (u in e) m[u] = e[u];
                                return m.values = d, o = new n(t, "bezier", 0, 0, c.pt, 2), o.data = c, o.plugin = l, o.setRatio = r, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (h = !0 === m.autoRotate ? 0 : Number(m.autoRotate), m.autoRotate = null != c.end.left ? [
                                    ["left", "top", "rotation", h, !1]
                                ] : null != c.end.x && [
                                    ["x", "y", "rotation", h, !1]
                                ]), m.autoRotate && (a._transform || a._enableTransforms(!1), c.autoRotate = a._target._gsTransform, c.proxy.rotation = c.autoRotate.rotation || 0, a._overwriteProps.push("rotation")), l._onInitTween(c.proxy, m, a._tween), o
                            }
                        })
                    }
                }, d._mod = function(t) {
                    for (var e, i = this._overwriteProps, r = i.length; --r > -1;)(e = t[i[r]]) && "function" == typeof e && (this._mod[i[r]] = e)
                }, d._kill = function(t) {
                    var e, i, r = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = r.length; --i > -1;) r[i] === e && r.splice(i, 1);
                    if (r = this._autoRotate)
                        for (i = r.length; --i > -1;) t[r[i][2]] && r.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, r, n, s, a = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                    },
                    o = _gsScope._gsDefine.globals,
                    l = {},
                    h = a.prototype = new t("css");
                h.constructor = a, a.version = "1.19.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", a.defaultSmoothOrigin = !0, h = "px", a.suffixMap = {
                    top: h,
                    right: h,
                    bottom: h,
                    left: h,
                    width: h,
                    height: h,
                    fontSize: h,
                    padding: h,
                    margin: h,
                    perspective: h,
                    lineHeight: ""
                };
                var u, c, f, _, p, d, m, g, v = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                    y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    x = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    T = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    b = /(?:\d|\-|\+|=|#|\.)*/g,
                    w = /opacity *=*([^)]*)/i,
                    P = /opacity:([^;]*)/i,
                    S = /alpha\(opacity *=.+?\)/i,
                    O = /^(rgb|hsl)/,
                    k = /([A-Z])/g,
                    C = /-([a-z])/gi,
                    A = /(^(?:url\("|url\())|(?:("\))$|\)$)/gi,
                    R = function(t, e) {
                        return e.toUpperCase()
                    },
                    M = /(?:Left|Right|Width)/i,
                    D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    L = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    E = /,(?=[^\)]*(?:\(|$))/gi,
                    F = /[\s,\(]/i,
                    I = Math.PI / 180,
                    N = 180 / Math.PI,
                    z = {},
                    j = {
                        style: {}
                    },
                    X = _gsScope.document || {
                        createElement: function() {
                            return j
                        }
                    },
                    B = function(t, e) {
                        return X.createElementNS ? X.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : X.createElement(t)
                    },
                    Y = B("div"),
                    q = B("img"),
                    U = a._internals = {
                        _specialProps: l
                    },
                    V = (_gsScope.navigator || {}).userAgent || "",
                    H = function() {
                        var t = V.indexOf("Android"),
                            e = B("a");
                        return f = -1 !== V.indexOf("Safari") && -1 === V.indexOf("Chrome") && (-1 === t || parseFloat(V.substr(t + 8, 2)) > 3), p = f && parseFloat(V.substr(V.indexOf("Version/") + 8, 2)) < 6, _ = -1 !== V.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(V) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(V)) && (d = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
                    }(),
                    W = function(t) {
                        return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    G = function(t) {
                        _gsScope.console && console.log(t)
                    },
                    Z = "",
                    Q = "",
                    $ = function(t, e) {
                        var i, r, n = (e = e || Y).style;
                        if (void 0 !== n[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === n[i[r] + t];);
                        return r >= 0 ? (Q = 3 === r ? "ms" : i[r], Z = "-" + Q.toLowerCase() + "-", Q + t) : null
                    },
                    J = X.defaultView ? X.defaultView.getComputedStyle : function() {},
                    K = a.getStyle = function(t, e, i, r, n) {
                        var s;
                        return H || "opacity" !== e ? (!r && t.style[e] ? s = t.style[e] : (i = i || J(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(k, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == n || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : n) : W(t)
                    },
                    tt = U.convertToPixels = function(t, i, r, n, s) {
                        if ("px" === n || !n) return r;
                        if ("auto" === n || !r) return 0;
                        var o, l, h, u = M.test(i),
                            c = t,
                            f = Y.style,
                            _ = 0 > r,
                            p = 1 === r;
                        if (_ && (r = -r), p && (r *= 100), "%" === n && -1 !== i.indexOf("border")) o = r / 100 * (u ? t.clientWidth : t.clientHeight);
                        else {
                            if (f.cssText = "border:0 solid red;position:" + K(t, "position") + ";line-height:0;", "%" !== n && c.appendChild && "v" !== n.charAt(0) && "rem" !== n) f[u ? "borderLeftWidth" : "borderTopWidth"] = r + n;
                            else {
                                if (c = t.parentNode || X.body, l = c._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * r / 100;
                                f[u ? "width" : "height"] = r + n
                            }
                            c.appendChild(Y), o = parseFloat(Y[u ? "offsetWidth" : "offsetHeight"]), c.removeChild(Y), u && "%" === n && !1 !== a.cacheWidths && (l = c._gsCache = c._gsCache || {}, l.time = h, l.width = o / r * 100), 0 !== o || s || (o = tt(t, i, r, n, !0))
                        }
                        return p && (o /= 100), _ ? -o : o
                    },
                    et = U.calculateOffset = function(t, e, i) {
                        if ("absolute" !== K(t, "position", i)) return 0;
                        var r = "left" === e ? "Left" : "Top",
                            n = K(t, "margin" + r, i);
                        return t["offset" + r] - (tt(t, e, parseFloat(n), n.replace(b, "")) || 0)
                    },
                    it = function(t, e) {
                        var i, r, n, s = {};
                        if (e = e || J(t, null))
                            if (i = e.length)
                                for (; --i > -1;)(-1 === (n = e[i]).indexOf("-transform") || At === n) && (s[n.replace(C, R)] = e.getPropertyValue(n));
                            else
                                for (i in e)(-1 === i.indexOf("Transform") || Ct === i) && (s[i] = e[i]);
                        else if (e = t.currentStyle || t.style)
                            for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(C, R)] = e[i]);
                        return H || (s.opacity = W(t)), r = qt(t, e, !1), s.rotation = r.rotation, s.skewX = r.skewX, s.scaleX = r.scaleX, s.scaleY = r.scaleY, s.x = r.x, s.y = r.y, Mt && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ), s.filters && delete s.filters, s
                    },
                    rt = function(t, e, i, r, n) {
                        var s, a, o, l = {},
                            h = t.style;
                        for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (s = i[a]) || n && n[a]) && -1 === a.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[a] = "auto" !== s || "left" !== a && "top" !== a ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[a] || "" === e[a].replace(T, "") ? s : 0 : et(t, a), void 0 !== h[a] && (o = new vt(h, a, h[a], o)));
                        if (r)
                            for (a in r) "className" !== a && (l[a] = r[a]);
                        return {
                            difs: l,
                            firstMPT: o
                        }
                    },
                    nt = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    st = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    at = function(t, e, i) {
                        if ("svg" === (t.nodeName + "").toLowerCase()) return (i || J(t))[e] || 0;
                        if (t.getCTM && Xt(t)) return t.getBBox()[e] || 0;
                        var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            n = nt[e],
                            s = n.length;
                        for (i = i || J(t, null); --s > -1;) r -= parseFloat(K(t, "padding" + n[s], i, !0)) || 0, r -= parseFloat(K(t, "border" + n[s] + "Width", i, !0)) || 0;
                        return r
                    },
                    ot = function(t, e) {
                        if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                        (null == t || "" === t) && (t = "0 0");
                        var i, r = t.split(" "),
                            n = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : r[0],
                            s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : r[1];
                        if (r.length > 3 && !e) {
                            for (r = t.split(", ").join(",").split(","), t = [], i = 0; i < r.length; i++) t.push(ot(r[i]));
                            return t.join(",")
                        }
                        return null == s ? s = "center" === n ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), t = n + " " + s + (r.length > 2 ? " " + r[2] : ""), e && (e.oxp = -1 !== n.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === n.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(n.replace(T, "")), e.oy = parseFloat(s.replace(T, "")), e.v = t), e || t
                    },
                    lt = function(t, e) {
                        return "function" == typeof t && (t = t(g, m)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
                    },
                    ht = function(t, e) {
                        return "function" == typeof t && (t = t(g, m)), null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
                    },
                    ut = function(t, e, i, r) {
                        var n, s, a, o, l;
                        return "function" == typeof t && (t = t(g, m)), null == t ? o = e : "number" == typeof t ? o = t : (n = 360, s = t.split("_"), l = "=" === t.charAt(1), a = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : N) - (l ? 0 : e), s.length && (r && (r[i] = e + a), -1 !== t.indexOf("short") && (a %= n) != a % (n / 2) && (a = 0 > a ? a + n : a - n), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * n) % n - (a / n | 0) * n : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * n) % n - (a / n | 0) * n)), o = e + a), 1e-6 > o && o > -1e-6 && (o = 0), o
                    },
                    ct = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    ft = function(t, e, i) {
                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                    },
                    _t = a.parseColor = function(t, e) {
                        var i, r, n, s, a, o, l, h, u, c, f;
                        if (t)
                            if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];
                            else {
                                if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ct[t]) i = ct[t];
                                else if ("#" === t.charAt(0)) 4 === t.length && (r = t.charAt(1), n = t.charAt(2), s = t.charAt(3), t = "#" + r + r + n + n + s + s), t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & 255, 255 & t];
                                else if ("hsl" === t.substr(0, 3))
                                    if (i = f = t.match(v), e) {
                                        if (-1 !== t.indexOf("=")) return t.match(y)
                                    } else a = Number(i[0]) % 360 / 360, o = Number(i[1]) / 100, l = Number(i[2]) / 100, n = .5 >= l ? l * (o + 1) : l + o - l * o, r = 2 * l - n, i.length > 3 && (i[3] = Number(t[3])), i[0] = ft(a + 1 / 3, r, n), i[1] = ft(a, r, n), i[2] = ft(a - 1 / 3, r, n);
                                else i = t.match(v) || ct.transparent;
                                i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                            } else i = ct.black;
                        return e && !f && (r = i[0] / 255, n = i[1] / 255, s = i[2] / 255, h = Math.max(r, n, s), u = Math.min(r, n, s), l = (h + u) / 2, h === u ? a = o = 0 : (c = h - u, o = l > .5 ? c / (2 - h - u) : c / (h + u), a = h === r ? (n - s) / c + (s > n ? 6 : 0) : h === n ? (s - r) / c + 2 : (r - n) / c + 4, a *= 60), i[0] = a + .5 | 0, i[1] = 100 * o + .5 | 0, i[2] = 100 * l + .5 | 0), i
                    },
                    pt = function(t, e) {
                        var i, r, n, s = t.match(dt) || [],
                            a = 0,
                            o = s.length ? "" : t;
                        for (i = 0; i < s.length; i++) r = s[i], n = t.substr(a, t.indexOf(r, a) - a), a += n.length + r.length, 3 === (r = _t(r, e)).length && r.push(1), o += n + (e ? "hsla(" + r[0] + "," + r[1] + "%," + r[2] + "%," + r[3] : "rgba(" + r.join(",")) + ")";
                        return o + t.substr(a)
                    },
                    dt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (h in ct) dt += "|" + h + "\\b";
                dt = new RegExp(dt + ")", "gi"), a.colorStringFilter = function(t) {
                    var e, i = t[0] + t[1];
                    dt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = pt(t[0], e), t[1] = pt(t[1], e)), dt.lastIndex = 0
                }, e.defaultStringFilter || (e.defaultStringFilter = a.colorStringFilter);
                var mt = function(t, e, i, r) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var n, s = e ? (t.match(dt) || [""])[0] : "",
                            a = t.split(s).join("").match(x) || [],
                            o = t.substr(0, t.indexOf(a[0])),
                            l = ")" === t.charAt(t.length - 1) ? ")" : "",
                            h = -1 !== t.indexOf(" ") ? " " : ",",
                            u = a.length,
                            c = u > 0 ? a[0].replace(v, "") : "";
                        return u ? n = e ? function(t) {
                            var e, f, _, p;
                            if ("number" == typeof t) t += c;
                            else if (r && E.test(t)) {
                                for (p = t.replace(E, "|").split("|"), _ = 0; _ < p.length; _++) p[_] = n(p[_]);
                                return p.join(",")
                            }
                            if (e = (t.match(dt) || [s])[0], f = t.split(e).join("").match(x) || [], _ = f.length, u > _--)
                                for (; ++_ < u;) f[_] = i ? f[(_ - 1) / 2 | 0] : a[_];
                            return o + f.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                        } : function(t) {
                            var e, s, f;
                            if ("number" == typeof t) t += c;
                            else if (r && E.test(t)) {
                                for (s = t.replace(E, "|").split("|"), f = 0; f < s.length; f++) s[f] = n(s[f]);
                                return s.join(",")
                            }
                            if (e = t.match(x) || [], f = e.length, u > f--)
                                for (; ++f < u;) e[f] = i ? e[(f - 1) / 2 | 0] : a[f];
                            return o + e.join(h) + l
                        } : function(t) {
                            return t
                        }
                    },
                    gt = function(t) {
                        return t = t.split(","),
                            function(e, i, r, n, s, a, o) {
                                var l, h = (i + "").split(" ");
                                for (o = {}, l = 0; 4 > l; l++) o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                                return n.parse(e, o, s, a)
                            }
                    },
                    vt = (U._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, r, n, s, a = this.data, o = a.proxy, l = a.firstMPT; l;) e = o[l.v], l.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), l.t[l.p] = e, l = l._next;
                        if (a.autoRotate && (a.autoRotate.rotation = a.mod ? a.mod(o.rotation, this.t) : o.rotation), 1 === t || 0 === t)
                            for (l = a.firstMPT, s = 1 === t ? "e" : "b"; l;) {
                                if ((i = l.t).type) {
                                    if (1 === i.type) {
                                        for (n = i.xs0 + i.s + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                                        i[s] = n
                                    }
                                } else i[s] = i.s + i.xs0;
                                l = l._next
                            }
                    }, function(t, e, i, r, n) {
                        this.t = t, this.p = e, this.v = i, this.r = n, r && (r._prev = this, this._next = r)
                    }),
                    yt = (U._parseToProxy = function(t, e, i, r, n, s) {
                        var a, o, l, h, u, c = r,
                            f = {},
                            _ = {},
                            p = i._transform,
                            d = z;
                        for (i._transform = null, z = e, r = u = i.parse(t, e, r, n), z = d, s && (i._transform = p, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
                            if (r.type <= 1 && (o = r.p, _[o] = r.s + r.c, f[o] = r.s, s || (h = new vt(r, "s", o, h, r.r), r.c = 0), 1 === r.type))
                                for (a = r.l; --a > 0;) l = "xn" + a, o = r.p + "_" + l, _[o] = r.data[l], f[o] = r[l], s || (h = new vt(r, l, o, h, r.rxp[l]));
                            r = r._next
                        }
                        return {
                            proxy: f,
                            end: _,
                            firstMPT: h,
                            pt: u
                        }
                    }, U.CSSPropTween = function(t, e, r, n, a, o, l, h, u, c, f) {
                        this.t = t, this.p = e, this.s = r, this.c = n, this.n = l || e, t instanceof yt || s.push(this.n), this.r = h, this.type = o || 0, u && (this.pr = u, i = !0), this.b = void 0 === c ? r : c, this.e = void 0 === f ? r + n : f, a && (this._next = a, a._prev = this)
                    }),
                    xt = function(t, e, i, r, n, s) {
                        var a = new yt(t, e, i, r - i, n, -1, s);
                        return a.b = i, a.e = a.xs0 = r, a
                    },
                    Tt = a.parseComplex = function(t, e, i, r, n, s, o, l, h, c) {
                        i = i || s || "", "function" == typeof r && (r = r(g, m)), o = new yt(t, e, 0, 0, o, c ? 2 : 1, null, !1, l, i, r), r += "", n && dt.test(r + i) && (r = [i, r], a.colorStringFilter(r), i = r[0], r = r[1]);
                        var f, _, p, d, x, T, b, w, P, S, O, k, C, A = i.split(", ").join(",").split(" "),
                            R = r.split(", ").join(",").split(" "),
                            M = A.length,
                            D = !1 !== u;
                        for ((-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) && (A = A.join(" ").replace(E, ", ").split(" "), R = R.join(" ").replace(E, ", ").split(" "), M = A.length), M !== R.length && (A = (s || "").split(" "), M = A.length), o.plugin = h, o.setRatio = c, dt.lastIndex = 0, f = 0; M > f; f++)
                            if (d = A[f], x = R[f], (w = parseFloat(d)) || 0 === w) o.appendXtra("", w, lt(x, w), x.replace(y, ""), D && -1 !== x.indexOf("px"), !0);
                            else if (n && dt.test(d)) k = x.indexOf(")") + 1, k = ")" + (k ? x.substr(k) : ""), C = -1 !== x.indexOf("hsl") && H, d = _t(d, C), x = _t(x, C), P = d.length + x.length > 6, P && !H && 0 === x[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(R[f]).join("transparent")) : (H || (P = !1), C ? o.appendXtra(P ? "hsla(" : "hsl(", d[0], lt(x[0], d[0]), ",", !1, !0).appendXtra("", d[1], lt(x[1], d[1]), "%,", !1).appendXtra("", d[2], lt(x[2], d[2]), P ? "%," : "%" + k, !1) : o.appendXtra(P ? "rgba(" : "rgb(", d[0], x[0] - d[0], ",", !0, !0).appendXtra("", d[1], x[1] - d[1], ",", !0).appendXtra("", d[2], x[2] - d[2], P ? "," : k, !0), P && (d = d.length < 4 ? 1 : d[3], o.appendXtra("", d, (x.length < 4 ? 1 : x[3]) - d, k, !1))), dt.lastIndex = 0;
                        else if (T = d.match(v)) {
                            if (!(b = x.match(y)) || b.length !== T.length) return o;
                            for (p = 0, _ = 0; _ < T.length; _++) O = T[_], S = d.indexOf(O, p), o.appendXtra(d.substr(p, S - p), Number(O), lt(b[_], O), "", D && "px" === d.substr(S + O.length, 2), 0 === _), p = S + O.length;
                            o["xs" + o.l] += d.substr(p)
                        } else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + x : x;
                        if (-1 !== r.indexOf("=") && o.data) {
                            for (k = o.xs0 + o.data.s, f = 1; f < o.l; f++) k += o["xs" + f] + o.data["xn" + f];
                            o.e = k + o["xs" + f]
                        }
                        return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
                    },
                    bt = 9;
                for ((h = yt.prototype).l = h.pr = 0; --bt > 0;) h["xn" + bt] = 0, h["xs" + bt] = "";
                h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, r, n, s) {
                    var a = this,
                        o = a.l;
                    return a["xs" + o] += s && (o || a["xs" + o]) ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = r || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = n, a["xn" + o] = e, a.plugin || (a.xfirst = new yt(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, n, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                        s: e + i
                    }, a.rxp = {}, a.s = e, a.c = i, a.r = n, a)) : (a["xs" + o] += e + (r || ""), a)
                };
                var wt = function(t, e) {
                        e = e || {}, this.p = e.prefix ? $(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || mt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    Pt = U._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var r, n = t.split(","),
                            s = e.defaultValue;
                        for (i = i || [s], r = 0; r < n.length; r++) e.prefix = 0 === r && e.prefix, e.defaultValue = i[r] || s, new wt(n[r], e)
                    },
                    St = U._registerPluginProp = function(t) {
                        if (!l[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            Pt(t, {
                                parser: function(t, i, r, n, s, a, h) {
                                    var u = o.com.greensock.plugins[e];
                                    return u ? (u._cssRegister(), l[r].parse(t, i, r, n, s, a, h)) : (G("Error: " + e + " js file not loaded."), s)
                                }
                            })
                        }
                    };
                (h = wt.prototype).parseComplex = function(t, e, i, r, n, s) {
                    var a, o, l, h, u, c, f = this.keyword;
                    if (this.multi && (E.test(i) || E.test(e) ? (o = e.replace(E, "|").split("|"), l = i.replace(E, "|").split("|")) : f && (o = [e], l = [i])), l) {
                        for (h = l.length > o.length ? l.length : o.length, a = 0; h > a; a++) e = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, f && (u = e.indexOf(f), c = i.indexOf(f), u !== c && (-1 === c ? o[a] = o[a].split(f).join("") : -1 === u && (o[a] += " " + f)));
                        e = o.join(", "), i = l.join(", ")
                    }
                    return Tt(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, n, s)
                }, h.parse = function(t, e, i, r, s, a, o) {
                    return this.parseComplex(t.style, this.format(K(t, this.p, n, !1, this.dflt)), this.format(e), s, a)
                }, a.registerSpecialProp = function(t, e, i) {
                    Pt(t, {
                        parser: function(t, r, n, s, a, o, l) {
                            var h = new yt(t, n, 0, 0, a, 2, n, !1, i);
                            return h.plugin = o, h.setRatio = e(t, r, s._tween, n), h
                        },
                        priority: i
                    })
                }, a.useSVGTransformAttr = !0;
                var Ot, kt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    Ct = $("transform"),
                    At = Z + "transform",
                    Rt = $("transformOrigin"),
                    Mt = null !== $("perspective"),
                    Dt = U.Transform = function() {
                        this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = !(!1 === a.defaultForce3D || !Mt) && (a.defaultForce3D || "auto")
                    },
                    Lt = _gsScope.SVGElement,
                    Et = function(t, e, i) {
                        var r, n = X.createElementNS("http://www.w3.org/2000/svg", t),
                            s = /([a-z])([A-Z])/g;
                        for (r in i) n.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), i[r]);
                        return e.appendChild(n), n
                    },
                    Ft = X.documentElement || {},
                    It = function() {
                        var t, e, i, r = d || /Android/i.test(V) && !_gsScope.chrome;
                        return X.createElementNS && !r && (t = Et("svg", Ft), e = Et("rect", t, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), i = e.getBoundingClientRect().width, e.style[Rt] = "50% 50%", e.style[Ct] = "scaleX(0.5)", r = i === e.getBoundingClientRect().width && !(_ && Mt), Ft.removeChild(t)), r
                    }(),
                    Nt = function(t, e, i, r, n, s) {
                        var o, l, h, u, c, f, _, p, d, m, g, v, y, x, T = t._gsTransform,
                            b = Yt(t, !0);
                        T && (y = T.xOrigin, x = T.yOrigin), (!r || (o = r.split(" ")).length < 2) && (0 === (_ = t.getBBox()).x && 0 === _.y && _.width + _.height === 0 && (_ = {
                            x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                            y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                            width: 0,
                            height: 0
                        }), e = ot(e).split(" "), o = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * _.width : parseFloat(e[0])) + _.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * _.height : parseFloat(e[1])) + _.y]), i.xOrigin = u = parseFloat(o[0]), i.yOrigin = c = parseFloat(o[1]), r && b !== Bt && (f = b[0], _ = b[1], p = b[2], d = b[3], m = b[4], g = b[5], (v = f * d - _ * p) && (l = u * (d / v) + c * (-p / v) + (p * g - d * m) / v, h = u * (-_ / v) + c * (f / v) - (f * g - _ * m) / v, u = i.xOrigin = o[0] = l, c = i.yOrigin = o[1] = h)), T && (s && (i.xOffset = T.xOffset, i.yOffset = T.yOffset, T = i), n || !1 !== n && !1 !== a.defaultSmoothOrigin ? (l = u - y, h = c - x, T.xOffset += l * b[0] + h * b[2] - l, T.yOffset += l * b[1] + h * b[3] - h) : T.xOffset = T.yOffset = 0), s || t.setAttribute("data-svg-origin", o.join(" "))
                    },
                    zt = function(t) {
                        var e, i = B("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                            r = this.parentNode,
                            n = this.nextSibling,
                            s = this.style.cssText;
                        if (Ft.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
                            e = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = zt
                        } catch (t) {} else this._originalGetBBox && (e = this._originalGetBBox());
                        return n ? r.insertBefore(this, n) : r.appendChild(this), Ft.removeChild(i), this.style.cssText = s, e
                    },
                    jt = function(t) {
                        try {
                            return t.getBBox()
                        } catch (e) {
                            return zt.call(t, !0)
                        }
                    },
                    Xt = function(t) {
                        return !(!(Lt && t.getCTM && jt(t)) || t.parentNode && !t.ownerSVGElement)
                    },
                    Bt = [1, 0, 0, 1, 0, 0],
                    Yt = function(t, e) {
                        var i, r, n, s, a, o, l = t._gsTransform || new Dt,
                            h = t.style;
                        if (Ct ? r = K(t, At, null, !0) : t.currentStyle && (r = t.currentStyle.filter.match(D), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), (i = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r) && Ct && ((o = "none" === J(t).display) || !t.parentNode) && (o && (s = h.display, h.display = "block"), t.parentNode || (a = 1, Ft.appendChild(t)), r = K(t, At, null, !0), i = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, s ? h.display = s : o && Wt(h, "display"), a && Ft.removeChild(t)), (l.svg || t.getCTM && Xt(t)) && (i && -1 !== (h[Ct] + "").indexOf("matrix") && (r = h[Ct], i = 0), n = t.getAttribute("transform"), i && n && (-1 !== n.indexOf("matrix") ? (r = n, i = 0) : -1 !== n.indexOf("translate") && (r = "matrix(1,0,0,1," + n.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Bt;
                        for (n = (r || "").match(v) || [], bt = n.length; --bt > -1;) s = Number(n[bt]), n[bt] = (a = s - (s |= 0)) ? (1e5 * a + (0 > a ? -.5 : .5) | 0) / 1e5 + s : s;
                        return e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n
                    },
                    qt = U.getTransform = function(t, i, r, n) {
                        if (t._gsTransform && r && !n) return t._gsTransform;
                        var s, o, l, h, u, c, f = r ? t._gsTransform || new Dt : new Dt,
                            _ = f.scaleX < 0,
                            p = 1e5,
                            d = Mt ? parseFloat(K(t, Rt, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0,
                            m = parseFloat(a.defaultTransformPerspective) || 0;
                        if (f.svg = !(!t.getCTM || !Xt(t)), f.svg && (Nt(t, K(t, Rt, i, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), Ot = a.useSVGTransformAttr || It), (s = Yt(t)) !== Bt) {
                            if (16 === s.length) {
                                var g, v, y, x, T, b = s[0],
                                    w = s[1],
                                    P = s[2],
                                    S = s[3],
                                    O = s[4],
                                    k = s[5],
                                    C = s[6],
                                    A = s[7],
                                    R = s[8],
                                    M = s[9],
                                    D = s[10],
                                    L = s[12],
                                    E = s[13],
                                    F = s[14],
                                    I = s[11],
                                    z = Math.atan2(C, D);
                                f.zOrigin && (F = -f.zOrigin, L = R * F - s[12], E = M * F - s[13], F = D * F + f.zOrigin - s[14]), f.rotationX = z * N, z && (x = Math.cos(-z), T = Math.sin(-z), g = O * x + R * T, v = k * x + M * T, y = C * x + D * T, R = O * -T + R * x, M = k * -T + M * x, D = C * -T + D * x, I = A * -T + I * x, O = g, k = v, C = y), z = Math.atan2(-P, D), f.rotationY = z * N, z && (x = Math.cos(-z), T = Math.sin(-z), g = b * x - R * T, v = w * x - M * T, y = P * x - D * T, M = w * T + M * x, D = P * T + D * x, I = S * T + I * x, b = g, w = v, P = y), z = Math.atan2(w, b), f.rotation = z * N, z && (x = Math.cos(-z), T = Math.sin(-z), b = b * x + O * T, v = w * x + k * T, k = w * -T + k * x, C = P * -T + C * x, w = v), f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0, f.rotationY = 180 - f.rotationY), f.scaleX = (Math.sqrt(b * b + w * w) * p + .5 | 0) / p, f.scaleY = (Math.sqrt(k * k + M * M) * p + .5 | 0) / p, f.scaleZ = (Math.sqrt(C * C + D * D) * p + .5 | 0) / p, f.rotationX || f.rotationY ? f.skewX = 0 : (f.skewX = O || k ? Math.atan2(O, k) * N + f.rotation : f.skewX || 0, Math.abs(f.skewX) > 90 && Math.abs(f.skewX) < 270 && (_ ? (f.scaleX *= -1, f.skewX += f.rotation <= 0 ? 180 : -180, f.rotation += f.rotation <= 0 ? 180 : -180) : (f.scaleY *= -1, f.skewX += f.skewX <= 0 ? 180 : -180))), f.perspective = I ? 1 / (0 > I ? -I : I) : 0, f.x = L, f.y = E, f.z = F, f.svg && (f.x -= f.xOrigin - (f.xOrigin * b - f.yOrigin * O), f.y -= f.yOrigin - (f.yOrigin * w - f.xOrigin * k))
                            } else if (!Mt || n || !s.length || f.x !== s[4] || f.y !== s[5] || !f.rotationX && !f.rotationY) {
                                var j = s.length >= 6,
                                    X = j ? s[0] : 1,
                                    B = s[1] || 0,
                                    Y = s[2] || 0,
                                    q = j ? s[3] : 1;
                                f.x = s[4] || 0, f.y = s[5] || 0, l = Math.sqrt(X * X + B * B), h = Math.sqrt(q * q + Y * Y), u = X || B ? Math.atan2(B, X) * N : f.rotation || 0, c = Y || q ? Math.atan2(Y, q) * N + u : f.skewX || 0, Math.abs(c) > 90 && Math.abs(c) < 270 && (_ ? (l *= -1, c += 0 >= u ? 180 : -180, u += 0 >= u ? 180 : -180) : (h *= -1, c += 0 >= c ? 180 : -180)), f.scaleX = l, f.scaleY = h, f.rotation = u, f.skewX = c, Mt && (f.rotationX = f.rotationY = f.z = 0, f.perspective = m,
                                    f.scaleZ = 1), f.svg && (f.x -= f.xOrigin - (f.xOrigin * X + f.yOrigin * Y), f.y -= f.yOrigin - (f.xOrigin * B + f.yOrigin * q))
                            }
                            f.zOrigin = d;
                            for (o in f) f[o] < 2e-5 && f[o] > -2e-5 && (f[o] = 0)
                        }
                        return r && (t._gsTransform = f, f.svg && (Ot && t.style[Ct] ? e.delayedCall(.001, function() {
                            Wt(t.style, Ct)
                        }) : !Ot && t.getAttribute("transform") && e.delayedCall(.001, function() {
                            t.removeAttribute("transform")
                        }))), f
                    },
                    Ut = function(t) {
                        var e, i, r = this.data,
                            n = -r.rotation * I,
                            s = n + r.skewX * I,
                            a = 1e5,
                            o = (Math.cos(n) * r.scaleX * a | 0) / a,
                            l = (Math.sin(n) * r.scaleX * a | 0) / a,
                            h = (Math.sin(s) * -r.scaleY * a | 0) / a,
                            u = (Math.cos(s) * r.scaleY * a | 0) / a,
                            c = this.t.style,
                            f = this.t.currentStyle;
                        if (f) {
                            i = l, l = -h, h = -i, e = f.filter, c.filter = "";
                            var _, p, m = this.t.offsetWidth,
                                g = this.t.offsetHeight,
                                v = "absolute" !== f.position,
                                y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + u,
                                x = r.x + m * r.xPercent / 100,
                                T = r.y + g * r.yPercent / 100;
                            if (null != r.ox && (_ = (r.oxp ? m * r.ox * .01 : r.ox) - m / 2, p = (r.oyp ? g * r.oy * .01 : r.oy) - g / 2, x += _ - (_ * o + p * l), T += p - (_ * h + p * u)), v ? (_ = m / 2, p = g / 2, y += ", Dx=" + (_ - (_ * o + p * l) + x) + ", Dy=" + (p - (_ * h + p * u) + T) + ")") : y += ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = e.replace(L, y) : c.filter = y + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === u && (v && -1 === y.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && c.removeAttribute("filter")), !v) {
                                var P, S, O, k = 8 > d ? 1 : -1;
                                for (_ = r.ieOffsetX || 0, p = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + x), r.ieOffsetY = Math.round((g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + T), bt = 0; 4 > bt; bt++) S = st[bt], P = f[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : tt(this.t, S, parseFloat(P), P.replace(b, "")) || 0, O = i !== r[S] ? 2 > bt ? -r.ieOffsetX : -r.ieOffsetY : 2 > bt ? _ - r.ieOffsetX : p - r.ieOffsetY, c[S] = (r[S] = Math.round(i - O * (0 === bt || 2 === bt ? 1 : k))) + "px"
                            }
                        }
                    },
                    Vt = U.set3DTransformRatio = U.setTransformRatio = function(t) {
                        var e, i, r, n, s, a, o, l, h, u, c, f, p, d, m, g, v, y, x, T, b, w, P, S = this.data,
                            O = this.t.style,
                            k = S.rotation,
                            C = S.rotationX,
                            A = S.rotationY,
                            R = S.scaleX,
                            M = S.scaleY,
                            D = S.scaleZ,
                            L = S.x,
                            E = S.y,
                            F = S.z,
                            N = S.svg,
                            z = S.perspective,
                            j = S.force3D,
                            X = S.skewY,
                            B = S.skewX;
                        if (X && (B += X, k += X), !((1 !== t && 0 !== t || "auto" !== j || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && j || F || z || A || C || 1 !== D) || Ot && N || !Mt) k || B || N ? (k *= I, w = B * I, P = 1e5, i = Math.cos(k) * R, s = Math.sin(k) * R, r = Math.sin(k - w) * -M, a = Math.cos(k - w) * M, w && "simple" === S.skewType && (e = Math.tan(w - X * I), e = Math.sqrt(1 + e * e), r *= e, a *= e, X && (e = Math.tan(X * I), e = Math.sqrt(1 + e * e), i *= e, s *= e)), N && (L += S.xOrigin - (S.xOrigin * i + S.yOrigin * r) + S.xOffset, E += S.yOrigin - (S.xOrigin * s + S.yOrigin * a) + S.yOffset, Ot && (S.xPercent || S.yPercent) && (m = this.t.getBBox(), L += .01 * S.xPercent * m.width, E += .01 * S.yPercent * m.height), (m = 1e-6) > L && L > -m && (L = 0), m > E && E > -m && (E = 0)), x = (i * P | 0) / P + "," + (s * P | 0) / P + "," + (r * P | 0) / P + "," + (a * P | 0) / P + "," + L + "," + E + ")", N && Ot ? this.t.setAttribute("transform", "matrix(" + x) : O[Ct] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + x) : O[Ct] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + R + ",0,0," + M + "," + L + "," + E + ")";
                        else {
                            if (_ && ((m = 1e-4) > R && R > -m && (R = D = 2e-5), m > M && M > -m && (M = D = 2e-5), !z || S.z || S.rotationX || S.rotationY || (z = 0)), k || B) k *= I, g = i = Math.cos(k), v = s = Math.sin(k), B && (k -= B * I, g = Math.cos(k), v = Math.sin(k), "simple" === S.skewType && (e = Math.tan((B - X) * I), e = Math.sqrt(1 + e * e), g *= e, v *= e, S.skewY && (e = Math.tan(X * I), e = Math.sqrt(1 + e * e), i *= e, s *= e))), r = -v, a = g;
                            else {
                                if (!(A || C || 1 !== D || z || N)) return void(O[Ct] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + L + "px," + E + "px," + F + "px)" + (1 !== R || 1 !== M ? " scale(" + R + "," + M + ")" : ""));
                                i = a = 1, r = s = 0
                            }
                            u = 1, n = o = l = h = c = f = 0, p = z ? -1 / z : 0, d = S.zOrigin, m = 1e-6, T = ",", b = "0", (k = A * I) && (g = Math.cos(k), v = Math.sin(k), l = -v, c = p * -v, n = i * v, o = s * v, u = g, p *= g, i *= g, s *= g), (k = C * I) && (g = Math.cos(k), v = Math.sin(k), e = r * g + n * v, y = a * g + o * v, h = u * v, f = p * v, n = r * -v + n * g, o = a * -v + o * g, u *= g, p *= g, r = e, a = y), 1 !== D && (n *= D, o *= D, u *= D, p *= D), 1 !== M && (r *= M, a *= M, h *= M, f *= M), 1 !== R && (i *= R, s *= R, l *= R, c *= R), (d || N) && (d && (L += n * -d, E += o * -d, F += u * -d + d), N && (L += S.xOrigin - (S.xOrigin * i + S.yOrigin * r) + S.xOffset, E += S.yOrigin - (S.xOrigin * s + S.yOrigin * a) + S.yOffset), m > L && L > -m && (L = b), m > E && E > -m && (E = b), m > F && F > -m && (F = 0)), x = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(", x += (m > i && i > -m ? b : i) + T + (m > s && s > -m ? b : s) + T + (m > l && l > -m ? b : l), x += T + (m > c && c > -m ? b : c) + T + (m > r && r > -m ? b : r) + T + (m > a && a > -m ? b : a), C || A || 1 !== D ? (x += T + (m > h && h > -m ? b : h) + T + (m > f && f > -m ? b : f) + T + (m > n && n > -m ? b : n), x += T + (m > o && o > -m ? b : o) + T + (m > u && u > -m ? b : u) + T + (m > p && p > -m ? b : p) + T) : x += ",0,0,0,0,1,0,", x += L + T + E + T + F + T + (z ? 1 + -F / z : 1) + ")", O[Ct] = x
                        }
                    };
                (h = Dt.prototype).x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, Pt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(t, e, i, r, s, o, l) {
                        if (r._lastParsedTransform === l) return s;
                        r._lastParsedTransform = l;
                        var h, u = l.scale && "function" == typeof l.scale ? l.scale : 0;
                        "function" == typeof l[i] && (h = l[i], l[i] = e), u && (l.scale = u(g, t));
                        var c, f, _, p, d, v, y, x, T, b = t._gsTransform,
                            w = t.style,
                            P = kt.length,
                            S = l,
                            O = {},
                            k = "transformOrigin",
                            C = qt(t, n, !0, S.parseTransform),
                            A = S.transform && ("function" == typeof S.transform ? S.transform(g, m) : S.transform);
                        if (r._transform = C, A && "string" == typeof A && Ct) f = Y.style, f[Ct] = A, f.display = "block", f.position = "absolute", X.body.appendChild(Y), c = qt(Y, null, !1), C.svg && (v = C.xOrigin, y = C.yOrigin, c.x -= C.xOffset, c.y -= C.yOffset, (S.transformOrigin || S.svgOrigin) && (A = {}, Nt(t, ot(S.transformOrigin), A, S.svgOrigin, S.smoothOrigin, !0), v = A.xOrigin, y = A.yOrigin, c.x -= A.xOffset - C.xOffset, c.y -= A.yOffset - C.yOffset), (v || y) && (x = Yt(Y, !0), c.x -= v - (v * x[0] + y * x[2]), c.y -= y - (v * x[1] + y * x[3]))), X.body.removeChild(Y), c.perspective || (c.perspective = C.perspective), null != S.xPercent && (c.xPercent = ht(S.xPercent, C.xPercent)), null != S.yPercent && (c.yPercent = ht(S.yPercent, C.yPercent));
                        else if ("object" == typeof S) {
                            if (c = {
                                    scaleX: ht(null != S.scaleX ? S.scaleX : S.scale, C.scaleX),
                                    scaleY: ht(null != S.scaleY ? S.scaleY : S.scale, C.scaleY),
                                    scaleZ: ht(S.scaleZ, C.scaleZ),
                                    x: ht(S.x, C.x),
                                    y: ht(S.y, C.y),
                                    z: ht(S.z, C.z),
                                    xPercent: ht(S.xPercent, C.xPercent),
                                    yPercent: ht(S.yPercent, C.yPercent),
                                    perspective: ht(S.transformPerspective, C.perspective)
                                }, null != (d = S.directionalRotation))
                                if ("object" == typeof d)
                                    for (f in d) S[f] = d[f];
                                else S.rotation = d;
                                "string" == typeof S.x && -1 !== S.x.indexOf("%") && (c.x = 0, c.xPercent = ht(S.x, C.xPercent)), "string" == typeof S.y && -1 !== S.y.indexOf("%") && (c.y = 0, c.yPercent = ht(S.y, C.yPercent)), c.rotation = ut("rotation" in S ? S.rotation : "shortRotation" in S ? S.shortRotation + "_short" : "rotationZ" in S ? S.rotationZ : C.rotation, C.rotation, "rotation", O), Mt && (c.rotationX = ut("rotationX" in S ? S.rotationX : "shortRotationX" in S ? S.shortRotationX + "_short" : C.rotationX || 0, C.rotationX, "rotationX", O), c.rotationY = ut("rotationY" in S ? S.rotationY : "shortRotationY" in S ? S.shortRotationY + "_short" : C.rotationY || 0, C.rotationY, "rotationY", O)), c.skewX = ut(S.skewX, C.skewX), c.skewY = ut(S.skewY, C.skewY)
                        }
                        for (Mt && null != S.force3D && (C.force3D = S.force3D, p = !0), C.skewType = S.skewType || C.skewType || a.defaultSkewType, (_ = C.force3D || C.z || C.rotationX || C.rotationY || c.z || c.rotationX || c.rotationY || c.perspective) || null == S.scale || (c.scaleZ = 1); --P > -1;) T = kt[P], ((A = c[T] - C[T]) > 1e-6 || -1e-6 > A || null != S[T] || null != z[T]) && (p = !0, s = new yt(C, T, C[T], A, s), T in O && (s.e = O[T]), s.xs0 = 0, s.plugin = o, r._overwriteProps.push(s.n));
                        return A = S.transformOrigin, C.svg && (A || S.svgOrigin) && (v = C.xOffset, y = C.yOffset, Nt(t, ot(A), c, S.svgOrigin, S.smoothOrigin), s = xt(C, "xOrigin", (b ? C : c).xOrigin, c.xOrigin, s, k), s = xt(C, "yOrigin", (b ? C : c).yOrigin, c.yOrigin, s, k), (v !== C.xOffset || y !== C.yOffset) && (s = xt(C, "xOffset", b ? v : C.xOffset, C.xOffset, s, k), s = xt(C, "yOffset", b ? y : C.yOffset, C.yOffset, s, k)), A = "0px 0px"), (A || Mt && _ && C.zOrigin) && (Ct ? (p = !0, T = Rt, A = (A || K(t, T, n, !1, "50% 50%")) + "", s = new yt(w, T, 0, 0, s, -1, k), s.b = w[T], s.plugin = o, Mt ? (f = C.zOrigin, A = A.split(" "), C.zOrigin = (A.length > 2 && (0 === f || "0px" !== A[2]) ? parseFloat(A[2]) : f) || 0, s.xs0 = s.e = A[0] + " " + (A[1] || "50%") + " 0px", s = new yt(C, "zOrigin", 0, 0, s, -1, s.n), s.b = f, s.xs0 = s.e = C.zOrigin) : s.xs0 = s.e = A) : ot(A + "", C)), p && (r._transformType = C.svg && Ot || !_ && 3 !== this._transformType ? 2 : 3), h && (l[i] = h), u && (l.scale = u), s
                    },
                    prefix: !0
                }), Pt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), Pt("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, s, a, o) {
                        e = this.format(e);
                        var l, h, u, c, f, _, p, d, m, g, v, y, x, T, b, w, P = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            S = t.style;
                        for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), l = e.split(" "), h = 0; h < P.length; h++) this.p.indexOf("border") && (P[h] = $(P[h])), -1 !== (f = c = K(t, P[h], n, !1, "0px")).indexOf(" ") && (c = f.split(" "), f = c[0], c = c[1]), _ = u = l[h], p = parseFloat(f), y = f.substr((p + "").length), x = "=" === _.charAt(1), x ? (d = parseInt(_.charAt(0) + "1", 10), _ = _.substr(2), d *= parseFloat(_), v = _.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(_), v = _.substr((d + "").length)), "" === v && (v = r[i] || y), v !== y && (T = tt(t, "borderLeft", p, y), b = tt(t, "borderTop", p, y), "%" === v ? (f = T / m * 100 + "%", c = b / g * 100 + "%") : "em" === v ? (w = tt(t, "borderLeft", 1, "em"), f = T / w + "em", c = b / w + "em") : (f = T + "px", c = b + "px"), x && (_ = parseFloat(f) + d + v, u = parseFloat(c) + d + v)), a = Tt(S, P[h], f + " " + c, _ + " " + u, !1, "0px", a);
                        return a
                    },
                    prefix: !0,
                    formatter: mt("0px 0px 0px 0px", !1, !0)
                }), Pt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, r, s, a) {
                        return Tt(t.style, i, this.format(K(t, i, n, !1, "0px 0px")), this.format(e), !1, "0px", s)
                    },
                    prefix: !0,
                    formatter: mt("0px 0px", !1, !0)
                }), Pt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, r, s, a) {
                        var o, l, h, u, c, f, _ = "background-position",
                            p = n || J(t, null),
                            m = this.format((p ? d ? p.getPropertyValue(_ + "-x") + " " + p.getPropertyValue(_ + "-y") : p.getPropertyValue(_) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(e);
                        if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && g.split(",").length < 2 && (f = K(t, "backgroundImage").replace(A, "")) && "none" !== f) {
                            for (o = m.split(" "), l = g.split(" "), q.setAttribute("src", f), h = 2; --h > -1;) m = o[h], (u = -1 !== m.indexOf("%")) != (-1 !== l[h].indexOf("%")) && (c = 0 === h ? t.offsetWidth - q.width : t.offsetHeight - q.height, o[h] = u ? parseFloat(m) / 100 * c + "px" : parseFloat(m) / c * 100 + "%");
                            m = o.join(" ")
                        }
                        return this.parseComplex(t.style, m, g, s, a)
                    },
                    formatter: ot
                }), Pt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: function(t) {
                        return t += "", ot(-1 === t.indexOf(" ") ? t + " " + t : t)
                    }
                }), Pt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), Pt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), Pt("transformStyle", {
                    prefix: !0
                }), Pt("backfaceVisibility", {
                    prefix: !0
                }), Pt("userSelect", {
                    prefix: !0
                }), Pt("margin", {
                    parser: gt("marginTop,marginRight,marginBottom,marginLeft")
                }), Pt("padding", {
                    parser: gt("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), Pt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, r, s, a) {
                        var o, l, h;
                        return 9 > d ? (l = t.currentStyle, h = 8 > d ? " " : ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (o = this.format(K(t, this.p, n, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, s, a)
                    }
                }), Pt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), Pt("autoRound,strictUnits", {
                    parser: function(t, e, i, r, n) {
                        return n
                    }
                }), Pt("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, r, s, a) {
                        var o = K(t, "borderTopWidth", n, !1, "0px"),
                            l = this.format(e).split(" "),
                            h = l[0].replace(b, "");
                        return "px" !== h && (o = parseFloat(o) / tt(t, "borderTopWidth", 1, h) + h), this.parseComplex(t.style, this.format(o + " " + K(t, "borderTopStyle", n, !1, "solid") + " " + K(t, "borderTopColor", n, !1, "#000")), l.join(" "), s, a)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(dt) || ["#000"])[0]
                    }
                }), Pt("borderWidth", {
                    parser: gt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), Pt("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, r, n, s) {
                        var a = t.style,
                            o = "cssFloat" in a ? "cssFloat" : "styleFloat";
                        return new yt(a, o, 0, 0, n, -1, i, !1, 0, a[o], e)
                    }
                });
                var Ht = function(t) {
                    var e, i = this.t,
                        r = i.filter || K(this.data, "filter") || "",
                        n = this.s + this.c * t | 0;
                    100 === n && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), e = !K(this.data, "filter")) : (i.filter = r.replace(S, ""), e = !0)), e || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + n + ")"), -1 === r.indexOf("pacity") ? 0 === n && this.xn1 || (i.filter = r + " alpha(opacity=" + n + ")") : i.filter = r.replace(w, "opacity=" + n))
                };
                Pt("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, r, s, a) {
                        var o = parseFloat(K(t, "opacity", n, !1, "1")),
                            l = t.style,
                            h = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), h && 1 === o && "hidden" === K(t, "visibility", n) && 0 !== e && (o = 0), H ? s = new yt(l, "opacity", o, e - o, s) : (s = new yt(l, "opacity", 100 * o, 100 * (e - o), s), s.xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = t, s.plugin = a, s.setRatio = Ht), h && (s = new yt(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), s.xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(i)), s
                    }
                });
                var Wt = function(t, e) {
                        e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(k, "-$1").toLowerCase())) : t.removeAttribute(e))
                    },
                    Gt = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Wt(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                Pt("className", {
                    parser: function(t, e, r, s, a, o, l) {
                        var h, u, c, f, _, p = t.getAttribute("class") || "",
                            d = t.style.cssText;
                        if (a = s._classNamePT = new yt(t, r, 0, 0, a, 2), a.setRatio = Gt, a.pr = -11, i = !0, a.b = p, u = it(t, n), c = t._gsClassPT) {
                            for (f = {}, _ = c.data; _;) f[_.p] = 1, _ = _._next;
                            c.setRatio(1)
                        }
                        return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", a.e), h = rt(t, u, it(t), l, f), t.setAttribute("class", p), a.data = h.firstMPT, t.style.cssText = d, a = a.xfirst = s.parse(t, h.difs, a, o)
                    }
                });
                var Zt = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, r, n, s, a = this.t.style,
                            o = l.transform.parse;
                        if ("all" === this.e) a.cssText = "", n = !0;
                        else
                            for (e = this.e.split(" ").join("").split(","), r = e.length; --r > -1;) i = e[r], l[i] && (l[i].parse === o ? n = !0 : i = "transformOrigin" === i ? Rt : l[i].p), Wt(a, i);
                        n && (Wt(a, Ct), (s = this.t._gsTransform) && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                    }
                };
                for (Pt("clearProps", {
                        parser: function(t, e, r, n, s) {
                            return s = new yt(t, r, 0, 0, s, 2), s.setRatio = Zt, s.e = e, s.pr = -10, s.data = n._tween, i = !0, s
                        }
                    }), h = "bezier,throwProps,physicsProps,physics2D".split(","), bt = h.length; bt--;) St(h[bt]);
                (h = a.prototype)._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function(t, e, o, h) {
                    if (!t.nodeType) return !1;
                    this._target = m = t, this._tween = o, this._vars = e, g = h, u = e.autoRound, i = !1, r = e.suffixMap || a.suffixMap, n = J(t, ""), s = this._overwriteProps;
                    var _, d, v, y, x, T, b, w, S, O = t.style;
                    if (c && "" === O.zIndex && ("auto" === (_ = K(t, "zIndex", n)) || "" === _) && this._addLazySet(O, "zIndex", 0), "string" == typeof e && (y = O.cssText, _ = it(t, n), O.cssText = y + ";" + e, _ = rt(t, _, it(t)).difs, !H && P.test(e) && (_.opacity = parseFloat(RegExp.$1)), e = _, O.cssText = y), e.className ? this._firstPT = d = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = d = this.parse(t, e, null), this._transformType) {
                        for (S = 3 === this._transformType, Ct ? f && (c = !0, "" === O.zIndex && ("auto" === (b = K(t, "zIndex", n)) || "" === b) && this._addLazySet(O, "zIndex", 0), p && this._addLazySet(O, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (S ? "visible" : "hidden"))) : O.zoom = 1, v = d; v && v._next;) v = v._next;
                        w = new yt(t, "transform", 0, 0, null, 2), this._linkCSSP(w, null, v), w.setRatio = Ct ? Vt : Ut, w.data = this._transform || qt(t, n, !0), w.tween = o, w.pr = -1, s.pop()
                    }
                    if (i) {
                        for (; d;) {
                            for (T = d._next, v = y; v && v.pr > d.pr;) v = v._next;
                            (d._prev = v ? v._prev : x) ? d._prev._next = d: y = d, (d._next = v) ? v._prev = d : x = d, d = T
                        }
                        this._firstPT = y
                    }
                    return !0
                }, h.parse = function(t, e, i, s) {
                    var a, o, h, c, f, _, p, d, v, y, x = t.style;
                    for (a in e) "function" == typeof(_ = e[a]) && (_ = _(g, m)), o = l[a], o ? i = o.parse(t, _, a, this, i, s, e) : (f = K(t, a, n) + "", v = "string" == typeof _, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || v && O.test(_) ? (v || (_ = _t(_), _ = (_.length > 3 ? "rgba(" : "rgb(") + _.join(",") + ")"), i = Tt(x, a, f, _, !0, "transparent", i, 0, s)) : v && F.test(_) ? i = Tt(x, a, f, _, !0, null, i, 0, s) : (h = parseFloat(f), p = h || 0 === h ? f.substr((h + "").length) : "", ("" === f || "auto" === f) && ("width" === a || "height" === a ? (h = at(t, a, n), p = "px") : "left" === a || "top" === a ? (h = et(t, a, n), p = "px") : (h = "opacity" !== a ? 0 : 1, p = "")), y = v && "=" === _.charAt(1), y ? (c = parseInt(_.charAt(0) + "1", 10), _ = _.substr(2), c *= parseFloat(_), d = _.replace(b, "")) : (c = parseFloat(_), d = v ? _.replace(b, "") : ""), "" === d && (d = a in r ? r[a] : p), _ = c || 0 === c ? (y ? c + h : c) + d : e[a], p !== d && "" !== d && (c || 0 === c) && h && (h = tt(t, a, h, p), "%" === d ? (h /= tt(t, a, 100, "%") / 100, !0 !== e.strictUnits && (f = h + "%")) : "em" === d || "rem" === d || "vw" === d || "vh" === d ? h /= tt(t, a, 1, d) : "px" !== d && (c = tt(t, a, c, d), d = "px"), y && (c || 0 === c) && (_ = c + h + d)), y && (c += h), !h && 0 !== h || !c && 0 !== c ? void 0 !== x[a] && (_ || _ + "" != "NaN" && null != _) ? (i = new yt(x, a, c || h || 0, 0, i, -1, a, !1, 0, f, _), i.xs0 = "none" !== _ || "display" !== a && -1 === a.indexOf("Style") ? _ : f) : G("invalid " + a + " tween value: " + e[a]) : (i = new yt(x, a, h, c - h, i, 0, a, !1 !== u && ("px" === d || "zIndex" === a), 0, f, _), i.xs0 = d))), s && i && !i.plugin && (i.plugin = s);
                    return i
                }, h.setRatio = function(t) {
                    var e, i, r, n = this._firstPT;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
                            for (; n;) {
                                if (e = n.c * t + n.s, n.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), n.type)
                                    if (1 === n.type)
                                        if (2 === (r = n.l)) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2;
                                        else if (3 === r) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3;
                                else if (4 === r) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4;
                                else if (5 === r) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4 + n.xn4 + n.xs5;
                                else {
                                    for (i = n.xs0 + e + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                                    n.t[n.p] = i
                                } else -1 === n.type ? n.t[n.p] = n.xs0 : n.setRatio && n.setRatio(t);
                                else n.t[n.p] = e + n.xs0;
                                n = n._next
                            } else
                                for (; n;) 2 !== n.type ? n.t[n.p] = n.b : n.setRatio(t), n = n._next;
                        else
                            for (; n;) {
                                if (2 !== n.type)
                                    if (n.r && -1 !== n.type)
                                        if (e = Math.round(n.s + n.c), n.type) {
                                            if (1 === n.type) {
                                                for (r = n.l, i = n.xs0 + e + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                                                n.t[n.p] = i
                                            }
                                        } else n.t[n.p] = e + n.xs0;
                                else n.t[n.p] = n.e;
                                else n.setRatio(t);
                                n = n._next
                            }
                }, h._enableTransforms = function(t) {
                    this._transform = this._transform || qt(this._target, n, !0), this._transformType = this._transform.svg && Ot || !t && 3 !== this._transformType ? 2 : 3
                };
                var Qt = function(t) {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                h._addLazySet = function(t, e, i) {
                    var r = this._firstPT = new yt(t, e, 0, 0, this._firstPT, 2);
                    r.e = i, r.setRatio = Qt, r.data = this
                }, h._linkCSSP = function(t, e, i, r) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), i ? i._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, h._mod = function(t) {
                    for (var e = this._firstPT; e;) "function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1), e = e._next
                }, h._kill = function(e) {
                    var i, r, n, s = e;
                    if (e.autoAlpha || e.alpha) {
                        s = {};
                        for (r in e) s[r] = e[r];
                        s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                    }
                    for (e.className && (i = this._classNamePT) && (n = i.xfirst, n && n._prev ? this._linkCSSP(n._prev, i._next, n._prev._prev) : n === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, n._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== r && i.plugin._kill && (i.plugin._kill(e), r = i.plugin), i = i._next;
                    return t.prototype._kill.call(this, s)
                };
                var $t = function(t, e, i) {
                    var r, n, s, a;
                    if (t.slice)
                        for (n = t.length; --n > -1;) $t(t[n], e, i);
                    else
                        for (r = t.childNodes, n = r.length; --n > -1;) s = r[n], a = s.type, s.style && (e.push(it(s)), i && i.push(s)), 1 !== a && 9 !== a && 11 !== a || !s.childNodes.length || $t(s, e, i)
                };
                return a.cascadeTo = function(t, i, r) {
                    var n, s, a, o, l = e.to(t, i, r),
                        h = [l],
                        u = [],
                        c = [],
                        f = [],
                        _ = e._internals.reservedProps;
                    for (t = l._targets || l.target, $t(t, u, f), l.render(i, !0, !0), $t(t, c), l.render(0, !0, !0), l._enabled(!0), n = f.length; --n > -1;)
                        if ((s = rt(f[n], u[n], c[n])).firstMPT) {
                            s = s.difs;
                            for (a in r) _[a] && (s[a] = r[a]);
                            o = {};
                            for (a in s) o[a] = u[n][a];
                            h.push(e.fromTo(f[n], i, o, s))
                        }
                    return h
                }, t.activate([a]), a
            }, !0),
            function() {
                var t = function(t) {
                        for (; t;) t.f || t.blob || (t.m = Math.round), t = t._next
                    },
                    e = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        version: "1.6.0",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }).prototype;
                e._onInitAllProps = function() {
                    for (var e, i, r, n = this._tween, s = n.vars.roundProps.join ? n.vars.roundProps : n.vars.roundProps.split(","), a = s.length, o = {}, l = n._propLookup.roundProps; --a > -1;) o[s[a]] = Math.round;
                    for (a = s.length; --a > -1;)
                        for (e = s[a], i = n._firstPT; i;) r = i._next, i.pg ? i.t._mod(o) : i.n === e && (2 === i.f && i.t ? t(i.t._firstPT) : (this._add(i.t, e, i.s, i.c), r && (r._prev = i._prev), i._prev ? i._prev._next = r : n._firstPT === i && (n._firstPT = r), i._next = i._prev = null, n._propLookup[e] = l)), i = r;
                    return !1
                }, e._add = function(t, e, i, r) {
                    this._addTween(t, e, i, i + r, e, Math.round), this._overwriteProps.push(e)
                }
            }(), _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.6.0",
                init: function(t, e, i, r) {
                    var n, s;
                    if ("function" != typeof t.setAttribute) return !1;
                    for (n in e) "function" == typeof(s = e[n]) && (s = s(r, t)), this._addTween(t, "setAttribute", t.getAttribute(n) + "", s + "", n, !1, n), this._overwriteProps.push(n);
                    return !0
                }
            }), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.3.0",
                API: 2,
                init: function(t, e, i, r) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var n, s, a, o, l, h, u = !0 === e.useRadians ? 2 * Math.PI : 360;
                    for (n in e) "useRadians" !== n && ("function" == typeof(o = e[n]) && (o = o(r, t)), h = (o + "").split("_"), s = h[0], a = parseFloat("function" != typeof t[n] ? t[n] : t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]()), o = this.finals[n] = "string" == typeof s && "=" === s.charAt(1) ? a + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, l = o - a, h.length && (-1 !== (s = h.join("_")).indexOf("short") && (l %= u) != l % (u / 2) && (l = 0 > l ? l + u : l - u), -1 !== s.indexOf("_cw") && 0 > l ? l = (l + 9999999999 * u) % u - (l / u | 0) * u : -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * u) % u - (l / u | 0) * u)), (l > 1e-6 || -1e-6 > l) && (this._addTween(t, n, a, a + l, n), this._overwriteProps.push(n)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, r, n = _gsScope.GreenSockGlobals || _gsScope,
                    s = n.com.greensock,
                    a = 2 * Math.PI,
                    o = Math.PI / 2,
                    l = s._class,
                    h = function(e, i) {
                        var r = l("easing." + e, function() {}, !0),
                            n = r.prototype = new t;
                        return n.constructor = r, n.getRatio = i, r
                    },
                    u = t.register || function() {},
                    c = function(t, e, i, r, n) {
                        var s = l("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new r
                        }, !0);
                        return u(s, t), s
                    },
                    f = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    _ = function(e, i) {
                        var r = l("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            n = r.prototype = new t;
                        return n.constructor = r, n.getRatio = i, n.config = function(t) {
                            return new r(t)
                        }, r
                    },
                    p = c("Back", _("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), _("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), _("BackInOut", function(t) {
                        return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    d = l("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i
                    }, !0),
                    m = d.prototype = new t;
                return m.constructor = d, m.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, d.ease = new d(.7, .7), m.config = d.config = function(t, e, i) {
                    return new d(t, e, i)
                }, e = l("easing.SteppedEase", function(t) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                }, !0), m = e.prototype = new t, m.constructor = e, m.getRatio = function(t) {
                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                }, m.config = e.config = function(t) {
                    return new e(t)
                }, i = l("easing.RoughEase", function(e) {
                    for (var i, r, n, s, a, o, l = (e = e || {}).taper || "none", h = [], u = 0, c = 0 | (e.points || 20), _ = c, p = !1 !== e.randomize, d = !0 === e.clamp, m = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --_ > -1;) i = p ? Math.random() : 1 / c * _, r = m ? m.getRatio(i) : i, "none" === l ? n = g : "out" === l ? (s = 1 - i, n = s * s * g) : "in" === l ? n = i * i * g : .5 > i ? (s = 2 * i, n = s * s * .5 * g) : (s = 2 * (1 - i), n = s * s * .5 * g), p ? r += Math.random() * n - .5 * n : _ % 2 ? r += .5 * n : r -= .5 * n, d && (r > 1 ? r = 1 : 0 > r && (r = 0)), h[u++] = {
                        x: i,
                        y: r
                    };
                    for (h.sort(function(t, e) {
                            return t.x - e.x
                        }), o = new f(1, 1, null), _ = c; --_ > -1;) a = h[_], o = new f(a.x, a.y, o);
                    this._prev = new f(0, 0, 0 !== o.t ? o : o.next)
                }, !0), m = i.prototype = new t, m.constructor = i, m.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && t <= e.t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, m.config = function(t) {
                    return new i(t)
                }, i.ease = new i, c("Bounce", h("BounceOut", function(t) {
                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), h("BounceIn", function(t) {
                    return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), h("BounceInOut", function(t) {
                    var e = .5 > t;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), c("Circ", h("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), h("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), h("CircInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), r = function(e, i, r) {
                    var n = l("easing." + e, function(t, e) {
                            this._p1 = t >= 1 ? t : 1, this._p2 = (e || r) / (1 > t ? t : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), this._p2 = a / this._p2
                        }, !0),
                        s = n.prototype = new t;
                    return s.constructor = n, s.getRatio = i, s.config = function(t, e) {
                        return new n(t, e)
                    }, n
                }, c("Elastic", r("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                }, .3), r("ElasticIn", function(t) {
                    return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
                }, .3), r("ElasticInOut", function(t) {
                    return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
                }, .45)), c("Expo", h("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), h("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), h("ExpoInOut", function(t) {
                    return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), c("Sine", h("SineOut", function(t) {
                    return Math.sin(t * o)
                }), h("SineIn", function(t) {
                    return 1 - Math.cos(t * o)
                }), h("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), l("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), u(n.SlowMo, "SlowMo", "ease,"), u(i, "RoughEase", "ease,"), u(e, "SteppedEase", "ease,"), p
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t, e) {
        "use strict";
        var i = {},
            r = t.document,
            n = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!n.TweenLite) {
            var s, a, o, l, h, u = function(t) {
                    var e, i = t.split("."),
                        r = n;
                    for (e = 0; e < i.length; e++) r[i[e]] = r = r[i[e]] || {};
                    return r
                },
                c = u("com.greensock"),
                f = 1e-10,
                _ = function(t) {
                    var e, i = [],
                        r = t.length;
                    for (e = 0; e !== r; i.push(t[e++]));
                    return i
                },
                p = function() {},
                d = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                m = {},
                g = function(r, s, a, o) {
                    this.sc = m[r] ? m[r].sc : [], m[r] = this, this.gsClass = null, this.func = a;
                    var l = [];
                    this.check = function(h) {
                        for (var c, f, _, p, d, v = s.length, y = v; --v > -1;)(c = m[s[v]] || new g(s[v], [])).gsClass ? (l[v] = c.gsClass, y--) : h && c.sc.push(this);
                        if (0 === y && a) {
                            if (f = ("com.greensock." + r).split("."), _ = f.pop(), p = u(f.join("."))[_] = this.gsClass = a.apply(a, l), o)
                                if (n[_] = i[_] = p, !(d = "undefined" != typeof module && module.exports) && "function" == typeof define && define.amd) define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + r.split(".").pop(), [], function() {
                                    return p
                                });
                                else if (d)
                                if (r === e) {
                                    module.exports = i[e] = p;
                                    for (v in i) p[v] = i[v]
                                } else i[e] && (i[e][_] = p);
                            for (v = 0; v < this.sc.length; v++) this.sc[v].check()
                        }
                    }, this.check(!0)
                },
                v = t._gsDefine = function(t, e, i, r) {
                    return new g(t, e, i, r)
                },
                y = c._class = function(t, e, i) {
                    return e = e || function() {}, v(t, [], function() {
                        return e
                    }, i), e
                };
            v.globals = n;
            var x = [0, 0, 1, 1],
                T = y("easing.Ease", function(t, e, i, r) {
                    this._func = t, this._type = i || 0, this._power = r || 0, this._params = e ? x.concat(e) : x
                }, !0),
                b = T.map = {},
                w = T.register = function(t, e, i, r) {
                    for (var n, s, a, o, l = e.split(","), h = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)
                        for (s = l[h], n = r ? y("easing." + s, null, !0) : c.easing[s] || {}, a = u.length; --a > -1;) o = u[a], b[s + "." + o] = b[o + s] = n[o] = t.getRatio ? t : t[o] || new t
                };
            for ((o = T.prototype)._calcEnd = !1, o.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        r = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                    return 1 === i ? r *= r : 2 === i ? r *= r * r : 3 === i ? r *= r * r * r : 4 === i && (r *= r * r * r * r), 1 === e ? 1 - r : 2 === e ? r : .5 > t ? r / 2 : 1 - r / 2
                }, a = (s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --a > -1;) o = s[a] + ",Power" + a, w(new T(null, null, 1, a), o, "easeOut", !0), w(new T(null, null, 2, a), o, "easeIn" + (0 === a ? ",easeNone" : "")), w(new T(null, null, 3, a), o, "easeInOut");
            b.linear = c.easing.Linear.easeIn, b.swing = c.easing.Quad.easeInOut;
            var P = y("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            (o = P.prototype).addEventListener = function(t, e, i, r, n) {
                n = n || 0;
                var s, a, o = this._listeners[t],
                    u = 0;
                for (this !== l || h || l.wake(), null == o && (this._listeners[t] = o = []), a = o.length; --a > -1;) s = o[a], s.c === e && s.s === i ? o.splice(a, 1) : 0 === u && s.pr < n && (u = a + 1);
                o.splice(u, 0, {
                    c: e,
                    s: i,
                    up: r,
                    pr: n
                })
            }, o.removeEventListener = function(t, e) {
                var i, r = this._listeners[t];
                if (r)
                    for (i = r.length; --i > -1;)
                        if (r[i].c === e) return void r.splice(i, 1)
            }, o.dispatchEvent = function(t) {
                var e, i, r, n = this._listeners[t];
                if (n)
                    for ((e = n.length) > 1 && (n = n.slice(0)), i = this._eventTarget; --e > -1;)(r = n[e]) && (r.up ? r.c.call(r.s || i, {
                        type: t,
                        target: i
                    }) : r.c.call(r.s || i))
            };
            var S = t.requestAnimationFrame,
                O = t.cancelAnimationFrame,
                k = Date.now || function() {
                    return (new Date).getTime()
                },
                C = k();
            for (a = (s = ["ms", "moz", "webkit", "o"]).length; --a > -1 && !S;) S = t[s[a] + "RequestAnimationFrame"], O = t[s[a] + "CancelAnimationFrame"] || t[s[a] + "CancelRequestAnimationFrame"];
            y("Ticker", function(t, e) {
                var i, n, s, a, o, u = this,
                    c = k(),
                    _ = !(!1 === e || !S) && "auto",
                    d = 500,
                    m = 33,
                    g = function(t) {
                        var e, r, l = k() - C;
                        l > d && (c += l - m), C += l, u.time = (C - c) / 1e3, e = u.time - o, (!i || e > 0 || !0 === t) && (u.frame++, o += e + (e >= a ? .004 : a - e), r = !0), !0 !== t && (s = n(g)), r && u.dispatchEvent("tick")
                    };
                P.call(u), u.time = u.frame = 0, u.tick = function() {
                    g(!0)
                }, u.lagSmoothing = function(t, e) {
                    d = t || 1 / f, m = Math.min(e, d, 0)
                }, u.sleep = function() {
                    null != s && (_ && O ? O(s) : clearTimeout(s), n = p, s = null, u === l && (h = !1))
                }, u.wake = function(t) {
                    null !== s ? u.sleep() : t ? c += -C + (C = k()) : u.frame > 10 && (C = k() - d + 5), n = 0 === i ? p : _ && S ? S : function(t) {
                        return setTimeout(t, 1e3 * (o - u.time) + 1 | 0)
                    }, u === l && (h = !0), g(2)
                }, u.fps = function(t) {
                    return arguments.length ? (i = t, a = 1 / (i || 60), o = this.time + a, void u.wake()) : i
                }, u.useRAF = function(t) {
                    return arguments.length ? (u.sleep(), _ = t, void u.fps(i)) : _
                }, u.fps(t), setTimeout(function() {
                    "auto" === _ && u.frame < 5 && "hidden" !== r.visibilityState && u.useRAF(!1)
                }, 1500)
            }), (o = c.Ticker.prototype = new c.events.EventDispatcher).constructor = c.Ticker;
            var A = y("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, G) {
                    h || l.wake();
                    var i = this.vars.useFrames ? W : G;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = A.ticker = new c.Ticker, (o = A.prototype)._dirty = o._gc = o._initted = o._paused = !1, o._totalTime = o._time = 0, o._rawPrevTime = -1, o._next = o._last = o._onUpdate = o._timeline = o.timeline = null, o._paused = !1;
            var R = function() {
                h && k() - C > 2e3 && l.wake(),
                    setTimeout(R, 2e3)
            };
            R(), o.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, o.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, o.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, o.seek = function(t, e) {
                return this.totalTime(Number(t), !1 !== e)
            }, o.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
            }, o.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, o.render = function(t, e, i) {}, o.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, o.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale
            }, o._enabled = function(t, e) {
                return h || l.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, o._kill = function(t, e) {
                return this._enabled(!1, !1)
            }, o.kill = function(t, e) {
                return this._kill(t, e), this
            }, o._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, o._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, o._callback = function(t) {
                var e = this.vars,
                    i = e[t],
                    r = e[t + "Params"],
                    n = e[t + "Scope"] || e.callbackScope || this;
                switch (r ? r.length : 0) {
                    case 0:
                        i.call(n);
                        break;
                    case 1:
                        i.call(n, r[0]);
                        break;
                    case 2:
                        i.call(n, r[0], r[1]);
                        break;
                    default:
                        i.apply(n, r)
                }
            }, o.eventCallback = function(t, e, i, r) {
                if ("on" === (t || "").substr(0, 2)) {
                    var n = this.vars;
                    if (1 === arguments.length) return n[t];
                    null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = d(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[t + "Scope"] = r), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, o.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, o.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, o.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, o.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, o.totalTime = function(t, e, i) {
                if (h || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var r = this._totalDuration,
                            n = this._timeline;
                        if (t > r && !i && (t = r), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? r - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline)
                            for (; n._timeline;) n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), n = n._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (F.length && Q(), this.render(t, e, !1), F.length && Q())
                }
                return this
            }, o.progress = o.totalProgress = function(t, e) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
            }, o.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, o.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, o.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || f, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, o.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, o.paused = function(t) {
                if (!arguments.length) return this._paused;
                var e, i, r = this._timeline;
                return t != this._paused && r && (h || t || l.wake(), e = r.rawTime(), i = e - this._pauseTime, !t && r.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = r.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
            };
            var M = y("core.SimpleTimeline", function(t) {
                A.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            (o = M.prototype = new A).constructor = M, o.kill()._gc = !1, o._first = o._last = o._recent = null, o._sortChildren = !1, o.add = o.insert = function(t, e, i, r) {
                var n, s;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), n = this._last, this._sortChildren)
                    for (s = t._startTime; n && n._startTime > s;) n = n._prev;
                return n ? (t._next = n._next, n._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = n, this._recent = t, this._timeline && this._uncache(!0), this
            }, o._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, o.render = function(t, e, i) {
                var r, n = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; n;) r = n._next, (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = r
            }, o.rawTime = function() {
                return h || l.wake(), this._totalTime
            };
            var D = y("TweenLite", function(e, i, r) {
                    if (A.call(this, i, r), this.render = D.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : D.selector(e) || e;
                    var n, s, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? H[D.defaultOverwrite] : "number" == typeof l ? l >> 0 : H[l], (o || e instanceof Array || e.push && d(e)) && "number" != typeof e[0])
                        for (this._targets = a = _(e), this._propLookup = [], this._siblings = [], n = 0; n < a.length; n++) s = a[n], s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (a.splice(n--, 1), this._targets = a = a.concat(_(s))) : (this._siblings[n] = $(s, this, !1), 1 === l && this._siblings[n].length > 1 && K(s, this, null, 1, this._siblings[n])) : "string" == typeof(s = a[n--] = D.selector(s)) && a.splice(n + 1, 1) : a.splice(n--, 1);
                    else this._propLookup = {}, this._siblings = $(e, this, !1), 1 === l && this._siblings.length > 1 && K(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -f, this.render(Math.min(0, -this._delay)))
                }, !0),
                L = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                E = function(t, e) {
                    var i, r = {};
                    for (i in t) V[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!Y[i] || Y[i] && Y[i]._autoCSS) || (r[i] = t[i], delete t[i]);
                    t.css = r
                };
            (o = D.prototype = new A).constructor = D, o.kill()._gc = !1, o.ratio = 0, o._firstPT = o._targets = o._overwrittenProps = o._startAt = null, o._notifyPluginsOfEnabled = o._lazy = !1, D.version = "1.19.1", D.defaultEase = o._ease = new T(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = l, D.autoSleep = 120, D.lagSmoothing = function(t, e) {
                l.lagSmoothing(t, e)
            }, D.selector = t.$ || t.jQuery || function(e) {
                var i = t.$ || t.jQuery;
                return i ? (D.selector = i, i(e)) : void 0 === r ? e : r.querySelectorAll ? r.querySelectorAll(e) : r.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var F = [],
                I = {},
                N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                z = function(t) {
                    for (var e, i = this._firstPT; i;) e = i.blob ? 1 === t ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m(e, this._target || i.t) : 1e-6 > e && e > -1e-6 && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                },
                j = function(t, e, i, r) {
                    var n, s, a, o, l, h, u, c = [],
                        f = 0,
                        _ = "",
                        p = 0;
                    for (c.start = t, c.end = e, t = c[0] = t + "", e = c[1] = e + "", i && (i(c), t = c[0], e = c[1]), c.length = 0, n = t.match(N) || [], s = e.match(N) || [], r && (r._next = null, r.blob = 1, c._firstPT = c._applyPT = r), l = s.length, o = 0; l > o; o++) u = s[o], h = e.substr(f, e.indexOf(u, f) - f), _ += h || !o ? h : ",", f += h.length, p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1), u === n[o] || n.length <= o ? _ += u : (_ && (c.push(_), _ = ""), a = parseFloat(n[o]), c.push(a), c._firstPT = {
                        _next: c._firstPT,
                        t: c,
                        p: c.length - 1,
                        s: a,
                        c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - a) || 0,
                        f: 0,
                        m: p && 4 > p ? Math.round : 0
                    }), f += u.length;
                    return (_ += e.substr(f)) && c.push(_), c.setRatio = z, c
                },
                X = function(t, e, i, r, n, s, a, o, l) {
                    "function" == typeof r && (r = r(l || 0, t));
                    var h, u = typeof t[e],
                        c = "function" !== u ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                        f = "get" !== i ? i : c ? a ? t[c](a) : t[c]() : t[e],
                        _ = "string" == typeof r && "=" === r.charAt(1),
                        p = {
                            t: t,
                            p: e,
                            s: f,
                            f: "function" === u,
                            pg: 0,
                            n: n || e,
                            m: s ? "function" == typeof s ? s : Math.round : 0,
                            pr: 0,
                            c: _ ? parseInt(r.charAt(0) + "1", 10) * parseFloat(r.substr(2)) : parseFloat(r) - f || 0
                        };
                    return ("number" != typeof f || "number" != typeof r && !_) && (a || isNaN(f) || !_ && isNaN(r) || "boolean" == typeof f || "boolean" == typeof r ? (p.fp = a, h = j(f, _ ? p.s + p.c : r, o || D.defaultStringFilter, p), p = {
                        t: h,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: n || e,
                        pr: 0,
                        m: 0
                    }) : (p.s = parseFloat(f), _ || (p.c = parseFloat(r) - p.s || 0))), p.c ? ((p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p) : void 0
                },
                B = D._internals = {
                    isArray: d,
                    isSelector: L,
                    lazyTweens: F,
                    blobDif: j
                },
                Y = D._plugins = {},
                q = B.tweenLookup = {},
                U = 0,
                V = B.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1
                },
                H = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                W = A._rootFramesTimeline = new M,
                G = A._rootTimeline = new M,
                Z = 30,
                Q = B.lazyRender = function() {
                    var t, e = F.length;
                    for (I = {}; --e > -1;)(t = F[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    F.length = 0
                };
            G._startTime = l.time, W._startTime = l.frame, G._active = W._active = !0, setTimeout(Q, 1), A._updateRoot = D.render = function() {
                var t, e, i;
                if (F.length && Q(), G.render((l.time - G._startTime) * G._timeScale, !1, !1), W.render((l.frame - W._startTime) * W._timeScale, !1, !1), F.length && Q(), l.frame >= Z) {
                    Z = l.frame + (parseInt(D.autoSleep, 10) || 120);
                    for (i in q) {
                        for (t = (e = q[i].tweens).length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete q[i]
                    }
                    if ((!(i = G._first) || i._paused) && D.autoSleep && !W._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", A._updateRoot);
            var $ = function(t, e, i) {
                    var r, n, s = t._gsTweenID;
                    if (q[s || (t._gsTweenID = s = "t" + U++)] || (q[s] = {
                            target: t,
                            tweens: []
                        }), e && (r = q[s].tweens, r[n = r.length] = e, i))
                        for (; --n > -1;) r[n] === e && r.splice(n, 1);
                    return q[s].tweens
                },
                J = function(t, e, i, r) {
                    var n, s, a = t.vars.onOverwrite;
                    return a && (n = a(t, e, i, r)), (a = D.onOverwrite) && (s = a(t, e, i, r)), !1 !== n && !1 !== s
                },
                K = function(t, e, i, r, n) {
                    var s, a, o, l;
                    if (1 === r || r >= 4) {
                        for (l = n.length, s = 0; l > s; s++)
                            if ((o = n[s]) !== e) o._gc || o._kill(null, t, e) && (a = !0);
                            else if (5 === r) break;
                        return a
                    }
                    var h, u = e._startTime + f,
                        c = [],
                        _ = 0,
                        p = 0 === e._duration;
                    for (s = n.length; --s > -1;)(o = n[s]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || tt(e, 0, p), 0 === tt(o, h, p) && (c[_++] = o)) : o._startTime <= u && o._startTime + o.totalDuration() / o._timeScale > u && ((p || !o._initted) && u - o._startTime <= 2e-10 || (c[_++] = o)));
                    for (s = _; --s > -1;)
                        if (o = c[s], 2 === r && o._kill(i, t, e) && (a = !0), 2 !== r || !o._firstPT && o._initted) {
                            if (2 !== r && !J(o, e)) continue;
                            o._enabled(!1, !1) && (a = !0)
                        }
                    return a
                },
                tt = function(t, e, i) {
                    for (var r = t._timeline, n = r._timeScale, s = t._startTime; r._timeline;) {
                        if (s += r._startTime, n *= r._timeScale, r._paused) return -100;
                        r = r._timeline
                    }
                    return s /= n, s > e ? s - e : i && s === e || !t._initted && 2 * f > s - e ? f : (s += t.totalDuration() / t._timeScale / n) > e + f ? 0 : s - e - f
                };
            o._init = function() {
                var t, e, i, r, n, s, a = this.vars,
                    o = this._overwrittenProps,
                    l = this._duration,
                    h = !!a.immediateRender,
                    u = a.ease;
                if (a.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), n = {};
                    for (r in a.startAt) n[r] = a.startAt[r];
                    if (n.overwrite = !1, n.immediateRender = !0, n.lazy = h && !1 !== a.lazy, n.startAt = n.delay = null, this._startAt = D.to(this.target, 0, n), h)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (a.runBackwards && 0 !== l)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (h = !1), i = {};
                        for (r in a) V[r] && "autoCSS" !== r || (i[r] = a[r]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== a.lazy, i.immediateRender = h, this._startAt = D.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = u = u ? u instanceof T ? u : "function" == typeof u ? new T(u, a.easeParams) : b[u] || D.defaultEase : D.defaultEase, a.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, a.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (s = this._targets.length, t = 0; s > t; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null, t) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, o, 0);
                if (e && D._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), a.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = a.onUpdate, this._initted = !0
            }, o._initProps = function(e, i, r, n, s) {
                var a, o, l, h, u, c;
                if (null == e) return !1;
                I[e._gsTweenID] && Q(), this.vars.css || e.style && e !== t && e.nodeType && Y.css && !1 !== this.vars.autoCSS && E(this.vars, e);
                for (a in this.vars)
                    if (c = this.vars[a], V[a]) c && (c instanceof Array || c.push && d(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[a] = c = this._swapSelfInParams(c, this));
                    else if (Y[a] && (h = new Y[a])._onInitTween(e, this.vars[a], this, s)) {
                    for (this._firstPT = u = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: a,
                            pg: 1,
                            pr: h._priority,
                            m: 0
                        }, o = h._overwriteProps.length; --o > -1;) i[h._overwriteProps[o]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), u._next && (u._next._prev = u)
                } else i[a] = X.call(this, e, a, "get", c, a, 0, null, this.vars.stringFilter, s);
                return n && this._kill(n, e) ? this._initProps(e, i, r, n, s) : this._overwrite > 1 && this._firstPT && r.length > 1 && K(e, this, i, this._overwrite, r) ? (this._kill(i, e), this._initProps(e, i, r, n, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (I[e._gsTweenID] = !0), l)
            }, o.render = function(t, e, i) {
                var r, n, s, a, o = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (r = !0, n = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > h || 0 >= t && t >= -1e-7 || h === f && "isPause" !== this.data) && h !== t && (i = !0, h > f && (n = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : f);
                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && h > 0) && (n = "onReverseComplete", r = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== f || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : f)), this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var u = t / l,
                        c = this._easeType,
                        _ = this._easePower;
                    (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === _ ? u *= u : 2 === _ ? u *= u * u : 3 === _ ? u *= u * u * u : 4 === _ && (u *= u * u * u * u), this.ratio = 1 === c ? 1 - u : 2 === c ? u : .5 > t / l ? u / 2 : 1 - u / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = h, F.push(this), void(this._lazy = [t, e]);
                        this._time && !r ? this.ratio = this._ease.getRatio(this._time / l) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (0 > t && this._startAt && -1e-4 !== t && this._startAt.render(t, e, i), e || (this._time !== o || r || i) && this._callback("onUpdate")), n && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, e, i), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this._callback(n), 0 === l && this._rawPrevTime === f && a !== f && (this._rawPrevTime = 0))
                }
            }, o._kill = function(t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
                var r, n, s, a, o, l, h, u, c, f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((d(e) || L(e)) && "number" != typeof e[0])
                    for (r = e.length; --r > -1;) this._kill(t, e[r], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (r = this._targets.length; --r > -1;)
                            if (e === this._targets[r]) {
                                o = this._propLookup[r] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[r] = t ? this._overwrittenProps[r] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        o = this._propLookup, n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (o) {
                        if (h = t || o, u = t !== n && "all" !== n && t !== o && ("object" != typeof t || !t._tempKill), i && (D.onOverwrite || this.vars.onOverwrite)) {
                            for (s in h) o[s] && (c || (c = []), c.push(s));
                            if ((c || !t) && !J(this, i, e, c)) return !1
                        }
                        for (s in h)(a = o[s]) && (f && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s, l = !0), a.pg && a.t._kill(h) && (l = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[s]), u && (n[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, o.invalidate = function() {
                return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], A.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -f, this.render(Math.min(0, -this._delay))), this
            }, o._enabled = function(t, e) {
                if (h || l.wake(), t && this._gc) {
                    var i, r = this._targets;
                    if (r)
                        for (i = r.length; --i > -1;) this._siblings[i] = $(r[i], this, !0);
                    else this._siblings = $(this.target, this, !0)
                }
                return A.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && D._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, D.to = function(t, e, i) {
                return new D(t, e, i)
            }, D.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i)
            }, D.fromTo = function(t, e, i, r) {
                return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, new D(t, e, r)
            }, D.delayedCall = function(t, e, i, r, n) {
                return new D(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: r,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: n,
                    overwrite: 0
                })
            }, D.set = function(t, e) {
                return new D(t, 0, e)
            }, D.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : D.selector(t) || t;
                var i, r, n, s;
                if ((d(t) || L(t)) && "number" != typeof t[0]) {
                    for (i = t.length, r = []; --i > -1;) r = r.concat(D.getTweensOf(t[i], e));
                    for (i = r.length; --i > -1;)
                        for (s = r[i], n = i; --n > -1;) s === r[n] && r.splice(i, 1)
                } else
                    for (r = $(t).concat(), i = r.length; --i > -1;)(r[i]._gc || e && !r[i].isActive()) && r.splice(i, 1);
                return r
            }, D.killTweensOf = D.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var r = D.getTweensOf(t, e), n = r.length; --n > -1;) r[n]._kill(i, t)
            };
            var et = y("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = et.prototype
            }, !0);
            if (o = et.prototype, et.version = "1.19.0", et.API = 2, o._firstPT = null, o._addTween = X, o.setRatio = z, o._kill = function(t) {
                    var e, i = this._overwriteProps,
                        r = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; r;) null != t[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)), r = r._next;
                    return !1
                }, o._mod = o._roundProps = function(t) {
                    for (var e, i = this._firstPT; i;)(e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
                }, D._onPluginEvent = function(t, e) {
                    var i, r, n, s, a, o = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; o;) {
                            for (a = o._next, r = n; r && r.pr > o.pr;) r = r._next;
                            (o._prev = r ? r._prev : s) ? o._prev._next = o: n = o, (o._next = r) ? r._prev = o : s = o, o = a
                        }
                        o = e._firstPT = n
                    }
                    for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                    return i
                }, et.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === et.API && (Y[(new t[e])._propName] = t[e]);
                    return !0
                }, v.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        r = t.priority || 0,
                        n = t.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        a = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            et.call(this, i, r), this._overwriteProps = n || []
                        }, !0 === t.global),
                        o = a.prototype = new et(i);
                    o.constructor = a, a.API = t.API;
                    for (e in s) "function" == typeof t[e] && (o[s[e]] = t[e]);
                    return a.version = t.version, et.activate([a]), a
                }, s = t._gsQueue) {
                for (a = 0; a < s.length; a++) s[a]();
                for (o in m) m[o].func || t.console.log("GSAP encountered missing dependency: " + o)
            }
            h = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"),
    function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("Barba", [], e) : "object" == typeof exports ? exports.Barba = e() : t.Barba = e()
    }(this, function() {
        return function(t) {
            function e(r) {
                if (i[r]) return i[r].exports;
                var n = i[r] = {
                    exports: {},
                    id: r,
                    loaded: !1
                };
                return t[r].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
            }
            var i = {};
            return e.m = t, e.c = i, e.p = "http://localhost:8080/dist", e(0)
        }([function(t, e, i) {
            "function" != typeof Promise && (window.Promise = i(1));
            var r = {
                version: "1.0.0",
                BaseTransition: i(4),
                BaseView: i(6),
                BaseCache: i(8),
                Dispatcher: i(7),
                HistoryManager: i(9),
                Pjax: i(10),
                Prefetch: i(13),
                Utils: i(5)
            };
            t.exports = r
        }, function(t, e, i) {
            (function(e) {
                ! function(i) {
                    function r() {}

                    function n(t, e) {
                        return function() {
                            t.apply(e, arguments)
                        }
                    }

                    function s(t) {
                        if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                        if ("function" != typeof t) throw new TypeError("not a function");
                        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], c(t, this)
                    }

                    function a(t, e) {
                        for (; 3 === t._state;) t = t._value;
                        0 !== t._state ? (t._handled = !0, _(function() {
                            var t = 1 === r._state ? e.onFulfilled : e.onRejected;
                            if (null !== t) {
                                var i;
                                try {
                                    i = t(r._value)
                                } catch (r) {
                                    return void l(e.promise, r)
                                }
                                o(e.promise, i)
                            } else(1 === r._state ? o : l)(e.promise, r._value)
                        })) : t._deferreds.push(e)
                    }

                    function o(t, e) {
                        try {
                            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
                            if (e && ("object" == typeof e || "function" == typeof e)) {
                                var i = e.then;
                                if (e instanceof s) return t._state = 3, t._value = e, void h(t);
                                if ("function" == typeof i) return void c(n(i, e), t)
                            }
                            t._state = 1, t._value = e, h(t)
                        } catch (e) {
                            l(t, e)
                        }
                    }

                    function l(t, e) {
                        t._state = 2, t._value = e, h(t)
                    }

                    function h(t) {
                        2 === t._state && 0 === t._deferreds.length && _(function() {
                            t._handled || p(t._value)
                        });
                        for (var e = 0, i = t._deferreds.length; i > e; e++) a(t, t._deferreds[e]);
                        t._deferreds = null
                    }

                    function u(t, e, i) {
                        this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = i
                    }

                    function c(t, e) {
                        var i = !1;
                        try {
                            t(function(t) {
                                i || (i = !0, o(e, t))
                            }, function(t) {
                                i || (i = !0, l(e, t))
                            })
                        } catch (t) {
                            if (i) return;
                            i = !0, l(e, t)
                        }
                    }
                    var f = setTimeout,
                        _ = "function" == typeof e && e || function(t) {
                            f(t, 0)
                        },
                        p = function(t) {
                            "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
                        };
                    s.prototype["catch"] = function(t) {
                        return this.then(null, t)
                    }, s.prototype.then = function(t, e) {
                        var i = new this.constructor(r);
                        return a(this, new u(t, e, i)), i
                    }, s.all = function(t) {
                        var e = Array.prototype.slice.call(t);
                        return new s(function(t, i) {
                            function r(t, s) {
                                try {
                                    if (s && ("object" == typeof s || "function" == typeof s)) {
                                        var a = s.then;
                                        if ("function" == typeof a) return void a.call(s, function(e) {
                                            r(t, e)
                                        }, i)
                                    }
                                    e[t] = s, 0 == --n && o(e)
                                } catch (o) {
                                    i(o)
                                }
                            }
                            if (0 === e.length) return t([]);
                            for (var n = e.length, s = 0; s < e.length; s++) r(s, e[s])
                        })
                    }, s.resolve = function(t) {
                        return t && "object" == typeof t && t.constructor === s ? t : new s(function(e) {
                            e(t)
                        })
                    }, s.reject = function(t) {
                        return new s(function(e, i) {
                            i(t)
                        })
                    }, s.race = function(t) {
                        return new s(function(e, i) {
                            for (var r = 0, n = t.length; n > r; r++) t[r].then(e, i)
                        })
                    }, s._setImmediateFn = function(t) {
                        _ = t
                    }, s._setUnhandledRejectionFn = function(t) {
                        p = t
                    }, void 0 !== t && t.exports ? t.exports = s : i.Promise || (i.Promise = s)
                }(this)
            }).call(e, i(2).setImmediate)
        }, function(t, e, i) {
            (function(t, r) {
                function n(t, e) {
                    this._id = t, this._clearFn = e
                }
                var s = i(3).nextTick,
                    a = Function.prototype.apply,
                    o = Array.prototype.slice,
                    l = {},
                    h = 0;
                e.setTimeout = function() {
                    return new n(a.call(setTimeout, window, arguments), clearTimeout)
                }, e.setInterval = function() {
                    return new n(a.call(setInterval, window, arguments), clearInterval)
                }, e.clearTimeout = e.clearInterval = function(t) {
                    t.close()
                }, n.prototype.unref = n.prototype.ref = function() {}, n.prototype.close = function() {
                    this._clearFn.call(window, this._id)
                }, e.enroll = function(t, e) {
                    clearTimeout(t._idleTimeoutId), t._idleTimeout = e
                }, e.unenroll = function(t) {
                    clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
                }, e._unrefActive = e.active = function(t) {
                    clearTimeout(t._idleTimeoutId);
                    var e = t._idleTimeout;
                    e >= 0 && (t._idleTimeoutId = setTimeout(function() {
                        t._onTimeout && t._onTimeout()
                    }, e))
                }, e.setImmediate = "function" == typeof t ? t : function(t) {
                    var i = h++,
                        r = !(arguments.length < 2) && o.call(arguments, 1);
                    return l[i] = !0, s(function() {
                        l[i] && (r ? t.apply(null, r) : t.call(null), e.clearImmediate(i))
                    }), i
                }, e.clearImmediate = "function" == typeof r ? r : function(t) {
                    delete l[t]
                }
            }).call(e, i(2).setImmediate, i(2).clearImmediate)
        }, function(t, e) {
            function i() {
                c && h && (c = !1, h.length ? u = h.concat(u) : f = -1, u.length && r())
            }

            function r() {
                if (!c) {
                    var t = a(i);
                    c = !0;
                    for (var e = u.length; e;) {
                        for (h = u, u = []; ++f < e;) h && h[f].run();
                        f = -1, e = u.length
                    }
                    h = null, c = !1, o(t)
                }
            }

            function n(t, e) {
                this.fun = t, this.array = e
            }

            function s() {}
            var a, o, l = t.exports = {};
            ! function() {
                try {
                    a = setTimeout
                } catch (t) {
                    a = function() {
                        throw new Error("setTimeout is not defined")
                    }
                }
                try {
                    o = clearTimeout
                } catch (t) {
                    o = function() {
                        throw new Error("clearTimeout is not defined")
                    }
                }
            }();
            var h, u = [],
                c = !1,
                f = -1;
            l.nextTick = function(t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
                u.push(new n(t, e)), 1 !== u.length || c || a(r, 0)
            }, n.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = s, l.addListener = s, l.once = s, l.off = s, l.removeListener = s, l.removeAllListeners = s, l.emit = s, l.binding = function(t) {
                throw new Error("process.binding is not supported")
            }, l.cwd = function() {
                return "/"
            }, l.chdir = function(t) {
                throw new Error("process.chdir is not supported")
            }, l.umask = function() {
                return 0
            }
        }, function(t, e, i) {
            var r = i(5),
                n = {
                    oldContainer: void 0,
                    newContainer: void 0,
                    newContainerLoading: void 0,
                    extend: function(t) {
                        return r.extend(this, t)
                    },
                    init: function(t, e) {
                        var i = this;
                        return this.oldContainer = t, this._newContainerPromise = e, this.deferred = r.deferred(), this.newContainerReady = r.deferred(), this.newContainerLoading = this.newContainerReady.promise, this.start(), this._newContainerPromise.then(function(t) {
                            i.newContainer = t, i.newContainerReady.resolve()
                        }), this.deferred.promise
                    },
                    done: function() {
                        this.oldContainer.parentNode.removeChild(this.oldContainer), this.newContainer.style.visibility = "visible", this.deferred.resolve()
                    },
                    start: function() {}
                };
            t.exports = n
        }, function(t, e) {
            var i = {
                getCurrentUrl: function() {
                    return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
                },
                cleanLink: function(t) {
                    return t.replace(/#.*/, "")
                },
                xhrTimeout: 5e3,
                xhr: function(t) {
                    var e = this.deferred(),
                        i = new XMLHttpRequest;
                    return i.onreadystatechange = function() {
                        return 4 === i.readyState ? 200 === i.status ? e.resolve(i.responseText) : e.reject(new Error("xhr: HTTP code is not 200")) : void 0
                    }, i.ontimeout = function() {
                        return e.reject(new Error("xhr: Timeout exceeded"))
                    }, i.open("GET", t), i.timeout = this.xhrTimeout, i.setRequestHeader("x-barba", "yes"), i.send(), e.promise
                },
                extend: function(t, e) {
                    var i = Object.create(t);
                    for (var r in e) e.hasOwnProperty(r) && (i[r] = e[r]);
                    return i
                },
                deferred: function() {
                    return new function() {
                        this.resolve = null, this.reject = null, this.promise = new Promise(function(t, e) {
                            this.resolve = t, this.reject = e
                        }.bind(this))
                    }
                },
                getPort: function(t) {
                    var e = void 0 !== t ? t : window.location.port,
                        i = window.location.protocol;
                    return "" != e ? parseInt(e) : "http:" === i ? 80 : "https:" === i ? 443 : void 0
                }
            };
            t.exports = i
        }, function(t, e, i) {
            var r = i(7),
                n = i(5),
                s = {
                    namespace: null,
                    extend: function(t) {
                        return n.extend(this, t)
                    },
                    init: function() {
                        var t = this;
                        r.on("initStateChange", function(e, i) {
                            i && i.namespace === t.namespace && t.onLeave()
                        }), r.on("newPageReady", function(e, i, r) {
                            t.container = r, e.namespace === t.namespace && t.onEnter()
                        }), r.on("transitionCompleted", function(e, i) {
                            e.namespace === t.namespace && t.onEnterCompleted(), i && i.namespace === t.namespace && t.onLeaveCompleted()
                        })
                    },
                    onEnter: function() {},
                    onEnterCompleted: function() {},
                    onLeave: function() {},
                    onLeaveCompleted: function() {}
                };
            t.exports = s
        }, function(t, e) {
            var i = {
                events: {},
                on: function(t, e) {
                    this.events[t] = this.events[t] || [], this.events[t].push(e)
                },
                off: function(t, e) {
                    t in this.events != 0 && this.events[t].splice(this.events[t].indexOf(e), 1)
                },
                trigger: function(t) {
                    if (t in this.events != 0)
                        for (var e = 0; e < this.events[t].length; e++) this.events[t][e].apply(this, Array.prototype.slice.call(arguments, 1))
                }
            };
            t.exports = i
        }, function(t, e, i) {
            var r = i(5),
                n = {
                    data: {},
                    extend: function(t) {
                        return r.extend(this, t)
                    },
                    set: function(t, e) {
                        this.data[t] = e
                    },
                    get: function(t) {
                        return this.data[t]
                    },
                    reset: function() {
                        this.data = {}
                    }
                };
            t.exports = n
        }, function(t, e) {
            var i = {
                history: [],
                add: function(t, e) {
                    e || (e = void 0), this.history.push({
                        url: t,
                        namespace: e
                    })
                },
                currentStatus: function() {
                    return this.history[this.history.length - 1]
                },
                prevStatus: function() {
                    var t = this.history;
                    return t.length < 2 ? null : t[t.length - 2]
                }
            };
            t.exports = i
        }, function(t, e, i) {
            var r = i(5),
                n = i(7),
                s = i(11),
                a = i(8),
                o = i(9),
                l = {
                    Dom: i(12),
                    History: o,
                    Cache: a,
                    cacheEnabled: !0,
                    transitionProgress: !1,
                    ignoreClassLink: "no-pjax",
                    start: function() {
                        this.init()
                    },
                    init: function() {
                        var t = this.Dom.getContainer();
                        this.Dom.getWrapper().setAttribute("aria-live", "polite"), this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(t)), n.trigger("initStateChange", this.History.currentStatus()), n.trigger("newPageReady", this.History.currentStatus(), {}, t, this.Dom.currentHTML), n.trigger("transitionCompleted", this.History.currentStatus()), this.bindEvents()
                    },
                    bindEvents: function() {
                        document.addEventListener("click", this.onLinkClick.bind(this)), window.addEventListener("popstate", this.onStateChange.bind(this))
                    },
                    getCurrentUrl: function() {
                        return r.cleanLink(r.getCurrentUrl())
                    },
                    goTo: function(t) {
                        window.history.pushState(null, null, t), this.onStateChange()
                    },
                    forceGoTo: function(t) {
                        window.location = t
                    },
                    load: function(t) {
                        var e, i = r.deferred(),
                            n = this;
                        return (e = this.Cache.get(t)) || (e = r.xhr(t), this.Cache.set(t, e)), e.then(function(t) {
                            var e = n.Dom.parseResponse(t);
                            n.Dom.putContainer(e), n.cacheEnabled || n.Cache.reset(), i.resolve(e);
                        }, function() {
                            n.forceGoTo(t), i.reject()
                        }), i.promise
                    },
                    getHref: function(t) {
                        return t ? t.getAttribute && "string" == typeof t.getAttribute("xlink:href") ? t.getAttribute("xlink:href") : "string" == typeof t.href ? t.href : void 0 : void 0
                    },
                    onLinkClick: function(t) {
                        for (var e = t.target; e && !this.getHref(e);) e = e.parentNode;
                        if (this.preventCheck(t, e)) {
                            t.stopPropagation(), t.preventDefault(), n.trigger("linkClicked", e, t);
                            var i = this.getHref(e);
                            this.goTo(i)
                        }
                    },
                    preventCheck: function(t, e) {
                        if (!window.history.pushState) return !1;
                        var i = this.getHref(e);
                        return !(!e || !i || t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || e.target && "_blank" === e.target || window.location.protocol !== e.protocol || window.location.hostname !== e.hostname || r.getPort() !== r.getPort(e.port) || i.indexOf("#") > -1 || e.getAttribute && "string" == typeof e.getAttribute("download") || r.cleanLink(i) == r.cleanLink(location.href) || e.classList.contains(this.ignoreClassLink))
                    },
                    getTransition: function() {
                        return s
                    },
                    onStateChange: function() {
                        var t = this.getCurrentUrl();
                        if (this.transitionProgress && this.forceGoTo(t), this.History.currentStatus().url === t) return !1;
                        this.History.add(t);
                        var e = this.load(t),
                            i = Object.create(this.getTransition());
                        this.transitionProgress = !0, n.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
                        var r = i.init(this.Dom.getContainer(), e);
                        e.then(this.onNewContainerLoaded.bind(this)), r.then(this.onTransitionEnd.bind(this))
                    },
                    onNewContainerLoaded: function(t) {
                        this.History.currentStatus().namespace = this.Dom.getNamespace(t), n.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), t, this.Dom.currentHTML)
                    },
                    onTransitionEnd: function() {
                        this.transitionProgress = !1, n.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus())
                    }
                };
            t.exports = l
        }, function(t, e, i) {
            var r = i(4).extend({
                start: function() {
                    this.newContainerLoading.then(this.finish.bind(this))
                },
                finish: function() {
                    document.body.scrollTop = 0, this.done()
                }
            });
            t.exports = r
        }, function(t, e) {
            var i = {
                dataNamespace: "namespace",
                wrapperId: "js-pjax-cont",
                containerClass: "container",
                currentHTML: document.documentElement.innerHTML,
                parseResponse: function(t) {
                    this.currentHTML = t;
                    var e = document.createElement("div");
                    e.innerHTML = t;
                    var i = e.querySelector("title");
                    return i && (document.title = i.textContent), this.getContainer(e)
                },
                getWrapper: function() {
                    var t = document.getElementById(this.wrapperId);
                    if (!t) throw new Error("Barba.js: wrapper not found!");
                    return t
                },
                getContainer: function(t) {
                    if (t || (t = document.body), !t) throw new Error("Barba.js: DOM not ready!");
                    var e = this.parseContainer(t);
                    if (e && e.jquery && (e = e[0]), !e) throw new Error("Barba.js: no container found");
                    return e
                },
                getNamespace: function(t) {
                    return t && t.dataset ? t.dataset[this.dataNamespace] : t ? t.getAttribute("data-" + this.dataNamespace) : null
                },
                putContainer: function(t) {
                    t.style.visibility = "hidden", this.getWrapper().appendChild(t)
                },
                parseContainer: function(t) {
                    return t.querySelector("." + this.containerClass)
                }
            };
            t.exports = i
        }, function(t, e, i) {
            var r = i(5),
                n = i(10),
                s = {
                    ignoreClassLink: "no-barba-prefetch",
                    init: function() {
                        return window.history.pushState ? (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), void document.body.addEventListener("touchstart", this.onLinkEnter.bind(this))) : !1
                    },
                    onLinkEnter: function(t) {
                        TweenLite.to("#pjax-cont", .7, {
                            y: "-20px",
                            opacity: 0
                        });
                        for (var e = t.target; e && !n.getHref(e);) e = e.parentNode;
                        if (e && !e.classList.contains(this.ignoreClassLink)) {
                            var i = n.getHref(e);
                            if (n.preventCheck(t, e) && !n.Cache.get(i)) {
                                var s = r.xhr(i);
                                n.Cache.set(i, s)
                            }
                        }
                    }
                };
            t.exports = s
        }])
    }), ((_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window)._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        var t, e, i = /(\d|\.)+/g,
            r = ["redMultiplier", "greenMultiplier", "blueMultiplier", "alphaMultiplier", "redOffset", "greenOffset", "blueOffset", "alphaOffset"],
            n = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            s = function(t) {
                return "" === t || null == t || "none" === t ? n.transparent : n[t] ? n[t] : "number" == typeof t ? [t >> 16, t >> 8 & 255, 255 & t] : "#" === t.charAt(0) ? (4 === t.length && (t = "#" + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2) + t.charAt(3) + t.charAt(3)), t = parseInt(t.substr(1), 16), [t >> 16, t >> 8 & 255, 255 & t]) : t.match(i) || n.transparent
            },
            a = function(e, i, n) {
                if (!t && !(t = _gsScope.ColorFilter || _gsScope.createjs.ColorFilter)) throw "EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.";
                for (var a, o, l, h, u, c = e.filters || [], f = c.length; --f > -1;)
                    if (c[f] instanceof t) {
                        o = c[f];
                        break
                    }
                if (o || (o = new t, c.push(o), e.filters = c), l = o.clone(), null != i.tint) a = s(i.tint), h = null != i.tintAmount ? Number(i.tintAmount) : 1, l.redOffset = Number(a[0]) * h, l.greenOffset = Number(a[1]) * h, l.blueOffset = Number(a[2]) * h, l.redMultiplier = l.greenMultiplier = l.blueMultiplier = 1 - h;
                else
                    for (u in i) "exposure" !== u && "brightness" !== u && (l[u] = Number(i[u]));
                for (null != i.exposure ? (l.redOffset = l.greenOffset = l.blueOffset = 255 * (Number(i.exposure) - 1), l.redMultiplier = l.greenMultiplier = l.blueMultiplier = 1) : null != i.brightness && (h = Number(i.brightness) - 1, l.redOffset = l.greenOffset = l.blueOffset = h > 0 ? 255 * h : 0, l.redMultiplier = l.greenMultiplier = l.blueMultiplier = 1 - Math.abs(h)), f = 8; --f > -1;) u = r[f], o[u] !== l[u] && n._addTween(o, u, o[u], l[u], "easel_colorFilter");
                if (n._overwriteProps.push("easel_colorFilter"), !e.cacheID) throw "EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + e
            },
            o = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
            l = .212671,
            h = .71516,
            u = .072169,
            c = function(t, e) {
                if (!(t instanceof Array && e instanceof Array)) return e;
                var i, r, n = [],
                    s = 0,
                    a = 0;
                for (i = 0; 4 > i; i++) {
                    for (r = 0; 5 > r; r++) a = 4 === r ? t[s + 4] : 0, n[s + r] = t[s] * e[r] + t[s + 1] * e[r + 5] + t[s + 2] * e[r + 10] + t[s + 3] * e[r + 15] + a;
                    s += 5
                }
                return n
            },
            f = function(t, e) {
                if (isNaN(e)) return t;
                var i = 1 - e,
                    r = i * l,
                    n = i * h,
                    s = i * u;
                return c([r + e, n, s, 0, 0, r, n + e, s, 0, 0, r, n, s + e, 0, 0, 0, 0, 0, 1, 0], t)
            },
            _ = function(t, e, i) {
                isNaN(i) && (i = 1);
                var r = s(e),
                    n = r[0] / 255,
                    a = r[1] / 255,
                    o = r[2] / 255,
                    f = 1 - i;
                return c([f + i * n * l, i * n * h, i * n * u, 0, 0, i * a * l, f + i * a * h, i * a * u, 0, 0, i * o * l, i * o * h, f + i * o * u, 0, 0, 0, 0, 0, 1, 0], t)
            },
            p = function(t, e) {
                if (isNaN(e)) return t;
                e *= Math.PI / 180;
                var i = Math.cos(e),
                    r = Math.sin(e);
                return c([l + i * (1 - l) + r * -l, h + i * -h + r * -h, u + i * -u + r * (1 - u), 0, 0, l + i * -l + .143 * r, h + i * (1 - h) + .14 * r, u + i * -u + -.283 * r, 0, 0, l + i * -l + r * -(1 - l), h + i * -h + r * h, u + i * (1 - u) + r * u, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], t)
            },
            d = function(t, e) {
                return isNaN(e) ? t : (e += .01, c([e, 0, 0, 0, 128 * (1 - e), 0, e, 0, 0, 128 * (1 - e), 0, 0, e, 0, 128 * (1 - e), 0, 0, 0, 1, 0], t))
            },
            m = function(t, i, r) {
                if (!e && !(e = _gsScope.ColorMatrixFilter || _gsScope.createjs.ColorMatrixFilter)) throw "EaselPlugin error: The EaselJS ColorMatrixFilter JavaScript file wasn't loaded.";
                for (var n, s, a, l = t.filters || [], h = l.length; --h > -1;)
                    if (l[h] instanceof e) {
                        a = l[h];
                        break
                    }
                for (a || (a = new e(o.slice()), l.push(a), t.filters = l), s = a.matrix, n = o.slice(), null != i.colorize && (n = _(n, i.colorize, Number(i.colorizeAmount))), null != i.contrast && (n = d(n, Number(i.contrast))), null != i.hue && (n = p(n, Number(i.hue))), null != i.saturation && (n = f(n, Number(i.saturation))), h = n.length; --h > -1;) n[h] !== s[h] && r._addTween(s, h, s[h], n[h], "easel_colorMatrixFilter");
                if (r._overwriteProps.push("easel_colorMatrixFilter"), !t.cacheID) throw "EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t;
                r._matrix = s
            };
        _gsScope._gsDefine.plugin({
            propName: "easel",
            priority: -1,
            version: "0.2.1",
            API: 2,
            init: function(t, e, i, r) {
                this._target = t;
                var n, s, o, l, h, u, c;
                for (n in e)
                    if ("function" == typeof(h = e[n]) && (h = h(r, t)), "colorFilter" === n || "tint" === n || "tintAmount" === n || "exposure" === n || "brightness" === n) o || (a(t, e.colorFilter || e, this), o = !0);
                    else if ("saturation" === n || "contrast" === n || "hue" === n || "colorize" === n || "colorizeAmount" === n) l || (m(t, e.colorMatrixFilter || e, this), l = !0);
                else if ("frame" === n) {
                    if (this._firstPT = s = {
                            _next: this._firstPT,
                            t: t,
                            p: "gotoAndStop",
                            s: t.currentFrame,
                            f: !0,
                            n: "frame",
                            pr: 0,
                            type: 0,
                            m: Math.round
                        }, "string" == typeof h && "=" !== h.charAt(1) && (u = t.labels))
                        for (c = 0; c < u.length; c++) u[c].label === h && (h = u[c].position);
                    s.c = "number" == typeof h ? h - s.s : parseFloat((h + "").split("=").join("")), s._next && (s._next._prev = s)
                } else null != t[n] && (this._firstPT = s = {
                    _next: this._firstPT,
                    t: t,
                    p: n,
                    f: "function" == typeof t[n],
                    n: n,
                    pr: 0,
                    type: 0
                }, s.s = s.f ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), s.c = "number" == typeof h ? h - s.s : "string" == typeof h ? parseFloat(h.split("=").join("")) : 0, s._next && (s._next._prev = s));
                return !0
            },
            set: function(t) {
                for (var e, i = this._firstPT; i;) e = i.c * t + i.s, i.m ? e = i.m(e, i.t) : 1e-6 > e && e > -1e-6 && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next;
                this._target.cacheID && this._target.updateCache()
            }
        })
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope).EaselPlugin
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = e())
    }();