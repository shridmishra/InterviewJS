import React from 'react';
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
            <div className="relative w-full max-w-lg m-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#37464f] bg-white dark:bg-[#1a2c35] text-[#3c3c3c] dark:text-white shadow-[0_8px_0_rgba(0,0,0,0.1)] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between p-6 pb-4">
                    <h2 id="modal-title" className="text-xl font-extrabold tracking-tight">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-[#afafaf] hover:text-[#3c3c3c] dark:hover:text-white hover:bg-[#e5e5e5] dark:hover:bg-[#37464f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1cb0f6]"
                        aria-label="Close modal"
                    >
                        <XIcon className="size-5 stroke-[3]" />
                    </button>
                </div>
                <div className="p-6 pt-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;