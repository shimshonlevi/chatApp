import React , { useState ,useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute } from '../utils/APIRoutes'
import {User} from '../types/types'
import Contacts from './Contacts'

const Chat = () => {
  const navigate = useNavigate();
  const [contacts , setContacts] = useState([])
  const [currentUser , setCurrentUser] = useState<User | undefined>(undefined)
  const [currentChat , setCurrentChat] = useState<User | undefined>(undefined)
  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        const user = await JSON.parse(localStorage.getItem('chat-app-user')!);
        setCurrentUser(user);
      }
    };
    fetchUser();
  }, []);
  
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate('/setAvatar');
        }
      }
    };
    fetchContacts();
  }, [currentUser]);
  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
    
  }

  return (
    <Container>
      <div className="container">
      <Contacts
  contacts={contacts}
  currentUser={currentUser}
  currentChat={currentChat}
  chatChange={handleChatChange}
/>      </div>
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;

.container{
height: 85vh;
width: 85vw;
background-color: #00000076;
display: grid;
grid-template-columns: 25% 75%;
@media screen and (min-width: 720px) and (max-width: 1080px) {
grid-template-columns: 30% 70%;
  
}
overflow: hidden;
border-radius: 2rem;
}
`

export default Chat