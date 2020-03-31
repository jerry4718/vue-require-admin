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

### todo

- 后续引入ESLint严格控制代码风格（快速打了不想用node工具的脸）
- 从app.js中分离requirejs的配置文件
- 从main.component.js中分离指定公用模板的配置文件
- 可在后端指定该页面默认调用的接口（一般来讲，crm中，每个页面都回去请求数据）


### 相关文档

- requirejs: https://requirejs.org/
- requirejs-css: https://github.com/guybedford/require-css/blob/master/README.md
- requirejs-text: https://github.com/requirejs/text/blob/master/README.md
- vue: https://cn.vuejs.org/v2/guide/
- vue-router: https://router.vuejs.org/zh/
- vue-i18n: http://kazupon.github.io/vue-i18n/started.html

