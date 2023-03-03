import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Home from '@/views/ecommerce/home/index.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';
import Auth from '@/components/layouts/Auth.vue';
import Signup from '@/views/auth/Signup.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import Main from '@/components/layouts/Main.vue';
import EComm from '@/components/ecommerce_layouts/Main.vue';
import Dashboard from '@/views/Dashboard.vue';
import { useAuthStore } from '@/stores/auth';

const authRequired = (to, from, next) => {
	const auth = useAuthStore();
	const authorized = auth.user ? next() : next({ name: 'login' });
};

const noAuthRequired = (to, from, next) => {
	const auth = useAuthStore();
	const unauthorized = auth.user ? next({ name: 'dashboard' }) : next();
};

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'ecomm',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: EComm,
			children: [
				{
					path: '',
					name: 'home',
					component: Home,
				},
				{
					path: '/about',
					name: 'about',
					component: () => import('../views/ecommerce/About.vue'),
				},
				{
					path: '/terms',
					name: 'terms',
					component: () => import('../views/ecommerce/Terms.vue'),
				},
				{
					path: '/shop',
					name: 'shop',
					component: () => import('../views/ecommerce/Shop.vue'),
				},
				{
					path: '/product/:id',
					name: 'product',
					component: () =>
						import('../views/ecommerce/ProductDetails.vue'),
				},
				{
					path: '/cart',
					name: 'cart',
					component: () => import('../views/ecommerce/Cart.vue'),
				},
				{
					path: '/check-out',
					name: 'check_out',
					component: () => import('../views/ecommerce/CheckOut.vue'),
				},
				{
					path: '/order-summary/:id',
					name: 'order-summary',
					component: () =>
						import('../views/ecommerce/OrderSummary.vue'),
				},
				{
					path: '/collections',
					name: 'collections',
					component: () =>
						import('../views/ecommerce/Collection.vue'),
				},
			],
		},
		{
			path: '/auth',
			name: 'auth',
			component: Auth,
			beforeEnter: noAuthRequired,
			children: [
				{
					path: 'login',
					name: 'login',
					component: Login,
				},
				{
					path: 'forgot_password',
					name: 'forgot-password',
					component: ForgotPassword,
				},
				{
					path: 'signup',
					name: 'signup',
					component: Signup,
				},
				{
					path: 'reset_password/:resetToken',
					name: 'reset-password',
					component: ResetPassword,
				},
			],
		},
		{
			path: '/main',
			name: 'main',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: Main,
			beforeEnter: authRequired,
			children: [
				{
					path: 'dashboard',
					name: 'dashboard',
					component: () => import('../views/Dashboard.vue'),
				},
				{
					path: 'sales/customers',
					name: 'sales.customers',
					component: () => import('../views/customer/index.vue'),
				},
				{
					path: 'sales/customers/create',
					name: 'sales.customers.create',
					component: () => import('../views/customer/create.vue'),
				},
				{
					path: 'sales/customers/edit/:id',
					name: 'sales.customers.edit',
					component: () => import('../views/customer/edit.vue'),
				},
				{
					path: 'warehouse/inventory',
					name: 'warehouse.inventory',
					component: () => import('../views/Inventory.vue'),
				},
				{
					path: 'warehouse/products',
					name: 'warehouse.products',
					component: () => import('../views/product/index.vue'),
				},
				{
					path: 'warehouse/products/create',
					name: 'warehouse.products.create',
					component: () => import('../views/product/create.vue'),
				},
				{
					path: 'warehouse/products/edit/:id',
					name: 'warehouse.products.edit',
					component: () => import('../views/product/edit.vue'),
				},
				{
					path: 'warehouse/collections',
					name: 'warehouse.collections',
					component: () => import('../views/collection/index.vue'),
				},
				{
					path: 'warehouse/collections/create',
					name: 'warehouse.collections.create',
					component: () => import('../views/collection/create.vue'),
				},
				{
					path: 'warehouse/collections/edit/:id',
					name: 'warehouse.collections.edit',
					component: () => import('../views/collection/edit.vue'),
				},
				{
					path: 'sales/discounts',
					name: 'sales.discounts',
					component: () => import('../views/discount/index.vue'),
				},
				{
					path: 'sales/discounts/create',
					name: 'sales.discounts.create',
					component: () => import('../views/discount/create.vue'),
				},
				{
					path: 'sales/discounts/edit/:id',
					name: 'sales.discounts.edit',
					component: () => import('../views/discount/edit.vue'),
				},
				{
					path: 'sales/orders',
					name: 'sales.orders',
					component: () => import('../views/order/index.vue'),
				},
				{
					path: 'sales/orders/create',
					name: 'sales.orders.create',
					component: () => import('../views/order/create.vue'),
				},
				{
					path: 'sales/orders/edit/:id',
					name: 'sales.orders.edit',
					component: () => import('../views/order/edit.vue'),
				},
				{
					path: 'sales/invoices',
					name: 'sales.invoices',
					component: () => import('../views/invoice/index.vue'),
				},
				{
					path: 'sales/invoices/create',
					name: 'sales.invoices.create',
					component: () => import('../views/invoice/create.vue'),
				},
				{
					path: 'sales/invoices/edit/:id',
					name: 'sales.invoices.edit',
					component: () => import('../views/invoice/edit.vue'),
				},
				{
					path: 'sales/invoices/view/:id',
					name: 'sales.invoices.view',
					component: () => import('../views/invoice/view.vue'),
				},
				{
					path: 'ecomm/settings',
					name: 'ecomm.settings',
					component: () => import('../views/ecomm/Setting.vue'),
				},
				{
					path: 'ecomm/media',
					name: 'ecomm.media',
					component: () => import('../views/media/index.vue'),
				},
				{
					path: 'warehouse/categories',
					name: 'warehouse.categories',
					component: () => import('../views/category/index.vue'),
				},
				{
					path: 'warehouse/categories/create',
					name: 'warehouse.categories.create',
					component: () => import('../views/category/create.vue'),
				},
				{
					path: 'warehouse/categories/edit/:id',
					name: 'warehouse.categories.edit',
					component: () => import('../views/category/edit.vue'),
				},
			],
		},
	],
});

export default router;
