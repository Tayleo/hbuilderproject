<template>
	<view >
		
		<u--form labelPosition="left" :model="model" :rules="rules" ref="form1">
			<u-form-item v-if="vuex_user.role_id==2">
				<view class="text">个人基本信息</view>
			</u-form-item>
			<u-form-item v-if="vuex_user.role_id==3">
				<view class="text">走失人基本信息</view>
			</u-form-item>
			<view class="form">
				<u-form-item label="照片" prop="pic" borderBottom>
					<u-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						:multiple="false"
						:maxCount="1"
					></u-upload>
				</u-form-item>
				<u-form-item label="姓名" prop="name" borderBottom ref="item1">
					<u--input placeholder="请输入姓名" v-model="model.userInfo.name" ></u--input>
				</u-form-item>
				<u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true;" ref="item1">
					<u--input v-model="model.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-action-sheet
					:show="showSex"
					:actions="actions"
					title="请选择性别"
					@close="showSex = false"
					@select="sexSelect">
				</u-action-sheet>
				<u-form-item label="年龄" prop="age">
					<u--input v-model="model.userInfo.age" placeholder="年龄"></u--input>		
				</u-form-item>
				<u-form-item label="出生日期" prop="userInfo.birthday" @click="showcalendar = true;" ref="item2">
					<u--input  disabled v-model="model.userInfo.birthday" disabledColor="#ffffff" placeholder="选择出生日期" border="none" ></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-datetime-picker
					ref="datetimePicker"
					:show="showcalendar"
					v-model="value1"
					mode="date"
					:minDate="315504000"
					@confirm="confirmbir"
					@cancel="showcalendar=false"
				></u-datetime-picker>
				<u-form-item label="相貌特征">
					<u--input v-model="model.userInfo.features" placeholder="请输入相貌特征"></u--input>
				</u-form-item>
				
				<view v-if="vuex_user.role_id==2">
					<u-form-item  label="现居住地" prop="address">
						<u--input v-model="model.userInfo.address" placeholder="请输入目前居住地"></u--input>
					</u-form-item>
					<u-form-item label="联系电话">
						<u--input v-model="model.userInfo.phone" placeholder="请输入联系电话"></u--input>
					</u-form-item>
					<u-form-item label="联系邮箱">
						<u--input v-model="model.userInfo.email" placeholder="请输入邮箱"></u--input>
					</u-form-item>
				</view>
			</view>
			
			
		
			<u-form-item>
				<view class="text">走失信息</view>
			</u-form-item>
			<view class="form">
				<u-form-item label="时间">
					<u--input v-model="model.lost.time" placeholder="请输入走失时间"></u--input>
				</u-form-item>
				<u-form-item label="地点">
					<u--input v-model="model.lost.address" placeholder="请输入走失地点"></u--input>
				</u-form-item>
				<u-form-item label="穿着">
					<u--input v-model="model.lost.cloth" placeholder="请输入走失时穿着"></u--input>
				</u-form-item>
				<u-form-item label="身高">
					<u--input v-model="model.lost.height" placeholder="请输入走失时身高"></u--input>
				</u-form-item>
				<u-form-item label="详细描述">
					<!-- <u--input v-model="model.lost.details" 
					type="textarea" placeholder="走失情况详细描述"></u--input> -->
					<u--textarea v-model="model.lost.details" placeholder="走失情况详细描述" ></u--textarea>
				</u-form-item>
			</view>
			
		
			<view v-if="vuex_user.role_id==3">
				<u-form-item >
					<view class="text">与走失者关系</view>
				</u-form-item>
				<view class="form">
					<u-form-item label="关系">
						<u--input v-model="model.relation" placeholder="与走失者关系"></u--input>
					</u-form-item>
					<u-form-item label="联系电话">
						<u--input v-model="model.userInfo.phone" placeholder="联系电话"></u--input>
					</u-form-item>
					<u-form-item label="联系邮箱">
						<u--input v-model="model.userInfo.email" placeholder="联系邮箱"></u--input>
					</u-form-item>
				</view>
			</view>
			<view v-else></view>
			
			<view>
				<view style="height:110rpx;display: flex;align-items: center;justify-content: center;" >
					
					<button @click="submitform()" style="width: 100px;text-align: center; color: white;background-color:#12AE85;">提交修改</button>
				</view>
			</view>
		</u--form>
	</view>
</template>

