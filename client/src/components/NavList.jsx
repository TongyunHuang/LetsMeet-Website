import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArticleIcon from "@mui/icons-material/Article";

export default function NavList() {
  const borderStyle = {
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderWidth: "1px",
    borderColor: "#D8D8D8",
  };
  return (
    <nav aria-label="main mailbox folders">
      <List
        sx={{
          width: "200px",
          backgroundColor: "white",
          marginTop: "20px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          padding: "0px",
        }}
      >
        <ListItem
          disablePadding
          sx={{
            ...borderStyle,
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            ...borderStyle,
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            ...borderStyle,
            borderBottomStyle: "solid",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}
