import React ,{useState}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const serverurl= 'http://chatspringapp-env-2.eba-hyskc2i5.us-east-1.elasticbeanstalk.com/'
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
        } )
        .then(res => {
            console.log(res.status);
            navigate('/');
         
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
        <div>
            <div className="container">
                <h1 className="login-header">Register</h1>
                <form className="needs-validation"  onSubmit={handleSubmit} >
                    <div className="form-group"style={{width: 800}}>
                        <div className="input-group mb-3" >
                            <span className="input-group-text" id="basic-addon1" >Name</span>
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
                    
                        <button type="submit" className="btn btn-outline-success">Register</button>
                    </div>
                </form>
            </div> 
        </div>
    );
};

export default Register;