import React, {ChangeEventHandler, MouseEventHandler} from 'react';

interface InputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onSend: MouseEventHandler<HTMLButtonElement>;

}

const Input: React.FC<InputProps> = ({ label, placeholder, value, onChange , onSend }) => {
    return (
        <div className="mb-4 flex">
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={label}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onSend}
            >
                Send
            </button>

        </div>

    );
};

export default Input;