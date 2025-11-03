import React, { useState } from 'react';
import { Problem } from '../types';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface NotesModalProps {
    problem: Problem;
    onClose: () => void;
    onSave: (notes: string) => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ problem, onClose, onSave }) => {
    const [notes, setNotes] = useState(problem.notes || '');

    const handleSave = () => {
        onSave(notes);
        onClose();
    };

    return (
        <Modal title={`Notes for "${problem.title}"`} onClose={onClose}>
            <div className="flex flex-col gap-4">
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={8}
                    className="w-full p-2 font-mono text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md resize-y focus:outline-none focus:ring-1 focus:ring-yellow-500 text-gray-900 dark:text-gray-200"
                    placeholder="Add your notes here..."
                />
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
        </Modal>
    );
};

export default NotesModal;