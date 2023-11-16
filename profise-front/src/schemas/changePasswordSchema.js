import * as yup from "yup";

const changePasswordSchema = yup.object({
  id: yup.string().required("ID é obrigatório."),
  actualPassword: yup.string().required("Senha atual é obrigatória."),
  newPassword: yup.string().when("actualPassword", {
    is: (value) => value && value.length > 0,
    then: (schema) =>
      schema
        .required("Senha nova é obrigatória.")
        .min(6, "Senha nova precisa ter no mínimo 6 caracteres")
        .notOneOf(
          [yup.ref("actualPassword")],
          "Senha nova precisa ser diferente da senha atual, verifique e tente novamente."
        ),
    otherwise: (schema) => schema.required("Senha nova é obrigatória."),
  }),
  newPasswordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "As senhas não coincidem, verifique e tente novamente."
    )
    .required("Confirmação da nova senha é obrigatória."),
});

export default changePasswordSchema;
