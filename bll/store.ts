import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {appReducer} from "./appReducer";
import {AppActionsType} from "./appActions";
import {CompassActionsType} from "../features/compass/bll/compassActions";
import {compassReducer} from "../features/compass/bll/compassReducer";

const rootReducer = combineReducers({
  app: appReducer,
  compass: compassReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = AppActionsType | CompassActionsType

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>
