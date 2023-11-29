/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import completeRegisterFormSchema from "../../../schemas/completeRegisterFormSchema";
import useIsUserLogged from "../../../hooks/useIsUserLogged";
import useGeneralStore from "../../../stores/useGeneralStore";
import useAccountStore from "../../../stores/useAccountStore";
import useQuery from "../../../hooks/useQuery";
import api from "../../../services/api";
import image from "../../../assets";

function CompleteRegisterForm() {
  const { setIsFetching, setIsNotFetching } = useGeneralStore((state) => ({
    setIsFetching: state.setIsFetching,
    setIsNotFetching: state.setIsNotFetching,
  }));
  const { user, setUser } = useAccountStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const query = useQuery();

  const id = query.get("id");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ufOptions, setUfOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [cepCity, setCepCity] = useState("");
  const [cepState, setCepState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const navigate = useNavigate();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profileImage: null,
      profileImageUrl: "",
      aboutMe: "",
      company: "",
      password: "",
      confirmPassword: "",
      category: "",
      subcategory: "",
      cep: "",
      state: "",
      city: "",
      district: "",
      address: "",
      addressNumber: "",
      complement: "",
      id: "",
    },
    resolver: yupResolver(completeRegisterFormSchema),
  });

  const profileImageUrl = watch("profileImageUrl");
  const state = watch("state");
  const cep = watch("cep");
  const categoryValue = watch("category");

  useIsUserLogged();

  useEffect(() => {
    const categoriesArr = [];

    if (categories.length === 0) {
      api
        .get("/category/all-categories")
        .then((res) => {
          setCategories(res.data);

          res.data.forEach((cat) => {
            categoriesArr.push(cat.category);
          });

          setCategoryOptions(categoriesArr);

          setValue("category", res.data[0].category);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  }, [categories, setValue]);

  useEffect(() => {
    if (categories.length > 0 && categoryValue !== "") {
      const subcategoriesArr = [];

      const categorySelected = categories.filter((cat) => cat.category === categoryValue)[0];

      categorySelected.subCategory.forEach((cat) => {
        subcategoriesArr.push(cat.category);
      });

      setSubcategoryOptions(subcategoriesArr);

      setValue("subcategory", subcategoriesArr[0]);
    }
  }, [categoryValue, categories, setValue]);

  useEffect(() => {
    setIsFetching();

    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((res) => {
        setUfOptions(res.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao carregar os estados", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => setIsNotFetching());
  }, [setIsFetching, setIsNotFetching]);

  useEffect(() => {
    if (ufOptions.length > 0) {
      setIsLoading(true);

      const ufSelected = ufOptions.filter((uf) => uf.sigla === state);

      if (ufSelected.length > 0) {
        axios
          .get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected[0].id}/municipios`
          )
          .then((res) => {
            setCityOptions(res.data);

            if (currentCity) {
              setTimeout(() => {
                setValue("city", currentCity);

                setCurrentCity("");
              }, 100);
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => setIsLoading(false));
      } else {
        setCityOptions([]);
        setIsLoading(false);
      }
    }
  }, [state, ufOptions, currentCity, setValue]);

  useEffect(() => {
    if (cep.replace("-", "").length === 8) {
      setIsLoading(true);

      axios
        .get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`)
        .then((res) => {
          if (res.data?.erro) {
            setValue("address", "");
            setValue("district", "");
            setValue("state", "");
            setLatitude("");
            setLongitude("");
            setCurrentCity("");
            setCepCity("");
            setCepState("");
            setIsLoading(false);
            return;
          }

          const logradouro = res.data.logradouro;
          const bairro = res.data.bairro;
          const uf = res.data.uf;
          const localidade = res.data.localidade;

          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${cep.replace(
                "-",
                ""
              )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`
            )
            .then((res) => {
              setValue("address", logradouro);
              setValue("district", bairro);
              setValue("state", uf);
              setLatitude(res.data.results[0].geometry.location.lat);
              setLongitude(res.data.results[0].geometry.location.lng);
              setCurrentCity(localidade);
              setCepCity(localidade);
              setCepState(uf);
            })
            .catch((error) => {
              console.error(error);

              setValue("address", "");
              setValue("district", "");
              setValue("state", "");
              setLatitude("");
              setLongitude("");
              setCurrentCity("");
              setCepCity("");
              setCepState("");
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error(error);
          setValue("address", "");
          setValue("district", "");
          setValue("state", "");
          setLatitude("");
          setLongitude("");
          setCurrentCity("");
          setCepCity("");
          setCepState("");
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [cep, setValue]);

  useEffect(() => {
    if (id) {
      setValue("id", id);
    } else {
      navigate("/");
    }
  }, [id, setValue]);

  const handleImage = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file && file.type.startsWith("image/")) {
      setValue("profileImageUrl", URL.createObjectURL(file));
      setValue("profileImage", file);
      return;
    }

    toast.error("Formato da image é inválido", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleCepChange = (event) => {
    let cepValue = event.target.value.replace(/\D/g, "");

    if (cepValue.length === 8) {
      cepValue = cepValue.replace(/(\d{5})(\d)/, "$1-$2");
    }

    setValue("cep", cepValue);
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setIsLoading(true);

    if (latitude === "" || longitude === "") {
      toast.error("Endereço não localizado, verifique e tente novamente", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setIsSubmitting(false);
      setIsLoading(false);

      return;
    }

    const registeredCity = getValues("city");
    const registeredState = getValues("state");

    if (registeredCity !== cepCity || registeredState !== cepState) {
      toast.error("Endereço diferente do cep fornecido, verifique e tente novamente", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setIsSubmitting(false);
      setIsLoading(false);

      return;
    }

    const formData = new FormData();

    formData.append("profileImage", getValues("profileImage"));
    formData.append("aboutMe", getValues("aboutMe"));
    formData.append("company", getValues("company"));
    formData.append("password", getValues("password"));
    formData.append("category", getValues("category"));
    formData.append("subcategory", getValues("subcategory"));
    formData.append("cep", getValues("cep"));
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("state", getValues("state"));
    formData.append("city", getValues("city"));
    formData.append("district", getValues("district"));
    formData.append("address", getValues("address"));
    formData.append("addressNumber", getValues("addressNumber"));
    formData.append("complement", getValues("complement"));
    formData.append("id", getValues("id"));

    api
      .post("/professional/complete-register", formData)
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);

        setUser(res.data.user);

        navigate("/");

        toast.success("Cadastro realizado com sucesso", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="complete-register-form">
      <form onSubmit={handleSubmit(onSubmit)} className="complete-register-form__container">
        <h3 className="complete-register-form__container__title">Dados e contato</h3>

        <div className="complete-register-form__container__upload-profile-image-container">
          <div className="complete-register-form__container__upload-profile-image-container__upload-button-box">
            <input
              type="file"
              name="profileImage"
              accept="image/jpeg, image/jpg, image/png"
              id="profileImage"
              disabled={isLoading}
              onChange={handleImage}
              className="complete-register-form__container__upload-profile-image-container__upload-button-box__input"
            />

            <label
              htmlFor="profileImage"
              className="complete-register-form__container__upload-profile-image-container__upload-button-box__label"
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Perfil"
                  className="complete-register-form__container__upload-profile-image-container__upload-button-box__profile-image"
                  onError={(event) => {
                    event.target.src = image.profilePlaceholder;
                  }}
                />
              ) : (
                <>
                  <i className="fa-solid fa-arrow-up-long upload-arrow-up" />
                  Enviar Imagem
                </>
              )}
            </label>

            {errors.profileImage && (
              <small className="error-message">{errors.profileImage?.message}</small>
            )}
          </div>

          <div className="complete-register-form__container__upload-profile-image-container__upload-text-box">
            <span className="complete-register-form__container__upload-profile-image-container__upload-text-box__upload-text">
              Tamanho maximo da imagem é 1MB, Dimensão mínima: 330x330 e nos formatos .jpg e .png
            </span>
          </div>
        </div>

        <label htmlFor="about_me" className="complete-register-form__container__label">
          Sobre mim
          <textarea
            {...register("aboutMe")}
            id="aboutMe"
            name="aboutMe"
            required={false}
            readOnly={false}
            disabled={isLoading}
            style={errors.aboutMe ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="complete-register-form__container__label__textarea half-input"
          />
          {errors.aboutMe && <small className="error-message">{errors.aboutMe?.message}</small>}
        </label>

        <label htmlFor="company" className="complete-register-form__container__label">
          Nome da Empresa
          <input
            {...register("company")}
            type="text"
            id="company"
            name="company"
            required={false}
            readOnly={false}
            maxLength={100}
            disabled={isLoading}
            style={errors.company ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="complete-register-form__container__label__input half-input"
          />
          {errors.company && <small className="error-message">{errors.company?.message}</small>}
        </label>

        <div className="complete-register-form__container__password-wrapper">
          <label
            className="complete-register-form__container__password-wrapper__label"
            htmlFor="password"
          >
            <span className="required">
              Senha<span className="required-sign">*</span>
            </span>

            <input
              {...register("password")}
              type="password"
              id="password"
              name="password"
              required={false}
              readOnly={false}
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              style={errors.password ? { borderColor: "rgb(243, 50, 50)" } : {}}
              className="complete-register-form__container__three-inputs-wrapper__label__input"
            />

            {errors.password && <small className="error-message">{errors.password?.message}</small>}
          </label>

          <label
            className="complete-register-form__container__password-wrapper__label"
            htmlFor="confirmPassword"
          >
            <span className="required">
              Confirme sua Senha<span className="required-sign">*</span>
            </span>

            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required={false}
              readOnly={false}
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              style={errors.confirmPassword ? { borderColor: "rgb(243, 50, 50)" } : {}}
              className="complete-register-form__container__three-inputs-wrapper__label__input"
            />

            {errors.confirmPassword && (
              <small className="error-message">{errors.confirmPassword?.message}</small>
            )}
          </label>
        </div>

        <div className="complete-register-form__container__categories-wrapper">
          <label
            className="complete-register-form__container__categories-wrapper__label"
            htmlFor="category"
          >
            <span className="required">
              Categoria do serviço<span className="required-sign">*</span>
            </span>

            <select
              {...register("category")}
              className="complete-register-form__container__categories-wrapper__label__input"
              name="category"
              id="category"
              disabled={isLoading}
              style={errors.category ? { borderColor: "rgb(243, 50, 50)" } : {}}
            >
              <option>-- Categoria --</option>
              {categoryOptions.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            {errors.category && <small className="error-message">{errors.category?.message}</small>}
          </label>

          <label
            className="complete-register-form__container__categories-wrapper__label"
            htmlFor="subcategory"
          >
            <span className="required">
              Subcategoria do serviço<span className="required-sign">*</span>
            </span>

            <select
              {...register("subcategory")}
              className="complete-register-form__container__categories-wrapper__label__input"
              name="subcategory"
              id="subcategory"
              disabled={isLoading}
              style={errors.subcategory ? { borderColor: "rgb(243, 50, 50)" } : {}}
            >
              <option>-- Subcategoria --</option>
              {subcategoryOptions.map((subcategory) => (
                <option key={subcategory}>{subcategory}</option>
              ))}
            </select>
            {errors.subcategory && (
              <small className="error-message">{errors.subcategory?.message}</small>
            )}
          </label>
        </div>

        <h3 className="complete-register-form__container__title">Localização</h3>

        <div className="complete-register-form__container__three-inputs-wrapper">
          <label
            htmlFor="cep"
            className="complete-register-form__container__three-inputs-wrapper__label"
          >
            <span className="required">
              CEP<span className="required-sign">*</span>
            </span>

            <input
              {...register("cep")}
              type="text"
              id="cep"
              name="cep"
              required={false}
              readOnly={false}
              disabled={isLoading}
              maxLength={8}
              style={errors.cep ? { borderColor: "rgb(243, 50, 50)" } : {}}
              onChange={handleCepChange}
              className="complete-register-form__container__three-inputs-wrapper__label__input"
            />
            {errors.cep && <small className="error-message">{errors.cep?.message}</small>}
          </label>

          <label
            htmlFor="state"
            className="complete-register-form__container__three-inputs-wrapper__label"
          >
            <span className="required">
              Estado<span className="required-sign">*</span>
            </span>

            <select
              {...register("state")}
              id="state"
              name="state"
              disabled={isLoading}
              style={errors.state ? { borderColor: "rgb(243, 50, 50)" } : {}}
              className="complete-register-form__container__three-inputs-wrapper__label__input"
            >
              <option disabled>-- Selecione seu estado --</option>
              {ufOptions.map((uf) => (
                <option key={uf.id} value={uf.sigla}>
                  {uf.nome}
                </option>
              ))}
            </select>
            {errors.state && <small className="error-message">{errors.state?.message}</small>}
          </label>

          <label
            htmlFor="city"
            className="complete-register-form__container__three-inputs-wrapper__label"
          >
            <span className="required">
              Cidade<span className="required-sign">*</span>
            </span>

            <select
              {...register("city")}
              id="city"
              name="city"
              disabled={isLoading}
              style={errors.city ? { borderColor: "rgb(243, 50, 50)" } : {}}
              className="complete-register-form__container__three-inputs-wrapper__label__input"
            >
              <option disabled>-- Selecione sua cidade --</option>
              {cityOptions.map((city) => (
                <option key={city.id} value={city.nome}>
                  {city.nome}
                </option>
              ))}
            </select>
            {errors.city && <small className="error-message">{errors.city?.message}</small>}
          </label>
        </div>

        <div className="complete-register-form__container__two-inputs-wrapper">
          <label
            htmlFor="district"
            className="complete-register-form__container__two-inputs-wrapper__label"
          >
            <span className="required">
              Bairro<span className="required-sign">*</span>
            </span>

            <input
              {...register("district")}
              type="text"
              id="district"
              name="district"
              required={false}
              readOnly={false}
              maxLength={100}
              disabled={isLoading}
              style={errors.district ? { borderColor: "rgb(243, 50, 50)" } : {}}
              className="complete-register-form__container__two-inputs-wrapper__label__input"
            />
            {errors.district && <small className="error-message">{errors.district?.message}</small>}
          </label>

          <label
            htmlFor="address"
            className="complete-register-form__container__two-inputs-wrapper__label"
          >
            <span className="required">
              Endereço<span className="required-sign">*</span>
            </span>

            <input
              {...register("address")}
              type="text"
              id="address"
              name="address"
              required={false}
              readOnly={false}
              maxLength={100}
              disabled={isLoading}
              style={errors.address ? { borderColor: "rgb(243, 50, 50)" } : {}}
              className="complete-register-form__container__two-inputs-wrapper__label__input"
            />
            {errors.address && <small className="error-message">{errors.address?.message}</small>}
          </label>
        </div>

        <div className="complete-register-form__container__two-inputs-wrapper">
          <label
            htmlFor="number"
            className="complete-register-form__container__two-inputs-wrapper__label"
          >
            <span className="required">
              Número<span className="required-sign">*</span>
            </span>

            <input
              {...register("addressNumber")}
              type="text"
              id="addressNumber"
              name="addressNumber"
              required={false}
              readOnly={false}
              maxLength={100}
              disabled={isLoading}
              style={errors.addressNumber ? { borderColor: "rgb(243, 50, 50)" } : {}}
              className="complete-register-form__container__two-inputs-wrapper__label__input"
            />
            {errors.addressNumber && (
              <small className="error-message">{errors.addressNumber?.message}</small>
            )}
          </label>

          <label
            htmlFor="complement"
            className="complete-register-form__container__two-inputs-wrapper__label"
          >
            Complemento
            <input
              {...register("complement")}
              type="text"
              id="complement"
              name="complement"
              required={false}
              readOnly={false}
              maxLength={100}
              disabled={isLoading}
              style={errors.complement ? { borderColor: "rgb(243, 50, 50)" } : {}}
              className="complete-register-form__container__two-inputs-wrapper__label__input"
            />
            {errors.complement && (
              <small className="error-message">{errors.complement?.message}</small>
            )}
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="complete-register-form__container__save-btn"
        >
          {isSubmitting ? "Enviando..." : "Concluir"}
        </button>
      </form>
    </div>
  );
}

export default CompleteRegisterForm;
