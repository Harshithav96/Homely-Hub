import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/Login.css";
import { getLogin } from "../../store/User/user-action";
import toast from "react-hot-toast";
import { userActions } from "../../store/User/user-slice";
import LoadingSpinner from "../LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, errors, loading } = useSelector(
    (state) => state.user
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getLogin({ email, password }));
  };

  useEffect(() => {
    // Handle successful login first
    if (isAuthenticated) {
      navigate("/");
      toast.success("User has logged in successfully!");
    }

    // Handle errors (string or array)
    if (errors) {
      if (Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err));
      } else {
        toast.error(errors);
      }
      dispatch(userActions.clearErrors());
    }
  }, [isAuthenticated, errors, navigate, dispatch]);

  return (
    <Fragment>
      <div className="row wrapper">
        {loading && <LoadingSpinner />}
        {!loading && (
          <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler}>
              <h1 className="mb-3">Login</h1>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Link to="/user/forgotPassword" className="float-right mb-4">
                Forgot Password?
              </Link>

              <button
                id="login_button"
                type="submit"
                className="loginbutton btn-block py-3"
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>

              <Link to="/signup" className="float-right mt-3">
                New User?
              </Link>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Login;
