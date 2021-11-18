import { createReducer } from '@ngrx/store';
import { User } from '../user';

const initialRecipeState: User | null = null;

const internalUserReducer = createReducer(initialRecipeState);

export const userReducer = (state: any, action: any) =>
    internalUserReducer(state, action);
