import { Box, IconButton, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

const convert = (object) => {
  const values = Object.values(object);
  let textValue = "";
  values.forEach((value) => {
    if (value) textValue += `${value}\n`;
  });
  return textValue;
};

function EditMenu({ data }) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(convert(data));
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box>
      {isEdit ? (
        <Box display='flex' flexDirection='row' gap={1}>
          <TextField
            disabled={!isEdit}
            value={value}
            onChange={handleChange}
            multiline
          />
          <IconButton onClick={() => setIsEdit(false)}>

            <CheckIcon />
          </IconButton>
        </Box>
      ) : (
        <Box display='flex' flexDirection='row' gap={1}>
          <Typography sx={{
            whiteSpace: 'pre'
          }}>{value}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default EditMenu;
