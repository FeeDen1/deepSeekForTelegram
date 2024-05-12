import {FC, useEffect, useRef, useState} from "react";
import Input from "./Input.tsx";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {addMessagesCoder} from "../store/coderManagement/coderSlice.ts";



const CodeChat:FC = () => {

    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch()
    let {messages} = useAppSelector(state => state.coder)
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


    // Функция для прокрутки до последнего сообщения

    const handleSend: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            dispatch(addMessagesCoder({content: inputValue, role: 'user'}))
            changableMessages = [...changableMessages, {content: inputValue, role: 'user'}]
            console.log('После Dispatch' + JSON.stringify(changableMessages))
            let data = JSON.stringify({
                "messages": changableMessages,
                "model": "deepseek-coder",
                "frequency_penalty": 0,
                "max_tokens": 2048,
                "presence_penalty": 0,
                "stop": null,
                "stream": false,
                "temperature": 0,
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
                    dispatch(addMessagesCoder({content: response.data.choices[0].message.content, role: response.data.choices[0].message.role}))
                    changableMessages = [...changableMessages, {content: response.data.choices[0].message.content, role: response.data.choices[0].message.role}]
                    console.log(changableMessages)
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

export default CodeChat;