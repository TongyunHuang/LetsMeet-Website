import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function FriendsNavList(props) {
  const setAddMode = props.setAddMode
  const addMode = props.addMode

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
          marginTop: "50px",
          marginLeft: "50px",
          marginRight: "50px",
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
          <ListItemButton 
            selected={addMode}
            onClick={() => {
              setAddMode(!addMode)
            }}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Add Post" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            ...borderStyle,
            borderBottomStyle: "solid",
          }}
        ></ListItem>
      </List>
    </nav>
  );
}
