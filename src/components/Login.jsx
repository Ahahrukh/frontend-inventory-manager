import React, { useState } from 'react'
import '../App.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Home from './Home'
const Login = () => {
    const [username, setUsername]=useState("")
    const [password, setPassword] = useState("")
    let requiredOptions ={
        1:'Home',
        2:'Inventory',
        3:'Orders',
        4:(<button type="button" className="btn btn-primary me-3">
        Sign up
      </button>)
    }
    let requiredPaths={
        1:'/',
        2:'/inventory',
        3:'/order',
    }
    const navigate = useNavigate()
    const submitLogin = async() => {
        let userInfo={username: username, password: password}
        try {
            let postdata=await axios.post('http://localhost:8080/api/v1/auth/login',userInfo)
            localStorage.setItem('token',postdata.data.result.data.token)
            navigate('/inventory')
        } catch (error) {  
            alert("there is an error")
        }
    }
  return (
    <div>
        <Home options={requiredOptions} paths={requiredPaths} />
        <section className="vh-100">
        <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample img" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                
                <div className="form-outline mb-4">
                    <label className="form-label"></label>
                    <input id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                </div>
                <div className="form-outline mb-3">
                <label className="form-label" ></label>
                    <input type="password"  className="form-control form-control-lg"
                    placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    
                    <a href="/forget/pass" className="text-body">Forgot password?</a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}} onClick={submitLogin} >Login</button>
                </div>

                </form>
            </div>
            </div>
        </div>
        <div
            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
            Copyright © 2023. All rights reserved.
            </div>
    
            <div>
            </div>
            
        </div>
        </section>
    </div>
  )
}

export default Login