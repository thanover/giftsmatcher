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
    if (!props.validateField("name", name)) {
      error = `Another participant already has the name ${name}`;
    }
    return error;
  }

  const inputStyle: string =
    "form-input px-1 py-1 rounded text-slate-300 bg-slate-700 border-0";

  const inputInErrorStyle: string =
    "form-input px-1 py-1 rounded text-slate-300 bg-slate-700 border-2 border-rose-500";

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
      {({ errors, touched }) => (
        <Form>
          <Field
            name="name"
            placeholder="Name"
            validate={validateName}
            className={errors.name ? inputInErrorStyle : inputStyle}
          />
          {errors.name && touched.name && <div>{errors.name}</div>}

          <Field
            name="email"
            validate={validateEmail}
            placeholder="Email (optional)"
            className={errors.email ? inputInErrorStyle : inputStyle}
          />
          {errors.email && touched.email && <div>{errors.email}</div>}

          <button
            type="submit"
            className={
              errors.email || errors.name
                ? "rounded bg-slate-400 p-1"
                : "rounded bg-lime-500 p-1"
            }
            disabled={errors.email || errors.name ? true : false}
          >
            Add Participant
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewPersonForm;
