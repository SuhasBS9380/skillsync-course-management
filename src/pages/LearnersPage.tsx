import React, { useEffect, useState } from "react";

interface Learner {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  location: string;
  experience: string;
  currentCourse: string;
  score: number;
  enrollmentDate: string;
}

const LearnersPage: React.FC = () => {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/admin/learners")
      .then(res => res.json())
      .then(data => setLearners(data));
  }, []);

  const filteredLearners = learners.filter(l =>
    `${l.firstName} ${l.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.currentCourse || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search learners by name, email, or course..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: 8, fontSize: 16, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <span style={{ marginLeft: 16 }}>{filteredLearners.length} learners found</span>
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {filteredLearners.map(l => (
          <div key={l.userId} style={{
            background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 24, width: 350
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <div style={{
                background: "#1976d2", color: "#fff", borderRadius: "50%", width: 48, height: 48,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: "bold"
              }}>
                {(l.firstName && l.firstName[0] ? l.firstName[0] : "?")}{(l.lastName && l.lastName[0] ? l.lastName[0] : "?")}
              </div>
              <div style={{ marginLeft: 16 }}>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>{l.firstName || "N/A"} {l.lastName || "N/A"}</div>
                <span style={{
                  background: "#43a047", color: "#fff", borderRadius: 8, padding: "2px 8px", fontSize: 12, marginLeft: 8
                }}>active</span>
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div><b>Email:</b> {l.email || "N/A"}</div>
              <div><b>Phone:</b> {l.phoneNumber || "N/A"}</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Current Course:</b> <span style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}>{l.currentCourse || "N/A"}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Score:</b> <span style={{ color: "#ff9800", fontWeight: "bold" }}>{l.score !== undefined && l.score !== null ? `${l.score}%` : "--"}</span>
            </div>
            <div>
              <b>Personal Details:</b>
              <div>Age: {l.age !== undefined && l.age !== null ? l.age : "N/A"}</div>
              <div>Location: {l.location || "N/A"}</div>
              <div>Experience: {l.experience || "N/A"}</div>
              <div>Enrolled: {l.enrollmentDate || "N/A"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnersPage; 