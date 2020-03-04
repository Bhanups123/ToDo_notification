export default decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};
