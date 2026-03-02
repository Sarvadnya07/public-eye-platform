import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle2, Bot, TrendingUp, TrendingDown, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useApp } from '@/contexts/AppContext';
import { useCountUp } from '@/hooks/useCountUp';
import { mockStats } from '@/data/mockData';
import AdminHeatmap from '@/components/AdminHeatmap';

const sparkData = [4, 7, 5, 9, 6, 8, 11, 7, 13, 9, 15, 12, 18, 14, 10];

const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 32;
  const w = 80;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
    </svg>
  );
};

const slaBreachData = [
  { department: 'Water', breaches: 8 },
  { department: 'Roads', breaches: 14 },
  { department: 'Power', breaches: 6 },
  { department: 'Sanitation', breaches: 11 },
];

const resolvedOverWeek = [
  { day: 'Mon', resolved: 5 },
  { day: 'Tue', resolved: 9 },
  { day: 'Wed', resolved: 7 },
  { day: 'Thu', resolved: 12 },
  { day: 'Fri', resolved: 15 },
  { day: 'Sat', resolved: 8 },
  { day: 'Sun', resolved: 6 },
];

const Dashboard = () => {
  const { complaints } = useApp();
  const openCount = useCountUp(complaints.filter(c => c.status === 'pending' || c.status === 'in-progress').length, 1000);
  const slaBreaches = useCountUp(mockStats.slaBreaches, 1200);
  const resolvedToday = useCountUp(mockStats.resolvedToday, 1400);
  const aiAccuracy = useCountUp(mockStats.aiAccuracyRate, 1600, 1);

  const kpis = [
    { title: 'Open Issues', value: openCount, icon: AlertCircle, trend: '+12%', trendUp: true, color: 'hsl(var(--destructive))' },
    { title: 'SLA Breaches', value: slaBreaches, icon: AlertTriangle, trend: '-8%', trendUp: false, color: 'hsl(var(--warning))' },
    { title: 'Resolved Today', value: resolvedToday, icon: CheckCircle2, trend: '+23%', trendUp: true, color: 'hsl(var(--success))' },
    { title: 'AI Accuracy', value: `${aiAccuracy}%`, icon: Bot, trend: '+1.2%', trendUp: true, color: 'hsl(var(--primary))' },
  ];

  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of civic grievance operations.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <kpi.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {kpi.trendUp ? <TrendingUp className="w-3 h-3 text-success" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                      <span className={`text-xs font-medium ${kpi.trendUp ? 'text-success' : 'text-destructive'}`}>{kpi.trend}</span>
                      <span className="text-xs text-muted-foreground">7d</span>
                    </div>
                  </div>
                  <MiniSparkline data={sparkData} color={kpi.color} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SLA Breaches by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={slaBreachData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="department" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Bar dataKey="breaches" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Complaints Resolved Over Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={resolvedOverWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Line type="monotone" dataKey="resolved" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: 'hsl(var(--success))', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap + Recent Complaints Tabs */}
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Complaints</TabsTrigger>
          <TabsTrigger value="heatmap" className="gap-1.5">
            <Map className="w-3.5 h-3.5" /> Live Heatmap
          </TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Complaint Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminHeatmap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentComplaints.map(c => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.id} · {c.date}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  c.status === 'resolved' ? 'bg-success/10 text-success'
                  : c.status === 'in-progress' ? 'bg-warning/10 text-warning'
                  : c.status === 'escalated' ? 'bg-destructive/10 text-destructive'
                  : 'bg-destructive/10 text-destructive'
                }`}>
                  {c.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
