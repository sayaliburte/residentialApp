export const ADD_VISITOR = "ADD_VISITOR";
export const add_visitor = (data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
    const response = await fetch(
      `https://rn-residential-app-default-rtdb.firebaseio.com/visitors.json?auth=${token}`,
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
      type: ADD_VISITOR,
      visitorData: {
        key: resData.name,
        ...data,
      },
    });
}catch(err){
    throw err;
}
  };
};
