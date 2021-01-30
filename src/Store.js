var redux = require('redux');

const noteInitialState = {
    isEdit: false,
    editProducts: {},
    editCategories: {},


    isChange: false,
    productData: {},

    savingProduct: {},
    idToSavingProduct: '',

    idForOrderPage: '',
    count: 0,
    arrayProductForOrderPage: [],

    detailProductData: {},
    status: ''
}
const allReducer = (state = noteInitialState, action) => {
    switch (action.type) {

        case "GET_EDIT_DATA":
            return { ...state, editProducts: action.editObject }

        case "GET_CATEGORIES_DATA":
            return { ...state, editCategories: action.editCategories }

        case "SAVING_PRODUCT":

            return { ...state, isEdit: true, savingProduct: action.savingObject, idToSavingProduct: action.idToSavingProduct };

        case "ADD_TO_CART":

        console.log("add roofi");
            return { ...state, count: state.count + action.count };

        case "MOVING_ARRAY_PORDUCT":
            return { ...state, arrayProductForOrderPage: action.moving };

        case "MOVING_FOR_ORDER_PAGE_SHOW_LEN":
            return { ...state, arrayProductForOrderPage: action.moving };

        case "DETAIL_PRODUCT_DATA":
            return { ...state, detailProductData: action.detailProductData }

        case "GET_STATUS":
            return { ...state, status: action.getStatus }


            case "UPDATE_COUNT":
            return { ...state, count: action.count }

        default:
            return state
    }
}
var store = redux.createStore(allReducer);
store.subscribe(function () {
    console.log(store.getState());

})
export default store;