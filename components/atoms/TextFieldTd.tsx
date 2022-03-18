import React, { memo, FC, ReactNode, useEffect } from "react";
import { Box } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

export interface TextFieldTdProps {
  placeholder?: ReactNode;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

/**
 * Functional component.
 * @param props 
 */
export const TextFieldTd: FC<TextFieldTdProps> = memo(({
  placeholder,
  onChange,
  defaultValue
}) => {
  return (
    <>
      <Box>
        <TextField
          label={ placeholder }
          multiline
          rows={4}
          variant="outlined"
          defaultValue={ defaultValue }
          onChange={ (e) => {
            if (!onChange) return;
            onChange(e.currentTarget.value);
          } }
        />
      </Box>
    </>
  );
});
