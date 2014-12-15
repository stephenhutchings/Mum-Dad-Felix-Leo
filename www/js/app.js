(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("app", function(exports, require, module) {
var Application, NamesCollection, NiceTouch, Preloader, UserModel;

NiceTouch = require("lib/touch");

Preloader = require("lib/preload");

UserModel = require("models/user");

NamesCollection = require("collections/names");

Application = {
  initialize: function(callback) {
    var Router, ready,
      _this = this;
    Preloader.initialize();
    NiceTouch.initialize();
    if (typeof StatusBar !== "undefined" && StatusBar !== null) {
      StatusBar.styleLightContent();
    }
    if (typeof Keyboard !== "undefined" && Keyboard !== null) {
      Keyboard.disableScroll(true);
    }
    Router = require("lib/router");
    ready = function(firstRun) {
      _this.router = new Router();
      return callback();
    };
    this.currentUser = new UserModel({
      id: "ME"
    });
    return this.currentUser.fetch({
      success: function() {
        return ready();
      },
      error: function() {
        return ready(true);
      }
    });
  }
};

module.exports = Application;
});

;require.register("collections/names", function(exports, require, module) {
var NamesCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

NamesCollection = (function(_super) {
  __extends(NamesCollection, _super);

  function NamesCollection() {
    _ref = NamesCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  NamesCollection.prototype.url = "data/names.json";

  NamesCollection.prototype.initialize = function() {
    return this.prefiltered = {};
  };

  NamesCollection.prototype.ready = function() {
    var i, _i, _results;
    _results = [];
    for (i = _i = 3; _i <= 9; i = ++_i) {
      _results.push(this.prefiltered[i] = this.filter(function(m) {
        return m.get("name").length === i;
      }));
    }
    return _results;
  };

  NamesCollection.prototype.randomName = function(length) {
    var random, reduced;
    reduced = this.prefiltered[length];
    if (reduced) {
      random = Math.floor(reduced.length * Math.random());
      return reduced[random].get("name");
    } else {
      random = Math.floor(this.length * Math.random());
      return this.at(random).get("name");
    }
  };

  return NamesCollection;

})(Backbone.Collection);

module.exports = NamesCollection;
});

;require.register("initialize", function(exports, require, module) {
var app;

app = require("app");

app.initialize(function() {
  return Backbone.history.start();
});
});

;require.register("lib/audio", function(exports, require, module) {
var AudioPlayer, emptyStyle, player;

emptyStyle = document.createElement("div").style;

AudioPlayer = function() {
  this.loadAudio();
  return this;
};

AudioPlayer.prototype = {
  paths: {
    "bark": "bark.mp3",
    "quack": "quack.mp3"
  },
  loadAudio: function() {
    var key, val, _ref, _results;
    this.sounds = {};
    _ref = this.paths;
    _results = [];
    for (key in _ref) {
      val = _ref[key];
      _results.push(this.sounds[key] = new Audio("192.168.0.6:3333/mp3/" + val));
    }
    return _results;
  },
  play: function(sound) {
    var _ref;
    return (_ref = this.sounds[sound]) != null ? typeof _ref.play === "function" ? _ref.play() : void 0 : void 0;
  }
};

player = new AudioPlayer();

module.exports = function(sound) {
  return player.play(sound);
};
});

;require.register("lib/config", function(exports, require, module) {
module.exports = {
  appStoreURL: "https://itunes.apple.com/us/app/...",
  supportURL: "mailto:stephen@s-ings.com?subject=Feedback",
  googleTrackingID: "",
  device: window.innerWidth <= 320 ? 0 : 1
};
});

;require.register("lib/dialog", function(exports, require, module) {
var Dialog;

Dialog = (function() {
  function Dialog() {}

  Dialog.prototype.prompt = function(msg, callback, title, btns, placeholder) {
    var input, _ref;
    if (btns == null) {
      btns = ["Cancel", "OK"];
    }
    if (placeholder == null) {
      placeholder = "";
    }
    if ((_ref = navigator.notification) != null ? _ref.prompt : void 0) {
      return navigator.notification.prompt(msg, callback, title, btns, placeholder);
    } else {
      input = window.prompt(msg, placeholder);
      return typeof callback === "function" ? callback({
        input1: input,
        buttonIndex: input ? 2 : 1
      }) : void 0;
    }
  };

  return Dialog;

})();

module.exports = new Dialog;
});

;require.register("lib/element.toggle", function(exports, require, module) {
(function() {
  var div;
  div = document.createElement("div");
  div.classList.toggle("t", false);
  if (div.classList.contains("t")) {
    if (typeof console !== "undefined" && console !== null) {
      console.log("Overwriting toggle with force ability.");
    }
    return DOMTokenList.prototype.toggle = function(klass, rule) {
      if (this.contains(klass) && !rule) {
        this.remove(klass);
      } else if (rule || (rule == null)) {
        this.add(klass);
      }
      return this.contains(klass);
    };
  }
})();
});

;require.register("lib/prefix", function(exports, require, module) {
var Prefix, emptyStyle, myPrefix;

emptyStyle = document.createElement("div").style;

Prefix = function() {};

Prefix.prototype = {
  vendorPrefixes: {},
  _getVendorPrefixFor: function(style) {
    var S, prefixed, s, vendor, _i, _len, _ref;
    s = style.substr(0, 1);
    S = s.toUpperCase();
    _ref = [s, "webkit" + S, "Moz" + S, "ms" + S, "O" + S];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vendor = _ref[_i];
      prefixed = vendor + style.substr(1);
      if (prefixed in emptyStyle) {
        return vendor.substr(0, vendor.length - 1);
      }
    }
    return false;
  },
  _camelCase: function(style) {
    return style.replace(/\-(\w)/gi, function(str, w) {
      return w.toUpperCase();
    });
  },
  prefix: function(style) {
    var vendorPrefix, _base;
    style = this._camelCase(style);
    vendorPrefix = this._getVendorPrefixFor(style);
    if (vendorPrefix === "") {
      return style;
    } else if (vendorPrefix) {
      return (_base = this.vendorPrefixes)[style] != null ? (_base = this.vendorPrefixes)[style] : _base[style] = vendorPrefix + style.charAt(0).toUpperCase() + style.substr(1);
    } else {
      return false;
    }
  }
};

myPrefix = new Prefix();

module.exports = function(style) {
  return myPrefix.prefix(style);
};
});

;require.register("lib/preload", function(exports, require, module) {
var Preloader;

Preloader = {
  initialize: function() {
    var count, didNotFireTimeout, extraDelayTimeout, hideSplashScreen, imageRegEx, loadImages, log, onError, onLoad, _ref;
    count = 0;
    extraDelayTimeout = 300;
    didNotFireTimeout = 3000;
    imageRegEx = /(file|http)\:([^\)]+)(png|gif|jpeg|jpg)/;
    hideSplashScreen = function(msg) {
      if (msg == null) {
        msg = "";
      }
      window.clearTimeout(didNotFireTimeout);
      return window.setTimeout((function() {
        var _ref;
        if ((_ref = navigator.splashscreen) != null) {
          _ref.hide();
        }
        document.documentElement.classList.add("preloaded");
        return log("hideSplashScreen() " + msg);
      }), extraDelayTimeout);
    };
    onLoad = function(src, images, err) {
      if (!err) {
        count++;
      }
      if (count === images.length) {
        log("✔ success " + count + " images");
        return hideSplashScreen();
      }
    };
    onError = function(src, images) {
      log("✕ error " + src);
      images.splice(images.indexOf(src), 1);
      return onLoad(src, images, true);
    };
    loadImages = function() {
      var images, styleSheet, _i, _len, _ref;
      images = [];
      log("initialize()");
      _ref = document.styleSheets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        styleSheet = _ref[_i];
        images = images.concat(Array.prototype.slice.call(styleSheet.cssRules).map(function(c) {
          return (c.cssText.match(imageRegEx) || [])[0];
        }).filter(function(c, i, arr) {
          return c && arr.indexOf(c) === i;
        }).filter(function(c) {
          return !!c.match("@2x") === (window.devicePixelRatio > 1);
        }));
      }
      if (!(images.length > 0)) {
        return hideSplashScreen();
      }
      return images.forEach(function(src) {
        var img;
        img = new Image();
        img.onload = function() {
          return onLoad(src, images);
        };
        img.onerror = function() {
          return onError(src, images);
        };
        return img.src = src;
      });
    };
    log = function() {
      var argument, type, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        argument = arguments[_i];
        if (typeof argument === "string") {
          type = "%s";
        }
        if (typeof argument === "number") {
          type = "%d";
        }
        if (typeof argument === "object") {
          type = "%O";
        }
        _results.push(typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log("%cPRELOADER →" + type, "color:#333;background:#eee;padding:0 4px;", argument) : void 0 : void 0);
      }
      return _results;
    };
    if (typeof navigator !== "undefined" && navigator !== null) {
      if ((_ref = navigator.splashscreen) != null) {
        _ref.show();
      }
    }
    loadImages();
    return didNotFireTimeout = window.setTimeout((function() {
      return hideSplashScreen("timed out");
    }), didNotFireTimeout);
  }
};

