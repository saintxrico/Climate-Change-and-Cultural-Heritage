import React, { useState } from 'react';
import axios from 'axios';

const ReportIssuePage = () => {
  const [form, setForm] = useState({ title: '', description: '', type: '', latitude: '', longitude: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    const token = localStorage.getItem('token');
    await axios.post('/api/reports', formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
    alert('Report submitted');
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Report an Issue</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-2 border" />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full p-2 border">
          <option value="">Select Type</option>
          <option value="dumping">Illegal Dumping</option>
          <option value="deforestation">Deforestation</option>
          <option value="pollution">Pollution</option>
        </select>
        <input type="text" placeholder="Latitude" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} className="w-full p-2 border" />
        <input type="text" placeholder="Longitude" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} className="w-full p-2 border" />
        <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} className="w-full p-2 border" />
        <button type="submit" className="bg-green-600 text-white p-2">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportIssuePage;