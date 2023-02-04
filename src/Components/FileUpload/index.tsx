import { Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { sx } from './style';

interface FileUploadProps {
  title: string;
  onDataChange: Function;
}

const FileUpload = (props: FileUploadProps) => {
  const { title, onDataChange } = props;
  const [error, setError] = useState('');

  const handleFileChange = (event: any) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (data: any) => {
        try {
          if (data?.target?.result) onDataChange(JSON.parse(data.target.result));
        } catch (error) {
          setError("Can't load this file");
        }
      };
      reader.readAsText(file);
    }
  };
  const handleChooseFile = () => {
    const inputFile = document.getElementById('file');
    if (inputFile) {
      inputFile.click();
    }
  };

  return (
    <>
      {error && <Grid sx={sx.error}>{error}</Grid>}
      <TextField id="file" type="file" sx={{ display: 'none' }} onChange={handleFileChange} />
      <Grid sx={sx.uploadButton} onClick={handleChooseFile}>
        {title}
      </Grid>
    </>
  );
};

export default FileUpload;
