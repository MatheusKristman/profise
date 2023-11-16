import * as yup from "yup";

const passwordRecoverySchema = yup.object({
  password: yup
    .string()
    .min(6, "Senha precisa ter no mínimo 6 caractéres")
    .required("Senha é obrigatória."),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "As senhas não coincidem, verifique e tente novamente."
    )
    .required("Confirmação de senha é obrigatória."),
});

export default passwordRecoverySchema;
