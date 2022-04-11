<template>
	
	<view>
		<u--form labelPosition="left" :model="model" :rules="rules" ref="form1">
			<u-form-item v-if="vuex_status==2">个人基本信息</u-form-item>
			<u-form-item v-if="vuex_status==3">走失人基本信息</u-form-item>
			<u-form-item label="姓名" prop="name" borderBottom ref="item1">
				<u-text :text="releaseinfo.realName"></u-text>
			</u-form-item>
			<u-form-item label="性别" prop="userInfo.sex"   ref="item1">
				<u-text :text="releaseinfo.gender"></u-text>
			</u-form-item>
			<u-form-item label="年龄" prop="age">
				<u-text :text="releaseinfo.age"></u-text>		
			</u-form-item>
			<u-form-item label="出生日期" prop="birthday">
				<u-text :text="releaseinfo.birthday"></u-text>
			</u-form-item>
			<view v-if="vuex_status==2">
				<u-form-item  label="现居住地" prop="address">
					<u-text :text="releaseinfo.nowAddress"></u-text>
				</u-form-item>
				<u-form-item label="联系电话">
					<u-text :text="releaseinfo.phone"></u-text>
				</u-form-item>
				<u-form-item label="联系邮箱">
					<u-text :text="releaseinfo.eMail"></u-text>
				</u-form-item>
			</view>
			
		
			<u-form-item>走失信息</u-form-item>
			<u-form-item label="时间">
				<u-text :text="releaseinfo.lostTime"></u-text>
			</u-form-item>
			<u-form-item label="地点">
				<u-text :text="releaseinfo.lostAddress"></u-text>
			</u-form-item>
			<u-form-item label="穿着">
				<u-text :text="releaseinfo.lostCloth"></u-text>
			</u-form-item>
			<u-form-item label="身高">
				<u-text :text="releaseinfo.lostHeight"></u-text>
			</u-form-item>
			<u-form-item label="详细描述">
				<u-text :text="releaseinfo.details"></u-text>
			</u-form-item>
		
			<view v-if="vuex_status==3">
				<u-form-item >亲属关系</u-form-item>
				<u-form-item label="关系">
					<text v-model="model.relation" placeholder="与走失者关系"></text>
				</u-form-item>
				<u-form-item label="联系电话">
					<u--input v-model="model.userInfo.phone" placeholder="联系电话"></u--input>
				</u-form-item>
				<u-form-item label="联系邮箱">
					<u--input v-model="model.userInfo.email" placeholder="联系邮箱"></u--input>
				</u-form-item>
			</view>
			
			
			<view style="display: flex;align-items: center;justify-content: center;" >
				<button @click="changeform()" style="width: 100px;text-align: center; color: #FFFFFF;background-color:#007AFF;">修改信息</button>
			</view>
			
		</u--form>
	</view>
</template>

<script>
	import {postchildrenbyid} from '../../../common/config/api.js'
	export default {
		data() {
			return {
				/* 当前用户是否已发布消息，如果发布则查询，未发布则可以跳转到发布信息页面 */
				isrelease:false,
				releaseinfo:{},
				
			}
		},
		
		onLoad() {
			this.lookmyrelease();
		},
		methods: {
			lookmyrelease(){
				//如果用户的身份为走失者，那么就去children表中寻找数据
				switch(this.vuex_status){
					case 2:
						postchildrenbyid({user_id:this.vuex_user.user_id}).then((res)=>{
							this.releaseinfo=res.data;
							console.log(this.releaseinfo)
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
			changeform(){
				uni.$u.route({
					url:'pages/mainpage/manageinfo/updateinfo'
				})
			}
			
			
		}
	}
</script>

<style>

</style>
