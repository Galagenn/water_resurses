'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import type { TrainingModule } from "@/types/dashboard";

type Props = {
  modules: TrainingModule[];
};

const levelColor: Record<TrainingModule["level"], string> = {
  basic: "#22c55e",
  intermediate: "#fbbf24",
  advanced: "#f97316",
};

const TrainingModulesList = ({ modules }: Props) => (
  <Box
    sx={{
      display: "grid",
      gap: { xs: 2, md: 2.5 },
      gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
    }}
  >
    {modules.map((module) => (
      <Card key={module.id} sx={{ height: "100%" }}>
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1}>
              <Typography variant="h6">{module.title}</Typography>
              <Chip
                label={module.levelLabel}
                sx={{ backgroundColor: "rgba(148,163,184,0.1)", color: levelColor[module.level] }}
              />
            </Stack>
            <Typography color="text.secondary">{module.description}</Typography>
            <Typography variant="caption" color="text.secondary">
              Длительность: {module.duration}
            </Typography>
            <List dense>
              {module.objectives.map((objective) => (
                <ListItem key={objective} sx={{ py: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <PlayArrowIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={objective} />
                </ListItem>
              ))}
            </List>
          </Stack>
        </CardContent>
      </Card>
    ))}
  </Box>
);

export default TrainingModulesList;

