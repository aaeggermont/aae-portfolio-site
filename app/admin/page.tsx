// app/admin/page.tsx
"use client";

import React from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "@/firebase";

import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
} from "@mui/material";

type AccessRequest = {
  projectId: number;
  projectKey: string;
  uid: string;
  email?: string | null;
  displayName?: string | null;
  status: "pending" | "approved" | "rejected";
};

export default function AdminPage() {
  const [requests, setRequests] = React.useState<AccessRequest[]>([]);

  // Load access requests
  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "access_requests"),
      (snap) => {
        const list: AccessRequest[] = [];

        snap.forEach((doc) => {
          list.push(doc.data() as AccessRequest);
        });

        setRequests(list);
      }
    );

    return () => unsub();
  }, []);

  // Approve user
  const approve = async (req: AccessRequest) => {
    // 1) Update request status
    await updateDoc(
      doc(db, "access_requests", `${req.projectKey}_${req.uid}`),
      { status: "approved" }
    );

    // 2) Add user to allowlist
    const allowRef = doc(db, "access_allowlist", req.projectKey);

    await updateDoc(allowRef, {
      allowedUids: [req.uid],
      allowedEmails: [req.email],
    });
  };

  // Reject user
  const reject = async (req: AccessRequest) => {
    await updateDoc(
      doc(db, "access_requests", `${req.projectKey}_${req.uid}`),
      { status: "rejected" }
    );
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 6, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Project Access Management
      </Typography>

      {requests.length === 0 && (
        <Typography color="text.secondary">
          No access requests.
        </Typography>
      )}

      <Stack spacing={2}>
        {requests.map((req) => (
          <Paper key={`${req.projectKey}_${req.uid}`} sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Typography fontWeight={600}>
                {req.projectKey}
              </Typography>

              <Typography variant="body2">
                {req.email ?? req.uid}
              </Typography>

              <Typography variant="caption">
                Status: {req.status}
              </Typography>

              <Divider />

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  disabled={req.status === "approved"}
                  onClick={() => approve(req)}
                >
                  Approve
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  disabled={req.status === "rejected"}
                  onClick={() => reject(req)}
                >
                  Reject
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
