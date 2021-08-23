import React, { useState } from "react";
import { Col, ListGroup, Row, Badge, Modal, Button } from "react-bootstrap";
import { numberWithCommas } from "./../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";

function Hasil(props) {
  const { keranjang } = props;
  const [showModal, setShowModal] = useState(false);
  const [keranjangDetail, setKeranjangDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState("");

  const handleShow = (menuKeranjang) => {
    setShowModal(true);
    setKeranjangDetail(menuKeranjang);
    setJumlah(menuKeranjang.jumlah);
    setKeterangan(menuKeranjang.keterangan);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const tambah = () => {
    setJumlah(jumlah + 1);
  };
  const kurang = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
    }
  };
  const changeHandler = (event) => {
    setKeterangan(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Hai", keterangan);
  };
  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Hasil</strong>
        <hr />
        {keranjang.length !== 0 && (
          <ListGroup variant="flush">
            {keranjang.map((menuKeranjang) => {
              return (
                <ListGroup.Item onClick={() => handleShow(menuKeranjang)}>
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
            <ModalKeranjang
              handleShow={handleShow}
              handleClose={handleClose}
              showModal={showModal}
              keranjangDetail={keranjangDetail}
              jumlah={jumlah}
              keterangan={keterangan}
              tambah={tambah}
              kurang={kurang}
              changeHandler={changeHandler}
              handleSubmit={handleSubmit}
            />
          </ListGroup>
        )}
      </h4>
      <TotalBayar keranjang={keranjang} />
    </Col>
  );
}

export default Hasil;
