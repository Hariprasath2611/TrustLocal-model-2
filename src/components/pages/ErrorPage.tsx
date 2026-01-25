import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-lg mb-6">Sorry, an unexpected error has occurred.</p>
            <p className="text-secondary-foreground mb-8">
                {isRouteErrorResponse(error)
                    ? `${error.status} ${error.statusText}`
                    : error instanceof Error
                        ? error.message
                        : 'Unknown Error'}
            </p>
            <Link to="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Go Home
            </Link>
        </div>
    );
}
