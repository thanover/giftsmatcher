import React from "react";
import { Formik, Form, Field } from "formik";
import { Person } from "../../models/Person";

export type NewPersonFormProps = {
  validateField: (field: "email" | "name", value: string) => boolean;
  addPerson: (newPerson: Person) => void;
};

function NewPersonForm(props: NewPersonFormProps) {
  function validateEmail(email: string) {
    let error;
    if (email) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        error = "Invalid email address";
      } else if (!props.validateField("email", email)) {
        error = `Another participant already has email address ${email}`;
      }
    }
    return error;
  }

  function validateName(name: string) {
    let error;
    if (name === "") error = "";
    if (!props.validateField("name", name)) {
      error = `Another participant already has the name "${name}"`;
    }
    return error;
  }

  const inputStyle: string =
    "m-1 p-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

  const inputInErrorStyle: string =
    "m-1 p-2 rounded  border border-red-500 text-red-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500";

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
      }}
      onSubmit={(values, actions) => {
        props.addPerson(new Person(values.name, values.email));
        actions.resetForm();
      }}
    >
      {({ errors, touched, values }) => (
        <Form>
          <Field
            name="name"
            placeholder="Name"
            validate={validateName}
            className={errors.name ? inputInErrorStyle : inputStyle}
          />

          <Field
            name="email"
            validate={validateEmail}
            placeholder="Email (optional)"
            className={errors.email ? inputInErrorStyle : inputStyle}
          />
          <button
            type="submit"
            className={
              errors.email || errors.name || values.name === ""
                ? "text-slate-400 p-1 m-1"
                : "text-lime-500 p-1 m-1"
            }
            disabled={
              errors.email || errors.name || values.name === "" ? true : false
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div className="text-red-600 p-4">
            {errors.email && touched.email && <div>{errors.email}</div>}
            {errors.name && touched.name && <div>{errors.name}</div>}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NewPersonForm;
