import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';

export default function Home() {
  const [files, setFiles] = useImmer([{ file: null, preview: null }]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: async (acceptedFiles) => {
      let formData = new FormData();

      acceptedFiles.map((file) => {
        formData.append('file', file, file.name);

        setFiles((draft) => {
          draft.push(Object.assign(file, { preview: URL.createObjectURL }));
        });
      });

      // await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // }).then((res) => res.json());
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
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
          {thumbs}
        </aside>
      </section>
    </div>
  );
}
