import { Link } from "react-router-dom";

const Card = ({ post }) => {
  const { title, _id, image } = post;

  return (
    <div className="card">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <Link to={`/post/${_id}`} className="btn btn-primary mt-3">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default Card;
