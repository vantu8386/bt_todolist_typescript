import React, { useState } from "react";
import { Button } from "antd";

import { Job } from "../entities/job";

const TodoList: React.FC<{}> = () => {
  const [jobs, setJobs] = useState(() => {
    // usestate vowis callback function  thì nó sẽ lấy giá trị được return bên trong
    // callback function đó làm giá trị khởi tạo
    const jobLocal = JSON.parse(localStorage.getItem("jobs") || "[]");
    return jobLocal;
  });
  console.log(jobs);

  return (
    <>
      {/** render danh sách công việc ra ngoài giao diện */}
      {jobs.length > 0 ? (
        <>
          {jobs.map((job: Job) => (
            <div className="border shadow mb-2">
              <div className="flex justify-between items-center p-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-6" />
                  <span>{job.name}</span>
                </div>
                <Button danger>xóa</Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="border shadow mb-2">
            <div className="flex justify-between items-center p-2">
              <h3 className="text-center">Chưa có công việc</h3>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoList;
