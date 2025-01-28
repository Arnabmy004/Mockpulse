"use client";

import React, { useEffect,useState } from 'react'
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';
import QuestionsSection from './_components/QuestionsSection';
function StartInterview({params}) {

    const [interviewData, setInterviewData] = useState(null);   
    const [mockInterviewDetails, setMockInterviewDetails] = useState(null);
    useEffect(() => {
    
        GetInterviewDetails();

    }, []);
 
 const GetInterviewDetails = async () => {
     const result = await db
       .select()
       .from(MockInterview)
       .where(eq(MockInterview.mockId, params.interviewId));
     
       const jsonMockResp=JSON.parse(result[0].jsonMockResp);
       console.log(jsonMockResp);
       setMockInterviewDetails(jsonMockResp);
       setInterviewData(result[0]);
   };

  return (
    <div>

   <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
    {/* Questions */}
   <QuestionsSection mockInterviewQuestion ={mockInterviewQuestion}/>
    {/* audio/video recoriding */}

   </div>

    </div>
  )
}

export default StartInterview
