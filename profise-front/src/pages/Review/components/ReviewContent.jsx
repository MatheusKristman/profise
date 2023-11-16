/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useQuery from "../../../hooks/useQuery";
import api from "../../../services/api";
import useIsUserLogged from "../../../hooks/useIsUserLogged";

function ReviewContent({ setIsLoading, setIsAnimationActive }) {
  useIsUserLogged();

  const [rate, setRate] = useState(0);
  const [details, setDetails] = useState("");
  const [isSubmitEnable, setIsSubmitEnable] = useState(false);
  const [userId, setUserId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [professional, setProfessional] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const query = useQuery();

  const Navigate = useNavigate();

  useEffect(() => {
    setUserId(query.get("id"));
    setOrderId(query.get("order"));
  }, [query, setUserId, setOrderId]);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      setIsAnimationActive(true);
      api
        .post("/professional/reviewed-professional", { id: userId })
        .then((res) => {
          setProfessional(res.data);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsAnimationActive(false);

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  }, [userId, orderId]);

  useEffect(() => {
    let url = "";

    if (professional.profileImage) {
      if (
        JSON.stringify(import.meta.env.MODE) === JSON.stringify("development")
      ) {
        url = `${import.meta.env.VITE_API_KEY_DEV}${
          import.meta.env.VITE_API_PORT
        }/profile-image/${professional.profileImage}`;
      } else {
        url = `${import.meta.env.VITE_API_KEY}/profile-image/${
          professional.profileImage
        }`;
      }
    } else {
      url = null;
    }

    setProfileImageUrl(url);
  }, [professional]);

  useEffect(() => {
    if (rate > 0) {
      setIsSubmitEnable(false);
    } else {
      setIsSubmitEnable(true);
    }
  }, [rate]);

  function handleComment(event) {
    setDetails(event.target.value);
  }

  function handleSubmit() {
    if (rate === 0) {
      return;
    }

    setIsSubmitting(true);

    api
      .post("/professional/send-review", { userId, orderId, rate, details })
      .then((res) => {
        if (res.data.sended) {
          Navigate("/avaliacao-enviada");
        }
      })
      .catch((error) => {
        console.log(error);

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
      .finally(() => setIsSubmitting(false));
  }

  return (
    <section className="review-container">
      <div className="review-wrapper">
        <h3 className="review-title">Compartilhe Sua Experiência</h3>

        <p className="review-desc">
          Avalie o profissional que atendeu você e ajude-nos a manter a
          excelência no Profise. Sua voz é importante, e sua avaliação é valiosa
          para nós e para a comunidade.
        </p>

        {Object.keys(professional).length !== 0 && (
          <div className="professional-wrapper">
            <div className="professional-image-box">
              <img
                src={profileImageUrl}
                alt="Profissional"
                className="professional-image"
              />
            </div>

            <h4 className="professional-name">{professional.name}</h4>

            <span className="professional-category">{`${professional.category} / ${professional.subCategory}`}</span>

            <div className="rate-wrapper">
              <span onClick={() => setRate(1)} className="rate">
                {rate >= 1 ? (
                  <i className="fa-solid fa-star" />
                ) : (
                  <i className="fa-regular fa-star" />
                )}
              </span>

              <span onClick={() => setRate(2)} className="rate">
                {rate >= 2 ? (
                  <i className="fa-solid fa-star" />
                ) : (
                  <i className="fa-regular fa-star" />
                )}
              </span>

              <span onClick={() => setRate(3)} className="rate">
                {rate >= 3 ? (
                  <i className="fa-solid fa-star" />
                ) : (
                  <i className="fa-regular fa-star" />
                )}
              </span>

              <span onClick={() => setRate(4)} className="rate">
                {rate >= 4 ? (
                  <i className="fa-solid fa-star" />
                ) : (
                  <i className="fa-regular fa-star" />
                )}
              </span>

              <span onClick={() => setRate(5)} className="rate">
                {rate >= 5 ? (
                  <i className="fa-solid fa-star" />
                ) : (
                  <i className="fa-regular fa-star" />
                )}
              </span>
            </div>

            <textarea
              className="review-comment-input"
              value={details}
              onChange={handleComment}
              placeholder="Digite seu comentário..."
              autoComplete="off"
              autoCorrect="off"
            />

            <button
              type="button"
              disabled={isSubmitEnable || isSubmitting}
              onClick={handleSubmit}
              className="review-send-btn"
            >
              Enviar avaliação
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReviewContent;
