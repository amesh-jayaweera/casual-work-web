import React, {useEffect, useRef, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {useHistory, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {IJob, QuizListTable} from "../../store/type";
import {RootState} from "../../store/reducers/rootReducer";
import {validateTime} from "../../util/regex";
import {ValidateLatitude, ValidateLongitude, ValidateShifts} from "../../util/validation";
import {getQuizSets} from "../../store/actions/tableActions";
import {CLOSED, postJob} from "../../store/actions/jobActions";
import {
    POST_JOB_DEFAULT,
    POST_JOB_FAILED,
    POST_JOB_SUCCESS
} from "../../store/actionTypes";
import {Failure, Success} from "../../util/toasts";
import {fire} from "../../index";

export const defaultShiftOnTime : string = "08:00";
export const defaultShiftOffTime : string = "17:00";
export const FIELDS = [
    'Hospitality', 'Business', 'Warehousing', 'Commercial Cleaning'
]
export const TITLES: {[field: string]: string[]} = {
    'Hospitality' : [
        'F&B Assistant',
        'Wait staff',
        'Kitchen hand'
    ], 'Business': [
        'Customer Service',
        'Store Assistants',
        'Receptionists',
        'Data Entry'
    ], 'Warehousing': [
        'Assembly Line',
        'Pick Packers',
        'Labor'
    ], 'Commercial Cleaning': [
        'Office Cleaner'
    ]
};

export function PostJob() {

    const location = useLocation();
    const today = new Date();
    today.setDate(today.getDate() + 1)
    const [isViewMode, setIsViewMode] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { user : {email} } = useSelector((state: RootState) => state.auth);
    const [titles, setTitles] = useState<string[]>([]);
    const {loading, data } = useSelector((state: RootState) => state.quizTable);
    const {type, message, error } = useSelector((state: RootState) => state.postJob);
    const dataLoading = useRef<boolean>(false);
    useEffect(() => {
        dispatch(getQuizSets());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [job, setJob] = useState<IJob>({
        field: "None",
        title: "None",
        description: "",
        address: "",
        location: {
            latitude: 0.0,
            longitude: 0.0
        },
        date: today.toISOString().split('T')[0],
        shift: {
            on: defaultShiftOnTime,
            off: defaultShiftOffTime
        },
        hourlyRate: 0.0,
        totalEstimatedCost: 0.0,
        status: "",
        companyId: email,
        skillTestId: ""
    });

    const [validation, setValidation] = useState({
        fieldReq: false,
        titleReq: false,
        descriptionReq: false,
        addressReq: false,
        dateReq: false,
        hourlyRateReq: false
    });

    useEffect(()=> {
        dataLoading.current = true;
        let docID = location.hash.split('#jobs/view/job?id=');
        if(docID.length >= 2) {
            fire.firestore().collection("jobs").doc(docID[1].trim()).get()
                .then((doc) => {
                    if(doc.exists && (doc.data() as IJob).companyId === email) {
                        let data: IJob = doc.data() as IJob;
                        setJob(data);
                        setIsViewMode(true);
                        dataLoading.current = false;
                    } else {
                        // not found
                        dataLoading.current = false;
                        history.push('#dashbord/not-found');
                    }
                });
        } else if(location.hash === "#jobs/post-job"){
            setIsViewMode(false);
            dataLoading.current = false;
        }
        dataLoading.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=> {
        if(job.field !== "None")
            setTitles(TITLES[job.field]);
    },[job.field]);

    useEffect(()=> {
        const startDate: any = new Date(`0001-01-01 ${job.shift.on}`);
        const endDate: any = new Date(`0001-01-01 ${job.shift.off}`);
        const estimatedCost: number = ((endDate - startDate) / 1000 / 60 / 60 % 24) * job.hourlyRate;
        setJob(prevState => ({
            ...prevState,
            totalEstimatedCost: estimatedCost
        }));
    },[job.hourlyRate, job.shift.on, job.shift.off]);

    useEffect(() => {
        if (type === POST_JOB_SUCCESS) {
            Success(message as string);
            dispatch({
                type: POST_JOB_DEFAULT
            });
            history.push("#jobs");
        } else if(type === POST_JOB_FAILED) {
            Failure(error as string);
            dispatch({
                type : POST_JOB_DEFAULT
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type, error, message, dispatch]);

    function onSubmit() {
        setValidation({
            fieldReq: !job.field || job.field === "None",
            titleReq: !job.field || job.field === "None",
            descriptionReq: !job.description,
            addressReq: !job.address,
            dateReq: !job.date,
            hourlyRateReq: job.hourlyRate <= 0
        });

        if(validateTime(job.shift.on) && validateTime(job.shift.off) && ValidateShifts(job.shift.on, job.shift.off)
            && ValidateLatitude(job.location.latitude) && ValidateLongitude(job.location.longitude)
            && !(new Date(job.date).getTime() < new Date().getTime()) && !!job.field && FIELDS.includes(job.field)
            && !!job.title && TITLES[job.field].includes(job.title) && !!job.description && !!job.address
            && job.date && job.hourlyRate > 0) {
            dispatch(postJob(job));
        }
    }

    function onClose() {

    }

    function onClear() {
        setJob({
            field: "None",
            title: "None",
            description: "",
            address: "",
            location: {
                latitude: 0.0,
                longitude: 0.0
            },
            date: today.toISOString().split('T')[0],
            shift: {
                on: defaultShiftOnTime,
                off: defaultShiftOffTime
            },
            hourlyRate: 0.0,
            totalEstimatedCost: 0.0,
            status: "",
            companyId: email,
            skillTestId: ""
        });
    }

    return (
        <>
            {
                (loading || dataLoading.current.valueOf()) &&
                <Skeleton count={20} duration={20}/>
            }
            {
                !loading && !dataLoading.current.valueOf() &&
                <div className="pd-20 card-box mb-30">
                    {/*  form */}
                    <form className="needs-validation">

                        <div className="row">

                            {/** main column - 1 **/}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Field<sup>*</sup></label>
                                    <select className="custom-select"
                                            onChange={(e)=> {
                                                setJob(prevState => ({
                                                    ...prevState,
                                                    field : e.target.value
                                                }));
                                                setValidation(prevState => ({
                                                    ...prevState,
                                                    fieldReq: (!e.target.value || e.target.value === "None")
                                                }))
                                            }}


                                            value={job.field}
                                    >
                                        <option value="None">Select Job Field</option>
                                        {
                                            !!FIELDS && FIELDS.map((value => {
                                                return (
                                                    <option value={value} key={`option-${value}`}>{value}</option>
                                                )
                                            }))
                                        }
                                    </select>
                                    {
                                        validation.fieldReq &&
                                        <small className="invalid-feedback">Please select job field.</small>
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Job Title<sup>*</sup></label>
                                    <select className="custom-select"
                                            onChange={(e)=> {
                                                setJob(prevState => ({
                                                    ...prevState,
                                                    title : e.target.value
                                                }));
                                                setValidation(prevState => ({
                                                    ...prevState,
                                                    titleReq : !e.target.value || e.target.value === "None"
                                                }));
                                            }}
                                            value={job.title}
                                    >
                                        <option value="None">Select Job Category</option>
                                        {
                                            !!titles && titles.map((value => {
                                                return (
                                                    <option value={value} key={`option-${value}`}>{value}</option>
                                                )
                                            }))
                                        }
                                    </select>
                                    {
                                        validation.titleReq &&
                                        <small className="invalid-feedback">Please select job title</small>
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Job Description<sup>*</sup></label>
                                    <textarea className="form-control"
                                              value={job.description}
                                              disabled={isViewMode}
                                              onChange={(e)=> {
                                                  setJob(prevState => ({
                                                      ...prevState,
                                                      description : e.target.value
                                                  }));
                                                  setValidation(prevState => ({
                                                      ...prevState,
                                                      descriptionReq : !e.target.value
                                                  }));
                                              }}
                                              required
                                    />
                                    {
                                        validation.descriptionReq &&
                                        <small className="invalid-feedback">The description is required</small>
                                    }
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label>Date<sup>*</sup></label>
                                            <input className="form-control  date-picker"
                                                   placeholder="Date"
                                                   type="date"
                                                   disabled={isViewMode}
                                                   value={job.date} data-date-format="DD MMMM YYYY"
                                                   onChange={(e)=> {
                                                       setJob(prevState => ({
                                                           ...prevState,
                                                           date : e.target.value
                                                       }));
                                                   }}
                                                   required
                                            />
                                            {
                                                validation.dateReq &&
                                                <small className="invalid-feedback">Date of the job is required.</small>
                                            }
                                            {
                                                (new Date(job.date).getTime() < new Date().getTime()) &&
                                                <small className="invalid-feedback">
                                                    Cannot post a job for past or today date!
                                                </small>
                                            }
                                        </div>

                                        <div className="form-group col-6">
                                            <label>Skill Test</label>
                                            <select className="custom-select"
                                                    onChange={(e) => {
                                                        setJob(prevState => ({
                                                            ...prevState,
                                                            skillTestId: e.target.value
                                                        }));
                                                    }}
                                                    value={job.skillTestId || ""}
                                            >
                                                <option value="None">Select a Skill Test</option>
                                                {
                                                    !!data && data.map(value  => {
                                                        const quiz: QuizListTable = value as QuizListTable;
                                                        return (
                                                            <option key={quiz.id} value={quiz.id}>
                                                                {quiz.title}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label>Shift On Time<sup>*</sup></label>
                                            <input className="form-control time-picker-default"
                                                   type="time"
                                                   placeholder="Shift On Time"
                                                   disabled={isViewMode}
                                                   onChange={(e)=> {
                                                       setJob(prevState => ({
                                                           ...prevState,
                                                           shift : {
                                                               ...prevState.shift,
                                                               on: e.target.value
                                                           }
                                                       }));
                                                   }}
                                                   value={job.shift.on}
                                                   required
                                            />
                                            {
                                                !validateTime(job.shift.on) &&
                                                <small className="invalid-feedback">
                                                    Please insert valid shift on time.
                                                </small>
                                            }
                                        </div>

                                        <div className="form-group col-6">
                                            <label>Shift Off Time<sup>*</sup></label>
                                            <input className="form-control time-picker-default"
                                                   type="time"
                                                   disabled={isViewMode}
                                                   placeholder="Shift Off Time"
                                                   onChange={(e)=> {
                                                       setJob(prevState => ({
                                                           ...prevState,
                                                           shift: {
                                                               ...prevState.shift,
                                                               off: e.target.value
                                                           }
                                                       }));
                                                   }}
                                                   value={job.shift.off}
                                                   required
                                            />
                                            {
                                                !validateTime(job.shift.off) &&
                                                <small className="invalid-feedback">
                                                    Please insert valid shift off time.
                                                </small>
                                            }
                                            {
                                                validateTime(job.shift.on) && validateTime(job.shift.off) &&
                                                !ValidateShifts(job.shift.on, job.shift.off) &&
                                                <small className="invalid-feedback">Invalid Shift</small>
                                            }
                                        </div>
                                    </div>
                                </div>


                                {/* hourly rate */}

                                <div className="form-group">
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label>Hourly Rate (LKR)<sup>*</sup></label>
                                            <input className="form-control time-picker-default"
                                                   type="number"
                                                   placeholder="Hourly Rate (LKR)"
                                                   disabled={isViewMode}
                                                   onChange={(e)=> {
                                                       setJob(prevState => ({
                                                           ...prevState,
                                                           hourlyRate: Number(e.target.value)
                                                       }));
                                                       setValidation(prevState => ({
                                                           ...prevState,
                                                           hourlyRateReq: !(job.hourlyRate > 0)
                                                       }));
                                                   }}
                                                   value={job.hourlyRate}
                                                   required
                                            />
                                            {
                                                validation.hourlyRateReq &&
                                                <small className="invalid-feedback">Please add a hourly rate!.</small>
                                            }
                                        </div>

                                        <div className="form-group col-6">
                                            <label>Total Estimated Cost (LKR)</label>
                                            <input className="form-control time-picker-default"
                                                   type="text"
                                                   placeholder="Total Estimated Cost (LKR)"
                                                   value={job.totalEstimatedCost}
                                                   disabled={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Address<sup>*</sup></label>
                                    <textarea className="form-control"
                                              value={job.address}
                                              disabled={isViewMode}
                                              onChange={(e)=> {
                                                  setJob(prevState => ({
                                                      ...prevState,
                                                      address : e.target.value
                                                  }));
                                                  setValidation(prevState => ({
                                                      ...prevState,
                                                      addressReq : !e.target.value
                                                  }));
                                              }}
                                              required
                                    />
                                    {
                                        validation.addressReq &&
                                        <small className="invalid-feedback">The address is required.</small>
                                    }
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label>Latitude<sup>*</sup></label>
                                            <input className="form-control"
                                                   placeholder="Latitude"
                                                   type="number"
                                                   disabled={isViewMode}
                                                   value={job.location.latitude} required
                                                   onChange={(e)=> {
                                                       setJob(prevState => ({
                                                           ...prevState,
                                                           location: {
                                                               ...prevState.location,
                                                               latitude: Number(e.target.value)
                                                           }
                                                       }));
                                                   }}
                                            />
                                            {
                                                !ValidateLatitude(job.location.latitude) &&
                                                <small className="invalid-feedback">Invalid Latitude Format!</small>
                                            }
                                        </div>

                                        <div className="form-group col-6">
                                            <label>Longitude<sup>*</sup></label>
                                            <input className="form-control"
                                                   placeholder="Longitude"
                                                   type="number"
                                                   disabled={isViewMode}
                                                   value={job.location.longitude} required
                                                   onChange={(e)=> {
                                                       setJob(prevState => ({
                                                           ...prevState,
                                                           location: {
                                                               ...prevState.location,
                                                               longitude: Number(e.target.value)
                                                           }
                                                       }));
                                                   }}
                                            />
                                            {
                                                !ValidateLongitude(job.location.longitude) &&
                                                <small className="invalid-feedback">Invalid Longitude Format!.</small>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <iframe
                                    src={`https://maps.google.com/maps?q=${job.location.latitude},
                                            ${job.location.longitude}&hl=es;z=14&amp&output=embed`}
                                    width="100%"
                                    height="450"
                                    loading="lazy"
                                    className="iframe-map"
                                    title="Map View"
                                />
                            </div>
                        </div>
                    </form>

                    {/* end form */}
                    <div className="d-flex justify-content-end">
                        {
                            !isViewMode &&
                            <>
                                <button type="reset" className="btn btn-danger mr-3"
                                        onClick={() => onClear()}
                                >
                                    Clear
                                </button>
                                <button type="button" className="btn btn-primary"
                                    onClick={() => {onSubmit()}}
                                >
                                    Post
                                </button>
                            </>
                        }
                        {
                            job.status !== CLOSED && isViewMode &&
                            <button type="button" className="btn btn-danger mr-3"
                                    onClick={() => onClose()}
                            >
                                Close
                            </button>
                        }
                    </div>
                </div>
            }
        </>
    )
}
