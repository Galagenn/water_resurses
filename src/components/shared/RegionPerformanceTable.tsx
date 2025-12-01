'use client';

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import type { RegionPerformanceRow } from "@/types/dashboard";

type Props = {
  rows: RegionPerformanceRow[];
  onAddTask?: (row: RegionPerformanceRow) => void;
};

const riskColor: Record<RegionPerformanceRow["riskLevel"], string> = {
  low: "#22c55e",
  medium: "#f97316",
  high: "#ef4444",
};

const RegionPerformanceTable = ({ rows, onAddTask }: Props) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Эффективность по регионам
      </Typography>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table
          size="small"
          sx={{ minWidth: 560, "& td, & th": { borderColor: "rgba(148,163,184,0.2)" } }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Регион</TableCell>
              <TableCell>Индекс роста</TableCell>
              <TableCell>Урожайность</TableCell>
              <TableCell>Риск</TableCell>
              <TableCell>Рекомендация</TableCell>
              {onAddTask && <TableCell align="center">Действие</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.region} hover>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.growthIndex}</TableCell>
                <TableCell>{row.yield}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={row.riskLabel}
                    sx={{
                      backgroundColor: "rgba(148,163,184,0.08)",
                      color: riskColor[row.riskLevel],
                      border: `1px solid ${riskColor[row.riskLevel]}`,
                    }}
                  />
                </TableCell>
                <TableCell>{row.recommendation}</TableCell>
                {onAddTask && (
                  <TableCell align="center">
                    <Tooltip title="Добавить в план действий">
                      <IconButton
                        size="small"
                        onClick={() => onAddTask(row)}
                        color="primary"
                      >
                        <AddTaskIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

export default RegionPerformanceTable;

