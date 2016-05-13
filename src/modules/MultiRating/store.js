import { createStore } from 'redux'
import identify from '../global/services/stringHash'

export default createStore(function (state, action) {
  switch (action.type) {

    case 'SET_ASPECTS':
      return { 
        ...state,
        index: 0,
        aspects: action.aspects,
        rated: action.aspects.map(() => false)
      }

    case 'CHANGE_RATING':
      state.aspects[state.index].rating = Number(action.rating)
      return {
        ...state,
        response: {
          ...state.response,
          [`rating_${state.aspects[state.index].code}`]: Number(action.rating),
          [`rating_${state.aspects[state.index].code}_t`]: Date.now()
        }
      }
    
    case 'CONFIRM_RATING':
      state.rated[state.index] = true
      if (!state.rated.reduce((a, b) => a && b, true)) {
        return {
          ...state,
          response: {
            ...state.response,
            [`rating_${state.aspects[state.index].code}_confirmed`]: Date.now()
          },
          index: state.aspects
            .filter((a, i) => !state.rated[i])[0].index
        }
      } else {
        return {
          ...state,
          response: {
            ...state.response,
            [`rating_${state.aspects[state.index].code}_confirmed`]: Date.now()
          },
          index: -1
        }
      }

    case 'EDIT_RATING':
      state.rated[action.index] = false
      return {
        ...state,
        response: {
          ...state.response,
          [`rating_${state.aspects[state.index].code}_edit`]: Date.now()
        },
        index: action.index
      }
    
    default:
      return {
        aspects: [{
          text: null,
          rating: null,
          index: 0
        }],
        rated: [],
        response: {},
        index: 0
      }
  }
})