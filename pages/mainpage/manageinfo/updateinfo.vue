<template>
	<view>
		<u--form labelPosition="left" :model="model" :rules="rules" ref="form1">
			<u-form-item v-if="vuex_user.role_id==2">个人基本信息</u-form-item>
			<u-form-item v-if="vuex_user.role_id==3">走失人基本信息</u-form-item>
			<u-form-item label="姓名" prop="name" borderBottom ref="item1">
				<u--input placeholder="请输入姓名" v-model="model.userInfo.name" ></u--input>
			</u-form-item>
			<u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true; hideKeyboard()" ref="item1">
				<u--input v-model="model.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-action-sheet
				:show="showSex"
				:actions="actions"
				title="请选择性别"
				description="如果选择保密会报错"
				@close="showSex = false"
				@select="sexSelect">
			</u-action-sheet>
			<u-form-item label="年龄" prop="age">
				<u--input v-model="model.userInfo.age" placeholder="年龄"></u--input>		
			</u-form-item>
			<u-form-item label="出生日期" prop="birthday">
				<u--input v-model="model.userInfo.birthday" placeholder="日期格式为YYYY-MM-XX"></u--input>
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
			
		
			<u-form-item>走失信息</u-form-item>
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
				<u--input v-model="model.lost.details" placeholder="走失情况详细描述"></u--input>
			</u-form-item>
		
			<view v-if="vuex_user.role_id==3">
				<u-form-item >亲属关系</u-form-item>
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
			
			
			<view style="display: flex;align-items: center;justify-content: center;" >
				<button @click="submitupdate()" style="width: 100px;text-align: center; color: #FFFFFF;background-color:#007AFF;">提交修改</button>
			</view>
			
			<u-popup :show="update" mode="center" >
				<view>确认修改以及发布的信息？</view>
				<u-button @click="updateinfo()">确认</u-button>
				<u-button>取消</u-button>
			</u-popup>
			
			<u-popup :show="updatesuccess" mode="center">
				<view>修改成功</view>
			</u-popup>
			
		</u--form>
	</view>
</template>

<script>
	import {postchildrenbyid,cupdateform} from '../../../common/config/api.js'
	export default {
		data() {
			return {
				update:false,
				updatesuccess:false,
				releaseinfo:{},
				showSex: false,
				model: {
					userInfo: {
						name: '',
						sex: '',
						age: '',
						birthday:'',
						address :'',
						phone:'',
						email:''
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
					{name: '保密',}
					,
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
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
			this.getinfo()
		},
		methods: {
			sexSelect(e) {
				this.model.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			getinfo(){
				//如果用户的身份为走失者，那么就去children表中寻找数据
				switch(this.vuex_user.role_id){
					case 2:
						postchildrenbyid({user_id:this.vuex_user.user_id}).then((res)=>{
							this.releaseinfo=res.data;
							console.log(this.releaseinfo)
							
							this.model.userInfo.name=this.releaseinfo.realName;
							if(this.releaseinfo.gender==1){
								this.model.userInfo.sex='男'
							}else{
								this.model.userInfo.sex='女'
							}
							
							this.model.userInfo.age=this.releaseinfo.age;
							this.model.userInfo.address=this.releaseinfo.nowAddress;
							this.model.userInfo.birthday=this.releaseinfo.birthday;
							this.model.userInfo.phone=this.releaseinfo.phone;
							this.model.userInfo.email=this.releaseinfo.eMail;
							
							this.model.lost.address=this.releaseinfo.lostAddress
							this.model.lost.cloth=this.releaseinfo.lostCloth
							this.model.lost.details=this.releaseinfo.details
							this.model.lost.height=this.releaseinfo.lostHeight
							this.model.lost.time=this.releaseinfo.lostTime
							
						}).catch(()=>{
							
						})
						break;
					case 3:
						//
						break;
					case 4:
						//
						break;
					default:
						//
				}
			},
			submitupdate(){
				this.update=true
			},
			
			changeupdate(){
				setTimeout(function(){
					this.updatesuccess=false;
					console.log(this.updatesuccess)
				},3000)
			},
			
			updateinfo(){
				//发送修改请求，成功后则跳出界面
				cupdateform({ forminfo:this.model , user_id:this.vuex_user.user_id}).then((res)=>{
					console.log("ceeevcreb");
					this.update=false;
					this.updatesuccess=true;
					console.log(this.updatesuccess);
					setTimeout(()=>{
						
						this.updatesuccess=false;
						
					},2000)
					
					
					//this.changeupdate()
				}).catch(()=>{
					
				})
			},
			
			
		}
	}
</script>

<style>

</style>
