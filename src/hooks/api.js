import useFetch from "./useFetch";

export const useHome = () => useFetch("http://localhost:4000/posts/home");

export const useSearchUser = (keyword) =>
  useFetch(`http://localhost:4000/posts/home?keyword=${keyword}`);
