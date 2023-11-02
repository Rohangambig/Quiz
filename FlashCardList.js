import React from 'react'
import FlashCard from './FlashCard'

export default function FlashCardList({flashCard}) {
  return (
    <div className='card-grid'>
      {
        flashCard.map(flashcard =>{
            return <FlashCard flashcard ={flashcard} key={Option}></FlashCard>
        })
      }
    </div>
  )
}
