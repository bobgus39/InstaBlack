import useFetch from "./useFetch";

export const useHome = () => useFetch("http://localhost:4000/posts");

export const useSearchUser = (keyword) =>
  useFetch(`http://localhost:4000/posts/?keyword=${keyword}`);

export const useProfile = () =>
  useFetch(
    `http://localhost:4000/posts/?keyword=${JSON.parse(
      localStorage.getItem("Usuario")
    )}`
  );


