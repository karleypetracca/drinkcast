const Reducer = (state, action) => {
  const {
    sessionId, token, barName, userName,
  } = action;
  switch (action.type) {
    case 'ACTION_SET_SESSION':
      return {
        ...state,
        sessionId,
      };
    case 'ACTION_SET_USERNAME':
      return {
        ...state,
        userName,
      };
    case 'ACTION_SET_BARNAME':
      return {
        ...state,
        barName,
      };
    case 'ACTION_SET_TOKEN':
      return {
        ...state,
        token,
      };
    case 'ACTION_CREATE_BAR':
      return {
        ...state,
        token,
        sessionId,
      };
    case 'ACTION_JOIN_BAR':
      return {
        ...state,
        token,
        sessionId,
      };
    default:
      return state;
  }
};

export default Reducer;
