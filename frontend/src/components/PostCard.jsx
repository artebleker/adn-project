import { Link } from "react-router-dom";

const Card = ({ post }) => {
  const { titulo, id, imagen } = post;

  return (
    <div className="card">
      <img src={imagen} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <Link to={`/post/${id}`} className="btn btn-primary mt-3">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default Card;
