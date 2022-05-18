//对api进行集中管理
const http = uni.$u.http

// post请求，获取菜单

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getMenu = (data) => http.get('/api/index', data)

//首页
//查看所有寻亲者所发的信息
export const postallrelative = (params={},config={}) =>http.post('/RelativeController/getallRelative',params,config)
//查看所有走失者的信息
export const postallchildren = (params={},config={}) =>http.post('/ChildrenController/getallChildren',params,config)

export const isStar = (params={},config={}) =>http.post('/CollectionController/isStar',params,config)

//通过用户Id查看走失者详细信息
export const postchildrenbyid = (params,config={}) =>http.post('/ChildrenController/getChildrenbyId',params,config)
export const postRelativeById = (params,config={}) =>http.post('/RelativeController/getRelativebyid',params,config)



//认证相关的
//登录
//export const postlogin = (params,config ={}) =>http.loginpost('/UsersController/login', params, config)
export const postlogin = (params,config ={}) =>http.post('/UsersController/login', params, config)
export const postlogininfo = (params,config ={}) =>http.post('/UsersController/info', params, config)
//取消登录
export const CancelBindWechat = (params,config={})=>http.post('/UsersController/CancelBindWechat', params, config)
export const getUserName = (params,config={}) =>http.post('/UsersController/getUserName',params,config)

//查看聊天消息界面
export const postInfos = (params,config ={}) =>http.post('/MessageController/getallMessage', {"user_id":1}, config)

//发布信息相关
export const cpostform = (params={},config ={}) =>http.post('/ChildrenController/addChildren',params,config)
export const rpostform = (params={},config ={}) =>http.post('/RelativeController/addRelative',params,config)

//是否已经发布消息
export const chasrelease = (params={},config ={}) =>http.post('/ChildrenController/getChildrenbyId',params,config)
export const rhasrelease = (params={},config ={}) =>http.post('/RelativeController/getRelativebyid',params,config)

//用户修改已经发布的信息
export const cupdateform = (params={},config ={}) =>http.post('/ChildrenController/updateChildren',params,config)
export const rupdateform = (params={},config ={}) =>http.post('/RelativeController/changeRelative',params,config)


//用户修改角色
export const changerole = (params,config ={}) =>http.post('/UsersController/changeRole',params,config)


//消息相关
//发送消息
export const sendmessage = (params,config ={}) =>http.post('/MessageController/sendMessage',params,config)
//获取消息（分页,一次查询30条记录）
export const getMessageBefore = (params,config ={}) =>http.post('/MessageController/getMessageBefore',params,config)
//查看最近消息列表
export const getchatlist = (params,config ={}) =>http.post('/MessageController/getMessage',params,config)
//查看与管理员最近消息
export const getadminmessage = (params,config ={}) =>http.post('/MessageController/getAdminMessage',params,config)


//收藏
//添加收藏
export const addCol = (params,config ={}) =>http.post('/CollectionController/addCol',params,config)
//查询收藏列表
export const getstarlist = (params,config ={}) =>http.post('/CollectionController/lookColList',params,config)
//删除收藏
export const deletecol = (params,config ={}) =>http.post('/CollectionController/deleteOneCol',params,config)
//批量删除收藏
export const deleteCols = (params,config ={}) =>http.post('/CollectionController/deleteCols',params,config)


//匹配
//开始
export const startMatch = (params,config ={}) =>http.post('/MatchController/startMatch',params,config)
//查询匹配列表
export const getmatchlist = (params,config ={}) =>http.post('/MatchController/getMatchList',params,config)
//删除匹配记录
export const deleteMatch = (params,config ={}) =>http.post('/MatchController/deleteMatch',params,config)
//批量删除匹配记录
export const deleteMatchs = (params,config ={}) =>http.post('/MatchController/deleteMatchs',params,config)