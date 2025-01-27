// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';

export const metadata = {
    title: 'Blog App',
    description: 'A simple blog app built with Next.js and GraphQL',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow container mx-auto p-4">{children}</main>
                    <footer className="bg-gray-800  text-center p-4">
                        Footer content here
                    </footer>
                </div>
            </body>
        </html>
    );
}
