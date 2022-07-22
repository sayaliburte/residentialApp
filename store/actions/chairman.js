const ADD_MEMBER = "ADD_MEMBER";
const add_member = (key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-residential-app-default-rtdb.firebaseio.com/communications.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!!");
    }
    const resData = await response.json();
    dispatch({
      type: ADD_COMMUNICATION,
      communicationData: {
        key: resData.name,
        ...data,
      },
    });
  };
};
