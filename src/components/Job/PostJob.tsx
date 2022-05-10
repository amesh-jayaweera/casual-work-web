import React, {useEffect, useRef, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {useHistory, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {IJob} from "../../store/type";
import {RootState} from "../../store/reducers/rootReducer";
import {validateTime} from "../../util/regex";
import {ValidateShifts} from "../../util/validation";

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

    const today = new Date();
    today.setDate(today.getDate() + 1)
    const [loading, setLoading] = useState<boolean>(false);
    const isViewMode = useRef<boolean>(false);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { user : {email} } = useSelector((state: RootState) => state.auth);
    const [titles, setTitles] = useState<string[]>([]);

    const [job, setJob] = useState<IJob>({
        field: "None",
        title: "None",
        description: "",
        district: "",
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
        if(job.field !== "None")
            setTitles(TITLES[job.field]);
    },[job.field]);

    function onSubmit() {

    }

    function onClear() {

    }

    return (
        <>
            {
                loading &&
                <Skeleton count={20} duration={20}/>
            }
            {
                !loading &&
                <div className="pd-20 card-box mb-30">
                    {/*  form */}

                    <form className="needs-validation">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Field<sup>*</sup></label>
                                    <select className="custom-select" onChange={(e)=> {
                                        setJob(prevState => ({
                                            ...prevState,
                                            field : e.target.value
                                        }));
                                        setValidation(prevState => ({
                                            ...prevState,
                                            fieldReq: (!e.target.value || e.target.value === "None")
                                        }))
                                    }} disabled={isViewMode.current} value={job.field}>
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
                                        validation.fieldReq && <small className="invalid-feedback">
                                            Please select job field.</small>
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Job Title<sup>*</sup></label>
                                    <select className="custom-select" onChange={(e)=> {
                                        setJob(prevState => ({
                                            ...prevState,
                                            title : e.target.value
                                        }));
                                        setValidation(prevState => ({
                                            ...prevState,
                                            titleReq : !e.target.value || e.target.value === "None"
                                        }));
                                    }} disabled={isViewMode.current} value={job.title}>
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
                                        validation.titleReq && <small className="invalid-feedback">
                                            Please select job title</small>
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Job Description<sup>*</sup></label>
                                    <textarea className="form-control " required
                                              value={job.description}
                                              onChange={(e)=> {
                                                  setJob(prevState => ({
                                                      ...prevState,
                                                      description : e.target.value
                                                  }));
                                                  setValidation(prevState => ({
                                                      ...prevState,
                                                      descriptionReq : !e.target.value
                                                  }));
                                              }}/>
                                    {
                                        validation.descriptionReq && <small className="invalid-feedback">
                                            The description is required</small>
                                    }
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label>Date<sup>*</sup></label>
                                            <input className="form-control  date-picker" placeholder="Date"
                                                   type="date"
                                                   disabled={isViewMode.current}
                                                   value={job.date} data-date-format="DD MMMM YYYY" required
                                                   onChange={(e)=> {
                                                       setJob(prevState => ({
                                                           ...prevState,
                                                           date : e.target.value
                                                       }));
                                                   }}
                                            />
                                            {
                                                validation.dateReq && <small className="invalid-feedback">
                                                    Date of the job is required.</small>
                                            }
                                            {
                                                (new Date(job.date).getTime() <
                                                    new Date().getTime()) &&
                                                <small className="invalid-feedback">
                                                    Cannot post a job for past or today date!</small>
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

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label>Shift On Time<sup>*</sup></label>
                                            <input className="form-control time-picker-default" type="time" placeholder="Shift On Time"
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
                                                   required/>
                                            {
                                                !validateTime(job.shift.on) && <small className="invalid-feedback">
                                                    Please insert valid shift on time.</small>
                                            }
                                        </div>

                                        <div className="form-group col-6">
                                            <label>Shift Off Time<sup>*</sup></label>
                                            <input className="form-control time-picker-default" type="time"
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
                                                   required/>
                                            {
                                                !validateTime(job.shift.off) && <small className="invalid-feedback">
                                                    Please insert valid shift off time.</small>
                                            }
                                            {
                                                validateTime(job.shift.on) && validateTime(job.shift.off) &&
                                                !ValidateShifts(job.shift.on, job.shift.off) &&
                                                <small className="invalid-feedback">Invalid Shift</small>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Address<sup>*</sup></label>
                                    <textarea className="form-control "  required
                                              value={job.address}
                                              onChange={(e)=> {
                                                  setJob(prevState => ({
                                                      ...prevState,
                                                      address : e.target.value
                                                  }));
                                                  setValidation(prevState => ({
                                                      ...prevState,
                                                      addressReq : !e.target.value
                                                  }));
                                              }}/>
                                    {
                                        validation.addressReq && <small className="invalid-feedback">The address is required.</small>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* end form */}
                    <div className="d-flex justify-content-end">
                        <button type="reset" className="btn btn-danger mr-3"
                                onClick={() => onClear()}
                        >Clear</button>
                        <button type="button" className="btn btn-primary"
                                onClick={() => {onSubmit()}}
                        >{"Post"}</button>
                    </div>
                </div>
            }
        </>
    )
}
