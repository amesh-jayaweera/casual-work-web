import {SET_ERROR, SET_LOADING, SET_SUCCESS, SET_USER, SIGN_OUT} from "./actionTypes";

// Auth Models
export interface LoggedUser {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
    logoUrl?: string;
}

export interface AuthState {
    user: LoggedUser;
    authenticated: boolean;
    loading: boolean;
    error: string;
    success: string;
}

export interface SignInData {
    email: string;
    password: string;
}

// Auth Actions
interface SetUserAction {
    type: typeof SET_USER;
    payload: LoggedUser;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
    payload? : string | undefined;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | SetSuccessAction;

// Menu Action & State
type MenuAction = {
    type: string;
}

export interface MenuState {
    type: string;
}

export interface ICompany {
    uid?: string;
    name: string;
    email: string;
    contactNumber: string;
    address: string;
    logoUrl?: string;
}

export interface ICompanyProfileUpdate {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
}

type UserIDsAction = {
    type : string;
    ids : any[];
}

type CrudAction = {
    progress?: number;
    type : string;
    message? : string;
    error? : string;
}

export interface CrudState {
    processing: boolean;
    progress?: number;
    type : string;
    message? : string;
    error? : string;
}

export interface IQuestion {
    question: string;
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    correctOption: number;
}

export interface IQuiz {
    title: string;
    companyId: string;
    questions: Map<string, IQuestion>;
    totalTime: number;
}

export interface IQuizStore {
    title: string;
    companyId: string;
    questions: IQuestion[];
    totalTime: number;
}

type TableActions = {
    type : string;
    data : any[];
    unsubscribed? : any;
}

export interface QuizListTable {
    id: number;
    companyId: string;
    title: string;
    numberOfQuestions: number;
    questions: IQuestion[];
    totalTime: number;
    action : any;
    docId: string;
}

export interface TableState  {
    loading : boolean;
    data : any[];
    unsubscribed? : any;
}

export interface IJob {
    field: string;
    title: string;
    description: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
    date: string;
    shift: {
        on: string;
        off: string;
    };
    hourlyRate: number;
    totalEstimatedCost: number;
    status: string;
    companyId: string;
    skillTestId?: string;
}

export interface IJobTable {
    id: number;
    field: string;
    title: string;
    description: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
    date: string;
    shift: {
        on: string;
        off: string;
    };
    hourlyRate: number;
    totalEstimatedCost: number;
    status: string;
    companyId: string;
    skillTestId?: string;
    action: any;
    shiftOn: string;
    shiftOff: string;
    statusView: any;
    locationView: any;
}

export interface IPaymentHistoryTable {
    fullName: string;
    accountNo: number;
    amount: number;
    bankName: string;
    branch: string;
    dateTime: any;
    jobId: string;
    userId: string;
    date: string;
    time: string;
    status: any;
}

type APPLIED = "APPLIED";
type CONFIRMED = "CONFIRMED";
type DECLINED = "DECLINED";
type ACTIVE = "ACTIVE";
type REQUESTED_PAYMENT = "REQUESTED_PAYMENT";
type PAYMENT_COMPLETED = "PAYMENT_COMPLETED";

export type APPLICANT_STATUS = APPLIED | CONFIRMED | DECLINED | ACTIVE | REQUESTED_PAYMENT | PAYMENT_COMPLETED;

export interface IApplicant {
    id: number;
    applicantId: string;
    dob: string;
    fullName: string;
    gender: string;
    jobID: string;
    phoneNumber: string;
    status: APPLICANT_STATUS;
    testScore: number;
}
