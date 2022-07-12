export const ADD_COMMUNICATION = "ADD_COMMUNICATION";
export const FETCH_COMMUNICATION = "FETCH_COMMUNICATION";
export const DELETE_COMMUNICATION = "DELETE_COMMUNICATION";
export const ADD_COMMENTS = "ADD_COMMENTS";
export const ADD_LIKE = "ADD_LIKE";
export const add_Like = (likeArray, key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/communications/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            like: likeArray,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }
      dispatch({
        type: ADD_LIKE,
        like: likeArray,
        key: key,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const add_communication = (data) => {
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

export const fetch_communications = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/communications.json?auth=${token}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedCommunicationsData = [];
      for (const key in resData) {
        loadedCommunicationsData.push({
          key,
          ...resData[key],
        });
      }

      dispatch({
        type: FETCH_COMMUNICATION,
        communicationData: loadedCommunicationsData,
      });
    } catch (err) {
      throw error;
    }
  };
};

export const delete_communication = (key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/communications/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: false,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: DELETE_COMMUNICATION,
        data: { active: false },
        key: key,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const add_comments = (comments, key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/communications/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comments: comments,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: ADD_COMMENTS,
        comments: comments,
        key: key,
      });
    } catch (err) {
      throw err;
    }
  };
};
