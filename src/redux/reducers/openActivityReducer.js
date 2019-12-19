const initialState = {
    activity: null,
    current: null
};

const openActivityReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'ADD_OPEN_ACTIVITY':
          return Object.assign({}, state, { ...action.data });
      case 'ADD_CURRENT_ACTIVITY':
          return Object.assign({}, state, { current : action.data });
      default:
      return {...state}
  }
};

export default openActivityReducer;

