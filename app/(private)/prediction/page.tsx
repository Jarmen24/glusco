"use client";

import { Button } from "@/components/ui/button";
import { useGetUserWithPrediction } from "@/hooks/profileHooks";
import { useGetUser } from "@/hooks/userHooks";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SyncLoader } from "react-spinners";

const Prediction = () => {
  const userDB = useGetUser();
  const [prediction, setPrediction] = useState<number | null>(null);
  const [riskLabel, setRiskLabel] = useState<string>("");
  const [color, setColor] = useState<string>("#0B1956"); // default color

  const { fetchUserWithPrediction, loading, error } = useGetUserWithPrediction(
    userDB ? parseInt(userDB.id) : 0
  );

  const handleLoadPrediction = async () => {
    if (!userDB) return;

    const { data, error } = await fetchUserWithPrediction();
    if (error) return console.error(error);

    if (data && data.pred && data.pred.length > 0) {
      const percent = Math.round(data.pred[0].percent);
      setPrediction(percent);

      // Determine risk level and color
      if (percent < 30) {
        setRiskLabel("Low Risk");
        setColor("#4CAF50"); // green
      } else if (percent < 70) {
        setRiskLabel("Moderate Risk");
        setColor("#FF9800"); // orange
      } else {
        setRiskLabel("High Risk");
        setColor("#F44336"); // red
      }
    }
  };

  useEffect(() => {
    handleLoadPrediction();
  }, [userDB]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-white mb-2">
        Your Diabetes Risk Result
      </h1>
      <p className="text-white mb-5 text-center">
        Here's what we found based on your data.
      </p>

      <div className="flex flex-col max-w-[400px] p-10 items-center bg-white rounded-3xl mx-5">
        <div className="h-40 w-40 mb-4">
          {loading || prediction === null ? (
            <div className="flex items-center justify-center h-full">
              <SyncLoader color={color} />
            </div>
          ) : (
            <CircularProgressbar
              value={prediction}
              text={`${prediction}%`}
              strokeWidth={15}
              styles={buildStyles({
                textSize: "20px",
                textColor: color,
                pathColor: color,
                trailColor: "#E0E0E0",
              })}
            />
          )}
        </div>

        <p className={`py-2 text-2xl font-bold`} style={{ color }}>
          Risk Level: {riskLabel}
        </p>

        <p className="text-center">
          Start tracking your daily habits to improve your diet, activity, and
          sleep for better health.
        </p>

        <Link href="/dashboard">
          <Button className="mt-5 cursor-pointer">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Prediction;
