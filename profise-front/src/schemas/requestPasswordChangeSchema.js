import * as yup from "yup";

const requestPasswordChangeSchema = yup.object({
  email: yup.string().email("Email invalido.").required("Email é obrigatório."),
});

export default requestPasswordChangeSchema;
