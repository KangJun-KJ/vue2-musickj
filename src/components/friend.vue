<template>
	<div :style="styleObject">
		朋友页面
	</div>
</template>

<script>
	export default{
		name:'friend',
		props:{
			styleObject: {
				default: function() {
					return {
						height: "490px",
						width: "800px",
						"float":'right'
					}
				}
			}
		},
		mounted: function() {
			

		}
	}
</script>

<style scoped>
	
</style>