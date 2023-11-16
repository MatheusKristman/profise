import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import CheckoutSchema from "../../../schemas/checkoutSchema";
import useAccountStore from "../../../stores/useAccountStore";
import useCheckoutStore from "../../../stores/useCheckoutStore";
import api from "../../../services/api";

export default function CheckoutContent() {
  const [paymentMethod, setPaymentMethod] = useState("card"); // ou pix quando tiver
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [cepCity, setCepCity] = useState("");
  const [cepState, setCepState] = useState("");

  const { user } = useAccountStore();
  const { coinQuant, cost } = useCheckoutStore();

  const Navigate = useNavigate();

  const {
    register,
    setValue,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CheckoutSchema),
    defaultValues: {
      name: user?.name,
      lastName: user?.lastName,
      company: user?.company,
      cep: user?.cep,
      tel: user?.cel,
      city: user?.city,
      state: user?.state,
      address: user?.address,
      addressNumber: user?.addressNumber,
      email: user?.email,
    },
  });

  const cep = watch("cep");
  const city = watch("city");
  const state = watch("state");

  useEffect(() => {
    if (coinQuant === 0 && cost === 0) {
      Navigate("/");
    }
  }, [coinQuant, cost]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setValue("name", user.name);
      setValue("lastName", user.lastName);
      setValue("company", user.company);
      setValue("cep", user.cep);
      setValue("tel", user.cel);
      setValue("city", user.city);
      setValue("state", user.state);
      setValue("address", user.address);
      setValue("addressNumber", user.addressNumber);
      setValue("email", user.email);
    }
  }, [user]);

  useEffect(() => {
    if (cep) {
      if (cep.replace("-", "").length === 8) {
        setIsFetching(true);

        axios
          .get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`)
          .then((res) => {
            if (res.data?.erro) {
              console.error(res.data);

              setError("cep", { type: "custom", message: "Cep inválido" });
              setValue("address", "");
              setValue("city", "");
              setValue("state", "");
              setCepCity("");
              setCepState("");
              setIsFetching(false);
              return;
            }

            const logradouro = res.data.logradouro;
            const uf = res.data.uf;
            const localidade = res.data.localidade;

            clearErrors("cep");
            setValue("address", logradouro);
            setValue("city", localidade);
            setValue("state", uf);
            setCepCity(localidade);
            setCepState(uf);
          })
          .catch((error) => {
            console.error(error);

            setError("cep", { type: "custom", message: "Cep inválido" });
            setValue("address", "");
            setValue("city", "");
            setValue("state", "");
            setCepCity("");
            setCepState("");
            setIsFetching(false);
          })
          .finally(() => setIsFetching(false));
      }
    }
  }, [cep, setValue]);

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

    setValue("tel", cel);
  };

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    if (cepCity !== city || cepState !== state) {
      if (cepCity !== city) {
        setError("city", {
          type: "custom",
          message: "Cidade diferente do cep cadastrado",
        });
      }

      if (cepState !== state) {
        setError("state", {
          type: "custom",
          message: "Estado diferente do cep cadastrado",
        });
      }

      setIsSubmitting(false);

      return;
    }

    clearErrors();

    const { url } = await api
      .post("/payment/create-checkout-session", {
        coinQuant,
        actualEnv: import.meta.env.MODE,
        name: getValues("name"),
        lastName: getValues("lastName"),
        company: getValues("company"),
        cep: getValues("cep"),
        tel: getValues("tel"),
        city: getValues("city"),
        state: getValues("state"),
        address: getValues("address"),
        addressNumber: getValues("addressNumber"),
        email: getValues("email"),
        id: user?._id,
        paymentMethod,
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);

        toast.error("Ocorreu um erro, tente novamente", {
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

    if (!url) {
      return;
    }

    window.location = url;
  };

  return (
    <section className="checkout">
      <div className="checkout-header">
        <h2 className="header-title">Resumo da Compra</h2>
      </div>
      <div className="checkout-body">
        <form className="checkout-form wrapper" onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-form-wrapper">
            <h3 className="form-title">Confirme as informações abaixo</h3>
            <div className="dual-input-wrapper">
              <div className="input-wrapper">
                <label className="label" htmlFor="name">
                  Nome *
                </label>
                <input
                  {...register("name")}
                  disabled={isFetching || isSubmitting}
                  type="text"
                  className="input"
                  id="name"
                  name="name"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.name ? { borderColor: "rgb(243, 50, 50)" } : {}}
                />
                {errors.name && <span className="error-message">{errors.name?.message}</span>}
              </div>
              <div className="input-wrapper">
                <label className="label" htmlFor="lastName">
                  Sobrenome *
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  disabled={isFetching || isSubmitting}
                  className="input"
                  id="lastName"
                  name="lastName"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.lastName ? { borderColor: "rgb(243, 50, 50)" } : {}}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName?.message}</span>
                )}
              </div>
            </div>
            <div className="input-wrapper">
              <label className="label" htmlFor="company">
                Nome da empresa (opcional)
              </label>
              <input
                {...register("company")}
                type="text"
                disabled={isFetching || isSubmitting}
                className="input"
                id="company"
                name="company"
                autoComplete="off"
                autoCorrect="off"
                style={errors.company ? { borderColor: "rgb(243, 50, 50)" } : {}}
              />
              {errors.company && <span className="error-message">{errors.company?.message}</span>}
            </div>
            <div className="dual-input-wrapper">
              <div className="input-wrapper">
                <label className="label" htmlFor="cep">
                  CEP *
                </label>
                <input
                  {...register("cep")}
                  type="text"
                  disabled={isFetching || isSubmitting}
                  className="input"
                  id="cep"
                  name="cep"
                  autoComplete="off"
                  autoCorrect="off"
                  maxLength={8}
                  onChange={handleCepChange}
                  style={errors.cep ? { borderColor: "rgb(243, 50, 50)" } : {}}
                />
                {errors.cep && <span className="error-message">{errors.cep?.message}</span>}
              </div>
              <div className="input-wrapper">
                <label className="label" htmlFor="tel">
                  Telefone *
                </label>
                <input
                  {...register("tel")}
                  type="text"
                  disabled={isFetching || isSubmitting}
                  className="input"
                  id="tel"
                  name="tel"
                  autoComplete="off"
                  autoCorrect="off"
                  maxLength={15}
                  onChange={handleCel}
                  style={errors.tel ? { borderColor: "rgb(243, 50, 50)" } : {}}
                />
                {errors.tel && <span className="error-message">{errors.tel?.message}</span>}
              </div>
            </div>
            <div className="dual-input-wrapper">
              <div className="input-wrapper">
                <label className="label" htmlFor="city">
                  Cidade *
                </label>
                <input
                  {...register("city")}
                  type="text"
                  disabled={isFetching || isSubmitting}
                  className="input"
                  id="city"
                  name="city"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.city ? { borderColor: "rgb(243, 50, 50)" } : {}}
                />
                {errors.city && <span className="error-message">{errors.city?.message}</span>}
              </div>
              <div className="input-wrapper">
                <label className="label" htmlFor="state">
                  Estado *
                </label>
                <input
                  {...register("state")}
                  type="text"
                  disabled={isFetching || isSubmitting}
                  className="input"
                  id="state"
                  name="state"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.state ? { borderColor: "rgb(243, 50, 50)" } : {}}
                />
                {errors.state && <span className="error-message">{errors.state?.message}</span>}
              </div>
            </div>
            <div className="dual-input-wrapper">
              <div className="input-wrapper">
                <label className="label" htmlFor="address">
                  Endereço *
                </label>
                <input
                  {...register("address")}
                  type="text"
                  disabled={isFetching || isSubmitting}
                  className="input"
                  id="address"
                  name="address"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.address ? { borderColor: "rgb(243, 50, 50)" } : {}}
                />
                {errors.address && <span className="error-message">{errors.address?.message}</span>}
              </div>
              <div className="input-wrapper">
                <label className="label" htmlFor="addressNumber">
                  Número do Endereço *
                </label>
                <input
                  {...register("addressNumber")}
                  type="text"
                  disabled={isFetching || isSubmitting}
                  className="input"
                  id="addressNumber"
                  name="addressNumber"
                  autoComplete="off"
                  autoCorrect="off"
                  style={errors.addressNumber ? { borderColor: "rgb(243, 50, 50)" } : {}}
                />
                {errors.addressNumber && (
                  <span className="error-message">{errors.addressNumber?.message}</span>
                )}
              </div>
            </div>
            <div className="input-wrapper">
              <label className="label" htmlFor="email">
                Email *
              </label>
              <input
                {...register("email")}
                type="text"
                disabled={isFetching || isSubmitting}
                className="input"
                id="email"
                name="email"
                autoComplete="off"
                autoCorrect="off"
                style={errors.email ? { borderColor: "rgb(243, 50, 50)" } : {}}
              />
              {errors.email && <span className="error-message">{errors.email?.message}</span>}
            </div>
          </div>
          <div className="resume-wrapper">
            <div className="resume-box">
              <h4 className="resume-box-title">Sua compra</h4>
              <div className="top-label-wrapper">
                <span className="product-label">Produto</span>
                <span className="value-label">Valor</span>
              </div>
              <div className="products-wrapper">
                <span className="product">Pacote de {coinQuant} moedas</span>
                <span className="value">R$ {cost},00</span>
              </div>
              <div className="total-wrapper">
                <span className="total">Total</span>
                <span className="total-value">R$ {cost},00</span>
              </div>
            </div>
            <div className="payment-method-box">
              <div className="payment-method-wrapper">
                <div className="payment-method">
                  <input
                    type="radio"
                    disabled={isFetching || isSubmitting}
                    className="payment-method-radio"
                    name="paymentType"
                    id="card"
                    autoComplete="off"
                    autoCorrect="off"
                    defaultChecked
                    value="card"
                    onChange={handlePaymentMethod}
                  />
                  <label className="payment-method-label" htmlFor="card">
                    Cartão de crédito
                  </label>
                </div>
                <div className="payment-method">
                  <input
                    type="radio"
                    // disabled={isFetching || isSubmitting}
                    className="payment-method-radio"
                    name="paymentType"
                    id="pix"
                    autoComplete="off"
                    autoCorrect="off"
                    value="pix"
                    onChange={handlePaymentMethod}
                    disabled
                  />
                  <label className="payment-method-label" htmlFor="pix">
                    Pix <strong className="notice">(Em breve)</strong>
                  </label>
                </div>
              </div>
              <button className="submit-btn" disabled={isFetching || isSubmitting} type="submit">
                Comprar
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
