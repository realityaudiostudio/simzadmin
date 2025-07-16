import React, { useState, useEffect } from "react";
import "./feepage.css";
import { createClient } from "@supabase/supabase-js";
import { Button, Input, AutoComplete, Select, message } from "antd";
import dayjs from "dayjs";
import Header from "../../components/Header/Header";
import fee from "../../assets/fee.svg";
import add from "../../assets/addicon.svg";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
);

function FeePage() {
  const [feeData, setFeeData] = useState([]);
  const [formData, setFormData] = useState({});
  const [options, setOptions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Fetch fee data
  useEffect(() => {
    const fetchFee = async () => {
      const { data, error } = await supabase.from("fee").select("*");
      if (error) {
        console.error("Error fetching fee data:", error);
        return;
      }
      setFeeData(data);
    };

    fetchFee();
  }, [feeData]);

  // Fetch users for AutoComplete
  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase
        .from("users_with_id")
        .select("email");
      if (error) {
        console.error("Error fetching user emails:", error);
        return;
      }
      setOptions(data.map((item) => ({ value: item.email })));
    };

    fetchEmails();
  }, []);

  const handleAdd = () => {
    setIsEditing(true);
  };

  const handleInput = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const { data: authData, error: authError } = await supabase
      .from("users_with_id")
      .select("id")
      .eq("email", formData.email);

    if (authError) {
      console.error("Error fetching user ID:", authError);
      return;
    }

    const userUid = authData?.[0]?.id || null;
    if (!userUid) {
      messageApi.open({
        type: "error",
        content: "User not found",
      });
      return;
    }

    const { error } = await supabase.from("fee").insert({
      user_id: userUid,
      email: formData.email,
      course: formData.Course,
      amount: formData.amount,
      created_at: currentDate,
    });

    if (error) {
      console.error("Error inserting fee data:", error);
      messageApi.open({
        type: "error",
        content: "Failed to add Fee Details",
      });
    } else {
      messageApi.open({
        type: "success",
        content: "Fee Details added successfully",
      });
      setIsEditing(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <Header title={"Payment History"} />

      <div className="btn">
        <Button onClick={handleAdd}>
          Add Payment <img src={add} alt="" />
        </Button>
      </div>

      {isEditing && (
        <div className="edit">
          <AutoComplete
            options={options}
            placeholder="Enter or select an email"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().includes(inputValue.toUpperCase())
            }
            onChange={(value) => handleInput(value, "email")}
          />

          <Select
            placeholder="Select Course"
            style={{ width: "100%" }}
            onChange={(value) => handleInput(value, "Course")}
            options={[
              { value: "keyboard", label: "Keyboard" },
              { value: "guitar", label: "Guitar" },
              { value: "drums", label: "Drums" },
              { value: "vocals", label: "Vocals" },
            ]}
          />

          <Input
            name="amount"
            type="number"
            onChange={(e) => handleInput(e.target.value, "amount")}
            placeholder="Amount"
          />
          <Button onClick={handleForm}>Add</Button>
        </div>
      )}

      {feeData.map((feed, index) => (
        <div key={index} className="feedata">
          <div className="iande">
            <img src={fee} alt="" />
            <div className="eandc">
              <p className="p1">{truncate(feed.email || "N/A", 21)}</p>
              <p className="p2">{feed.course}</p>
            </div>
          </div>
          <div className="pandd">
            <p className="p3">{feed.amount}</p>
            <p className="p2">
              {dayjs(feed.created_at).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeePage;
