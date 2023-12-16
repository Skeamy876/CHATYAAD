import React ,{useState}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@mui/material';




const Register = () => {
    const testUrl = 'http://localhost:8080/'
    const serverurl= 'https://chatyaad-production.up.railway.app/'
    
    const [FormData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

       
    const handleChange = (e) => {
        setFormData( { ...FormData, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };


    const validate=()=>{
        if(FormData.password !== FormData.confirmPassword){
            alert("Password does not match");
        }       
    }
    

    const handleSubmit = event => {
        event.preventDefault();
        validate();
        axios.post(`${serverurl}api/v1/chat/register-save`,{
            username: FormData.username,
            password: FormData.password
        },{
            headers: {
                'Content-Type': 'application/json'
            },
        } 
        )
        .then(res => {
            console.log(res.status);
            if (res.status === 201) {
                navigate('/login');
            }
            
         
        })
        .catch(error => {
            if (error.response.status === 500 ){
                alert("Username already exists");
            } else {
                alert("Error Registering");
            }
        });
    
    };

    return (
    
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h1 className="login-header">Register</h1>
                    <form className="needs-validation" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Name</span>
                                <input type="text"
                                name="username" 
                                onChange={handleChange} className="form-control" 
                                placeholder="Username" aria-label="Username"aria-describedby="basic-addon1" 
                                required/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Password</span>
                                <input type="Password" 
                                name="password" 
                                onChange={handleChange} className="form-control"
                                placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" 
                                required/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Confirm Password</span>
                                <input type="Password" 
                                name="confirmPassword" onChange={handleChange} 
                                className="form-control" placeholder="Password" 
                                required/>
                            </div>
                            <Button
                                variant='contained'
                                color='success'
                                onClick={handleSubmit}
                            >
                                Register
                            </Button>

                            <p className="text-muted small font-italic mb-0">Server sleeps until request is made. This is based on a free deploymet configuration as this is a demo project. 
                            Please execute one action then wait a minute or two then the server will be spun up</p>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
        
    );
};

export default Register;