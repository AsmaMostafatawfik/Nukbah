"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }

    if (!loading && isAuthenticated && requiredRoles) {
      const hasRequiredRole = user?.roles.some(role => requiredRoles.includes(role));
      if (!hasRequiredRole) {
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, loading, router, requiredRoles, user?.roles]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (requiredRoles && !user?.roles.some(role => requiredRoles.includes(role))) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <strong>Error:</strong> You don't have permission to access this page
        </div>
      </div>
    );
  }

  return <>{children}</>;
}