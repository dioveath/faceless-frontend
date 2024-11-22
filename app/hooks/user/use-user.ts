import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        // Get initial user
        const initUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
                const { data: { session } } = await supabase.auth.getSession();
                const accessToken = session?.access_token ?? null;
            } catch (error) {
                console.error('Error loading user:', error);
            } finally {
                setLoading(false);
            }
        };

        initUser();

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return {
        user,
        loading,
        isAuthenticated: !!user,
    };
};