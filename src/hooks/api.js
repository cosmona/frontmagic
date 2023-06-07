import useApi from "./useApi";
import useFetch from "fetch-suspense";

let host = "http://localhost:";

const newData = JSON.parse(
  localStorage.getItem("redux_localstorage_simple_user")
);

let token = "";
if (newData !== undefined && newData !== null && newData.data) {
  token = newData.data.token;
}

export const useQuestions = (filter) =>
  useApi(host + process.env.REACT_APP_PORT + "/questions/", "GET", filter);

export const useUsers = () =>
  useApi(host + process.env.REACT_APP_PORT + "/users/", "GET");

export const useUser = (id) =>
  useApi(host + process.env.REACT_APP_PORT + "/users/" + id, "GET");

export const useAnswers = (id) =>
  useApi(host + process.env.REACT_APP_PORT + "/answers/" + id, "GET");

export const useNewQuestion = () =>
  useApi(host + process.env.REACT_APP_PORT + "/question/", "POST");

export const useNewAnswer = (data) =>
  useFetch("http://localhost:" + process.env.REACT_APP_PORT + "/answers/", {
    method: "POST",
    headers: { Authorization: token },
    body: JSON.stringify({
      data,
    }),
  });

export const useMyAnswers = (user_id) =>
  useApi(
    "http://localhost:" + process.env.REACT_APP_PORT + "/myanswers/" + user_id,
    "GET"
  );

export const useMyAnswer = (answer_id) =>
  useApi(
    "http://localhost:" +
      process.env.REACT_APP_PORT +
      "/myanswers/" +
      answer_id,
    "GET"
  );

export const useMyQuestions = (user_id) =>
  useApi(
    "http://localhost:" +
      process.env.REACT_APP_PORT +
      "/questions/?User_ID=" +
      user_id,
    "GET"
  );

export const useMyQuestion = (question_id) =>
  useApi(
    "http://localhost:" +
      process.env.REACT_APP_PORT +
      "/questions/" +
      question_id,
    "GET"
  );
