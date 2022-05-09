import React, {useState} from "react";
import {useSelector} from "react-redux";
import {IQuestion, IQuiz} from "../../store/type";
import {RootState} from "../../store/reducers/rootReducer";
import {CreateQuestionModal} from "./CreateQuestionModal";
import {useHistory, useLocation} from "react-router";
import {v4 as uuidv4} from 'uuid';
import {DeleteQuestionConfirmModal} from "./DeleteQuestionConfirmModal";

export function CreateQuiz() {

    const history = useHistory();
    const location = useLocation();
    const { user : {email} } = useSelector((state: RootState) => state.auth);

    const [validation,setValidation] = useState({
        titleReq : false
    });

    const [quiz, setQuiz] = useState<IQuiz>({
        title: "",
        companyId: email,
        questions: new Map<string, IQuestion>(),
        createdDateTime: new Date()
    });

    const [question, setQuestion] = useState<IQuestion>({
        question: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        correctOption: 0
    });

    function onSubmit() {

    }

    return (
        <>
            <div className="pd-20 card-box mb-30">
                { /* Loading Bar */ }
                {/*{*/}
                {/*    processing &&*/}
                {/*    <div className="progress custom-progress">*/}
                {/*        <div className={"progress-bar bg-dgreen progress-bar-striped progress-bar-animated custom-progress-bar-" + progress?.toString()}*/}
                {/*             role="progressbar" aria-valuemin={0} aria-valuemax={100}>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*}*/}
                <br/>
                <form className="needs-validation">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="">Title<sup>*</sup></label>
                                <input className="form-control" type="text" placeholder="Title" required
                                       value={quiz.title}
                                       onChange={(e) => {
                                           setQuiz(prevState => ({
                                               ...prevState,
                                               title : e.target.value
                                           }));
                                           setValidation(prevState => ({
                                               ...prevState,
                                               titleReq : !e.target.value
                                           }));
                                       }}
                                />
                                {
                                    validation.titleReq &&
                                    <small className="invalid-feedback">Title is required.</small>
                                }
                            </div>
                        </div>
                    </div>
                </form>

                <div className="view-content">

                    {
                        !!quiz &&  Array.from(quiz.questions.entries()).map((value) => {
                            return (
                                <div key={`${value[0]}-question-block`}>
                                    <div className="row-1 views-row" key={`${value[0]}-row`}>
                                        <div className="col-md-12" key={`${value[0]}-col`}>
                                            <h4 key={`${value[0]}-title`} className="views-field views-field-field-questionn">{value[1].question}</h4>
                                            <ol key={`${value[0]}-options-list`}>
                                                <li key={`${value[0]}-option-1`} className="views-field views-field-field">1. {value[1].optionOne}</li>
                                                <li key={`${value[0]}-option-2`} className="views-field views-field-field">2. {value[1].optionTwo}</li>
                                                <li key={`${value[0]}-option-3`} className="views-field views-field-field">3. {value[1].optionThree}</li>
                                            </ol>
                                            <h6 className="views-field views-field-field-answer" key={`${value[0]}-correct-option`}>Correct Option - {value[1].correctOption}</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start" key={`${value[0]}-button-group`}>
                                        <button type="button" className="btn btn-warning btn-left-margin"
                                                key={`${value[0]}-button-group-edit`}
                                                onClick={() => {

                                                }}
                                        >Edit</button>
                                        {/*  apply processing param here for disabled */}
                                        <button  className="btn btn-danger btn-left-margin"
                                                 key={`${value[0]}-button-group-delete`}
                                                 onClick={() => {
                                                    history.push(`#quiz/create/delete-question?id=${value[0]}`);
                                                 }}
                                        >Delete</button>
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-warning mr-3"
                            onClick={ () => history.push(`#quiz/create/add-question?id=${uuidv4()}`) }
                    >Add Question</button>
                    {/*  apply processing param here for disabled */}
                    <button  className="btn btn-primary" disabled={false}
                             onClick={() => {
                                 onSubmit();
                             }}
                    >Save</button>
                </div>
            </div>

            <CreateQuestionModal onQuestionComplete={(returnedQuestion: any)=> {
                quiz.questions.set(returnedQuestion["id"], returnedQuestion["quiz"]);
            }}
                                 initQuestion={{
                                     question: "",
                                     optionOne: "",
                                     optionTwo: "",
                                     optionThree: "",
                                     correctOption: 0
                                 }}
                                 isOpen={location.hash.startsWith("#quiz/create/add-question?id=")}
                                 isEdit={false}
            />

            <DeleteQuestionConfirmModal handleConfirm={(id: string)=> {
                quiz.questions.delete(id);
            }} _show={location.hash.startsWith("#quiz/create/delete-question?id=")}/>
        </>
    )
}