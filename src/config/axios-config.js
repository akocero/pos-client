import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token') || null;

const axiosConfig = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export default axiosConfig;
