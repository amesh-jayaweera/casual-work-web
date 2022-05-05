import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {menuReducer} from "./otherReducer";
import {companyProfileUpdateReducer, companyRegistrationReducer} from "./companyReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    menu: menuReducer,
    companyRegistration: companyRegistrationReducer,
    companyProfileUpdate: companyProfileUpdateReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;
