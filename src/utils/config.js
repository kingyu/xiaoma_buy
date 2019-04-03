const API = '/web';
module.exports = {
  static_domain:"http://www.xiaomafeiteng.com/",
  api: {
    orderCreate: `${API}/order/create`,
    orderQuery: `${API}/order/search`,
    orderOfflinepay: `${API}/order/offlinepay`,
  },
};
