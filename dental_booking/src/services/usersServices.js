import { get, post } from "../ultis/request"

// API đăng nhập
export const login = async (email, password) => {
    const result = await get(`users?email=${email}&password=${password}`);
    return result;
};

// // API đăng kí
// export const register = async (options) => {
//     const result = await post(`users`, options);
//     return result;
// };

// API check đăng nhập
export const checkExits = async (key, value) => {
    const result = await post(`users?${key}=${value}`);
    return result;
};
