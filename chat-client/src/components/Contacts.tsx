import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

interface ContactsProps {
  contacts: any[];
  currentUser: any;
  currentChat:any;
  chatChange:(chat:any)=>void
}

const Contacts: React.FC<ContactsProps> = ({ 
    currentUser, 
    contacts,
    currentChat,
    chatChange
 }) => {
    console.log('currentUser',currentUser);
    console.log('contacts',contacts);
    
    
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [currentUserImage, setCurrentUserImage] = useState<string>('');
  const [currentUserSelected, setCurrentUserSelected] = useState<number | null>(null);

  useEffect(() => {
    console.log(contacts);
    
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index: number, contact: any) => {
       setCurrentUserSelected(index);
       chatChange(contact);

  }

  

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>Snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                    index === currentUserSelected ? 'selected' : ''
                }`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
 .contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  gap: 0.8rem;
  width: 100%;

  /* עיצוב פס הגלילה */
  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff39;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  .contact {
    background-color: #ffffff39;
    min-height: 5rem;
    width: 90%;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;

    .avatar {
      img {
        height: 3rem;
      }
    }

    .username {
      h3 {
        color: white;
      }
    }
  }

  .selected {
    background-color: #9a86f3;
  }
}
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 1rem;
          }
        }
      }
  }
`;

export default Contacts;
