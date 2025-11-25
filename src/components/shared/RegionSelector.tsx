'use client';

import { useState } from "react";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { RegionOption } from "@/types/dashboard";

type Props = {
  regions: RegionOption[];
  selected?: string[];
  onSelectionChange?: (ids: string[]) => void;
};

const RegionSelector = ({ regions, selected, onSelectionChange }: Props) => {
  const [internalSelection, setInternalSelection] = useState<string[]>(
    regions.slice(0, 4).map((region) => region.id)
  );

  const currentSelection = selected ?? internalSelection;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const nextValue = typeof value === "string" ? value.split(",") : value;

    if (selected === undefined) {
      setInternalSelection(nextValue);
    }

    onSelectionChange?.(nextValue);
  };

  const renderSelected = (selected: string[]) => {
    if (!selected.length) {
      return "Выберите регионы";
    }

    if (selected.length === 1) {
      const region = regions.find((item) => item.id === selected[0]);
      return region?.name ?? "Выберите регионы";
    }

    return `Выбрано: ${selected.length}`;
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="text.secondary">
        Регион
      </Typography>
      <Select
        multiple
        value={currentSelection}
        onChange={handleChange}
        size="small"
        displayEmpty
        renderValue={(selected) => renderSelected(selected as string[])}
        sx={{
          "& fieldset": {
            borderColor: "rgba(148,163,184,0.25)",
            borderRadius: 1,
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: 280 },
          },
        }}
      >
        {regions.map((region) => (
          <MenuItem key={region.id} value={region.id}>
            <Checkbox
              checked={currentSelection.includes(region.id)}
              size="small"
            />
            <ListItemText primary={region.name} />
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default RegionSelector;

