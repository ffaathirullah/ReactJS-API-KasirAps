import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import { numberWithCommas } from "./../utils/utils";

const Menus = (props) => {
  const { menu, masukKeranjang } = props;
  return (
    <div>
      <Row>
        <Col className="mb-4">
          <Card className="shadow" onClick={() => masukKeranjang(menu)}>
            <Card.Img
              variant="top"
              src={`assets/images/${menu.category.nama.toLowerCase()}/${
                menu.gambar
              }`}
            />
            <Card.Body>
              <Card.Title>
                {menu.nama} <strong>{menu.kode}</strong>
              </Card.Title>
              <Card.Text>Rp.{numberWithCommas(menu.harga)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Menus;
