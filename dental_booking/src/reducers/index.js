import { combineReducers } from "redux";
import loginReducer  from "./loginReducer"

const AllReducers = combineReducers({
    loginReducer,
    // thêm nhiều reducer ở đây
})

export default AllReducers;