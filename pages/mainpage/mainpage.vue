<template>
	<view>
		<view style="margin-bottom: 10rpx;"></view>
		<u-swiper 
		previousMargin="35rpx"
		nextMargin="35rpx"
		radius="15"
		:list="imglist">
			
		</u-swiper>
		
		<view class="u-m-t-100">
			<u-tabs :list="sortlist" bar-width="200" :current="currentsort" @change="changesort" link></u-tabs>
		</view>
		
	
		<view class="u-page">
			<u-list @scrolltolower="scrolltolower" >
				<u-list-item  
					v-for="(item, index) in indexList"
					:key="index"  
					>
					<view v-if="currentsort==0" @click="infopage(item.userId)"link >
						<u-cell  :title="`姓名:{{item.realName}} \\n 性别：{{item.gender}} \\n 出生日期：{{item.birthday}}`">
						<u-avatar slot="icon" shape="square" size="65" :src="item.picUrl"
							customStyle="margin: -3px 5px -3px 0"></u-avatar>
						</u-cell>
					</view>
					<view v-else @click="infopage(item.userId)"link>
						
						<u-cell :title="`姓名:{{item.childrenName}} \\n 性别：{{item.childrenGender}} \\n 出生日期：{{item.birthday}}`">
						<u-avatar slot="icon" shape="square" size="65" :src="item.childrenUrl"
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
				pagesize:10,
				repagenum:1,
				chpagenum:1,
				imglist:[
					'http://rafrb6vhx.hn-bkt.clouddn.com/swiper.webp',
					'http://rafrb6vhx.hn-bkt.clouddn.com/ban01.jpg',
					'http://rafrb6vhx.hn-bkt.clouddn.com/swiper2.webp'
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
				console.log(index)
				this.currentsort=index.index
				if(this.currentsort==0){
					console.log(this.currentsort)
					postallchildren({pagenum:this.chpagenum,pagesize:this.pagesize}).then(res=>{
						console.log(res.data)
						this.indexList=res.data
						for (var i = 0; i < this.indexList.length; i++) {
							if(this.indexList[i].gender==1){
								this.indexList[i].gender='男'
							}else{
								this.indexList[i].gender='女'
							}
							
						}
					})
				}else{
					postallrelative({pagenum:this.chpagenum,pagesize:this.pagesize}).then(res=>{
						this.indexList=res.data
						console.log(this.indexList)
						for (var j = 0; j < this.indexList.length; j++) {
							if(this.indexList[j].childrenGender==1){
								this.indexList[j].childrenGender='男'
							}else{
								this.indexList[j].childrenGender='女'
							}
							
						}
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
					postallchildren({pagenum:this.chpagenum,pagesize:this.pagesize}).then(res=>{
						console.log(res.data)
						this.indexList=res.data
						for (var i = 0; i < this.indexList.length; i++) {
							if(this.indexList[i].gender==1){
								this.indexList[i].gender='男'
							}else{
								this.indexList[i].gender='女'
							}
							
						}
					})
				}else{
					postallrelative({pagenum:this.chpagenum,pagesize:this.pagesize}).then(res=>{
						this.indexList=res.data
						console.log(this.indexList)
						for (var j = 0; j < this.indexList.length; j++) {
							if(this.indexList[j].childrenGender==1){
								this.indexList[j].childrenGender='男'
							}else{
								this.indexList[j].childrenGender='女'
							}
							
						}
					})
				}
					
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

<style lang="scss">
	
.info{
	box-shadow: 0 1px 1px rgba(152, 152, 152, 0.5);
	
}
</style>
