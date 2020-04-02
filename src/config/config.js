define({
    paths: {
        Vue: 'bower_components/vue/dist/vue.min',
        VueRouter: 'bower_components/vue-router/dist/vue-router.min',
        VueI18n: 'bower_components/vue-i18n/dist/vue-i18n.min',
        NProgress: 'bower_components/nprogress/nprogress',
        ajax: 'common/util/ajax',
        MgrMain: 'components/main/main.component',
    },
    map: {
        '*': {
            'css': 'bower_components/require-css/css',
            'text': 'bower_components/text/text',
        },
    },
    shim: {
        'NProgress': {
            deps: [
                'css!bower_components/nprogress/nprogress.css'
            ],
        },
    },
});
