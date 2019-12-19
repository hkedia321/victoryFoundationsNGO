const initialState = {
  modalId: null
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        modalId: action.modalId,
      };
    case 'HIDE_MODAL':
      return initialState;
    default:
      return {...state}
  }
};

export default modalReducer;
