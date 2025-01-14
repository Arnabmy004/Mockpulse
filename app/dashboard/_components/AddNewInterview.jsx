'use client'

import React from "react";
import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from 'react-bootstrap';

function AddNewInterview() {

    const [openDialog, setOpenDialog] =useState(false);
  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>   
      
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
             <div>

              <h2 className="font-bold text-2xl">Tell us more about your job Interviewing</h2>
              <h2>Add details about your job Position/Role,job description,Years of work expereince</h2>

             </div>
              <div className="flex justify-end mt-4"> 
                <button 
                  className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded-md mr-2" 
                  onClick={() => setOpenDialog(false)} 
                >
                  Cancel
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-4 py-2 rounded-md" 
                >
                  Start Interview
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
