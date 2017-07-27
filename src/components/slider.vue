<template>
	<ul class='slider' :style='styleObject' @mouseover="deleteInter" @mouseout="addInter">
		<li v-for="(item,index) in image" class='image' :class="[move[index]]">
			<template v-if="typeof item === 'object'">
				<img :src="item.src" :style="imgStyle" @click="target(index)" />
				<span :class="{tag:item.tagName}" :style="item.tagStyle">{{item.tagName}}</span>
			</template>
			<template v-if="typeof item === 'string'">
				<img :src="item" :style="imgStyle" @click="target(index)" />
			</template>
		</li>
		<li class="button">
			<em v-for="(item,index) in image" :class="[move[index]]" @mouseover="target(index)"></em>
		</li>
		<li class='control'>
			<em @click="prePic"></em>
			<em @click="nextPic"></em>
		</li>

	</ul>

</template>

<script>
	import { getRecommend } from './../api/recommend.js'
	const dingshiqi = "";
	export default {
		name: 'slider',
		props: {
			styleObject: {
				default: function() {
					return {
						height: 220,
						width: 700,
						"margin": 'auto'
					}
				}
			},
			interval: {
				type: Number,
				default: 5000
			},
			imgStyle: {
				default: function() {
					return {}
				}
			},
			autoRoll: {
				default: function() {
					return true
				}
			},
			direction: {
				default: function() {
					return 'right'
				}
			}
		},
		data() {
			return {
				image: {
					default: function() {
						return [{}]
					}
				},
				move: ['left', 'center', 'right']
			}
		},
		beforeCreate: function() {
			var that = this;
			getRecommend("/banner").then(function(json) {
				that.image = [];
				for(var i = 0; i < json.banners.length; i++) {
					that.image.push({
						src: json.banners[i].pic,
						tagName: json.banners[i].typeTitle
					});
				}
				for(let i = 3; i < that.image.length; i++) {
					that.move[i] = 'wait';
				}
				that.startRoll();
			}, function(error) {
				console.error('出错了', error);
			});
		},
		mounted: function() {
			const width = parseInt(this.styleObject.width);
			const height = parseInt(this.styleObject.height);
			this.imgStyle.width = .7 * width + 'px';
			this.imgStyle.height = .9 * height + 'px';
			this.styleObject.width += "px"
			this.styleObject.height += "px"
		},
		methods: {
			startRoll: function() {
				if(this.autoRoll) {
					if(this.direction == "left") {
						this.dingshiqi = setInterval(this.prePic, this.interval)
					} else {
						this.dingshiqi = setInterval(this.nextPic, this.interval)
					}
				}
			},
			nextPic: function() {
				clearInterval(this.dingshiqi);
				let temp = this.move.pop();
				this.move.unshift(temp);
				this.startRoll();
			},
			prePic: function() {
				clearInterval(this.dingshiqi);
				let temp = this.move.shift();
				this.move.push(temp);
				this.startRoll();
			},
			target: function(pos) {
				clearInterval(this.dingshiqi);
				const num = this.image.length;
				for(let i = 0; i < num; i++) {
					this.move[i] = 'wait';
				}
				this.move[pos] = 'center';
				this.move[pos + 1 < num ? pos + 1 : 0] = 'right';
				this.move[pos - 1 >= 0 ? pos - 1 : num - 1] = 'left';
				this.move = this.move.concat()
				this.startRoll();
			},
			deleteInter: function() {
				clearInterval(this.dingshiqi);
			},
			addInter: function() {
				this.startRoll();
			}
		}
	}
</script>

<style scoped>
	* {
		padding: 0;
		margin: 0;
	}
	
	.slider {
		position: relative;
	}
	
	.slider li {
		margin: 0;
		padding: 0;
		position: absolute;
		list-style: none;
		bottom: 0px;
		transition: transform .5s, scale 1s, left .5s, right .5s, z-index .3s, background-color.1s;
	}
	/*.image:after,*/
	
	.control em:after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 5px;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 101;
	}
	
	li.left {
		left: 0%;
		z-index: 10;
	}
	
	li.center {
		transform-origin: bottom;
		transform: scaleY(1.05);
		left: 15%;
		z-index: 100;
	}
	
	li.center:after {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	li.right {
		left: 30%;
		z-index: 10;
	}
	
	li.wait {
		transform: scale(.8);
		left: 15%;
		z-index: 1;
	}
	
	.button {
		background-color: rgba(0, 0, 0, 0)!important;
		text-align: center;
		width: 100%;
		height: 5px;
		top: calc(100% - 5px)!important;
	}
	
	.button em {
		display: inline-block;
		line-height: 10px;
		width: 30px;
		height: 2px;
		background-color: darkgrey;
		border-radius: 10px;
		margin: 0 2px;
		cursor: pointer;
	}
	
	em.center {
		background-color: red;
	}
	
	.control em:first-child,
	.control em:last-child {
		position: absolute;
		display: block;
		width: 30px;
		height: 30px;
		background-size: cover;
		z-index: 100;
		cursor: pointer;
	}
	
	.control:hover ::after {
		background-color: rgba(0, 0, 0, 0);
	}
	
	.control em:first-child {
		left: 0px;
		background-image: url('../assets/img/pre.png');
	}
	
	.control em:last-child {
		right: 0px;
		background-image: url('../assets/img/next.png');
	}
	
	.control {
		width: 100%;
		height: 30px;
		top: calc(50% - 20px);
		display: none;
		left: 0;
	}
	
	.slider:hover .control {
		display: inline-block;
	}
	
	.tag {
		display: inline-block;
		padding: 5px;
		background-color: green;
		position: absolute;
		right: 0px;
		bottom: 15px;
		border-top-left-radius: 10px;
		font-size: .5rem;
		border-bottom-left-radius: 10px;
		color: white;
	}
</style>