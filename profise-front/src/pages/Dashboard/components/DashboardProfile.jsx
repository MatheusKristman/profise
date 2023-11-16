/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";

import profileProfessionalPersonalDataSchema from "../../../schemas/profileProfessionalPersonalDataSchema";
import useGeneralStore from "../../../stores/useGeneralStore";
import useAccountStore from "../../../stores/useAccountStore";
import api from "../../../services/api";

function DashboardProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [ufOptions, setUfOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [cepCity, setCepCity] = useState("");
  const [cepState, setCepState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { setIsFetching, setIsNotFetching } = useGeneralStore((state) => ({
    setIsFetching: state.setIsFetching,
    setIsNotFetching: state.setIsNotFetching,
  }));
  const { user, setUser } = useAccountStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      profileImage: null,
      profileImageUrl: "",
      email: "",
      name: "",
      lastName: "",
      cel: "",
      tel: "",
      category: "",
      subcategory: "",
      aboutMe: "",
      twitter: "",
      facebook: "",
      googlePlus: "",
      linkedin: "",
      company: "",
      cep: "",
      state: "",
      city: "",
      district: "",
      address: "",
      addressNumber: "",
      complement: "",
    },
    resolver: yupResolver(profileProfessionalPersonalDataSchema),
  });

  const profileImageUrl = watch("profileImageUrl");
  const state = watch("state");
  const cep = watch("cep");
  const categoryValue = watch("category");
  const subCategoryValue = watch("subcategory");

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      let url = "";

      if (user.profileImage) {
        if (JSON.stringify(import.meta.env.MODE) === JSON.stringify("development")) {
          url = `${import.meta.env.VITE_API_KEY_DEV}${
            import.meta.env.VITE_API_PORT
          }/profile-image/${user.profileImage}`;
        } else {
          url = `${import.meta.env.VITE_API_KEY}/profile-image/${user.profileImage}`;
        }
      } else {
        url = null;
      }

      setValue("id", user._id);
      setValue("profileImageUrl", url ? url : "");
      setValue("email", user?.email || "");
      setValue("name", user?.name || "");
      setValue("lastName", user?.lastName || "");
      setValue("cel", user?.cel || "");
      setValue("tel", user?.tel || "");
      setValue("aboutMe", user?.aboutMe || "");
      setValue("twitter", user?.twitter || "");
      setValue("facebook", user?.facebook || "");
      setValue("googlePlus", user?.googlePlus || "");
      setValue("linkedin", user?.linkedin || "");
      setValue("company", user?.company || "");
      setValue("cep", user?.cep || "");
      setLatitude(user?.latitude);
      setLongitude(user?.longitude);
      setValue("state", user?.state || "");
      setValue("city", user?.city || "");
      setValue("district", user?.district || "");
      setValue("address", user?.address || "");
      setValue("addressNumber", user?.addressNumber || "");
      setValue("complement", user?.complement || "");
    }
  }, [
    user,
    setValue,
    categories,
    categoryValue,
    subCategoryValue,
    categoryOptions,
    subCategoryOptions,
  ]);

  useEffect(() => {
    const arrCategories = [];

    if (categories.length === 0) {
      api
        .get("/category/all-categories")
        .then((res) => {
          setCategories(res.data);

          res.data.forEach((cat) => {
            arrCategories.push(cat.category);
          });

          setCategoryOptions(arrCategories);

          if (Object.keys(user).length > 0) {
            setValue("category", user.service.categoryName);
          } else {
            setValue("category", res.data[0].category);
          }
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
  }, [categories, user, setValue]);

  useEffect(() => {
    if (categories.length > 0 && categoryValue !== "") {
      const arrSubCategories = [];

      const categorySelected = categories.filter((cat) => cat.category === categoryValue)[0];

      categorySelected.subCategory.forEach((cat) => {
        arrSubCategories.push(cat.category);
      });

      setSubCategoryOptions(arrSubCategories);

      if (Object.keys(user).length > 0) {
        setValue("subcategory", user.service.subcategory);
      } else {
        setValue("subcategory", arrSubCategories[0]);
      }
    }
  }, [categoryValue, categories, user, setValue]);

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
  }, [state, ufOptions, currentCity, setValue, setCityOptions, setIsLoading]);

  useEffect(() => {
    if (cep.replace("-", "").length === 8) {
      setIsLoading(true);

      axios
        .get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`)
        .then((res) => {
          if (res.data?.erro) {
            console.error(res.data);

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
              setCepCity(localidade);
              setCepState(uf);
              setCurrentCity(localidade);
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

  const handleCel = (event) => {
    let cel = event.target.value.replace(/\D/g, "");

    if (cel.length < 10) {
      cel = cel.replace(/(\d{2})(\d)/, "($1) $2");
    } else if (cel.length === 11) {
      cel = cel.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
    } else {
      return;
    }

    setValue("cel", cel);
  };

  const handleTel = (event) => {
    let tel = event.target.value.replace(/\D/g, "");

    if (tel.length < 10) {
      tel = tel.replace(/(\d{2})(\d)/, "($1) $2");
    } else if (tel.length === 10) {
      tel = tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return;
    }

    setValue("tel", tel);
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

    formData.append("id", getValues("id"));
    formData.append("profileImage", getValues("profileImage"));
    formData.append("email", getValues("email"));
    formData.append("name", getValues("name"));
    formData.append("lastName", getValues("lastName"));
    formData.append("cel", getValues("cel"));
    formData.append("tel", getValues("tel"));
    formData.append("category", getValues("category"));
    formData.append("subcategory", getValues("subcategory"));
    formData.append("aboutMe", getValues("aboutMe"));
    formData.append("twitter", getValues("twitter"));
    formData.append("facebook", getValues("facebook"));
    formData.append("googlePlus", getValues("googlePlus"));
    formData.append("linkedin", getValues("linkedin"));
    formData.append("company", getValues("company"));
    formData.append("cep", getValues("cep"));
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("state", getValues("state"));
    formData.append("city", getValues("city"));
    formData.append("district", getValues("district"));
    formData.append("address", getValues("address"));
    formData.append("addressNumber", getValues("addressNumber"));
    formData.append("complement", getValues("complement"));

    api
      .post("/professional/profile-update", formData)
      .then((res) => {
        setUser(res.data);

        toast.success("Dados atualizados com sucesso", {
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
    <div className="profile">
      <h2 className="profile__title">Perfil</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="profile__profile-data-container">
        <h3 className="profile__profile-data-container__title">Meus dados e contato</h3>

        <div className="profile__profile-data-container__upload-profile-image-container">
          <div className="profile__profile-data-container__upload-profile-image-container__upload-button-box">
            <input
              type="file"
              name="profileImage"
              accept="image/jpeg, image/jpg, image/png"
              id="profileImage"
              disabled={isLoading}
              onChange={handleImage}
              className="profile__profile-data-container__upload-profile-image-container__upload-button-box__input"
            />

            <label
              htmlFor="profileImage"
              className="profile__profile-data-container__upload-profile-image-container__upload-button-box__label"
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Perfil"
                  className="profile__profile-data-container__upload-profile-image-container__upload-button-box__profile-image"
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

          <div className="profile__profile-data-container__upload-profile-image-container__upload-text-box">
            <span className="profile__profile-data-container__upload-profile-image-container__upload-text-box__upload-text">
              Tamanho maximo da imagem é 1MB, Dimensão mínima: 330x330 e nos formatos .jpg e .png
            </span>
          </div>
        </div>

        <label htmlFor="email" className="profile__profile-data-container__label full-width">
          E-mail
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.email ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__profile-data-container__label__input"
          />
          {errors.email && <small className="error-message">{errors.email?.message}</small>}
        </label>

        <label htmlFor="name" className="profile__profile-data-container__label">
          Nome
          <input
            {...register("name")}
            type="text"
            id="name"
            name="name"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.name ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__profile-data-container__label__input"
          />
          {errors.name && <small className="error-message">{errors.name?.message}</small>}
        </label>

        <label htmlFor="lastName" className="profile__profile-data-container__label">
          Sobrenome
          <input
            {...register("lastName")}
            type="text"
            id="lastName"
            name="lastName"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.lastName ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__profile-data-container__label__input"
          />
          {errors.lastName && <small className="error-message">{errors.lastName?.message}</small>}
        </label>

        <label htmlFor="cel" className="profile__profile-data-container__label">
          Celular
          <input
            {...register("cel")}
            type="text"
            id="cel"
            name="cel"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            maxLength={15}
            onChange={handleCel}
            style={errors.cel ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__profile-data-container__label__input"
          />
          {errors.cel && <small className="error-message">{errors.cel?.message}</small>}
        </label>

        <label htmlFor="tel" className="profile__profile-data-container__label">
          Telefone
          <input
            {...register("tel")}
            type="text"
            id="tel"
            name="tel"
            autoComplete="off"
            autoCorrect="off"
            disabled={isLoading}
            maxLength={14}
            onChange={handleTel}
            style={errors.tel ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__profile-data-container__label__input"
          />
          {errors.tel && <small className="error-message">{errors.tel?.message}</small>}
        </label>

        <label htmlFor="category" className="profile__profile-data-container__label">
          Categoria
          <select
            {...register("category")}
            id="category"
            name="category"
            disabled={isLoading}
            autoCorrect="off"
            autoComplete="off"
            style={errors.category ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__profile-data-container__label__select"
          >
            <option disabled>-- Categoria --</option>
            {categoryOptions.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <small className="error-message">{errors.category?.message}</small>}
        </label>

        <label htmlFor="subcategory" className="profile__profile-data-container__label">
          Subcategoria
          <select
            {...register("subcategory")}
            id="subcategory"
            name="subcategory"
            disabled={isLoading}
            autoCorrect="off"
            autoComplete="off"
            style={errors.subcategory ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__profile-data-container__label__select"
          >
            <option disabled>-- Subcategoria --</option>
            {subCategoryOptions.map((subCategory) => (
              <option key={subCategory}>{subCategory}</option>
            ))}
          </select>
          {errors.subcategory && (
            <small className="error-message">{errors.subcategory?.message}</small>
          )}
        </label>

        <label htmlFor="aboutMe" className="profile__profile-data-container__label full-width">
          Sobre mim
          <textarea
            {...register("aboutMe")}
            id="aboutMe"
            name="aboutMe"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.aboutMe ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__profile-data-container__label__textarea"
          />
          {errors.aboutMe && <small className="error-message">{errors.aboutMe?.message}</small>}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="profile__profile-data-container__save-btn"
        >
          Salvar
        </button>
      </form>

      <form onSubmit={handleSubmit(onSubmit)} className="profile__social-media">
        <h3 className="profile__social-media__title">Redes Sociais</h3>

        <label htmlFor="twitter" className="profile__social-media__label">
          Twitter
          <input
            {...register("twitter")}
            type="text"
            id="twitter"
            name="twitter"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.twitter ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__social-media__label__input"
          />
          {errors.twitter && <small className="error-message">{errors.twitter?.message}</small>}
        </label>

        <label htmlFor="facebook" className="profile__social-media__label">
          Facebook
          <input
            {...register("facebook")}
            type="text"
            id="facebook"
            name="facebook"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.facebook ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__social-media__label__input"
          />
          {errors.facebook && <small className="error-message">{errors.facebook?.message}</small>}
        </label>

        <label htmlFor="googlePlus" className="profile__social-media__label">
          Google Plus
          <input
            {...register("googlePlus")}
            type="text"
            id="googlePlus"
            name="googlePlus"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.googlePlus ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__social-media__label__input"
          />
          {errors.googlePlus && (
            <small className="error-message">{errors.googlePlus?.message}</small>
          )}
        </label>

        <label htmlFor="linkedin" className="profile__social-media__label">
          Linkedin
          <input
            {...register("linkedin")}
            type="text"
            id="linkedin"
            name="linkedin"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.linkedin ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__social-media__label__input"
          />
          {errors.linkedin && <small className="error-message">{errors.linkedin?.message}</small>}
        </label>

        <label htmlFor="company" className="profile__social-media__label full-width">
          Nome da Empresa
          <input
            {...register("company")}
            type="text"
            id="company"
            name="company"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.company ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__social-media__label__input"
          />
          {errors.company && <small className="error-message">{errors.company?.message}</small>}
        </label>

        <button type="submit" disabled={isSubmitting} className="profile__social-media__save-btn">
          Salvar
        </button>
      </form>

      <form onSubmit={handleSubmit(onSubmit)} className="profile__location">
        <h3 className="profile__location__title">Localização</h3>

        <label htmlFor="cep" className="profile__location__label">
          CEP
          <input
            {...register("cep")}
            type="text"
            id="cep"
            name="cep"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            maxLength={8}
            onChange={handleCepChange}
            style={errors.cep ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__location__label__input"
          />
          {errors.cep && <small className="error-message">{errors.cep?.message}</small>}
        </label>

        <label htmlFor="state" className="profile__location__label">
          Estado
          <select
            {...register("state")}
            id="state"
            name="state"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.state ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__location__label__select"
          >
            <option disabled>-- Estado --</option>
            {ufOptions.map((uf) => (
              <option key={uf.id} value={uf.sigla}>
                {uf.nome}
              </option>
            ))}
          </select>
          {errors.state && <small className="error-message">{errors.state?.message}</small>}
        </label>

        <label htmlFor="city" className="profile__location__label">
          Cidade
          <select
            {...register("city")}
            id="city"
            name="city"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.city ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__location__label__select"
          >
            <option disabled>-- Cidade --</option>
            {cityOptions.map((city) => (
              <option key={city.id} value={city.nome}>
                {city.nome}
              </option>
            ))}
          </select>
          {errors.city && <small className="error-message">{errors.city?.message}</small>}
        </label>

        <label htmlFor="district" className="profile__location__label">
          Bairro
          <input
            {...register("district")}
            type="text"
            id="district"
            name="district"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.district ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__location__label__input"
          />
          {errors.district && <small className="error-message">{errors.district?.message}</small>}
        </label>

        <label htmlFor="address" className="profile__location__label">
          Endereço
          <input
            {...register("address")}
            type="text"
            id="address"
            name="address"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.address ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__location__label__input"
          />
          {errors.address && <small className="error-message">{errors.address?.message}</small>}
        </label>

        <label htmlFor="addressNumber" className="profile__location__label">
          Número
          <input
            {...register("addressNumber")}
            type="text"
            id="addressNumber"
            name="addressNumber"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.addressNumber ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__location__label__input"
          />
          {errors.addressNumber && (
            <small className="error-message">{errors.addressNumber?.message}</small>
          )}
        </label>

        <label htmlFor="complement" className="profile__location__label full-width">
          Complemento
          <input
            {...register("complement")}
            type="text"
            id="complement"
            name="complement"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            style={errors.complement ? { borderColor: "rgb(243, 50, 50)" } : {}}
            className="profile__location__label__input"
          />
          {errors.complement && (
            <small className="error-message">{errors.complement?.message}</small>
          )}
        </label>

        <button type="submit" disabled={isSubmitting} className="profile__location__save-btn">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default DashboardProfile;
