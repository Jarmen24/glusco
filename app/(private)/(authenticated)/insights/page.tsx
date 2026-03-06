"use client";

import React, { useEffect, useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Bot,
  Droplets,
  Plus,
  Minus,
  TrendingDown,
  TrendingUp,
  Flame,
  CheckCircle2,
  Circle,
  Activity,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useGetUser } from "@/hooks/userHooks"; // Adjust to your web hook path
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  LabelList,
} from "recharts";

// Mocking your JSON imports (Ensure these paths exist in your web project)
import lightExercises from "../../../../components/workouts/light_exercises.json";
import moderateExercises from "../../../../components/workouts/moderate_exercises.json";
import vigorousExercises from "../../../../components/workouts/vigorous_workouts.json";
import { PredData } from "@/components/types/UserDB";
import GeminiResult, { DailyTask } from "@/components/types/GeminiTypes";
import {
  useGetAllUserPrediction,
  useGetUserFormData,
  useGetUserWithPrediction,
  useUserAnalysis,
} from "@/hooks/profileHooks";
import { SyncLoader } from "react-spinners";
import { useHealthData } from "@/components/context/DataContext";

const PRIMARY_COLOR = "#0B1956";
interface ExerciseItem {
  id: number;
  name?: string; // Used in Moderate/Vigorous
  title?: string; // Used in Light
  label?: string; // Used in Moderate/Vigorous
  intensity?: string; // Used in Moderate/Vigorous
  for?: string; // Used in Light
  duration: string;
  exercises: {
    name?: string; // Light uses name
    activity?: string; // Moderate/Vigorous uses activity
    time: string;
  }[];
  rest?: string;
  note?: string;
}

