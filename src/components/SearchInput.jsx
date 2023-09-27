import { useState, useEffect } from "react";
import { useProfile } from "../hooks/api";
import { useNavigate } from "react-router-dom";
import { input, ul, liPhotos, img, main } from "./SearchInput.module.css";
import Button from "react-bootstrap/Button";

import PostModal from "./PostModal";

function SearchInput() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [keyword, setKeyword] = useState("");
  const { data: userPosts, reload } = useProfile(keyword);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false); // Estado para controlar la vista móvil

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < prevScrollY;
      if (isScrollingUp) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
      prevScrollY = currentScrollY;
    };
    // Agrega el event listener para manejar el cambio de tamaño de la ventana
    window.addEventListener("scroll", handleScroll);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setKeyword(e);
    // Navegar a la página de perfil utilizando la keyword
    navigate(`/profile/${e}`);
  };

  return (
    <div className={main}>
      {showSearch && (
        <>
          <input
            className={input}
            type="text"
            placeholder="Username del usuario que quieres encontrar"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="secondary" onClick={() => handleSearch(keyword)}>
            Buscar
          </Button>
          {userPosts && userPosts.status !== "error" && keyword ? (
            <>
              <ul className={ul}>
                {userPosts.data.map((user) => (
                  <li key={user.id}>
                    <Button
                      variant="light"
                      onClick={() => handleSearch(user.username)}
                    >
                      {user.username}
                    </Button>
                  </li>
                ))}
                {userPosts.data.map((user) => (
                  <li className={liPhotos} key={user.id}>
                    <Button variant="dark" onClick={() => openModal(user)}>
                      {user.description}
                    </Button>
                    <img
                      className={img}
                      src={`http://localhost:4000/${user.photo}`}
                      alt={`Imagen de ${user.username}`}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : !keyword ? (
            "¿A quién quieres encontrar?"
          ) : (
            <p>{userPosts.message}</p>
          )}
          <label onClick={() => setShowSearch(false)}>Ocultar x</label>
        </>
      )}

      <PostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        post={selectedPost}
      />
    </div>
  );
}

export default SearchInput;
