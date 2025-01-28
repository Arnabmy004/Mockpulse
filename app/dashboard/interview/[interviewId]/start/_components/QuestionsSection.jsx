import React from "react";

function QuestionsSection({ mockInterviewQuestion }) {
  return (
    <div className="p-5 border rounded-lg">
      <div>
        {mockInterviewQuestion&&mockInterviewQuestion.map((question, index)=>{
            <div key={index} className="mb-4">
            <h2 className="font-bold">Question #{index + 1}</h2>
            <p>{question}</p>
          </div>
        })}
      </div>
    </div>
  );
}

export default QuestionsSection;
