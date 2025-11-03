import React from 'react';

interface EditorProps {
  content: string;
  onChange: (newContent: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', height: '300px' }}
    />
  );
}
export default Editor;