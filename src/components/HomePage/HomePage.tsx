import React, {useEffect} from "react";
import {Header} from "../Common/Header/Header";
import {SideBar} from "../Common/SideBar/SideBar";
import {ContainerNavigation} from "../Common/ContainerNavigation/ContainerNavigation";
import {Dashboard} from "../Dashboard/Dashboard";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {setSuccess} from "../../store/actions/authActions";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CompanyProfileView} from "../Profile/CompanyProfileView";
import {NotFoundDashboard} from "../Error/NotFound/NotFoundDashboard";
import {locations, locationsStartWith} from "../constants";
import {CreateQuiz} from "../QuizBank/CreateQuiz";
import {QuizTable} from "../QuizBank/QuizTable";
import {Payment} from "../Payment/Payments";
import {PostJob} from "../Job/PostJob";
import {Jobs} from "../Job/Jobs";

export function HomePage() {

    const location = useLocation();

    const { success } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(success) {
            dispatch(setSuccess(''));
        }
    }, [success, dispatch]);

    const startWith = () => {
        for(let i=0;i<locationsStartWith.length;i++){
            if(location.hash.startsWith(locationsStartWith[i])) return true;
        }
        return false;
    };

    return (
      <>
          <Header/>
          <SideBar/>
          <div className="mobile-menu-overlay"/>
          <div className="main-container">
              {
                  (location.hash === '#dashboard' || location.hash === '#' || location.hash === '') &&
                  <Dashboard/>
              }
              {
                  (location.hash === '#company/profile') &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Profile"} mainTitle={"Company Profile"} mainNav={""}/>
                      <CompanyProfileView/>
                  </div>
              }
              {
                  (location.hash === "#quiz/create" || location.hash.startsWith("#quiz/create/add-question?id=") ||
                  location.hash.startsWith("#quiz/create/delete-question?id=") ||
                      location.hash.startsWith('#quiz/create/edit-question?id=') ||
                  location.hash.startsWith('#quiz/update/question?id=') || location.hash
                          .startsWith("#quiz/view/question?id=")) &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Quiz Bank"} mainTitle={"Create Quiz"} mainNav={""}/>
                      <CreateQuiz/>
                  </div>
              }
              {
                  (location.hash === "#quiz/bank") &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Quiz Bank"} mainTitle={"Quiz Sets"} mainNav={""}/>
                      <QuizTable/>
                  </div>
              }
              {
                  (location.hash === '#payment') &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Payments"} mainTitle={"Job Payments"} mainNav={""}/>
                      <Payment/>
                  </div>
              }
              {
                  (location.hash === '#jobs/post-job') &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Job"} mainTitle={"Post Job"} mainNav={""}/>
                      <PostJob/>
                  </div>
              }
              {
                  (location.hash.startsWith('#jobs/view/job?id=')) &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Job"} mainTitle={"Post Job"} mainNav={""}/>
                      <PostJob/>
                  </div>
              }
              {
                  (location.hash === '#jobs') &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Job"} mainTitle={"Jobs"} mainNav={""}/>
                      <Jobs/>
                  </div>
              }
              {
                  location.hash === '#dashbord/not-found' &&
                      <NotFoundDashboard/>
              }
              {
                  (!locations.includes(location.hash) && !startWith()) &&
                  <NotFoundDashboard/>
              }
          </div>
          <ToastContainer/>
      </>
    );
}
