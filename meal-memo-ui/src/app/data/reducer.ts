import { ActionsUnion, ActionTypes } from './actions';

export interface DataState {
    items: string[];
    loading: boolean;
    error: any;
}

export const initialState: DataState = {
    items: [],
    loading: false,
    error: null,
};

export const reducer: (state: DataState, action: ActionsUnion) => DataState = (
    state = initialState,
    action: ActionsUnion
) => {
    switch (action.type) {
        case ActionTypes.loadDataBegin: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }

        case ActionTypes.loadDataSuccess: {
            return {
                ...state,
                loading: false,
                items: action.payload.data,
            };
        }

        case ActionTypes.loadDataFailure: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }

        default: {
            return state;
        }
    }
};

export const getItems = (state: DataState) => state.items;
