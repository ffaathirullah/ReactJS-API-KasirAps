import React, { useEffect, useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "./../utils/contants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

function ListCategories(props) {
  const [categories, setCategories] = useState([]);
  const { changeCategory, categoriYangDipilih } = props;
  const Icon = ({ nama }) => {
    if (nama === "Makanan")
      return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
    if (nama === "Cemilan")
      return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  };

  useEffect(() => {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        setCategories(categories);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
    return () => {};
  }, []);
  return (
    <Col md={2} mt="2">
      <h4>
        <strong>Categories</strong>
        <hr />
      </h4>

      <ListGroup as="ul">
        {categories.map((category) => {
          return (
            <ListGroup.Item
              onClick={() => {
                changeCategory(category.nama);
              }}
            >
              <Icon nama={category.nama} className="mr-2" />
              {category.nama}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
  );
}

export default ListCategories;
