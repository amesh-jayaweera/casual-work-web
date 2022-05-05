import React from "react";
import jobIcon from "../../resources/icons/job_icon.svg";
import employeeIcon from "../../resources/icons/employee_icon.svg";
import runningIcon from "../../resources/icons/running_icon.svg";
import doneIcon from "../../resources/icons/done_icon.svg";

const Card01 = () => {

    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                <h5>Card 01</h5>
            </div>
        </div>
    )
};

const Card02 = () => {

    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                <h5>Card 02</h5>
            </div>
        </div>
    )
};

const Card03 = () => {

  return (
      <div className="col-9 col-md-10 col-xl-9">
          <div className="m-4 card-details">
              <h5>Card 03</h5>
          </div>
      </div>
  )
};

const Card04 =  () => {
    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                <h5>Card 04</h5>
            </div>
        </div>
    )
};

export function Dashboard() {

    return (
        <div className="pd-ltr-20">
            <div className="row">
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <Card01/>
                            <div className="col-3 col-md-2 col-xl-3 bg-dblue card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={jobIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <Card02/>
                            <div className="col-3 col-md-2 col-xl-3 bg-dcyan card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={employeeIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <Card03/>
                            <div className="col-3 col-md-2 col-xl-3 bg-dpurple card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={runningIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <Card04/>
                            <div className="col-3 col-md-2 col-xl-3 bg-dgreen card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={doneIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-xl-6 mb-30 ">
                </div>

                <div className="col-xl-6 mb-30">
                </div>
            </div>
        </div>
    );
}
