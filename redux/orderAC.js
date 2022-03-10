// ---------------- ActionCreator ----------------//
const ADD_ORDER = "ADD_ORDER"

//название action type

//функция для dispatch (из файла CounterButton) которая возвращает хэш с action type 
// называется ActionCreator

const add_order = function(objCustomerInfo, objOrderInfo) {
    return {
      type: ADD_ORDER,
      objCustomerInfo: objCustomerInfo,
      objOrderInfo: objOrderInfo
    };
  }

export {
    add_order, ADD_ORDER,
  }