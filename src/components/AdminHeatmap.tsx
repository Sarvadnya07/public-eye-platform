import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mock complaint coordinates spread across a city
const mockCoordinates = [
  { lat: 28.6139, lng: 77.209, title: 'Burst water main on 5th Avenue', category: 'water', status: 'in-progress' },
  { lat: 28.6229, lng: 77.2195, title: 'Massive pothole on NH-7', category: 'roads', status: 'pending' },
  { lat: 28.6049, lng: 77.2250, title: 'Street lights out in Sector 12', category: 'electricity', status: 'resolved' },
  { lat: 28.6339, lng: 77.1990, title: 'Sewage overflow near Riverside', category: 'sanitation', status: 'escalated' },
  { lat: 28.6089, lng: 77.2150, title: 'Low water pressure in Hilltop', category: 'water', status: 'in-progress' },
  { lat: 28.6189, lng: 77.2300, title: 'Damaged bridge railing', category: 'roads', status: 'pending' },
  { lat: 28.6259, lng: 77.1980, title: 'Power outage in District 7', category: 'electricity', status: 'in-progress' },
  { lat: 28.5999, lng: 77.2100, title: 'Illegal dumping at Green Park', category: 'sanitation', status: 'resolved' },
  { lat: 28.6319, lng: 77.2120, title: 'Contaminated water supply', category: 'water', status: 'escalated' },
  { lat: 28.6109, lng: 77.2050, title: 'Unpaved road collapse', category: 'roads', status: 'in-progress' },
  { lat: 28.6200, lng: 77.2280, title: 'Transformer explosion', category: 'electricity', status: 'pending' },
  { lat: 28.6150, lng: 77.1950, title: 'Clogged storm drains', category: 'sanitation', status: 'in-progress' },
  { lat: 28.6270, lng: 77.2060, title: 'Fire hydrant leak', category: 'water', status: 'resolved' },
  { lat: 28.6040, lng: 77.2180, title: 'Missing road signs', category: 'roads', status: 'resolved' },
  { lat: 28.6170, lng: 77.2240, title: 'Faulty traffic signal', category: 'electricity', status: 'pending' },
  { lat: 28.6290, lng: 77.2140, title: 'Overflowing waste bins', category: 'sanitation', status: 'pending' },
  // Additional cluster points
  { lat: 28.6145, lng: 77.2105, title: 'Water pipe burst (Ward 3)', category: 'water', status: 'pending' },
  { lat: 28.6135, lng: 77.2080, title: 'Sinkhole on main road', category: 'roads', status: 'in-progress' },
  { lat: 28.6155, lng: 77.2095, title: 'Streetlight flickering', category: 'electricity', status: 'pending' },
  { lat: 28.6160, lng: 77.2110, title: 'Garbage pile-up', category: 'sanitation', status: 'in-progress' },
];

const categoryColors: Record<string, string> = {
  water: '#3b82f6',
  roads: '#f59e0b',
  electricity: '#ef4444',
  sanitation: '#22c55e',
};

const statusOpacity: Record<string, number> = {
  pending: 1,
  'in-progress': 0.8,
  resolved: 0.4,
  escalated: 1,
};

const AdminHeatmap = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading heatmap...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg overflow-hidden border border-border h-[400px]">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mockCoordinates.map((coord, i) => (
            <CircleMarker
              key={i}
              center={[coord.lat, coord.lng]}
              radius={coord.status === 'escalated' ? 12 : 8}
              fillColor={categoryColors[coord.category]}
              fillOpacity={statusOpacity[coord.status]}
              color={categoryColors[coord.category]}
              weight={coord.status === 'escalated' ? 2 : 1}
              opacity={0.7}
            >
              <Popup>
                <div className="text-xs">
                  <p className="font-semibold">{coord.title}</p>
                  <p className="capitalize text-muted-foreground">{coord.category} - {coord.status}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="capitalize">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeatmap;
