'use client';

import {
  Card,
  CardContent,
  Chip,
  Grid,
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
  <Grid container spacing={2}>
    {modules.map((module) => (
      <Grid key={module.id} item xs={12} md={6}>
        <Card>
          <CardContent>
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
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
      </Grid>
    ))}
  </Grid>
);

export default TrainingModulesList;