<script>
	import {cupdateform,rupdateform,cpostform,rpostform,postchildrenbyid,postRelativeById} from "../../../common/config/api.js"
	import myfun from '../../../common/js/myfun.js'
	export default {
		data() {
			return {
				releaseinfo:{},
				showcalendar:false,
				showSex: false,
				isrelease:null,
				value1: Number(new Date()),
				fileList1: [{
					url:''
				}],
				imgurl:'',
				imgurlbefore:'',
				imgtype:'',
				model: {
					userInfo: {
						name: '',
						sex: '',
						age: 0,
						birthday:'',
						address :'',
						phone:'',
						email:'',
						features:'',
					},
					lost:{
						time:'',
						cloth:'',
						height:'',
						address:'',
						details:'',
					},
					relation:'',
				},
				actions: [
					{name: '男',},
					{name: '女',},
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.name':{
						type:'integer'
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			}
		},
		onLoad() {
			
			this.lookmyrelease();
		},
		methods: {
			
			lookmyrelease(){
				//如果用户的身份为走失者，那么就去children表中寻找数据
				
				console.log(this.vuex_user.role_id)
				console.log(this.vuex_user.user_id)
				switch(this.vuex_user.role_id){
					case 2:
						postchildrenbyid({user_id:this.vuex_user.user_id}).then((res)=>{
							this.fileList1[0].url=res.data.picUrl
							this.imgurlbefore=res.data.picUrl
							console.log(res.data)
							this.model=myfun.chtransform(res.data)
							this.isrelease=res.data.isRelease
							console.log(this.releaseinfo)
						}).catch(()=>{
							
						})
						break;
					case 3:
						postRelativeById({user_id:this.vuex_user.user_id}).then((res)=>{
							this.fileList1[0].url=res.data.childrenUrl
							this.imgurlbefore=res.data.childrenUrl
							this.model=myfun.retransform(res.data)
							this.isrelease=res.data.isRelease
							this.imgurl=res.data.childrenUrl
						}).catch(()=>{
							
						})
						break;
					default:
						//
				}
				
			},
			
			
			
			sexSelect(e) {
				this.model.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			
			confirmbir(e){
				console.log()
				this.model.userInfo.birthday = this.result(e.value,'date')
				this.$refs.form1.validateField('userInfo.birthday')
				this.showcalendar=false;
			},
			
			async submitform(){
				console.log(this.model);
				//上传图片
				
				if(this.fileList1[0]!=null&&this.fileList1[0].url!=this.imgurlbefore){
					
					const result = await this.uploadFilePromise(this.fileList1[0].url)
					this.imgurl=result
					console.log("this is imgurl"+this.imgurl)
				}
				
				
				if(this.vuex_user.role_id==2){
					cupdateform({ forminfo:this.model,user_id:this.vuex_user.user_id,imgurl:this.imgurl}).then((res)=>{
						uni.showToast({
							title: '提交信息成功',
							duration: 2000
						})
						uni.$u.route('/pages/mainpage/manageinfo/lookinfo');
						
						//跳转回查看信息界面
						// uni.switchTab({
						// 	url: '/pages/mypages/users'
						// })
						
					}).catch((err)=>{
						console.log(err)	
					})
				}if(this.vuex_user.role_id==3){
					rupdateform({ forminfo:this.model,user_id:this.vuex_user.user_id,imgurl:this.imgurl}).then((res)=>{
						
						uni.showToast({
							title: '提交信息成功',
							duration: 2000,
						});
						console.log("修改成功")
						uni.$u.route('/pages/mainpage/manageinfo/lookinfo');
					}).catch((err)=>{
						console.log(err)	
					})
				}
				
			},
			result(time, mode) {
				const timeFormat = uni.$u.timeFormat;
				switch (mode) {
					case 'datetime':
						return timeFormat(time, 'yyyy-mm-dd hh:MM')
					case 'date':
						return timeFormat(time, 'yyyy-mm-dd')
					case 'year-month':
						return timeFormat(time, 'yyyy-mm')
					case 'time':
						return time
					default:
						return ''
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'success',
					})
				})
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://localhost:8081/UsersController/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						
						success: (res) => {
							resolve(res.data)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.form{
		width: 90%;
		margin-left: 4%;
	}
	.text{
		margin-left: 2rpx;
		font-size: 28rpx;
		font-weight: bold;
		height: 50rpx;
		color: #767A82;
	}
</style>
