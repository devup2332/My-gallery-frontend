import React from "react";

const Progress = ({ progress, progressRef }: any) => {
  return (
    <div className="progress_container" ref={progressRef}>
      <div className="progress_bar_container">
        <h1 className="progress_title">Uploading</h1>
        <div className="bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
