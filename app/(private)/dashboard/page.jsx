"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import client from "@/app/api/client";

const Dashboard = () => {
  return (
    <div>
      <h1>This is our dashboard</h1>
      <Button onClick={() => client.auth.signOut()}>Sign out</Button>
    </div>
  );
};

export default Dashboard;
