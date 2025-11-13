'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export const Header = () => {
    const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

    useEffect(() => {
        // Generate random values only on client side to avoid hydration mismatch
        setParticles(
            Array.from({ length: 20 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                delay: `${Math.random() * 3}s`,
                duration: `${3 + Math.random() * 2}s`,
            }))
        );
    }, []);

    return (
        <header className="relative overflow-hidden mb-12">
            {/* Banner Image with Overlay */}
            <div className="relative h-64 md:h-80 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
                <Image
                    src="/portal-banner.jpg"
                    alt="Rick and Morty Portal"
                    fill
                    className="object-cover animate-fade-in"
                    priority
                    sizes="100vw"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
                    <div className="text-center space-y-4 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary animate-glow-pulse p-2 rounded-lg">
                            Rick and Morty
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 font-medium">
                            Character Explorer
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            <span>Explore the Multiverse</span>
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 z-[5]">
                    {particles.map((particle, i) => (
                        <div
                            key={i}
                            className="absolute h-1 w-1 bg-primary/30 rounded-full animate-float"
                            style={{
                                left: particle.left,
                                top: particle.top,
                                animationDelay: particle.delay,
                                animationDuration: particle.duration,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </header>
    );
};
