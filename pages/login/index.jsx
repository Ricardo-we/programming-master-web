import * as yup from "yup";
import { Box } from "grommet";
import { toast, ToastContainer } from "react-toastify";

import AutoForm from "../../components/AutoForm";
import UserService from "../../services/user.service";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
    const userService = UserService();
    const { user, setUser } = useAuth();

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
            <ToastContainer />
            <AutoForm
                validationSchema={validationSchema}
                title={<h3 style={{ width: "100%", textAlign: "left" }}>Login</h3>}
                initialValues={{ email: undefined, password: undefined }}
                onSubmit={data => {
                    return userService.authenticate(data)
                        .then(res => setUser(res.data))
                        .catch(error => toast.error(error?.response?.data?.error?.message))
                }}
                fields={formFields}
            />
        </Box>
    );
}

export default Login;