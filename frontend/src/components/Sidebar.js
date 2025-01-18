import React from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { text: "Admin Dashboard", icon: <DashboardIcon />, route: "/admin-dashboard" },
        { text: "Student Dashboard", icon: <GroupIcon />, route: "/student-dashboard" },
        { text: "Teacher Dashboard", icon: <GroupIcon />, route: "/teacher-dashboard" },
        { text: "Settings", icon: <SettingsIcon />, route: "/settings" },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
            }}
        >
            <Box sx={{ textAlign: "center", padding: "20px", backgroundColor: "#f5f5f5" }}>
                <h3>App Navigation</h3>
            </Box>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index} onClick={() => navigate(item.route)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
