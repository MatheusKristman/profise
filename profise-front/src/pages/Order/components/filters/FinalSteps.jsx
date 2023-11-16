/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import CepCoords from "coordenadas-do-cep";

import Buttons from "../Buttons";
import useOrderStore from "../../../../stores/useOrderStore";

function FinalSteps({
  indexPage,
  handleBackBtn,
  filterData,
  setFilterData,
  setIsLoadingAnimationActive,
}) {
  const [cep, setCep] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isCepValid, setIsCepValid] = useState(false);
  const [cepError, setCepError] = useState({
    exists: false,
    message: "",
  });
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameError, setNameError] = useState({
    exists: false,
    message: "",
  });
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState({
    exists: false,
    message: "",
  });
  const [contact, setContact] = useState("");
  const [isContactValid, setIsContactValid] = useState(false);
  const [contactError, setContactError] = useState({
    exists: false,
    message: "",
  });
  const [isPoliticsChecked, setPoliticsChecked] = useState(false);
  const [politicsCheckError, setPoliticsCheckError] = useState({
    exists: false,
    message: "",
  });

  const {
    isLoading,
    setToLoad,
    setToNotLoad,
    setFilter,
    openSMSToken,
    setCel,
  } = useOrderStore();

  useEffect(() => {
    if (cep.replace("-", "").length === 8) {
      setToLoad();
      setIsLoadingAnimationActive(true);

      axios
        .get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`)
        .then(async (res) => {
          if (res.data?.erro) {
            setAddress("");
            setCity("");
            setState("");
            setCepError({
              exists: true,
              message: "CEP invalido, verifique e tente novamente",
            });
            setIsCepValid(false);
          } else {
            const logradouro = res.data.logradouro;
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
                setLat(res.data.results[0].geometry.location.lat);
                setLong(res.data.results[0].geometry.location.lng);
                setAddress(logradouro);
                setCity(uf);
                setState(localidade);

                setCepError({
                  exists: false,
                  message: "",
                });
                setIsCepValid(true);
              })
              .catch((error) => {
                console.error(error);

                setAddress("");
                setCity("");
                setState("");
                setCepError({
                  exists: true,
                  message:
                    "Ocorreu um erro durante a busca do cep, tente novamente mais tarde.",
                });
                setIsCepValid(false);
                toast.error(
                  "Ocorreu um erro durante a busca do cep, tente novamente mais tarde.",
                  {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  }
                );
              })
              .finally(() => {
                setIsLoadingAnimationActive(false);

                setTimeout(() => {
                  setToNotLoad();
                }, 1000);
              });
          }
        })
        .catch((error) => {
          console.error(error);

          setAddress("");
          setCity("");
          setState("");
          setCepError({
            exists: true,
            message:
              "Ocorreu um erro durante a busca do cep, tente novamente mais tarde.",
          });
          setIsCepValid(false);
          toast.error(
            "Ocorreu um erro durante a busca do cep, tente novamente mais tarde.",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );

          setIsLoadingAnimationActive(false);

          setTimeout(() => {
            setToNotLoad();
          }, 1000);
        });
    }
  }, [cep]);

  function handleCep(event) {
    let cepValue = event.target.value.replace(/\D/g, "");

    if (cepValue.length === 8) {
      cepValue = cepValue.replace(/(\d{5})(\d)/, "$1-$2");
    }

    setCep(cepValue);
  }

  function checkCep() {
    if (cep.length === 0 || lat.length === 0 || long.length === 0) {
      {
        setIsCepValid(false);
        setCepError({
          exists: false,
          message: "",
        });
      }
    }
  }

  function handleName(event) {
    setName(event.target.value);
  }

  function checkName() {
    if (name.length === 0) {
      setIsNameValid(false);
      setNameError({
        exists: false,
        message: "",
      });

      return;
    }

    if (name.length > 5) {
      if (name.split(" ").length > 1) {
        setIsNameValid(true);
        setNameError({
          exists: false,
          message: "",
        });
        return;
      } else {
        setIsNameValid(false);
        setNameError({
          exists: true,
          message: "Insira o nome completo",
        });
        return;
      }
    } else {
      setIsNameValid(false);
      setNameError({
        exists: true,
        message: "Nome invalido, verifique e tente novamente",
      });
      return;
    }
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  function checkEmail() {
    if (email.length === 0) {
      setIsEmailValid(false);
      setEmailError({
        exists: false,
        message: "",
      });

      return;
    }

    const isEmailValid = validateEmail(email);

    if (isEmailValid) {
      setIsEmailValid(true);
      setEmailError({
        exists: false,
        message: "",
      });
    } else {
      setIsEmailValid(false);
      setEmailError({
        exists: true,
        message: "Email invalido, verifique e tente novamente",
      });
      return;
    }
  }

  function handleContact(event) {
    let celValue = event.target.value.replace(/\D/g, "");

    if (celValue.length <= 11) {
      celValue = celValue.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
    } else {
      return;
    }

    setContact(celValue);
  }

  function checkContact() {
    if (contact.length === 0) {
      setIsContactValid(false);
      setContactError({
        exists: false,
        message: "",
      });

      return;
    }

    if (contact.length > 14) {
      setIsContactValid(true);
      setContactError({
        exists: false,
        message: "",
      });
    } else {
      setIsContactValid(false);
      setContactError({
        exists: true,
        message: "Celular invalido, verifique e tente novamente",
      });
    }
  }

  function handlePoliticsCheck() {
    setPoliticsChecked((prev) => !prev);
  }

  function handleFinishBtn() {
    if (isPoliticsChecked) {
      setPoliticsCheckError({ exists: false, message: "" });

      if (
        cep.length === 0 ||
        lat.length === 0 ||
        long.length === 0 ||
        name.length === 0 ||
        email.length === 0 ||
        contact.length === 0
      ) {
        if (cep.length === 0 || lat.length === 0 || long.length === 0) {
          setIsCepValid(false);
          setCepError({
            exists: true,
            message: "Cep é obrigatório",
          });
        }

        if (name.length === 0) {
          setIsNameValid(false);
          setNameError({
            exists: true,
            message: "Nome completo é obrigatório",
          });
        }

        if (email.length === 0) {
          setIsEmailValid(false);
          setEmailError({
            exists: true,
            message: "Email é obrigatório",
          });
        }

        if (contact.length === 0) {
          setIsContactValid(false);
          setContactError({
            exists: true,
            message: "Contato é obrigatório",
          });
        }

        return;
      }

      if (isCepValid && isNameValid && isEmailValid && isContactValid) {
        const filter = {
          ...filterData,
          requesterLocation: { cep, lat, long },
          requesterName: name,
          requesterEmail: email,
          requesterContact: contact,
        };

        setFilterData(filter);
        setCel(contact);
        setFilter(filter);
        openSMSToken();
      } else {
        if (!isCepValid) {
          setCepError({
            exists: true,
            message: "Cep inválido, verifique e tente novamente",
          });
        }

        if (!isNameValid) {
          setNameError({
            exists: true,
            message: "Nome inválido, verifique e tente novamente",
          });
        }

        if (!isEmailValid) {
          setEmailError({
            exists: true,
            message: "Email inválido, verifique e tente novamente",
          });
        }

        if (!isContactValid) {
          setContactError({
            exists: true,
            message: "Contato inválido, verifique e tente novamente",
          });
        }

        return;
      }
    } else {
      setPoliticsCheckError({ exists: true, message: "Campo obrigatório" });
    }
  }

  return (
    <div className="order__container__filter-container__box__finishing-questions-wrapper">
      <h2 className="order__container__filter-container__box__finishing-questions-wrapper__title">
        Estamos quase finalizando
      </h2>
      <span className="order__container__filter-container__box__finishing-questions-wrapper__desc">
        Informe os dados a seguir para facilitar a busca de um profissional para
        você.
      </span>

      <div className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper">
        <div className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__label-wrapper">
          <label
            htmlFor="cep"
            className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__label-wrapper__label"
          >
            CEP
          </label>

          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            rel="noreferrer noopener"
            className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__label-wrapper__link"
          >
            Não lembra seu CEP?
          </a>
        </div>

        <input
          type="text"
          name="cep"
          id="cep"
          placeholder="00000-000"
          autoComplete="off"
          autoCorrect="off"
          maxLength={8}
          value={cep}
          onChange={handleCep}
          onBlur={checkCep}
          style={
            cepError.exists ? { border: "1px solid rgb(243, 50, 50)" } : {}
          }
          className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__input"
        />

        {cep.replace("-", "").length === 8 &&
          !cepError.exists &&
          address !== "" &&
          state !== "" &&
          city !== "" && (
            <span
              className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__result"
              style={isLoading ? { display: "none" } : { display: "block" }}
            >
              {cep.replace("-", "").length === 8 &&
              !cepError.exists &&
              address !== "" &&
              state !== "" &&
              city !== ""
                ? `${address} - ${state}/${city}`
                : ""}
            </span>
          )}

        {cepError.exists && (
          <span className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__error-message">
            {cepError.message}
          </span>
        )}

        <label
          htmlFor="requesterName"
          className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__label"
        >
          Nome
        </label>
        <input
          type="text"
          name="requesterName"
          id="requesterName"
          autoComplete="off"
          autoCorrect="off"
          value={name}
          onChange={handleName}
          onBlur={checkName}
          style={
            nameError.exists ? { border: "1px solid rgb(243, 50, 50)" } : {}
          }
          className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__input"
        />
        {nameError.exists && (
          <span className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__error-message">
            {nameError.message}
          </span>
        )}

        <label
          htmlFor="requesterEmail"
          className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__label"
        >
          E-mail
        </label>
        <input
          type="text"
          name="requesterEmail"
          id="requesterEmail"
          autoComplete="off"
          autoCorrect="off"
          value={email}
          onChange={handleEmail}
          onBlur={checkEmail}
          style={
            emailError.exists ? { border: "1px solid rgb(243, 50, 50)" } : {}
          }
          className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__input"
        />
        {emailError.exists && (
          <span className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__error-message">
            {emailError.message}
          </span>
        )}

        <label
          htmlFor="requesterContact"
          className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__label"
        >
          DDD + Celular
        </label>
        <input
          type="text"
          name="requesterContact"
          id="requesterContact"
          autoComplete="off"
          autoCorrect="off"
          value={contact}
          onChange={handleContact}
          onBlur={checkContact}
          style={
            contactError.exists ? { border: "1px solid rgb(243, 50, 50)" } : {}
          }
          className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__input"
        />
        {contactError.exists && (
          <span className="order__container__filter-container__box__finishing-questions-wrapper__input-wrapper__error-message">
            {contactError.message}
          </span>
        )}

        <div className="order__container__filter-container__box__finishing-questions-wrapper__politics-confirmation-wrapper">
          <input
            type="checkbox"
            name="politicsConfirmation"
            id="politicsConfirmation"
            autoComplete="off"
            autoCorrect="off"
            checked={isPoliticsChecked}
            onChange={handlePoliticsCheck}
            className="order__container__filter-container__box__finishing-questions-wrapper__politics-confirmation-wrapper__input"
          />
          <label
            htmlFor="politicsConfirmation"
            className="order__container__filter-container__box__finishing-questions-wrapper__politics-confirmation-wrapper__label"
          >
            Li e concordo com a <a href="#">Políticas de Privacidade</a>
          </label>

          {politicsCheckError.exists && (
            <span className="order__container__filter-container__box__finishing-questions-wrapper__politics-confirmation-wrapper__error-message">
              {politicsCheckError.message}
            </span>
          )}
        </div>
      </div>

      <Buttons
        indexPage={indexPage}
        handleBackBtn={handleBackBtn}
        finalStep
        handleFinishBtn={handleFinishBtn}
      />
    </div>
  );
}

export default FinalSteps;
