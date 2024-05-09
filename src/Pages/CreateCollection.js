import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreateCollection() {
  const [newCollection, setNewCollection] = useState({
    title: "",
    description: "",
    username: localStorage.getItem("username") || "",
    flashcards: [
      {
        sideOne: "One",
        sideTwo: "Uno",
      },
      {
        sideOne: "",
        sideTwo: "",
      },
    ],
  });

  const createCollection = (data) => {
    axios
      .post("http://localhost:8080/api/v1/collections/createcollection", data)
      .then((response) => {
        console.log("Collection created successfully!");
      })
      .catch((error) => {
        console.log(`An error occured: ${error}`);
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).max(40).required("A title is required"),
    description: Yup.string()
      .min(1)
      .max(200)
      .required("A description is required"),
    flashcards: Yup.array()
      .min(1, "At least one flashcard is required")
      .required(),
  });

  return (
    <div className="create-collection-page">
      <div className="create-collection-header">
        <div className="header-title">
          <h1>Create a new collection</h1>
        </div>
      </div>
      <div className="enter-collection-information">
        <Formik
          initialValues={newCollection}
          validationSchema={validationSchema}
          onSubmit={createCollection}
        >
          {({ values }) => (
            <Form className="formContainer-NewCollection">
              <div className="input-container">
                <Field
                  autoComplete="off"
                  className="inputCollectionTitleDesc"
                  name="title"
                  placeholder="title"
                />
                <ErrorMessage
                  name="title"
                  className="error-message-collection"
                  component="span"
                />
              </div>
              <div className="input-container">
                <Field
                  autoComplete="off"
                  className="inputCollectionTitleDesc"
                  name="description"
                  placeholder="description"
                />
                <ErrorMessage
                  name="description"
                  className="error-message-collection"
                  component="span"
                />
              </div>
              <div className="input-container">
                <FieldArray name="flashcards" className="inputFlashcards">
                  {({ remove, push }) => (
                    <div className="flashcards-container">
                      {values.flashcards.length > 0 &&
                        values.flashcards.map((flashcard, index) => (
                          <div key={index} className="flashcard-card">
                            <div className="flashcard-card-header">
                              <h1>{index + 1}</h1>
                              <button
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}
                              ></button>
                            </div>
                            <div className="flashcard-sides-input-card">
                              <div className="side-input-card">
                                <Field
                                  name={`flashcards.${index}.sideOne`}
                                  placeholder="Enter term one"
                                  type="text"
                                  className="flashcard-side-inputfield"
                                />
                                <h2>term one</h2>
                              </div>
                              <div className="side-input-card">
                                <Field
                                  name={`flashcards.${index}.sideTwo`}
                                  placeholder="Enter term two"
                                  type="text"
                                  className="flashcard-side-inputfield"
                                />
                                <h2>term two</h2>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="add-flashcard-button-card">
                        <button
                          type="button"
                          className="add-flashcard-button"
                          onClick={() => push({ sideOne: "", sideTwo: "" })}
                        >
                          + Add Flashcard
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage
                  name="flashcards"
                  className="error-message-collection"
                  component="span"
                />
              </div>
              <div className="final-create-flash-button">
                <button type="submit">Create</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateCollection;
