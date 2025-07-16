import React from "react";
import "./studentind.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext/UserContext";
import { useEffect } from "react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useStudent } from "../../context/StudentContext/StudentContext";
import { EditOutlined } from "@ant-design/icons";
import { Button, Input, Select, Modal } from "antd";
import avatar from "../../assets/avatarfull.png";
import badge from "../../assets/badge.svg";
import certificate from "../../assets/certificate.svg";
import certificateicon from "../../assets/certificateicon.svg";
import badgeicon from "../../assets/badgeicon.svg";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import Footer from "../../components/Footer/Footer";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_KEY,
  import.meta.env.VITE_ANON_KEY
);

function StudentInd() {
  const { id } = useParams();
  const [studentInd, setStudentInd] = useState(null);
  const { user } = useUser();
  const { students, studentOnly } = useStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add this state
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    const fetchData = async () => {
      try {
        // Fetch single student details
        const { data: studentDetails, error: studentError } = await supabase
          .from("student_details")
          .select("*")
          .eq("user_id", id)
          .single();

        if (studentError) {
          console.log("Error fetching student details:", studentError);
          return;
        }

        // Fetch all users from auth
        const { data: authUsers, error: usersError } =
          await supabase.auth.admin.listUsers();

        if (usersError) {
          console.log("Error fetching users:", usersError);
          return;
        }

        // Combine the single student data with the corresponding auth user data
        const userDetails = authUsers.users.find(
          (user) => user.id === studentDetails.user_id
        );

        // Add user details to the student object
        const combinedData = { ...studentDetails, user: userDetails };

        // Ensure attendance_details is an array
        const attendance = Array.isArray(combinedData.attendance_details?.data)
          ? combinedData.attendance_details.data.map((record) => ({
              attDate: new Date(
                parseInt(record.date) * 1000
              ).toLocaleDateString(),
              attStatus: record.is_present
                ? "Present"
                : record.is_absent
                ? "Absent"
                : "Unknown",
            }))
          : []; // Default to an empty array if `attendance_details.data` is not an array

        // Use prev_learn field for lessons
        const lessons = combinedData.prev_learn || [];

        // Set state
        setStudentInd(combinedData);
        studentOnly(attendance, lessons);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, [id, user, studentOnly, navigate]);

  const handleEdit = () => {
    setFormData({
      username: studentInd.user?.user_metadata?.username || "",
      fee_due: studentInd.fee_due || "",
      grade_completed: studentInd.grade_completed || "",
      courses: studentInd.courses ? studentInd.courses.join(", ") : "",
      curr_learn: studentInd.curr_learn ? studentInd.curr_learn[0] : "",
      batch: studentInd.batch ? studentInd.batch.join(", ") : "",
    });
    setIsEditing(true);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    // Convert `courses` back to an array before saving
    const updatedCourses = formData.courses
      .split(",")
      .map((course) => course.trim());
    const updatedBatch = formData.batch.split(",").map((item) => item.trim());

    try {
      // Update the user metadata
      const { error: stError } = await supabase.auth.admin.updateUserById(
        studentInd.user_id,
        {
          user_metadata: {
            ...studentInd.user.user_metadata,
            username:
              formData.username || studentInd.user.user_metadata.username,
          },
        }
      );

      if (stError) {
        console.error("Error updating username:", stError);
        return;
      }

      // Update student details in the database
      const { error: errBakki } = await supabase
        .from("student_details")
        .update({
          fee_due: formData.fee_due,
          grade_completed: formData.grade_completed,
          courses: updatedCourses,
          curr_learn: [formData.curr_learn, "In progress"],
          batch: updatedBatch,
        })
        .eq("user_id", studentInd.user_id);

      if (errBakki) {
        console.error("Error updating student details:", errBakki);
        return;
      }

      // Update local state after a successful save
      setStudentInd((prevState) => ({
        ...prevState,
        fee_due: formData.fee_due,
        grade_completed: formData.grade_completed,
        courses: updatedCourses,
        curr_learn: formData.curr_learn,
      }));

      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Fixed delete modal functions
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Delete from student_details
      const { error: studentError } = await supabase
        .from("student_details")
        .delete()
        .eq("user_id", studentInd.user_id);

      if (studentError) {
        console.error("Error deleting student:", studentError);
        return;
      }

      // Delete from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(
        studentInd.user_id
      );

      if (authError) {
        console.error("Error deleting user:", authError);
        return;
      }

      setIsDeleteModalOpen(false);
      
      // Show success message and navigate
      Modal.success({
        title: "Student Deleted",
        content: "The student has been successfully deleted.",
        onOk: () => navigate("/dashboard"),
      });
    } catch (error) {
      console.error("Unexpected delete error:", error);
      Modal.error({
        title: "Delete Failed",
        content: "Something went wrong during deletion.",
      });
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="studentind">
      <div className="navbutton">
        <NavigationButton />
      </div>

      {studentInd ? (
        <div key={studentInd.user_id}>
          <div className="stindhead">
            <div className="stindnameAvatar">
              <img src={avatar} alt="" className="avatarImage" />
              <div className="stindname">
                <h3>{studentInd.user?.user_metadata?.username || "Unknown"}</h3>
                <p>
                  {Array.isArray(studentInd.courses)
                    ? studentInd.courses.join(", ")
                    : "No courses available"}{" "}
                  Student
                </p>
                <div className="stindbuttonlinks">
                  <Link to={`/attendance/${studentInd.user_id}`}>
                    Attendance{" "}
                  </Link>
                  <Link to={`/lessons/${studentInd.user_id}`}>Lessons</Link>
                  <EditOutlined onClick={handleEdit} />
                </div>
              </div>
            </div>
            <div className="gradeFees">
              <div className="gradeFee">
                <p>Grade Covered</p>
                <h3>{studentInd.grade_completed}</h3>
              </div>
              <div className="gradeFee">
                <p>Fee Due</p>
                <h3>Rs.{studentInd.fee_due}</h3>
              </div>
            </div>
            <div className="gradeFee">
              <p>Learning Now</p>
              <h3>{studentInd.curr_learn[0]}</h3>
            </div>
            <div className="gradeFee">
              <p>Batch</p>
              <h3>
                {Array.isArray(studentInd.batch)
                  ? studentInd.batch.join(", ")
                  : "No batches available"}{" "}
              </h3>
            </div>

            {isEditing && (
              <div className="editingspace">
                <p>Name</p>
                <Input
                  name="username"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Update Name"
                  value={formData.username || ""}
                />
                <p>Fee Due</p>
                <Input
                  name="fee_due"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter Fee Due"
                  value={formData.fee_due || ""}
                />
                <p>Grade Covered</p>
                <Select
                  placeholder="Select Grade"
                  style={{ width: "100%" }}
                  value={formData.grade_completed || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      grade_completed: value,
                    }))
                  }
                >
                  <Select.Option value="initial">Initial</Select.Option>
                  <Select.Option value="one">one</Select.Option>
                  <Select.Option value="two">two</Select.Option>
                  <Select.Option value="three">three</Select.Option>
                </Select>
                <p>Courses</p>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Select Courses"
                  style={{ width: "100%" }}
                  value={
                    formData.courses
                      ? typeof formData.courses === "string"
                        ? formData.courses.split(",").map((s) => s.trim())
                        : formData.courses
                      : []
                  }
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      courses: value.join(", "),
                    }))
                  }
                >
                  <Select.Option value="keyboard">Keyboard</Select.Option>
                  <Select.Option value="guitar">Guitar</Select.Option>
                  <Select.Option value="violin">Violin</Select.Option>
                  <Select.Option value="vocal">Vocal</Select.Option>
                </Select>

                <p>Currently Learning</p>
                <Select
                  placeholder="Select Currently Learning"
                  style={{ width: "100%" }}
                  value={formData.curr_learn || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      curr_learn: value,
                    }))
                  }
                >
                  <Select.Option value="lesson1">Lesson 1</Select.Option>
                  <Select.Option value="lesson2">Lesson2</Select.Option>
                  <Select.Option value="lesson3">Lesson3</Select.Option>
                </Select>
                <p>Batch</p>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Select Batch"
                  style={{ width: "100%" }}
                  value={
                    formData.batch
                      ? typeof formData.batch === "string"
                        ? formData.batch.split(",").map((s) => s.trim())
                        : formData.batch
                      : []
                  }
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      batch: value.join(", "),
                    }))
                  }
                >
                  <Select.Option value="key0500">Key - Thu</Select.Option>
                  <Select.Option value="key0606">Key - Fri 06</Select.Option>
                  <Select.Option value="key0607">Key - Fri 07</Select.Option>
                  <Select.Option value="key0608">Key - Fri 08</Select.Option>
                  <Select.Option value="key0610">Key - Fri 10</Select.Option>
                  <Select.Option value="key0706">Key - Sat 06</Select.Option>
                  <Select.Option value="key0707">Key - Sat 07</Select.Option>
                  <Select.Option value="key0708">Key - Sat 08</Select.Option>
                </Select>

                <Button onClick={handleForm}>Save</Button>
              </div>
            )}
          </div>
          
          <div className="stindbadge">
            <h5>Badges Gained</h5>
            <ul>
              <li>
                <img src={badge} alt="" />
                Red Badge
              </li>
              <li>
                <img src={badge} alt="" />
                Green badge
              </li>
              <button>
                <img src={badgeicon} alt="" />
                add Badge
              </button>
            </ul>
          </div>
          
          <div className="stindcertificate">
            <h5>Certificates Earned</h5>
            <ul>
              <li>
                <img src={certificate} alt="" />
                Initial{" "}
              </li>
              <li>
                <img src={certificate} alt="" />1
              </li>
              <button>
                <img src={certificateicon} alt="" />
                add certificate
              </button>
            </ul>
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <div className="loaderAllSTI"></div>
        </div>
      )}

      {/* Delete Student Button */}
      <div style={{ textAlign: "center", marginTop: "2px", paddingBottom: "30px" }}>
        <Button danger type="primary" onClick={showDeleteModal}>
          Delete Student
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Student"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this student?</p>
        <p>This action cannot be undone.</p>
      </Modal>

      <Footer />
    </div>
  );
}

export default StudentInd;