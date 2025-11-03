import React from 'react';



const Editor: React.FC<unknown> = () => {
  return (
    <textarea
      data-testid="sql-editor"
      style={{ width: '100%', height: '300px' }}
    />
  );
}
export default Editor;