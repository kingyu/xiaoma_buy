import request from 'utils/request';
import config from 'utils/config';
// import wxConfig from "utils/wxConfig";
const {
  api: { orderCreate, orderOfflinepay, orderQuery },
} = config;

export async function orderQueryState(key) {
  return request(`${orderQuery}?order_no=${key}`);
}

export async function submitOrderOfflinepay(params) {
  return request(`${orderOfflinepay}`, {
    method: 'POST',
    body: { ...params },
  });
}
export async function submitOrderCreate(params) {
  return request(`${orderCreate}`, {
    method: 'POST',
    body: { ...params },
  });
}
