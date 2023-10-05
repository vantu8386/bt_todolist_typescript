import { Input, Button, Alert } from "antd";
import React, { useRef, useState } from "react";
import { Job } from "../entities/job";

const TodoForm: React.FC<{}> = () => {
  const [showError, setShowError] = useState(false);
  const [job, setJob] = useState<any>("");
  const inputRef: any = useRef(); // tạo thm chiếu đến phẩn tử Dom
  const [jobs, setJobs] = useState(() => {
    // usestate vowis callback function  thì nó sẽ lấy giá trị được return bên trong
    // callback function đó làm giá trị khởi tạo
    const jobLocal = JSON.parse(localStorage.getItem("jobs") || "[]");
    return jobLocal;
  });

  //   validate dữ liệu
  const validateData = (name: string, value: string) => {
    if (name === "job") {
      if (!value) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setJob({ ...job, [name]: value });
    validateData(name, value)
  
    // Kiểm tra độ dài của trường input sau mỗi lần thay đổi
    if (value.length >= 1 && value.length <= 4) {
      setShowError(true); // Hiển thị cảnh báo nếu nhập từ 1 đến 4 ký tự
    } else {
      setShowError(false); // Ẩn cảnh báo nếu nhập 5 ký tự trở lên
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    if (!job.job || job.job.length === 0) {
        setShowError(true);
        return;
      }
      
    
  
    if (job.job.length >= 5) {
      setShowError(false);
      const newJob: Job = {
        id: Math.ceil(Math.random() * 1000),
        name: job.job,
        status: false,
      };
  
      // Cập nhật lại state (mảng công việc)
      setJobs([...jobs, newJob]);
      localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
      setJob("");
      // focus vào ô input sau khi submit
      inputRef.current.focus();
    } else {
      // Nếu không có ít nhất 5 ký tự, hiển thị cảnh báo
      setShowError(true);
    }
  };
  

  const handleDelete = (id: number) => {
    // lọc ra nững phần tử có id khác với id cần xóa
    const newListJob = jobs.filter((job: Job) => job.id !== id);

    // cập nhật lại state (mảng công việc)
    setJobs(newListJob);
    localStorage.setItem("jobs", JSON.stringify(newListJob));
  };

  const handleUpdateJob = (id: number) => {
  // Sử dụng map để tạo một bản sao của danh sách công việc và cập nhật công việc cần thay đổi
  const updatedJobs = jobs.map((job: Job) => {
    if (job.id === id) {
      // Đảo ngược trạng thái của công việc (hoàn thành/chưa hoàn thành)
      job.status = !job.status;
    }
    return job;
  });

  // Cập nhật danh sách công việc với danh sách đã cập nhật
  setJobs(updatedJobs);

  // Cập nhật dữ liệu trong localStorage
  localStorage.setItem("jobs", JSON.stringify(updatedJobs));
};

  
  return (
    <>
      <div className="text-2xl font-bold">
        <h3 className="mb-10">Danh sách công việc</h3>
        <form className="flex gap-1 mb-2" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            placeholder="Nhập công việc"
            name="job"
            value={job.job}
            onChange={handleChange}
          />
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            thêm
          </Button>
        </form>
        {showError ? (
          <Alert
            className="mb-2"
            message="Tên công việc không được để trống "
            type="error"
            showIcon
          />
        ) : (
          <></>
        )}
      </div>
      {/** render danh sách công việc ra ngoài giao diện */}
      {jobs.length > 0 ? (
        <>
          {jobs.map((job: Job) => (
            <div className="border shadow mb-2" key={job.id}>
              <div className="flex justify-between items-center p-2">
                <div className="flex items-center gap-2">
                  <input
                    checked={job.status}
                    onChange={() => handleUpdateJob(job.id)}
                    type="checkbox"
                    className="h-6"
                  />
                  <span>{job.status? <s>{job.name}</s>:<span>{job.name}</span>}</span>
                </div>
                <Button onClick={() => handleDelete(job.id)} danger>
                  xóa
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="border shadow mb-2">
            <div className="p-2">
              <h3 className="text-center m-0">Chưa có công việc</h3>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoForm;
