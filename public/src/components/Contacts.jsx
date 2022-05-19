import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import Logout2 from "./logoutbuttons/Logout2";
import ContactsContainer from "../pages/containers/ContactsContainer";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrnetUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrnetUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <ContactsContainer>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>chappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data: image/svg+xml;base64, ${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data: image/svg+xml;base64, ${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName} </h2>
              <Logout2 />
            </div>  
          </div>

        </ContactsContainer>
      )}
    </>
  );
}
