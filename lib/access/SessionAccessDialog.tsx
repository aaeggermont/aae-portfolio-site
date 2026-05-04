"use client";

import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export type SessionAccessDialogReason =
  | "session_hard_expired"
  | "no_session"
  | "bad_session"
  | "not_allowed"
  | "signed_url_failed"
  | "unknown";

type SessionAccessDialogProps = {
  open: boolean;
  reason: SessionAccessDialogReason;
  onSignInAgain: () => void;
};

function getDialogCopy(reason: SessionAccessDialogReason) {
  if (reason === "not_allowed") {
    return {
      title: "Access required",
      description:
        "Your account does not currently have access to this protected project content. Please sign in with an approved account.",
      actionLabel: "Sign in with another account",
    };
  }

  if (reason === "signed_url_failed") {
    return {
      title: "Protected content unavailable",
      description:
        "We could not verify access to protected media right now. Please sign in again to refresh your secure session.",
      actionLabel: "Sign in again",
    };
  }

  return {
    title: "Session expired",
    description:
      "Your secure access session is no longer valid. Please sign in again to continue viewing protected project content.",
    actionLabel: "Sign in again",
  };
}

export default function SessionAccessDialog({
  open,
  reason,
  onSignInAgain,
}: SessionAccessDialogProps) {
  const copy = getDialogCopy(reason);

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      aria-labelledby="session-access-dialog-title"
    >
      <DialogTitle id="session-access-dialog-title" sx={{ textAlign: "center" }}>
        {copy.title}
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1.25} alignItems="flex-start">
          <WarningAmberRoundedIcon color="warning" sx={{ mt: 0.2 }} />
          <Typography variant="body2" color="text.secondary">
            {copy.description}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "center" }}>
        <Button onClick={onSignInAgain} variant="contained">
          {copy.actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
