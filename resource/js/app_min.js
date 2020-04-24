"use strict";

function createHeading() {
    let imgSize = [3200, 2400];

    const vertex = `
					attribute vec2 uv;
					attribute vec2 position;
					varying vec2 vUv;
					void main() {
							vUv = uv;
							gl_Position = vec4(position, 0, 1);
					}
			`;
    const fragment = `
					precision highp float;
					precision highp int;
					uniform sampler2D tWater;
					uniform sampler2D tFlow;
					uniform float uTime;
					varying vec2 vUv;
					uniform vec4 res;

					void main() {

							// R and G values are velocity in the x and y direction
							// B value is the velocity length
							vec3 flow = texture2D(tFlow, vUv).rgb;

              vec2 uv = .5 * gl_FragCoord.xy / res.xy ;

              vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);
              myUV -= flow.xy * (0.15 * 0.5);
              vec3 tex = texture2D(tWater, myUV).rgb;

              gl_FragColor.rgb = vec3(tex.r, tex.g, tex.b);
              gl_FragColor.a = tex.r;
					}
			`;
    {
      const renderer = new ogl.Renderer({
        dpr: 2,
        alpha: true,
        premultipliedAlpha: true
      });
      const gl = renderer.gl;
      gl.canvas.classList.add("heading");
      gl.canvas.classList.add("is-hide");
      const fv = document.getElementById("fv");
      fv.appendChild(gl.canvas);

      const isTouchCapable = "ontouchstart" in window;

      // Variable inputs to control flowmap
      let aspect = 1;
      const mouse = new ogl.Vec2(-1);
      const velocity = new ogl.Vec2();
      function resize() {
        let a1, a2;
        var imageAspect = imgSize[1] / imgSize[0];
        if (window.innerHeight / window.innerWidth < imageAspect) {
          a1 = 1;
          a2 = window.innerHeight / window.innerWidth / imageAspect;
        } else {
          a1 = (window.innerWidth / window.innerHeight) * imageAspect;
          a2 = 1;
        }
        mesh.program.uniforms.res.value = new ogl.Vec4(
          window.innerWidth,
          window.innerHeight,
          a1,
          a2
        );

        renderer.setSize(window.innerWidth, window.innerHeight);
        aspect = window.innerWidth / window.innerHeight;
      }
      const flowmap = new ogl.Flowmap(gl, { falloff: 0.5, dissipation: 0.92 }); // ovo je displacement velicina: dissipation: 0.9
      // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
      const geometry = new ogl.Geometry(gl, {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3])
        },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
      });
      const texture = new ogl.Texture(gl, {
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        premultiplyAlpha: true
      });
      const img = new Image();
      img.onload = () => (texture.image = img);
      img.crossOrigin = "Anonymous";

    //   if (isTouchCapable) {
    //     img.src = "resource/img/Design_mobile.svg";

    //     imgSize = [800, 1000];
    //   } else {
        img.src = "resource/img/Ideas.svg";
    //   }

      let a1, a2;
      var imageAspect = imgSize[1] / imgSize[0];
      if (window.innerHeight / window.innerWidth < imageAspect) {
        a1 = 1;
        a2 = window.innerHeight / window.innerWidth / imageAspect;
      } else {
        a1 = (window.innerWidth / window.innerHeight) * imageAspect;
        a2 = 1;
      }

      const program = new ogl.Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          tWater: { value: texture },
          res: {
            value: new ogl.Vec4(window.innerWidth, window.innerHeight, a1, a2)
          },
          img: { value: new ogl.Vec2(imgSize[0], imgSize[1]) },
          // Note that the uniform is applied without using an object and value property
          // This is because the class alternates this texture between two render targets
          // and updates the value property after each render.
          tFlow: flowmap.uniform
        }
      });
      const mesh = new ogl.Mesh(gl, { geometry, program });

      window.addEventListener("resize", resize, false);
      resize();

      // Create handlers to get mouse position and velocity
      // const isTouchCapable = "ontouchstart" in window;
      if (isTouchCapable) {
        window.addEventListener("touchstart", updateMouse, false);
        window.addEventListener("touchmove", updateMouse, { passive: false });
      } else {
        window.addEventListener("mousemove", updateMouse, false);
      }
      let lastTime;
      const lastMouse = new ogl.Vec2();
      function updateMouse(e) {
        if (!isTouchCapable) {
            e.preventDefault();
        }
        if (e.changedTouches && e.changedTouches.length) {
          e.x = e.changedTouches[0].pageX;
          e.y = e.changedTouches[0].pageY;
        }
        if (e.x === undefined) {
          e.x = e.pageX;
          e.y = e.pageY;
        }
        // Get mouse value in 0 to 1 range, with y flipped
        mouse.set(e.x / gl.renderer.width, 1.0 - e.y / gl.renderer.height);
        // Calculate velocity
        if (!lastTime) {
          // First frame
          lastTime = performance.now();
          lastMouse.set(e.x, e.y);
        }

        const deltaX = e.x - lastMouse.x;
        const deltaY = e.y - lastMouse.y;

        lastMouse.set(e.x, e.y);

        let time = performance.now();

        // Avoid dividing by 0
        let delta = Math.max(10.4, time - lastTime); // ovo podesavaj
        lastTime = time;
        velocity.x = deltaX / delta;
        velocity.y = deltaY / delta;
        // Flag update to prevent hanging velocity values when not moving
        velocity.needsUpdate = true;
      }
      requestAnimationFrame(update);
      function update(t) {
        requestAnimationFrame(update);
        // Reset velocity when mouse not moving
        if (!velocity.needsUpdate) {
          mouse.set(-1);
          velocity.set(0);
        }
        velocity.needsUpdate = false;
        // Update flowmap inputs
        flowmap.aspect = aspect;
        flowmap.mouse.copy(mouse);
        // Ease velocity input, slower when fading out
        flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
        flowmap.update();
        program.uniforms.uTime.value = t * 0.01;
        renderer.render({ scene: mesh });
      }
    }
}

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
                t.observe(e);
                createHeading();
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
                r = -1;
            n.on("progress", function() {
                o++
            });
            var textToShow = ['Identity', 'Interface', 'Experience']
            var i = function() {
                    r += 1, e.text(textToShow[r]), r >= 3 && (clearInterval(s), setTimeout(function() {
                        t.addClass("is-hide"), T()
                    }, 400)), r >=3 && (r = 3)
                },
                s = setInterval(i, 600)
        }()
    }()
};
project();