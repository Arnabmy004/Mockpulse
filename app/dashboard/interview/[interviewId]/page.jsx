"use client";

import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [WebCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <div className="flex justify-items items-center">
        <h2 className="font-bold text-2xl">Let's Get Started</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {interviewData && (
          <div className="flex flex-col my-5 gap-5 ">
            <div className="p-5 rounded-lg border gap-5">
              <h2 className=" text-lg">
                <strong>Job Role/Job Position : </strong>
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description : </strong>
                {interviewData.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years Of Experience : </strong>
                {interviewData.jobExperience}
              </h2>
            </div>
            <div className="p-5 rounded-lg border-yellow-300 bg-yellow-100 gap-5">
              <h2 className="flex gap-2 items-center text-yellow-500 ">
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <h2 className="mt-3 text-yellow-500">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </h2>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center ">
          {WebCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full  my-7 p-20 bg-secondary rounded-lg border" />

              <Button
                variant="ghost"
                onClick={() => setWebCamEnabled(true)}
                className="bg-primary text-white"
              >
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
