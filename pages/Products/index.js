import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import {
  postProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../../redux/action/product";
import { useRouter } from "next/router";
import Header from "../../components/molecules/Header";
import Footer from "../../components/molecules/Footer";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const initialState = {
  name: "",
  price: "",
  stock: "",
  description: "",
  image: null,
};

const stateParams = {
  page: 1,
  limit: 8,
  search: "",
  sort: "",
  order: "",
};

function Products() {
  const router = useRouter();
  const dispatch = useDispatch();
  const target = useRef(null);
  const [notif, setNotif] = useState({ err: "", success: "" });
  const [form, setForm] = useState(initialState);
  const [params, setParams] = useState(stateParams);
  const [image, setImage] = useState("");
  const [selectSize, setSelectSize] = useState([]);
  const [unSelected, setUnSelected] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    notif.success ? router.push("/AllProducts") : null;
  };

  useEffect(() => {
    if (router.query.id) {
      dispatch(getProductById(router.query.id))
        .then((res) => {
          const newData = {
            ...form,
            name: res.value.data.data[0].name,
            price: res.value.data.data[0].price,
            stock: res.value.data.data[0].stock,
            description: res.value.data.data[0].description,
            image: res.value.data.data[0].image,
          };

          setForm(newData);
        })
        .catch((err) => err.response.data.msg && alert(err.response.data.msg));
    }
  }, [dispatch, selectSize, unSelected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const resetForm = () => {
    setForm(initialState);
    setImage("");
    setSelectSize([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    const newData = {
      ...form,
    };

    const formData = new FormData();

    for (const data in newData) {
      formData.append(data, newData[data]);
    }

    dispatch(postProduct(formData))
      .then((res) => {
        setShow(true);
        setNotif({ ...notif, success: res.value.data.msg });

        dispatch(
          getAllProduct(
            params.page,
            params.limit,
            params.search,
            params.sort,
            params.order
          )
        );
      })
      .catch((err) => {
        err.response.data.msg &&
          setNotif({ ...notif, err: err.response.data.msg });
      });

    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setShow(true);
    const newData = {
      ...form,
    };

    const formData = new FormData();

    for (const data in newData) {
      formData.append(data, newData[data]);
    }

    dispatch(updateProduct(router.query.id, formData))
      .then((res) => {
        setShow(true);
        setNotif({ ...notif, success: res.value.data.msg });

        dispatch(
          getAllProduct(
            params.page,
            params.limit,
            params.search,
            params.sort,
            params.order
          )
        );
      })
      .catch((err) => {
        setNotif({ ...notif, err: err.response.data.msg });
      });

    resetForm();
  };

  return (
    <>
      <Header />
      <div className="container">
        {" "}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{notif.success ? "Success" : "Failed"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{notif.success ? notif.success : notif.err}</Modal.Body>
          <Modal.Footer>
            <Button
              className="modal__delete--cancel"
              variant="primary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="row">
          <div className="col-sm-3">
            <div className="product__content">
              <div className="wrapper__image">
                {form.image ? (
                  <>
                    <figure className="product">
                      <img
                        src={
                          image
                            ? image
                            : form.image
                            ? `http://localhost:3001/uploads/products/${form.image}`
                            : "https://res.cloudinary.com/mrfachri/image/upload/v1643877562/iconmonstr-user-1-240_sbprkk.png"
                        }
                        alt="product image"
                        className="rounded-circle"
                      />
                    </figure>
                  </>
                ) : (
                  <figure>
                    <img
                      src="https://res.cloudinary.com/mrfachri/image/upload/v1643877562/iconmonstr-user-1-240_sbprkk.png"
                      alt="update image"
                    />
                  </figure>
                )}

                <input
                  type="file"
                  style={{ display: "none" }}
                  name="image"
                  ref={target}
                  onChange={handleFile}
                />
              </div>

              <button
                className="btn__choose--file d-block mb-3"
                onClick={() => target.current.click()}
              >
                Choose from Gallery
              </button>
              <button
                className="btn__save d-block mb-3"
                onClick={router.query.id ? handleUpdate : handleSubmit}
              >
                {router.query.id ? "Update Product" : "Save Product"}
              </button>
              <button className="btn__cancel d-block" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </div>
          <div className="col-sm-9 product__content--form">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name Products"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Price :</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type the price"
                  name="price"
                  onChange={handleChange}
                  value={form.price}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Stock :</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Type the price"
                  name="stock"
                  onChange={handleChange}
                  value={form.stock}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description :</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  name="description"
                  maxLength="150"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;
