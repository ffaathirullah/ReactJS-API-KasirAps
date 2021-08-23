import { NavbarComponent, ListCategories, Hasil, Menus } from "../components";
import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { API_URL } from "../utils/contants";
import axios from "axios";
import swal from "sweetalert";

function Home(props) {
  const [menus, setMenus] = useState([]);
  const [categoriesYangDipilih, setcategoriesYangDipilih] = useState("Makanan");
  const [keranjang, setKeranjang] = useState([]);
  useEffect((prevState) => {
    gelistKeranjang();

    axios
      .get(API_URL + "products?category.nama=" + categoriesYangDipilih)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }, []);

  const gelistKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        setKeranjang(keranjang);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };
  const changeCategory = (value) => {
    setcategoriesYangDipilih(value);
    console.log(categoriesYangDipilih);
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  const masukKeranjang = (value) => {
    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const menuKeranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        axios
          .post(API_URL + "keranjangs", menuKeranjang)
          .then((res) => {
            gelistKeranjang();
            swal({
              title: "Sukses Masuk Keranjang",
              text: "Success Masuk Keranjang" + menuKeranjang.product.nama,
              icon: "success",
              button: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
      } else {
        const menuKeranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };
        axios
          .put(API_URL + "keranjangs/" + res.data[0].id, menuKeranjang)
          .then((res) => {
            gelistKeranjang();
            swal({
              title: "Sukses Masuk Keranjang",
              text: "Success Masuk Keranjang" + menuKeranjang.product.nama,
              icon: "success",
              button: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
      }
    });
  };
  return (
    <div className="App">
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              key={changeCategory.id}
              changeCategory={changeCategory}
              categoriesYangDipilih={categoriesYangDipilih}
            />
            <Col>
              <h4>
                <strong>Daftar Product</strong>
                <hr />
              </h4>
              <Row md={3} xs={2}>
                {menus.map((menu) => {
                  return (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={masukKeranjang}
                    />
                  );
                })}
              </Row>
            </Col>
            <Hasil keranjang={keranjang} {...props} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
