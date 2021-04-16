import store from "@/store";
/*  */
export function FormatDate(params) {
    // let date = new Date(params.date);
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDay();
    // const hours = date.getHours();
    // const min = date.getMinutes();
    // const sec = date.getSeconds();
    // formatdate(month);
    // formatdate(day);
    // formatdate(sec);
    // formatdate(hours);
    // formatdate(min);

    if (!params.date) {
        return "";
    }
    const dateSplit = params.date.split(" ");

    let date = dateSplit[0];
    let time = dateSplit[1];

    if (params.conn) {
        date = date.split("-").join(params.conn);
        time = time.split("-").join(params.conn);
    }

    if (params.type == "date") {
        return date;
    }

    if (params.type == "time") {
        return time;
    }
    return `${date}  ${time}`;
}

function formatdate(params) {
    if (parseInt(params) < 10) {
        params = "0" + params;
    }
    return params;
}

/** 省市区街道 */
export function address(value) {
    let address = value;
    let addressInfo = "";
    if (address) {
        let split = address.split(",");
        addressInfo += split[0];
        // 街道
        if (split[1]) {
            addressInfo += `<br/>${split[1]}`;
        }
    }
    return addressInfo;
}

/** 停车场类型 */
export function parkingType(value) {
    const data = store.state.config.parking_type_json[value];
    if (data) {
        return data.label;
    }
}

/** 年检 */
export function yearCheckType(value) {
    const data = store.state.config.year_check;
    const filterData = data.filter((item) => item.value === value);
    if (filterData.length > 0) {
        return filterData[0].label;
    }
    return "";
}

/** 能源类型 */
export function energyType(value) {
    const data = store.state.config.energyType;
    const filterData = data.filter((item) => item.value === parseInt(value)); //=== 结果值是否一致以及值类型，== 结果值是否一致
    if (filterData.length > 0) {
        return filterData[0].label;
    }
    return "";
}