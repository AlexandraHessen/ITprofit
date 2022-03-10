// ---------------- ActionCreator ----------------//
const ADD_PRODUCT = "ADD_PRODUCT"
const DEL_PRODUCT = "DEL_PRODUCT"
const CLEAR_BASKET = "CLEAR_BASKET" //пользователь сам очищает корзину при желании

//название action type

//функция для dispatch (из файла CounterButton) которая возвращает хэш с action type 
// называется ActionCreator

const add_product = function(productId, objProductInfo) {
    return {
      type: ADD_PRODUCT,
      productId: productId,
      objProductInfo: objProductInfo
    };
  }
  
  const del_product = function(productId) {
    return {
      type: DEL_PRODUCT,
      productId: productId,
    };
  }

  const clear_basket = function() {
    return {
      type: CLEAR_BASKET
    };
  }

export {
    add_product, ADD_PRODUCT,
    del_product, DEL_PRODUCT,
    clear_basket, CLEAR_BASKET,
  }