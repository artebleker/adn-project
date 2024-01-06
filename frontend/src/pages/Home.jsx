import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import PostCardContainer from "../components/PostCardContainer";

const dataTest = [
  {
    id: 1,
    titulo: "Titulo 1",
    descripcion: "Descripcion",
    imagen:
      "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/EKX6EPEW35BDPGRE7GKHMRY6K4.png",
    comentarios: [{ contenido: "Comentario 1" }, { contenido: "Comentario 2" }],
  },
  {
    id: 2,
    titulo: "Titulo 2",
    descripcion: "Descripcion",
    imagen:
      "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/EKX6EPEW35BDPGRE7GKHMRY6K4.png",
    comentarios: [{ contenido: "Comentario 1" }, { contenido: "Comentario 2" }],
  },
];

const Home = () => {
  const token = localStorage.getItem("login");
  const [allPost, setAllPost] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/publicaciones");
      if (response.ok) {
        const data = await response.json();
        setAllPost(data);
      } else {
        console.error("Error al obtener datos desde la base de datos");
      }
    } catch (error) {
      setAllPost(dataTest);
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
