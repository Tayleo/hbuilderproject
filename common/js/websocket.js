class websocketUtil {
	constructor(url, time,user_id) {
		this.is_open_socket = false //避免重复连接
		this.url = url //地址'ws://你的IP地址:你的端口号/webSocket'
		this.data = null
		this.user_id=user_id
		//心跳检测
		this.timeout= time //多少秒执行检测
		this.heartbeatInterval= null //检测服务器端是否还活着
		this.reconnectTimeOut= null //重连之后多久再次重连

		try {
			return this.connectSocketInit()
		} catch (e) {
			console.log('catch');
			this.is_open_socket = false
			this.reconnect();
		}
	}

	// 进入这个页面的时候创建websocket连接【整个页面随时使用】
	connectSocketInit() {
		this.socketTask = uni.connectSocket({
			url: this.url+'/'+this.user_id,
			success:()=>{
				console.log("正准备建立websocket中...");
				// 返回实例
				return this.socketTask
			},
		});
		this.socketTask.onOpen((res) => {
			console.log("WebSocket连接正常！");
			clearTimeout(this.reconnectTimeOut)
			clearTimeout(this.heartbeatInterval)
			this.is_open_socket = true;
			this.start();
			
			//注：只有连接正常打开中 ，才能正常收到消息
			// this.socketTask.onMessage((res) => {
			// 	this.websocketonmessage(res)
			// });
		})
		// 监听连接失败，这里代码我注释掉的原因是因为如果服务器关闭后，和下面的onclose方法一起发起重连操作，这样会导致重复连接
		// uni.onSocketError((res) => {
		// 	console.log('WebSocket连接打开失败，请检查！');
		// 	this.is_open_socket = false;
		// 	this.reconnect();
		// });
		// 这里仅是事件监听【如果socket关闭了会执行】
		
		
		//关闭连接
		this.socketTask.onClose(() => {
			console.log("已经被关闭了")
			this.is_open_socket = false;
			//this.reconnect();
		})
	}
	
	
	//手动关闭
	close() {
		this.is_open_socket = false;
		this.socketTask.close()
	}
	
	
	//发送消息
	send(value,acceptId,type){
		// 注：只有连接正常打开中 ，才能正常成功发送消息
		 let msg="{acceptId:"+acceptId+",msgtype:"+type+",info_content:\""+value+"\"}";
		this.socketTask.send({
			data:msg,
			async success() {
				console.log("消息发送成功");
			},
		});
	}
	//开启心跳检测
	start(){
		this.heartbeatInterval = setTimeout(()=>{
			this.data={value:"传输内容",method:"方法名称"}
			//console.log(this.data)
			//this.send(JSON.stringify(this.data));
		},this.timeout)
	}
	//重新连接
	reconnect(){
		//停止发送心跳
		clearInterval(this.heartbeatInterval)
		//如果不是人为关闭的话，进行重连
		if(!this.is_open_socket){
			this.reconnectTimeOut = setTimeout(()=>{
				this.connectSocketInit();
			},3000)
		}
	}
}

module.exports = websocketUtil
