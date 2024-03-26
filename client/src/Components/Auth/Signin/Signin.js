import "./Signin.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../redux/action/auth";
import { Typography } from "@mui/material";
import clgLogo from "../../Logo/clgLogo.png";

function Signin({ setLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (loginCredentials) => {
    dispatch(loginAction(loginCredentials, setLogin, navigate));
  };
  const validationsLogin = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  return (
    <div className="LoginBody">
      <div className="college-name">
        <img src={clgLogo} style={{ height: "150px" }} alt="SVPCET" />
        <Typography variant="h4" color={"white"} sx={{ fontWeight: "bold" }}>
          St. Vincent Palloti College of Engineering and Technology
        </Typography>
      </div>
      <div className="login">
        <div className="card-login">
          <h1>Welcome!!</h1>
          <Formik
            initialValues={{ select: "student", email: "", password: "" }}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="select">Role</label>
                <Field as="select" name="select" className="form-field">
                  <option value="student">Student</option>
                  <option value="coordinator">Coordinator</option>
                </Field>
              </div>

              <div className="form-group">
                <label form="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="form-field"
                  placeholder="Email"
                />
                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              <div className="form-group">
                <label form="email">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-field"
                  placeholder="Password"
                />
                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              <button className="button" type="submit">
                <div>LOGIN</div>
              </button>
              <div
                className="user-link-cad"
                style={{ color: "white", padding: "1em" }}
              >
                Don't have an account?
                <Link to="/signup">Sign up</Link>
              </div>
            </Form>
          </Formik>
        </div>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}

export default Signin;
