console.log('main.js')

// 父子组件 props 传递
var r1 = new Vue({
	el: '#r1',
	data: {
	
	},
	components: {
		'child1': {
			props: ['parent1'],
			template: '<div>我是child1: {{parent1}}---{{typeof parent1}}</div>',
			data: function(){
				return { count: 1 }
			}
		},
		'child2': {
			props: ['parent2'],
			template: '<div>我是child2: {{parent2}}---{{typeof parent2}}</div>',
			data: function(){
				return { count: 1 }
			}
		}
	}
})

// 单项数据流，父组件传给子组件，子组件不能传给父组件

var r2 = new Vue({
	el: '#r2',
	data: {
		
	},
	components: {
		'child': {
			props: ['msg'],
			template: '<div>我是子组件---{{msg}}</div>',
			data: function(){
				return { count: this.msg }
			}
		}
	}
})

// 动态设置 div 的宽度
var r3 = new Vue({
	el: '#r3',
	data: {
		width: ''
	},
	components: {
		'child': {
			props: ['parent','width'],
			template: '<div :style="style">I am a child: {{parent}}</div>',
			data: function(){
				return { count: 1 }
			},
			computed: {
				style: function(){
					return {
						width: this.width + 'px',
						background: 'red',
						border: '3px solid blue'
					}
				}
			}
		}
	},
})

//...
var r4 = new Vue({
	el: '#r4',
	data: {
		width: ''
	},
	components: {
		'child': {
			props: ['parent','width'],
			template: '<div :style="style">我是子组件: {{parent}}</div>',
			data: function(){
				return { count: 1 }
			},
			computed: {
				style: function(){
					return {
						width: this.width + 'px',
						border: '3px solid brown',
						padding: '20px 0'
					}
				}
			}
		}
	}
})

//...

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
				style: function(){
					return {
						width: this.width + 'px',
						border: '5px solid brown',
						padding: '10px 0',
						background: 'blue',
						color: 'white'
					}
				}
			}
		}
	}	
})

//...
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
			data: function(){
				return {}
			}
		}
	}
})

//... 
var r7 = new Vue({
	el: '#r7',
	data: {
		a: '111',
		b: {ccc: 555},
		c: true
	},
	components: {
		'child':{
			props: {
				a: String,
				b: [String,Number,Boolean,Object],
				c: {
					type: Boolean
				}
			},
			template: '<div>a: {{a}}--{{typeof a}}, b: {{b}}--{{typeof b}}, c: {{c}}--{{typeof c}}</div>'
		}
	}
})


//...
var r8 = new Vue({
	el: '#r8',
	data: {
		a: '1',
		b: 999,
		c: false,
		e: [989],
		f: 88,
		oo: function(){return 1}
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
					default: function(){
						return [666]
					}
				},
				//自定义验证
				f: {
					validator: function(value){
						return value > 10
					}
				},
				oo: {
					type: Function,
					default: function(){return 2}
				}
			},
			template: `<div>a: {{a}}, b: {{b}}, c: {{c}}, e: {{e}}--{{typeof e}} f: {{f}}
										oo: {{oo}}
								 </div>`
		}
	}
})

// 子组件向父组件传递数据
var r9 = new Vue({
	el: '#r9',
	data: {
		a: 2000
	},
	methods: {
		handleTotal: function(value){
			this.a = value
		}
	},
	components: {
		'child': {
			template: `<div>
				<button @click="handleincrease()">+1000</button>
				<button @click="handledecrease()">-1000</button>
			</div>`,
			data: function(){
				return { count: 2000 }
			},
			methods: {
				handleincrease: function(){
					this.count += 1000
					this.$emit('change', this.count)
				},
				handledecrease: function(){
					this.count -= 1000
					this.$emit('change', this.count)
				}
			}
		}
	}
})

//...
var r99 = new Vue({
	el: '#r99',
	data: {
		total: 1000
	},
	methods: {
		handleChange: function(value){
			this.total = value
		}
	},
	components: {
		'child': {
			template: `<div>
				<button @click="increase()">+1000</button>
				<button @click="decrease()">-1000</button>
			</div>`,
			data: function(){
				return { count: 1000 }
			},
			methods: {
				increase: function(){
					console.log('increase')
					this.count += 1000
					console.log(this.count)
					this.$emit('change', this.count)
				},
				decrease: function(){
					console.log('decrease')
					this.count -= 1000
					console.log(this.count)
					this.$emit('change', this.count)
				}
			}
		}
	}
})

