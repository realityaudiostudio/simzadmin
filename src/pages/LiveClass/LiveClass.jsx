import React, { useEffect, useState } from "react";
import "./liveclass.css";
import { createClient } from "@supabase/supabase-js";
import { Button, message, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import Header from "../../components/Header/Header";

const { Option } = Select;
const supabase = createClient(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
);

function LiveClass() {
  const [liveData, setLiveData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [lClass, setLClass] = useState("");
  const [lTeahcer, setLTeacher] = useState("");
  const [lUrl, setLUrl] = useState("");
  const [lCourse, setLCourse] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("live").select("*");
      if (error) {
        messageApi.open({
          type: "error",
          content: "Unable to fetch",
        });
      } else {
        setLiveData(data);
      }
    };
    fetchData();
  }, [liveData]);

  const onOk = (value) => {
    setDateTime(value);
  };

  function handleClassname(e) {
    setLClass(e.target.value);
  }

  function handleTeacher(e) {
    setLTeacher(e.target.value);
  }

  function handleUrl(e) {
    setLUrl(e.target.value);
  }

  function handleCourse(e) {
    setLCourse(e.target.value);
  }

  function makeEditable() {
    setIsEditing(true);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("live").insert({
      live_class: lClass,
      mentor: lTeahcer,
      meet_url: lUrl,
      course: lCourse,
      day_of_that: dateTime,
    });
    if (error) {
      messageApi.open({
        type: "error",
        content: "Unable to add",
      });
    } else {
      messageApi.open({
        type: "success",
        content: "Live Added",
      });
      setIsEditing(false);
    }
  };
  const handleDelete = async (id) => {
    const { error } = await supabase.from("live").delete().eq("id", id);
    if (error) {
      messageApi.open({
        type: "error",
        content: "Failed to delete the class",
      });
    } else {
      messageApi.open({
        type: "success",
        content: "Class deleted successfully",
      });
      // Remove from local state without re-fetch
      setLiveData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="live-container">
      {contextHolder}
      <Header title={"Live Classes"} />

      {liveData.map((stData, index) => (
        <div key={stData.id} className="lives">
          <p className="live-label">Current Data</p>
          <h3 className="live-title">{stData.live_class}</h3>
          <p className="live-mentor">{stData.mentor}</p>
          <a
            className="live-link"
            href={stData.meet_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Class
          </a>
          <p className="live-course">{stData.course}</p>
          <p className="live-date">
            {dayjs(stData.day_of_that).format("DD/MM/YYYY hh:mm A")}
          </p>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(stData.id)}
            style={{ marginTop: "0.5rem" }}
          >
            Delete
          </Button>
        </div>
      ))}

      <Button className="add-button" onClick={makeEditable}>
        Add Live
      </Button>

      {isEditing && (
        <div className="editable">
          <Input
            name="live_class"
            type="text"
            onChange={handleClassname}
            placeholder="Enter classname"
          />
          <Input
            name="mentor"
            type="text"
            onChange={handleTeacher}
            placeholder="Enter mentor"
          />
          <Input
            name="meet_url"
            type="text"
            onChange={handleUrl}
            placeholder="Enter URL"
          />
          <Select
            placeholder="Select Course"
            style={{ width: "100%" }}
            onChange={(value) => setLCourse(value)}
            defaultValue={lCourse}
          >
            <Option value="key0500">Key - Thu</Option>
            <Option value="key0606">Key - Fri 06</Option>
            <Option value="key0607">Key - Fri 07</Option>
            <Option value="key0608">Key - Fri 08</Option>
            <Option value="key0610">Key - Fri 10</Option>
            <Option value="key0706">Key - Sat 06</Option>
            <Option value="key0707">Key - Sat 07</Option>
            <Option value="key0708">Key - Sat 08</Option>
            <Option value="guitar">Guitar</Option>
            <Option value="violin">Violin</Option>
            <Option value="vocal">Vocal</Option>
          </Select>
          <DatePicker
            showTime
            onChange={(value, dateString) => {
              console.log("Selected Time: ", value);
              console.log("Formatted Selected Time: ", dateString);
            }}
            onOk={onOk}
          />
          <Button onClick={handleEdit}>Submit</Button>
        </div>
      )}
    </div>
  );
}

export default LiveClass;
