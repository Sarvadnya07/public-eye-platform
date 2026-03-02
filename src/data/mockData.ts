export type ComplaintCategory = 'water' | 'roads' | 'electricity' | 'sanitation';
export type ComplaintStatus = 'pending' | 'in-progress' | 'resolved' | 'escalated';

export interface TimelineEntry {
  stage: string;
  timestamp: string;
  department: string;
  description: string;
  hash?: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  date: string;
  aiConfidence: number;
  blockchainHash: string;
  department: string;
  isAnonymous: boolean;
  location: string;
  timeline: TimelineEntry[];
  ledgerVerified: boolean;
  images?: string[];
}

export const categoryIcons: Record<ComplaintCategory, string> = {
  water: 'Droplets',
  roads: 'Construction',
  electricity: 'Zap',
  sanitation: 'Trash2',
};

export const categoryLabels: Record<ComplaintCategory, string> = {
  water: 'Water & Sewage',
  roads: 'Roads & Infrastructure',
  electricity: 'Electricity & Power',
  sanitation: 'Sanitation & Waste',
};

export const statusColors: Record<ComplaintStatus, string> = {
  pending: 'destructive',
  'in-progress': 'warning',
  resolved: 'success',
  escalated: 'destructive',
};

export const mockComplaints: Complaint[] = [
  {
    id: 'PE-2026-X89',
    title: 'Burst water main on 5th Avenue',
    description: 'A major water main burst causing flooding on 5th Avenue near the central market. Water pressure in surrounding areas has dropped significantly. Multiple shops affected.',
    category: 'water',
    status: 'in-progress',
    date: '2026-02-28',
    aiConfidence: 94,
    blockchainHash: '0x8F2A1B3C4D5E6F7890ABCDEF1234567890ABCDEF',
    department: 'Water & Sewage Dept.',
    isAnonymous: false,
    location: '5th Avenue, Ward 4',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-28 09:41 AM', department: 'Public Portal', description: 'Complaint registered via citizen portal', hash: '0x8F2...A1B' },
      { stage: 'AI Routed', timestamp: '2026-02-28 09:43 AM', department: 'AI Engine', description: 'Auto-categorized as Water issue (94% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-28 10:15 AM', department: 'Water & Sewage Dept.', description: 'Assigned to field team Ward 4' },
    ],
  },
  {
    id: 'PE-2026-K12',
    title: 'Massive pothole on National Highway 7',
    description: 'A dangerous pothole approximately 3 feet wide has formed on NH-7 near the Greenfield exit. Multiple vehicles have been damaged. Urgent repair required.',
    category: 'roads',
    status: 'pending',
    date: '2026-03-01',
    aiConfidence: 97,
    blockchainHash: '0xA3B4C5D6E7F8901234567890ABCDEF1234567890',
    department: 'Roads & Highways Dept.',
    isAnonymous: false,
    location: 'NH-7, Greenfield Exit',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-03-01 07:22 AM', department: 'Public Portal', description: 'Complaint registered via citizen portal', hash: '0xA3B...890' },
      { stage: 'AI Routed', timestamp: '2026-03-01 07:24 AM', department: 'AI Engine', description: 'Auto-categorized as Roads issue (97% confidence)' },
    ],
  },
  {
    id: 'PE-2026-M34',
    title: 'Street lights out in Sector 12 for 2 weeks',
    description: 'All 14 street lights along the main road in Sector 12 have been non-functional for the past two weeks. Area is extremely dark and unsafe at night.',
    category: 'electricity',
    status: 'resolved',
    date: '2026-02-15',
    aiConfidence: 91,
    blockchainHash: '0xD4E5F6A7B8C9012345678901BCDEF01234567890',
    department: 'Electrical Maintenance',
    isAnonymous: false,
    location: 'Sector 12, Main Road',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-15 06:30 PM', department: 'Public Portal', description: 'Complaint registered via citizen portal', hash: '0xD4E...890' },
      { stage: 'AI Routed', timestamp: '2026-02-15 06:32 PM', department: 'AI Engine', description: 'Auto-categorized as Electricity issue (91% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-16 09:00 AM', department: 'Electrical Maintenance', description: 'Crew dispatched to Sector 12' },
      { stage: 'Resolved', timestamp: '2026-02-18 02:45 PM', department: 'Electrical Maintenance', description: 'All 14 lights replaced and tested', hash: '0xF1E...2D3' },
    ],
  },
  {
    id: 'PE-2026-R56',
    title: 'Sewage overflow near Riverside Colony',
    description: 'Raw sewage is overflowing from a manhole near Riverside Colony Gate 2. Strong odor and health hazard for residents. Children play area contaminated.',
    category: 'sanitation',
    status: 'escalated',
    date: '2026-02-27',
    aiConfidence: 88,
    blockchainHash: '0xE5F6A7B8C901234567890ABCDEF12345678901234',
    department: 'Sanitation Authority',
    isAnonymous: true,
    location: 'Riverside Colony, Gate 2',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-27 11:20 AM', department: 'Public Portal', description: 'Anonymous complaint registered', hash: '0xE5F...234' },
      { stage: 'AI Routed', timestamp: '2026-02-27 11:22 AM', department: 'AI Engine', description: 'Auto-categorized as Sanitation issue (88% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-27 02:00 PM', department: 'Sanitation Authority', description: 'Initial assessment completed' },
      { stage: 'Escalated', timestamp: '2026-02-28 09:00 AM', department: 'District Commissioner', description: 'Escalated due to health hazard severity' },
    ],
  },
  {
    id: 'PE-2026-T78',
    title: 'Low water pressure in Hilltop Estate',
    description: 'Residents of Hilltop Estate have been experiencing extremely low water pressure for the past 5 days. Upper floors receive no water at all during peak hours.',
    category: 'water',
    status: 'in-progress',
    date: '2026-02-25',
    aiConfidence: 92,
    blockchainHash: '0xF6A7B8C9012345678901ABCDEF234567890123456',
    department: 'Water & Sewage Dept.',
    isAnonymous: false,
    location: 'Hilltop Estate, Block C',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-25 08:15 AM', department: 'Public Portal', description: 'Complaint registered via citizen portal', hash: '0xF6A...456' },
      { stage: 'AI Routed', timestamp: '2026-02-25 08:17 AM', department: 'AI Engine', description: 'Auto-categorized as Water issue (92% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-26 10:30 AM', department: 'Water & Sewage Dept.', description: 'Pump station inspection scheduled' },
    ],
  },
  {
    id: 'PE-2026-U90',
    title: 'Damaged bridge railing on Old Town Bridge',
    description: 'The metal railing on Old Town Bridge is severely damaged and hanging loose. Poses extreme danger to pedestrians, especially during rush hour.',
    category: 'roads',
    status: 'pending',
    date: '2026-03-01',
    aiConfidence: 95,
    blockchainHash: '0xA7B8C90123456789012BCDEF3456789012345678',
    department: 'Roads & Highways Dept.',
    isAnonymous: false,
    location: 'Old Town Bridge',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-03-01 10:05 AM', department: 'Public Portal', description: 'Complaint registered via citizen portal', hash: '0xA7B...678' },
      { stage: 'AI Routed', timestamp: '2026-03-01 10:07 AM', department: 'AI Engine', description: 'Auto-categorized as Roads issue (95% confidence)' },
    ],
  },
  {
    id: 'PE-2026-V11',
    title: 'Complete power outage in District 7',
    description: 'Entire District 7 has been without electricity for over 12 hours. Hospital running on backup generators. Situation critical for elderly and patients on home care.',
    category: 'electricity',
    status: 'in-progress',
    date: '2026-03-02',
    aiConfidence: 99,
    blockchainHash: '0xB8C901234567890123CDEF45678901234567890A',
    department: 'Power Distribution Corp.',
    isAnonymous: false,
    location: 'District 7, All Sectors',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-03-02 02:00 AM', department: 'Emergency Line', description: 'Emergency complaint registered', hash: '0xB8C...90A' },
      { stage: 'AI Routed', timestamp: '2026-03-02 02:01 AM', department: 'AI Engine', description: 'Auto-categorized as Electricity (99% confidence) — PRIORITY' },
      { stage: 'In Progress', timestamp: '2026-03-02 03:30 AM', department: 'Power Distribution Corp.', description: 'Emergency crew dispatched. Transformer failure identified.' },
    ],
  },
  {
    id: 'PE-2026-W22',
    title: 'Illegal dumping at Green Park',
    description: 'Construction debris and household waste is being illegally dumped at the northern entrance of Green Park. Area has become a health hazard with rodent infestation.',
    category: 'sanitation',
    status: 'resolved',
    date: '2026-02-20',
    aiConfidence: 86,
    blockchainHash: '0xC901234567890123DEF456789012345678901234B',
    department: 'Municipal Sanitation',
    isAnonymous: true,
    location: 'Green Park, North Entrance',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-20 09:00 AM', department: 'Public Portal', description: 'Anonymous complaint registered', hash: '0xC90...34B' },
      { stage: 'AI Routed', timestamp: '2026-02-20 09:02 AM', department: 'AI Engine', description: 'Auto-categorized as Sanitation issue (86% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-21 08:00 AM', department: 'Municipal Sanitation', description: 'Cleanup crew assigned' },
      { stage: 'Resolved', timestamp: '2026-02-23 04:00 PM', department: 'Municipal Sanitation', description: 'Site cleaned. CCTV installed for monitoring.', hash: '0xD12...E34' },
    ],
  },
  {
    id: 'PE-2026-A33',
    title: 'Contaminated water supply in Ward 9',
    description: 'Residents report brown/yellow water with strong chemical odor from taps. Multiple cases of skin rashes reported. Laboratory testing urgently needed.',
    category: 'water',
    status: 'escalated',
    date: '2026-02-26',
    aiConfidence: 96,
    blockchainHash: '0xD0123456789012345EF6789012345678901234567',
    department: 'Water Quality Board',
    isAnonymous: false,
    location: 'Ward 9, All Blocks',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-26 07:00 AM', department: 'Public Portal', description: 'Complaint registered with photo evidence', hash: '0xD01...567' },
      { stage: 'AI Routed', timestamp: '2026-02-26 07:02 AM', department: 'AI Engine', description: 'Auto-categorized as Water issue (96% confidence) — HEALTH ALERT' },
      { stage: 'In Progress', timestamp: '2026-02-26 09:00 AM', department: 'Water Quality Board', description: 'Water samples collected for testing' },
      { stage: 'Escalated', timestamp: '2026-02-27 11:00 AM', department: 'Health Commissioner', description: 'Elevated lead levels detected. Public advisory issued.' },
    ],
  },
  {
    id: 'PE-2026-B44',
    title: 'Unpaved road collapse after heavy rain',
    description: 'The unpaved access road to Village Sector 3 has partially collapsed creating a 6-foot drop. Residents are stranded with no alternative route.',
    category: 'roads',
    status: 'in-progress',
    date: '2026-02-24',
    aiConfidence: 93,
    blockchainHash: '0xE12345678901234567F890123456789012345678C',
    department: 'Rural Roads Division',
    isAnonymous: false,
    location: 'Village Sector 3, Access Road',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-24 06:45 AM', department: 'Public Portal', description: 'Emergency complaint with geo-tagged photos', hash: '0xE12...78C' },
      { stage: 'AI Routed', timestamp: '2026-02-24 06:47 AM', department: 'AI Engine', description: 'Auto-categorized as Roads issue (93% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-24 11:00 AM', department: 'Rural Roads Division', description: 'Emergency assessment. Temporary bypass being constructed.' },
    ],
  },
  {
    id: 'PE-2026-C55',
    title: 'Transformer explosion in Industrial Zone',
    description: 'A distribution transformer exploded in Industrial Zone Block F at 3 AM. No casualties reported but 47 factories are without power. Production losses mounting.',
    category: 'electricity',
    status: 'pending',
    date: '2026-03-02',
    aiConfidence: 98,
    blockchainHash: '0xF234567890123456780A1234567890123456789DE',
    department: 'Industrial Power Authority',
    isAnonymous: false,
    location: 'Industrial Zone, Block F',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-03-02 03:15 AM', department: 'Industrial Helpline', description: 'Emergency complaint registered', hash: '0xF23...9DE' },
      { stage: 'AI Routed', timestamp: '2026-03-02 03:16 AM', department: 'AI Engine', description: 'Auto-categorized as Electricity issue (98% confidence) — CRITICAL' },
    ],
  },
  {
    id: 'PE-2026-D66',
    title: 'Clogged storm drains causing flooding',
    description: 'Multiple storm drains in Market Square are completely clogged with debris. Even light rain causes knee-deep flooding, disrupting commerce and pedestrian movement.',
    category: 'sanitation',
    status: 'in-progress',
    date: '2026-02-22',
    aiConfidence: 89,
    blockchainHash: '0x034567890123456789B12345678901234567890EF',
    department: 'Drainage & Flood Control',
    isAnonymous: false,
    location: 'Market Square, Central',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-22 04:30 PM', department: 'Public Portal', description: 'Complaint registered during flooding event', hash: '0x034...0EF' },
      { stage: 'AI Routed', timestamp: '2026-02-22 04:32 PM', department: 'AI Engine', description: 'Auto-categorized as Sanitation issue (89% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-23 07:00 AM', department: 'Drainage & Flood Control', description: 'Drain cleaning operation commenced' },
    ],
  },
  {
    id: 'PE-2026-E77',
    title: 'Fire hydrant leak wasting water',
    description: 'A fire hydrant at the corner of Maple Street and 3rd Avenue has been leaking continuously for a week. Estimated water waste: 500 gallons per day.',
    category: 'water',
    status: 'resolved',
    date: '2026-02-18',
    aiConfidence: 90,
    blockchainHash: '0x14567890123456789AC2345678901234567890123',
    department: 'Water & Sewage Dept.',
    isAnonymous: false,
    location: 'Maple St & 3rd Ave',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-18 11:00 AM', department: 'Public Portal', description: 'Complaint registered via citizen portal', hash: '0x145...123' },
      { stage: 'AI Routed', timestamp: '2026-02-18 11:02 AM', department: 'AI Engine', description: 'Auto-categorized as Water issue (90% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-19 08:30 AM', department: 'Water & Sewage Dept.', description: 'Repair crew scheduled' },
      { stage: 'Resolved', timestamp: '2026-02-19 03:00 PM', department: 'Water & Sewage Dept.', description: 'Hydrant valve replaced and sealed', hash: '0x256...789' },
    ],
  },
  {
    id: 'PE-2026-F88',
    title: 'Missing road signs on Highway Junction',
    description: 'Critical directional signs at the Highway 4/Highway 12 junction have been missing for over a month. Multiple accidents reported due to wrong turns.',
    category: 'roads',
    status: 'resolved',
    date: '2026-02-10',
    aiConfidence: 87,
    blockchainHash: '0x2567890123456789ABD345678901234567890ABCD',
    department: 'Traffic & Signage Dept.',
    isAnonymous: false,
    location: 'HW-4/HW-12 Junction',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-02-10 02:00 PM', department: 'Public Portal', description: 'Complaint registered via citizen portal', hash: '0x256...BCD' },
      { stage: 'AI Routed', timestamp: '2026-02-10 02:02 PM', department: 'AI Engine', description: 'Auto-categorized as Roads issue (87% confidence)' },
      { stage: 'In Progress', timestamp: '2026-02-12 09:00 AM', department: 'Traffic & Signage Dept.', description: 'Survey completed. Signs ordered.' },
      { stage: 'Resolved', timestamp: '2026-02-17 11:00 AM', department: 'Traffic & Signage Dept.', description: 'New reflective signs installed and verified', hash: '0x367...DEF' },
    ],
  },
  {
    id: 'PE-2026-G99',
    title: 'Faulty traffic signal at School Zone',
    description: 'The traffic signal at Oak Elementary School crossing has been stuck on green for all directions simultaneously. Extremely dangerous during school hours.',
    category: 'electricity',
    status: 'pending',
    date: '2026-03-01',
    aiConfidence: 85,
    blockchainHash: '0x367890123456789ABCE45678901234567890ABCDE',
    department: 'Traffic Engineering',
    isAnonymous: false,
    location: 'Oak Elementary School Crossing',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-03-01 07:45 AM', department: 'Emergency Line', description: 'Emergency complaint from school principal', hash: '0x367...CDE' },
      { stage: 'AI Routed', timestamp: '2026-03-01 07:46 AM', department: 'AI Engine', description: 'Auto-categorized as Electricity issue (85% confidence)' },
    ],
  },
  {
    id: 'PE-2026-H10',
    title: 'Overflowing public waste bins in Market Area',
    description: 'All 22 public waste bins in the Central Market area have been overflowing for 4 days. No collection service has visited. Stray animals spreading garbage everywhere.',
    category: 'sanitation',
    status: 'pending',
    date: '2026-03-01',
    aiConfidence: 93,
    blockchainHash: '0x4789012345678901BCD567890123456789012345EF',
    department: 'Municipal Sanitation',
    isAnonymous: false,
    location: 'Central Market Area',
    ledgerVerified: true,
    timeline: [
      { stage: 'Submitted', timestamp: '2026-03-01 08:30 AM', department: 'Public Portal', description: 'Complaint registered with multiple photos', hash: '0x478...5EF' },
      { stage: 'AI Routed', timestamp: '2026-03-01 08:32 AM', department: 'AI Engine', description: 'Auto-categorized as Sanitation issue (93% confidence)' },
    ],
  },
];

export const mockStats = {
  totalResolved: 12450,
  avgResolutionHours: 48,
  latestHash: '0x8F2...A1B',
  aiAccuracyRate: 94.7,
  activeCases: 1247,
  slaBreaches: 23,
  resolvedToday: 47,
  openIssues: 312,
};

export const generateTrackingId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const suffix = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `PE-2026-${suffix}`;
};

export const generateBlockchainHash = () => {
  const hex = '0123456789ABCDEF';
  const hash = Array.from({ length: 40 }, () => hex[Math.floor(Math.random() * 16)]).join('');
  return `0x${hash}`;
};
