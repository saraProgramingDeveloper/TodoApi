import React, { useState } from 'react';
 // ייבוא של מודול ה-API שלך
import api from './service';
const TaskAdder = () => {
  const [taskName, setTaskName] = useState(''); // סטייט לשם המשימה

  const handleAddTask = async () => {
    if (taskName) {
      try {
        const newTask = await api.addTask(taskName); // קריאה לפונקציה להוספת משימה
        console.log('Task added successfully:', newTask);
        setTaskName(''); // ריקון השדה לאחר הוספה
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    } else {
      console.log('Please enter a task name');
    }
  };

  return (

    <div className="text-center">
      <input 
        type="text" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
        placeholder="Enter task name" 
        className="form-control mb-2"
      />
      <div className="d-grid">
      <button className="btn btn-info btn-block" onClick={handleAddTask}>Add Task</button>
      </div>
    </div>

  );
};



export default TaskAdder;