"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Page() {
  const [prediction, setPrediction] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Age: 21,
            Gender: 2,
            Height_cm: 160,
            Weight_kg: 50,
            Waist_cm: 100,
            Hip_cm: 83,
            Systolic_BP: 120,
            Diastolic_BP: 80,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        setPrediction(result.probability);
      } catch (error) {
        console.error("Error fetching prediction:", error);
        setPrediction("Error fetching prediction");
      }
    };

    fetchPrediction();
  }, []);

  return (
    <SidebarInset>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col p-5">
        <h1 className="text-2xl font-bold mb-4">Early Diabetes Prediction</h1>
        <div className="text-lg">
          {prediction ? (
            <p>
              <strong>Model prediction:</strong> {prediction}
            </p>
          ) : (
            <p>Loading prediction...</p>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
