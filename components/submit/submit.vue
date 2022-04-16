<template>
	<view class="panel">
		<view class="panel-top">
			<view class="left">
				<view class="sound" @tap="sound" v-if="isSound"><image lazy-load src="../../static/pic/chat/sound.png" mode="widthFix"></image></view>
				<view class="sound" @tap="sound" v-else><image lazy-load src="../../static/pic/chat/keypress.png" mode="widthFix"></image></view>
			</view>
			<view class="center">
				<view class="inputbox" v-if="isSound"><textarea class="c_input" v-model="content" auto-height="true" placeholder="" /></view>
				<view class="inputbox s_btn" :class="touch ? 'touch' : ''" v-else @touchstart="start" @touchend="end" @touchmove="move">按住录音</view>
			</view>
			<view class="right">
				<view class="emoji" @tap="show('emoji')"><image src="../../static/pic/chat/emoji.png" mode="widthFix"></image></view>
				<view class="add" v-show="!content.length" @tap="show('model')"><image src="../../static/images/chat/add.png" mode="widthFix"></image></view>
				<view class="send" v-show="content.length" @tap="sendMsg"><view class="btnbox">发送</view></view>
			</view>
		</view>
		<view class="panel-bottom" :animation="animationData">
			<emoji @emotion="emotion" v-show="type == 'emoji'"></emoji>
			<view class="bottom-box" v-show="type == 'model'">
				<view class="module" @tap="selectImg">
					<view class="module-item"><image lazy-load src="../../static/pic/chat/photo.png" mode="widthFix"></image></view>
					<view class="module-title">照片</view>
				</view>
				<view class="module">
					<view class="module-item"><image lazy-load src="../../static/pic/chat/camera.png" mode="widthFix"></image></view>
					<view class="module-title">拍摄</view>
				</view>
				<view class="module" @tap="chooseLocation">
					<view class="module-item"><image lazy-load src="../../static/pic/chat/position.png" mode="widthFix"></image></view>
					<view class="module-title">位置</view>
				</view>
				<view class="module">
					<view class="module-item"><image lazy-load src="../../static/pic/chat/video.png" mode="widthFix"></image></view>
					<view class="module-title">视频</view>
				</view>
				<view class="module">
					<view class="module-item"><image lazy-load src="../../static/pic/chat/file.png" mode="widthFix"></image></view>
					<view class="module-title">文件</view>
				</view>
				<!-- <view class="module" @tap="money">
					<view class="module-item"><image class="hongbao" lazy-load src="../../static/images/chat/hongbao.png" mode="widthFix"></image></view>
					<view class="module-title">红包</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import emoji from '../emoji/emoji.vue';
import emojiList from '../../common/js/emoji.js';
import request from '../../common/config/request.js';
 import { mapGetters } from 'vuex';

const recorderManager = uni.getRecorderManager();

