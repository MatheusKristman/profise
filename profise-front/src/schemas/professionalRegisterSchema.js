import * as yup from "yup";

const professionalRegisterSchema = yup.object({
  name: yup
    .string()
    .test("name", "Informe o nome completo", (value) => {
      if (!value) {
        return false;
      }

      const parts = value.split(" ");

      return parts.length >= 2;
    })
    .required("Nome é obrigatório"),
  cel: yup
    .string()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Celular invalido")
    .required("Celular é obrigatório"),
  email: yup.string().email("Email invalido").required("Email é obrigatório"),
});

export default professionalRegisterSchema;
