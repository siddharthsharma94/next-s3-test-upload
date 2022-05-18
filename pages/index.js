import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useDropzone } from 'react-dropzone';
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';

export default function Home() {
  // const uppy = new Uppy({
  //   meta: { type: 'avatar' },
  //   restrictions: { maxNumberOfFiles: 5 },
  //   autoProceed: true,
  // });

  // uppy.on('file-added', (result) => {
  //   console.log(result);
  // });

  // uppy.use(XHRUpload, {
  //   bundle: true,
  //   endpoint: '/api/upload',
  //   formData: true,
  // });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      let formData = new FormData();

      acceptedFiles.map((file) => {
        formData.append('file', file, file.name);
      });

      const uploadFile = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <h1>Upload File</h1>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    </div>
  );
}
