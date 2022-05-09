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
import { Offline, Online } from 'react-detect-offline';
import {CreateQuiz} from "../QuizBank/CreateQuiz";

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
              <Online>
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
                      location.hash.startsWith('#quiz/create/edit-question?id=')) &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Quiz Bank"} mainTitle={"Create Quiz"} mainNav={""}/>
                      <CreateQuiz/>
                  </div>
              }
              {
                  (location.hash === "#quiz/bank") &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Quiz Bank"} mainTitle={"Quiz Sets"} mainNav={""}/>
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
              </Online>
              <Offline>
                  <div className="pd-ltr-20">
                      <div className="row">
                          <div className="col-xl-12 mb-30">
                              <div className="card-box height-100-p pd-20">
                                  <div
                                      className="error-page d-flex align-items-center flex-wrap justify-content-center pd-20">
                                      <div className="pd-10">
                                          <div className="error-page-wrap text-center">
                                              <h1>Oops!</h1>
                                              <h3>Error: No internet Found</h3>
                                              <p>
                                                  No internet connection found
                                                  <br />
                                                  Check your connection.
                                              </p>
                                              <div className="pt-20 mx-auto max-width-200">
                                                  <a href={"/"} className="btn btn-primary btn-lg"
                                                  >Try Again</a >
                                              </div>
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Offline>
          </div>
          <ToastContainer/>
      </>
    );
}
