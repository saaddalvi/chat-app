import { useState, useEffect } from "react";
import { WS_URL } from "../confing";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const ws = new WebSocket(`${WS_URL}?token=${token}`);
            ws.onopen = () => {
                setLoading(false);
                setSocket(ws);
            };
        } else {
            setLoading(false);
            console.error("Token not found in local storage");
        }
    }, []);

    return { socket, loading };
}