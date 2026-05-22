import {
  createContext,
  useReducer,
  useEffect
} from "react";


export const AuthContext =
  createContext();


/*
=====================================
INITIAL STATE
=====================================
*/

const initialState = {

  user: null

};


/*
=====================================
REDUCER
=====================================
*/

function authReducer(
  state,
  action
) {

  switch (action.type) {

    case "LOGIN":

      return {

        ...state,

        user: action.payload

      };


    case "LOGOUT":

      return {

        ...state,

        user: null

      };


    case "RESTORE_SESSION":

      return {

        ...state,

        user: action.payload

      };


    default:

      return state;
  }
}


/*
=====================================
PROVIDER
=====================================
*/

function AuthProvider({
  children
}) {

  const [state, dispatch] =
    useReducer(
      authReducer,
      initialState
    );


  /*
  =====================================
  RESTORE SESSION ON PAGE REFRESH
  =====================================
  */

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "user"
      );


    if (savedUser) {

      dispatch({

        type: "RESTORE_SESSION",

        payload: JSON.parse(
          savedUser
        )

      });
    }

  }, []);


  /*
  =====================================
  SAVE USER TO LOCALSTORAGE
  =====================================
  */

  useEffect(() => {

    if (state.user) {

      localStorage.setItem(

        "user",

        JSON.stringify(
          state.user
        )

      );

    } else {

      localStorage.removeItem(
        "user"
      );
    }

  }, [state.user]);


  return (

    <AuthContext.Provider

      value={{

        user: state.user,

        dispatch

      }}

    >

      {children}

    </AuthContext.Provider>

  );
}

export default AuthProvider;