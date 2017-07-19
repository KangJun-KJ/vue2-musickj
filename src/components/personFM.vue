<template>
	<div :style="styleObject">
		私人FM页面
	</div>
</template>

<script>
	export default{
		name:'personFM',
		props:{
			styleObject: {
				default: function() {
					return {
						height: 490,
						width: 800,
						"float":'right'
					}
				}
			}
		},
		mounted: function() {
			const width = parseInt(this.styleObject.width);
			const height = parseInt(this.styleObject.height);
			this.styleObject.width += "px"
			this.styleObject.height += "px"

		}
	}
</script>

<style scoped>
	
</style>