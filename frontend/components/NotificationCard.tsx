import React from "react";
export default function NotificationCard({notification }) {
    const { type, user, tweet, date, read } = notification;
    let icon;
    let message; switch (type) {
        case "follow": icon = "user-circle";
            message = `${user} started following you`;
            break;
        case "mention": icon = "at-symbol";
            message = `${user} mentioned you: "${tweet}"`;
            break;
        case "like": icon = "heart"; message = `${user} liked your tweet: "${tweet}"`;
            break;
        default: icon = "bell"; message = `New notification: ${type}`;
    }
    const cardClassNames = read ? "bg-white opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer" : "bg-white hover:bg-gray-100 transition-colors duration-300 cursor-pointer";
    return <div className={cardClassNames}>
        <div className="flex items-center space-x-4 py-4 px-6">
            <div className="bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full">
                <i className={`text-xl text-gray-700 fas fa-${icon}`}></i>
            </div>
            <div className="flex-grow">
                <p className="text-gray-800">
                    <span className="font-bold">{user}</span>
                    {message}
                </p>
                <p className="text-gray-600 text-sm">{date}</p>
            </div>        {!read && (<div className="text-blue-500 font-bold">Mark as read</div>)}
        </div>
    </div>

}