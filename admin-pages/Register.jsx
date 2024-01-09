import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { signup } from '../auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const nav = useNavigate()
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    // object destructuring
    //obj
    const { name, email, password, error, success } = values

    // handling the input data:
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    // form handling
    const handleSubmit = e => {
        e.preventDefault()
        setValues({ ...values })
        // signup function call from here:
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({ ...values, name: "", email: "", password: "", success: true })
                    setInterval(() => {
                        nav("/signin")

                    }, 3000);
                }
            })
    }

    // to show error message:
    const showError = () => (
        error && <div className='alert alert-danger'>{error}</div>
    )
    // to show success message:
    const showSuccess = () => (
        success && <div className='alert alert-success'>
            Registered Successfully

        </div>

    )



    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>

            <div className="container my-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 shadow p-3">
                        <form>
                            <h1 className="h3 mb-3 text-center">Please Register</h1>
                            {showError()}
                            {showSuccess()}

                            <div className="mb-2 form-floating">
                                <input type="text" name='name' id='name' className='form-control' placeholder='Full name' onChange={handleChange('name')} value={name} />
                                <label htmlFor="name" >Full Name</label>
                            </div>

                            <div className="form-floating mb-2">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange('email')} value={email} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange('password')} value={password} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>


                            <div style={{ "backgroundColor": "green" }} className="btn btn-warning w-50 py-2" onClick={handleSubmit}>Register</div>
                            <p className="mt-5 mb-3 text-body-secondary">&copy;2023 <span className='font-italic'>SuwasGhale&#10084;</span></p>
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Register;