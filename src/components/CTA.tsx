"use client";

import { Mail, Github, Linkedin, FileText } from "lucide-react";

export default function CTA() {
    return (
        <section className="w-full min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">

            <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-8 tracking-tight">
                If this felt simple, <br />
                <span className="text-gray-500">that was intentional.</span>
            </h2>

            <div className="flex flex-wrap gap-6 justify-center mt-8">
                <a
                    href="#"
                    className="group flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 hover:border-accent/50 transition-all duration-300"
                >
                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-accent" />
                    <span className="text-sm uppercase tracking-wide text-gray-300 group-hover:text-white">Resume</span>
                </a>

                <a
                    href="https://github.com/Abhiii47"
                    target="_blank"
                    className="group flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 hover:border-accent/50 transition-all duration-300"
                >
                    <Github className="w-4 h-4 text-gray-400 group-hover:text-accent" />
                    <span className="text-sm uppercase tracking-wide text-gray-300 group-hover:text-white">GitHub</span>
                </a>

                <a
                    href="https://linkedin.com/in/abhijeet-kadu"
                    target="_blank"
                    className="group flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 hover:border-accent/50 transition-all duration-300"
                >
                    <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-accent" />
                    <span className="text-sm uppercase tracking-wide text-gray-300 group-hover:text-white">LinkedIn</span>
                </a>

                <a
                    href="mailto:abhijeetkadu85@gmail.com"
                    className="group flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 hover:border-accent/50 transition-all duration-300"
                >
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-accent" />
                    <span className="text-sm uppercase tracking-wide text-gray-300 group-hover:text-white">Email</span>
                </a>
            </div>

            <footer className="absolute bottom-6 text-xs text-gray-600 uppercase tracking-widest">
                © 2026 Abhijeet Kadu
            </footer>
        </section>
    );
}
