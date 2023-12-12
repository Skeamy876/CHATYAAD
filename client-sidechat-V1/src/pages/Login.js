import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@mui/material';



const Login = () => {
    const testUrl = 'http://localhost:8080/'
    const serverurl= 'https://chatyaad-server.onrender.com/'
    const [FormData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
       
    const handleChange = (e) => {
        setFormData( { ...FormData, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${serverurl}api/v1/chat/login-user`,{
           username: FormData.username,
           password:FormData.password
        })
        .then(res=>{
            if (res.status === 200) {
                localStorage.setItem("username",FormData.username);
                navigate("/chatapp");  
            }
        })
        .catch(err=>{
            console.log(err);
            alert("Error, recheck credentials")
        });
  

    };
 
    return (
    <div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h1 className="login-header">Login</h1>
                    <form className="needs-validation" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" value={FormData.username} onChange={handleChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={FormData.password} onChange={handleChange} required/>
                        </div>
                        <div className="mb-3">
                            <Button 
                              variant='contained'
                              color='success'
                              onClick={handleSubmit}
                              >Login</Button>
                            <p className="text-muted small font-italic mb-0">Server sleeps until request is made. This is based on a free deploymet configuration as this is a demo project. 
                            Please execute one action then and the wait a minute or two then the server will be spun up</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

     </div>
        
    );
};

export default Login;