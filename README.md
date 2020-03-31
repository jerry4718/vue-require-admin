## 主旨

本项目希望通过尽可能的减少构建工具的使用，
来减少类crm系统开发过程中的学习成本，
让非专业前端开发人员，
可以在最少量借助node工具链的基础上，快速完成开发

### 模板工具使用

```sh
# 新建页面
node kits/code-gen/page.js xxx/xxx xxx/xx
```

### todo（不分次序）

- 样式精修
- 公共组件（datepicker，pager，dialog，toast，modal，progress）
- 添加测试用的mock工具（或者改变项目为全栈模板）
- 后续引入ESLint严格控制代码风格（快速打了不想用node工具的脸）
- 引入gulp处理es版本的转换
- 从app.js中分离requirejs的配置文件
- 从main.component.js中分离指定公用模板的配置代码
- 从main.component.js中分离route渲染的代码
- 可在后端指定该页面默认调用的接口以及指定一些参数（一般来讲，crm中，每个页面都会去请求数据）

### question

- 页面component是否合并到一个文件中（减少文件请求的次数）
- 是否造一个样式scoped的轮子（解决样式冲突的问题）
- 怎样处理浏览器缓存的问题
- 是否引入样式库（如bootstrap）


### 相关文档

- requirejs: https://requirejs.org/
- requirejs-css: https://github.com/guybedford/require-css/blob/master/README.md
- requirejs-text: https://github.com/requirejs/text/blob/master/README.md
- vue: https://cn.vuejs.org/v2/guide/
- vue-router: https://router.vuejs.org/zh/
- vue-i18n: http://kazupon.github.io/vue-i18n/started.html

### 说在最后

其实还有个想法是，deno就快要release 1.0了嘛，换成deno构建应该也是个不错的想法，
不过可能需要不少轮子，还有我这散修的js基本功不知道会写出多low的代码
