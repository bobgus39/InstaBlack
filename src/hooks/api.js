import useFetch from "./useFetch";
import env from "../helpers/useEnv";

export const useHome = () => useFetch(`${env}posts`);

export const useProfile = (keyword) => {
  return useFetch(`${env}posts/?keyword=${keyword}`);
};

export const usePost = (keyword) => {
  return useFetch(`${env}posts/${keyword}`);
};

export const useUserId = (userId) => useFetch(`${env}users/${userId}`);
