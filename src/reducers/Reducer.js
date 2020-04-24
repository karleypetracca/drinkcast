const Reducer = (state, action) => {
  const {
    sessionId, token, barName, userName, key,
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
    case 'ACTION_SET_KEY':
      return {
        ...state,
        key,
      };
    case 'ACTION_CREATE_BAR':
      return {
        ...state,
        token,
        sessionId,
        key,
        barName,
      };
    case 'ACTION_JOIN_BAR':
      return {
        ...state,
        token,
        sessionId,
        key,
      };
    default:
      return state;
  }
};

export default Reducer;
