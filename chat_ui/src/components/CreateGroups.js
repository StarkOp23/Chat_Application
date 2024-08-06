import React, { useState } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateGroups() {
    const lightTheme = useSelector((state) => state.themeKey);
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("Data from LocalStorage : ", userData);
    const nav = useNavigate();
    if (!userData) {
        console.log("User not Authenticated");
        nav("/");
    }
    const user = userData.data;
    const [groupName, setGroupName] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log("User Data from CreateGroups : ", userData);

    const createGroup = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        axios.post(
            "http://localhost:8080/chat/createGroup",
            {
                name: groupName,
                users: '["66aa1e3cc6ee8ff378496e3c","66ab0db8c6209db90b1ef314"]',
            },
            config
        );
        nav("/app/groups");
    };

    return (
        <>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to create a Group Named " + groupName}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This will create a group where you will be the admin, and others will be able to join..
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button
                            onClick={() => {
                                createGroup();
                                handleClose();
                            }}
                            autoFocus
                        >
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className={"createGroups-container" + (lightTheme ? "" : " dark")}>
                <input
                    placeholder="Enter Group Name"
                    className={"search-box" + (lightTheme ? "" : " dark")}
                    onChange={(e) => {
                        setGroupName(e.target.value);
                    }}
                />
                <IconButton
                    className={"icon" + (lightTheme ? "" : " dark")}
                    onClick={() => {
                        handleClickOpen();
                        // createGroup();
                    }}
                >
                    <DoneOutlineRoundedIcon />
                </IconButton>
            </div>
        </>
    );
}

export default CreateGroups;