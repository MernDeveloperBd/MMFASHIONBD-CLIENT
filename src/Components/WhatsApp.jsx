
const WhatsApp = () => {
    return (
        <div>
             <a
                href="https://wa.me/8801749889595?text=Hello%2C%20I%20want%20to%20know%20more%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50"
            >
                <div className="relative flex items-center justify-center">
                    {/* Pulse animation circle */}
                    <span className="absolute inline-flex h-8 w-8 rounded-full bg-green-400 opacity-75 animate-ping"></span>

                    {/* Actual WhatsApp Button */}
                    <div className="relative z-10 flex items-center justify-center h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12.04 2C6.48 2 2 6.49 2 12.04c0 1.85.48 3.6 1.38 5.16L2 22l4.91-1.28c1.53.83 3.25 1.28 5.08 1.28h.01C17.52 22 22 17.51 22 11.96 22 6.49 17.51 2 12.04 2zm.03 18.04c-1.53 0-3.01-.41-4.31-1.17l-.31-.18-2.91.76.78-2.84-.2-.29c-.83-1.25-1.26-2.7-1.26-4.21 0-4.14 3.37-7.51 7.52-7.51 4.15 0 7.52 3.37 7.52 7.51.01 4.15-3.36 7.52-7.51 7.52zm4.15-5.6c-.23-.11-1.36-.67-1.57-.75-.21-.07-.36-.11-.5.11-.15.23-.57.75-.7.9-.13.15-.26.17-.48.06-.23-.11-.96-.35-1.83-1.13-.68-.6-1.13-1.34-1.27-1.56-.13-.23-.01-.35.1-.46.11-.11.23-.26.35-.39.12-.13.16-.22.24-.37.08-.15.04-.28-.02-.39-.07-.11-.5-1.2-.69-1.64-.18-.43-.37-.37-.5-.38-.13-.01-.28-.01-.44-.01s-.4.06-.6.28c-.2.22-.8.78-.8 1.9s.82 2.2.93 2.35c.11.15 1.6 2.44 3.87 3.42.54.23.96.37 1.28.47.54.17 1.03.15 1.42.09.43-.06 1.36-.56 1.55-1.11.19-.54.19-1.01.14-1.11-.06-.1-.21-.15-.43-.26z" />
                        </svg>
                    </div>
                </div>
            </a>

        </div>
    );
};

export default WhatsApp;