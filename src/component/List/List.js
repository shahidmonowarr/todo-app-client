
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

const List = () => {
    const [todos, setTodos] = useState([]);
    const count = todos.length;
    useEffect(() => {
        fetch("http://localhost:5000/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
    }, []);

    const handleDelete = id => {
        const url = `http://localhost:5000/todos/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    alert('Product deleted')
                    const remaining = todos.filter(todo=> todo._id !== id);
                    setTodos(remaining);
                }

            })
    }

    return (
        <div>
            {!count ? (
        <div className="text-center my-5 private-spinner py-5">
          <Spinner variant="danger" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ):(
            <div className='container mt-4'>
            {
                todos.map(todo=><div key={todo._id} className='row bg-dark mt-1'>
                    <div className='col-md-6'>{todo.name}</div>
                    <div className='icon col-md-6'>
                        
                        <button
                                            
                                            className="btn btn-light me-2"
                                        >Edit</button>
                        <button
                                            onClick={() => handleDelete(todo._id)}
                                            className="btn btn-light"
                                        >Delete</button>
                    </div>
                </div>)
            }
        </div>)}
        </div>
    );
};

export default List;