import {
    TableActions, TableState,
} from "../type";
import {
    LOADING,
    QUIZ_TABLE
} from "../actionTypes";

const initQuizState : TableState = {
    loading : true,
    data : []
};

export const quizTableReducer = ( state: TableState = initQuizState, action: TableActions) => {
    switch (action.type) {
        case QUIZ_TABLE :
            return  {
                ...state,
                loading: false,
                data : action.data
            };
        case LOADING:
            return {
                ...state,
                loading : true,
                data : action.data
            };
        default: return state
    }
};