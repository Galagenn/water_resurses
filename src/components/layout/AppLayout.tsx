'use client';

import { PropsWithChildren, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import StorageIcon from "@mui/icons-material/Storage";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import SchoolIcon from "@mui/icons-material/School";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AppLogo from "@/components/shared/AppLogo";

const drawerWidth = 260;

const navigation = [
  { label: "Дашборд", href: "/", icon: <SpaceDashboardIcon /> },
  { label: "Аналитика", href: "/analytics", icon: <TimelineIcon /> },
  { label: "План действий", href: "/action-plan", icon: <AssignmentIcon /> },
  { label: "Данные", href: "/data", icon: <StorageIcon /> },
  { label: "Поля", href: "/fields", icon: <AgricultureIcon /> },
  { label: "Обучение", href: "/training", icon: <SchoolIcon /> },
  { label: "Уведомления", href: "/notifications", icon: <NotificationsIcon /> },
  { label: "Учетная запись", href: "/account", icon: <AccountCircleIcon /> },
];

const AppLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  // Десктопное меню по умолчанию открыто
  const [desktopOpen, setDesktopOpen] = useState(true);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleDesktopDrawerToggle = () => setDesktopOpen((prev) => !prev);
  const handleNavClick = () => {
    // Для мобильного меню закрываем дровер после перехода, десктопную версию оставляем открытой
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ px: 3 }}>
        <AppLogo />
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {navigation.map((item) => {
          const active = pathname === item.href;
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={active}
              sx={{
                mx: 2,
                borderRadius: 2,
                my: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "rgba(74, 222, 128, 0.15)",
                },
              }}
              onClick={handleNavClick}
            >
              <ListItemIcon sx={{ color: active ? "primary.main" : "text.secondary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ px: 3, pb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Следующий спутниковый проход
        </Typography>
        <Typography variant="h6">через Неделю</Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
          ml: { md: desktopOpen ? `${drawerWidth}px` : 0 },
          borderBottom: "1px solid rgba(148,163,184,0.3)",
          backgroundImage: "none",
          backgroundColor: "rgba(15,23,42,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleDesktopDrawerToggle}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">AgroSense AI</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            flexWrap="wrap"
            justifyContent="flex-end"
          >
            <Tooltip title="Оповещения">
              <IconButton color="inherit" component={Link} href="/notifications">
                <Badge color="error" badgeContent={4}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Stack
              component={Link}
              href="/account"
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                textDecoration: "none",
                color: "inherit",
                px: 1,
                py: 0.5,
                borderRadius: 10,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <Stack textAlign="right" spacing={0}>
                <Typography variant="subtitle2">Гала</Typography>
                <Typography variant="caption" color="text.secondary">
                  Frontend Lead
                </Typography>
              </Stack>
              <Avatar alt="Gala" sx={{ width: 36, height: 36 }}>
                G
              </Avatar>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: desktopOpen ? drawerWidth : 0 },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          open={desktopOpen}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%" },
          mt: { xs: 0, md: 10 },
          px: { xs: 1.5, sm: 2.5, md: 4 },
          py: { xs: 8, md: 6 },
        }}
      >
        <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;

