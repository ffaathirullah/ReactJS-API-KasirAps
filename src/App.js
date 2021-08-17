import "./App.css";
import { NavbarComponent, ListCategories, Hasil } from "./components";
import { Row, Col, Container } from "react-bootstrap";

function App() {
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
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
