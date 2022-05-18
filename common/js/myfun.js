export default{
	retransform(e){
		let model={
			userInfo: {
				name: '',
				sex: '',
				age: '',
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
		}
		model.userInfo.name=e.childrenName
		model.userInfo.age=e.childrenAge
		model.userInfo.email=e.eMail
		model.userInfo.birthday=e.birthday
		model.userInfo.phone=e.phone
		if(e.childrenGender==0){
			model.userInfo.sex='女'
		}else{
			model.userInfo.sex='男'
		}
		model.userInfo.features=e.features
		
		model.relation=e.relation
		
		model.lost.address=e.lostAddress
		model.lost.cloth=e.lostCloth
		model.lost.details=e.details
		model.lost.height=e.lostHeight
		model.lost.time=e.lostTime		
		
		return model;
	},
	chtransform(e){
		let model={
			userInfo: {
				name: '',
				sex: '',
				age: '',
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
		}
		model.userInfo.name=e.realName
		model.userInfo.age=e.age
		model.userInfo.email=e.eMail
		model.userInfo.birthday=e.birthday
		model.userInfo.phone=e.phone
		if(e.gender==0){
			model.userInfo.sex='女'
		}else{
			model.userInfo.sex='男'
		}
		model.userInfo.features=e.features
		model.userInfo.address=e.nowAddress
		
		model.lost.address=e.lostAddress
		model.lost.cloth=e.lostCloth
		model.lost.details=e.details
		model.lost.height=e.lostHeight
		model.lost.time=e.lostTime		
		return model;
	},
	starspacetime(pre,next){
		let old = new Date(pre);
		let now = new Date(next);
		let oY = old.getFullYear();
		let oM = old.getMonth()+1;
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let D = old.getDate();
		let nD=now.getDate();
		if(D==nD&&oM==nM){
			return '';
		}else{
			return nM+'-'+nD;
		}
	},
	firsttime(first){
		let old = new Date(first);
		let now = new Date();
		//获取old具体时间
		let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth()+1;
		let D = old.getDate();
		//获取now具体时间
		let nd =now.getTime();
		let nh = now.getHours();
		let n = now.getMinutes();
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let nD = now.getDate();
		
		//当天的时间
		if(D == nD && M == nM && Y == nY){
			if(nd>(d+1000*60*5)){  //时间间隔大于五分钟
				return h+':'+m;
			}else{
				return '';
			}
		}
		//昨天时间
		if(D+1 == nD && M == nM && Y == nY){
			return '昨天 '+h+':'+m;
		}else if(Y == nY){
			//大于两天(今年)
			return M+'月'+D+'日'+h+':'+m;
		}else{
			//大于今年
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return Y+'年'+M+'月'+D+'日'+h+':'+m;
		}
	},
	infospacetime(infoold,infonow){ 
		//           小的    大的时间
		let old = new Date(infoold);
		let now = new Date(infonow);
		let nowtime=new Date();
		// console.log(old)  //da(该显示大的时间)
		// console.log(now)  //xiao
		//获取old具体时间
		let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth()+1;
		let D = old.getDate();
		//获取大的具体时间
		let nd =now.getTime();
		let nh = now.getHours();
		let n = now.getMinutes();
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let nD = now.getDate();
		//获取现在时间
		let td = nowtime.getTime();
		let th = nowtime.getHours();
		let tm = nowtime.getMinutes();
		let tY = nowtime.getFullYear();
		let tM = nowtime.getMonth()+1;
		let tD = nowtime.getDate();
		//当天的时间
		if(D == nD && M == nM && Y == nY||D == tD && M == tM && Y == tY){
			if(nd>(d+1000*60*5)){  //时间间隔大于五分钟
				return h+':'+m;
			}else{
				return '';
			}
		}
		//不是当天，但是与上一个是当天
		if(D == nD && M == nM && Y == nY){
			if(nd>(d+1000*60*5)){  //时间间隔大于五分钟
				return M+'月'+D+'日'+h+':'+m;
			}else{
				return '';
			}
		}
		//昨天时间
		if(D+1 == nD && M == nM && Y == nY){
			return '昨天 '+h+':'+m;
		}else if(Y == nY){
			//大于两天(今年)
			return M+'月'+D+'日'+h+':'+m;
		}else{
			//大于今年
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return Y+'年'+M+'月'+D+'日'+h+':'+m;
		}
		
	},
	
	getyearmonth(first){
		let now = new Date(first);
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let D = now.getDate();
		return nM+'-'+D;
	},
	
	createtime(){
		let now = new Date();
		//获取now具体时间
		
		let s = now.getSeconds();
		let h = now.getHours();
		let m = now.getMinutes();
		let Y = now.getFullYear();
		let M = now.getMonth()+1;
		let D = now.getDate();
		return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
	},
	transformtime(timestamp){
		let now = new Date(timestamp);
		//获取now具体时间
		
		let s = now.getSeconds();
		let h = now.getHours();
		let m = now.getMinutes();
		let Y = now.getFullYear();
		let M = now.getMonth()+1;
		let D = now.getDate();
		return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
	},
	
	//消息时间转化
	dateTime(e){
		let old = new Date(e);
		let now = new Date();
		//获取old具体时间
		let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth()+1;
		let D = old.getDate();
		//获取now具体时间
		let nd =now.getTime();
		let nh = now.getHours();
		let n = now.getMinutes();
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let nD = now.getDate();
		
		//当天的时间
		if(D === nD && M === nM && Y === nY){
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return h+':'+m;
		}
		//昨天时间
		if(D+1 === nD && M === nM && Y === nY){
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return '昨天 '+h+':'+m;
		}else if(Y === nY){
			//大于两天(今年)
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return M+'月'+D+'日'+h+':'+m;
		}else{
			//大于今年
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return Y+'年'+M+'月'+D+'日'+h+':'+m;
		}
		
	},
	//列表时间转化
	chatTime(e){
		let old = new Date(e);
		let now = new Date();
		//获取old具体时间
		let d = old.getTime();
		let h = old.getHours();
		let m = old.getMinutes();
		let Y = old.getFullYear();
		let M = old.getMonth()+1;
		let D = old.getDate();
		//获取now具体时间
		let nd =now.getTime();
		let nh = now.getHours();
		let n = now.getMinutes();
		let nY = now.getFullYear();
		let nM = now.getMonth()+1;
		let nD = now.getDate();
		
		//当天的时间
		if(D === nD && M === nM && Y === nY){
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return h+':'+m;
		}
		//昨天时间
		if(D+1 === nD && M === nM && Y === nY){
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return '昨天 '+h+':'+m;
		}else if(Y === nY){
			//大于两天(今年)
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return M+'月'+D+'日';
		}else{
			//大于今年
			if(h<10){
				h = '0'+h;
			}
			if(m<10){
				m = '0'+m;
			}
			return Y+'年'+M+'月'+D+'日';
		}
		
	}
}