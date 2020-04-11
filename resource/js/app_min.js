"use strict";
var project = function() {
    var t, e = {
            body: document.body,
            window: window,
            jsScroll: document.querySelector("#js-scroll"),
            fv: $("#fv"),
            navRight: $("#nav-right"),
            toProject: $(".to-project"),
            navWrap: document.getElementById("js-nav-wrap"),
            projectImg: $(".js-project-img"),
            ttlHover: $(".js-ttl-hover"),
            footer: $("#footer"),
            menuProject: $("#menu-project"),
            pjaxCont: $("#js-pjax-cont"),
            jsMove: $("#js-move"),
            layer: $("#js-layer"),
            url: document.URL,
            breakPoint: 768
        },
        n = ["#panel01", "#panel02", "#panel03"],
        a = e.window.innerWidth,
        o = e.window.innerHeight,
        r = !0,
        i = 0,
        s = 0,
        l = 0,
        c = .1,
        p = 0,
        u = 0,
        m = 0,
        g = 0,
        d = !0,
        f = 0;
    e.breakPoint >= a && (d = !1);
    var y = {
            top: function() {
                var t = new IntersectionObserver(function(t) {
                        var e = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var r = void 0, i = t[Symbol.iterator](); !(e = (r = i.next()).done); e = !0) {
                                var s = r.value,
                                    l = s.target.getBoundingClientRect();
                                0 < l.top && l.top < o || 0 < l.bottom && l.bottom < o || 0 > l.top && l.bottom > o ? s.target.classList.remove("is-ready") : s.target.classList.add("is-ready")
                            }
                        } catch (t) {
                            n = !0, a = t
                        } finally {
                            try {
                                e || null == i.return || i.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                    }),
                    e = document.querySelector(".js-footer-in");
                t.observe(e)
            },
            project: function() {
                if (d) {
                    var t = new IntersectionObserver(function(t) {
                            var e = !0,
                                n = !1,
                                a = void 0;
                            try {
                                for (var r = void 0, i = t[Symbol.iterator](); !(e = (r = i.next()).done); e = !0) {
                                    var s = r.value,
                                        l = s.target.getBoundingClientRect();
                                    0 < l.top && l.top < o || 0 < l.bottom && l.bottom < o || 0 > l.top && l.bottom > o ? s.target.play() : (s.target.pause(), s.target.currentTime = 0)
                                }
                            } catch (t) {
                                n = !0, a = t
                            } finally {
                                try {
                                    e || null == i.return || i.return()
                                } finally {
                                    if (n) throw a
                                }
                            }
                        }),
                        e = document.querySelectorAll(".video"),
                        n = !0,
                        a = !1,
                        r = void 0;
                    try {
                        for (var i = void 0, s = e[Symbol.iterator](); !(n = (i = s.next()).done); n = !0) {
                            var l = i.value;
                            t.observe(l)
                        }
                    } catch (t) {
                        a = !0, r = t
                    } finally {
                        try {
                            n || null == s.return || s.return()
                        } finally {
                            if (a) throw r
                        }
                    }
                }
                var c = new IntersectionObserver(function(t) {
                        var e = !0,
                            n = !1,
                            a = void 0;
                        try {
                            for (var r = void 0, i = t[Symbol.iterator](); !(e = (r = i.next()).done); e = !0) {
                                var s = r.value,
                                    l = s.target.getBoundingClientRect();
                                0 < l.top && l.top < o || 0 < l.bottom && l.bottom < o || 0 > l.top && l.bottom > o ? s.target.classList.remove("is-ready") : s.target.classList.add("is-ready")
                            }
                        } catch (t) {
                            n = !0, a = t
                        } finally {
                            try {
                                e || null == i.return || i.return()
                            } finally {
                                if (n) throw a
                            }
                        }
                    }),
                    p = document.querySelector(".js-next-in");
                c.observe(p)
            }
        },
        v = {
            pageTop: function() {
                var n = {};
                n.prototype = {
                    elm: $(".js-parallax"),
                    img: $(".js-parallax-img"),
                    clip: $(".js-ttl-clip"),
                    circle: $("#js-circle")
                };
                var a = function() {
                    t = requestAnimationFrame(a), m += (p - m) * c, g = e.jsScroll.getBoundingClientRect().height - 1, document.body.style.height = Math.floor(g) + "px", u = "translateY(-" + Math.floor(m) + "px) translateZ(0)", e.jsScroll.style.webkitTransform = u, e.jsScroll.style.transform = u;
                    v.pageTopParallax(n)
                };
                a()
            },
            pageTopParallax: function(t) {
                var n = function() {
                    var t = 1 + .002 * -m,
                        n = 1.3 * -(g - e.footer.outerHeight(!0) - m);
                    e.fv.css("opacity", Math.max(0, t)), TweenLite.set(this.circle, {
                        y: Math.min(0, n - 120) + "px"
                    });
                    for (var r = 0; r < this.elm.length; r++) {
                        var i = this.elm[r].getBoundingClientRect();
                        if (o > i.top && i.bottom > 0) {
                            var s = "translateY(" + -.15 * i.top + "px) translateZ(0)";
                            this.img[r].style.webkitTransform = s, this.img[r].style.transform = s
                        }
                        o > i.top && i.bottom > 0 ? (this.elm[r].classList.remove("is-ready"), this.clip[r].style.clip = "rect(" + i.top + "px " + a + "px " + i.bottom + "px 0)") : (this.elm[r].classList.add("is-ready"), this.clip[r].style.clip = "rect(0 0 0 0)")
                    }
                };
                return n.prototype = t.prototype, new n
            },
            pageAbout: function() {
                var n = {};
                n.prototype = {
                    bgType: $("#js-bg-type")
                };
                var a = function() {
                    t = requestAnimationFrame(a), m += (p - m) * c, g = e.jsScroll.getBoundingClientRect().height - 1, document.body.style.height = Math.floor(g) + "px", u = "translateY(-" + Math.floor(m) + "px) translateZ(0)", e.jsScroll.style.webkitTransform = u, e.jsScroll.style.transform = u;
                    v.pageAboutParallax(n)
                };
                a()
            },
            pageAboutParallax: function(t) {
                var e = function() {
                    TweenLite.set(this.bgType, {
                        x: -.2 * m + "px"
                    })
                };
                return e.prototype = t.prototype, new e
            },
            pageProject: function() {
                var n = {};
                n.prototype = {
                    elm: $(".js-parallax"),
                    img: $(".js-parallax-img"),
                    mainImg: $("#js-main-img"),
                    topOpacity: $("#js-top-opacity"),
                    clip: $(".js-nav-clip"),
                    spParallax: $("#js-sp-parallax")
                };
                var a = function() {
                    t = requestAnimationFrame(a), m += (p - m) * c, g = e.jsScroll.getBoundingClientRect().height - 1, document.body.style.height = Math.floor(g) + "px", u = "translateY(-" + Math.floor(m) + "px) translateZ(0)", e.jsScroll.style.webkitTransform = u, e.jsScroll.style.transform = u;
                    v.pageProjectParallax(n)
                };
                a()
            },
            pageProjectParallax: function(t) {
                var e = function() {
                    var t = this.mainImg[0].getBoundingClientRect(),
                        e = t.height - m,
                        n = 1 + .003 * -m,
                        r = Math.floor(g - m - o),
                        i = Math.max(0, 100 - r / (.48 * a) * 100),
                        s = 1 + r / (.48 * a) * .1;
                    if (TweenMax.to("#next-panel01", .4, {
                            x: -i + "%"
                        }), TweenMax.to("#next-panel02", .4, {
                            x: -1.05 * i + "%"
                        }), TweenMax.to("#next-panel03", .4, {
                            x: -1.1 * i + "%"
                        }), TweenLite.to("#js-next-img", .4, {
                            scale: s
                        }), TweenMax.set(this.mainImg[0], {
                            y: Math.max(-50, -.05 * m),
                            z: 0
                        }), TweenMax.set(this.topOpacity[0], {
                            opacity: Math.max(0, n)
                        }), this.clip[0].style.clip = "rect(0 " + a + "px " + e + "px 0)", $("#js-area-sp").length) {
                        var l = document.getElementById("js-area-sp").getBoundingClientRect(),
                            c = .04 * (o - l.top);
                        this.spParallax[0].style.webkitTransform = "translateY(" + c + "px) translateZ(0)", this.spParallax[0].style.transform = "translateY(" + c + "px) translateZ(0)"
                    }
                    for (var p = 0; p < this.elm.length; p++) {
                        var u = this.elm[p].getBoundingClientRect();
                        if (o > u.top && u.bottom > 0) {
                            var d = "translateY(" + -.15 * u.top + "px) translateZ(0)";
                            this.img[p].style.webkitTransform = d, this.img[p].style.transform = d
                        }
                    }
                };
                return e.prototype = t.prototype, new e
            }
        },
        h = function() {
            $(window).on("scroll", function() {
                if (p = $(this).scrollTop(), !d && $(".page-project").length) {
                    var t = document.querySelector(".js-nav-clip"),
                        e = $("#js-main-img").outerHeight(!0) + $("#js-top-opacity").outerHeight(!0) - p;
                    t.style.clip = "rect(0 " + a + "px " + e + "px 0)"
                }
            }), d && ($(".page-top").length ? v.pageTop() : $(".page-about").length ? v.pageAbout() : $(".page-project").length && v.pageProject())
        },
        j = {
            cusor: function() {
                e.window.addEventListener("mousemove", function(t) {
                    var e = t.pageX,
                        n = t.pageY - m;
                    TweenMax.to("#js-cusor", .4, {
                        x: e,
                        y: n
                    })
                })
            },
            imgHover: function() {
                e.projectImg.on("mouseenter mouseleave", function(t) {
                    var e = $(this).index();
                    "mouseenter" === t.type ? ($("#js-cusor").addClass("is-in"), $(".js-ttl-clip").eq(e).addClass("is-current")) : ($("#js-cusor").removeClass("is-in"), $(".js-ttl-clip").eq(e).removeClass("is-current"))
                })
            }
        },
        x = function() {
            var r = !1,
                i = function() {
                    r = !0
                },
                s = function() {
                    r && (r = !1, a = e.window.innerWidth, o = e.window.innerHeight, e.breakPoint >= a ? (d = !1, cancelAnimationFrame(t), TweenLite.set(n, {
                        x: "-100%",
                        y: "0%"
                    }), e.jsScroll.style.webkitTransform = "translateY(0) translateZ(0)", e.jsScroll.style.transform = "translateY(0) translateZ(0)", e.fv.attr("style", "")) : d || (d = !0, TweenLite.set(n, {
                        x: "0%",
                        y: "-100%"
                    }), h()))
                };
            setInterval(s, .024), window.addEventListener("resize", i)
        },
        w = function() {
            var e;
            Barba.Pjax.init(), Barba.Prefetch.init(), Barba.Dispatcher.on("linkClicked", function(n) {
                cancelAnimationFrame(t), $("#js-cusor").removeClass("is-in"), $(".js-ttl-hover").addClass("is-out"), TweenMax.fromTo(".js-panel", 1, {
                    y: "-100%"
                }, {
                    y: "0%",
                    delay: .4
                }), e = n;
                $(n)
            }), Barba.Dispatcher.on("initStateChange", function(e) {
                ga("send", "pageview", location.pathname), cancelAnimationFrame(t)
            }), Barba.Dispatcher.on("newPageReady", function(e, n, a) {
                ga("send", "pageview", location.pathname), cancelAnimationFrame(t)
            }), Barba.Dispatcher.on("transitionCompleted", function() {
                cancelAnimationFrame(t), x(), b.initlet(), b.layerOut(), h(), b.initCont()
            });
            var n = Barba.BaseTransition.extend({
                    start: function() {
                        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this))
                    },
                    fadeOut: function() {
                        var t = Barba.Utils.deferred();
                        return a.fadeOut(t), t.promise
                    },
                    fadeIn: function() {
                        var t = this,
                            e = $(this.oldContainer),
                            n = $(this.newContainer);
                        a.fadeIn(e, n, t)
                    }
                }),
                a = {
                    fadeOut: function(t) {
                        b.layerIn(), setTimeout(function() {
                            t.resolve(), $("html,body").animate({
                                scrollTop: 0
                            }, 10)
                        }, 1600)
                    },
                    fadeIn: function(t, e, n) {
                        t.hide(), n.done()
                    }
                };
            Barba.Pjax.getTransition = function() {
                return n
            }
        },
        b = {
            initlet: function() {
                e = {
                    body: document.body,
                    window: window,
                    jsScroll: document.querySelector("#js-scroll"),
                    fv: $("#fv"),
                    navRight: $("#nav-right"),
                    toProject: $(".to-project"),
                    navWrap: document.getElementById("js-nav-wrap"),
                    projectImg: $(".js-project-img"),
                    ttlHover: $(".js-ttl-hover"),
                    footer: $("#footer"),
                    menuProject: $("#menu-project"),
                    pjaxCont: $("#js-pjax-cont"),
                    jsMove: $("#js-move"),
                    layer: $("#js-layer"),
                    url: document.URL,
                    breakPoint: 768
                }, n = ["#panel01", "#panel02", "#panel03"], a = e.window.innerWidth, o = e.window.innerHeight, r = !0, i = 0, s = 0, l = 0, c = .1, p = 0, u = 0, m = 0, g = 0, f = 0
            },
            layerIn: function(t) {
                d ? (TweenLite.set(n, {
                    y: "100%"
                }), TweenMax.staggerTo(n, 1.2, {
                    y: "0%",
                    ease: Expo.easeInOut
                }, .02)) : (TweenLite.set(n, {
                    x: "100%"
                }), TweenMax.staggerTo(n, 1.2, {
                    x: "0%",
                    ease: Expo.easeInOut
                }, .02))
            },
            layerOut: function() {
                d ? TweenMax.staggerTo(n, 1.2, {
                    y: "-100%",
                    delay: .4,
                    ease: Expo.easeInOut
                }, .02) : TweenMax.staggerTo(n, 1.2, {
                    x: "-100%",
                    delay: .4,
                    ease: Expo.easeInOut
                }, .02), $(".page-project").length && (TweenLite.set("#js-main-img img", {
                    y: "-30px"
                }), TweenLite.to("#js-main-img img", 1.6, {
                    y: "0px",
                    delay: .4,
                    ease: Power4.easeInOut
                })), setTimeout(function() {
                    $(".js-txt-in").removeClass("is-ready")
                }, 900)
            },
            initCont: function() {
                $(".page-top").length ? ($("#js-cusor").css("display", "block"), j.cusor(), j.imgHover(), y.top(), b.layerOut()) : $(".page-about").length ? ($("#js-cusor").css("display", "none"), b.layerOut()) : $(".page-project").length && ($("#js-cusor").css("display", "none"), b.layerOut(), y.project())
            }
        },
        T = function() {
            x(), w(), b.initCont(), h()
        };
    ! function() {
        ! function() {
            var t = $("#progress"),
                e = $("#progress .num"),
                n = imagesLoaded("body"),
                a = n.images.length,
                o = 0,
                r = 0;
            n.on("progress", function() {
                o++
            });
            var i = function() {
                    r += .1 * (o / a * 100 - r), e.text(Math.floor(r)), r >= 100 && (clearInterval(s), setTimeout(function() {
                        t.addClass("is-hide"), T()
                    }, 400)), r > 99.9 && (r = 100)
                },
                s = setInterval(i, 1e3 / 60)
        }()
    }()
};
project();