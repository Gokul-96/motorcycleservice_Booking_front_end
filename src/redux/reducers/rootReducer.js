import userReducer from "./userReducer";
import { combineReducers} from "redux";
import bookingReducer from './bookingReducer'; // Update the path

const rootReducer = combineReducers ({
    user: userReducer,
    booking: bookingReducer,
});

export default rootReducer;