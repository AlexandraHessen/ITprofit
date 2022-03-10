// ---------------- САМА ФУНКЦИЯ REDUСER  ----------------//
// REDUCER не делает запрос в Ajax, логика должна быть в компоненте
import { ADD_PRODUCT, DEL_PRODUCT, CLEAR_BASKET} from './basketAC'; //название action type


const initState={ // начальный state
    productsInBasket: {},
}

//--------------------------- НЕЛЬЗЯ LOCAL ST В REDUCER ---------------------------
function basketReducer(state=initState,action) {
  switch (action.type) {

    case ADD_PRODUCT: {
      let newState={...state, //старый state
        productsInBasket:{...state.productsInBasket, //заменить старые продукты на теже +
          // ПРИЛЕТИТ какой продукт (productid) изменить и насколько(addvalue)
          [action.productId]:action.objProductInfo //+
          //[action.counterid] - В нужном продукте 
          // state.productsInBasket[action.productid] - его старое значение 
          // action.addvalue - изменить на прилетевшее
        }
      };
      return newState;
    }

    case DEL_PRODUCT: {
      let newState = {...state};
      delete newState.productsInBasket[action.productId];
      return newState;
    }

    case CLEAR_BASKET:{
      let newState = {...state};
      newState.productsInBasket={};
      return newState;
    }

//обязатнльно пишем на тот случай если пришел action который не относится к этому reducery
    default:
      return state;
  }
}

export default basketReducer;
