define([
    'common/api/api.js',
    'text!components/main/main.html',
    'css!components/main/main.css',
], function (api, template) {
    let routesUnique = [];

    let menuProto = {
        id: 0,
        moduleUrl: '',
        moduleName: '',
        moduleDescribe: '',
        moduleSequence: 0,
    };

    return {
        template: template,
        data () {
            return {
                curTabMenuId: 0,
                curSubMenuId: 0,
                curRouteMenuId: 0,
                tabMenus: [{
                    ...menuProto,
                }],
                subMenus: [{
                    ...menuProto,
                    routeMenus: [{
                        ...menuProto,
                    }],
                }],
                routeMenus: [{
                    ...menuProto,
                }],
            };
        },
        async mounted () {
            let res = await api.menuList({parentId: 0});

            this.tabMenus = res && res.data || [{}];
            if (this.tabMenus.length) {
                this.curTabMenuId = this.tabMenus[0].id;
            }
        },
        watch: {
            async curTabMenuId (newId) {
                this.subMenus = [];
                this.routeMenus = [];
                let res = await api.menuList({parentId: newId});

                this.subMenus = res && res.data || [];
                if (this.subMenus.length) {
                    this.curSubMenuId = this.subMenus[0].id;
                }
            },
            async curSubMenuId (newId) {
                this.routeMenus = [];
                let sdx = this.subMenus.findIndex(s => s.id === newId);
                let subMenu = this.subMenus[sdx];

                if (subMenu.routeMenus && subMenu.routeMenus.length) {
                    this.routeMenus = subMenu.routeMenus;
                    return;
                }
                let res = await api.menuList({parentId: newId});

                this.routeMenus = res && res.data || [];
                subMenu.routeMenus = this.routeMenus;
            },
        },
        methods: {
            tapNav (menuId) {
                this.curTabMenuId = menuId;
                console.log(menuId);
            },
            tapSubNav (menuId) {
                this.curSubMenuId = menuId;
                console.log(menuId);
            },
            async tapRouteNav ({id: menuId, moduleUrl: menuUrl}) {
                if (this.curRouteMenuId === menuId) {
                    // 这里做当前页面刷新的处理，emit或者notify
                    return;
                }
                this.curRouteMenuId = menuId;
                console.log(menuId);

                const routeName = `route_${menuId}`;

                // 如果是第一次调用，这里会动态注册路由
                await this.routeRegister({
                    id: menuId,
                    url: menuUrl,
                    name: routeName,
                    ns: [this.curTabMenuId, this.curSubMenuId, menuId],
                });
                // 跳转路由
                this.$router.push({name: routeName});
            },
            async routeRegister ({id, url, name, ns}) {
                if (routesUnique.indexOf(id) > -1) {
                    return;
                }

                const path = `${url.replace(/^(\/|)/, '/')}${url.indexOf('?') > -1 ? '&' : '?'}rel=${ns.join('.')}`;

                const parseModulePath = modulePath => {
                    const cfg = [
                        '/cofigParams/enterCfg',
                    ];
                    for (let match of cfg) {
                        if (modulePath.indexOf(match) === 0) {
                            modulePath = match;
                        }
                    }
                    return `pages${modulePath}.js`;
                };

                const modulePath = path.split('?')[0];
                const moduleUrl = parseModulePath(modulePath);

                const pushRoute = moduleObject => {
                    const component = {
                        render (h) {
                            return h(
                                'div',
                                {'class': {'route-content': true}},
                                [
                                    h('div', {'class': {'route-path': true}}, `path: ${path}, ${Date.now()}`),
                                    h('div', {'class': {'route-template': true}},
                                        moduleObject ? [h(moduleObject)] : [`Not Found: ${moduleUrl}`],
                                    ),
                                ],
                            );
                        },
                    };

                    routesUnique.push(id);
                    this.$router.addRoutes([{
                        path, name, component,
                        meta: {
                            keepAlive: true, //需要被缓存的组件
                        },
                    }]);
                };

                return new Promise((resolve, reject) =>
                    requirejs([moduleUrl],
                        module => {
                            console.log(moduleUrl);
                            console.log(module);
                            pushRoute(module);
                            resolve();
                        },
                        error => {
                            console.error(error);
                            pushRoute();
                            resolve();
                        }));
            },
        },
        /*render(h) {
            return h('div', [
                h('div', {'class': {'page-head': true}},
                    this.tabMenus.map(ttm => h(
                        'div',
                        {
                            'class': {'page-head-nav': true, 'selected': ttm.id === this.curTabMenuId},
                            attrs: {title: ttm.moduleDescribe},
                        },
                        [h(
                            'span',
                            {
                                on: {
                                    click: e => {
                                        this.tapNav(ttm.id);
                                        e.stopPropagation()
                                    }
                                }
                            },
                            [ttm.moduleName]
                        )]
                    ))),
                h('div', {'class': {'page-body': true}}, [
                    h('div', {'class': {'page-body-left': true}},
                        this.subMenus.map(stm => h(
                            'div',
                            {
                                'class': {'sub-menu-nav': true, 'selected': stm.id === this.curSubMenuId},
                                attrs: {title: stm.moduleDescribe},
                            },
                            [h(
                                'span',
                                {
                                    on: {
                                        click: e => {
                                            this.tapSubNav(stm.id);
                                            e.stopPropagation()
                                        }
                                    }
                                },
                                [stm.moduleName]
                            )].concat(stm.id === this.curSubMenuId ? [h(
                                'div',
                                {'class': {'route-menu-bar': true}},
                                this.routeMenus.map(rtm => h(
                                    'div',
                                    {
                                        'class': {
                                            'route-menu-nav': true,
                                            'selected': rtm.id === this.curRouteMenuId
                                        },
                                        attrs: {title: rtm.moduleDescribe},
                                    },
                                    [h(
                                        'span',
                                        {
                                            on: {
                                                click: async e => {
                                                    this.tapRouteNav(rtm);
                                                    e.stopPropagation();
                                                }
                                            }
                                        },
                                        [rtm.moduleName]
                                    )]
                                ))
                            )] : [])
                        ))),
                    h('div', {'class': {'page-body-right': true}}, [
                        h('div', {'class': {'route-history-bar': true}}, [
                            h('div', {'class': {'route-history-item': true}})
                        ]),
                        this.$t("0点到6点之间不允许进行转派操作"),
                        h('router-view'),
                    ]),
                ])
            ])
        },*/
    };
});
