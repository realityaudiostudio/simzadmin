import React from "react";
import "./recordedclass.css";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { message } from "antd";

const { Option } = Select;
import Header from "../../components/Header/Header";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
);

function RecordedClass() {
  const [recData, setRecData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCourse, setVideoCourse] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("test_video_player")
        .select("*");

      if (error) {
        console.log("Something issues", error);
      } else {
        setRecData(data);
      }
    };
    fetchData();
  }, [recData]);

  const hname = (e) => {
    setVideoName(e.target.value);
  };

  const hdesc = (e) => {
    setVideoDesc(e.target.value);
  };

  const hurl = (e) => {
    setVideoUrl(e.target.value);
  };

  const hcourse = (value) => {
    setVideoCourse(value);
  };

  function openEdit() {
    setIsEditing(true);
  }

  const handleFormData = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("test_video_player").insert({
        video_name: videoName,
        video_url: videoUrl.toLowerCase(),
        video_description: videoDesc,
        video_course: videoCourse.toLowerCase(),
      });

      if (error) {
        throw error;
      }

      messageApi.open({
        type: "success",
        content: "Added!",
      });

      if (data) {
        setRecData((prevData) => [...prevData, ...data]);
      }

      // Clear form fields
      setVideoName("");
      setVideoDesc("");
      setVideoUrl("");
      setVideoCourse("");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Issue found!",
      });
      console.error("Submit Error:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setVideoName("");
    setVideoDesc("");
    setVideoUrl("");
    setVideoCourse("");
  };

  return (
    <div className="recorded-class-container">
      {contextHolder}
      <Header title={"Recorded Classes"} />

      <div className="video-grid">
        {recData?.map((recdat, index) =>
          recdat && recdat.video_name ? (
            <div key={index} className="video-card">
              <div className="video-card-header">
                <h3 className="video-title">{recdat.video_name}</h3>
                <span className="video-course">{recdat.video_course}</span>
              </div>
              <div className="video-card-body">
                <p className="video-description">{recdat.video_description}</p>
              </div>
              <div className="video-card-footer">
                <a
                  href={recdat.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="play-button"
                >
                  <span className="play-icon">▶</span>
                  Play Video
                </a>
              </div>
            </div>
          ) : null
        )}
      </div>

      <div className="add-video-section">
        {!isEditing && (
          <Button onClick={openEdit} className="add-video-btn" size="large">
            <span className="add-icon">+</span>
            Add New Video
          </Button>
        )}

        {isEditing && (
          <div className="video-form-container">
            <div className="form-header">
              <h3>Add New Video</h3>
            </div>
            <form className="video-form" onSubmit={handleFormData}>
              <div className="form-group">
                <label>Video Name</label>
                <Input
                  name="video_name"
                  onChange={hname}
                  value={videoName}
                  type="text"
                  placeholder="Enter video name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <Input
                  name="video_description"
                  onChange={hdesc}
                  value={videoDesc}
                  type="text"
                  placeholder="Enter video description"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Video URL</label>
                <Input
                  name="video_url"
                  onChange={hurl}
                  value={videoUrl}
                  type="text"
                  placeholder="Enter video link"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Course</label>
                <Select
                  placeholder="Select Course"
                  style={{ width: "100%" }}
                  onChange={hcourse}
                  value={videoCourse}
                  className="form-select"
                >
                  <Option value="keyboard">Keyboard</Option>
                  <Option value="guitar">Guitar</Option>
                  <Option value="violin">Violin</Option>
                  <Option value="vocal">Vocal</Option>
                </Select>
              </div>

              <div className="form-actions">
                <Button
                  onClick={handleFormData}
                  className="submit-btn"
                  type="primary"
                >
                  Add Video
                </Button>
                <Button onClick={cancelEdit} className="cancel-btn">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordedClass;
