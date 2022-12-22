import React from "react";
import { Formik, Form, Field } from "formik";
import { Person } from "../../models/Person";
import { Rule } from "../../models/Rule";

export type NewRulesFormProps = {
  people: Person[];
  validRule: (rule: Rule) => boolean;
  addRule: (newRule: Rule) => void;
};

function NewRulesForm(props: NewRulesFormProps) {
  function validatePerson2(name: string) {
    let error;
    if (false) {
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
        person1: "",
        person2: "",
      }}
      onSubmit={(values, actions) => {
        // props.addRule(new Rule(values.person1, values.person2, "cantMatch"));
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            component="select"
            name="person1"
            placeholder="Select a Person"
            className={inputStyle}
          >
            {props.people &&
              props.people.map((person) => (
                <option key={person.name} value={person.name}>
                  {person.name}
                </option>
              ))}
          </Field>
          {/* {errors.name && touched.name && <div>{errors.name}</div>} */}

          <Field
            name="email"
            validate={validatePerson2}
            placeholder="Select who this Person can't Match with"
            className={errors.person2 ? inputInErrorStyle : inputStyle}
          />
          {errors.person2 && touched.person2 && <div>{errors.person2}</div>}

          <button
            type="submit"
            className={
              errors.person2
                ? "rounded bg-slate-400 p-1"
                : "rounded bg-lime-500 p-1"
            }
            disabled={errors.person2 ? true : false}
          >
            Add Rule
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewRulesForm;