module.exports = Preloader;
});

;require.register("lib/router", function(exports, require, module) {
var AppRouter, MainView, app, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app = require("app");

MainView = require("views/main");

AppRouter = (function(_super) {
  __extends(AppRouter, _super);

  function AppRouter() {
    _ref = AppRouter.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AppRouter.prototype.initialize = function() {
    return this.mainView = new MainView({
      el: "body"
    });
  };

  AppRouter.prototype.routes = {
    "home": "home",
    "page(/:page)": "book",
    "*default": "default"
  };

  AppRouter.prototype.home = function() {
    return this.mainView.display("home");
  };

  AppRouter.prototype.book = function(page) {
    if (page == null) {
      page = 1;
    }
    return this.mainView.display("book", {
      page: page
    });
  };

  AppRouter.prototype["default"] = function() {
    return this.navigate("home", true);
  };

  return AppRouter;

})(Backbone.Router);

module.exports = AppRouter;
});

;require.register("lib/touch", function(exports, require, module) {
module.exports = {
  initialize: function() {
    var activeClass, inputRegEx, isTouch, minimumActiveMS, nearBuffer, nearEnough, onCancel, onClick, onEnd, onMove, onStart, parentIfText, parentNodes, tapEvent, toggleActiveState, touch, _end, _move, _start;
    touch = {};
    isTouch = "ontouchstart" in window;
    _start = isTouch ? "touchstart" : "mousedown";
    _move = isTouch ? "touchmove" : "mousemove";
    _end = isTouch ? "touchend" : "mouseup";
    nearBuffer = Math.pow(window.innerHeight * window.innerWidth, 0.35);
    activeClass = "__active";
    minimumActiveMS = 100;
    nearEnough = null;
    inputRegEx = /INPUT|LABEL|TEXTAREA|SELECT/;
    tapEvent = new CustomEvent("iostap", {
      bubbles: true,
      cancelable: true
    });
    parentIfText = function(node) {
      if ("tagName" in node) {
        return node;
      } else {
        return node.parentNode;
      }
    };
    parentNodes = function(node) {
      var _results;
      _results = [];
      while (node.parentNode) {
        nodes.push(node);
        _results.push(node = node.parentNode);
      }
      return _results;
    };
    toggleActiveState = function(isEnd) {
      var el, _i, _len, _ref, _results, _results1;
      nearEnough = (touch != null) && Math.abs(touch.x1 - touch.x2) < nearBuffer && Math.abs(touch.y1 - touch.y2) < nearBuffer;
      if (nearEnough) {
        el = touch.el;
        _results = [];
        while (el.parentNode) {
          el.classList.add(activeClass);
          if (el.dataset.nobubble) {
            break;
          }
          _results.push(el = el.parentNode);
        }
        return _results;
      } else {
        _ref = document.querySelectorAll("." + activeClass);
        _results1 = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          _results1.push(el.classList.remove(activeClass));
        }
        return _results1;
      }
    };
    onStart = function(e) {
      var el, _e;
      _e = isTouch ? e.touches[0] : e;
      el = parentIfText(_e.target);
      touch = {
        el: el,
        x1: _e.clientX,
        y1: _e.clientY
      };
      toggleActiveState(false);
      return onMove(e);
    };
    onMove = function(e) {
      var _e;
      if (touch == null) {
        return;
      }
      _e = isTouch ? e.touches[0] : e;
      touch.x2 = _e.clientX;
      touch.y2 = _e.clientY;
      return toggleActiveState(false);
    };
    onEnd = function() {
      if (touch == null) {
        return;
      }
      if (nearEnough) {
        touch.el.dispatchEvent(tapEvent);
      }
      if (touch.el.nodeName.match(inputRegEx)) {
        touch.el.focus();
      }
      touch = null;
      return window.setTimeout((function() {
        return toggleActiveState(true);
      }), minimumActiveMS);
    };
    onCancel = function() {
      if (touch == null) {
        return;
      }
      touch = null;
      return toggleActiveState(true);
    };
    onClick = function(e) {
      if (e.target.type !== "file") {
        e.preventDefault();
        return false;
      }
    };
    if (typeof Backbone !== "undefined" && Backbone !== null) {
      Backbone.on("didscroll", onCancel);
    }
    document.body.addEventListener(_start, onStart);
    document.body.addEventListener(_move, onMove);
    document.body.addEventListener(_end, onEnd);
    if (isTouch) {
      document.body.addEventListener("touchcancel", onCancel);
      return document.body.addEventListener("click", onClick);
    }
  }
};
});

