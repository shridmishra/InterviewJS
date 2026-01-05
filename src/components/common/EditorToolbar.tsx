import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
    FiSettings,
    FiMoon,
    FiSun,
    FiType,
    FiMinimize,
    FiMaximize,
    FiAlignLeft, // Word wrap icon approximation
    FiCopy,
    FiDownload,
    FiRefreshCw, // Reset
    FiCode, // Format
    FiCheck // Format success
} from 'react-icons/fi';
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa'; // Minimap
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EditorSettings {
    theme: 'vs-dark' | 'light';
    fontSize: number;
    minimap: boolean;
    wordWrap: 'on' | 'off';
}

interface EditorToolbarProps {
    settings: EditorSettings;
    onSettingChange: (key: keyof EditorSettings, value: any) => void;
    onFormat: () => void;
    onCopy: () => void;
    onDownload: () => void;
    onReset: () => void;
    language: string;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
    settings,
    onSettingChange,
    onFormat,
    onCopy,
    onDownload,
    onReset,
    language
}) => {
    return (
        <div className="flex items-center justify-between p-2 border-b border-border bg-muted/20">
            <div className="flex items-center gap-1">
                {/* Language Indicator (ReadOnly for now) */}
                <div className="flex items-center gap-2 px-3 py-1.5 mr-2 text-xs font-medium rounded-md bg-primary/10 text-primary uppercase select-none">
                    {language === 'javascript' ? 'JS' : language}
                </div>

                {/* Format */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onFormat} className="h-8 w-8">
                                <FiCode className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Format Code</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>

            <div className="flex items-center gap-1">
                {/* Copy */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onCopy} className="h-8 w-8">
                                <FiCopy className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy Code</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Download */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onDownload} className="h-8 w-8">
                                <FiDownload className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download File</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Reset */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onReset} className="h-8 w-8 text-destructive hover:text-destructive">
                                <FiRefreshCw className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reset Code</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div className="w-px h-4 bg-border mx-1" />

                {/* Settings Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FiSettings className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Editor Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {/* Theme */}
                        <DropdownMenuItem onClick={() => onSettingChange('theme', settings.theme === 'vs-dark' ? 'light' : 'vs-dark')}>
                            {settings.theme === 'vs-dark' ? <FiLazyMoon className="mr-2 h-4 w-4" /> : <FiSun className="mr-2 h-4 w-4" />}
                            <span>Theme: {settings.theme === 'vs-dark' ? 'Dark' : 'Light'}</span>
                        </DropdownMenuItem>

                        {/* Font Size */}
                        <div className="flex items-center justify-between px-2 py-1.5 text-sm">
                            <div className="flex items-center">
                                <FiType className="mr-2 h-4 w-4" />
                                <span>Font Size</span>
                            </div>
                            <div className="flex items-center gap-1 border rounded-md">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onSettingChange('fontSize', Math.max(10, settings.fontSize - 1)); }}
                                    className="h-6 w-6 flex items-center justify-center hover:bg-muted"
                                >-</button>
                                <span className="w-6 text-center text-xs">{settings.fontSize}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onSettingChange('fontSize', Math.min(24, settings.fontSize + 1)); }}
                                    className="h-6 w-6 flex items-center justify-center hover:bg-muted"
                                >+</button>
                            </div>
                        </div>

                        {/* Minimap */}
                        <DropdownMenuItem onClick={() => onSettingChange('minimap', !settings.minimap)}>
                            {settings.minimap ? <FaCompressArrowsAlt className="mr-2 h-4 w-4" /> : <FaExpandArrowsAlt className="mr-2 h-4 w-4" />}
                            <span>Minimap: {settings.minimap ? 'Show' : 'Hide'}</span>
                        </DropdownMenuItem>

                        {/* Word Wrap */}
                        <DropdownMenuItem onClick={() => onSettingChange('wordWrap', settings.wordWrap === 'on' ? 'off' : 'on')}>
                            <FiAlignLeft className="mr-2 h-4 w-4" />
                            <span>Word Wrap: {settings.wordWrap === 'on' ? 'On' : 'Off'}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

// Helper for Theme Icon in Menu (Simulated since we can't define component inside component easily in one file without export or cleaner structure, but this is fine)
const FiLazyMoon = (props: any) => <FiMoon {...props} />

export default EditorToolbar;
