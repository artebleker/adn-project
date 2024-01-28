import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import PostCardContainer from "../components/PostCardContainer.jsx";
import NewPost from "../components/NewPost.jsx";

const Home = () => {
  const [allPost, setAllPost] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/publicaciones");
      // const response = await fetch("127.0.0.1:5000/publicaciones");
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setAllPost(data.reverse());
      } else {
        console.error("Error al obtener datos desde la base de datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return (window.location.href = "/login");
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        {allPost ? (
          <>
            <NewPost />
            <PostCardContainer allPost={allPost} />
          </>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
