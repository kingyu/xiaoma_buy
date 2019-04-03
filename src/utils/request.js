import fetch from "dva/fetch";
// import { Toast } from "antd-mobile";
// import { getQueryString } from "utils/utils";
// import wxConfig from "utils/wxConfig";
// import { authorizeOrderUrl, wechatAuthorizeUrl } from "utils/config";
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = "" || response.statusText;
  // return response;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  };
  let token = "";
  token = localStorage.getItem("token");
  if (token != null) {
    defaultOptions.headers.Authorization = `JWT ${token}`;
  }
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "PATCH"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        ...newOptions.headers
      };
    }
  }
  newOptions.headers = {
    "Access-Control-Allow-Origin": "*",
    ...newOptions.headers
  };
  console.log(`${url}——Params:`, newOptions);
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === "DELETE" || response.status === 204) {
        return { status: response.status };
      }
      console.log(`${url}——result:`, response);
      return response.json();
    })
    .then(responseJson => {
      // if ((responseJson.status == 301 || responseJson.status == 401) && window.location.pathname == "/my/order/") {
      //   let id = getQueryString("id");
      //   let appid = wxConfig.appid,
      //   redirectUrl = encodeURIComponent(`${authorizeOrderUrl}${id}`);
      //   window.location.href = wechatAuthorizeUrl({ appid, redirectUrl });
      //   return responseJson;
      // }
      console.log(`${url}——Json:`, responseJson);
      if (newOptions.isError === false) {
        return responseJson;
      }
      const { status, message } = responseJson;
      if (status != 200) {
        // Toast.fail(`${status}:${message[0].errors}`);
      }
      return responseJson;
    });
}
