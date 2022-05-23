import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Input, Typography, Divider, Statistic } from "antd";
const { Countdown } = Statistic;
const { Title } = Typography;

function Mole() {
  const [MoleList, setMoleList] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [Score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const interval = useRef();

  useEffect(() => {
    // interval.current = setInterval(table, 1000)
    // return () => {
    //   clearInterval(interval.current)
    // }
  }, []);

  const table = () => {
    let moleList = [...MoleList];
    for (let i = 0; i < 4; i++) {
      let random = Math.random();
      let index = Math.floor(Math.random() * 9);
      let image = "";
      if (random < 0.3) {
        image = "./bomb.png";
      } else if (random < 0.8) {
        image = "./gopher.png";
      } else {
        image = "";
      }
      moleList[index] = { img: image, id: Math.random(), clicked: false };
    }

    setMoleList(moleList);
  };

  const onClick = (image) => {
    if (image.img === "./bomb.png") {
      setScore((prev) => prev - 1);
      setMoleList((prevList) => {
        return prevList.map((mole) => {
          if (mole.id && mole.id === image.id) {
            return { img: "./explode.png", clicked: true };
          } else {
            return mole;
          }
        });
      });
    } else if (image.img === "./gopher.png") {
      setScore((prev) => prev + 1);
      setMoleList((prevList) => {
        return prevList.map((mole) => {
          if (mole.id && mole.id === image.id) {
            return { img: "./dead.png", clicked: true };
          } else {
            return mole;
          }
        });
      });
    }
  };

  const onFinish = () => {
    alert(`finish! Score ${Score}`);
    clearInterval(interval.current);
  };

  const onStart = () => {
    interval.current = setInterval(table, 1000);
    setTime(Date.now() + 1000 * 30);
    setScore(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <Title style={{ color: "green" }}>두더지 잡기!</Title>
      <Title level={5}>시간내에 최대한 많은 두더지를 잡으시오.</Title>
      <Countdown value={time} onFinish={onFinish}></Countdown>
      <div>{Score}</div>
      <Button onClick={onStart}>시작하기</Button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {MoleList.map((mole, i) => (
          <div
            onClick={() => onClick(mole)}
            key={i}
            style={{
              width: "300px",
              height: "200px",
              margin: "0 auto",
            }}
          >
            {mole.img && (
              <img
                src={`${mole.img || ""}`}
                width="200px"
                height="200px"
                alt="mole"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mole;
