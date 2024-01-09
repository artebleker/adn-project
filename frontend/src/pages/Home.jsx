import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PostCardContainer from "../components/PostCardContainer";

const Home = () => {
  const token = localStorage.getItem("login");
  const [allPost, setAllPost] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/publicaciones");
      // const response = await fetch("127.0.0.1:5000/publicaciones");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAllPost(data);
      } else {
        console.error("Error al obtener datos desde la base de datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    if (token === "TRUE") {
      fetchData();
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
  }, []);

  return (
    <Layout>
      <div>
        {allPost.length > 0 ? (
          <PostCardContainer allPost={allPost} />
        ) : (
          <p>Loading . . .</p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
