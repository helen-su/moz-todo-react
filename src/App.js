import { useState } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";


export default function App(props) {
  const[tasks,setTasks]=useState(props.tasks);

  function addTask(name){
    const newTask={id:`todo-${nanoid()}`,name,completed:false};
    setTasks([...tasks,newTask]);
    console.log(tasks);
  }

  function toggleTaskCompleted(id){
        const updatedTasks=tasks.map((task)=>{
          if(id==task.id){
            return {...task,completed:!task.completed};
          }
          return task;
        });
        setTasks(updatedTasks);
        console.log(updatedTasks);
  }

  function deleteTask(id){
   const remainingTasks=tasks.filter((task)=>id!==task.id);
   setTasks(remainingTasks);
  }

  function editTask(id,newName){
    const editedTaskList=tasks.map((task)=>{
        if(id==task.id){
          return {...task,name:newName};
        }
        return task;
    });
    setTasks(editedTaskList);
  }
  const taskList = tasks?.map((task) => (
    <Todo id={task.id}
     name={task.name} 
     completed={task.completed} 
     key={task.id}
     toggleTaskCompleted={toggleTaskCompleted}
     deleteTask={deleteTask}
     />
  ));
  const tasksNoun =taskList.length!==1?"tasks":"task";
  const headingText=`${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
       <FilterButton filterName="ALL"/>
       <FilterButton filterName="Active"/>
       <FilterButton filterName="Completed"/>
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList};
      </ul>
    </div>
  );
}