;require.register("models/user", function(exports, require, module) {
var UserModel, app, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app = require("app");

UserModel = (function(_super) {
  __extends(UserModel, _super);

  function UserModel() {
    _ref = UserModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  UserModel.prototype.localStorage = new Backbone.LocalStorage("READER");

  UserModel.prototype.initialize = function() {
    this.on("change", function() {
      return this.save();
    });
    return this.on("sync", this.checkVersion, this);
  };

  UserModel.prototype.checkVersion = function(model) {
    if (this.get("version") !== this.defaults.version) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.log === "function") {
          console.log("New version: --> Reseting User Model");
        }
      }
      return this.set(this.defaults);
    }
  };

  UserModel.prototype.defaults = {
    version: "0.0.1"
  };

  return UserModel;

})(Backbone.Model);

module.exports = UserModel;
});

;require.register("views/book", function(exports, require, module) {
var BookView, app, player, prefix, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app = require("app");

prefix = require("lib/prefix");

player = require("lib/audio");

template = require("./templates/book");

BookView = (function(_super) {
  __extends(BookView, _super);

  function BookView() {
    _ref = BookView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BookView.prototype.id = "book-view";

  BookView.prototype.events = {
    "touchstart .char": "startChar",
    "touchmove .char": "moveChar",
    "touchend .char": "endChar"
  };

  BookView.prototype.initialize = function(params, callback) {
    var _this = this;
    this.render(params);
    callback();
    return window.addEventListener("orientationchange", function() {
      var _ref1;
      _this.onOrientationChange();
      _this.sizeContent();
      if ((_ref1 = _this.scrollView) != null) {
        _ref1.refresh();
      }
      return _this.onScrollEnd(true);
    });
  };

  BookView.prototype.render = function(params) {
    var _this = this;
    this.el.innerHTML = template();
    this.pages = this.el.querySelectorAll(".page");
    this.sizeContent();
    this.currentPage = params.page;
    return window.setTimeout((function() {
      _this.wrapLetters();
      _this.applyDelays();
      return window.setTimeout((function() {
        _this.scrollView = new IScroll(_this.el, {
          scrollX: true,
          scrollY: false,
          snap: true,
          tap: "scrolltap",
          deceleration: 0.002,
          indicators: {
            el: "#indicator",
            resize: true,
            shrink: "clip",
            listenY: false,
            ignoreBoundaries: true
          }
        });
        _this.scrollView.goToPage(params.page, 0, 0);
        return _this.scrollViewReady();
      }), 100);
    }), 200);
  };

  BookView.prototype.scrollViewReady = function() {
    var _this = this;
    this.scrollView.on("scrollEnd", function() {
      return _this.onScrollEnd();
    });
    this.scrollView.on("scrollStart", function() {
      return _this.onScrollStart();
    });
    return this.onScrollEnd(true);
  };

  BookView.prototype.onScrollStart = function() {
    return this.el.classList.add("scrolling");
  };

  BookView.prototype.onScrollEnd = function(force) {
    var char, i, j, page, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _results;
    this.el.classList.remove("scrolling");
    i = +((_ref1 = this.scrollView) != null ? (_ref2 = _ref1.currentPage) != null ? _ref2.pageX : void 0 : void 0);
    if (force === true || i !== this.currentPage) {
      this.currentPage = i;
      app.router.navigate("page/" + i);
      _ref3 = this.pages;
      for (j = _i = 0, _len = _ref3.length; _i < _len; j = ++_i) {
        page = _ref3[j];
        page.classList.remove("active");
        page.classList.remove("hidden");
        page.classList.toggle("inactive", i !== j);
      }
      _ref4 = this.el.querySelectorAll(".char");
      for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
        char = _ref4[_j];
        char.style[prefix("transform")] = "";
      }
      if ((_ref5 = this.pages.item(i).querySelector(".text")) != null) {
        _ref5.offsetWidth;
      }
      if ((_ref6 = this.pages.item(i).querySelector(".char")) != null) {
        _ref6.offsetWidth;
      }
    }
    this.pages.item(i).classList.add("active");
    _ref7 = this.pages.item(i).querySelectorAll(".char");
    _results = [];
    for (_k = 0, _len2 = _ref7.length; _k < _len2; _k++) {
      char = _ref7[_k];
      _results.push(char.style[prefix("transform")] = "translate3d(0, 0, 0) scale(1) rotate(" + (_.random(-12, 12)) + "deg)");
    }
    return _results;
  };

  BookView.prototype.startChar = function(e) {
    this.canRotate = true;
    e.stopImmediatePropagation();
    return this.moveChar(e);
  };

  BookView.prototype.moveChar = function(e) {
    var rotation, tar, transitionDelay;
    if (!this.canRotate) {
      return;
    }
    e.preventDefault();
    tar = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
    if (!(tar != null ? tar.classList.contains("char") : void 0)) {
      return;
    }
    rotation = _.random(-12, 12) - 360 * _.random(-2, 2);
    transitionDelay = tar.style[prefix("transitionDelay")];
    tar.style[prefix("pointer-events")] = "none";
    tar.style[prefix("transitionDelay")] = "0ms";
    tar.style[prefix("transform")] = "translate3d(0, 0, 0) scale(1.2) rotate(" + rotation + "deg)";
    if (tar.dataset.sound) {
      player(tar.dataset.sound);
    }
    return window.setTimeout((function() {
      tar.style[prefix("pointer-events")] = "";
      tar.style[prefix("transform")] = "translate3d(0, 0, 0) scale(1) rotate(" + rotation + "deg)";
      tar.offsetWidth;
      return tar.style[prefix("transitionDelay")] = transitionDelay;
    }), 300);
  };

  BookView.prototype.endChar = function(e) {
    return this.canRotate = false;
  };

  BookView.prototype.wrapLetters = function() {
    var content, count, el, i, node, replace, _i, _j, _len, _len1, _ref1, _ref2, _results;
    _ref1 = this.el.querySelectorAll("p");
    _results = [];
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      el = _ref1[i];
      count = 0;
      content = "";
      replace = function(w) {
        count++;
        switch (w) {
          case " ":
            return "&nbsp;";
          case "":
            return "<br />";
          default:
            return "<span class='char char-" + count + "'>" + w + "</span>";
        }
      };
      _ref2 = el.childNodes;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        node = _ref2[_j];
        if (node.nodeType === 3) {
          content += node.textContent.replace(/./g, replace);
        } else if (node.nodeType === 1 && node.innerHTML !== "") {
          node.innerHTML = node.innerHTML.replace(/(([\w'])(?![^(<|\&)]*?(>|;))|(\&\w+;))/g, replace);
          content += node.outerHTML;
        } else {
          content += node.outerHTML;
        }
      }
      _results.push(el.innerHTML = content);
    }
    return _results;
  };

  BookView.prototype.applyDelays = function() {
    var char, el, i, j, p, _i, _len, _ref1, _results;
    _ref1 = this.el.querySelectorAll("p");
    _results = [];
    for (j = _i = 0, _len = _ref1.length; _i < _len; j = ++_i) {
      el = _ref1[j];
      j = 0;
      p = el;
      while (p = p.previousSibling) {
        j++;
      }
      _results.push((function() {
        var _j, _len1, _ref2, _results1;
        _ref2 = el.querySelectorAll(".char");
        _results1 = [];
        for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
          char = _ref2[i];
          _results1.push(char.style[prefix("transition")] = "all 600ms " + (i * 40 + j * 1500) + "ms cubic-bezier(.36,1.47,.54,.89)");
        }
        return _results1;
      })());
    }
    return _results;
  };

  BookView.prototype.sizeContent = function() {
    var page, width, _i, _len, _ref1;
    width = window.innerWidth;
    _ref1 = this.pages;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      page = _ref1[_i];
      page.style.width = width + "px";
      page.classList.add("hidden");
    }
    return this.el.querySelector("#pages").style.width = width * this.pages.length + "px";
  };

  BookView.prototype.onOrientationChange = function(force) {
    this.el.classList.toggle("landscape", window.orientation % 180 !== 0);
    return this.el.classList.toggle("portrait", window.orientation % 180 === 0);
  };

  BookView.prototype.stopListening = function() {
    BookView.__super__.stopListening.apply(this, arguments);
    return window.removeEventListener("orientationchange");
  };

  return BookView;

})(Backbone.View);

module.exports = BookView;
});

