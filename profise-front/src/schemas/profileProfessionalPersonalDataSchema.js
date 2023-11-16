/* eslint-disable no-shadow */
import * as yup from "yup";

const profileProfessionalPersonalDataSchema = yup.object({
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
  email: yup.string().email("E-mail invalido").required("E-mail é obrigatório"),
  name: yup.string().required("Nome é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  cel: yup
    .string()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Celular invalido")
    .required("Celular é obrigatório"),
  tel: yup.string().test("is-valid", "Telefone invalido", (value) => {
    return !value || /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value);
  }),
  category: yup.string().required("Categoria é obrigatória"),
  subcategory: yup.string().required("Subcategoria é obrigatória"),
  aboutMe: yup.string(),
  twitter: yup.string(),
  facebook: yup.string(),
  googlePlus: yup.string(),
  linkedin: yup.string(),
  company: yup.string(),
  cep: yup.string().required("CEP é obrigatório"),
  state: yup.string().required("Estado é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  district: yup.string().required("Bairro é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  addressNumber: yup.string().required("Número é obrigatório"),
  complement: yup.string(),
});

export default profileProfessionalPersonalDataSchema;
