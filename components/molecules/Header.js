import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Form, FormControl, Button } from "react-bootstrap";
// ===
import { useRouter } from "next/router";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "redux/action/product";
import SearchProducts from "../atoms/Search";

const initialState = {
  page: 1,
  limit: 20,
  category: "",
  search: "",
  sort: "",
  order: "",
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function Header() {
  const Home = () => {
    router.push("/");
  };
  const Product = () => {
    router.push("/AllProducts");
  };
  const addNewProduct = () => {
    router.push("/Products");
  };
  // ==

  const refSearch = useRef(null);
  const refResult = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [scroll, setScroll] = useState(-1);

  const [dataProduct, setDataProduct] = useState([]);
  const [params, setParams] = useState(initialState);

  const handleShow = () => setVisible(true);
  const handleHide = () => setVisible(false);

  const handleClickOutside = (e) => {
    if (refSearch.current && !refSearch.current.contains(e.target)) {
      handleHide();
    }
  };

  const editPage = (id) => {
    router.push({ pathname: `/Products`, query: { id } });
  };

  useEffect(() => {
    dispatch(
      getAllProduct(
        params.page,
        params.limit,
        params.search,
        params.sort,
        params.order
      )
    ).then((res) => {
      setDataProduct(res.value.data.data);
    });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [visible]);

  const scrollIntoView = (position) => {
    refResult.current.parentNode.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const dataFilter = useMemo(() => {
    if (!search) return dataProduct;

    setScroll(-1);
    scrollIntoView(0);

    return dataProduct.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [dataProduct, search]);

  useEffect(() => {
    if (scroll < 0 || scroll > dataFilter.length || !refResult) {
      return () => {};
    }

    let list = Array.from(refResult.current.children);
    list[scroll] && scrollIntoView(list[scroll]).offsetTop;
  });

  const handleKey = (e) => {
    if (e.key === "ArrowDown") {
      // console.log("ARROW DOWN");
      visible
        ? setScroll((c) => (c < dataFilter.length - 1 ? c + 1 : c))
        : handleShow();
    }
    if (e.key === "ArrowUp") {
      setScroll((c) => (c > 0 ? c - 1 : 0));
      // console.log("ARROW UP");
    }
    if (e.key === "Escape") {
      // console.log("ESCAPE");
      handleHide();
    }
    if (e.key === "Enter") {
      // console.log("ENTER");
      setSearch(dataFilter[scroll].name);
      handleHide();
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              style={{ cursor: "pointer" }}
              onClick={Home}
            >
              Home
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 12, display: { xs: "none", sm: "block" } }}
              style={{ cursor: "pointer" }}
              onClick={Product}
            >
              Product
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 12, display: { xs: "none", sm: "block" } }}
              style={{ cursor: "pointer" }}
              onClick={addNewProduct}
            >
              Add New Product
            </Typography>
            <Search>
              <Form className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  value={search}
                  onClick={handleShow}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => handleKey(e)}
                />
                <Button variant="primary">Search</Button>
              </Form>
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <div className=" position-relative mb-0" ref={refSearch}>
        <div className={`search__result ${visible ? "d-block" : "d-none"}`}>
          <ul className="search__result--wrapper" ref={refResult}>
            {dataFilter.length > 0 ? (
              dataFilter?.map((item, index) => {
                return (
                  <SearchProducts
                    key={index}
                    data={item}
                    onSelectItem={() => {
                      setSearch(item.name);
                      handleHide();
                      editPage(item.id);
                    }}
                    isActive={scroll === index ? true : false}
                  />
                );
              })
            ) : (
              <p style={{ textAlign: "center", marginBottom: 0 }}>not found</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
