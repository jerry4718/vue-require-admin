requirejs.config({
    paths: {
        Vue: 'lib/vue-2.2.2',
        VueRouter: 'lib/vue-router-3.1.6',
        VueI18n: 'lib/vue-i18n-8.15.7',
        MgrMain: 'components/main/main.component',
        ajax: 'lib/ajax',
    },
    map: {
        '*': {
            'css': 'lib/requirejs-css-0.1.10',
            'text': 'lib/requirejs-text-2.0.14',
        },
    },
    shim: {
        'app': {
            deps: [
                'ajax',
            ],
        },
    },
});

requirejs(['Vue', 'VueRouter', 'VueI18n', 'MgrMain'], function (Vue, VueRouter, VueI18n, MgrMain) {
    const messages = {
        en_id: {},
        zh_cn: {},
    };

    Vue.use(VueI18n);
    // 通过选项创建 VueI18n 实例
    const i18n = new VueI18n({
        locale: 'en_id', // 设置地区
        messages: messages, // 设置地区信息
        silentTranslationWarn: true,
    });

    const routes = [];

    Vue.use(VueRouter);
    const router = new VueRouter({
        routes,
    });

    const app = new Vue({
        el: '#app',
        i18n: i18n,
        router: router,
        render: h => h(MgrMain, {'class': {'page-root': true}}),
    });
});
