import apiUtil from '../utils/api';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
};

export default {
    async logIn(user) {
        try {
            const response = await apiUtil.post(buildUrl('/login_submit'), user);
            console.log(response.data);
            return response.data;
        } catch(err) {
            console.log(err)
        }
        
    },
    async logOut() {
        try {
            const response = await apiUtil.get(buildUrl('/logout'));
            return response.data;
        } catch (err) {
            console.log(err);
        }
    },
};