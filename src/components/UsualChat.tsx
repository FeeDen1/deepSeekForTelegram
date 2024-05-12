import {FC, useEffect, useRef, useState} from "react";
import Input from "./Input.tsx";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {addMessagesUsual} from "../store/usualManagement/usualSlice.ts";



const UsualChat:FC = () => {

    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch()
    let {messages} = useAppSelector(state => state.usual)
    let changableMessages = messages
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setInputValue(event.target.value);
    };


    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Функция для прокрутки до последнего сообщения
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    // Прокручиваем вниз при загрузке компонента
    useEffect(() => {
        scrollToBottom();
    }, []); // Пустой массив зависимостей означает, что эффект будет выполнен только при первом рендере


    const handleSend: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            dispatch(addMessagesUsual({content: inputValue, role: 'user'}))
            changableMessages = [...changableMessages, {content: inputValue, role: 'user'}]
            let data = JSON.stringify({
                "messages": changableMessages,
                "model": "deepseek-chat",
                "frequency_penalty": 0,
                "max_tokens": 2048,
                "presence_penalty": 0,
                "stop": null,
                "stream": false,
                "temperature": 1,
                "top_p": 1,
                "logprobs": false,
                "top_logprobs": null
            })
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.deepseek.com/chat/completions',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer sk-ce82dba662c84578a3ca151444144826`
                },
                data : data
            };
            axios(config)
                .then((response) => {
                    dispatch(addMessagesUsual({content: response.data.choices[0].message.content, role: response.data.choices[0].message.role}))
                    changableMessages = [...changableMessages, {content: response.data.choices[0].message.content, role: response.data.choices[0].message.role}]
                })
                .catch((error) => {
                    console.log(error);
                });
            setInputValue('');
            // Simulate a response from the bot
        }
    };


    return (
        <div className="max-w-md mx-auto mt-5 p-3 bg-white rounded-lg shadow-md">
            <div
                ref={messagesContainerRef}
                className="h-80 mb-4 overflow-y-auto">
                {changableMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-2 rounded-md text-white ${
                            message.role === 'user' ? 'self-end bg-blue-500' : 'self-start bg-gray-300'
                        }`}
                    >
                        {message.content}
                    </div>
                ))}

            </div>
            <Input
                label="Your Message"
                placeholder="Type a message..."
                value={inputValue}
                onChange={handleInputChange}
                onSend={handleSend}
            />
        </div>
    );
};

export default UsualChat;