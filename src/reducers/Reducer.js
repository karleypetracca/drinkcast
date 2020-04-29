const Reducer = (state, action) => {
  const { sessionId, token, barName, userName, key } = action;
  switch (action.type) {
    case 'ACTION_EXIT_BAR':
      return {
        token,
        sessionId,
        key,
        barName,
        userName,
      };
    case 'ACTION_CREATE_BAR':
      return {
        ...state,
        token,
        sessionId,
        key,
        barName,
        userName,
      };
    case 'ACTION_JOIN_BAR':
      return {
        ...state,
        token,
        sessionId,
        key,
        barName,
        userName,
      };
    default:
      return state;
  }
};

export default Reducer;
