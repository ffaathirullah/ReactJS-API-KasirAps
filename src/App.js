import "./App.css";
import { NavbarComponent, ListCategories, Hasil, Menus } from "./components";
import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { API_URL } from "./utils/contants";
import axios from "axios";

function App() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "products")
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.log("eeror: " + error);
      });
    return () => {};
  }, []);

  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <h4>
                <strong>Daftar Product</strong>
                <hr />
              </h4>
              <Row md={3} xs={2}>
                {menus &&
                  menus.map((menu) => <Menus key={menu.id} menu={menu} />)}
              </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
