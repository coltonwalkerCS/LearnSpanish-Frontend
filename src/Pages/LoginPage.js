import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function LoginPage() {
  const { setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    data.password = axios
      .post("http://localhost:8080/api/v1/user/login", data)
      .then((response) => {
        localStorage.setItem("accessToken", response.data);
        localStorage.setItem("username", data.username);
        setAuthState(true);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error occured: ", error);
      });
  };
  return (
    <div className="registration-page">
      <div className="registration-page-text">
        <div className="reg-text-content">
          <div className="tilt-text-border"></div>
          <h2>Start Learning with A.I.</h2>
        </div>
      </div>
      <div className="registration-middle-divider">
        <div className="tilt-div2"></div>
      </div>
      <div className="registration-page-form">
        <div className="registration-form-container">
          <div className="reg-form-header">Login</div>
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="formContainer">
                <div className="reg-for-item">
                  <ErrorMessage name="title" component="span" />
                  <Field
                    autoComplete="off"
                    className="inputCreatePost"
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="reg-for-item">
                  <ErrorMessage name="postText" component="span" />
                  <Field
                    autoComplete="off"
                    className="inputCreatePost"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="reg-for-item">
                  <button type="submit">Login to your account</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
