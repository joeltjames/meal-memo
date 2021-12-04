import { Action } from '@ngrx/store';

export enum ActionTypes {
    loadDataBegin = '[Data] Load data begin',
    loadDataSuccess = '[Data] Load data success',
    loadDataFailure = '[Data] Load data failure',
}

export class LoadDataBegin implements Action {
    readonly type = ActionTypes.loadDataBegin;
}

export class LoadDataSuccess implements Action {
    readonly type = ActionTypes.loadDataSuccess;

    constructor(public payload: { data: any }) {}
}

export class LoadDataFailure implements Action {
    readonly type = ActionTypes.loadDataFailure;

    constructor(public payload: { error: any }) {}
}

export type ActionsUnion = LoadDataBegin | LoadDataSuccess | LoadDataFailure;
