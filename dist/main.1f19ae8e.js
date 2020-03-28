// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
console.log('main.js'); // 父子组件 props 传递

var r1 = new Vue({
  el: '#r1',
  data: {},
  components: {
    'child1': {
      props: ['parent1'],
      template: '<div>我是child1: {{parent1}}---{{typeof parent1}}</div>',
      data: function data() {
        return {
          count: 1
        };
      }
    },
    'child2': {
      props: ['parent2'],
      template: '<div>我是child2: {{parent2}}---{{typeof parent2}}</div>',
      data: function data() {
        return {
          count: 1
        };
      }
    }
  }
}); // 单项数据流，父组件传给子组件，子组件不能传给父组件

var r2 = new Vue({
  el: '#r2',
  data: {},
  components: {
    'child': {
      props: ['msg'],
      template: '<div>我是子组件---{{msg}}</div>',
      data: function data() {
        return {
          count: this.msg
        };
      }
    }
  }
}); // 动态设置 div 的宽度

var r3 = new Vue({
  el: '#r3',
  data: {
    width: ''
  },
  components: {
    'child': {
      props: ['parent', 'width'],
      template: '<div :style="style">I am a child: {{parent}}</div>',
      data: function data() {
        return {
          count: 1
        };
      },
      computed: {
        style: function style() {
          return {
            width: this.width + 'px',
            background: 'red',
            border: '3px solid blue'
          };
        }
      }
    }
  }
}); //...

var r4 = new Vue({
  el: '#r4',
  data: {
    width: ''
  },
  components: {
    'child': {
      props: ['parent', 'width'],
      template: '<div :style="style">我是子组件: {{parent}}</div>',
      data: function data() {
        return {
          count: 1
        };
      },
      computed: {
        style: function style() {
          return {
            width: this.width + 'px',
            border: '3px solid brown',
            padding: '20px 0'
          };
        }
      }
    }
  }
}); //...

var r5 = new Vue({
  el: '#r5',
  data: {
    width: ''
  },
  components: {
    'child': {
      props: ['parent', 'width'],
      template: '<div :style="style">我也是子组件：{{parent}}</div>',
      computed: {
        style: function style() {
          return {
            width: this.width + 'px',
            border: '5px solid brown',
            padding: '10px 0',
            background: 'blue',
            color: 'white'
          };
        }
      }
    }
  }
}); //...

var r6 = new Vue({
  el: '#r6',
  data: {
    a: '111',
    b: '666'
  },
  components: {
    'child': {
      props: {
        a: String,
        b: [String, Number]
      },
      template: '<div>我是子组件. a: {{a}}--{{typeof a}}, b: {{b}}--{{typeof b}}</div>',
      data: function data() {
        return {};
      }
    }
  }
}); //... 

var r7 = new Vue({
  el: '#r7',
  data: {
    a: '111',
    b: {
      ccc: 555
    },
    c: true
  },
  components: {
    'child': {
      props: {
        a: String,
        b: [String, Number, Boolean, Object],
        c: {
          type: Boolean
        }
      },
      template: '<div>a: {{a}}--{{typeof a}}, b: {{b}}--{{typeof b}}, c: {{c}}--{{typeof c}}</div>'
    }
  }
}); //...

var r8 = new Vue({
  el: '#r8',
  data: {
    a: '1',
    b: 999,
    c: false,
    e: [989],
    f: 88,
    oo: function oo() {
      return 1;
    }
  },
  components: {
    'child': {
      props: {
        a: String,
        b: [String, Number],
        c: {
          type: Boolean,
          default: true,
          required: true
        },
        e: {
          typeof: Array,
          default: function _default() {
            return [666];
          }
        },
        //自定义验证
        f: {
          validator: function validator(value) {
            return value > 10;
          }
        },
        oo: {
          type: Function,
          default: function _default() {
            return 2;
          }
        }
      },
      template: "<div>a: {{a}}, b: {{b}}, c: {{c}}, e: {{e}}--{{typeof e}} f: {{f}}\n\t\t\t\t\t\t\t\t\t\too: {{oo}}\n\t\t\t\t\t\t\t\t </div>"
    }
  }
}); // 子组件向父组件传递数据

var r9 = new Vue({
  el: '#r9',
  data: {
    a: 2000
  },
  methods: {
    handleTotal: function handleTotal(value) {
      this.a = value;
    }
  },
  components: {
    'child': {
      template: "<div>\n\t\t\t\t<button @click=\"handleincrease()\">+1000</button>\n\t\t\t\t<button @click=\"handledecrease()\">-1000</button>\n\t\t\t</div>",
      data: function data() {
        return {
          count: 2000
        };
      },
      methods: {
        handleincrease: function handleincrease() {
          this.count += 1000;
          this.$emit('change', this.count);
        },
        handledecrease: function handledecrease() {
          this.count -= 1000;
          this.$emit('change', this.count);
        }
      }
    }
  }
}); //...

