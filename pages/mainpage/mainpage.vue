<template>
	<view>
		<u-swiper :list="imglist"></u-swiper>
		<view class="u-m-t-100">
			<u-tabs :list="sortlist" bar-width="200" :current="currentsort" @change="changesort" link></u-tabs>
		</view>
		
	
		<view class="u-page">
			<u-list @scrolltolower="scrolltolower" >
				<uni-list-item  
					v-for="(item, index) in indexList"
					:key="index"  
					@click="infopage()"link>
						<u-cell :title="`姓名:  ${item.name}
						出生日期：${item.birth_time}
						家庭住址：${item.address}`">
						<u-avatar slot="icon" shape="square" size="65" :src="item.url"
							customStyle="margin: -3px 5px -3px 0"></u-avatar>
						</u-cell>
						
					</uni-list-item>
				</u-list>
			</view>
			
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imglist:[
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png'
				],
				sortlist:[
					{name:'默认'},
					{name:'销量'},
					{name:'推荐'},
					{name:'最新'}
				],
				currentsort:0,
				indexList: [],
				urls: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg',
				]
			}
		},
		onLoad() {
			this.loadmore()
		},
		methods: {

			changesort(index){
				console.log(index);
				this.currentsort=index;
			},
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				for (let i = 0; i < 30; i++) {
					this.indexList.push({
						url: this.urls[uni.$u.random(0, this.urls.length - 1)],
						name: "刘桂芳",
						birth_time : "2000-10",
						address: "四川省"
					})
				}
			},
			
			infopage(){
				console.log('test');
				uni.navigateTo({
					url:"../info/info"
				})
				
			}
		
		}
	}
</script>

<style>

</style>
