import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {menuReducer} from "./otherReducer";
import {companyProfileUpdateReducer, companyRegistrationReducer} from "./companyReducer";
import {quizReducer} from "./quizReducer";
import {jobReducer, quizTableReducer} from "./tableReducer";
import {postJobReducer} from "./jobReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    menu: menuReducer,
    companyRegistration: companyRegistrationReducer,
    companyProfileUpdate: companyProfileUpdateReducer,
    quiz: quizReducer,
    quizTable: quizTableReducer,
    postJob: postJobReducer,
    jobTable: jobReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;
