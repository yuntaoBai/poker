export const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: import('../pages/home/index.vue') },
    { path: '/poker/:id', component: import('../pages/poker/index.vue') },
]