import useFetch from "./useFetch";

export const useHome = () => useFetch("http://localhost:4000/posts");

export const useProfile = (keyword) => {
  return useFetch(`http://localhost:4000/posts/?keyword=${keyword}`);
};

export const usePost = (keyword) => {
  return useFetch(`http://localhost:4000/posts/${keyword}`);
};
