import React from "react";
import { Formik, Form, Field } from "formik";

export type NewPersonFormProps = {
  validateField: (field: "email" | "name", value: string) => boolean;
  addPerson: (name: string, email?: string) => void;
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
      error = `Participant "${name}" already exists`;
    }
    return error;
  }

  const inputStyle: string =
    "m-1 p-2 bg-slate-500 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

  const inputInErrorStyle: string =
    "m-1 p-2 rounded  border border-red-500 text-red-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500";

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
      }}
      onSubmit={(values, actions) => {
        values.email
          ? props.addPerson(values.name, values.email)
          : props.addPerson(values.name);
        actions.resetForm();
      }}
    >
      {({ errors, touched, values }) => (
        <>
          <Form>
            <div className="flex  items-center">
              <div className="flex ml-1">
                <div className="flex flex-col w-60">
                  <Field
                    name="name"
                    placeholder="Name"
                    validate={validateName}
                    className={errors.name ? inputInErrorStyle : inputStyle}
                  />

                  <span className="text-xs text-red-600 h-10 text-center">
                    {errors.name && touched.name && <p>{errors.name}</p>}
                  </span>
                </div>
                <div className="flex flex-col w-60">
                  <Field
                    name="email"
                    validate={validateEmail}
                    placeholder="Email (optional)"
                    className={errors.email ? inputInErrorStyle : inputStyle}
                  />
                  <span className="text-xs text-red-600 h-10 text-center">
                    {errors.email && touched.email && <p>{errors.email}</p>}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <button
                  type="submit"
                  disabled={
                    errors.email || errors.name || values.name === ""
                      ? true
                      : false
                  }
                  className={
                    errors.email || errors.name || values.name === ""
                      ? "flex bg-slate-400 p-2 m-1 rounded-lg"
                      : "flex bg-lime-500 hover:bg-lime-600 p-2 m-1 rounded-lg"
                  }
                >
                  Add
                  <div className="pl-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
                <span className="text-sm text-red-600 h-10 text-center">
                  {""}
                </span>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default NewPersonForm;
