import config from 'utils/config';
import queryString from 'query-string';
import * as service from '../services/global';
const { prefix } = config;
export default {
  namespace: 'global',
  state: {
    order: {
      order_no: 0,
      paycode: '',
    },
    data: {
      userinfo: {},
      selectedProduct: [],
      selectedTerm: 1,
      prdouctPrice: { pastime: 16800, shop: 18800, minisite: 10800, food: 12800 },
      term3: 0.0025,
      term6: 0.005,
      term12: 0.01,
      termPayment3: 0,
      termPayment6: 0,
      termPayment12: 0,
      termInterest3: 0,
      termInterest6: 0,
      termInterest12: 0,
      downPayment: 0,
      originalPrice: 0,
      discount: 1,
      discountPrice: 0
    },
  },
  effects: {
    *saveUserinfo({ payload }, { put }) {
      yield put({
        type: 'saveData',
        payload: { userinfo: payload },
      });
      return true;
    },
    *jumpStep({ payload }, { put }) {
      yield put({
        type: 'saveData',
        payload,
      });
      return true;
    },
    *selectedProduct({ payload }, { call, put, select }) {
      const _data = yield select(state => state.global.data);
      let _newArray = [],
        total = 0,
        productNum = 0,
        discount = 1,
        newPayload = {};
      let resultArr = _data.selectedProduct.indexOf(payload);
      if (resultArr > -1) {
        _newArray = _data.selectedProduct.filter(item => item !== payload);
      } else {
        _data.selectedProduct.push(payload);
        _newArray = _data.selectedProduct;
      }
      newPayload.selectedProduct = _newArray;
      //   productNum = _newArray.length;
      //   _newArray.forEach(item => {
      //     total += _data.prdouctPrice[item];
      //   });
      //   newPayload.originalPrice = total;
      //   newPayload.discountPrice = total;
      //   if (productNum > 1) {
      //     if (productNum == 2) {
      //       discount = 0.95;
      //     } else if (productNum == 3) {
      //       discount = 0.9;
      //     } else if (productNum == 4) {
      //       discount = 0.8;
      //     }
      //     total = total * discount;
      //     newPayload.discount = discount;
      //     newPayload.discountPrice = total;
      //   }
      yield put({
        type: 'saveData',
        payload: newPayload,
      });
      return payload;
    },
    *confirmProduct({ payload }, { call, put, select }) {
      const _data = yield select(state => state.global.data);
      let _newArray = [],
        total = 0,
        productNum = 0,
        discount = 1,
        newPayload = {};
      _newArray = _data.selectedProduct;
      productNum = _newArray.length;
      _newArray.forEach(item => {
        total += _data.prdouctPrice[item];
      });
      newPayload.originalPrice = total;
      newPayload.discountPrice = total;
      if (productNum > 0) {
        if (productNum == 2) {
          discount = 0.95;
        } else if (productNum == 3) {
          discount = 0.9;
        } else if (productNum == 4) {
          discount = 0.7;
        }
        total = total * discount;
        newPayload.discount = discount;
        newPayload.discountPrice = total;
        newPayload.downPayment = parseInt(total / 2);
        newPayload.termPayment3 = parseInt(newPayload.downPayment / 3);
        newPayload.termInterest3 = Math.round(newPayload.downPayment * _data.term3);
        newPayload.termPayment6 = parseInt(newPayload.downPayment / 6);
        newPayload.termInterest6 = Math.round(newPayload.downPayment * _data.term6);
        newPayload.termPayment12 = parseInt(newPayload.downPayment / 12);
        newPayload.termInterest12 = Math.round(newPayload.downPayment * _data.term12);
      }
      yield put({
        type: 'saveData',
        payload: newPayload,
      });
      return true;
    },
    *queryOrder({ payload }, { call, put, select }) {
      const _order = yield select(state => state.global.order);
      const result = yield call(service.orderQueryState, _order.order_no);
      if (result.error === 0) {
        if (result.data.pay_status_int == 2) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
    *submitOrder(_, { call, put, select }) {
      const _data = yield select(state => state.global.data);
      let newArray = [];
      _data.selectedProduct.forEach((item, index) => {
        if (item == 'pastime') {
          newArray.push('xxyl');
        } else if (item == 'shop') {
          newArray.push('shop');
        } else if (item == 'food') {
          newArray.push('diancan');
        } else if (item == 'minisite') {
          newArray.push('weizhan');
        }
      });
      const result = yield call(service.submitOrderCreate, {
        customer_name: _data.userinfo.customer_name,
        customer_mobile: _data.userinfo.customer_mobile,
        customer_email: _data.userinfo.customer_email,
        pay_period: _data.selectedTerm,
        product: newArray,
      });
      if (result.error === 0) {
        yield put({
          type: 'saveOrder',
          payload: result.data,
        });
        return true;
      } else {
        return {error:true,message:result.message};
      }
    },
    *submitOrderOfflinepay({ payload }, { call, put, select }) {
      const _order = yield select(state => state.global.order);
      const result = yield call(service.submitOrderOfflinepay, { id: _order.id, ...payload });
      if (result.status == 0) {
        return true;
      } else {
        return false;
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveData(state, action) {
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    },
    saveOrder(state, action) {
      return {
        ...state,
        order: { ...state.order, ...action.payload },
      };
    },
  },
};
