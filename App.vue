<script>
	export default {
		globalData: {  
			websocket:null,
			
			
		},
		
		onLaunch: function() {
			
			console.log('App Launch')
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		

		
	}
</script>


<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import url("static/css/base.css");
</style>
	

