import React from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

let gameList = [
  {
    picture:
      "https://static-s.aa-cdn.net/img/gp/20600015162593/wkzwGoDdhXus2qVZdVrnN2_I2rBcMv5oeJ4M9Z7Lsc83rlI7SaClj5Jsmv29vgaxt9RC?v=1",

    link: "/baseball",
    name: "BaseBall Game",
  },
  {
    picture: "https://imgs2.dab3games.com/tic-tac-toe-game.png",
    link: "/tictactoe",
    name: "Tic Tac Toe",
  },
  {
    picture:
      "https://play-lh.googleusercontent.com/DUNH0r31pXy0kcB3xJQNUcjb9MNxnIswinpJ2AQO3rKDHF2304Jdwfs9IF_ZCjYNLKM",
    link: "/wordrelay",
    name: "Word Relay",
  },
  {
    picture:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuUHnK%2FbtqCKAj0N1i%2FU4VvZOqHRJtpwWS2k8YNE1%2Fimg.png",
    link: "/minesweeper",
    name: "Mine Sweeper",
  },
  {
    picture:
      "https://blog.kakaocdn.net/dn/0IvLq/btqI2ln5z3g/MMtvVYPzgTFDj2xWQByhE1/img.jpg",
    link: "/reactiontest",
    name: "Reaction Test",
  },
  {
    picture:
      "https://media.vlpt.us/images/dohy9443/post/19478c69-a68c-480f-866a-d0b067ba72b5/2021-06-16-64.png",
    link: "/cardflip",
    name: "Card Flip",
  },
  {
    picture:
      "data:image/jpeg;base64,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",
    link: "/rsp",
    name: "Rock Scissor Paper",
  },
  {
    picture:
      "https://play-lh.googleusercontent.com/8cNZdwltjMqTO5QTbuFv6fmwDzPBySHLT4Es9jHPIC1QTRw7VyL8tXnwZbCCnDTziuX0",
    link: "/lotto",
    name: "Lotto",
  },
  {
    picture: "https://t1.daumcdn.net/cfile/blog/273C524553E4E6C31D",
    link: "/2048",
    name: "2048 Game",
  },
  {
    picture:
      "https://www.tooli.co.kr/files/attach/images/80/070/473/e285a4cff47b0b14ffa5a1cf8ef3b15c.jpg",
    link: "/mole",
    name: "Mole",
  },
];

function GamesPage() {
  return (
    <div>
      <Row>
        {gameList.map((item, i) => (
          <Col
            key={i}
            lg={12}
            md={24}
            xs={24}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link to={item.link}>
              <Card
                hoverable
                cover={
                  <img
                    style={{ width: "550px", height: "530px" }}
                    alt="example"
                    src={item.picture}
                  />
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "600px",
                  height: "600px",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Meta style={{ height: "20px" }} title={item.name} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default GamesPage;
