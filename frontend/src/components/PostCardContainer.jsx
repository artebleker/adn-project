import PostCard from "./PostCard";

const PostCardContainer = ({ allPost }) => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {allPost.map((post, index) => (
          <div key={index} className="col mb-4">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCardContainer;
