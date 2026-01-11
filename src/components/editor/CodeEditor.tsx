import React, { useState, useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import EditorToolbar from './EditorToolbar';
import { toast } from 'sonner';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  className?: string;
  isFullScreen?: boolean;
}

interface EditorSettings {
  theme: 'vs-dark' | 'light';
  fontSize: number;
  minimap: boolean;
  wordWrap: 'on' | 'off';
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  className,
  isFullScreen = false
}) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  // Load settings from localStorage if available, otherwise default
  const [settings, setSettings] = useState<EditorSettings>({
    theme: 'vs-dark',
    fontSize: 14,
    minimap: false,
    wordWrap: 'on',
  });

  // Keep track of focus state to enable scrolling/editing only when focused? 
  // User asked: "when minimized disable the scroll there... when full screen... should be able to scroll"
  // Interpretation: If not full screen, disable scroll (scrollbar.handleMouseWheel: false?)
  // But user still needs to edit. Maybe just "scrollBeyondLastLine" is enough?
  // User audio: "disable the scroll there... when it is full screen then only it should be able to scroll"
  // This implies fixed height and maybe 'hidden' overflow unless full screen?
  // Or literally `scrollbar: { vertical: 'hidden' }`?
  // Let's implement `scrollbar: { vertical: isFullScreen ? 'visible' : 'hidden' }`

  // Effect to load settings on mount (client-side only)
  useEffect(() => {
    const savedSettings = localStorage.getItem('editorSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse editor settings', e);
      }
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('editorSettings', JSON.stringify(settings));
  }, [settings]);


  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Add Keybinding for Save (Ctrl+S)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      toast.info('Saved! (Auto-save is enabled)');
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      toast.info('Press "Run" button to test your code.');
    });
  };

  const handleSettingChange = (key: keyof EditorSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
      toast.success('Code formatted');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success('Code copied to clipboard');
  };

  const handleDownload = () => {
    // Improve download to use correct extension based on language
    const extMap: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      html: 'html',
      css: 'css',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
    };
    const ext = extMap[language] || 'txt';

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded .${ext} file`);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the code?')) {
      onChange('');
      toast.info('Code cleared');
    }
  };

  return (
    <div className={`flex flex-col w-full h-full min-h-[300px] overflow-hidden rounded-md border border-border bg-background ${className}`}>
      <EditorToolbar
        settings={settings}
        onSettingChange={handleSettingChange}
        onFormat={handleFormat}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onReset={handleReset}
        language={language}
      />
      <div className="grow relative">
        <Editor
          height="100%"
          defaultLanguage={language}
          // IF language changes, force re-mount or just rely on prop update (Monaco handles it)
          language={language}
          value={value}
          theme={settings.theme}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: settings.minimap },
            fontSize: settings.fontSize,
            wordWrap: settings.wordWrap,
            scrollBeyondLastLine: false, // User requested fixed height feeling
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            roundedSelection: true,
            fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
            fontLigatures: true,
            formatOnPaste: true,
            formatOnType: true,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
            // Scroll behavior based on user request:
            // "disable the scroll there... when it is full screen then only it should be able to scroll"
            scrollbar: {
              vertical: isFullScreen ? 'visible' : 'hidden',
              horizontal: isFullScreen ? 'visible' : 'hidden',
              handleMouseWheel: isFullScreen, // Only allow mouse wheel scroll in full screen?
            },
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
          }}
          loading={
            <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/10">
              <span className="animate-pulse">Loading editor...</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CodeEditor;