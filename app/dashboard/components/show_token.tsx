'use client'

// For testing only
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react";


export default function ShowToken() {
    const supabase = createClient();
    const [token, setToken] = useState('');

    useEffect(() => {
        async function fetchToken() {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error(error);
            } else {
                if (data.session) {
                    setToken(data.session.access_token);
                }
            }
        }
        fetchToken();
    }, []);

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Access Token</h2>
            {token ? (
                <div className="bg-white p-3 rounded border border-gray-300">
                    <p className="text-sm font-mono break-all">{token}</p>
                </div>
            ) : (
                <p className="text-gray-600">Loading token...</p>
            )}
        </div>
    )
}