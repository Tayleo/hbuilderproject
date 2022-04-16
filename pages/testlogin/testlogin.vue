<template>
	<view>
		
		</view>
	</view>
	
	
	
</template>

<script>
	
	export default {
		data() {
			return {
				footAnimationData: {},
				KeyboardHeight: 0,
			}
		},
		methods: {
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.flex-column-center {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed !important;
		background-color: #f3f3f3;
		border-radius: 10rpx;
		z-index: 9999999;
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}
	
</style>
