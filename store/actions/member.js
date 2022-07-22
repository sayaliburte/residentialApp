export const ADD_MEMBERS = "ADD_MEMBERS";
export const FETCH_MEMBERS = "FETCH_MEMBERS";
export const UPDATE_MEMBERS = "UPDATE_MEMBERS";
export const UPDATE_HOMESTATUS = "UPDATE_HOMESTATUS";
export const VALIDATE_MEMBER = "VALIDATE_MEMBER";
export const LOGOUT = "LOGOUT";
export const DELETE_MEMBER = "DELETE_MEMBER";
export const update_homeStatus = (data, key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/members/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: UPDATE_HOMESTATUS,
        data: data,
        key,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const update_members = (data, key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const memberData = getState().member.members;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/members/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      // console.log("In actions",memberData);
      //const indexOfMemberToBeChanged=memberData.indexOf(member=>member.key===key)
      const index = memberData.findIndex((member) => {
        return member.key === key;
      });
      //console.log("In index", index);
      const resData = await response.json();
      //  console.log("res", resData);
      dispatch({
        type: UPDATE_MEMBERS,
        data: data,
        index,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const add_members = (data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://rn-residential-app-default-rtdb.firebaseio.com/members.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ...data,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!!");
    }
    const resData = await response.json();

    dispatch({
      type: ADD_MEMBERS,
      memberData: {
        key: resData.name,
        ...data,
        userId: userId,
      },
    });
  };
};

export const fetch_members = () => {
  return async (dispatch, getState) => {
    //const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/members.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedMembersData = [];
      for (const key in resData) {
        loadedMembersData.push({
          key,
          ...resData[key],
        });
      }
      const loggedInUser = loadedMembersData.find(
        (user) => user.userId === userId
      );

      dispatch({
        type: FETCH_MEMBERS,
        members: loadedMembersData,
        loggedInUser,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const clearLoggedInUser = () => {
  return {
    type: LOGOUT,
  };
};

export const validate_member = (key) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/members/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberValidity: "Accepted",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: VALIDATE_MEMBER,
        data: { memberValidity: "Accepted" },
        key,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const delete_member = (key) => {

  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-residential-app-default-rtdb.firebaseio.com/members/${key}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberValidity: "Decline",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      dispatch({
        type: DELETE_MEMBER,
        data: { memberValidity: "Decline" },
        key,
      });
    } catch (err) {
      throw err;
    }
  };
};
