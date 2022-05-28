import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import {fire} from "../../index";
import {
    APPLICANTS_TABLE,
    JOB_TABLE,
    LOADING, PAYMENT_HISTORY_TABLE, QUIZ_TABLE,
} from "../actionTypes";
import React from "react";
import {IApplicant, IJobTable, IPaymentHistoryTable, QuizListTable, TableActions} from "../type";
import {OPEN} from "./jobActions";

const quizCollectionPath = "quiz_bank";
const jobCollectionPath = "jobs";
const paymentHistoryPath = "payments";
const applicantsCollectionPath = "applicants";

const RenderLocation = (latitude: number, longitude: number) => {
    return (
        <iframe
            src={`https://maps.google.com/maps?q=${latitude},
                                            ${longitude}&hl=es;z=14&amp&output=embed`}
            width="100%"
            loading="lazy"
            className="iframe-map"
            title="Map View"
        />
    )
}

const RenderOpenView = () => {
    return (
        <div className="badge badge-dpurple text-white">OPEN</div>
    )
};

const RenderCloseView = () => {
    return (
        <div className="badge badge-dyellow text-white">Yellow</div>
    )
};

const RenderViewAction = (basePath: string, id : string, title: string) => {

    return (
        <a  href={`#${basePath}?id=${id}`}><div className="badge badge-dgreen text-white">{ title }</div></a>
)
};

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

export const getQuizSets = (companyId: string) : ThunkAction<void, RootState, null, TableActions> => dispatch  => {

    const db = fire.firestore();

    dispatch({
        type : LOADING,
        data : []
    });
    let quizSets : QuizListTable[] = [];

    db.collection(quizCollectionPath)
        .where("companyId","==", companyId)
        .get()
        .then((querySnapshot) => {
        let count = 0;
        querySnapshot.forEach((doc) => {
            let quiz : QuizListTable  = doc.data() as QuizListTable;
            count += 1;
            quiz.docId = doc.id;
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

export const getJobs = (companyId: string) : ThunkAction<void, RootState, null, TableActions> => dispatch  => {

    const db = fire.firestore();

    dispatch({
        type : LOADING,
        data : []
    });
    let jobs : IJobTable[] = [];

    db.collection(jobCollectionPath)
        .where("companyId","==", companyId)
        .get()
        .then((querySnapshot) => {
        let count = 0;
        querySnapshot.forEach((doc) => {
            let job : IJobTable  = doc.data() as IJobTable;
            count += 1;
            job.id = count;
            job.action = RenderViewAction("jobs/view/job", doc.id, "View");
            job.shiftOn = job.shift.on;
            job.shiftOff = job.shift.off;
            job.statusView = job.status === OPEN ? RenderOpenView() : RenderCloseView();
            job.locationView = RenderLocation(job.location.latitude, job.location.longitude);
            jobs.push(job);
        });

        dispatch({
            type : JOB_TABLE,
            data : jobs
        })
    });
};

export const getPaymentHistory = (companyId: string) : ThunkAction<void, RootState, null, TableActions> => dispatch  => {

    const db = fire.firestore();

    dispatch({
        type : LOADING,
        data : []
    });
    let history : IPaymentHistoryTable[] = [];

    db.collection(paymentHistoryPath)
        .where("companyId","==", companyId)
        .get()
        .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let payment: IPaymentHistoryTable  = doc.data() as IPaymentHistoryTable;
            payment.dateTime = new Date(doc.data()['dateTime'].toDate());
            payment.date = payment.dateTime?.toISOString().split('T')[0] || "";
            payment.time = payment.dateTime.toLocaleTimeString();
            payment.status = RenderViewAction("jobs/view/job", payment.jobId, "View Job")
            history.push(payment);
        });

        dispatch({
            type : PAYMENT_HISTORY_TABLE,
            data : history
        })
    });
};

export const getApplicants = (jobId: string) :
    ThunkAction<void, RootState, null, TableActions> => dispatch  => {

    const db = fire.firestore();

    dispatch({
        type : LOADING,
        data : []
    });
    let applicants : IApplicant[] = [];

    db.collection(applicantsCollectionPath)
        .where("jobID","==", jobId)
        .get()
        .then((querySnapshot) => {
            let count: number = 0;
            querySnapshot.forEach((doc) => {
                let applicant: IApplicant  = doc.data() as IApplicant;
                count += 1;
                applicant.id = count;
                applicants.push(applicant);
            });

            dispatch({
                type : APPLICANTS_TABLE,
                data : applicants
            })
        });
};