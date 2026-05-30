import {

  createContext,

  useReducer,

  useEffect

} from "react";


export const AuthContext =
  createContext();


const initialState = {

  user: (() => {

    const savedUser =

      localStorage.getItem(
        "user"
      );

    return savedUser

      ? JSON.parse(
          savedUser
        )

      : null;

  })(),

  loading: true

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

        user: action.payload,

        loading: false

      };


    case "FINISH_LOADING":

      return {

        ...state,

        loading: false

      };


    default:

      return state;

  }

}


function AuthProvider({

  children

}) {

  const [

    state,

    dispatch

  ] = useReducer(

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
          JSON.parse(
            savedUser
          )

      });

    } else {

      dispatch({

        type:
          "FINISH_LOADING"

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

        user:
          state.user,

        loading:
          state.loading,

        dispatch

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}

export default AuthProvider;