import React from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { numberWithCommas } from "./../utils/utils";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { API_URL } from "./../utils/contants";
import { withRouter } from "react-router";
const TotalBayar = (props) => {
  const { keranjang } = props;

  const totalBayar = keranjang.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);
  const submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: keranjang,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      props.history.push("/sukses");
    });
  };
  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="px-4">
          <h4>
            Total Harga :
            <strong className="float-right mr-2">
              Rp. {numberWithCommas(totalBayar)}
            </strong>
          </h4>
          <Button
            variant="primary"
            block
            className="mb-2 mt-4 mr-2"
            size="lg"
            onClick={() => submitTotalBayar(totalBayar)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(TotalBayar);
