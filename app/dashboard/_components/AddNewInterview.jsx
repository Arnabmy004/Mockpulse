"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Spinner } from "react-bootstrap";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { MockInterview } from "../../../utils/schema";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt =
      `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Job Experience: ${jobExperience}. ` +
      `Give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} important questions based on this information in JSON format.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        }).returning({ mockId: MockInterview.mockId });

        if (resp) {
          setOpenDialog(false);
          router.push(`/dashboard/interview/${resp[0]?.mockId}`);
        }
      }
    } catch (error) {
      console.error("Error generating mock interview: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center py-10">
      <div
        className="p-10 border rounded-lg bg-gray-200 hover:scale-105 hover:shadow-lg cursor-pointer transition-all w-64 text-center"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg">+ Add New Interview</h2>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-800">
              Provide Job Details for Mock Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Fill in the job details below:
                  </h4>
                  <div className="my-3">
                    <label className="font-bold">Job Position/Role</label>
                    <input
                      type="text"
                      placeholder="Ex. Full Stack Developer"
                      className="border border-gray-300 rounded-md w-full p-2 mt-2 font-bold focus:outline-blue-500"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 my-3">
                    <label className="font-bold">Job Description/Tech Stack</label>
                    <textarea
                      placeholder="Ex. React, Angular, Node.js, MySQL"
                      className="border border-gray-300 rounded-md w-full p-2 mt-2 font-bold focus:outline-blue-500"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="font-bold">Years of Experience</label>
                    <input
                      type="number"
                      placeholder="Ex. 5"
                      className="border border-gray-300 rounded-md w-full p-2 mt-2 font-bold focus:outline-blue-500"
                      max="50"
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded-md mr-2"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`text-sm text-white px-4 py-2 rounded-md ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Spinner animation="border" role="status" size="sm" className="mr-2" />
                        Generating Questions
                      </div>
                    ) : (
                      "Start Interview"
                    )}
                  </button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
