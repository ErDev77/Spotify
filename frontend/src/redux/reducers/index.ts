import { combineReducers } from 'redux'
import { languageReducer } from '../reducers/Language.Reducer'

const rootReducer = combineReducers({
	language: languageReducer,
})

export default rootReducer