export default {
	data() {
		return {
			content: '',
			animationData: {},
			isShow: false,
			type: 'emoji',
			pbHeight: 0,
			isSound: true,
			touch: false,
			height: 0,
			timer: null,
			duration: 0, //录音的时间
			startPageY: 0,
			movePageY: 0
		};
	},
	props: ['id', 'chatType','maxDuration'],
	computed: {
		...mapGetters(['getUser', 'getChatType'])
	},
	mounted() {
		this.measure();
	},
	methods: {
		// 动画
		show(type) {
			if (this.type == type) {
				this.isShow = !this.isShow;
			} else {
				this.type = type;
				if (!this.isShow) {
					this.isShow = !this.isShow;
				} else {
					return;
				}
			}
			var animation = uni.createAnimation({
				duration: 200,
				timingFunction: 'ease'
			});

			if (this.isShow) {
				animation.height('380rpx').step();
			} else {
				animation.height('0rpx').step();
			}

			setTimeout(() => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.panel')
					.boundingClientRect(data => {
						this.$emit('measure', data.height);
					})
					.exec();
			}, 220);
			this.animationData = animation.export();
		},

		// 发送图片
		selectImg() {
			let url = this.chatType == 'private' ? 'http://localhost:3000/upload/chat/private/img' : 'http://localhost:3000/upload/chat/group/img';
			// let url = this.chatType == 'private' ? 'http://www.yemengs.cn/upload/chat/private/img' : 'http://www.yemengs.cn/upload/chat/group/img';

			let savePath = this.chatType == 'private' ? 'privateChat' : 'groupChat';
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					const uploadTask = uni.uploadFile({
						url,
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							token: uni.getStorageSync('token'),
							id: this.id,
							savePath
						},
						success: uploadFileRes => {
							let data = JSON.parse(uploadFileRes.data);
							if (this.chatType == 'private') {
								//私聊
								this.$store.commit('updateChatMsg', {
									chatType: 'private',
									belong: this.getUser._id,
									date: new Date(),
									message: data.message,
									img: data.img,
									type: 'image'
								});
							} else {
								//群聊
								this.$store.commit('updateChatMsg', {
									id: this.id,
									chatType: 'group',
									user: {
										name: this.getUser.name,
										avatars: this.getUser.avatars
									},
									belong: this.getUser._id,
									date: new Date(),
									message: data.message,
									img: data.img,
									type: 'image'
								});
							}
						}
					});
					uploadTask.onProgressUpdate(res => {});
				}
			});
		},
		// 发送信息
		sendMsg() {
			if (this.content != '') {
				let reg = /(\[([u4e00-\u9fa5]{1,3})|[a-zA-Z]{1,3}\])/g;
				let emoji_list = this.content.replace(reg, list_item => {
					let emojiItem = emojiList.filter(item => {
						return item.alt == list_item;
					});
					// src需要换成自己的服务器地址
					// let imgstr = '<img class="emoji" src="/static/emoji/' + emojiItem[0].url + '">';
					let imgstr = '<img class="emoji" src="http://www.yemengs.cn/emoji/' + emojiItem[0].url + '">';
					return imgstr;
				});
				this.$store.dispatch('sendMsg', {
					message: emoji_list,
					id: this.id,
					token: uni.getStorageSync('token'),
					type: 'text',
					chatType: this.chatType
				});
			}
			this.content = '';
		},
		// 选择表情
		emotion(emoji) {
			if(emoji == '98.gif'){ //删除操作
				// let reg =  /\[(.*?)\]/g;
				// // let result = reg.exec(this.content)
				// let array = []
				// let temp =null
				// while ((temp = reg.exec(this.content)) ) {
				//   array.push(temp[0])
				// }
				// console.log(array)
				this.content = this.content.slice(0,this.content.length-1)
			}else{
				let emojiItem = emojiList.filter(item => {
					return item.url == emoji;
				});
				this.content = this.content + emojiItem[0].alt;
			}
		},
		// 点击录音按钮和键盘按钮触发的事件
		sound() {
			this.isSound = !this.isSound;
			if (this.isShow) {
				this.show(this.type);
			}
		},
		// 开始录音
		start(e) {
			this.touch = true;
			this.startPageY = e.touches[0].pageY;
			this.movePageY = e.touches[0].pageY;
			console.log('开始录音');
			// #ifdef APP-PLUS
			recorderManager.start();
			// #endif
			this.$emit('record', true);
			this.timer = setInterval(() => {
				this.duration++;
				if(this.duration>=this.maxDuration){
					this.end()
				}
			}, 1000);
		},
		// 结束录音
		end() {
			this.touch = false;
			console.log('录音结束');
			this.$emit('record', false);
			clearInterval(this.timer);
			if (this.startPageY - this.movePageY > 40) {//取消发送语音
				this.duration = 0
			} else {
				console.log('发送语音');
				// let url = this.chatType == 'private' ? 'http://localhost:3000/upload/chat/private/voice' : 'http://localhost:3000/upload/chat/group/voice';
				let url = this.chatType == 'private' ? 'http://www.yemengs.cn/upload/chat/private/voice' : 'http://www.yemengs.cn/upload/chat/group/voice';
				let savePath = this.chatType == 'private' ? 'privateVoice' : 'groupVoice';

				
				// #ifdef H5   
				// 以下代码是在H5端测试时使用
				// let filePath = "/static/mp3/1.wav"
				let filePath = "/static/mp3/2.mp3"
				let fileFormat = (filePath).split(".");
				uni.uploadFile({
					url,
					filePath,
					name: 'file',
					formData: {
						token: uni.getStorageSync('token'),
						id: this.id,
						savePath,
						suffix:fileFormat[fileFormat.length - 1],
						duration:this.duration
					},
					success: (uploadFileRes) => {
						let data = JSON.parse(uploadFileRes.data);
						if (this.chatType == 'private') {
							//私聊
							this.$store.commit('updateChatMsg', {
								chatType: 'private',
								belong: this.getUser._id,
								date: new Date(),
								message: data.message,
								type: 'voice',
								duration:this.duration
							});
						} else {
							//群聊
							this.$store.commit('updateChatMsg', {
								id: this.id,
								chatType: 'group',
								user: {
									name: this.getUser.name,
									avatars: this.getUser.avatars
								},
								belong: this.getUser._id,
								date: new Date(),
								message: data.message,
								type: 'voice',
								duration:this.duration
							});
						}
						this.duration = 0;
					}
				})
				// #endif
				// #ifdef APP-PLUS
				recorderManager.stop();
				recorderManager.onStop(res => {
						uni.uploadFile({
							url,
							filePath:  res.tempFilePath,
							name: 'file',
							formData: {
								token: uni.getStorageSync('token'),
								id: this.id,
								savePath,
								duration:this.duration
							},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data);
								console.log(data)
								console.log(this.duration)
								if (this.chatType == 'private') {
									//私聊
									this.$store.commit('updateChatMsg', {
										chatType: 'private',
										belong: this.getUser._id,
										date: new Date(),
										message: data.message,
										type: 'voice',
										duration:this.duration
									});
								} else {
									//群聊
									this.$store.commit('updateChatMsg', {
										id: this.id,
										chatType: 'group',
										user: {
											name: this.getUser.name,
											avatars: this.getUser.avatars
										},
										belong: this.getUser._id,
										date: new Date(),
										message: data.message,
										type: 'voice',
										duration:this.duration
									});
								}
								this.duration = 0;
							}
						});
						
				})
				// #endif
				
			}
		},
		move(e) {
			this.movePageY = e.touches[0].pageY;
		},
		// 获取该组件的高度
		measure() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.panel')
				.boundingClientRect(data => {
					this.height = data.height;
					setTimeout(() => {
						this.$emit('measure', data.height);
					});
				})
				.exec();
		},
		// 选择位置
		chooseLocation() {
			uni.chooseLocation({
				success: res => {
					// console.log('位置名称：' + res.name);
					// console.log('详细地址：' + res.address);
					// console.log('纬度：' + res.latitude);
					// console.log('经度：' + res.longitude);
					this.$store.dispatch('sendMsg', {
						message: res,
						id: this.id,
						token: uni.getStorageSync('token'),
						type: 'location',
						chatType: this.chatType
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.panel {
	position: fixed;
	z-index: 1100;
	left: 0;
	right: 0;
	width: 100vw;
	bottom: 0rpx;
	padding-bottom: env(safe-area-inset-bottom);
	.panel-top {
		display: flex;
		overflow: hidden;
		background: #f4f4f4;
		.left {
			width: 80rpx;
			.sound {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				image {
					width: 70%;
					height: 70%;
					margin-bottom: 24rpx;
				}
			}
		}
		.center {
			flex: 1;
			.inputbox {
				max-height: 158rpx;
				margin: 14rpx;
				border-radius: 10rpx;
				background: rgba(252, 253, 255, 1);
				box-sizing: border-box;
				padding: 20rpx 24rpx;
				overflow: hidden;
				textarea {
					width: 100%;
					font-size: 32rpx;
				}
			}
			.s_btn {
				height: 80rpx;

				font-size: 32rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #b3b3b3;
			}
			.touch {
				background: #43d305;
				color: white;
			}
		}
		.right {
			display: flex;
			.emoji {
				width: 80rpx;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				margin-right: 4rpx;
				image {
					width: 70%;
					height: 70%;
					margin-bottom: 24rpx;
				}
			}
			.add {
				width: 80rpx;
				display: flex;
				justify-content: center;
				margin-right: 4rpx;
				align-items: flex-end;
				image {
					width: 70%;
					height: 70%;
					margin-bottom: 24rpx;
				}
			}
			.send {
				width: 120rpx;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				.btnbox {
					height: 56rpx;
					line-height: 56rpx;
					color: white;
					border-radius: 10rpx;
					width: 90%;
					margin-right: 10%;
					font-size: 30rpx;
					background: rgb(4, 179, 4);
					text-align: center;
					margin-bottom: 24rpx;
				}
			}
		}
	}
	.panel-bottom {
		background: #ecedee;
		height: 0rpx;
		overflow: hidden;
		.bottom-box {
			margin: 30rpx;
			width: calc(100vw - 60rpx);
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.module {
				width: 25%;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				margin-bottom: 30rpx;
				.module-item {
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx;
					background: white;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						width: 60%;
						height: 60%;
					}
					.hongbao {
						width: 70%;
						height: 70%;
					}
				}
				.module-title {
					width: 100%;
					font-size: 24rpx;
					color: rgba(39, 40, 50, 0.5);
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
				}
			}
			.emoji {
				margin-top: 30rpx;
			}
		}
	}
}
</style>
