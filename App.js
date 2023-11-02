import React , {useState,useEffect,useRef} from 'react'
import FlashCardList from './FlashCardList';
import './App.css'
import axios from 'axios'

function App() {
  const [flashCard,setflashcard] = useState([]);
  const categorEL = useRef();
  const [categories,setcategories] = useState([]);
  const amountRef  = useRef()
  useEffect(()=>{
    axios.get('https://opentdb.com/api_category.php').then(res =>{
      setcategories(res.data.trivia_categories)
    })
  },[])

  useEffect(()=>{
  
  },[])

function Decode(str)
{
  const textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value;
}

function HandleSubmit(e)
{
  e.preventDefault();
  axios.get('https://opentdb.com/api.php',{
    params:{
      amount:amountRef.current.value,
      category:categorEL.current.value
    }
  }).then(res =>{
  setflashcard(res.data.results.map((questionItem,index)=>{
    const answer = Decode(questionItem.correct_answer);
    const option = [...questionItem.incorrect_answers.map(a =>(
      Decode(a)
    )),answer]
    return{
      id:`${index}-${Date.now()}`,
      Question:Decode(questionItem.question),
      Answer:answer,
      options: option.sort(()=>Math.random() - .5)
    }
  }) )
  })
}

  return (
    <div>
    <form className='header' onSubmit={HandleSubmit}>
        <div className='form-group'>
        <label htmlFor='category'>Category</label>
        <select id='category' ref={categorEL}>
          {categories.map(category =>{
            return <option value={category.id} key={category.id}>{category.name}</option>
          })}
        </select>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Number of question</label>
          <input type='number' id='amount' min='1' step='1' defaultValue={10} ref={amountRef}></input>
        </div>

        <div className='form-group'>
        <button  className='btn'>Genereate</button>
        </div>


    </form>
    <div className="container">
       <FlashCardList flashCard = {flashCard} ></FlashCardList>
    </div>
    </div>
  );
}

 
export default App;
