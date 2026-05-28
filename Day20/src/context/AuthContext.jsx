import {

  createContext,

  useReducer,

  useEffect

} from "react";


export const AuthContext =
  createContext();


const initialState = {

  user: null

};


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


function AuthProvider({

  children

}) {

  const [state, dispatch] =
    useReducer(

      authReducer,

      initialState

    );


  useEffect(() => {

    const savedUser =

      localStorage.getItem(
        "user"
      );


    if (savedUser) {

      dispatch({

        type:
          "RESTORE_SESSION",

        payload:
          JSON.parse(savedUser)

      });

    }

  }, []);


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