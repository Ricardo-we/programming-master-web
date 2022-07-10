import AutoForm from "../../components/AutoForm";
import * as yup from "yup";
import { Box } from "grommet";

function Adminlogin() {
    const formFields = [
        {
            type: "text",
            label: "Email",
            name: "email"
        },
        {
            type: "password",
            label: "Password",
            name: "password"
        }
    ]

    const validationSchema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().min(5).max(255).required()
    });

    return (
        <Box width="80%" style={{ minWidth: 200 }} margin="auto">
            <AutoForm
                validationSchema={validationSchema}
                title={<h3 style={{ width: "100%", textAlign: "left" }}>Login</h3>}
                initialValues={{ email: undefined, password: undefined }}
                onSubmit={data => console.log(data)}
                fields={formFields}
            />
        </Box>
    );
}

export default Adminlogin;