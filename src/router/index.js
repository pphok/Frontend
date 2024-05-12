import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import Cookies from 'js-cookie';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/frontend/pages/home/Home.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/class',
                    name: 'class',
                    component: () => import('@/views/frontend/pages/class/index.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/activity',
                    name: 'activity',
                    component: () => import('@/views/frontend/pages/activity/index.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/archive',
                    name: 'archive',
                    component: () => import('@/views/frontend/pages/archive/Archive.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/profileuser',
                    name: 'profileuser',
                    component: () => import('@/views/pages/auth/Profile_User.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/Input.vue')
                },
                {
                    path: '/uikit/floatlabel',
                    name: 'floatlabel',
                    component: () => import('@/views/uikit/FloatLabel.vue')
                },
                {
                    path: '/uikit/invalidstate',
                    name: 'invalidstate',
                    component: () => import('@/views/uikit/InvalidState.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/Button.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/Table.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/List.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/Tree.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/Overlay.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: '/uikit/menu',
                    component: () => import('@/views/uikit/Menu.vue'),
                    children: [
                        {
                            path: '/uikit/menu',
                            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                        },
                        {
                            path: '/uikit/menu/seat',
                            component: () => import('@/views/uikit/menu/SeatDemo.vue')
                        },
                        {
                            path: '/uikit/menu/payment',
                            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                        },
                        {
                            path: '/uikit/menu/confirmation',
                            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                        }
                    ]
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/File.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/Misc.vue')
                },
                {
                    path: '/blocks',
                    name: 'blocks',
                    component: () => import('@/views/utilities/Blocks.vue')
                },
                {
                    path: '/utilities/icons',
                    name: 'icons',
                    component: () => import('@/views/utilities/Icons.vue')
                },
                {
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/utilities/Documentation.vue')
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/auth/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: import('@/views/auth/Login.vue')
        },
        {
            path: '/forget',
            name: 'forget',
            component: import('@/views/auth/Forget.vue')
        },
        {
            path: '/verify',
            name: 'verify',
            component: import('@/views/auth/Verify.vue')
        },
        {
            path: '/verify-forget',
            name: 'verifyForget',
            component: import('@/views/auth/VerifyForget.vue')
        },
        {
            path: '/change-password',
            name: 'changePassword',
            component: import('@/views/auth/ChangePassword.vue')
        },
        {
            path: '/resend',
            name: 'Resend',
            component: import('@/views/auth/Resend.vue')
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'auth-login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

// Global beforeRouteEnter guard to check if the user is authenticated
router.beforeEach(async (to, from, next) => {
    const publicRoutes = ['Login', 'Register', 'Forget', 'Resend', 'NotFound', 'auth', 'verify', 'verifyForget'];

    let token = Cookies.get('token');

    // Check if the route requires authentication and if the user is not authenticated
    if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
        next({ name: 'landing' });
    } else if (to.matched.some((record) => publicRoutes.includes(record.name)) && token) {
        next({ name: 'home' });
    } else {
        // Continue navigation
        next();
    }
});

export default router;
