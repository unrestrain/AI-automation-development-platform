import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dataImport'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/dataImport',
                    component: () => import(/* webpackChunkName: "dataImport" */ '../components/page/dataImport.vue'),
                    meta: { title: '数据导入与概览' }
                },
                {
                    path: '/show',
                    component: () => import(/* webpackChunkName: "show" */ '../components/page/datasetShow.vue'),
                    meta: { title: '查看数据集' }
                },
                {
                    path: '/import_dataset',
                    component: () => import(/* webpackChunkName: "import_dataset" */ '../components/page/importDataset.vue'),
                    meta: { title: '数据导入' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
     
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
