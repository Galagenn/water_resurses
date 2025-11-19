'use client';

import { useState } from "react";
import { MenuItem, TextField, Typography, Stack } from "@mui/material";
import type { RegionOption } from "@/types/dashboard";

type Props = {
  regions: RegionOption[];
};

const RegionSelector = ({ regions }: Props) => {
  const [value, setValue] = useState(regions[0]?.id ?? "all");

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="text.secondary">
        Регион
      </Typography>
      <TextField
        select
        fullWidth
        value={value}
        onChange={(event) => setValue(event.target.value)}
        size="small"
        sx={{
          "& fieldset": {
            borderColor: "rgba(148,163,184,0.25)",
          },
        }}
      >
        {regions.map((region) => (
          <MenuItem key={region.id} value={region.id}>
            {region.name}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default RegionSelector;

