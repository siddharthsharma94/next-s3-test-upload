import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useDropzone } from 'react-dropzone';
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';

export default function Home() {
  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 5 },
    autoProceed: true,
  });

  uppy.on('file-added', (result) => {
    console.log(result);
  });

  uppy.use(XHRUpload, {
    bundle: true,
    endpoint: '/api/upload',
    formData: true,
  });

  return (
    <div>
      <h1>Upload File</h1>
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            // Text to show on the droppable area.
            // `%{browse}` is replaced with a link that opens the system file selection dialog.
            dropHereOr: 'Drop here or %{browse}',
            // Used as the label for the link that opens the system file selection dialog.
            browse: 'browse',
          },
        }}
      />
    </div>
  );
}
