import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProduct, getAllProduct } from "../../redux/action/product";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import ModalDelete from "../atoms/ModalDelete";
import Pagination from "react-paginate";

const initalState = {
  page: 1,
  limit: 4,
  search: "",
  sort: "",
  order: "",
};

export default function MediaCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [dataProduct, setDataProduct] = useState(initalState);
  const [show, setShow] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [active, setActive] = useState("");
  const [allProduct, setallProduct] = useState({
    data: [],
    pagination: {},
  });
  console.log(product.pageInfo.totalPage);

  const { page, limit, search, sort, order } = dataProduct;

  useEffect(() => {
    dispatch(getAllProduct(page, limit, search, sort, order)).then((res) => {
      setallProduct({
        data: res.value.data.data,
        pagination: res.value.data.pagination,
      });
    });
  }, [dispatch, page, limit]);

  const handleDelete = () => {
    dispatch(deleteProduct(idProduct)).then((res) => {
      setShow(false);
      dispatch(getAllProduct(page, limit, search, sort, order)).then((res) => {
        setallProduct({
          data: res.value.data.data,
          pagination: res.value.data.pagination,
        });
      });
    });
  };

  const showDelete = (id) => {
    setShow(true);
    setIdProduct(id);
  };

  const editPage = (id) => {
    router.push({ pathname: `/Products`, query: { id } });
  };

  const handlePagination = (e) => {
    const selectedPage = e.selected + 1;
    setDataProduct({ ...dataProduct, page: selectedPage });
    dispatch(getAllProduct(selectedPage, limit, search, sort, order));
  };
  return (
    <>
      <Box sx={{ display: "flex", margin: "10px" }}>
        <ModalDelete
          show={show}
          msg="Delete this product ?"
          handleClose={() => setShow(false)}
          handleSubmit={handleDelete}
        />
        {allProduct.data?.map((item) => (
          <Card sx={{ width: 290, marginRight: "30px" }} key={item.id}>
            <CardMedia
              component="img"
              height="330"
              image={
                item.image
                  ? `http://localhost:3001/uploads/products/${item.image}`
                  : "https://res.cloudinary.com/mrfachri/image/upload/v1643877562/iconmonstr-user-1-240_sbprkk.png"
              }
              alt="image product"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price : Rp.{item.price},00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock : {item.stock} / Items
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description : <br />
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => editPage(item.id)}>
                edit
              </Button>
              <Button size="small" onClick={() => showDelete(item.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <div style={{ marginTop: "20px" }}>
        <Pagination
          previousLabel={false}
          nextLabel={false}
          breakLabel={"..."}
          pageCount={allProduct.pagination?.totalPage}
          onPageChange={handlePagination}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
