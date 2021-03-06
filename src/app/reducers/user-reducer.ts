import { Action } from '../actions';
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_ADD } from '../actions/user-action';
import {User} from '../user';
export interface UserReducerState{
    loading: boolean;
    loaded: boolean;
    users: User[];
}
const initialState: UserReducerState = {
    loading: false,
    loaded: false,
    users: []
}
export function UserReducer(state = initialState, action: Action): UserReducerState {
    switch (action.type) {
      case USER_LIST_REQUEST: {
        return {...state, loading: true};
      }
    //   case USER_DELETE: {
    //     const id = action.payload.id;
    //     const newIds = state.ids.filter(elem => elem !== id);
    //     const newEntities = StoreUtility.removeKey(state.entities, id);
    //     return {...state, ...{entities: newEntities, ids: newIds}};
    //   }
    //   case USER_UPDATE: {
    //     const user = action.payload.data;
    //     const entity = {[user.id]: user};
    //     const updatedEntities = {...state.entities, ...entity};
    //     return {...state, ...{entities: updatedEntities}};
    //   }
      case USER_ADD: {
        const users = state.users.concat(action.payload.data);
        return {...state, ...{users}};
      }
    //   case USER_LIST_ERROR: {
    //     return {...state, error: true, loading: false};
    //   }
      case USER_LIST_SUCCESS: {
        // const updateUsers = state.users.concat(action.payload.data);
        const updateUsers = action.payload.data;
        return {...state, loading: false, loaded: true, users: updateUsers };
      }
      default: {
        return state;
      }
    }
  }


export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getUsers = (state: UserReducerState) => state.users;