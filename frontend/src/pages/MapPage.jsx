import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('/api/reports').then(res => setReports(res.data));
  }, []);

  return (
    <div className="min-h-screen">
      <MapContainer center={[-0.0236, 37.9062]} zoom={6} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {reports.map(report => (
          <Marker key={report.id} position={[report.latitude, report.longitude]}>
            <Popup>
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <p>Status: {report.status}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;