"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  useGetAllUserPrediction,
  useGetUserFormData,
  useGetUserWithPrediction,
  useUserAnalysis,
} from "@/hooks/profileHooks";
import GeminiResult from "../types/GeminiTypes";
import { PredData, UserDB } from "../types/UserDB";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useGetUser } from "@/hooks/userHooks";

const HealthDataContext = createContext<any>(null);
const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4">
      <Loader2 className="h-12 w-12 text-[#0B1956] animate-spin" />
      <h3 className="text-xl font-bold text-gray-900">
        Processing Health Data
      </h3>
      <p className="text-gray-500 text-sm">{message}... Please wait.</p>
    </div>
  </div>
);
export const HealthDataProvider = ({
  children,
  userDB,
}: {
  children: React.ReactNode;
  userDB: UserDB; // Replace 'any' with the actual type for userDB
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [predictionData, setPredictionData] = useState<PredData | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<
    PredData[] | PredData | null
  >([]);
  const [aiText, setAiText] = React.useState<GeminiResult>();
  const [isDataLoading, setIsDataLoading] = useState(true);

  const {
    fetchUserWithPrediction,
    loading: predictionLoading,
    error: predictionError,
  } = useGetUserWithPrediction();
  const {
    fetchUserAllPrediction,
    loading: predictionAllLoading,
    error: predictionAllError,
  } = useGetAllUserPrediction();
  const {
    fetchUserFormData,
    loading: formDataLoading,
    error: formDataError,
  } = useGetUserFormData();
  const {
    fetchAnalysis,
    loading: analysisLoading,
    error: analysisError,
  } = useUserAnalysis();

  useEffect(() => {
    if (!userDB?.id || predictionData) return;

    const numericId = Number(userDB.id);
    if (isNaN(numericId)) return;

    const loadHealthData = async () => {
      try {
        setIsDataLoading(true);

        const [formRes, predRes, predHistoryRes, aiRes] = await Promise.all([
          fetchUserFormData(numericId),
          fetchUserWithPrediction(numericId),
          fetchUserAllPrediction(numericId),
          fetchAnalysis(numericId),
        ]);

        if (!predRes?.data || !formRes?.data) {
          router.replace("/multi-step-form");
          return;
        }

        setFormData(formRes.data);
        setPredictionData(predRes.data);
        setPredictionHistory(predHistoryRes?.data ?? []);
        setAiText(aiRes?.data ?? null);
      } catch (err) {
        console.error("Layout Fetch Error:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadHealthData();
  }, [userDB]);

  if (isDataLoading) {
    return (
      <LoadingOverlay
        message={
          formDataLoading
            ? `Loading form data`
            : predictionLoading
              ? `Loading latest prediction`
              : predictionAllLoading
                ? `Loading prediction history`
                : analysisLoading
                  ? `Loading AI analysis`
                  : `Loading health data`
        }
      />
    );
  }

  return (
    <HealthDataContext.Provider
      value={{
        formData,
        predictionData,
        predictionHistory,
        aiText,
        isDataLoading,
        userDB,
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => useContext(HealthDataContext);
