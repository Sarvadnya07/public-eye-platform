import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Shield, Droplets, Construction, Zap, Trash2, ChevronUp, ChevronDown, MapPin, X as XIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useApp } from '@/contexts/AppContext';
import { type Complaint, type ComplaintCategory, type ComplaintStatus, categoryLabels } from '@/data/mockData';

const catIcons: Record<ComplaintCategory, typeof Droplets> = {
  water: Droplets,
  roads: Construction,
  electricity: Zap,
  sanitation: Trash2,
};

type SortKey = 'id' | 'date' | 'status';

const Issues = () => {
  const { complaints, updateComplaintStatus } = useApp();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailId, setDetailId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus | ''>('');

  const filtered = useMemo(() => {
    let list = complaints.filter(c => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === 'all' || c.category === catFilter;
      return matchSearch && matchCat;
    });
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'id') cmp = a.id.localeCompare(b.id);
      else if (sortKey === 'date') cmp = a.date.localeCompare(b.date);
      else cmp = a.status.localeCompare(b.status);
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [complaints, search, catFilter, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => (
    sortKey === k ? (sortAsc ? <ChevronUp className="w-3 h-3 inline ml-1" /> : <ChevronDown className="w-3 h-3 inline ml-1" />) : null
  );

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(c => c.id)));
  };

  const detail = detailId ? complaints.find(c => c.id === detailId) : null;

  const handleSaveStatus = () => {
    if (detailId && newStatus) {
      updateComplaintStatus(detailId, newStatus);
      toast.success('Status successfully updated and verified on chain.');
      setDetailId(null);
      setNewStatus('');
    }
  };

  const statusBadge = (status: ComplaintStatus) => {
    const cls = status === 'resolved' ? 'bg-success/10 text-success border-success/20'
      : status === 'in-progress' ? 'bg-warning/10 text-warning border-warning/20'
      : 'bg-destructive/10 text-destructive border-destructive/20';
    return <Badge variant="outline" className={cls}>{status.replace('-', ' ')}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Issues</h1>
        <p className="text-sm text-muted-foreground">Manage and resolve civic complaints.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by title or ID..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {(Object.entries(categoryLabels) as [ComplaintCategory, string][]).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} />
                </TableHead>
                <TableHead className="cursor-pointer whitespace-nowrap sticky left-0 bg-background z-10" onClick={() => toggleSort('id')}>
                  ID <SortIcon k="id" />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('date')}>
                  Date <SortIcon k="date" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('status')}>
                  Status <SortIcon k="status" />
                </TableHead>
                <TableHead>Ledger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => {
                const CatIcon = catIcons[c.category];
                return (
                  <TableRow key={c.id} className="cursor-pointer hover:bg-muted/50" onClick={() => { setDetailId(c.id); setNewStatus(c.status); }}>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <Checkbox checked={selected.has(c.id)} onCheckedChange={() => toggleSelect(c.id)} />
                    </TableCell>
                    <TableCell className="font-mono text-xs whitespace-nowrap sticky left-0 bg-background">{c.id}</TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{c.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <CatIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs">{categoryLabels[c.category].split(' ')[0]}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs whitespace-nowrap">{c.date}</TableCell>
                    <TableCell>{statusBadge(c.status)}</TableCell>
                    <TableCell>
                      {c.ledgerVerified && <Shield className="w-4 h-4 text-success" />}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} complaints · {selected.size} selected</p>

      {/* Detail Sheet */}
      <Sheet open={!!detailId} onOpenChange={open => { if (!open) setDetailId(null); }}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {detail && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{detail.id}</SheetTitle>
                <SheetDescription>{detail.title}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">{detail.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Category</p>
                    <p className="font-medium text-foreground">{categoryLabels[detail.category]}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Department</p>
                    <p className="font-medium text-foreground">{detail.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Location</p>
                    <p className="font-medium text-foreground">{detail.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">AI Confidence</p>
                    <p className="font-medium text-foreground">{detail.aiConfidence}%</p>
                  </div>
                </div>

                {/* Mock map */}
                <div className="border border-border rounded-lg h-32 bg-muted flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Map: {detail.location}</span>
                </div>

                {/* Status update */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-foreground">Update Status</p>
                  <Select value={newStatus} onValueChange={v => setNewStatus(v as ComplaintStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="escalated">Escalated</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full" onClick={handleSaveStatus}>Save & Verify on Chain</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Issues;
