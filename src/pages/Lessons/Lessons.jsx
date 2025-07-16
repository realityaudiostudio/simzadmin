import React, { useEffect, useState } from "react";
import "./lessons.css";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext/UserContext";
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, message, Select } from "antd";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
);

function Lessons() {
  const { id } = useParams();
  const [lessonData, setLessonData] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [gradeInfo, setGradeInfo] = useState("");
  const [currInfo, setCurrInfo] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    const fetchLesson = async () => {
      const { data, error } = await supabase
        .from("student_details")
        .select("prev_learn, grade_completed, curr_learn")
        .eq("user_id", id)
        .single();

      if (error) {
        console.log("Error fetching lesson data:", error);
      } else {
        const lessons = data.prev_learn || [];
        const gradeOver = data.grade_completed || "";
        const curr_less = Array.isArray(data.curr_learn)
          ? data.curr_learn[0]
          : "";
        setLessonData(lessons);
        setGradeInfo(gradeOver);
        setCurrInfo(curr_less);
      }
    };

    fetchLesson();
  }, [id, user, navigate]);

  const handleAdd = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!formData.trim()) {
      setIsEditing(false);
      return;
    }

    const updatedLessons = [...lessonData, formData];

    const { data, error } = await supabase
      .from("student_details")
      .update({ prev_learn: updatedLessons })
      .eq("user_id", id);

    if (error) {
      console.log("Supabase error:", error);
    } else {
      messageApi.open({
        type: "success",
        content: "Lesson Added!",
      });
      setLessonData(updatedLessons);
      setFormData("");
      setIsEditing(false);
    }
  };

  return (
    <div className="lessons-container">
      {contextHolder}
      <div className="lshead">
        <p>Welcome {user?.email || "Guest"}</p>
      </div>

      <h3>Lesson Tracking</h3>
      <p>
        Your Current Grade: <strong>{gradeInfo || "N/A"}</strong>
      </p>
      <p>
        Your Current Lesson: <strong>{currInfo || "N/A"}</strong>
      </p>

      {lessonData.length > 0 ? (
        <div>
          {lessonData.map((record, index) => (
            <div key={index} className="paadam">
              <p>Lesson {index + 1}</p>
              <h5>{record}</h5>
              <p>Completed</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No lesson records found.</div>
      )}

      <EditOutlined className="EditOutlined" onClick={handleAdd} />

      {isEditing && (
        <div className="addLesson">
          {/* <Input
            name="prev_learn"
            type="text"
            onChange={handleInputChange}
            placeholder="Add Lesson"
            value={formData}
          /> */}
          <Select
            name="prev_learn"
            placeholder="Select Lesson to Add"
            style={{ width: "100%" }}
            value={formData}
            onChange={(value) =>
              handleInputChange({
                target: {
                  name: "prev_learn",
                  value: value,
                },
              })
            }
          >
            <Select.Option value="Lesson 1">Lesson 1</Select.Option>
            <Select.Option value="Lesson 2">Lesson 2</Select.Option>
            <Select.Option value="Lesson 3">Lesson 3</Select.Option>
            <Select.Option value="Lesson 4">Lesson 4</Select.Option>
            <Select.Option value="Scales Practice">
              Scales Practice
            </Select.Option>
          </Select>

          <Button onClick={handleForm}>Add Lesson</Button>
        </div>
      )}
    </div>
  );
}

export default Lessons;
