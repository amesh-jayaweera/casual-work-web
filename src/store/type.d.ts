import {SET_ERROR, SET_LOADING, SET_SUCCESS, SET_USER, SIGN_OUT} from "./store/actionTypes";

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
    createdDateTime: any;
}

export interface IQuizStore {
    title: string;
    companyId: string;
    questions: IQuestion[];
    createdDateTime: any;
}



