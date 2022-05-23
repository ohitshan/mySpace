import React, { useEffect, useState } from 'react';
import '../CardFlip/CardFlip.css'
import SingleCard from './SingleCard';
import { Form, Button, Input, Typography, Divider } from 'antd';
const { Title } = Typography;


function CardFlip() {

  const [colors, setColors] = useState(
    [
      { color: 'red', matched: false },
      { color: 'blue', matched: false },
      { color: 'green', matched: false },
      { color: 'orange', matched: false },
      { color: 'aqua', matched: false },
      { color: 'purple', matched: false },
    ]
  )
  const [shuffledCard, setshuffledCard] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false);


  useEffect(() => {
    let count = 0;
    shuffledCard.forEach((card)=>{
      if(card.matched){
        count++
      }
    })
    if(count===shuffledCard.length&&count!==0){
      setTimeout(()=>{
        alert(`${turns}회 만에 성공`)
      },100)
    }
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.color === choiceTwo.color) {
        setshuffledCard(prevCards => {
          return prevCards.map(card => {
            if (card.color === choiceOne.color) {
              console.log(card)
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() =>
          resetTurn()
          , 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const shuffle = () => {
    let colorsCopy = colors.concat(colors)
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setTurns(0);
    setchoiceTwo(null)
    setchoiceOne(null)
    setshuffledCard(colorsCopy)
    setDisabled(true)
    for (let i = 0; i < colorsCopy.length; i++) {
      setTimeout(() => {
        setshuffledCard(prevCards => {
          return prevCards.map((card, j) => {
            if (i === j) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
      }, 1000 + i * 200)
    }

    setTimeout(() => {
      setshuffledCard(colorsCopy)
      setDisabled(false)
    }, 5000)

  }

  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
  }

  const resetTurn = () => {
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    setTimeout(()=>{
      shuffle()
    },1000)
  }, [])

  console.log(shuffledCard)


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title style={{color:'green'}}>Card Matching</Title>
      <Button style={{color:'orange',background:'gray'}} onClick={shuffle}>New Game</Button>
      <div className='card-grid'>
        {shuffledCard.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card.matched || card === choiceOne || card === choiceTwo}
            disabled={disabled}
          />
        ))}
      </div>
      <br />
      <p>Turns:{turns}</p>
    </div>
  )
}

export default CardFlip;
