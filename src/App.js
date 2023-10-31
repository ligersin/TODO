import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import './App.css';
import './components/CSS/style.css'
import{useState, useEffect} from 'react'


function App() {

  const [isCompletedScreen, setIsCompletedScreen] = useState(false)
  const [allTodos, setAllTodos] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDiscription, setNewDiscription] = useState("")
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleNewTitle = (e) => {
    setNewTitle(e.target.value);
  }

  const handleNewDiscription = (e) => {
    setNewDiscription(e.target.value);
  }

  const handleAddTodo = () =>{
    let newTodoItem ={
      title: newTitle,
      description: newDiscription
    }

    let updatedTodoarr= [...allTodos];
    updatedTodoarr.push(newTodoItem);
    setAllTodos(updatedTodoarr);
    localStorage.setItem('todoList' , JSON.stringify(updatedTodoarr))
  }

 
  // DELETE FUNCTIONALITY
  const handleDeleteTodo = (index) => {
    let updatedTodoarr = [...allTodos];
    updatedTodoarr.splice(index, 1);
    setAllTodos(updatedTodoarr);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoarr))
  }

  // Funtion to handle task completed functionality
  const handleCompletedTodo =(index)=>{
let now = new Date();
let dd = now.getDate();
let mm = now.getMonth() + 1;
let yy = now.getFullYear();
let hour = now.getHours();
let min = now.getMinutes();
let sec = now.getSeconds();
let completedOn = dd + '-' + mm + '-' + yy + 'at' + hour + ':' + min + ':' + sec;

// Create a new task object of the task selected in
let filteredItems = {
  ...allTodos[index],
  completedOn: completedOn
};
let updatedCompletedArr = [...completedTodos]
updatedCompletedArr.push(filteredItems);
setCompletedTodos(updatedCompletedArr);
handleDeleteTodo(index);
localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
  };



  

  useEffect(() =>{
    const savedTodo =JSON.parse(localStorage.getItem('todoList'));
    if(savedTodo){
      setAllTodos(savedTodo);
    }
    // Get completed taske from Local storage
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'))
     if(savedCompletedTodos){
      setCompletedTodos(savedCompletedTodos);
    }
  },[]);

  const handleDeleteCompletedTodo = (index) =>{
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.splice(index, 1);
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  return (
    <>
<h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' name='title' value={newTitle} onChange={handleNewTitle}
             placeholder="What is the  task title?" />
          </div>

          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' name='title' value={newDiscription} onChange={handleNewDiscription}
             placeholder="What's the task description?" />
          </div>

          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn' >Add</button>
          </div>
        </div>


      <div className='btn-area'>
        <button className={`secondaryBtn ${isCompletedScreen===false && 'active'}`} 
        onClick={() => setIsCompletedScreen(false)}>Todo</button>

        <button className={`secondaryBtn ${isCompletedScreen===true && 'active'}`}
         onClick={() => setIsCompletedScreen(true)} >Completed</button>
      </div>

  {
  isCompletedScreen === false && allTodos.map((item, index)=>{
    return(
      <div className='todo-list' key={index}>

      <div className='todo-list-item'>
      <h3>{item.title}</h3>
      <p> {item.description}</p>
      </div>
      <div className='icons'>
       < AiOutlineDelete className='icon' title='delete' onClick={() => handleDeleteTodo(index)}/>
       < BsCheckLg className='check-icon' title='complete' onClick={handleCompletedTodo} />
      </div>
    </div>)
  })
  }

  {
  isCompletedScreen === true && completedTodos.map((item, index)=>{
    return(
      <div className='todo-list' key={index}>

      <div className='todo-list-item'>
      <h3>{item.title}</h3>
      <p> {item.description}</p>
      <p><small>completed on:{item.completedOn}</small></p>
      </div>
      <div className='icons'>
       < AiOutlineDelete className='icon' title='delete' onClick={() => handleDeleteCompletedTodo(index)}/>
      </div>
    </div>)
  })
  }

 
    
   
      </div>
 
    </>
  );
}

export default App;
