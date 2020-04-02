define({
    paths: {
        Vue: 'lib/vue-2.2.2',
        VueRouter: 'lib/vue-router-3.1.6',
        VueI18n: 'lib/vue-i18n-8.15.7',
        MgrMain: 'components/main/main.component',
        ajax: 'lib/ajax',
        NProgress: 'bower_components/nprogress/nprogress',
    },
    map: {
        '*': {
            'css': 'lib/requirejs-css-0.1.10',
            'text': 'lib/requirejs-text-2.0.14',
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