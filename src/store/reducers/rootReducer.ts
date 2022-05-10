import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {menuReducer} from "./otherReducer";
import {companyProfileUpdateReducer, companyRegistrationReducer} from "./companyReducer";
import {quizReducer} from "./quizReducer";
import {quizTableReducer} from "./tableReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    menu: menuReducer,
    companyRegistration: companyRegistrationReducer,
    companyProfileUpdate: companyProfileUpdateReducer,
    quiz: quizReducer,
    quizTable: quizTableReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;
