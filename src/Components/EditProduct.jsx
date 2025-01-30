import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { singleProduct, singleProductAsync, updateProduct, updateProductAsync } from "../services/actions/product.Action";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector(state => state.productReducer)
  const [productInput, setProductInput] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    description: "",
  });
  
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "* Title is required";
        break;
      case "price":
        if (!value) {
          error = "* Price is required";
        } else if (isNaN(value)) {
          error = "* Price must be a valid number";
        } else if (parseFloat(value) <= 0) {
          error = "* Price must be greater than zero";
        }
         
        break;
      case "category":
        if (!value) error = "*category  is required";
        break;
      case "description":
        if (!value) {
          error = "* Description is required";
        } else if (value.length < 20) {
          error = "* Description must be at least 20 characters long";
        }
        break;
        case "img":
          if (!value) error = "* Image URL is required";
          break;
      default:
        break;
    }
    return error;
  };
  const handelChanged = (e) => {
    const { name, value } = e.target;
    setProductInput({
      ...productInput,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("Submit now", productInput);
    const newErrors = {};
    Object.keys(productInput).forEach((field) => {
      const error = validateField(field, productInput[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    const imgError = validateField('img');
    if (imgError) {
      newErrors.img = imgError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(updateProductAsync(productInput));
  };

  useEffect(() => {
    dispatch(singleProductAsync(id));
  }, [])
  useEffect(() => {
    if (product)
      setProductInput(product);
  }, [product])

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated])
  return (
    <>
      <Container>
        <Form onSubmit={handelSubmit}>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Product Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={productInput.name}
                onChange={handelChanged}
              />
            </Col>
            {errors.name && <i style={{ color: "red" }}>{errors.name}</i>}
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              product Category
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter Category"
                name="category"
                value={productInput.category}
                onChange={handelChanged}
              />
            </Col>
            {errors.category && <i style={{ color: "red" }}>{errors.category}</i>}
          </Form.Group>


          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Product Description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="description"
                value={productInput.description}
                onChange={handelChanged}
              />
            </Col>
            {errors.description && <i style={{ color: "red" }}>{errors.description}</i>}
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Product Price
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={productInput.price}
                onChange={handelChanged}
              />
            </Col>
            {errors.price && <i style={{ color: "red" }}>{errors.price}</i>}
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2"></Form.Label>
            <Col sm="10">
              <button type="submit" className="button-86" style={{ marginLeft: "35%" }}>Update product</button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default EditProduct;