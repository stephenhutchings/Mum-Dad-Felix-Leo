!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var t={},r={},i=function(e,t){return{}.hasOwnProperty.call(e,t)},s=function(e,t){var r,i,s=[];r=/^\.\.?(\/|$)/.test(t)?[e,t].join("/").split("/"):t.split("/");for(var n=0,o=r.length;o>n;n++)i=r[n],".."===i?s.pop():"."!==i&&""!==i&&s.push(i);return s.join("/")},n=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(r){var i=n(t),o=s(i,r);return e.require(o,t)}},a=function(e,t){var i={id:e,exports:{}};return r[e]=i,t(i.exports,o(e),i),i.exports},l=function(e,n){var o=s(e,".");if(null==n&&(n="/"),i(r,o))return r[o].exports;if(i(t,o))return a(o,t[o]);var l=s(o,"./index");if(i(r,l))return r[l].exports;if(i(t,l))return a(l,t[l]);throw new Error('Cannot find module "'+e+'" from "'+n+'"')},c=function(e,r){if("object"==typeof e)for(var s in e)i(e,s)&&(t[s]=e[s]);else t[e]=r},p=function(){var e=[];for(var r in t)i(t,r)&&e.push(r);return e};e.require=l,e.require.define=c,e.require.register=c,e.require.list=p,e.require.brunch=!0}}(),require.register("app",function(e,t,r){var i,s,n,o,a;n=t("lib/touch"),o=t("lib/preload"),a=t("models/user"),s=t("collections/names"),i={initialize:function(e){var r,i,s=this;return o.initialize(),n.initialize(),"undefined"!=typeof StatusBar&&null!==StatusBar&&StatusBar.styleLightContent(),"undefined"!=typeof Keyboard&&null!==Keyboard&&Keyboard.disableScroll(!0),r=t("lib/router"),i=function(){return s.router=new r,e()},this.currentUser=new a({id:"ME"}),this.currentUser.fetch({success:function(){return i()},error:function(){return i(!0)}})}},r.exports=i}),require.register("collections/names",function(e,t,r){var i,s,n={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var i in t)n.call(t,i)&&(e[i]=t[i]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=function(e){function t(){return s=t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.url="data/names.json",t.prototype.initialize=function(){return this.prefiltered={}},t.prototype.ready=function(){var e,t,r;for(r=[],e=t=3;9>=t;e=++t)r.push(this.prefiltered[e]=this.filter(function(t){return t.get("name").length===e}));return r},t.prototype.randomName=function(e){var t,r;return r=this.prefiltered[e],r?(t=Math.floor(r.length*Math.random()),r[t].get("name")):(t=Math.floor(this.length*Math.random()),this.at(t).get("name"))},t}(Backbone.Collection),r.exports=i}),require.register("initialize",function(e,t){var r;r=t("app"),r.initialize(function(){return Backbone.history.start()})}),require.register("lib/audio",function(e,t,r){var i,s,n;s=document.createElement("div").style,i=function(){return this.loadAudio(),this},i.prototype={paths:{bark:"bark.mp3",quack:"quack.mp3"},loadAudio:function(){var e,t,r,i;this.sounds={},r=this.paths,i=[];for(e in r)t=r[e],i.push(this.sounds[e]=new Audio("192.168.0.6:3333/mp3/"+t));return i},play:function(e){var t;return null!=(t=this.sounds[e])&&"function"==typeof t.play?t.play():void 0}},n=new i,r.exports=function(e){return n.play(e)}}),require.register("lib/config",function(e,t,r){r.exports={appStoreURL:"https://itunes.apple.com/us/app/...",supportURL:"mailto:stephen@s-ings.com?subject=Feedback",googleTrackingID:"",device:window.innerWidth<=320?0:1}}),require.register("lib/dialog",function(e,t,r){var i;i=function(){function e(){}return e.prototype.prompt=function(e,t,r,i,s){var n,o;return null==i&&(i=["Cancel","OK"]),null==s&&(s=""),(null!=(o=navigator.notification)?o.prompt:void 0)?navigator.notification.prompt(e,t,r,i,s):(n=window.prompt(e,s),"function"==typeof t?t({input1:n,buttonIndex:n?2:1}):void 0)},e}(),r.exports=new i}),require.register("lib/element.toggle",function(){!function(){var e;return e=document.createElement("div"),e.classList.toggle("t",!1),e.classList.contains("t")?("undefined"!=typeof console&&null!==console&&console.log("Overwriting toggle with force ability."),DOMTokenList.prototype.toggle=function(e,t){return this.contains(e)&&!t?this.remove(e):(t||null==t)&&this.add(e),this.contains(e)}):void 0}()}),require.register("lib/prefix",function(e,t,r){var i,s,n;s=document.createElement("div").style,i=function(){},i.prototype={vendorPrefixes:{},_getVendorPrefixFor:function(e){var t,r,i,n,o,a,l;for(i=e.substr(0,1),t=i.toUpperCase(),l=[i,"webkit"+t,"Moz"+t,"ms"+t,"O"+t],o=0,a=l.length;a>o;o++)if(n=l[o],r=n+e.substr(1),r in s)return n.substr(0,n.length-1);return!1},_camelCase:function(e){return e.replace(/\-(\w)/gi,function(e,t){return t.toUpperCase()})},prefix:function(e){var t,r;return e=this._camelCase(e),t=this._getVendorPrefixFor(e),""===t?e:t?null!=(r=this.vendorPrefixes)[e]?(r=this.vendorPrefixes)[e]:r[e]=t+e.charAt(0).toUpperCase()+e.substr(1):!1}},n=new i,r.exports=function(e){return n.prefix(e)}}),require.register("lib/preload",function(e,t,r){var i;i={initialize:function(){var e,t,r,i,s,n,o,a,l,c;return e=0,r=300,t=3e3,s=/(file|http)\:([^\)]+)(png|gif|jpeg|jpg)/,i=function(e){return null==e&&(e=""),window.clearTimeout(t),window.setTimeout(function(){var t;return null!=(t=navigator.splashscreen)&&t.hide(),document.documentElement.classList.add("preloaded"),o("hideSplashScreen() "+e)},r)},l=function(t,r,s){return s||e++,e===r.length?(o("✔ success "+e+" images"),i()):void 0},a=function(e,t){return o("✕ error "+e),t.splice(t.indexOf(e),1),l(e,t,!0)},n=function(){var e,t,r,n,c;for(e=[],o("initialize()"),c=document.styleSheets,r=0,n=c.length;n>r;r++)t=c[r],e=e.concat(Array.prototype.slice.call(t.cssRules).map(function(e){return(e.cssText.match(s)||[])[0]}).filter(function(e,t,r){return e&&r.indexOf(e)===t}).filter(function(e){return!!e.match("@2x")==window.devicePixelRatio>1}));return e.length>0?e.forEach(function(t){var r;return r=new Image,r.onload=function(){return l(t,e)},r.onerror=function(){return a(t,e)},r.src=t}):i()},o=function(){var e,t,r,i,s;for(s=[],r=0,i=arguments.length;i>r;r++)e=arguments[r],"string"==typeof e&&(t="%s"),"number"==typeof e&&(t="%d"),"object"==typeof e&&(t="%O"),s.push("undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log("%cPRELOADER →"+t,"color:#333;background:#eee;padding:0 4px;",e):void 0);return s},"undefined"!=typeof navigator&&null!==navigator&&null!=(c=navigator.splashscreen)&&c.show(),n(),t=window.setTimeout(function(){return i("timed out")},t)}},r.exports=i}),require.register("lib/router",function(e,t,r){var i,s,n,o,a={}.hasOwnProperty,l=function(e,t){function r(){this.constructor=e}for(var i in t)a.call(t,i)&&(e[i]=t[i]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};n=t("app"),s=t("views/main"),i=function(e){function t(){return o=t.__super__.constructor.apply(this,arguments)}return l(t,e),t.prototype.initialize=function(){return this.mainView=new s({el:"body"})},t.prototype.routes={home:"home","page(/:page)":"book","*default":"default"},t.prototype.home=function(){return this.mainView.display("home")},t.prototype.book=function(e){return this.mainView.display("book",{page:e||0})},t.prototype["default"]=function(){return this.navigate("home",!0)},t}(Backbone.Router),r.exports=i}),require.register("lib/touch",function(e,t,r){r.exports={initialize:function(){var e,t,r,i,s,n,o,a,l,c,p,u,d,h,f,g,v,m,y;return g={},r="ontouchstart"in window,y=r?"touchstart":"mousedown",m=r?"touchmove":"mousemove",v=r?"touchend":"mouseup",s=Math.pow(window.innerHeight*window.innerWidth,.35),e="__active",i=100,n=null,t=/INPUT|LABEL|TEXTAREA|SELECT/,h=new CustomEvent("iostap",{bubbles:!0,cancelable:!0}),u=function(e){return"tagName"in e?e:e.parentNode},d=function(e){var t;for(t=[];e.parentNode;)nodes.push(e),t.push(e=e.parentNode);return t},f=function(){var t,r,i,o,a,l;if(n=null!=g&&Math.abs(g.x1-g.x2)<s&&Math.abs(g.y1-g.y2)<s){for(t=g.el,a=[];t.parentNode&&(t.classList.add(e),!t.dataset.nobubble);)a.push(t=t.parentNode);return a}for(o=document.querySelectorAll("."+e),l=[],r=0,i=o.length;i>r;r++)t=o[r],l.push(t.classList.remove(e));return l},p=function(e){var t,i;return i=r?e.touches[0]:e,t=u(i.target),g={el:t,x1:i.clientX,y1:i.clientY},f(!1),c(e)},c=function(e){var t;if(null!=g)return t=r?e.touches[0]:e,g.x2=t.clientX,g.y2=t.clientY,f(!1)},l=function(){return null!=g&&null!=g.el?(n&&g.el.dispatchEvent(h),g.el.nodeName.match(t)&&g.el.focus(),g=null,window.setTimeout(function(){return f(!0)},i)):void 0},o=function(){return null!=g?(g=null,f(!0)):void 0},a=function(e){return"file"!==e.target.type?(e.preventDefault(),!1):void 0},"undefined"!=typeof Backbone&&null!==Backbone&&Backbone.on("didscroll",o),document.body.addEventListener(y,p),document.body.addEventListener(m,c),document.body.addEventListener(v,l),r?(document.body.addEventListener("touchcancel",o),document.body.addEventListener("click",a)):void 0}}}),require.register("models/user",function(e,t,r){var i,s,n,o={}.hasOwnProperty,a=function(e,t){function r(){this.constructor=e}for(var i in t)o.call(t,i)&&(e[i]=t[i]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};s=t("app"),i=function(e){function t(){return n=t.__super__.constructor.apply(this,arguments)}return a(t,e),t.prototype.localStorage=new Backbone.LocalStorage("READER"),t.prototype.initialize=function(){return this.on("change",function(){return this.save()}),this.on("sync",this.checkVersion,this)},t.prototype.checkVersion=function(){return this.get("version")!==this.defaults.version?("undefined"!=typeof console&&null!==console&&"function"==typeof console.log&&console.log("New version: --> Reseting User Model"),this.set(this.defaults)):void 0},t.prototype.defaults={version:"0.0.1"},t}(Backbone.Model),r.exports=i}),require.register("views/book",function(e,t,r){var i,s,n,o,a,l,c={}.hasOwnProperty,p=function(e,t){function r(){this.constructor=e}for(var i in t)c.call(t,i)&&(e[i]=t[i]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};s=t("app"),o=t("lib/prefix"),n=t("lib/audio"),a=t("./templates/book"),i=function(e){function t(){return l=t.__super__.constructor.apply(this,arguments)}return p(t,e),t.prototype.id="book-view",t.prototype.events={"touchstart .char":"startChar","touchmove .char":"moveChar","touchend .char":"endChar"},t.prototype.initialize=function(e,t){var r=this;return this.render(e),t(),window.addEventListener("orientationchange",function(){var e;return r.onOrientationChange(),r.sizeContent(),null!=(e=r.scrollView)&&e.refresh(),r.onScrollEnd(!0)})},t.prototype.render=function(e){var t=this;return this.el.innerHTML=a(),this.pages=this.el.querySelectorAll(".page"),this.sizeContent(),this.currentPage=e.page,window.setTimeout(function(){return t.wrapLetters(),t.applyDelays(),window.setTimeout(function(){return t.scrollView=new IScroll(t.el,{scrollX:!0,scrollY:!1,snap:!0,tap:"scrolltap",deceleration:.002,indicators:{el:"#indicator",resize:!0,shrink:"clip",listenY:!1,ignoreBoundaries:!0}}),t.scrollView.goToPage(e.page,0,0),t.scrollViewReady()},100)},200)},t.prototype.display=function(e,t){return this.currentPage=t.page,this.scrollView.goToPage(t.page,0,0),this.onScrollEnd(!0),e()},t.prototype.scrollViewReady=function(){var e=this;return this.scrollView.on("scrollEnd",function(){return e.onScrollEnd()}),this.scrollView.on("scrollStart",function(){return e.onScrollStart()}),this.onScrollEnd(!0)},t.prototype.onScrollStart=function(){return this.el.classList.add("scrolling")},t.prototype.onScrollEnd=function(e){var t,r,i,n,a,l,c,p,u,d,h,f,g,v,m,y,b;if(this.el.classList.remove("scrolling"),r=+(null!=(h=this.scrollView)&&null!=(f=h.currentPage)?f.pageX:void 0),e===!0||r!==this.currentPage){for(this.currentPage=r,s.router.navigate("page/"+r),g=this.pages,i=a=0,p=g.length;p>a;i=++a)n=g[i],n.classList.remove("active"),n.classList.remove("hidden"),n.classList.toggle("inactive",r!==i);for(v=this.el.querySelectorAll(".char"),l=0,u=v.length;u>l;l++)t=v[l],t.style[o("transform")]="";null!=(m=this.pages.item(r).querySelector(".text"))&&m.offsetWidth}for(this.pages.item(r).classList.add("active"),y=this.pages.item(r).querySelectorAll(".char"),b=[],c=0,d=y.length;d>c;c++)t=y[c],b.push(t.style[o("transform")]="translate3d(0, 0, 0) scale(1) rotate("+_.random(-12,12)+"deg)");return b},t.prototype.startChar=function(e){return this.canRotate=!0,e.preventDefault(),e.stopImmediatePropagation(),this.moveChar(e)},t.prototype.moveChar=function(e){var t,r,i;if(this.canRotate&&(e.preventDefault(),r=document.elementFromPoint(e.touches[0].pageX,e.touches[0].pageY),null!=r?r.classList.contains("char"):void 0))return this.scrollView.disable(),t=_.random(-12,12)-360*_.random(-2,2),i=r.style[o("transitionDelay")],r.style[o("pointer-events")]="none",r.style[o("transitionDelay")]="0ms",r.style[o("transform")]="translate3d(0, 0, 0) scale(1.2) rotate("+t+"deg)",r.dataset.sound&&n(r.dataset.sound),window.setTimeout(function(){return r.style[o("pointer-events")]="",r.style[o("transform")]="translate3d(0, 0, 0) scale(1) rotate("+t+"deg)",r.offsetWidth,r.style[o("transitionDelay")]=i},300)},t.prototype.endChar=function(){return this.canRotate=!1,this.scrollView.enable()},t.prototype.wrapLetters=function(){var e,t,r,i,s,n,o,a,l,c,p,u,d;for(p=this.el.querySelectorAll("p"),d=[],i=o=0,l=p.length;l>o;i=++o){for(r=p[i],t=0,e="",n=function(e){switch(t++,e){case" ":return"&nbsp;";case"":return"<br />";default:return"<span class='char char-"+t+"'>"+e+"</span>"}},u=r.childNodes,a=0,c=u.length;c>a;a++)s=u[a],3===s.nodeType?e+=s.textContent.replace(/./g,n):1===s.nodeType&&""!==s.innerHTML?(s.innerHTML=s.innerHTML.replace(/(([\w'])(?![^(<|\&)]*?(>|;))|(\&\w+;))/g,n),e+=s.outerHTML):e+=s.outerHTML;d.push(r.innerHTML=e)}return d},t.prototype.applyDelays=function(){var e,t,r,i,s,n,a,l,c;for(l=this.el.querySelectorAll("p"),c=[],i=n=0,a=l.length;a>n;i=++n){for(t=l[i],i=0,s=t;s=s.previousSibling;)i++;c.push(function(){var s,n,a,l;for(a=t.querySelectorAll(".char"),l=[],r=s=0,n=a.length;n>s;r=++s)e=a[r],l.push(e.style[o("transition")]="all 600ms "+(40*r+1500*i)+"ms cubic-bezier(.36,1.47,.54,.89)");return l}())}return c},t.prototype.sizeContent=function(){var e,t,r,i,s;for(t=window.innerWidth,s=this.pages,r=0,i=s.length;i>r;r++)e=s[r],e.style.width=t+"px",e.classList.add("hidden");return this.el.querySelector("#pages").style.width=t*this.pages.length+"px"},t.prototype.onOrientationChange=function(){return this.el.classList.toggle("landscape",window.orientation%180!==0),this.el.classList.toggle("portrait",window.orientation%180===0)},t.prototype.stopListening=function(){return t.__super__.stopListening.apply(this,arguments),window.removeEventListener("orientationchange")},t}(Backbone.NativeView),r.exports=i}),require.register("views/home",function(e,t,r){var i,s,n,o,a={}.hasOwnProperty,l=function(e,t){function r(){this.constructor=e}for(var i in t)a.call(t,i)&&(e[i]=t[i]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};s=t("app"),n=t("./templates/home"),i=function(e){function t(){return o=t.__super__.constructor.apply(this,arguments)}return l(t,e),t.prototype.id="home-view",t.prototype.events={touchmove:"preventDefault"},t.prototype.initialize=function(e,t){return this.render(),t()},t.prototype.render=function(){return this.el.innerHTML=n()},t.prototype.display=function(e){return e()},t.prototype.preventDefault=function(e){return e.preventDefault()},t}(Backbone.NativeView),r.exports=i}),require.register("views/main",function(e,t,r){var i,s,n,o,a,l,c,p,u,d={}.hasOwnProperty,h=function(e,t){function r(){this.constructor=e}for(var i in t)d.call(t,i)&&(e[i]=t[i]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};t("lib/element.toggle"),n=t("app"),p=t("views/templates/main"),s=t("lib/prefix"),o=a=c=null,l="ontouchstart"in window,i=function(e){function r(){return u=r.__super__.constructor.apply(this,arguments)}return h(r,e),r.prototype.currentClass="none",r.prototype.views={},r.prototype.events={"iostap a[href]":"navigateWithoutDelay"},r.prototype.initialize=function(){return this.el.innerHTML=p(),a=this.el.querySelector("#inbound"),c=this.el.querySelector("#outbound"),o=this.el.querySelector("#content"),this.classForDeviceVersion(),this.classForDeviceSize()},r.prototype.classForDeviceVersion=function(){var e;return this.el.classList.toggle("ios-lt-7",(null!=(e=window.device)?e.version.match(/[\d]+/):void 0)<7)},r.prototype.classForDeviceSize=function(){return window.innerWidth<600?this.el.classList.add("mobile"):void 0},r.prototype.navigateWithoutDelay=function(e){var t,r,i,s,o;return e.delegateTarget.hash?n.router.navigate(e.delegateTarget.hash,!0):e.delegateTarget.href.match("mailto:")&&null!=(null!=(o=window.plugin)?o.email:void 0)?(r=e.delegateTarget.href.replace("mailto:",""),s=r.split("?subject=")[0],i=(r.split("?subject=")[1]||"").split("&body=")[0],t=r.split("&body=")[1],window.plugin.email.open({to:[s],subject:window.decodeURIComponent(i||""),body:window.decodeURIComponent(t||"")})):window.open(e.delegateTarget.href,"_system")},r.prototype.display=function(e,r){var i,s,n,o,l=this;for(i=t("./"+e),n=""+e+"-active",s=function(e){return l.afterDisplay(e)},this.undelegateEvents(),a.removeAttribute("id"),c.removeAttribute("id"),a.id="outbound",c.id="inbound",this.el.classList.remove("display",this.currentClass),this.el.classList.add(n),this.currentClass=n,null!=this.currentView&&(this.currentView.stopListening(),this.currentView.undelegateEvents(),"function"==typeof(o=this.currentView).hide&&o.hide()),this.views[e]&&this.views[e].cid!==this.currentView.cid?(this.currentView=this.views[e],this.currentView.display(s,r)):(this.currentView=new i(r,s),this.currentView.el.classList.add("view"),this.currentView.undelegateEvents(),this.currentView.cache!==!1&&(this.views[e]=this.currentView));c.lastChild;)c.removeChild(c.lastChild);return c.appendChild(this.currentView.el)},r.prototype.afterDisplay=function(e){var t=this;return window.clearTimeout(this.afterTimeout),this.afterTimeout=window.setTimeout(function(){return t.el.classList.add("display"),e&&e(),t.afterTransition()},10)},r.prototype.afterTransition=function(){var e=this;return window.clearTimeout(this.timeout),this.timeout=window.setTimeout(function(){return e.currentView.delegateEvents(),e.delegateEvents(),e.swapContainers()},600)},r.prototype.swapContainers=function(){var e,t,r;for(e=c,t=a,a=e,c=t,r=[];c.lastChild;)r.push(c.removeChild(c.lastChild));return r},r}(Backbone.NativeView),r.exports=i}),require.register("views/templates/book",function(e,t,r){var i=function(){var e=[];return e.push('<div id="pages"><div id="page-01" class="page"><div class="text"><p class="p1">Mum <small class="small">and</small> Dad,<br/>Felix <small class="small">and</small> Leo</p><p class="p2"><small class="small">Spelled</small><br/> F-E-L-I-X<br/>L <small class="small">&amp;<br/>then</small> E-O</p></div></div><div id="page-02" class="page"><div class="text"><p class="p1">Felix is tall<br/>and loud<br/>and cheeky.</p><p class="p2">Leo is small<br/>and round<br/>and peachy.</p></div><img id="smile-2" src="img/smile-2.svg" class="char"/><img id="smile-1" src="img/smile-1.svg" class="char"/></div><div id="page-03" class="page"><div class="text"><p class="p1">Dad is taller and <br/>has his glasses.<br/>Mum is smaller and<br/>has her passes.</p><p class="p2">Mum has passes for<br/>the train and the zoo.<br/>Dad has glasses to<br/>see who is who.</p></div><img id="glasses" src="img/glasses.svg" class="char"/><img id="passes" src="img/passes.svg" class="char"/></div><div id="page-04" class="page"><div class="text"><p class="p1"> \nOn the weekend they<br/>all go to the park.</p><p class="p2 p2b">There are ducks<br/>that may quack. </p><p class="p3">There are dogs <br/>that might bark.</p></div><img id="duck" src="img/duck.svg" data-sound="quack" class="char"/><img id="dog" src="img/dog.svg" data-sound="bark" class="char"/></div><div id="page-05" class="page"><div class="text"><p class="p1"> \nTogether they go<br/>on a bicycle ride&hellip;</p><p class="p2"> \n&hellip;if the weather<br/>is nice and it\'s<br/>not raining<br/>outside!</p></div><img id="bicycle-1" src="img/bicycle-1.svg" class="char"/><img id="bicycle-2" src="img/bicycle-2.svg" class="char"/></div><div id="page-06" class="page"><div class="text"><p class="p1"> \nWhen the kitchen is empty<br/>the market has food.</p><p class="p2 p2b">With cheese from the guy<br/>and meat from the dude.</p><p class="p3">Sometimes there is<br/>even a treat&hellip;<br/>Which you have to eat<br/>so as not to be rude!</p></div><img id="cheese" src="img/cheese.svg" class="char"/><img id="sausage" src="img/sausage.svg" class="char"/></div><div id="page-07" class="page"><div class="text"><p class="p1">On Saturday morning<br/>they swim in the pool.</p><p class="p2 p2b">Splashing is fun but<br/>to run is not cool.</p><p class="p3">If you do it and trip&hellip;<br/>You will look like a fool!</p></div><img id="pool" src="img/pool.svg" class="char"/><img id="swimmer" src="img/swimmer.svg" class="char"/></div><div id="page-08" class="page"><div class="text"><p class="p1">After a nap<br/>it\'s time to play,</p><p class="p2 p2b">with trucks<br/>and cars&hellip;</p><p class="p3">&hellip;until the end<br/>of the day.</p></div><img id="car" src="img/car.svg" class="char"/><img id="truck" src="img/truck.svg" class="char"/></div><div id="page-09" class="page"><div class="text"><p class="p1"> \nThen after dinner<br/>at the end of the night,</p><p class="p2 p2b">they get into beds<br/>that are all <br/>soft and white.</p><p class="p3">A kiss on the cheek<br/>and tucked in so tight&hellip;<br/>Mum and dad, it is time<br/>to turn off the light.</p></div><img id="star-1" src="img/star-1.svg" class="char"/><img id="star-3" src="img/star-2.svg" class="char"/><img id="star-2" src="img/star-2.svg" class="char"/><img id="bed" src="img/bed.svg" class="char"/></div><div id="page-10" class="page"><div class="text"><p class="p1">Dad <small class="small">and</small> Mum,<br/>Felix <small class="small">and</small> Leo</p><p class="p2"><small class="small">&nbsp;That\'s</small><br/> F-E-L-I-X<br/>L <small class="small">&amp;<br/>then</small> E-O</p></div></div><div id="page-11" class="page"><div class="text"><p class="p1">The End!</p><div class="buttons"><a href="#home" class="button">Go Back</a></div></div></div></div><div id="indicator"><div id="inner"></div></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/home",function(e,t,r){var i=function(){var e=[];return e.push('<h1><span class="word word-1">Mum, </span><span class="word word-2">Dad, </span><span class="word word-3">Felix  </span><span class="word word-4">&amp; </span><span class="word word-5">Leo</span><a href="#page/0" class="button">Begin</a></h1>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/main",function(e,t,r){var i=function(){var e=[];return e.push('<div id="wrapper"><div id="content"><div id="inbound"></div><div id="outbound"></div></div></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_01",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-01" class="page"><div class="text"><p class="p1">Mum <small class="small">and</small> Dad,<br/>Felix <small class="small">and</small> Leo</p><p class="p2"><small class="small">Spelled</small><br/> F-E-L-I-X<br/>L <small class="small">&amp;<br/>then</small> E-O</p></div></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_02",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-02" class="page"><div class="text"><p class="p1">Felix is tall<br/>and loud<br/>and cheeky.</p><p class="p2">Leo is small<br/>and round<br/>and peachy.</p></div><img id="smile-2" src="img/smile-2.svg" class="char"/><img id="smile-1" src="img/smile-1.svg" class="char"/></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_03",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-03" class="page"><div class="text"><p class="p1">Dad is taller and <br/>has his glasses.<br/>Mum is smaller and<br/>has her passes.</p><p class="p2">Mum has passes for<br/>the train and the zoo.<br/>Dad has glasses to<br/>see who is who.</p></div><img id="glasses" src="img/glasses.svg" class="char"/><img id="passes" src="img/passes.svg" class="char"/></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_04",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-04" class="page"><div class="text"><p class="p1"> \nOn the weekend they<br/>all go to the park.</p><p class="p2 p2b">There are ducks<br/>that may quack. </p><p class="p3">There are dogs <br/>that might bark.</p></div><img id="duck" src="img/duck.svg" data-sound="quack" class="char"/><img id="dog" src="img/dog.svg" data-sound="bark" class="char"/></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_05",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-05" class="page"><div class="text"><p class="p1"> \nTogether they go<br/>on a bicycle ride&hellip;</p><p class="p2"> \n&hellip;if the weather<br/>is nice and it\'s<br/>not raining<br/>outside!</p></div><img id="bicycle-1" src="img/bicycle-1.svg" class="char"/><img id="bicycle-2" src="img/bicycle-2.svg" class="char"/></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_06",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-06" class="page"><div class="text"><p class="p1"> \nWhen the kitchen is empty<br/>the market has food.</p><p class="p2 p2b">With cheese from the guy<br/>and meat from the dude.</p><p class="p3">Sometimes there is<br/>even a treat&hellip;<br/>Which you have to eat<br/>so as not to be rude!</p></div><img id="cheese" src="img/cheese.svg" class="char"/><img id="sausage" src="img/sausage.svg" class="char"/></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_07",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-07" class="page"><div class="text"><p class="p1">On Saturday morning<br/>they swim in the pool.</p><p class="p2 p2b">Splashing is fun but<br/>to run is not cool.</p><p class="p3">If you do it and trip&hellip;<br/>You will look like a fool!</p></div><img id="pool" src="img/pool.svg" class="char"/><img id="swimmer" src="img/swimmer.svg" class="char"/></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_08",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-08" class="page"><div class="text"><p class="p1">After a nap<br/>it\'s time to play,</p><p class="p2 p2b">with trucks<br/>and cars&hellip;</p><p class="p3">&hellip;until the end<br/>of the day.</p></div><img id="car" src="img/car.svg" class="char"/><img id="truck" src="img/truck.svg" class="char"/></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_09",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-09" class="page"><div class="text"><p class="p1"> \nThen after dinner<br/>at the end of the night,</p><p class="p2 p2b">they get into beds<br/>that are all <br/>soft and white.</p><p class="p3">A kiss on the cheek<br/>and tucked in so tight&hellip;<br/>Mum and dad, it is time<br/>to turn off the light.</p></div><img id="star-1" src="img/star-1.svg" class="char"/><img id="star-3" src="img/star-2.svg" class="char"/><img id="star-2" src="img/star-2.svg" class="char"/><img id="bed" src="img/bed.svg" class="char"/></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_10",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-10" class="page"><div class="text"><p class="p1">Dad <small class="small">and</small> Mum,<br/>Felix <small class="small">and</small> Leo</p><p class="p2"><small class="small">&nbsp;That\'s</small><br/> F-E-L-I-X<br/>L <small class="small">&amp;<br/>then</small> E-O</p></div></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)}),require.register("views/templates/pages/page_11",function(e,t,r){var i=function(){var e=[];return e.push('<div id="page-11" class="page"><div class="text"><p class="p1">The End!</p><div class="buttons"><a href="#home" class="button">Go Back</a></div></div></div>'),e.join("")};"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof r&&r&&r.exports&&(r.exports=i)});