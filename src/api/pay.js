import service from "../utils/request";

export function AmountList(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/amount/`,
        data,
    });
}

export function Pay(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/pay/`,
        data,
    });
}