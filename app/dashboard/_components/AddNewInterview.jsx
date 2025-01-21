"use client";

import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "react-bootstrap";
import { chatSession } from "@/utils/GeminiAIModel";

import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExpereince, setJobExpereince] = useState();
  const [loading, setLoading] = useState(false);  
  const [jsonResponse,setJsonResponse] = useState([]);
  const {user}=useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDescription, jobExpereince);

    const InputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description: " +
      jobDescription +
      ", Job Experience:" +
      jobExpereince +
      ". give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      "immportant questions based on this information in  JSON format.Give all question and answered as a JSON field.";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockResponse));
    setJsonResponse(MockResponse);


    if(MockResponse){
    const resp=await db.insert(MockInterview).values({
      mockId:uuidv4(),
      jsonMockResp:MockResponse,
      jobPosition:jobPosition,
      jobDesc:jobDescription,
      jobExperience:jobExpereince,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      //createdAt:moment.format("YYYY-MM-DD HH:mm:ss")  
         
    }).returning({mockId:MockInterview.mockId})

    console.log("INSERTED ID:",resp);

  }else{
    console.log("Error in generating questions");
  }
     setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h4 className="font-bold text-lg text-gray-700 mb-4">
                    Add details about your job Position/Role,job
                    description,Years of work expereince
                  </h4>

                  <div className=" my-3">
                    <label className="font-bold">Job Position/Role</label>
                    <input
                      type="text"
                      placeholder="Ex. Full Stack Developer"
                      className="border border-gray-300 rounded-md w-full p-2 mt-2 font-bold"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
    
                  <div className="mt-4 my-3">
                    <label className="font-bold">
                      Job Description/Teech Stack
                    </label>
                    <textarea
                      placeholder="Ex. React,Angular,Node js,MySQL"
                      className="border border-gray-300 rounded-md w-full p-2 mt-2 font-bold"
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className=" my-4">
                    <label className="font-bold">Years Of Expereince</label>
                    <input
                      type="number"
                      placeholder="Ex. 5"
                      className="border border-gray-300 rounded-md w-full p-2 mt-2 font-bold"
                      max="50"
                      required
                      onChange={(e) => setJobExpereince(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded-md mr-2"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit" disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-4 py-2 rounded-md"
                  >
                  {loading?
                  <>
                  <LoaderCircle className="animate-spin"/>Generating Questions
                  </>:'start interview'
                  }
                    
                
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
