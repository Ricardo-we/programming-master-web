import { TextInput, FormField } from "grommet";

const fields = new Map()
fields.set("basic", TextInput)
function FormFieldSelector({ field = "text", ...props }) {
    const SelectedField = fields.get(field)

    return SelectedField ? <SelectedField {...props} /> : null;
}

export default FormFieldSelector;