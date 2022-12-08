import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function Memo() {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="메모장"
      style={{ width: 200 }}
    />
  );
}