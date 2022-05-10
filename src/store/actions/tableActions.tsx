import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import {fire} from "../../index";
import {
    LOADING, QUIZ_TABLE,
} from "../actionTypes";
import React from "react";
import {QuizListTable, TableActions} from "../type";

const quizCollectionPath = "quiz_bank";

// const RenderViewAction = (url : string) => {
//
//     return (
//         <a  href={url}><div className="badge badge-dgreen text-white">View</div></a>
// )
// };

const RenderViewEditActions = (id : string) => {
    return (
        <div className="row">
            <div className="col-4">
                <a  href={`#quiz/view/question?id=${id}`}><div className="badge badge-dgreen text-white">View</div></a>
            </div>
            <div className="col-4">
                <a href={`#quiz/update/question?id=${id}`}><div className="badge badge-dyellow text-dark">Edit</div></a>
            </div>
        </div>
    )
};

export const getQuizSets = () : ThunkAction<void, RootState, null, TableActions> => dispatch  => {

    const db = fire.firestore();

    dispatch({
        type : LOADING,
        data : []
    });
    let quizSets : QuizListTable[] = [];

    db.collection(quizCollectionPath).get().then((querySnapshot) => {
        let count = 0;
        querySnapshot.forEach((doc) => {
            let quiz : QuizListTable  = doc.data() as QuizListTable;
            count += 1;
            quiz.id = count;
            quiz.numberOfQuestions = quiz.questions?.length || 0;
            quiz.action = RenderViewEditActions(doc.id);
            quizSets.push(quiz);
        });

        dispatch({
            type : QUIZ_TABLE,
            data : quizSets
        })
    });
};