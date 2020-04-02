requirejs(['config/config'], function (config) {
    requirejs.config(config);

    requirejs(['NProgress', 'Vue', 'VueRouter', 'VueI18n', 'MgrMain', 'css!static/app.css'], function (NProgress, Vue, VueRouter, VueI18n, MgrMain) {
        NProgress.configure({ easing: 'ease', speed: 500/*, showSpinner: false*/ });
        NProgress.start();

        let times = [Math.random() * 500, Math.random() * 500, Math.random() * 500, Math.random() * 500, Math.random() * 500];

        (function progress(idx) {
            if (idx === times.length)
                return NProgress.done();
            setTimeout(() => {
                NProgress.inc();
                progress(idx + 1);
            }, times[idx]);
        })(0);

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
});