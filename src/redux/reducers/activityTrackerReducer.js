const initialState = {
    activeStep: 0,
    checkIn:{},
    sessionPlanned:{},
    sessionAS:{},
    practiceMatch: {},
    diet:{},
    props:{},
    groundMarking:{},
    attendance:{},
    checkOut:{}
};

const activityTrackerReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'INCREASE_STEP':
          return Object.assign({}, state, { activeStep: state.activeStep+1 });
      case 'DECREASE_STEP':
          return Object.assign({}, state, { activeStep: state.activeStep-1 });
      case 'CHECK_IN':
          return Object.assign({}, state, { checkIn: action.data });
      case 'UPDATE_ACTIVITY_ID':
          return Object.assign({}, state, { activityId: action.data,  checkIn: {...state.checkIn, completed: true}});
      case 'SESSION_PLANNED':
          let sp_data = action.data;
          return Object.assign({}, state, { sessionPlanned: {...state.sessionPlanned, ...sp_data }});
      case 'SESSION_AS':
          let sas_data = action.data;
          return Object.assign({}, state, { sessionAS: {...state.sessionAS, ...sas_data }});
      case 'PRACTICE_MATCH':
          let pm_data = action.data;
          return Object.assign({}, state, { practiceMatch: {...state.practiceMatch, ...pm_data }});
      case 'DIET':
          let d_data = action.data;
          return Object.assign({}, state, { diet: {...state.diet, ...d_data }});
      case 'PROPS':
          let p_data = action.data;
          return Object.assign({}, state, { props: {...state.props, ...p_data }});
      case 'GROUND_MARKING':
          let gm_data = action.data;
          return Object.assign({}, state, { groundMarking: {...state.groundMarking, ...gm_data }});
          default:
              return {...state};
      return state
  }
};

export default activityTrackerReducer;