//...
var rr = new Vue({
	el: '#rr',
	data: {
		total: 1000
	},
	methods: {
		changeTotal: function(value){
			this.total = value 
		}
	},
	components: {
		'child': {
			template: `<div>
				<button @click="increase()">+1000</button>
				<button @click="decrease()">-1000</button>
			</div>`,
			data: function(){
				return { count: 1000 }
			},
			methods: {
				increase: function(){
					this.count += 1000
					this.$emit('change', this.count)
				},
				decrease: function(){
					this.count -= 1000
					this.$emit('change', this.count)
				}
			}
		}
	}
})

//...
var s1 = new Vue({
	el: '#s1',
	data: {
		n: 1000
	},
	methods: {
		changen: function(value){
			this.n = value
		}
	},
	components: {
		'child': {
			template: `<div>
				<button @click="increase()">+1000</button>
				<button @click="decrease()">-1000</button>
			</div>`,
			data: function(){
				return { count: 1000 }
			},
			methods: {
				increase: function(){
					this.count += 1000
					this.$emit('change', this.count)
				},
				decrease: function(){
					this.count -= 1000
					this.$emit('change', this.count)
				}
			}
		}
	}
})

//...
var s2 = new Vue({
	el: '#s2',
	data: {
		n: 1000
	},
	methods: {
		
	},
	components: {
		'child': {
			template: `<div>
				<button @click="increase()">+1000</button>
			</div>`,
			data: function(){
				return { count: 1000 }
			},
			methods: {
				increase: function(){
					this.count += 1000
					this.$emit('input', this.count)
				}
			}
		}
	}
})


// 父子传递数据 用 v-model
var s3 = new Vue({
	el: '#s3',
	data: {
		n: 1000
	},
	components: {
		'child': {
			template: `<div>
				<button @click='increase()'>+1000</button>
				<button @click='decrease()'>-1000</button>
			</div>`,
			data: function(){
				return { count: 1000 }
			},
			methods: {
				increase: function(){
					this.count += 1000
					this.$emit('input', this.count)
				},
				decrease: function(){
					this.count -= 1000
					this.$emit('input', this.count)
				}
			}
		}
	}
})

//...
var s4 = new Vue({
	el: '#s4',
	data: {
		n: 1
	},
	components: {
		'child': {
			template: '<div @click="increase()">你点击了 {{a}} 次</div>',
			data: function(){
				return { a: 0 }
			},
			methods: {
				increase: function(){
					this.a += 1
				}
			}
		}
	}
})

// 非父组件的内容传递。关键词 bus: new Vue()  this.$root.bus.$emit('lala', this.aaa);
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
		getSonData: function(){
			this.sondata = this.$refs.b.msg
		}
	},
	components: {
		'acom': {
			template: '<div><button @click="xxx">点我向b组件传递内容</button></div>',
			data: function(){
				return { aaa: '我是a组件传递的内容', msg: '我是a组件的内容' }
			},
			methods: {
				xxx: function(){
					this.$root.bus.$emit('lala', this.aaa)
				}
			}
		},
		'bcom': {
			data: function(){ return { msg: '我是b组件的内容'} },
			template: '<div></div>',
			created: function(){
				this.$root.bus.$on('lala', function(value){
					alert(value)
				})
			}
		},
		'ccom': {
			data: function(){ return { msg: '我是c组件的内容' } },
			template: '<button @click="change">点我修改父组件的信息</button>',
			methods: {
				change: function(){
					this.$parent.msg = '数据修改啦'	
				}
			}
		}
	}
})


// 插槽slot的介绍与作用域
// 使用 slot 分发内容

var s6 = new Vue({
	el: '#s7',
	data: {},
	components: {
		'acom': {
			template:'<div>\
				<slot>\
					如果父组件没有插入内容，我就默认出现\
				</slot>\
			</div>'
		}
	}
})
