// ---------------- САМА ФУНКЦИЯ REDUСER  ----------------//
// REDUCER не делает запрос в Ajax, логика должна быть в компоненте
import { ADD_ORDER } from './orderAC'; //название action type

const initState={ // начальный state
    orders: []
}

function orderReducer(state=initState,action) {
  switch (action.type) {
    case ADD_ORDER: {
      let newOrder=[...state.orders]
      newOrder.push( { objCustomerInfo: action.objCustomerInfo, products: action.objOrderInfo } );
      let newState={...state, orders: newOrder};

      return newState;
    }

              //обязатнльно пишем на тот случай если пришел action который не относится к этому reducery
    default:
      return state;
  }
}

export default orderReducer;