const getRiskColor = (value: number) => {
  if (value < 31) return "#16A34A"; // Green (Low)
  if (value < 61) return "#F97316"; // Orange (Medium)
  return "#DC2626"; // Red (High)
};
export default function InsightsPage() {
  const {
    formData,
    predictionData,
    predictionHistory,
    userDB,
    isDataLoading,
    aiText,
  } = useHealthData();
  const [riskLevel, setRiskLevel] = useState<"Light" | "Moderate" | "Vigorous">(
    "Light",
  );
  const [streak, setStreak] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [waterCount, setWaterCount] = useState(0);
  const [riskChange, setRiskChange] = useState({
    message: "Analyzing progress...",
    isImprovement: true,
    value: 0,
  });

  const [prediction, setPrediction] = React.useState<PredData[] | PredData>();
  const [exercises, setExercises] = React.useState<ExerciseItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState<GeminiResult>();
  // const {
  //   fetchUserAllPrediction,
  //   loading: predLoading,
  //   error,
  // } = useGetAllUserPrediction();

  // const {
  //   fetchAnalysis,
  //   loading: analysisLoading,
  //   error: analysisError,
  // } = useUserAnalysis();

  // const hasRun = React.useRef(false);
  // useEffect(() => {
  //   if (hasRun.current) return;
  //   const loadData = async () => {
  //     // 1. Check if user exists
  //     console.log(userDB);
  //     if (!userDB?.id) {
  //       console.log("User not logged in");
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       // 2. Fetch the prediction (which likely includes the AI analysis)
  //       const { data, error } = await fetchUserAllPrediction(
  //         parseInt(userDB.id),
  //       );

  //       if (!data || error) {
  //         // Assuming your hook/API returns the AI analysis in the data
  //         console.log("Error fetching predictions:", error);
  //         return;
  //       }

  //       const { data: analysis, error: analysisError } = await fetchAnalysis(
  //         parseInt(userDB.id),
  //       );

  //       if (!analysis || analysisError) {
  //         // Assuming your hook/API returns the AI analysis in the data
  //         console.log("Error fetching analysis:", analysisError);
  //         return;
  //       }
  //       setPrediction(data);
  //       setAnalysis(analysis);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching analysis:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, [userDB?.id]);
  // Load Persisted Data (Web version using localStorage)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedDate = localStorage.getItem("@last_task_date");

    if (storedDate !== today) {
      localStorage.setItem("@last_task_date", today);
      localStorage.removeItem("@completed_tasks");
      localStorage.setItem("@water_count", "0");
      setCompletedTasks([]);
      setWaterCount(0);
    } else {
      const tasks = localStorage.getItem("@completed_tasks");
      const water = localStorage.getItem("@water_count");
      if (tasks) setCompletedTasks(JSON.parse(tasks));
      if (water) setWaterCount(parseInt(water));
    }
  }, []);

  // Update logic mirrored from RN
  useEffect(() => {
    const predictions = Array.isArray(predictionHistory)
      ? predictionHistory
      : [];
    if (predictions.length > 0) {
      // Streak Calculation
      const dates = predictions
        .map(
          (p: PredData) => new Date(p.created_at).toISOString().split("T")[0],
        )
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

      if (dates.length > 0) {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (dates[0] === today || dates[0] === yesterdayStr) {
          let currentStreak = 1;
          for (let i = 0; i < dates.length - 1; i++) {
            const curr = new Date(dates[i]);
            const next = new Date(dates[i + 1]);
            const diffDays =
              (curr.getTime() - next.getTime()) / (1000 * 3600 * 24);
            if (diffDays <= 1.1) currentStreak++;
            else break;
          }
          setStreak(currentStreak);
        } else {
          setStreak(0);
        }
      }

      // Risk Logic
      const latestIdx = predictions.length - 1;
      const latestPercent = predictions[latestIdx].percent;
      const prevPercent =
        latestIdx > 0 ? predictions[latestIdx - 1].percent : latestPercent;
      const diff = latestPercent - prevPercent;
      const absDiff = Math.abs(diff).toFixed(2);

      setRiskChange({
        message:
          latestIdx === 0
            ? "First health check complete!"
            : diff <= 0
              ? `Risk down by ${absDiff}%!`
              : `Risk up by ${absDiff}%.`,
        isImprovement: diff <= 0,
        value: parseFloat(absDiff),
      });

      const level =
        latestPercent < 31
          ? "Light"
          : latestPercent < 61
            ? "Moderate"
            : "Vigorous";
      setRiskLevel(level);

      if (level === "Light") setExercises(lightExercises.Light_Exercises);
      else if (level === "Moderate")
        setExercises(moderateExercises.Moderate_Exercises);
      else setExercises(vigorousExercises.Vigorous_Exercises);
    }
  }, [predictionHistory]);

  const toggleTask = (taskId: string) => {
    const newTasks = completedTasks.includes(taskId)
      ? completedTasks.filter((id) => id !== taskId)
      : [...completedTasks, taskId];
    setCompletedTasks(newTasks);
    localStorage.setItem("@completed_tasks", JSON.stringify(newTasks));
  };

  const updateWater = (val: number) => {
    const newCount = Math.max(0, waterCount + val);
    setWaterCount(newCount);
    localStorage.setItem("@water_count", newCount.toString());
  };

  // Chart Data Formatting
  const chartData = useMemo(() => {
    const predictions = Array.isArray(predictionHistory)
      ? predictionHistory
      : [];

    return predictions
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      .slice(-7)
      .map((p: PredData) => {
        const date = new Date(p.created_at);

        return {
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          }), // e.g. Mar 03
          percent: p.percent,
        };
      });
  }, [predictionHistory]);

  // if (predLoading) {
  //   return (
  //     <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#FDFCFB] z-50">
  //       <SyncLoader color="#0B1956" size={12} margin={4} />
  //     </div>
  //   );
  // }

  const dailyTasks = aiText?.daily_tasks || [];

  return (
    <SidebarInset className="bg-[#F9FAFB]">
      <SiteHeader title="Health Insights" />

      <div className="max-w-6xl mx-auto w-full p-6 space-y-6">
        {/* --- AI SUMMARY HEADER --- */}
        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-white p-2 rounded-xl border border-[#C7D2FE]">
            <Bot className="text-[#0B1956]" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-[#0B1956] mb-1">AI Health Summary</h3>
            <p className="text-sm text-[#0B1956] font-medium leading-relaxed">
              {riskLevel === "Light"
                ? "You're doing great! Keep your current activity level to maintain low risk."
                : riskLevel === "Moderate"
                  ? "Your risk is moderate. Focus on the daily tasks below to lower your score."
                  : "Priority: High risk level detected. Try to complete at least 3 tasks today."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- LEFT: CHECKLIST & HYDRATION --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Checklist */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Daily Checklist
              </h2>
              <div className="grid gap-3">
                {dailyTasks.length > 0 ? (
                  dailyTasks
                    .slice(0, 5)
                    .map((task: DailyTask, index: number) => {
                      // Prioritize the id from the task object, fallback to index
                      const taskId = task.id || `task-${index}`;
                      const isDone = completedTasks.includes(taskId);

                      return (
                        <button
                          key={taskId}
                          onClick={() => toggleTask(taskId)}
                          className={`flex items-center p-4 rounded-xl border transition-all text-left shadow-sm bg-white cursor-pointer ${
                            isDone
                              ? "bg-green-50 border-green-200"
                              : "hover:border-[#C7D2FE]"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg mr-4 ${
                              isDone ? "bg-green-100" : "bg-[#EEF2FF]"
                            }`}
                          >
                            <Activity
                              size={20}
                              className={
                                isDone ? "text-green-700" : "text-[#0B1956]"
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <span
                              className={`block font-semibold text-sm ${
                                isDone
                                  ? "text-green-700 line-through"
                                  : "text-gray-700"
                              }`}
                            >
                              {task.label}
                            </span>
                            {/* Optional: Display the reasoning from your interface */}
                            {!isDone && (
                              <p className="text-[10px] text-gray-400 mt-1 italic">
                                {task.reasoning}
                              </p>
                            )}
                          </div>
                          {isDone ? (
                            <CheckCircle2 className="text-green-500" />
                          ) : (
                            <Circle className="text-gray-300" />
                          )}
                        </button>
                      );
                    })
                ) : (
                  <div className="bg-white p-10 rounded-xl text-center text-gray-400 border border-dashed">
                    No tasks generated for today.
                  </div>
                )}
              </div>
            </section>

            {/* Hydration */}
            <Card className="rounded-2xl shadow-sm border-none p-6 gap-2">
              <h3 className="font-bold text-gray-800 mb-1 text-xl">
                Risk Trend
              </h3>
              <p className="text-xs text-gray-500 mb-4 mt-0">
                Diabetes Risk Percentage Over Time
              </p>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />

                    {/* X AXIS */}
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 16 }}
                      padding={{ left: 20, right: 20 }}
                    />

                    {/* Y AXIS */}
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 16 }}
                      padding={{ top: 20, bottom: 20 }}
                    />

                    <Tooltip
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{
                        borderRadius: "5px",
                        border: "none",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                      }}
                    />

                    <Bar dataKey="percent" radius={[10, 10, 0, 0]} barSize={70}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getRiskColor(entry.percent)}
                        />
                      ))}

                      {/* Pill Label on Top */}
                      <LabelList
                        dataKey="percent"
                        position="top"
                        content={({ x, y, value }) => {
                          const color = getRiskColor(value as number);

                          return (
                            <g>
                              <text
                                x={x}
                                y={(y as number) - 13}
                                fill={color}
                                textAnchor="middle"
                                fontSize={14}
                                fontWeight={600}
                              >
                                {value}%
                              </text>
                            </g>
                          );
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* --- RIGHT: TRENDS & EXERCISES --- */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <div className="grid grid-cols-1 gap-3">
              <Card className="rounded-xl border-none shadow-sm">
                <CardContent className="p-4 flex items-center gap-4 pl-5">
                  <div
                    className={`p-3 rounded-full ${riskChange.isImprovement ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {riskChange.isImprovement ? (
                      <TrendingDown className="text-green-600" />
                    ) : (
                      <TrendingUp className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-md text-gray-500 font-bold uppercase">
                      Risk Change
                    </p>
                    <p className="text-xl font-semibold">
                      {riskChange.message}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-none shadow-sm">
                <CardContent className="p-4 flex items-center gap-4 pl-5">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                    <Flame />
                  </div>
                  <div>
                    <p className="text-md text-gray-500 font-bold uppercase">
                      Current Streak
                    </p>
                    <p className="text-xl font-black text-[#E4572E]">
                      {streak} Days
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exercises */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                Recommended
              </h2>
              <div className="space-y-2">
                {exercises.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="group flex items-center p-3 bg-white rounded-xl border border-transparent hover:border-[#0B1956] transition-all cursor-pointer shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center mr-3 group-hover:bg-[#0B1956] transition-colors">
                      <Activity
                        size={18}
                        className="text-[#0B1956] group-hover:text-white"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate text-gray-800 capitalize">
                        {/* Handles 'name' (Moderate/Vigorous) or 'title' (Light) */}
                        {item.name || item.title}
                      </h4>

                      <p className="text-xs text-gray-500">
                        {/* Shows label if it exists, otherwise the duration */}
                        {item.label ? `${item.label} • ` : ""}
                        {item.duration} •{" "}
                        {item.intensity || item.for || riskLevel}
                      </p>
                    </div>

                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
