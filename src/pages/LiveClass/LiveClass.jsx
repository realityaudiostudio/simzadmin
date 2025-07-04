import React from "react";
import "./liveclass.css";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useEffect } from "react";
import { Button, message } from "antd";
import { Input } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import Header from "../../components/Header/Header";
import dayjs from "dayjs";
import { Select } from "antd"; // ✅ Add this at the top if not already imported
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
        content: "Unable to edit",
      });
    } else {
      messageApi.open({
        type: "success",
        content: "Live Updated",
      });
    }
    setIsEditing(false);
  };

  return (
    <div>
      {contextHolder}
      <Header title={"Live Classes"} />
      {liveData.map((stData, index) => (
        <div key={index} className="lives">
          <p>Current Data</p>
          <h3>{stData.live_class}</h3>
          <p>{stData.mentor}</p>
          <a href={stData.meet_url}>Link</a>
          <p>{stData.course}</p>
          <p>{dayjs(stData.day_of_that).format("DD/MM/YYYY HH:mm:ss")}</p>
        </div>
      ))}
      <Button onClick={makeEditable}>Add Live</Button>
      {isEditing && (
        <div className="editable">
          <Input
            name="live_class"
            type="text"
            onChange={handleClassname}
            placeholder="Enter classname"
          ></Input>
          <Input
            name="mentor"
            type="text"
            onChange={handleTeacher}
            placeholder="Enter mentor"
          ></Input>
          <Input
            name="meet_url"
            type="text"
            onChange={handleUrl}
            placeholder="Enter Url"
          ></Input>
          {/* <Input
                    name="course"
                    type="text"
                    onChange={handleCourse}
                    placeholder="Enter Course"
                ></Input> */}
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
