import React from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "./../utils/utils";
import TotalBayar from "./TotalBayar";

function Hasil(props) {
  const { keranjang } = props;
  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Hasil</strong>
        <hr />
        {keranjang.length !== 0 && (
          <ListGroup variant="flush">
            {keranjang.map((menuKeranjang) => {
              return (
                <ListGroup.Item>
                  {" "}
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </h4>
      <TotalBayar keranjang={keranjang} {...props} />
    </Col>
  );
}

export default Hasil;
