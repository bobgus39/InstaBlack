import useFetch from "./useFetch";

export const useHome = () => {
  const data = useFetch("http://localhost:4000/posts/home");

  return data;
};

// ...

export const useNewPost = async (description, photo) => {
  try {
    const token = localStorage.getItem("token"); // Obtiene el token del estado local

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    const res = await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      const newPost = await res.json();
      return newPost;
    } else {
      throw new Error("Error al subir el post");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
