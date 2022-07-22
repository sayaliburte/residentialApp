export const ADD_VISITOR = "ADD_VISITOR";
export const FETCH_VISITORS = "FETCH_VISITORS";
export const DELETE_VISITOR = "DELETE_VISITOR";
export const ACCEPT_VISITOR = "ACCEPT_VISITOR";
export const DECLINE_VISITOR = "DECLINE_VISITOR";

export const decline_Visitor = (key, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/visitors/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: DECLINE_VISITOR,
        data,
        key: key,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const accept_Visitor = (key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/visitors/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Accepted",
            acceptedDate: new Date(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: ACCEPT_VISITOR,
        data: {
          status: "Accepted",
        },
        key: key,
      });
    } catch (err) {
      throw err;
    }
  };
};

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
    } catch (err) {
      throw err;
    }
  };
};

export const fetch_visitors = () => {
  return async (dispatch, getState) => {
    //const token = getState().auth.token;

    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/visitors.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedVisitorsData = [];
      for (const key in resData) {
        loadedVisitorsData.push({
          key,
          ...resData[key],
        });
      }

      dispatch({
        type: FETCH_VISITORS,
        visitors: loadedVisitorsData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const delete_visitor = (key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/visitors/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Cancelled by Watchman",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: DELETE_VISITOR,
        data: { status: "Cancelled by Watchman" },
        key: key,
      });
    } catch (err) {
      throw err;
    }
  };
};
