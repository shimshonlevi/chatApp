import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import Loader from '../assets/loader.gif';
import { toast, ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvarterRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

const SetAvatar: React.FC = () => {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

    const toastOptions: {
        position: ToastPosition;
        autoClose: number;
        pauseOnHover: boolean;
        draggable: boolean;
        theme: string;
    } = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            }
        };
        checkUser();
    }, [navigate]);

    const setProfilePicture = async () => {
        if (selectedAvatar === null) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user')!);
            const { data } = await axios.post(`${setAvarterRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            });
            
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                navigate('/');
            } else {
                toast.error("Error setting avatar. Please try again", toastOptions);
            }
        }
    };

    useEffect(() => {
        async function fetchAvatars() {
            const data: string[] = [];
            for (let index = 0; index < 4; index++) {
                const response = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`,
                    { responseType: 'arraybuffer' }  
                );
                const buffer = Buffer.from(response.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchAvatars();
    }, []);

    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Pick an Avatar as your Profile Picture</h1>
                </div>
                {isLoading ? (
                    <img src={Loader} alt="Loading..." className="loader" />
                ) : (
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <img
                                key={index}
                                src={`data:image/svg+xml;base64,${avatar}`}
                                alt="avatar"
                                className={selectedAvatar === index ? "selected" : ""}
                                onClick={() => setSelectedAvatar(index)}
                            />
                        ))}
                    </div>
                )}
                <button className='submit-btn' onClick={setProfilePicture}>
                    Set as Profile Picture
                </button>
            </Container>
            <ToastContainer />
        </>
    );
};

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .loader {
    width: 100%;
    height: 100%;
  }

  .avatars {
    display: flex;
    gap: 1rem;
    img {
      width: 100px;
      height: 100px;
      cursor: pointer;
      border: 2px solid transparent;
      border-radius: 50%;
    }
    .selected {
      border-color: #4caf50;
    }
  }

  .submit-btn {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;

      &:hover {
        background-color: #997af0;
      }
  }
`;

export default SetAvatar;
