import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegisterPage() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/api/v1/user/register", data)
      .then((response) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    console.log("submit");
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
          <div className="reg-form-header">Register</div>
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
                    // id="inputCreatePost"
                    className="inputCreatePost"
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="reg-for-item">
                  <ErrorMessage name="postText" component="span" />
                  <Field
                    autoComplete="off"
                    type="password"
                    // id="inputCreatePost"
                    className="inputCreatePost"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="reg-for-item">
                  <button type="submit">Register an account</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
