/* eslint-disable no-shadow */
import * as yup from "yup";

const completeRegisterFormSchema = yup.object({
  profileImage: yup
    .mixed()
    .nullable()
    .test({
      message: "Insira uma imagem do tipo válido.",
      test: (file) => {
        if (!file) {
          return true;
        }

        return yup
          .mixed()
          .test({
            message: "Insira uma imagem do tipo valido.",
            test: (file) => {
              if (!file) {
                return false;
              }

              const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];

              return supportedFormats.includes(file.type);
            },
          })
          .test({
            message: "Tamanho da imagem é muito grande.",
            test: (file) => {
              if (!file) {
                return false;
              }

              const maxSize = 5 * 1024 * 1024; // 5MB

              return file.size <= maxSize;
            },
          });
      },
    }),
  profileImageUrl: yup.string(),
  aboutMe: yup.string(),
  company: yup.string(),
  password: yup
    .string()
    .min(6, "Senha precisa ter no mínimo 6 caractéres")
    .required("Senha é obrigatória."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem, verifique e tente novamente.")
    .required("Confirmação de senha é obrigatória."),
  category: yup.string().required("Categoria é obrigatória."),
  subcategory: yup.string().required("Subcategoria é obrigatória."),
  cep: yup.string().required("CEP é obrigatório."),
  state: yup.string().required("Estado é obrigatório."),
  city: yup.string().required("Cidade é obrigatória."),
  district: yup.string().required("Bairro é obrigatório."),
  address: yup.string().required("Endereço é obrigatório."),
  addressNumber: yup.string().required("Número de endereço é obrigatório."),
  complement: yup.string(),
});

export default completeRegisterFormSchema;
