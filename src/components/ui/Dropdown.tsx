
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

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
    <div className="relative font-nunito" ref={dropdownRef}>
      <div
        onClick={handleToggle}
        onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
        role="button"
        tabIndex={0}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      {isOpen && (
        <div className={cn(
          "absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a2c35] rounded-xl shadow-[0_4px_0_#e5e5e5] dark:shadow-[0_4px_0_#37464f] z-20 border-2 border-[#e5e5e5] dark:border-[#37464f]",
          "animate-in fade-in zoom-in-95 duration-200"
        )}>
          {children(close)}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
