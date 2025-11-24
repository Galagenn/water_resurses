'use client';

import { useState, useMemo, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup, Typography, Stack } from "@mui/material";

const options = ["7д", "14д", "30д", "90д"];

type DateRangePickerProps = {
  onPeriodChange?: (days: number) => void;
  defaultPeriod?: number;
};

const DateRangePicker = ({ onPeriodChange, defaultPeriod = 30 }: DateRangePickerProps) => {
  const defaultOption = options.find(opt => parseInt(opt.replace('д', '')) === defaultPeriod) || options[2];
  const [value, setValue] = useState(defaultOption);

  const dateRange = useMemo(() => {
    const days = parseInt(value.replace('д', ''));
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };

    return {
      start: formatDate(startDate),
      end: formatDate(endDate),
      days,
    };
  }, [value]);

  useEffect(() => {
    onPeriodChange?.(dateRange.days);
  }, [dateRange.days, onPeriodChange]);

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
            borderRadius: 1,
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
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', mt: 0.5 }}>
        {dateRange.start} - {dateRange.end}
      </Typography>
    </Stack>
  );
};

export default DateRangePicker;

