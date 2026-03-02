import React, { createContext, useContext, useState, useCallback } from 'react';
import { Complaint, ComplaintStatus, mockComplaints } from '@/data/mockData';

interface AppContextType {
  complaints: Complaint[];
  updateComplaintStatus: (id: string, status: ComplaintStatus) => void;
  addComplaint: (complaint: Complaint) => void;
  getComplaint: (id: string) => Complaint | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);

  const updateComplaintStatus = useCallback((id: string, status: ComplaintStatus) => {
    setComplaints(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              status,
              timeline: [
                ...c.timeline,
                {
                  stage: status === 'resolved' ? 'Resolved' : status === 'escalated' ? 'Escalated' : 'Status Updated',
                  timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                  department: 'Admin Authority',
                  description: `Status updated to ${status}`,
                },
              ],
            }
          : c
      )
    );
  }, []);

  const addComplaint = useCallback((complaint: Complaint) => {
    setComplaints(prev => [complaint, ...prev]);
  }, []);

  const getComplaint = useCallback(
    (id: string) => complaints.find(c => c.id === id),
    [complaints]
  );

  return (
    <AppContext.Provider value={{ complaints, updateComplaintStatus, addComplaint, getComplaint }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
