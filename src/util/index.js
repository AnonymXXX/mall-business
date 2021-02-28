import service from "../services/index";

/**
 * 处理商品显示
 */
export function handleGoodsView(goods, ...props) {
    const newData = goods;
    const type = ["酒水冲调", "时令水果", "安心乳品", "休闲零食", "新鲜蔬菜"];
    newData.map((item, i) => {
        for (const key of props) {
            if (!item[key]) {
                newData[i][key] = item.id;
            }

            if (key === "category") {
                newData[i][key] = type[newData[i][key] - 1];
            }

            if (key === "status") {
                newData[i][key] === 1 ? (newData[i][key] = "上架") : (newData[i][key] = "下架");
            }

            if (key === "tags" && newData[i][key].length >= 2) {
                newData[i][key] = [newData[i][key].join(", ")];
            }
        }
    });
    return newData;
}

export async function searchByCategory(_this, category, searchWord) {
    const { status, data } = await service.getGoodsList({ searchWord, category });

    if (status === "success") {
        const total = data.data.length;
        const newData = handleGoodsView(data.data, "key", "category", "status", "tags");

        _this.$store.commit("setGoodsList", newData);
        _this.$store.commit("setTotal", total);
    }
}

export function getCookie(key) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.filter(item => item.split("=")[0] === key);
    if (cookie.length <= 0) {
        return;
    }
    return cookie[0].split("=")[1];
}
