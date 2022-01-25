import { useState } from "react";
import { io } from "socket.io-client";

const Page = () => {
    const
        socket = io(),
        [username, setUsername] = useState("User"),
        [message, setMessage] = useState("");

    function sendMessage() {
        socket.emit('newMsg', {
            sender: username,
            content: message
        })
    }

    const MessageContainer = ({ username = "User", message = "[msg content]", time = "[time]", self = false }) => {
        if (self) return (
            <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                    <p className="text-scheme-light mb-1">{username}</p>
                    <div className="bg-scheme-primary p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">{message}</p>
                    </div>
                    <span className="text-xs text-scheme-light leading-none">{time}</span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
        );
        else return (
            <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                    <p className="text-scheme-light mb-1">{username}</p>
                    <div className="bg-scheme-tertiary text-scheme-light p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">{message}</p>
                    </div>
                    <span className="text-xs text-scheme-light leading-none">{time}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen relative flex">
            <div className="flex flex-col w-5/6 h-5/6 overflow-hidden bg-scheme-secondary text-scheme-dark m-auto shadow-lg shadow-scheme-dark rounded-xl">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    <MessageContainer />
                    <MessageContainer self={true} />
                    <MessageContainer />
                </div>
                
                <div className="bg-scheme-tertiary p-4">
                    <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" />
                </div>
            </div>
        </div>
    )
}

Page.getInitialProps = async (ctx) => {
    return {
        title: "Chat",
    }
}

export default Page;