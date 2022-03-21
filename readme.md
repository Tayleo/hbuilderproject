##目录结构
pages 页面存放目录
static 静态文件资源目录
app.vue 应用入口文件和小程序app.js类似
main.js 应用入口文件 注册vue等
manifest.json 项目配置
page.json 页面配置

common 存放公用的文件
components 自定义组件目录
store vuex目录
unpackage 编译后的文件存放目录

##笔记
v-bind （可以简写成：）:组件属性要使用data中定义的数据变量，或者组件属性要是使用表达式，要使用v-bind指定
v-on（可以简写成@）:绑定事件
v-model:数据双向绑定
v-if:条件判断,决定某个内容或者区块是否挂载
v-show:条件判断，是否显示
v-for:列表渲染

##事件绑定
使用v-on:可以简写成 @ 绑定事件 使用.stop可以阻止事件穿透
<view @click="c1">
		我是父级
		<view @click.stop="c2">我是子级</view>
</view>