import axios from "axios";
import URLS, { baseURL } from "./URLS";

// const appkey = "melancholy_1607088981632";
const appkey = "anonym_1608299893038";

const instance = axios.create({
    baseURL,
});

instance.interceptors.response.use(resp => {
    return resp.data;
});

const login = (email, password) => {
    return instance.post(URLS.login, {
        email,
        password,
    });
};

const register = (username, email, password, code, role) => {
    return instance.post(URLS.register, {
        username,
        email,
        password,
        code,
        role,
    });
};

const getCode = email => {
    return instance.post(URLS.getCdoe, {
        email,
    });
};

const upload = avatar => {
    return instance.post(URLS.upload, {
        appkey,
        avatar,
    });
};

const addGoods = (
    title,
    category,
    tags,
    price,
    price_off,
    unit,
    status,
    images,
    inventory,
    desc = "",
    c_items = ""
) => {
    return instance.post(URLS.goodsAdd, {
        appkey,
        title,
        category,
        tags,
        price,
        price_off,
        unit,
        status,
        images,
        inventory,
        desc,
        c_items,
    });
};

const getGoodsList = ({ page, size, searchWord, category }) => {
    if (category === -1) {
        category = undefined;
    }

    return instance.get(URLS.goodsList, {
        params: {
            appkey,
            page,
            size,
            searchWord,
            category,
        },
    });
};

const getCategory = ({ page, size }) => {
    return instance.get(URLS.category, {
        params: {
            appkey,
            page,
            size,
        },
    });
};

const removeGoods = ids => {
    const result = [];
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        result.push(
            instance.delete(URLS.deleteGoods + id, {
                params: {
                    appkey,
                },
            })
        );
    }
    return result;
};

// 后端没有接口
// const sellGoods = (
//     ids,
//     { title, category, tags, price, price_off, unit, status, images, inventory, sale, _id }
// ) => {
//     const result = [];
//     for (let i = 0; i < ids.length; i++) {
//         result.push(
//             instance.put(URLS.editGoods, {
//                 appkey,
//                 title,
//                 category,
//                 tags,
//                 price,
//                 price_off,
//                 unit,
//                 status,
//                 images,
//                 inventory,
//                 sale,
//                 _id,
//             })
//         );
//     }
//     return result;
// };

const getGoodsTotal = () => {
    return instance.get(URLS.goodsList, {
        params: {
            appkey,
        },
    });
};

const addCategory = (id, name, c_items) => {
    return instance.post(URLS.addCategory, {
        appkey,
        id,
        name,
        c_items,
    });
};

const editCategory = (id, name, c_items) => {
    return instance.put(URLS.editCategory, {
        appkey,
        id,
        name,
        c_items,
    });
};

const removeCategory = id => {
    return instance.delete(URLS.deleteCategory + id, {
        params: {
            appkey,
        },
    });
};

export default {
    register,
    getCode,
    login,
    upload,
    addGoods,
    getGoodsList,
    getCategory,
    removeGoods,
    getGoodsTotal,
    addCategory,
    editCategory,
    removeCategory,
};