;require.register("views/home", function(exports, require, module) {
var HomeView, app, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app = require("app");

template = require("./templates/home");

HomeView = (function(_super) {
  __extends(HomeView, _super);

  function HomeView() {
    _ref = HomeView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeView.prototype.id = "home-view";

  HomeView.prototype.events = {
    "touchmove": "preventDefault"
  };

  HomeView.prototype.initialize = function(params, callback) {
    this.render();
    return callback();
  };

  HomeView.prototype.render = function() {
    return this.el.innerHTML = template();
  };

  HomeView.prototype.preventDefault = function(e) {
    return e.preventDefault();
  };

  return HomeView;

})(Backbone.View);

module.exports = HomeView;
});

;require.register("views/main", function(exports, require, module) {
var MainView, Prefix, app, content, inbound, isTouch, outbound, template, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require("lib/element.toggle");

app = require("app");

template = require("views/templates/main");

Prefix = require("lib/prefix");

content = inbound = outbound = null;

isTouch = "ontouchstart" in window;

MainView = (function(_super) {
  __extends(MainView, _super);

  function MainView() {
    _ref = MainView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MainView.prototype.currentClass = "none";

  MainView.prototype.views = {};

  MainView.prototype.events = {
    "iostap a[href]": "navigateWithoutDelay"
  };

  MainView.prototype.initialize = function() {
    this.el.innerHTML = template();
    inbound = this.el.querySelector("#inbound");
    outbound = this.el.querySelector("#outbound");
    content = this.el.querySelector("#content");
    this.classForDeviceVersion();
    return this.classForDeviceSize();
  };

  MainView.prototype.classForDeviceVersion = function() {
    var _ref1;
    return this.el.classList.toggle("ios-lt-7", ((_ref1 = window.device) != null ? _ref1.version.match(/[\d]+/) : void 0) < 7);
  };

  MainView.prototype.classForDeviceSize = function() {
    if (window.innerWidth < 600) {
      return this.el.classList.add("mobile");
    }
  };

  MainView.prototype.navigateWithoutDelay = function(e) {
    var body, href, sub, to, _ref1;
    if (e.delegateTarget.hash) {
      return app.router.navigate(e.delegateTarget.hash, true);
    } else if (e.delegateTarget.href.match("mailto:") && (((_ref1 = window.plugin) != null ? _ref1.email : void 0) != null)) {
      href = e.delegateTarget.href.replace("mailto:", "");
      to = href.split("?subject=")[0];
      sub = (href.split("?subject=")[1] || "").split("&body=")[0];
      body = href.split("&body=")[1];
      return window.plugin.email.open({
        to: [to],
        subject: window.decodeURIComponent(sub || ""),
        body: window.decodeURIComponent(body || "")
      });
    } else {
      return window.open(e.delegateTarget.href, "_system");
    }
  };

  MainView.prototype.display = function(child, params) {
    var View, done, klass, _base,
      _this = this;
    View = require("./" + child);
    klass = "" + child + "-active";
    done = function(callback) {
      return _this.afterDisplay(callback);
    };
    this.undelegateEvents();
    inbound.removeAttribute("id");
    outbound.removeAttribute("id");
    inbound.id = "outbound";
    outbound.id = "inbound";
    this.el.classList.remove("display", this.currentClass);
    this.el.classList.add(klass);
    this.currentClass = klass;
    if (this.currentView != null) {
      this.currentView.stopListening();
      this.currentView.undelegateEvents();
      if (typeof (_base = this.currentView).hide === "function") {
        _base.hide();
      }
    }
    if (this.views[child] && this.views[child].cid !== this.currentView.cid) {
      this.currentView = this.views[child];
      this.currentView.display(done);
    } else {
      this.currentView = new View(params, done);
      this.currentView.el.classList.add("view");
      this.currentView.undelegateEvents();
      if (this.currentView.cache !== false) {
        this.views[child] = this.currentView;
      }
    }
    while (outbound.lastChild) {
      outbound.removeChild(outbound.lastChild);
    }
    return outbound.appendChild(this.currentView.el);
  };

  MainView.prototype.afterDisplay = function(callback) {
    var _this = this;
    window.clearTimeout(this.afterTimeout);
    return this.afterTimeout = window.setTimeout((function() {
      _this.el.classList.add("display");
      if (callback) {
        callback();
      }
      return _this.afterTransition();
    }), 10);
  };

  MainView.prototype.afterTransition = function() {
    var _this = this;
    window.clearTimeout(this.timeout);
    return this.timeout = window.setTimeout(function() {
      _this.currentView.delegateEvents();
      _this.delegateEvents();
      return _this.swapContainers();
    }, 600);
  };

  MainView.prototype.swapContainers = function() {
    var _inb, _otb, _results;
    _inb = outbound;
    _otb = inbound;
    inbound = _inb;
    outbound = _otb;
    _results = [];
    while (outbound.lastChild) {
      _results.push(outbound.removeChild(outbound.lastChild));
    }
    return _results;
  };

  return MainView;

})(Backbone.View);

module.exports = MainView;
});

;require.register("views/templates/book", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"pages\"><div id=\"page-01\" class=\"page\"><div class=\"text\"><p class=\"p1\">Mum <small class=\"small\">and</small> Dad,<br/>Felix <small class=\"small\">and</small> Leo</p><p class=\"p2\"><small class=\"small\">Spelled</small><br/> F-E-L-I-X<br/>L <small class=\"small\">&amp;<br/>then</small> E-O</p></div></div><div id=\"page-02\" class=\"page\"><div class=\"text\"><p class=\"p1\">Felix is tall<br/>and loud<br/>and cheeky.</p><p class=\"p2\">Leo is small<br/>and round<br/>and leaky.</p></div><img id=\"smile\" src=\"/img/smile.svg\"/></div><div id=\"page-03\" class=\"page\"><div class=\"text\"><p class=\"p1\">Dad is taller and <br/>has his glasses.<br/>Mum is smaller and<br/>has her passes.</p><p class=\"p2\">Mum has passes for<br/>the train and the zoo.<br/>Dad has glasses to<br/>see who is who.</p></div></div><div id=\"page-04\" class=\"page\"><div class=\"text\"><p class=\"p1\"> \nOn the weekend they<br/>all go to the park.</p><p class=\"p2 p2b\">There are ducks<br/>that may quack. </p><p class=\"p3\">There are dogs <br/>that might bark.</p></div><img id=\"duck\" src=\"/img/duck.svg\" data-sound=\"quack\" class=\"char\"/><img id=\"dog\" src=\"/img/dog.svg\" data-sound=\"bark\" class=\"char\"/></div><div id=\"page-05\" class=\"page\"><div class=\"text\"><p class=\"p1\"> \nTogether they go<br/>on a bicycle ride&hellip;</p><p class=\"p2\"> \n&hellip;if the weather<br/>is nice and it's<br/>not raining<br/>outside!</p></div><img id=\"bicycle-1\" src=\"/img/bicycle-1.svg\" class=\"char\"/><img id=\"bicycle-2\" src=\"/img/bicycle-2.svg\" class=\"char\"/></div><div id=\"page-06\" class=\"page\"><div class=\"text\"><p class=\"p1\"> \nWhen the kitchen is empty<br/>the market has food.</p><p class=\"p2 p2b\">With cheese from the guy<br/>and meat from the dude.</p><p class=\"p3\">Sometimes there is<br/>even a treat&hellip;<br/>Which you have to eat<br/>so as not to be rude!</p></div><img id=\"cheese\" src=\"/img/cheese.svg\" class=\"char\"/><img id=\"sausage\" src=\"/img/sausage.svg\" class=\"char\"/></div><div id=\"page-07\" class=\"page\"><div class=\"text\"><p class=\"p1\">On Saturday morning<br/>they swim in the pool.</p><p class=\"p2 p2b\">Splashing is fun but<br/>to run is not cool.</p><p class=\"p3\">If you do it and trip&hellip;<br/>You will look like a fool!</p></div></div><div id=\"page-08\" class=\"page\"><div class=\"text\"><p class=\"p1\">In the afternoon<br/>it's time to play,</p><p class=\"p2 p2b\">with trucks<br/>and cars&hellip;</p><p class=\"p3\">&hellip;until the end<br/>of the day.</p></div><img id=\"truck\" src=\"/img/truck.svg\" class=\"char\"/></div><div id=\"page-09\" class=\"page\"><div class=\"text\"><p class=\"p1\"> \nThen after dinner at<br/>the end of the night,</p><p class=\"p2 p2b\">they get into beds<br/>that are all <br/>soft and white.</p><p class=\"p3\">A kiss on the cheek<br/>and tucked in so tight&hellip;<br/>Mum and dad, it is time<br/>to turn off the light.</p></div><img id=\"star-1\" src=\"/img/star-1.svg\"/><img id=\"star-2\" src=\"/img/star-2.svg\"/></div><div id=\"page-10\" class=\"page\"><div class=\"text\"><p class=\"p1\">Dad <small class=\"small\">and</small> Mum,<br/>Felix <small class=\"small\">and</small> Leo</p><p class=\"p2\"><small class=\"small\">&nbsp;That's</small><br/> F-E-L-I-X<br/>L <small class=\"small\">&amp;<br/>then</small> E-O</p></div></div><div id=\"page-11\" class=\"page\"><div class=\"text\"><p class=\"p1\">The End!</p><div class=\"buttons\"><a href=\"#home\" class=\"button\">Back</a><a href=\"#page/0\" class=\"button\">Again!</a></div></div></div></div><div id=\"indicator\"><div id=\"inner\"></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/home", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<h1><span class=\"word word-1\">Mum, </span><span class=\"word word-2\">Dad, </span><span class=\"word word-3\">Felix  </span><span class=\"word word-4\">&amp; </span><span class=\"word word-5\">Leo</span><a href=\"#page/0\" class=\"button\">Begin</a></h1>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/main", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"wrapper\"><div id=\"content\"><div id=\"inbound\"></div><div id=\"outbound\"></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_01", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-01\" class=\"page\"><div class=\"text\"><p class=\"p1\">Mum <small class=\"small\">and</small> Dad,<br/>Felix <small class=\"small\">and</small> Leo</p><p class=\"p2\"><small class=\"small\">Spelled</small><br/> F-E-L-I-X<br/>L <small class=\"small\">&amp;<br/>then</small> E-O</p></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_02", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-02\" class=\"page\"><div class=\"text\"><p class=\"p1\">Felix is tall<br/>and loud<br/>and cheeky.</p><p class=\"p2\">Leo is small<br/>and round<br/>and leaky.</p></div><img id=\"smile\" src=\"/img/smile.svg\"/></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_03", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-03\" class=\"page\"><div class=\"text\"><p class=\"p1\">Dad is taller and <br/>has his glasses.<br/>Mum is smaller and<br/>has her passes.</p><p class=\"p2\">Mum has passes for<br/>the train and the zoo.<br/>Dad has glasses to<br/>see who is who.</p></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_04", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-04\" class=\"page\"><div class=\"text\"><p class=\"p1\"> \nOn the weekend they<br/>all go to the park.</p><p class=\"p2 p2b\">There are ducks<br/>that may quack. </p><p class=\"p3\">There are dogs <br/>that might bark.</p></div><img id=\"duck\" src=\"/img/duck.svg\" data-sound=\"quack\" class=\"char\"/><img id=\"dog\" src=\"/img/dog.svg\" data-sound=\"bark\" class=\"char\"/></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_05", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-05\" class=\"page\"><div class=\"text\"><p class=\"p1\"> \nTogether they go<br/>on a bicycle ride&hellip;</p><p class=\"p2\"> \n&hellip;if the weather<br/>is nice and it's<br/>not raining<br/>outside!</p></div><img id=\"bicycle-1\" src=\"/img/bicycle-1.svg\" class=\"char\"/><img id=\"bicycle-2\" src=\"/img/bicycle-2.svg\" class=\"char\"/></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_06", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-06\" class=\"page\"><div class=\"text\"><p class=\"p1\"> \nWhen the kitchen is empty<br/>the market has food.</p><p class=\"p2 p2b\">With cheese from the guy<br/>and meat from the dude.</p><p class=\"p3\">Sometimes there is<br/>even a treat&hellip;<br/>Which you have to eat<br/>so as not to be rude!</p></div><img id=\"cheese\" src=\"/img/cheese.svg\" class=\"char\"/><img id=\"sausage\" src=\"/img/sausage.svg\" class=\"char\"/></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_07", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-07\" class=\"page\"><div class=\"text\"><p class=\"p1\">On Saturday morning<br/>they swim in the pool.</p><p class=\"p2 p2b\">Splashing is fun but<br/>to run is not cool.</p><p class=\"p3\">If you do it and trip&hellip;<br/>You will look like a fool!</p></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_08", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-08\" class=\"page\"><div class=\"text\"><p class=\"p1\">In the afternoon<br/>it's time to play,</p><p class=\"p2 p2b\">with trucks<br/>and cars&hellip;</p><p class=\"p3\">&hellip;until the end<br/>of the day.</p></div><img id=\"truck\" src=\"/img/truck.svg\" class=\"char\"/></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_09", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-09\" class=\"page\"><div class=\"text\"><p class=\"p1\"> \nThen after dinner at<br/>the end of the night,</p><p class=\"p2 p2b\">they get into beds<br/>that are all <br/>soft and white.</p><p class=\"p3\">A kiss on the cheek<br/>and tucked in so tight&hellip;<br/>Mum and dad, it is time<br/>to turn off the light.</p></div><img id=\"star-1\" src=\"/img/star-1.svg\"/><img id=\"star-2\" src=\"/img/star-2.svg\"/></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_10", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-10\" class=\"page\"><div class=\"text\"><p class=\"p1\">Dad <small class=\"small\">and</small> Mum,<br/>Felix <small class=\"small\">and</small> Leo</p><p class=\"p2\"><small class=\"small\">&nbsp;That's</small><br/> F-E-L-I-X<br/>L <small class=\"small\">&amp;<br/>then</small> E-O</p></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/pages/page_11", function(exports, require, module) {
var __templateData = function anonymous(locals) {
var buf = [];
buf.push("<div id=\"page-11\" class=\"page\"><div class=\"text\"><p class=\"p1\">The End!</p><div class=\"buttons\"><a href=\"#home\" class=\"button\">Back</a><a href=\"#page/0\" class=\"button\">Again!</a></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map