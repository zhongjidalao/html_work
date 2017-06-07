/*(´・ω・｀)情人节是什么，能吃吗？*/
/*
 * b2233V.dialog(txt) 可以让2233娘说话哦 (´・ω・｀)
 * var fff = b2233V.create(); fff.init(type, pos) 可以继续召唤2233娘哦 (´・ω・｀)  // type:"22" || "33", pos:{top:y,left:x}
 */
(function(d, b) {
	function e() {
		this.gf = null;
		this.characters = {
			22: {
				motion: {
					stand: {
						dur: 1230,
						src: "public/images/22stand.gif"
					},
					draw: {
						dur: 1E3,
						src: "public/images/22draw.gif"
					},
					hello: {
						dur: 1560,
						src: "public/images/22hello.gif"
					},
					sleep: {
						dur: 960,
						src: "public/images/22sleep.gif"
					},
					love: {
						dur: 1830,
						src: "public/images/22love.gif"
					}
				},
				dialog: {
					stand: "眨眼",
					love: "欧尼酱，daisiki！！",
					hello: "欢迎浏览！",
					sleep: "欧尼酱，咕嘿嘿！！",
					draw: "画圈"
				},
				random: ["draw", "hello", "sleep", "love"]
			},
			33: {
				motion: {
					stand: {
						dur: 1230,
						src: "../images/33stand.gif"
					},
					draw: {
						dur: 1E3,
						src: "../images/33draw.gif"
					},
					hello: {
						dur: 1330,
						src: "../images/33hello.gif"
					},
					sleep: {
						dur: 900,
						src: "../images/33sleep.gif"
					},
					love: {
						dur: 1830,
						src: "../images/33love.gif"
					}
				},
				dialog: {
					stand: "眨眼",
					love: "喵帕斯！！",
					sleep: "睡觉了！",
					hello: "空尼七哇。",
					draw: "好无聊啊"
				},
				random: ["draw", "hello", "sleep", "love"]
			}
		};
		this.dialogTimer = this.standTimer = this.timer = null;
		this.moving = 0;
		this.bound = !1;
		b('<style type="text/css">.b2233-click{transform-origin: 50% 100%;animation: b2233-click 0.5s linear;-webkit-transform-origin: 50% 100%;-webkit-animation: b2233-click 0.5s linear;}@keyframes b2233-click{0%{transform:scale(1,1);}10%{transform:scale(1.1,0.95);}30%{transform:scale(1,1);}}@-webkit-keyframes b2233-click{0%{-webkit-transform:scale(1,1);}10%{-webkit-transform:scale(1.1,0.9);}30%{-webkit-transform:scale(1,1);}}</style>').appendTo("head")
	}
	e.prototype = {
		create: function() {
			return new e
		},
		init: function(a, f) {
			var c = this;
			if (a && this.characters[a]) {
				this.gf = {
					elem: b("<div>").css({
						position: "fixed",
						width: 150,
						height: 150,
						bottom: 50,
						right: 30,
						cursor: "pointer",
						zIndex: 10050
					}),
					img: b("<img />").css({
						display: "block",
						width: "100%",
						height: "100%"
					}),
					assets: null
				};
				void 0 !== f && this.gf.elem.css(f);
				this.gf.elem.append(this.gf.img).appendTo("body");
				this.gf.elem.on("click", function() {
					var bq=["draw","hello","sleep","love"];
					var rans=Math.floor(Math.random()*4);
					1 >= c.moving && (c.stop(), c.change(bq[rans]), c.dialog(bq[rans]), c.start());//change:动作 dialog:说话
					//1 >= c.moving && (c.stop(), c.change("sleep"), c.dialog("sleep"), c.start());
					c.moving = 0
				});
				var g = this.gf.elem;
				this.gf.elem.on("mousedown.b2233", function(a) {
					a.preventDefault();
					var f = a.pageX - b(this).offset().left,
						e = a.pageY - b(this).offset().top;
					b(document).on("mousemove.b2233", function(a) {
						c.moving++;
						a.preventDefault();
						var h = a.clientX - f,
							k = a.clientY - e,
							k = k >= b(d).height() - g.height() - 5 && c.bound ? b(d).height() - g.height() - 5 : 0 >= k && c.bound ? 0 : a.clientY - e,
							h = h >= b(d).width() - g.width() - 5 && c.bound ? b(d).width() - g.width() - 5 : 0 >= h && c.bound ? 0 : a.clientX - f;
						g.css({
							right: "auto",
							bottom: "auto",
							left: h,
							top: k
						})
					});
					b(document).on("mouseup.b2233", function(a) {
						1 < c.moving && (c.gf.elem.removeClass("b2233-click"), setTimeout(function() {
							c.gf.elem.addClass("b2233-click")
						}, 0));
						b(document).off("mousemove.b2233");
						b(document).off("mouseup.b2233")
					})
				});
				this.setTarget(a);
				this.start();
				return this.gf
			}
		},
		start: function() {
			this.stand();
			this.random()
		},
		stop: function() {
			clearTimeout(this.standTimer);
			clearTimeout(this.timer)
		},
		stand: function(a) {
			var b = this;
			clearTimeout(this.standTimer);
			this.standTimer = setTimeout(function() {
				b.change("stand");
				b.stand()
			}, a || 3E3)
		},
		random: function() {
			var a = this,
				b = 1E3 * Math.round(5 * Math.random() + 5);
			clearTimeout(this.timer);
			this.timer = setTimeout(function() {
				clearTimeout(a.standTimer);
				var b = a.gf.assets.random,
					b = b[Math.round(Math.random() * (b.length - 1))];
				a.change(b);
				a.stand(2E3);
				a.random()
			}, b)
		},
		change: function(a) {
			this.gf.img.attr("src", this.gf.assets.motion[a].src)
		},
		setTarget: function(a) {
			this.stop();
			this.gf.assets = this.characters[a || "22"];
			this.change("stand");
			this.start()
		},
		dialog: function(a) {
			var d = this;
			a = this.gf.assets.dialog[a] || a;
			clearTimeout(this.dialogTimer);
			this.closeDialog(0);
			var c = b("<div>").html(a).attr({
				style: "transition:0.3s",
				dialog: "true"
			}).css({
				position: "absolute",
				top: -20,
				left: -100,
				visibility: "hidden",
				opacity: 0,
				backgroundColor: "#d32d5b",
				color: "#fff",
				padding: "5px 10px",
				fontSize: "13px",
				width: 130,
				wordWrap: "break-word",
				zIndex: 10050
			}).appendTo(this.gf.elem);
			setTimeout(function() {
				c.css({
					visibility: "visible",
					opacity: 1
				});
				d.dialogTimer = setTimeout(function() {
					d.closeDialog()
				}, 2E3)
			}, 0)
		},
		closeDialog: function(a) {
			this.gf.elem.find("[dialog]").stop(!0, !0).fadeOut("undefined" == typeof a ? 200 : a, function() {
				b(this).remove()
			})
		}
	};
	b(function() {
		"undefined" == typeof d.b2233V && ((d.b2233V = new e).init(ChatGetSettings("valentine_2233")), b("#btn_b22,#btn_b33").off("click"), b("#btn_b22,#btn_b33").on("click", function() {
			var a = b(this).attr("type");
			ChatSaveSettings("valentine_2233", a);
			"undefined" != typeof d.b2233V && (d.b2233V.gf ? d.b2233V.setTarget(a) : d.b2233V.init(a))
		}))
	})
})(window, $);