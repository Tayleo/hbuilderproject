<template>
	<view>
		<u--form labelPosition="left" :model="model" :rules="rules" ref="form1">
			<u-form-item v-if="vuex_status==2">个人基本信息</u-form-item>
			<u-form-item v-if="vuex_status==3">走失人基本信息</u-form-item>
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
			<view v-if="vuex_status==2">
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
		
			<view v-if="vuex_status==3">
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
				<button @click="submitform()" style="width: 100px;text-align: center; color: #FFFFFF;background-color:#007AFF;">提交</button>
			</view>
			
		</u--form>
	</view>
</template>

<script>
	import {cpostform} from "../../../common/config/api.js"
	export default {
		data() {
			return {
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
		methods: {
			sexSelect(e) {
				this.model.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			
			submitform(){
				console.log(this.model)
				if(this.vuex_status==2){
					cpostform({ forminfo:this.model , user_id:this.vuex_user.user_id}).then((res)=>{
						console.log("ceeevcreb")
					}).catch(()=>{
						
					})
				}if(this.vuex_status==3){
					console.log("res")
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
