import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { Bot, Send, User } from "lucide-react";

function CopilotPage() {

    const [query, setQuery] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text:
                "Hello! I'm your AI Traffic Copilot. Ask me anything about congestion, parking violations, resource allocation, or traffic operations."
        }
    ]);

    const [loading, setLoading] = useState(false);

    async function sendMessage() {

        if (!query.trim()) return;

        const userMessage = {
            sender: "user",
            text: query
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await api.post(
                "/copilot/chat",
                {
                    message: query
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: response.data.answer
                }
            ]);

        }

        catch (err) {

            console.log(err);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Unable to generate a response."
                }
            ]);

        }

        setQuery("");
        setLoading(false);

    }

    return (

        <div className="bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="ml-72 p-10">

                <Navbar
                    title="AI Traffic Copilot"
                    subtitle="Intelligent assistant for traffic operations and resource planning"
                />

                


                {/* Chat Area */}

                <div className="bg-white rounded-3xl shadow-sm mt-8 p-8 min-h-[600px] flex flex-col justify-between">

                    {/* Messages */}

                    <div className="space-y-6 overflow-y-auto">

                        {

                            messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={`flex ${msg.sender === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                        }`}
                                >

                                    <div
                                        className={`max-w-[75%] rounded-3xl p-6 shadow-sm whitespace-pre-wrap leading-8
                    ${msg.sender === "user"
                                                ? "bg-indigo-600 text-white"
                                                : "bg-indigo-50 text-slate-700"
                                            }`}
                                    >

                                        <div className="flex items-center gap-3 mb-3">

                                            {

                                                msg.sender === "user" ?

                                                    <User size={18} />

                                                    :

                                                    <Bot
                                                        size={18}
                                                        className="text-indigo-600"
                                                    />

                                            }

                                            <span className="font-semibold">

                                                {

                                                    msg.sender === "user"

                                                        ? "You"

                                                        : "AI Copilot"

                                                }

                                            </span>

                                        </div>

                                        {msg.text}

                                    </div>

                                </div>

                            ))

                        }

                        {

                            loading &&

                            <div className="flex justify-start">

                                <div className="bg-indigo-50 rounded-3xl p-6 text-slate-500">

                                    Generating response...

                                </div>

                            </div>

                        }

                    </div>


                    {/* Input */}

                    <div className="mt-10 flex gap-5">

                        <input
                            type="text"
                            value={query}
                            placeholder="Ask about traffic congestion, enforcement or resource planning..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    sendMessage();

                                }

                            }}
                            className="
              flex-1
              border-2
              rounded-3xl
              p-5
              outline-none
              text-lg
              "
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-8
              rounded-3xl
              flex
              items-center
              gap-2
              "
                        >

                            <Send size={18} />

                            Send

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CopilotPage;