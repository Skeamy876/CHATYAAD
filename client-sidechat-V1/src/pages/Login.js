import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const testUrl = 'http://localhost:8080/connectpoint'
    const serverurl= 'http://chatspringapp-env-2.eba-hyskc2i5.us-east-1.elasticbeanstalk.com/'
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
        },{
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            }
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
        <h1 className="login-header">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group"style={{width: 800}}>
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="basic-addon1">Username</span>
                        <input type="text" 
                        className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" 
                        name='username'
                        onChange={handleChange}
                        required/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Password</span>
                        <input type="Password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" 
                        name='password'
                        onChange={handleChange}
                        required/>
                    </div>
                    <button type="submit" className="btn btn-outline-success">Login</button>
                </div>
            </form> 
        </div>

        </div>
        
    );
};

export default Login;