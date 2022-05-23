import React from 'react';
import '../CardFlip/CardFlip.css'

function SingleCard({ card, handleChoice, flipped,disabled }) {

  const handleClick = () => {
    if(disabled) return
    handleChoice(card)
  }
  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ''}>
        <div className='front' style={{ background: `${card.color}` }}></div>
        <div className='back' onClick={handleClick}>d</div>
      </div>
    </div>
  )
}

export default SingleCard;
