export default function MessageContainer({ username = "User", message = "[msg content]", time = "[time]", self = false }) {
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
};