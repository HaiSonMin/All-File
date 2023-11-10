import { legacy_createStore as createStore, combineReducers } from "redux";
import accountReducer from "./features/accounts/sliceAccountRedux";
import customerReducer from "./features/customers/sliceCustomer";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
export const store = createStore(rootReducer);
console.log(store.getState());
