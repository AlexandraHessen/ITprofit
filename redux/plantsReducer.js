// ---------------- САМА ФУНКЦИЯ REDUСER  ----------------//
// REDUCER не делает запрос в Ajax, логика должна быть в компоненте
import { PLANTS_LOADING, PLANTS_ERROR, PLANTS_SET } from './plantsAC'; //название action type


const initState={ // начальный state

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null, //даные которые мы загрузили по сети

}

function plantsReducer(state=initState,action) {
  switch (action.type) {

    case PLANTS_LOADING: {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case PLANTS_ERROR: {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case PLANTS_SET: {
      let newState={
        status:3,
        data:action.plants, //загруженные данные
      };
      return newState;
    }
    
//обязатнльно пишем на тот случай если пришел action который не относится к этому reducery
    default:
      return state;
  }
}

export default plantsReducer;
