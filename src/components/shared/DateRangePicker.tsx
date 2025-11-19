'use client';

import { useState } from "react";
import { ToggleButton, ToggleButtonGroup, Typography, Stack } from "@mui/material";

const options = ["7д", "14д", "30д", "90д"];

const DateRangePicker = () => {
  const [value, setValue] = useState(options[2]);
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="text.secondary">
        Период анализа
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={(_, val) => val && setValue(val)}
        size="small"
        sx={{
          flexWrap: "wrap",
          gap: 1,
          "& .MuiToggleButton-root": {
            borderColor: "rgba(148,163,184,0.3)",
            borderRadius: 2,
            flex: { xs: "1 1 calc(50% - 8px)", sm: "0 0 auto" },
            minHeight: 44,
          },
        }}
      >
        {options.map((option) => (
          <ToggleButton key={option} value={option}>
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default DateRangePicker;

