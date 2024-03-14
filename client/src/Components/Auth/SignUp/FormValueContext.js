import React, { useState } from "react";
import { Schema } from "rsuite";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("This field is required."),
  uid: StringType().isRequired("This field is required."),
  batch: StringType().isRequired("This field is required."),
  branch: StringType().isRequired("This field is required."),
  gender: StringType().isRequired("This field is required."),
  contact: StringType().isRequired("This field is required."),
  college_email: StringType().isRequired("This field is required."),
  degree: StringType().isRequired("This field is required."),
  avg_cgpa: StringType().isRequired("This field is required."),
  ssc_marks: StringType().isRequired("This field is required."),
  ssc_board: StringType().isRequired("This field is required."),
  hsc_marks: StringType().isRequired("This field is required."),
  hsc_board: StringType().isRequired("This field is required."),
  address: StringType().isRequired("This field is required."),
  city: StringType().isRequired("This field is required."),
  post_code: StringType().isRequired("This field is required."),
  state: StringType().isRequired("This field is required."),
  country: StringType().isRequired("This field is required."),
  linkedln_link: StringType(),
  resume_url: StringType(),
  password: StringType().isRequired("This field is required."),
  c_password: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }

      return true;
    }, "The two passwords do not match")
    .isRequired("This field is required."),
});

export const FormValueContext = React.createContext();

export const FormValueProvider = ({ children }) => {
  const formRef = React.useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    name: "",
    uid: "",
    batch: "",
    branch: "",
    gender: "",
    contact: "",
    college_email: "",
    degree: "",
    avg_cgpa: "",
    ssc_marks: "",
    ssc_board: "",
    hsc_marks: "",
    hsc_board: "",
    address: "",
    city: "",
    post_code: "",
    state: "",
    country: "",
    linkedln_link: "",
    resume_url: "",
    password: "",
    c_password: "",
  });

  return (
    <FormValueContext.Provider
      value={{
        formRef,
        formValue,
        setFormValue,
        formError,
        setFormError,
        model,
      }}
    >
      {children}
    </FormValueContext.Provider>
  );
};
