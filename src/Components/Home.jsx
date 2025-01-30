import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, getAllProducts, getAllProductsAsync } from "../services/actions/product.Action";
import { useNavigate } from "react-router";
import { Button, Card, Col } from "react-bootstrap";

function Home() {
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);
  return (
    <div>
      {isLoading ? <h2>Loading....</h2> : products.length == 0 ? (
        <h4>Product Not Found</h4>
      ) : (

        <>
          <div className="d-flex">
            {products.map((product) => (
             <Col key={product.id} className="mb-4">
             <Card style={{ width: '18rem', borderRadius: '15px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }} className="p-3">
               <Card.Img 
                 variant="top" 
                 src={product.image} 
                 style={{ width: "100%", height: "260px", objectFit: 'cover', borderRadius: '10px' }} 
               />
               <Card.Body className="d-flex flex-column align-items-start">
                 <span className="fs-5">{product.category}</span>
                 
                 <h5 className="fw-bold">{product.name}</h5>
                 <p className="text-muted">Price: <strong>${product.price}</strong></p>
                 <p className="small text-secondary">{product.description}</p>
                 <div className="mt-2 d-flex gap-2">
                   <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(product.id)}>
                     ✏️ Edit
                   </button>
                   <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(product.id)}>
                     🗑️ Delete
                   </button>
                 </div>
               </Card.Body>
             </Card>
           </Col>
           
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