var r99 = new Vue({
  el: '#r99',
  data: {
    total: 1000
  },
  methods: {
    handleChange: function handleChange(value) {
      this.total = value;
    }
  },
  components: {
    'child': {
      template: "<div>\n\t\t\t\t<button @click=\"increase()\">+1000</button>\n\t\t\t\t<button @click=\"decrease()\">-1000</button>\n\t\t\t</div>",
      data: function data() {
        return {
          count: 1000
        };
      },
      methods: {
        increase: function increase() {
          console.log('increase');
          this.count += 1000;
          console.log(this.count);
          this.$emit('change', this.count);
        },
        decrease: function decrease() {
          console.log('decrease');
          this.count -= 1000;
          console.log(this.count);
          this.$emit('change', this.count);
        }
      }
    }
  }
}); //...

var rr = new Vue({
  el: '#rr',
  data: {
    total: 1000
  },
  methods: {
    changeTotal: function changeTotal(value) {
      this.total = value;
    }
  },
  components: {
    'child': {
      template: "<div>\n\t\t\t\t<button @click=\"increase()\">+1000</button>\n\t\t\t\t<button @click=\"decrease()\">-1000</button>\n\t\t\t</div>",
      data: function data() {
        return {
          count: 1000
        };
      },
      methods: {
        increase: function increase() {
          this.count += 1000;
          this.$emit('change', this.count);
        },
        decrease: function decrease() {
          this.count -= 1000;
          this.$emit('change', this.count);
        }
      }
    }
  }
}); //...

var s1 = new Vue({
  el: '#s1',
  data: {
    n: 1000
  },
  methods: {
    changen: function changen(value) {
      this.n = value;
    }
  },
  components: {
    'child': {
      template: "<div>\n\t\t\t\t<button @click=\"increase()\">+1000</button>\n\t\t\t\t<button @click=\"decrease()\">-1000</button>\n\t\t\t</div>",
      data: function data() {
        return {
          count: 1000
        };
      },
      methods: {
        increase: function increase() {
          this.count += 1000;
          this.$emit('change', this.count);
        },
        decrease: function decrease() {
          this.count -= 1000;
          this.$emit('change', this.count);
        }
      }
    }
  }
}); //...

var s2 = new Vue({
  el: '#s2',
  data: {
    n: 1000
  },
  methods: {},
  components: {
    'child': {
      template: "<div>\n\t\t\t\t<button @click=\"increase()\">+1000</button>\n\t\t\t</div>",
      data: function data() {
        return {
          count: 1000
        };
      },
      methods: {
        increase: function increase() {
          this.count += 1000;
          this.$emit('input', this.count);
        }
      }
    }
  }
}); // 父子传递数据 用 v-model

var s3 = new Vue({
  el: '#s3',
  data: {
    n: 1000
  },
  components: {
    'child': {
      template: "<div>\n\t\t\t\t<button @click='increase()'>+1000</button>\n\t\t\t\t<button @click='decrease()'>-1000</button>\n\t\t\t</div>",
      data: function data() {
        return {
          count: 1000
        };
      },
      methods: {
        increase: function increase() {
          this.count += 1000;
          this.$emit('input', this.count);
        },
        decrease: function decrease() {
          this.count -= 1000;
          this.$emit('input', this.count);
        }
      }
    }
  }
}); //...

var s4 = new Vue({
  el: '#s4',
  data: {
    n: 1
  },
  components: {
    'child': {
      template: '<div @click="increase()">你点击了 {{a}} 次</div>',
      data: function data() {
        return {
          a: 0
        };
      },
      methods: {
        increase: function increase() {
          this.a += 1;
        }
      }
    }
  }
}); // 非父组件的内容传递。关键词 bus: new Vue()  this.$root.bus.$emit('lala', this.aaa);
// this.$root.bus.$on('lala',function(value){ alert(value) })
// 下面代码还包括子组件修改父组件的数据案例; 拿父链就是 $parent  父链的父链 $parent.parent

var s5 = new Vue({
  el: '#s5',
  data: {
    bus: new Vue(),
    msg: '原数据',
    sondata: ''
  },
  methods: {
    getSonData: function getSonData() {
      this.sondata = this.$refs.b.msg;
    }
  },
  components: {
    'acom': {
      template: '<div><button @click="xxx">点我向b组件传递内容</button></div>',
      data: function data() {
        return {
          aaa: '我是a组件传递的内容',
          msg: '我是a组件的内容'
        };
      },
      methods: {
        xxx: function xxx() {
          this.$root.bus.$emit('lala', this.aaa);
        }
      }
    },
    'bcom': {
      data: function data() {
        return {
          msg: '我是b组件的内容'
        };
      },
      template: '<div></div>',
      created: function created() {
        this.$root.bus.$on('lala', function (value) {
          alert(value);
        });
      }
    },
    'ccom': {
      data: function data() {
        return {
          msg: '我是c组件的内容'
        };
      },
      template: '<button @click="change">点我修改父组件的信息</button>',
      methods: {
        change: function change() {
          this.$parent.msg = '数据修改啦';
        }
      }
    }
  }
}); // 插槽slot的介绍与作用域
// 使用 slot 分发内容

var s6 = new Vue({
  el: '#s7',
  data: {},
  components: {
    'acom': {
      template: '<div>\
				<slot>\
					如果父组件没有插入内容，我就默认出现\
				</slot>\
			</div>'
    }
  }
});
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60417" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map