import useFetch from "./useFetch";
import env from "./useEnv";

export const useHome = () => useFetch(`${env}posts`);

export const useProfile = (keyword) => {
  return useFetch(`${env}posts/?keyword=${keyword}`);
};

export const usePost = (keyword) => {
  return useFetch(`${env}posts/${keyword}`);
};

//meter .env para pasart PORT HOST
