import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import SetAvatarContainer from "./containers/SetAvatarContainer";
import Swal from "sweetalert2";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/4645646";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  });

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      Toast.fire({
        icon: "error",
        title: "Proszę o wybranie avatara",
      });
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        Toast.fire({
          icon: "error",
          title: "Error przy wyborze avatara. Spróbuj ponownie. ",
        });
      }
    }
  };
  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      {isLoading ? (
        <SetAvatarContainer>
          <img src={loader} alt="loader" className="loader" />
        </SetAvatarContainer>
      ) : (
        <SetAvatarContainer>
          <div className="title-container">
            <h1>Wybierz swój avatar.</h1>
          </div>
          <div className="avatars">
            {avatars?.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data: image/svg+xml;base64, ${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Ustaw avatar
          </button>
        </SetAvatarContainer>
      )}
      ;
    </>
  );
}
