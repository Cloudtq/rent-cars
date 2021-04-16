import service from "../utils/request";

/* 支付查询订单状态 */
export function OrderStatus(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/orderStatus/`,
        data,
    });
}

/* 订单列表订单查询 */
export function OrderList(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/orderList/`,
        data,
    });
}

/* 查找正在使用的车辆 */
export function GetCarsActivation(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/carsActivation/`,
        data,
    });
}

/* 取车 */
export function CarsGet(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/carsGet/`,
        data,
    });
}

/* 还车 */
export function CarsReturn(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/carsReturn/`,
        data,
    });
}

/* 还车 */
export function CarsReturns(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/carsReturnS/`,
        data,
    });
}

/* 取消订单 */
export function CarsCancel(data = {}) {
    return service.request({
        method: "post",
        url: `${process.env.VUE_APP_API_WEB}/carsCancel/`,
        data,
    });
}