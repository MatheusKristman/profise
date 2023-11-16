import * as yup from "yup";

const checkoutSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  company: yup.string(),
  cep: yup.string().required("CEP é obrigatório"),
  tel: yup
    .string()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido")
    .required("Telefone é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  state: yup.string().required("Estado é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  addressNumber: yup.string().required("Número do endereço é obrigatório"),
  email: yup.string().email("Email invalido").required("Email é obrigatório"),
});

export default checkoutSchema;
