import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_PROJECT_KEY, import.meta.env.VITE_ANON_KEY);

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          setUser(session?.user || null);
        } catch (error) {
          console.error('Error fetching session:', error);
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
  
      const { subscription } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth event:', event);
        setUser(session?.user || null);
      });
  
      return () => {
        // Check if subscription exists before calling unsubscribe
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; // Display loader or placeholder
    }
  
    return user ? children : <Navigate to="/" />;
  };
  
  export default ProtectedRoute;