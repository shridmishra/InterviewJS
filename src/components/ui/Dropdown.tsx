
import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  trigger: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={handleToggle} 
        onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
        role="button"
        tabIndex={0}
      >
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-popover rounded-md shadow-lg z-20 border border-border">
          {children(close)}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
