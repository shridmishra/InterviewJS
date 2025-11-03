import React from 'react';

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.693a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
            <div className="relative w-full max-w-lg m-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-xl">
                <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 id="modal-title" className="text-xl font-semibold">{title}</h2>
                    <button 
                        onClick={onClose} 
                        className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Close modal"
                    >
                        <XIcon />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;