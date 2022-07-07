import { Formik } from "formik";
import FormFieldSelector from "./form-fields/FormFieldSelector";

function Form({ initialValues, validationSchema, onSubmi, ...props }) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                const submiting = onSubmit && onSubmit(values)
                submiting && submiting.then ?
                    submiting.then(() => setSubmitting(false))
                    : setSubmitting(false)
            }}
        >
            {({ isSubmitting, handleChange, handleBlur, errors }) => (
                <Form style={{ display: "flex", flexWrap: "wrap" }} {...props.formOptions}>
                    {props.title || <h3>Form</h3>}
                    {fields?.map((field, index) => (
                        <FormFieldSelector
                            {...field}
                            onChange={handleChange}

                        />
                    ))}

                    <Button variant="contained" color="primary" type="submit" fullWidth disabled={isSubmitting} {...props.submitButtonOptions}>
                        {props.buttonText || "Submit"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default Form;