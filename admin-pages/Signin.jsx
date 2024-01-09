import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { authenticate, isAuthenticated, signin } from '../src/auth/index';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../src/Config';

const SignIn = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    success: false,
    redirectTo: false,
    message: '',
  });

  const { email, password, error, redirectTo, success } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  // email validation yeta
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setValues({ ...values, error: 'Invalid email format' });
      return;
    }
    try {
      const data = await signin({ email, password });

      if (data?.success === false) {
        console.error('Login failed:', data.message);

      if (data.message.includes('email')) {
        setValues({ ...values, error: 'Invalid email address' });
      } else if (data.message.includes('password')) {
        setValues({ ...values, error: 'Invalid password' });
      } else {
        setValues({ ...values, error: data.message });
      }
    } else {
      authenticate(data, () => {
        setValues({ ...values, success: true, redirectTo: true });
      });
    }
  } catch (error) {
    console.error('Login failed:', error);
    setValues({ ...values, error: 'Login failed. Please try again.' });
  }
  };

  const redirectUser = () => {
    const { user } = isAuthenticated();

    if (redirectTo) {
      if (user && user.role === 'admin') {
        return '/admin/pwadmin';
      } else {
        return '/';
      }
    }

    return null;
  };

  const showError = () => error && <div className=" text-emerald-700 font-bold">{error}</div>;

  const showSuccess = () => success && <div className="alert alert-success">Login Successfully</div>;

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectUser());
    }
  }, [redirectTo]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/introduction/personal-info`);
      setData(response.data);
    } catch (error) {
      console.error('Error while fetching data', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="p-4 sm:p-20 bg-white">
        <div className="sm:flex sm:flex-row justify-center bg-gray-900 p-5 sm:p-20 rounded-3xl shadow-xl">
          <div className="flex-col flex self-center lg:p-10 sm:max-w-5xl xl:max-w-lg z-10">
            <div className="self-start hidden lg:flex flex-col text-white">
              <div className="flex items-center mb-5">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Eo_circle_purple_letter-a.svg/2048px-Eo_circle_purple_letter-a.svg.png"
                  alt="Aji Logo"
                  className="w-10"
                />
                {
                  data && data?.map((d) => (
                    <h3 key={d} className="text-4xl font-semibold ml-2">{d.name}</h3>
                  ))
                }
              </div>


              <h1 className="my-3 font-semibold text-3xl text-center">Welcome back  </h1>

              {/* <p className="pr-3 text-sm opacity-75">
                Lorem ipsum is placeholder text commonly used in the graphic, print,
                and publishing industries for previewing layouts and visual mockups
              </p> */}
            </div>
          </div>

          <div className="flex justify-center items-center z-10 bg-white rounded-lg ">
            <div className="shadow p-4">
              <form>
                <h1 className="mb-5 text-center text-black text-xl font-bold">Please Login</h1>
                {showSuccess()}
                <div className="form-floating mb-2">
                <div htmlFor="email" className='text-black mb-5 font-bold'>Email Address</div>
                  <input
                    type="email"

                    id="email"
                    placeholder="name@example.com"
                    onChange={handleChange('email')}
                    value={email}
                    className="rounded-md block w-full border border-black-200 py-3 px-2 mb-5 "
                  />
                </div>
                <div className="form-floating mb-2">
                <div htmlFor="password" className='text-black font-bold mb-5'>Password</div>

                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange('password')}
                    value={password}
                    className="rounded-md block w-full border border-black-200 py-3 px-2 mb-5"
                  />
                </div>
                <div className="flex justify-center text-red-600">
                {showError()}
                </div>
                <div className=" flex flex-auto justify-center gap-2 m-4">
                  <div className="">
                    <button className="block w-full bg-green-700 hover:bg-black  text-white rounded-md py-3 px-2 mb-5" type="submit" onClick={handleSubmit}>
                      Login
                    </button>

                  </div>
                  <div className="">
                    <Link to="/">
                    <button className="block w-full bg-green-700 hover:bg-black text-white rounded-md py-3 px-2 mb-5"  >
                      View Site
                    </button>
                    </Link>


                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
