<template>
	<view>
		<u-swiper :list="imglist"></u-swiper>
		<view class="u-m-t-100">
			<u-tabs :list="sortlist" bar-width="200" :current="currentsort" @change="changesort" link></u-tabs>
		</view>
		
	
		<view class="u-page">
			<u-list @scrolltolower="scrolltolower" >
				<u-list-item  
					v-for="(item, index) in indexList"
					:key="index"  
					>
					<view v-if="currentsort==0" @click="infopage(item.userId)"link>
						
						<u-cell :title="`姓名:{{item.realName}} 性别：{{item.gender}} 出生日期：{{item.birthday}}`">
						<u-avatar slot="icon" shape="square" size="65" :src="item.url"
							customStyle="margin: -3px 5px -3px 0"></u-avatar>
						</u-cell>
					</view>
					<view v-else @click="infopage(item.userId)"link>
						
						<u-cell :title="`姓名:{{item.childrenName}} 性别：{{item.childrenGender}} 出生日期：{{item.birthday}}`">
						<u-avatar slot="icon" shape="square" size="65" :src="item.url"
							customStyle="margin: -3px 5px -3px 0"></u-avatar>
						</u-cell>
					</view>
						
						
					</u-list-item>
				</u-list>
			</view>
			
		
		
	</view>
</template>

<script>
	import {postallchildren,postallrelative} from '../../common/config/api.js'
	
	export default {
		data() {
			return {
				imglist:[
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png'
				],
				sortlist:[
					{name:'走失人发布'},
					{name:'寻亲人发布'}
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
				
				this.currentsort=index.index;
				if(this.currentsort==0){
					console.log(this.currentsort)
					postallchildren({custom:{auth:true}}).then(res=>{
						this.indexList=res.data
					})
				}else{
					postallrelative({custom:{auth:true}}).then(res=>{
						this.indexList=res.data
						console.log(this.indexList)
					})
				}
			},
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				//发送post请求，向后端请求数据
				if(this.currentsort==0){
					console.log(this.currentsort)
					postallchildren({custom:{auth:true}}).then(res=>{
						this.indexList=res.data
					})
				}else{
					postallrelative({custom:{auth:true}}).then(res=>{
						this.indexList=res.data
						console.log(this.indexList)
					})
				}
					
				
				// for (let i = 0; i < 20; i++) {
				// 	this.indexList.push({
				// 		url: this.urls[uni.$u.random(0, this.urls.length - 1)],
				// 		name: "刘桂芳",
				// 		birth_time : "2000-10",
				// 		address: "四川省"
				// 	})
				// }
			},
			
			infopage(userid){
				//如果发帖人身份为走失者（将自己id传递给详细页面）下一个页面在children表中查找数据
				uni.$u.route({
					url: 'pages/info/info',
					params: {
						user_id:userid,
						type:this.currentsort
					}
				})
				
			}
		
		}
	}
</script>

<style>

</style>
