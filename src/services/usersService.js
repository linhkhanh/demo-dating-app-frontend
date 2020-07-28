import apiUtil from '../utils/api';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
};

export default {
    async getAll () {
        try {
            console.log(buildUrl('/'));
            const response = await apiUtil.get(buildUrl('/'));
            console.log(response);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    },
    async create (newOne) {
        const response = await apiUtil.post(buildUrl('/'), newOne);
        return response.data;
    },
    async delete (id) {
        const response = await apiUtil.delete(buildUrl(`/${id}`));
        return response.data;
    },
    async updateCompletionStatus (id, isCompleted) {
        const response = await apiUtil.update(buildUrl(`/${id}`),
            isCompleted,
        );
        return response.data;
    }
};