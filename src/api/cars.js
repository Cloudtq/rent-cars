import service from "../utils/request";

export function GetCarsList(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/cars/`,
        data,
    });
}