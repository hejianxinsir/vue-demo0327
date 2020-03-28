## 命名
js 中区分大小写，但 HTML 中不区分大小写，HTML 会把看到的大写字母转成小写。所以在 HTML 中，要用短横杠 - 命名。

总之，在 HTML 中不能使用驼峰命名。

而在 template 中，只能使用全小写或驼峰命名。

在组件的 templalte 中，只能使用驼峰命名或全小写。

## 数据验证

- 验证的 type 类型可以是：String Number Boolean Object Array Function

```
<div id="app">
  <child :a="a"></child>
</div>

var app = new Vue({
  el: '#app',
  data: {
    a: 111,
    b: 7
  },
  components: {
    'child': {
      props: {
        a: Number,
        b: {
          validator: function(value){
            return value > 10
          }
        }
      },
      template: `<div>a:{{a}}, b:{{b}}</div>`,
    }
  }
})
```

## 子组件给父组件传递数据

- 子组件用 $emit() 来出发事件，父组件用 $on() 来监听事件