import React, { useState } from "react";

import "./index.css";
import Icon from "./components/Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [count, setCount] = useState(0);
  const [winMessage, setWinmessage] = useState("");
  const [isCross, setIsCross] = useState(false);

  const reloadGame = () => {
    setIsCross(false);
    setWinmessage("");
    itemArray.fill("empty", 0, 9);
  };

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }
    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: "error" });
    }

    checkIsWinner();
  };

  const checkIsWinner = () => {
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinmessage(`${itemArray[0]} Won`);
    }

    if (
      itemArray[3] === itemArray[4] &&
      itemArray[3] === itemArray[5] &&
      itemArray[3] !== "empty"
    ) {
      setWinmessage(`${itemArray[3]} Won`);
    }

    if (
      itemArray[6] === itemArray[7] &&
      itemArray[6] === itemArray[8] &&
      itemArray[6] !== "empty"
    ) {
      setWinmessage(`${itemArray[6]} Won`);
    }

    if (
      itemArray[0] === itemArray[3] &&
      itemArray[0] === itemArray[6] &&
      itemArray[0] !== "empty"
    ) {
      setWinmessage(`${itemArray[0]} Won`);
    }

    if (
      itemArray[1] === itemArray[4] &&
      itemArray[1] === itemArray[7] &&
      itemArray[1] !== "empty"
    ) {
      setWinmessage(`${itemArray[1]} Won`);
    }

    if (
      itemArray[2] === itemArray[5] &&
      itemArray[2] === itemArray[8] &&
      itemArray[2] !== "empty"
    ) {
      setWinmessage(`${itemArray[2]} Won`);
    }

    if (
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8] &&
      itemArray[0] !== "empty"
    ) {
      setWinmessage(`${itemArray[0]} Won`);
    }

    if (
      itemArray[2] === itemArray[4] &&
      itemArray[2] === itemArray[6] &&
      itemArray[2] !== "empty"
    ) {
      setWinmessage(`${itemArray[2]} Won`);
    }
  };

  return (
    <>
      <Container className="p-5">
        <ToastContainer position="bottom-center" />
        <Row>
          <Col md={6} className="offset-md-3">
            {winMessage ? (
              <div className="mb-2 mt-2">
                <h1 className="text-success text-uppercase text-center">
                  {winMessage}
                </h1>
                <button
                  className="btn btn-success d-block w-100"
                  onClick={reloadGame}
                >
                  Reload The Game!
                </button>
              </div>
            ) : (
              <h1 className="text-center text-warning">
                {isCross ? "cross" : "circle"} turns
              </h1>
            )}
            <div className="grid">
              {itemArray.map((item, index) => (
                <Card color="warning" onClick={() => changeItem(index)}>
                  <CardBody className="box">
                    <Icon name={item}></Icon>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
