jQuery(function() {
	"use strict";

	var $ = jQuery,
		cdn = {},
		selectedVersion,
		$downloadOverlay = $("#download-overlay"),
		$cdnCustomizePane = $("#cdn-customize-pane"),
		$downloadOptionLI = $("#download-options-table li"),
		$downloadOptionContainer = $(".download-option"),
		customizeIsOpen = false,
		productKey = (window.productKey === "Homepage" || !window.productKey) ? "js.GSAP" : window.productKey,
		downloadData = {},//we store the product JSON data here as a has table, so downloadData["js.GSAP"] would refer to that product's data from IPS, and downloadData["as.TransformManager"] would contain that product's data, etc. (including github link if available, and zip download)
		memberLevels = {Guests:0, Members:1, SimplyGreen:2, ShockinglyGreen:3, BusinessGreen:4, Administrators:5},
		bonusLevels = {CustomEase:1, Physics2DPlugin:2, PhysicsPropsPlugin:2, DynamicPropPlugin:2, DrawSVGPlugin:2, ThrowPropsPlugin:3, SplitText:3, ScrambleTextPlugin:3, MotionBlurPlugin:3, TransformAroundPointPlugin:3, TransformAroundCenterPlugin:3,  MorphSVGPlugin:3},
		exportedRoot, overlayOnComplete, activeOverlay, overlayZIndex;

	function buildCDN() {
		var versions = "1.20.2;1.20.1;1.20.0;1.19.1;1.19.0;1.18.5;1.18.4;1.18.3;1.18.2;1.18.1;1.18.0;1.17.0;1.16.1;1.16.0;1.15.1;1.15.0;1.14.2;1.14.1;1.13.2;1.13.1;1.12.1;1.12.0;1.11.8;1.11.7;1.11.6;1.11.5;1.11.4;1.11.3;1.11.2;1.11.1;1.11.0;1.10.3;1.10.2;1.10.1;1.10.0;1.9.8;1.9.7;1.9.6;1.9.5;1.9.4;1.9.3;1.9.2;1.9.1;1.9.0;1.8.4;1.8.3;1.8.2;1.8.1".split(";"),
			$CDNCore = $("#cdn-core"),
			$CDNExtras = $("#cdn-extras"),
			$CDNPlugins = $("#cdn-plugins"),
			//we create a CDNClass instance for each JS class (TweenLite, CSSPlugin, etc.) and dynamically populate the HTML areas accordingly. Scroll down to where we create the instances if you want to add/edit/remove any of them. Options include {name, path, dependencies (TweenLite is used by default), and includes}
			CDNClass = function(id, kb, $list, options) {
				options = options || {};
				cdn[id] = this; //lookup table
				var pluginIndex = id.indexOf("Plugin"),
					includes = this.includes = options.includes || [];
				this.id = id;
				this.name = options.name || ((pluginIndex !== -1) ? id.charAt(0).toLowerCase() + id.substr(1, pluginIndex-1) : id);
				this.path = options.path || (((pluginIndex !== -1) ? "plugins/" : "") + id + ".min.js");
				this.kb = kb;
				this.dependencies = options.dependencies || ["TweenLite"];
				this.$input = $("<input type='checkbox' name='" + id + "' value='" + id + "'>").prependTo($("<label/>").text(" " + this.name).append(" <span>(" + kb + "kb)</span>").appendTo( $("<li/>").appendTo($list) ));
				this.$label = this.$input.parent();
				this.contains = function(id) {
					var i = this.includes.length;
					if (id instanceof CDNClass) {
						id = id.id;
					}
					while (--i > -1) {
						if (this.includes[i] === id) {
							return true;
						}
					}
					return false;
				};
				this.selected = function(checked) {
					this.$input.prop("checked", checked);
					this.forceSelections(checked);
				};
				var allRelated = this.dependencies.concat(this.includes),
					forceSelections = this.forceSelections = function(checked) {
						var i = allRelated.length,
							related, p;
						while (--i > -1) {
							related = cdn[allRelated[i]];
							if (!checked) {
								related.included = false; //we'll reset this later if necessary
							}
							related.$input.attr("disabled", checked);
							if (checked) {
								related.$label.addClass("cdn-disabled");
							} else {
								related.$label.removeClass("cdn-disabled");
							}
							if (checked != related.$input.prop("checked")) {
								if (checked) {
									related.autoSelected = true;
								} else if (!related.autoSelected) {
									continue;
								} else {
									related.autoSelected = false;
								}
								related.$input.prop("checked", checked);
							}
						}
						if (!checked) {
							for (p in cdn) {
								related = cdn[p];
								if (related.$input.prop("checked")) {
									related.forceSelections(true);
								}
							}
						} else {
							i = includes.length;
							while (--i > -1) {
								cdn[includes[i]].included = true;
							}
						}
					};
				this.$input.change(function(e){
					forceSelections(this.checked);
				});
			};

		// SETUP CLASSES/PLUGINS
		new CDNClass("TweenLite", 9, $CDNCore, {dependencies:[]});
		new CDNClass("TweenMax", 36, $CDNCore, {includes:["TweenLite","TimelineLite","TimelineMax","CSSPlugin","EasePack","RoundPropsPlugin","BezierPlugin","AttrPlugin","DirectionalRotationPlugin"]});
		new CDNClass("TimelineLite", 4, $CDNCore);
		new CDNClass("TimelineMax", 6, $CDNCore, {includes:["TimelineLite"]});

		new CDNClass("EasePack", 2, $CDNExtras, {path:"easing/EasePack.min.js"});
		new CDNClass("jquery.gsap", 2, $CDNExtras, {name:"jquery.gsap.js", path:"jquery.gsap.min.js", dependencies:["TweenLite","CSSPlugin"]});
		new CDNClass("Draggable", 12, $CDNExtras, {path:"utils/Draggable.min.js", dependencies:["TweenLite","CSSPlugin"]});

		new CDNClass("CSSPlugin", 15, $CDNPlugins, {name:"css"});
		new CDNClass("ScrollToPlugin", 1, $CDNPlugins);
		new CDNClass("BezierPlugin", 4, $CDNPlugins);
		//new CDNClass("RaphaelPlugin", 3, $CDNPlugins);
		new CDNClass("PixiPlugin", 3, $CDNPlugins);
		new CDNClass("ModifiersPlugin", 1, $CDNPlugins);
		new CDNClass("ColorPropsPlugin", 1, $CDNPlugins);
		new CDNClass("DirectionalRotationPlugin", 1, $CDNPlugins);
		new CDNClass("CSSRulePlugin", 1, $CDNPlugins, {name:"cssRule", dependencies:["TweenLite","CSSPlugin"]});
		new CDNClass("AttrPlugin", 1, $CDNPlugins);
		new CDNClass("EaselPlugin", 3, $CDNPlugins);
		new CDNClass("TextPlugin", 1, $CDNPlugins);
		new CDNClass("RoundPropsPlugin", 1, $CDNPlugins);

		cdn.CSSPlugin.selected(true); //by default, select CSSPlugin and TweenLite because they're so common.

		//populate versions
		var $select = $(".cdn-version select"),
			i;
		//$select.append( $("<option>", {value:"latest"}).text("latest") );
		for (i = 0; i < versions.length; i++) {
			$select.append( $("<option>", {value:versions[i], selected:(i === 0)}).text(versions[i]) );
		}
	}
	buildCDN();

	function toggleCustomize(immediate) {
		var duration = (immediate === true) ? 0 : 0.5,
			ease = Power2.easeOut;
		customizeIsOpen = !customizeIsOpen;
		$downloadOverlay.css({display:"block"}); //otherwise the "auto" height won't render/calculate properly.
		if (customizeIsOpen) {
			TweenLite.fromTo($cdnCustomizePane, duration, {height:$cdnCustomizePane.height()}, {height:$cdnCustomizePane.css({height:"auto"}).height(), ease:ease, immediateRender:true});
			TweenLite.to($downloadOptionLI, duration, {padding:0, ease:ease});
			TweenLite.to($downloadOptionContainer, duration, {scale:0.6, ease:ease});
			//hide the download buttons altogether:
			//TweenLite.to($downloadOptionsPane, duration, {height:0, ease:Power2.easeOut});
		} else {
			TweenLite.to($cdnCustomizePane, duration, {height:0, ease:ease});
			TweenLite.to($downloadOptionLI, duration, {padding:20, ease:ease});
			TweenLite.to($downloadOptionContainer, duration, {scale:1, ease:ease});
			//hide the download buttons altogether:
			//TweenLite.fromTo($downloadOptionsPane, duration, {height:$downloadOptionsPane.height()}, {height:$downloadOptionsPane.css({height:"auto"}).height(), ease:Power2.easeOut});
		}
		if (!activeOverlay) { //if the download overlay wasn't even open, make sure we switch the display back to "none". Otherwise, it'll just pop into view.
			$downloadOverlay.css({display:"none"});
		}
	}
	$("#cdn-package-customize").on("click", toggleCustomize);

/*	function updateCDNCode() {
		selectedVersion = $(".cdn-version select").val();
		var selectedGroup = $("input:radio[name=cdn-package]:checked").val(),
			$code = $("#cdn-code"),
			prefix = '&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/' + selectedVersion + '/',
			suffix = '"&gt;&lt;/script&gt;',
			customize = (selectedGroup === "customize"),
			links, i, p;
		if (!customize && customizeIsOpen) {
			toggleCustomize();
		}
		if (selectedGroup === "robust") {
			links = [cdn.TweenMax.path];
		} else if (selectedGroup === "lightweight") {
			links = [cdn.CSSPlugin.path, cdn.EasePack.path, cdn.TweenLite.path];
		} else {
			links = [];
			for (p in cdn) {
				if (cdn[p].$input.prop("checked") && !cdn[p].included) {
					links.push(cdn[p].path);
				}
			}
		}
		for (i = 0; i < links.length; i++) {
			links[i] = prefix + links[i] + suffix;
		}
		if ($code[0]) {
			$code[0].innerHTML = links.join("<br />");
			if (prettyPrint) {
				$code.removeClass("prettyprinted");
				prettyPrint();
			}
		}
	}
*/	$("#download-overlay input, #download-overlay select").change(updateCDNCode);

	//download/github rollovers
	$("#download-options-pane li").hover(function(e, f) {
		TweenLite.to(this, 0.3, {backgroundColor:"#ddd"});
		TweenLite.to($(this).find("img"), 0.3, {opacity:0.8, scale:1.15});
	}, function(e) {
		TweenLite.to(this, 0.3, {backgroundColor:"#fff"});
		TweenLite.to($(this).find("img"), 0.3, {opacity:0.6, scale:1});
	});


	function showOverlay(overlay, onComplete) {
		if (!overlay) {
			console.log("Error: no overlay argument provided to showOverlay().");
			return;
		}
		if (activeOverlay) { //if there's already an active overlay, hide it first.


			TweenLite.to(activeOverlay, 0.25, {rotationX:70, y:-300, z:-500, autoAlpha:0, display:"none", ease:Power1.easeIn, onComplete:function() {
				if (overlayZIndex) {
					activeOverlay.style.zIndex = overlayZIndex;
				} else {
					TweenLite.set(activeOverlay, {clearProps:"zIndex"});
				}
				activeOverlay = null;
				exportedRoot.resume(); 
				showOverlay(overlay, onComplete);
			}});
			return;
		}
		activeOverlay = overlay[0] || overlay; //in case it's a jQuery object.
		ga('send', 'pageview', {'page': '/overlay/'+activeOverlay.getAttribute('id'),'title': 'Overlay Opened'});


        // Brads Scroll Overlay Fixins
        jQuery('body, html').addClass('noscroll');


		overlayZIndex = activeOverlay.style.zIndex;
		exportedRoot = TimelineLite.exportRoot().pause();
		TweenLite.set(activeOverlay, {zIndex:3000});
		TweenLite.to("#overlay-dimmer", 0.25, {autoAlpha:0.6, ease:Linear.easeNone});
		TweenLite.set(activeOverlay, {maxHeight:"100%", maxWidth:"100%", overflow:"auto", scale:0.5, rotationX:70, autoAlpha:0, y:-300, z:-500, xPercent:-50, yPercent:-50, x:0, transformPerspective:600, display:"block"});
		TweenLite.to(activeOverlay, 0.25, {autoAlpha:1, scale:1, ease:Back.easeOut.config(1.5), delay:0.3});
		TweenLite.to(activeOverlay, 0.4, {rotationX:0, y:0, z:0, ease:Back.easeOut.config(1), delay:0.35});
		overlayOnComplete = onComplete;
		return false;
	}

	function hideOverlay() {

        // Brads Scroll Overlay Fixins
        jQuery('body, html').removeClass('noscroll');

		TweenLite.to("#overlay-dimmer", 0.3, {autoAlpha:0, delay:0.25, ease:Linear.easeNone, onComplete:overlayOnComplete});
		if (activeOverlay) {
			TweenLite.set(activeOverlay, {transformPerspective:600});
			TweenLite.to(activeOverlay, 0.25, {rotationX:70, y:-300, z:-500, autoAlpha:0, display:"none", ease:Power1.easeIn, onComplete:function() {
				if (overlayZIndex) {
					activeOverlay.style.zIndex = overlayZIndex;
				} else {
					TweenLite.set(activeOverlay, {clearProps:"zIndex"});
				}
				activeOverlay = null;
				exportedRoot.resume();
			}});
		}
	}

	$("#overlay-dimmer").on("click", hideOverlay);

	function showDownload(key) {
		var prefix;
		if (!key) {
			return;
		}
		if (key.indexOf("-") !== -1) { //allows us to accept download=GSAP-JS instead of download=js.GSAP for example. Remember, we interpret "AS3" as "as" for the new system.
			key = key.split("-");
			prefix = key.pop().toLowerCase();
			if (prefix === "as3") {
				prefix = "as";
			}
			key = prefix + "." + key.join(".");
		}

		populateDownloadOverlay(key, function() {
			showOverlay($downloadOverlay);
		});
	}

	//loads the necessary product data for the #download-overlay and handles manipulating the DOM to display things appropriately (links, product name, CDN pane, etc.). If the data hasn't loaded yet, it'll do so. If it has, it'll immediately call the onComplete.
	function populateDownloadOverlay(key, onComplete) {
		if (!key || key.indexOf(".") === -1) {
			console.log("Warning: " + key + " key is invalid.");
			return;
		}
		var parts = key.split("."),
			language = parts.shift(),
			product = parts.join("."),
			cdnClass = cdn[product],
			fileLevel = bonusLevels[product], //1 = Member, 2 = SimplyGreen and higher, 3 = ShockinglyGreen and higher, 4 = BusinessGreen and higher, 0 = free/guest
			data = downloadData[key],
			masterProduct, isLocked, requiredLevel;
		if (!data) {
			masterProduct = (language === "js" || product.indexOf("Plugin") !== -1 || fileLevel || product !== "TransformManager") ? language + ".GSAP" : key;

			$.getJSON("/forums/index.php?app=gscheckout&module=ajax&controller=language&do=getByKey&key=" + masterProduct, function(data) {
				downloadData[key] = data;
				populateDownloadOverlay(key, onComplete);
			});
		} else {
			if (!data.Name) {
				return;
			}

			if (product === "LoaderMax") { //LoaderMax is in the as.GSAP download.
				data.Name = "GSAP (with LoaderMax)";
			}
			$("#download-overlay span.download-name").text(data.Name.replace(/\[.+\]\s/i, "")); //make sure to omit anything inbetween [] like [HTML5/JS] or [AS3]

			isLocked = (!data.CanAccess || (fileLevel > memberLevels[data.MembershipStatus]));

			if (data.GitHubRepo && !isLocked) { //if there's no github repo, hide it. (like for TransformManager)
				$("#github-box, #download-zip-box").css({width:"50%", display:"table-cell"});
			} else {
				$("#download-zip-box").css({width:"100%"});
				$("#github-box").css({display:"none"});
			}
			$("#download-zip-box").off("click").click(function() {
				window.location.href = !isLocked ? data.DownloadUrl : (fileLevel > memberLevels[data.MembershipStatus]) ? "/club/" : data.PurchaseUrl;
			});
			$("#github-box").off("click").click(function() {
				window.location.href = data.GitHubRepo;
			});

			$("#download-overlay span.version").text(data.Version);
			$("#download-overlay span.updated").text(data.LastUpdatedOn);

			if (isLocked) {
				$("#download-zip-text h3").text("Download locked");
				$("#download-icon").attr("src", $("#download-icon").attr("src").split("-download.svg").join("-lock.svg"));
				$("#download-overlay div.terms p").css({visibility:"hidden"});
				if (fileLevel) { //bonus plugins shouldn't show "GSAP" as the product name, nor should they show the version number.
					$("#download-version").css({display:"none"});
					$("#download-overlay span.download-name").text(product);
				}
				if (fileLevel) {
					for (requiredLevel in memberLevels) {
						if (memberLevels[requiredLevel] === fileLevel) {
							break;
						}
					}
					$("#download-secondary-text").css({display:"block"}).html('Requires a "' + requiredLevel + '" or greater <a href="/club/">Club GreenSock</a> membership.<br><a href="/forums/login/">Sign in</a> to access your downloads.');
				} else {
					$("#download-secondary-text").css({display:"block"}).html("Click to purchase, or <a href='/forums/login/'>Sign in</a> to access your downloads.");
                }

			} else {
				$("#download-zip-text h3").text("Download zip");
				$("#download-icon").attr("src", $("#download-icon").attr("src").split("-lock.svg").join("-download.svg"));
				$("#download-version").css({display:"block"});
				$("#download-overlay div.terms p").css({visibility:"visible"});
				if ((data.Key.indexOf(".members") !== -1 || data.Key.indexOf(".shockingly") !== -1 || data.Key.indexOf(".simply") !== -1 || data.Key.indexOf(".business") !== -1) && !isLocked) {
					$("#download-secondary-text").css({display:"block"}).html("with bonus content");
				} else {
					$("#download-secondary-text").css({display:"none"});
				}
			}

			if (language === "js" && cdnClass && !cdn.TweenMax.contains(product)) { //if the product is something that's in the CDN and is NOT part of TweenMax, we should open the customize pane and ensure that plugin is selected.
				cdnClass.selected(true);
				$("#cdn-package-customize").prop("checked", true);
				if (!customizeIsOpen) {
					toggleCustomize(true);
				}
			} else if (customizeIsOpen) {
				toggleCustomize(true);
				$("#cdn-package-robust").prop("checked", true);
			}

			updateCDNCode();

			if (language === "js" && !isLocked) {
				TweenLite.set("#cdn-link-pane", {display:"block"});
			} else {
				TweenLite.set("#cdn-link-pane", {display:"none"});
			}

			if (onComplete) {
				onComplete();
			}

		}
	}

	TweenLite.set([$cdnCustomizePane, "#overlay-dimmer"], {force3D:true});
	window.showOverlay = showOverlay; //make it available for general use
	window.showDownload = showDownload;
	window.hideOverlay = hideOverlay;

	$(".breadcrumb-buttons .getgreensockbutton").on("click", function() {
		showDownload(productKey);
	});

	//look for ?download=GSAP-JS (or whatever) in the URL, and show the download overlay if we find it.
	if (document.URL.indexOf("download=") !== -1) {
		var a = document.URL.substr(document.URL.indexOf("?") + 1).split("&"),
			i = a.length,
			pair;
		while (--i > -1) {
			pair = a[i].split("=");
			if (pair[0] === "download") {
				showDownload(pair[1]);
				break;
			}
		}
	} else if (productKey && (productKey.substr(0,3) === "js." || productKey.substr(0,3) === "as.")) { //if this is a product page and there's a productKey (like "gs.GSAP"), preload it so that it's ready to go when the user clicks "Download".
		populateDownloadOverlay(productKey);
	}




	// confirmation window.....
	var _createElement = function(type, vars) {
		var e = document.createElement(type);
		vars = vars || {};
		if (vars.css) {
			e.style.cssText = vars.css;
		}
		if (vars.className) {
			e.setAttribute("class", vars.className);
		}
		if (vars.container) {
			((typeof(vars.container) === "string") ? document.querySelector(vars.container) : vars.container).appendChild(e);
		}
		return e;
	};

	var confirmation = _createElement("div", {container:document.documentElement, css:"border-radius: 10px; background-color: #fff; min-width: 250px; max-width: 40%; text-align: left; border: 1px solid #bbb; box-shadow: 0 4px 16px rgba(0,0,0,0.4); position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: 'Signika Negative', Arial, sans-serif; font-weight: 300; font-size: 18px; line-height: 24px; color: #444; visibility:hidden; z-index:4000;"});
	var confirmMessage = _createElement("div", {container: confirmation, css:"padding: 30px"});
	var buttonArea = _createElement("div", {container: confirmation, css:"text-align: center; padding-bottom: 18px; margin-top: -8px;"});
	var cancelButton = _createElement("div", {container: buttonArea, css:"display: inline-block; margin: 6px; font-size:14px;", className:"grey-button"});
	var confirmButton = _createElement("div", {container: buttonArea, css:"display: inline-block; margin: 6px; font-size:14px;", className:"green-button"});
	var dimmer, alreadyDimmed, confirmShowing, cancelHandler;

	window.hideConfirmation = function() {
		confirmShowing = false;
		TweenLite.to(confirmation, 0.2, {autoAlpha:0, scale:0.2, ease:Power1.easeIn});
		if (!alreadyDimmed && dimmer) {
			TweenLite.to(dimmer, 0.25, {autoAlpha:0, ease:Linear.easeNone});
		}
	};

	window.showConfirmation = function(message, vars) {
		if (confirmShowing) {
			cancelHandler();
		}
		vars = vars || {};
		confirmShowing = true;
		dimmer = document.querySelector("#overlay-dimmer");
		alreadyDimmed = (activeOverlay || (dimmer && window.getComputedStyle(dimmer).visibility !== "hidden"));
		confirmMessage.innerHTML = message;
		confirmButton.innerHTML = vars.confirmText || "CONFIRM";
		cancelButton.innerHTML = vars.cancelText || "CANCEL";
		confirmButton.onclick = function() {
			window.hideConfirmation();
			if (vars.onConfirm) {
				vars.onConfirm();
			}
		};
		cancelButton.onclick = cancelHandler = function() {
			window.hideConfirmation();
			if (vars.onCancel) {
				vars.onCancel();
			}
		};
		TweenLite.fromTo(confirmation, 0.4, {autoAlpha:0, scale:0.2}, {autoAlpha:1, scale:1, ease:Back.easeOut});
		if (!alreadyDimmed) {
			TweenLite.to(dimmer, 0.25, {autoAlpha:0.6, ease:Linear.easeNone});
		}
		$("#overlay-dimmer").on("click", cancelHandler);
		return confirmation;
	};




});