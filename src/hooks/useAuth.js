import React from "react";
import axios from "axios";
import { createAction } from "../utils/createAction";

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: { ...action.payload },
          };
        case "REMOVE_USER":
          return {
            ...state,
            user: undefined,
          };
        case "SET_LOADING":
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    }
  );
  const auth = React.useMemo(
    () => ({
      login: async (token) => {
        const { data } = await axios.post(
          `http://localhost:3000/api/v1/admin-authenticate`,
          {
            token,
          }
        );

        console.log(data.data.token);
        const user = {
          token: data.data.token,
          user: data.data.user,
        };
        localStorage.setItem("userPrinter", JSON.stringify(user));
        dispatch(createAction("SET_USER", user));
      },
      logout: async () => {
        localStorage.removeItem("userPrinter");
        dispatch(createAction("REMOVE_USER"));
      },
    }),
    []
  );
  React.useEffect(() => {
    const user = localStorage.getItem("userPrinter");

    if (!user) {
      var urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code != null) {
        const code = window.location.search.split("=")[1];

        axios
          .post(`https://itc.gymkhana.iitb.ac.in/printing-api/auth/`, { code })
          .then((res) => {
            localStorage.setItem("userPrinter", res.data.token);
            window.location.href = "https://itc.gymkhana.iitb.ac.in/printer/";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    axios
      .post("https://itc.gymkhana.iitb.ac.in/printing-api/valid/", {
        token: user,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          dispatch(createAction("SET_USER", { user }));
          dispatch(createAction("SET_LOADING", false));
        } else {
          dispatch(createAction("REMOVE_USER"));
          dispatch(createAction("SET_LOADING", false));
          localStorage.removeItem("userPrinter");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(createAction("SET_LOADING", false));
  }, []);
  return { auth, state };
}
