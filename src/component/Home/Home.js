
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import List from '../List/List';
import './Home.css';

const Home = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data =>{
        console.log(data);

        axios.post('http://localhost:5000/todos', data)
        .then(res=>{
            console.log(res);
            if(res.data.insertedId){
                alert('Added successfully');
                reset();
                
            }
        });
        window.location.reload();
    }

    return (
        <div className=' home'>
         <h1 className="text-warning fw-bold text-center banner-title py-5">Add a Todo</h1>
            <div className="pt-2"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name",)} placeholder="Add todo" />
                <input className='submit-btn' type="submit" />
            </form> 
            <List></List>  
            
        </div>
    );
};

export default Home;