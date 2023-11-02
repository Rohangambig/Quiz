import React,{useState} from 'react'

export default function FlashCard({flashcard}) {
  const [flip,setflip] = useState(false);
    return (
    <div
     className={`card ${flip?'flip':''}`}
    onClick={() =>setflip(!flip)}>
    
    <div className='front'>
       {flashcard.Question}
        <div className='front-options'>
            {flashcard.options.map(option =>{
               return <div className='option'>{option}</div>
            })}
        </div>
    </div>

    <div className='back'>{flashcard.Answer}</div>
    </div>
  )
}
