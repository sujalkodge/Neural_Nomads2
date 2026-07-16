import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  User, 
  Activity, 
  Calendar, 
  CalendarCheck,
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Layers, 
  CloudSun, 
  CalendarRange, 
  Plus, 
  Check, 
  X, 
  Lock, 
  Settings, 
  Info,
  Zap,
  ArrowRight,
  TrendingDown,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  UploadCloud,
  FileWarning,
  Users,
  IndianRupee
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for initial states
const INITIAL_ALERTS = [
  { id: 1, time: '10:00 AM', line: 'Line 3', text: 'Machine Cycle Glitch Detected on Line 3', severity: 'high', status: 'active', type: 'mechanical' },
  { id: 2, time: '09:14 AM', line: 'Line B', text: 'Micro-defect Spike on Assembly Line B', severity: 'medium', status: 'active', type: 'defect' },
  { id: 3, time: '08:30 AM', line: 'Marketing', text: 'Social Ad campaign budget limit reached', severity: 'low', status: 'active', type: 'budget' }
];

const AI_RESOLUTION_REPORTS = {
  'Machine Cycle Glitch Detected on Line 3': {
    analysis: 'Autonomous agent detected a cycle synchronization anomaly in Line 3 conveyor belt drive belt systems, leading to a temporary feedback buffer overload in the telemetry registers.',
    steps: [
      'Isolated conveyor belt Line 3 motor drives to prevent mechanical backlash.',
      'Conducted telemetry scan and identified 450ms packet delivery delay in active feedback sensor.',
      'Flushed conveyor motor driver registry cache and calibrated feedback alignment thresholds.',
      'Initiated driver software hot-patch override. Line operational cycle timings confirmed stable (less than 0.05% variance).'
    ]
  },
  'Micro-defect Spike on Assembly Line B': {
    analysis: 'Optical quality control modules registered a sudden defect spike caused by lens alignment drift on active camera nodes due to localized structure vibration.',
    steps: [
      'Analyzed defect image packets in real-time, isolating micro-defects to the camera lens drift.',
      'Applied localized lens autofocus stabilizer correction algorithms to dynamic optical modules.',
      'Recalibrated threshold tolerance values on structural quality validation nodes.',
      'Verified alignment checks; defect rates successfully returned to nominal levels (less than 0.02%).'
    ]
  },
  'Social Ad campaign budget limit reached': {
    analysis: 'Facebook and Google Marketing API integration reported campaign bids hit their diurnal budget limit of $10,000, causing active marketing threads to pause.',
    steps: [
      'Intercepted diurnal budget cap warning signals from the advertising portal.',
      'Dynamically reallocated bids to off-peak slots to sustain brand impressions at a 30% discount.',
      'Disabled underperforming creative ad assets to optimize ROI within constraints.',
      'Flagged budget status to Marketing Admin for optional supplement injections.'
    ]
  },
  'generic': {
    analysis: 'AI anomaly detection algorithms flagged behavioral telemetry values deviating from the standard baseline within system operation loops.',
    steps: [
      'Isolated anomaly propagation threads to protect other system modules.',
      'Executed automated process diagnostics and memory verification loops.',
      'Restored system registry values to standard operational baseline.',
      'Confirmed network latencies and overall service availability ratios have stabilized.'
    ]
  }
};

const INITIAL_MEETINGS = [
  { id: 1, title: 'Cross-Department Operational Sync', time: '10:30 AM', date: '2026-07-07', department: 'Operations', invitees: ['All Staff', 'Manager'], status: 'pending', rsvp: 'none' },
  { id: 2, title: 'Client Briefing: Alpha Logistics', time: '02:00 PM', date: '2026-07-07', department: 'Logistics', invitees: ['Manager', 'Lead Logistics Engineer'], status: 'confirmed', rsvp: 'none' },
  { id: 3, title: 'Engineering Post-Mortem', time: '04:00 PM', date: '2026-07-08', department: 'Engineering', invitees: ['Line Operators', 'Manager'], status: 'pending', rsvp: 'none' }
];

const INITIAL_HOLIDAYS = [
  { id: 1, name: 'Statutory Holiday: Independence Day', date: '2026-07-04', type: 'statutory', impact: 'High (Labor Shortage)' },
  { id: 2, name: 'Operational Summer Shutdown', date: '2026-07-24', type: 'mandated', impact: 'Complete Shift (Zero Production)' },
  { id: 3, name: 'Labor Day', date: '2026-09-07', type: 'statutory', impact: 'Moderate (Premium Overtime)' }
];

const INITIAL_LEAVE_REQUESTS = [
  { id: 1, employee: 'John Doe', startDate: '2026-07-10', endDate: '2026-07-14', reason: 'Hometown visit & family gather', days: 3, status: 'pending' },
  { id: 2, employee: 'Jane Smith', startDate: '2026-07-18', endDate: '2026-07-20', reason: 'Personal dental treatment', days: 2, status: 'approved' },
  { id: 3, employee: 'David Miller', startDate: '2026-08-01', endDate: '2026-08-05', reason: 'Summer vacation trip', days: 4, status: 'rejected' }
];

const INITIAL_CORRELATION_DATA = [
  { name: '06-25', adSpend: 96000, registerSales: 272000, factoryCapacity: 85 },
  { name: '06-26', adSpend: 120000, registerSales: 328000, factoryCapacity: 88 },
  { name: '06-27', adSpend: 144000, registerSales: 384000, factoryCapacity: 92 },
  { name: '06-28', adSpend: 72000, registerSales: 232000, factoryCapacity: 75 },
  { name: '06-29', adSpend: 176000, registerSales: 448000, factoryCapacity: 95 },
  { name: '06-30', adSpend: 192000, registerSales: 488000, factoryCapacity: 96 },
  { name: '07-01', adSpend: 128000, registerSales: 352000, factoryCapacity: 84 },
  { name: '07-02', adSpend: 152000, registerSales: 416000, factoryCapacity: 89 },
  { name: '07-03', adSpend: 200000, registerSales: 544000, factoryCapacity: 98 },
  { name: '07-04', adSpend: 88000, registerSales: 248000, factoryCapacity: 50 }, // Holiday drop
  { name: '07-05', adSpend: 160000, registerSales: 432000, factoryCapacity: 87 },
  { name: '07-06', adSpend: 168000, registerSales: 464000, factoryCapacity: 91 }
];

export default function App() {
  // Navigation & Role states
  const [role, setRole] = useState('logged-out'); // 'logged-out' | 'manager' | 'employee'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'scheduler' | 'leaves' | 'chatbot'
  const [activeAlertsTab, setActiveAlertsTab] = useState('system'); // 'system' | 'reports'
  const [user, setUser] = useState(null);
  const [authType, setAuthType] = useState('login'); // 'login' | 'register'
  
  // Auth Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('employee');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(''); // success message shown on login after registration

  // Manager: Employee registry
  const [employeeCount, setEmployeeCount] = useState(0);
  const [registeredEmployees, setRegisteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAlertForResolution, setSelectedAlertForResolution] = useState(null);
  const [isSavingHours, setIsSavingHours] = useState(false);
  const [saveHoursSuccess, setSaveHoursSuccess] = useState('');
  const [showLogHoursModal, setShowLogHoursModal] = useState(false);
  const [employeeLogHours, setEmployeeLogHours] = useState({
    monday: { workHours: 8, overtimeHours: 0 },
    tuesday: { workHours: 8, overtimeHours: 0 },
    wednesday: { workHours: 8, overtimeHours: 0 },
    thursday: { workHours: 8, overtimeHours: 0 },
    friday: { workHours: 8, overtimeHours: 0 }
  });
  const [logHoursError, setLogHoursError] = useState('');



  // Employee: Issue / Problem submissions
  const [issues, setIssues] = useState([]);
  const [issueForm, setIssueForm] = useState({ title: '', category: 'operational', description: '', priority: 'medium' });
  const [issueSubmitSuccess, setIssueSubmitSuccess] = useState('');

  // Verify token on load
  useEffect(() => {
    const verifyUserSession = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      
      try {
        setAuthLoading(true);
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setRole(userData.role);
        } else {
          localStorage.removeItem('auth_token');
        }
      } catch (error) {
        console.error('Session verification error:', error);
      } finally {
        setAuthLoading(false);
      }
    };
    verifyUserSession();
  }, []);

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      setAuthError('Please fill in all fields.');
      return;
    }
    
    try {
      setAuthLoading(true);
      setAuthError('');
      setAuthSuccess('');
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loginIdentifier,
          password: loginPassword
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      setRole(data.user.role);
      
      // Clear forms
      setLoginIdentifier('');
      setLoginPassword('');
    } catch (err) {
      setAuthError(err.message || 'Incorrect credentials or database server is offline.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Fetch employee list whenever manager is logged in
  useEffect(() => {
    if (role !== 'manager') return;
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch('/api/manager/employees', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setEmployeeCount(data.count);
          setRegisteredEmployees(data.employees);
        }
      } catch (e) {
        console.error('Failed to fetch employees:', e);
      }
    };
    fetchEmployees();
  }, [role]);

  // Handle employee logging their own hours
  const handleEmployeeLogHours = async (e) => {
    e.preventDefault();
    setIsSavingHours(true);
    setLogHoursError('');
    
    // Validate daily hours limit (24 hours per day)
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    for (const day of days) {
      const dayData = employeeLogHours[day];
      const sum = Number(dayData.workHours || 0) + Number(dayData.overtimeHours || 0);
      if (sum > 24) {
        setLogHoursError(`Active hours for ${day.toUpperCase()} cannot exceed 24 hours (Current: ${sum}h).`);
        setIsSavingHours(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/employee/hours', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ dailyHours: employeeLogHours })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update hours');
      
      // Update local logged-in user profile state
      setUser(data);
      setSaveHoursSuccess('Your daily work hours have been successfully logged!');
      setTimeout(() => {
        setSaveHoursSuccess('');
        setShowLogHoursModal(false);
      }, 2000);
    } catch (err) {
      console.error('Error logging hours:', err);
      setLogHoursError(err.message || 'Error occurred while logging hours.');
    } finally {
      setIsSavingHours(false);
    }
  };


  // Handle employee issue submission → persisted to MongoDB
  const handleSubmitIssue = async (e) => {
    e.preventDefault();
    if (!issueForm.title || !issueForm.description) return;
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(issueForm)
      });
      if (res.ok) {
        const saved = await res.json();
        setIssues(prev => [saved, ...prev]);
        setIssueForm({ title: '', category: 'operational', description: '', priority: 'medium' });
        setIssueSubmitSuccess('Issue submitted! Management has been notified in real-time.');
        setTimeout(() => setIssueSubmitSuccess(''), 4000);
      } else {
        const err = await res.json();
        setIssueSubmitSuccess(`Error: ${err.message}`);
      }
    } catch (error) {
      console.error('Issue submit failed:', error);
      setIssueSubmitSuccess('Network error. Please try again.');
    }
  };

  // Fetch issues — employee sees own, manager sees all (with 10s polling)
  useEffect(() => {
    if (role === 'logged-out') return;
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch('/api/issues', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setIssues(data);
        }
      } catch (e) { console.error('Failed to fetch issues:', e); }
    };
    fetchIssues();
    const interval = setInterval(fetchIssues, 10000); // poll every 10s
    return () => clearInterval(interval);
  }, [role]);

  // Manager: resolve an employee-reported issue
  const handleResolveIssue = async (issueId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/issues/${issueId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'resolved' })
      });
      if (res.ok) {
        const updated = await res.json();
        setIssues(prev => prev.map(i => i._id === issueId ? updated : i));
      }
    } catch (e) { console.error('Failed to resolve issue:', e); }
  };

  // Handle registration submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regUsername || !regEmail || !regPassword) {
      setAuthError('Please fill in all fields.');
      return;
    }
    
    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }
    
    try {
      setAuthLoading(true);
      setAuthError('');
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
          role: regRole
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Clear forms and redirect to login with success message
      setRegUsername('');
      setRegEmail('');
      setRegPassword('');
      setRegRole('employee');
      setAuthError('');
      setAuthSuccess(`Account created for "${data.user.username}"! Please log in to continue.`);
      setAuthType('login');
    } catch (err) {
      setAuthError(err.message || 'Registration failed. Username/Email might be taken or database server is offline.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setRole('logged-out');
  };
  
  // Dashboard & Operations State
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [holidays, setHolidays] = useState(INITIAL_HOLIDAYS);
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [correlationData, setCorrelationData] = useState(INITIAL_CORRELATION_DATA);
  
  // Financial Metrics
  const [cashFlow, setCashFlow] = useState(842500);
  const [operationalCosts, setOperationalCosts] = useState(128400);
  const [netMargins, setNetMargins] = useState(24.5);
  
  // Employee personal state
  const [employeeBalance, setEmployeeBalance] = useState(12); // starts at 12 remaining days
  
  // Decision Pillars State
  const [pillar1Status, setPillar1Status] = useState('warning'); // 'warning' | 'executing' | 'resolved'
  const [pillar1Text, setPillar1Text] = useState('Sales Drop & Inventory Surge Warning detected in North-East Region.');
  const [predictiveOrderReduction, setPredictiveOrderReduction] = useState(20);
  
  // Scheduler Modal State
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    time: '10:00 AM',
    date: '2026-07-07',
    department: 'Operations',
    invitees: 'All Staff'
  });
  const [aiSlotHelper, setAiSlotHelper] = useState(null); // { status: 'green'|'red', text: string }
  
  // Leave Form State
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });
  
  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { 
      sender: 'bot', 
      text: "Greetings. I am AetherOps Decision Intelligence AI. How may I assist your operations management today?", 
      time: '15:33',
      chips: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Trigger chatbot welcome chips on role change
  useEffect(() => {
    if (role === 'manager') {
      setChatMessages([
        {
          sender: 'bot',
          text: "System authenticated: **Manager Access**. Dashboard controls, override rules, and operational action triggers are fully enabled. How can I assist?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          chips: [
            "Summarize today's production bottlenecks",
            "Draft a notification regarding the 10:00 AM mechanical alert",
            "Explain Cash Flow correlations"
          ]
        }
      ]);
    } else if (role === 'employee') {
      setChatMessages([
        {
          sender: 'bot',
          text: "System authenticated: **Employee Access**. Personal schedules, leave records, and team sync statuses are loaded. How can I help you today?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          chips: [
            "How many holiday days do I have left?",
            "Am I scheduled for any cross-functional meetings tomorrow?",
            "Submit a quick personal leave request"
          ]
        }
      ]);
    }
  }, [role]);

  // Reactive logic: Adding/Modifying corporate holidays updates the "Predictive Risk Panel"
  useEffect(() => {
    // Check if there is an upcoming holiday within the next 20 days relative to mock time (2026-07-06)
    const upcomingHolidays = holidays.filter(h => {
      const hDate = new Date(h.date);
      const curDate = new Date('2026-07-06');
      const diffTime = hDate - curDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 20;
    });

    if (upcomingHolidays.length > 0) {
      const closest = upcomingHolidays[0];
      setPredictiveOrderReduction(35); // increase inventory reduction suggestion due to holiday impact
    } else {
      setPredictiveOrderReduction(20);
    }
  }, [holidays]);

  // Action executed handler
  const handleExecutePillar1 = () => {
    setPillar1Status('executing');
    setTimeout(() => {
      setPillar1Status('resolved');
      setPillar1Text('Corrective actions deployed: Triggered promotional discounts on overstocked inventory and automated reallocation of production capacity.');
      setCashFlow(prev => prev + 25000); // simulation outcome
      setOperationalCosts(prev => prev - 8000);
      
      // Add notification log
      const newAlert = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        line: 'System',
        text: 'SUCCESS: Executive action resolved North-East Region inventory warning.',
        severity: 'low',
        status: 'resolved',
        type: 'action'
      };
      setAlerts(prev => [newAlert, ...prev]);
    }, 1500);
  };

  // Schedule a new meeting
  const handleCreateMeeting = (e) => {
    e.preventDefault();
    if (!newMeeting.title.trim()) return;

    const meeting = {
      id: Date.now(),
      title: newMeeting.title,
      time: newMeeting.time,
      date: newMeeting.date,
      department: newMeeting.department,
      invitees: newMeeting.invitees.split(',').map(s => s.trim()),
      status: 'pending',
      rsvp: 'none'
    };

    setMeetings(prev => [...prev, meeting]);
    setShowMeetingModal(false);
    setNewMeeting({
      title: '',
      time: '10:00 AM',
      date: '2026-07-07',
      department: 'Operations',
      invitees: 'All Staff'
    });
    setAiSlotHelper(null);

    // Alert feed log
    setAlerts(prev => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        line: 'Scheduler',
        text: `New Operational Sync scheduled: "${meeting.title}" at ${meeting.time}`,
        severity: 'low',
        status: 'resolved',
        type: 'system'
      },
      ...prev
    ]);
  };

  // AI Assistant slots check simulator
  const checkBestTimeSlot = () => {
    // Peak operation logic: If scheduling at 10:00 AM, say it conflicts with peak activity. 
    // If afternoon (e.g. 02:00 PM), it says it is optimal.
    const hour = parseInt(newMeeting.time.split(':')[0]);
    const isAm = newMeeting.time.toLowerCase().includes('am') || (hour < 12 && !newMeeting.time.toLowerCase().includes('pm'));
    
    if (isAm && (hour >= 9 && hour <= 11)) {
      setAiSlotHelper({
        status: 'red',
        text: 'Peak operational load (Line 3 maintenance window + main shifts handover: 92% capacity). Proposing alternate: 2:30 PM (35% capacity).'
      });
    } else {
      setAiSlotHelper({
        status: 'green',
        text: 'Optimal operational slot (Low factory noise & machinery handover at 15% load). Proceed with confidence.'
      });
    }
  };

  // RSVP response
  const handleRSVP = (meetingId, rsvpStatus) => {
    setMeetings(prev => prev.map(m => {
      if (m.id === meetingId) {
        return { ...m, rsvp: rsvpStatus, status: rsvpStatus === 'accepted' ? 'confirmed' : 'declined' };
      }
      return m;
    }));
  };

  // Submit leave request
  const handleSubmitLeave = (e) => {
    e.preventDefault();
    if (!newLeaveRequest.startDate || !newLeaveRequest.endDate || !newLeaveRequest.reason) return;

    // Calculate days between
    const start = new Date(newLeaveRequest.startDate);
    const end = new Date(newLeaveRequest.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const request = {
      id: Date.now(),
      employee: 'John Doe', // Simulated logged in employee
      startDate: newLeaveRequest.startDate,
      endDate: newLeaveRequest.endDate,
      reason: newLeaveRequest.reason,
      days: diffDays,
      status: 'pending'
    };

    setLeaveRequests(prev => [request, ...prev]);
    setNewLeaveRequest({ startDate: '', endDate: '', reason: '' });

    // Show a success alert
    setAlerts(prev => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        line: 'Leave Mgmt',
        text: `Submitted leave request for ${diffDays} days (${request.startDate} to ${request.endDate}).`,
        severity: 'low',
        status: 'resolved',
        type: 'system'
      },
      ...prev
    ]);
  };

  // Admin Leave actions (Approve / Reject)
  const handleLeaveAction = (requestId, action) => {
    setLeaveRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const updated = { ...req, status: action };
        if (action === 'approved' && req.employee === 'John Doe') {
          // deduct from balance
          setEmployeeBalance(prev => Math.max(0, prev - req.days));
        }
        return updated;
      }
      return req;
    }));

    // Add alert
    const targetReq = leaveRequests.find(r => r.id === requestId);
    setAlerts(prev => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        line: 'Leave Mgmt',
        text: `Manager ${action} leave request for ${targetReq.employee} (${targetReq.days} days).`,
        severity: 'low',
        status: 'resolved',
        type: 'system'
      },
      ...prev
    ]);
  };

  // Modify calendar holiday
  const handleAddHoliday = (name, date, type, impact) => {
    const newH = {
      id: Date.now(),
      name,
      date,
      type,
      impact
    };
    setHolidays(prev => [...prev, newH]);
    
    setAlerts(prev => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        line: 'Holiday Mgmt',
        text: `Holiday calendar updated: "${name}" on ${date}`,
        severity: 'low',
        status: 'resolved',
        type: 'system'
      },
      ...prev
    ]);
  };

  // Resolve operational alerts
  const handleResolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, status: 'resolved' };
      }
      return a;
    }));
  };

  // Chatbot submission handler
  const sendChatMessage = (text) => {
    if (!text.trim()) return;

    // Append user message
    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response based on context
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I have scanned the system data logs, but I don't have a direct answer. Let me analyze that question further.";
      let actionBtn = null;
      let chips = [];

      const cleanText = text.toLowerCase();

      if (role === 'manager') {
        if (cleanText.includes('bottleneck') || cleanText.includes('summarize')) {
          replyText = "Operational logs isolate **Line 3 Mechanical Glitch** (duration: 45m) and **Assembly Line B Micro-defects** as primary roadblocks. Running lines at 70% throughput. Financial margin impact is -$4,500/hr.";
          chips = ["Draft a notification regarding the 10:00 AM mechanical alert", "Optimize Line 3 capacity"];
        } 
        else if (cleanText.includes('draft a notification') || cleanText.includes('mechanical alert') || cleanText.includes('alert')) {
          replyText = "Draft notification prepared for Line 3 floor managers:\n\n*\"Attn: Line 3 Engineering. A mechanical cycle glitch has been flagged. Initiate structural override protocol immediately to avoid micro-defects.\"*";
          actionBtn = {
            label: "Approve & Execute Broadcast",
            actionType: 'broadcast-notification',
            data: { line: 'Line 3', text: 'ALERT OVERRIDE: Mechanical Cycle Glitch flagged by Management. Action Required.' }
          };
        } 
        else if (cleanText.includes('cash flow') || cleanText.includes('correlation') || cleanText.includes('financial')) {
          replyText = "Reviewing charts: We note high correlation (0.84) between Social Ad Spend and Retail sales. When Ad Spend rises by $500, register sales spike by ~$2,200. Let me know if you want to deploy $1,000 more marketing budget.";
          actionBtn = {
            label: "Approve & Increase Ad Spend ($1,000)",
            actionType: 'increase-ad',
            data: { amount: 1000 }
          };
        }
      } else { // Employee view
        if (cleanText.includes('holiday') || cleanText.includes('days left') || cleanText.includes('vacation')) {
          replyText = `According to your balance tracker, you have **${employeeBalance} statutory leave days** remaining for this cycle.`;
          chips = ["Submit a quick personal leave request", "Am I scheduled for any cross-functional meetings tomorrow?"];
        } 
        else if (cleanText.includes('meetings') || cleanText.includes('schedule') || cleanText.includes('meetings tomorrow')) {
          const invited = meetings.filter(m => m.invitees.includes('All Staff') || m.invitees.includes('Line Operators'));
          if (invited.length > 0) {
            replyText = `Yes. You have **${invited.length} upcoming invitation(s)**:\n\n` + invited.map(m => `- **${m.title}** at ${m.time} (${m.date}) [RSVP: ${m.rsvp.toUpperCase()}]`).join('\n');
          } else {
            replyText = "You have no cross-functional meetings scheduled on your calendar for tomorrow.";
          }
          chips = ["How many holiday days do I have left?", "Submit a quick personal leave request"];
        }
        else if (cleanText.includes('submit') || cleanText.includes('leave request') || cleanText.includes('request leave')) {
          replyText = "I can draft a leave request for you. Please select the date range below:";
          actionBtn = {
            label: "Submit Leave (July 15 - July 17)",
            actionType: 'submit-leave',
            data: { startDate: '2026-07-15', endDate: '2026-07-17', reason: 'Personal rest' }
          };
        }
      }

      setChatMessages(prev => [
        ...prev, 
        {
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: actionBtn,
          chips: chips
        }
      ]);
    }, 1200);
  };

  // Execute an inline action within the chatbot bubble
  const handleChatBubbleAction = (actionType, data, msgIndex) => {
    // Disable action button to prevent double-execution
    setChatMessages(prev => prev.map((m, idx) => {
      if (idx === msgIndex) {
        return { ...m, action: null };
      }
      return m;
    }));

    if (actionType === 'broadcast-notification') {
      const newAlert = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        line: data.line,
        text: data.text,
        severity: 'high',
        status: 'active',
        type: 'override'
      };
      setAlerts(prev => [newAlert, ...prev]);

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "✅ **Broadcast complete**. Operational alert has been registered on the active dashboard feed and dispatched to floor controllers.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } 
    else if (actionType === 'increase-ad') {
      setCashFlow(prev => prev - data.amount);
      setOperationalCosts(prev => prev + data.amount);
      
      // Inject chart spike data
      setCorrelationData(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          ...copy[copy.length - 1],
          adSpend: copy[copy.length - 1].adSpend + data.amount,
          registerSales: copy[copy.length - 1].registerSales + 3500 // simulated returns
        };
        return copy;
      });

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "✅ **Budget updated**. Added $1,000 to the active Social Ads Campaign. Financial charts will recalculate shortly.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
    else if (actionType === 'submit-leave') {
      const req = {
        id: Date.now(),
        employee: 'John Doe',
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
        days: 3,
        status: 'pending'
      };
      setLeaveRequests(prev => [req, ...prev]);

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "✅ **Leave Request Submitted**. It has been forwarded to the Operations Manager for administrative review.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  // Mock Login component
  if (role === 'logged-out') {
    return (
      <div className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left panel pitch content */}
          <div className="text-left space-y-6 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Decision Intelligence Platform v1.2
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-indigo-200 to-purple-200 leading-tight">
              AetherOps
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Consolidate data silos, predict operational anomalies, automate corrective triggers, and optimize shift scheduling with cognitive AI guidance. Built for high-velocity environments.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-indigo-400">98.4%</h3>
                <p className="text-xs text-slate-500">Prediction Accuracy</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-indigo-400">&lt; 3.2s</h3>
                <p className="text-xs text-slate-500">Anomaly Reaction Latency</p>
              </div>
            </div>
          </div>

          {/* Right panel auth interface */}
          <div className="glass-panel p-8 rounded-2xl glow-indigo border-slate-800/80 space-y-6 relative">
            {authLoading && (
              <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center rounded-2xl z-20">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-semibold text-indigo-300 mt-3">Processing request...</span>
              </div>
            )}

            {authType === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-slate-100">Portal Authentication</h2>
                  <p className="text-xs text-slate-400">Enter your credentials to access the cognitive engine.</p>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Username or Email</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. sujal_kodge or name@company.com"
                      className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/80 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Security Passcode</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/80 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold rounded-xl py-3.5 shadow-lg shadow-indigo-500/20 text-white flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  Access Console <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400">
                    Don't have an operational account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthType('register');
                        setAuthError('');
                        setAuthSuccess('');
                      }}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline underline-offset-2"
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-slate-100">Establish Profile</h2>
                  <p className="text-xs text-slate-400">Create operational credentials and select security clearance.</p>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Username</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="e.g. sujal_kodge"
                      className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Email Address</label>
                  <div className="relative">
                    <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Create Passcode</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Employee — always selected, this is the only self-registration option */}
                    <div className="p-2.5 rounded-xl border border-indigo-500 bg-indigo-950/20 glow-indigo flex flex-col gap-0.5 cursor-default">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-400" /> Employee
                      </span>
                      <span className="text-[9px] text-emerald-400 leading-normal flex items-center gap-1">
                        <Check className="w-3 h-3" /> Assigned automatically
                      </span>
                    </div>

                    {/* Manager — not self-registerable, redirects to login */}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthType('login');
                        setAuthError('');
                        setRegUsername('');
                        setRegEmail('');
                        setRegPassword('');
                        setRegRole('employee');
                        setAuthSuccess('Manager accounts are pre-provisioned. Please use your manager credentials to log in.');
                      }}
                      className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/20 hover:border-amber-500/40 hover:bg-amber-950/10 text-left transition-all cursor-pointer flex flex-col gap-0.5 group"
                    >
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 group-hover:text-amber-400 transition-colors">
                        <Shield className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" /> Manager
                      </span>
                      <span className="text-[9px] text-slate-500 leading-normal group-hover:text-amber-400/70 transition-colors flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Pre-provisioned only
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold rounded-xl py-3 shadow-lg shadow-indigo-500/20 text-white flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  Register Account <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-1.5">
                  <p className="text-xs text-slate-400">
                    Already have an operational account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthType('login');
                        setAuthError('');
                      }}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline underline-offset-2"
                    >
                      Log in here
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Helper calculations for dynamic timesheet and leaves
  const employeeDailyHoursObj = user?.dailyHours || {
    monday: { workHours: 8, overtimeHours: 0 },
    tuesday: { workHours: 8, overtimeHours: 0 },
    wednesday: { workHours: 8, overtimeHours: 0 },
    thursday: { workHours: 8, overtimeHours: 0 },
    friday: { workHours: 8, overtimeHours: 0 }
  };

  const getTimesheetTotals = (hoursObj) => {
    let work = 0;
    let overtime = 0;
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    days.forEach(day => {
      if (hoursObj[day]) {
        work += Number(hoursObj[day].workHours || 0);
        overtime += Number(hoursObj[day].overtimeHours || 0);
      }
    });
    return { work, overtime };
  };

  const employeeTotals = getTimesheetTotals(employeeDailyHoursObj);
  const employeeLeaves = leaveRequests.filter(req => req.employee.toLowerCase() === (user?.username || '').toLowerCase() && req.status === 'approved');
  const totalApprovedLeaveDays = employeeLeaves.reduce((sum, req) => sum + (req.days || 0), 0);

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 bg-slate-950 font-sans">
      
      {/* GLOBAL NAVBAR / HEADER */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back button — shown when not on main dashboard tab */}
          {activeTab !== 'dashboard' && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 text-slate-400 hover:text-slate-100 text-xs font-semibold transition-all cursor-pointer mr-1"
              title="Back to Dashboard"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-500/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-indigo-200">AetherOps</span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold uppercase tracking-wider">PROTOTYPE</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Decision Intelligence Suite</p>
          </div>
        </div>

        {/* Global Access Role Toggle Switch */}
        <div className="flex items-center gap-4">
          {user?.role === 'manager' ? (
            <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setRole('manager')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === 'manager' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Manager View
              </button>
              <button
                onClick={() => setRole('employee')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === 'employee' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Employee View
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">
              <User className="w-3.5 h-3.5" />
              Employee Access
            </div>
          )}

          <div className="h-6 w-[1px] bg-slate-800"></div>

          {/* User profile info */}
          {user && (
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300 uppercase">
                {user.username.substring(0, 2)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-200">{user.username}</span>
                <span className="text-[9px] text-indigo-400 uppercase font-mono tracking-wider">{user.role}</span>
              </div>
            </div>
          )}

          <div className="hidden sm:block h-6 w-[1px] bg-slate-800"></div>

          {/* Current date indicator */}
          <div className="hidden lg:flex flex-col text-right font-mono text-xs text-slate-400">
            <span>SYS_TIME: 2026-07-06</span>
            <span className="text-[9px] text-indigo-400">STATUS: ACTIVE_SESSION</span>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-1 bg-slate-900/50 hover:bg-red-950/20 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/20 p-2 rounded-lg transition-all text-xs font-semibold cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* CORE WORKSPACE SECTION */}
      <div className="flex flex-1 flex-col lg:flex-row">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-64 glass-panel border-r border-slate-900 p-4 lg:py-6 space-y-2 flex flex-row lg:flex-col justify-start lg:justify-between shrink-0 overflow-x-auto lg:overflow-x-visible">
          <div className="flex flex-row lg:flex-col gap-2 w-full">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap lg:w-full ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-950/60 text-indigo-300 border-l-2 border-indigo-500 pl-3.5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Operations Dashboard
            </button>

            <button
              onClick={() => setActiveTab('scheduler')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap lg:w-full ${
                activeTab === 'scheduler'
                  ? 'bg-indigo-950/60 text-indigo-300 border-l-2 border-indigo-500 pl-3.5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              Meeting Scheduler
            </button>

            <button
              onClick={() => setActiveTab('leaves')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap lg:w-full ${
                activeTab === 'leaves'
                  ? 'bg-indigo-950/60 text-indigo-300 border-l-2 border-indigo-500 pl-3.5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <CalendarRange className="w-4 h-4" />
              Holidays & Leave
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap lg:w-full ${
                activeTab === 'chatbot'
                  ? 'bg-indigo-950/60 text-indigo-300 border-l-2 border-indigo-500 pl-3.5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Cognitive Assistant Chat
            </button>
          </div>

          {/* Quick status box inside sidebar */}
          <div className="hidden lg:block glass-panel p-4 rounded-xl border-slate-800 bg-slate-950/40 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Authenticated:</span>
              <span className="font-semibold text-indigo-300 uppercase">{role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Security Clearance:</span>
              <span className="font-mono px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-indigo-400">
                {role === 'manager' ? 'LEVEL_3' : 'LEVEL_1'}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] text-slate-400 font-mono">Cognitive Engines Active</span>
            </div>
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          
          {/* TAB 1: OPERATIONAL DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* 1. Unified Visibility Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Financial Metric 1: Cash Flow (Sensitive - Hidden for Employees) */}
                <div className="glass-panel p-5 rounded-xl border-slate-850 bg-slate-900/10 flex items-center justify-between gap-4 overflow-hidden relative group">
                  <div className="space-y-1 relative z-10">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      Current Cash Flow {role === 'employee' && <Lock className="w-3 h-3 text-amber-500" />}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {role === 'manager' ? (
                        <>
                          <h3 className="text-3xl font-extrabold text-slate-50 tracking-tight">₹{cashFlow.toLocaleString('en-IN')}</h3>
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            <TrendingUp className="w-3.5 h-3.5" /> +4.2%
                          </span>
                        </>
                      ) : (
                        <div className="py-1 px-3 rounded bg-amber-950/20 border border-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" /> Sensitive Financial Data Restrained
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <IndianRupee className="w-5.5 h-5.5" />
                  </div>
                  <div className="absolute right-0 bottom-0 translate-y-3 translate-x-3 w-16 h-16 rounded-full bg-indigo-500/5 group-hover:scale-125 transition-all"></div>
                </div>

                {/* Financial Metric 2: Operational Costs (Sensitive - Hidden for Employees) */}
                <div className="glass-panel p-5 rounded-xl border-slate-850 bg-slate-900/10 flex items-center justify-between gap-4 overflow-hidden relative group">
                  <div className="space-y-1 relative z-10">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      Active Operational Cost {role === 'employee' && <Lock className="w-3 h-3 text-amber-500" />}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {role === 'manager' ? (
                        <>
                          <h3 className="text-3xl font-extrabold text-slate-50 tracking-tight">₹{operationalCosts.toLocaleString('en-IN')}</h3>
                          <span className="text-xs text-red-400 font-semibold flex items-center gap-0.5 bg-red-500/10 px-1.5 py-0.5 rounded">
                            <TrendingDown className="w-3.5 h-3.5" /> -1.8%
                          </span>
                        </>
                      ) : (
                        <div className="py-1 px-3 rounded bg-amber-950/20 border border-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" /> Sensitive Financial Data Restrained
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/5 border border-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                    <Activity className="w-5.5 h-5.5" />
                  </div>
                  <div className="absolute right-0 bottom-0 translate-y-3 translate-x-3 w-16 h-16 rounded-full bg-purple-500/5 group-hover:scale-125 transition-all"></div>
                </div>

                {/* Operational Metric 3: Net Margins (Sensitive - Hidden for Employees) */}
                <div className="glass-panel p-5 rounded-xl border-slate-850 bg-slate-900/10 flex items-center justify-between gap-4 overflow-hidden relative group">
                  <div className="space-y-1 relative z-10">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      Net Margins {role === 'employee' && <Lock className="w-3 h-3 text-amber-500" />}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {role === 'manager' ? (
                        <>
                          <h3 className="text-3xl font-extrabold text-slate-50 tracking-tight">{netMargins}%</h3>
                          <span className="text-xs text-indigo-400 font-semibold">TGT: 22.0%</span>
                        </>
                      ) : (
                        <div className="py-1 px-3 rounded bg-amber-950/20 border border-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" /> Sensitive Financial Data Restrained
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <TrendingUp className="w-5.5 h-5.5" />
                  </div>
                  <div className="absolute right-0 bottom-0 translate-y-3 translate-x-3 w-16 h-16 rounded-full bg-emerald-500/5 group-hover:scale-125 transition-all"></div>
                </div>

              </div>

              {/* Manager-only: Registered Employee Registry */}
              {role === 'manager' && (
                <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-lg font-bold text-slate-200">Employee Registry</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
                        {employeeCount} Registered
                      </span>
                    </div>
                  </div>

                  {registeredEmployees.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-4">No employees registered yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[200px] overflow-y-auto pr-1">
                      {registeredEmployees.map((emp) => (
                        <div 
                          key={emp._id} 
                          onClick={() => {
                            setSelectedEmployee(emp);
                          }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-full bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300 uppercase shrink-0">
                            {emp.username.substring(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-200 truncate">{emp.username}</p>
                            <p className="text-[10px] text-slate-500 truncate">{emp.email}</p>
                          </div>
                          <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                            Active
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Employee-only: Issue / Problem Submission Panel */}
              {role === 'employee' && (
                <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-4">
                  <div className="flex items-center gap-2">
                    <FileWarning className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-slate-200">Report a Problem</h3>
                  </div>
                  <p className="text-xs text-slate-400">Submit workplace issues or operational problems that need to be resolved by management.</p>

                  {issueSubmitSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{issueSubmitSuccess}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Submission Form */}
                    <form onSubmit={handleSubmitIssue} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Issue Title *</label>
                        <input
                          type="text"
                          required
                          value={issueForm.title}
                          onChange={(e) => setIssueForm({ ...issueForm, title: e.target.value })}
                          placeholder="Brief title of the problem..."
                          className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/70 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Category</label>
                          <select
                            value={issueForm.category}
                            onChange={(e) => setIssueForm({ ...issueForm, category: e.target.value })}
                            className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/70 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none transition-all"
                          >
                            <option value="operational">Operational</option>
                            <option value="safety">Safety</option>
                            <option value="hr">HR</option>
                            <option value="equipment">Equipment</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Priority</label>
                          <select
                            value={issueForm.priority}
                            onChange={(e) => setIssueForm({ ...issueForm, priority: e.target.value })}
                            className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/70 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none transition-all"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Description *</label>
                        <textarea
                          required
                          value={issueForm.description}
                          onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                          placeholder="Describe the problem in detail..."
                          rows={3}
                          className="w-full bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 focus:border-indigo-500/70 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs transition-all shadow-lg shadow-amber-600/10 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <UploadCloud className="w-4 h-4" /> Submit Issue to Management
                      </button>
                    </form>

                    {/* My Submitted Issues list */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">My Submitted Issues</span>
                      {issues.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-600 gap-2">
                          <FileWarning className="w-8 h-8 opacity-40" />
                          <p className="text-xs">No issues submitted yet.</p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                          {issues.map((issue) => (
                            <div key={issue.id} className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1.5">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-semibold text-slate-200">{issue.title}</p>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                  issue.priority === 'critical' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                                  issue.priority === 'high' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' :
                                  issue.priority === 'medium' ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400' :
                                  'bg-slate-800 text-slate-400'
                                }`}>{issue.priority.toUpperCase()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{issue.category}</span>
                                <span>{issue.submittedAt}</span>
                                <span className="ml-auto text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Submitted</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Grid block: Alerts Feed (Left) & Personal Shift Details (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 2. Real-Time Operational Alerts Feed ("Active Countermeasures") */}
                <div className="glass-panel p-6 rounded-xl border-slate-850 lg:col-span-2 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <h3 className="text-lg font-bold text-slate-200">Active Countermeasures &amp; Alerts</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                        {alerts.filter(a => a.status === 'active').length} SYS
                      </span>
                      {role === 'manager' && (
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${
                          issues.filter(i => i.status === 'open').length > 0
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}>
                          {issues.filter(i => i.status === 'open').length} REPORTS
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tab switcher for manager */}
                  {role === 'manager' && (
                    <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800 w-fit">
                      <button
                        onClick={() => setActiveAlertsTab('system')}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          (activeAlertsTab || 'system') === 'system'
                            ? 'bg-indigo-600 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        System Alerts
                      </button>
                      <button
                        onClick={() => setActiveAlertsTab('reports')}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          activeAlertsTab === 'reports'
                            ? 'bg-rose-600 text-white shadow'
                            : 'text-slate-400 hover:text-rose-300'
                        }`}
                      >
                        <FileWarning className="w-3 h-3" />
                        Employee Reports
                        {issues.filter(i => i.status === 'open').length > 0 && (
                          <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-black">
                            {issues.filter(i => i.status === 'open').length}
                          </span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* System Alerts Feed */}
                  {(role === 'employee' || (activeAlertsTab || 'system') === 'system') && (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {alerts.length === 0 ? (
                        <p className="text-slate-400 text-sm py-4">No operational notifications detected.</p>
                      ) : (
                        alerts.map((alert) => (
                          <div 
                            key={alert.id}
                            className={`p-3.5 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                              alert.status === 'resolved'
                                ? 'bg-slate-900/10 border-slate-900 text-slate-500'
                                : alert.severity === 'high'
                                  ? 'bg-red-950/20 border-red-900/40 text-red-200'
                                  : alert.severity === 'medium'
                                    ? 'bg-amber-950/20 border-amber-900/40 text-amber-200'
                                    : 'bg-indigo-950/20 border-indigo-900/40 text-indigo-200'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="font-mono text-[10px] text-slate-500 shrink-0 mt-1">{alert.time}</span>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                    alert.status === 'resolved'
                                      ? 'bg-slate-800 text-slate-400'
                                      : alert.severity === 'high'
                                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                        : alert.severity === 'medium'
                                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                                          : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                                  }`}>
                                    {alert.line}
                                  </span>
                                  {alert.status === 'resolved' && (
                                    <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                                      <Check className="w-3 h-3" /> Resolved
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm ${alert.status === 'resolved' ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>{alert.text}</p>
                              </div>
                            </div>
                            
                            {role === 'manager' && alert.status === 'active' && (
                              <button
                                onClick={() => setSelectedAlertForResolution(alert)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer shadow-md transition-all self-end sm:self-center"
                              >
                                Resolve &amp; Clear
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Employee Reports Feed — manager only */}
                  {role === 'manager' && activeAlertsTab === 'reports' && (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {issues.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-600 gap-2">
                          <FileWarning className="w-8 h-8 opacity-40" />
                          <p className="text-xs text-slate-400">No employee reports yet. Issues submitted will appear here in real-time.</p>
                        </div>
                      ) : (
                        issues.map((issue) => (
                          <div
                            key={issue._id}
                            className={`p-3.5 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                              issue.status === 'resolved'
                                ? 'bg-slate-900/10 border-slate-900 opacity-60'
                                : issue.priority === 'critical'
                                  ? 'bg-red-950/25 border-red-900/50'
                                  : issue.priority === 'high'
                                    ? 'bg-amber-950/20 border-amber-900/40'
                                    : 'bg-rose-950/15 border-rose-900/30'
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              {/* Source indicator */}
                              <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black border ${
                                  issue.status === 'resolved'
                                    ? 'bg-slate-800 border-slate-700 text-slate-500'
                                    : issue.priority === 'critical'
                                      ? 'bg-red-950/60 border-red-500/30 text-red-400'
                                      : issue.priority === 'high'
                                        ? 'bg-amber-950/60 border-amber-500/30 text-amber-400'
                                        : 'bg-rose-950/40 border-rose-500/20 text-rose-400'
                                }`}>
                                  {issue.submittedBy?.substring(0, 2).toUpperCase()}
                                </div>
                              </div>

                              <div className="space-y-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {/* Employee report badge */}
                                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">
                                    Employee Report
                                  </span>
                                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                    issue.priority === 'critical' ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                    : issue.priority === 'high' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                                    : issue.priority === 'medium' ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                                    : 'bg-slate-800 text-slate-500'
                                  }`}>
                                    {issue.priority}
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 capitalize">
                                    {issue.category}
                                  </span>
                                  {issue.status === 'resolved' && (
                                    <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                                      <Check className="w-3 h-3" /> Resolved
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm font-semibold ${issue.status === 'resolved' ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                                  {issue.title}
                                </p>
                                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{issue.description}</p>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                  <User className="w-3 h-3" />
                                  <span className="font-medium text-slate-400">{issue.submittedBy}</span>
                                  <span>·</span>
                                  <span>{new Date(issue.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                                </div>
                              </div>
                            </div>

                            {issue.status !== 'resolved' && (
                              <button
                                onClick={() => handleResolveIssue(issue._id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs cursor-pointer shadow-md transition-all self-end sm:self-center shrink-0 flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Resolve
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Dynamic Shift/Productivity Panel (Hides sensitive graphs for employee, shows localized shift) */}
                <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold text-slate-200">
                          {role === 'manager' ? 'Ops Resource Load' : 'My Productivity & Shift'}
                        </h3>
                      </div>
                      {role === 'employee' && (
                        <button
                          onClick={() => {
                            setEmployeeLogHours({
                              workHours: user?.workHours || 40,
                              overtimeHours: user?.overtimeHours || 0
                            });
                            setShowLogHoursModal(true);
                          }}
                          className="px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          Log Hours
                        </button>
                      )}
                    </div>
                    
                    {role === 'manager' ? (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Assembly Factory Load:</span>
                            <span className="font-bold text-indigo-400">88% (High Activity)</span>
                          </div>
                          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '88%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Logistics Dispatches:</span>
                            <span className="font-bold text-emerald-400">Active</span>
                          </div>
                          <p className="text-xs text-slate-500">12 trucks active. Next shift hand-off in 2 hours.</p>
                        </div>
                        
                        <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-400">
                          <span className="text-slate-300 font-semibold flex items-center gap-1 mb-1">
                            <Info className="w-3.5 h-3.5 text-indigo-400" /> Operational Notice:
                          </span>
                          Due to upcoming Summer Shutdown statutory changes, staff availability drops next week.
                        </div>
                      </div>
                    ) : (
                      // Employee Productivity state
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-1.5 text-center">
                          <div className="p-1.5 bg-slate-900/50 rounded-lg border border-slate-800 flex flex-col justify-center min-w-0">
                            <span className="text-[8px] text-slate-500 uppercase tracking-tight block truncate">Daily Yield</span>
                            <h4 className="text-xs sm:text-sm font-extrabold text-emerald-400">112%</h4>
                          </div>
                          <div className="p-1.5 bg-slate-900/50 rounded-lg border border-slate-800 flex flex-col justify-center min-w-0">
                            <span className="text-[8px] text-slate-500 uppercase tracking-tight block truncate">Active Hours</span>
                            <h4 className="text-xs sm:text-sm font-extrabold text-indigo-400">
                              {employeeTotals.work}h
                            </h4>
                          </div>
                          <div className="p-1.5 bg-slate-900/50 rounded-lg border border-slate-800 flex flex-col justify-center min-w-0">
                            <span className="text-[8px] text-slate-500 uppercase tracking-tight block truncate">Overtime</span>
                            <h4 className="text-xs sm:text-sm font-extrabold text-amber-400">
                              {employeeTotals.overtime}h
                            </h4>
                          </div>
                          <div className="p-1.5 bg-slate-900/50 rounded-lg border border-slate-800 flex flex-col justify-center min-w-0">
                            <span className="text-[8px] text-slate-500 uppercase tracking-tight block truncate">Leaves Taken</span>
                            <h4 className="text-xs sm:text-sm font-extrabold text-rose-400">
                              {totalApprovedLeaveDays}d
                            </h4>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-xs text-slate-400">Weekly Timesheet (Business Days)</span>
                          <div className="grid grid-cols-5 gap-1 text-center">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((dayName, idx) => {
                              const key = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'][idx];
                              const dayData = employeeDailyHoursObj[key] || { workHours: 8, overtimeHours: 0 };
                              return (
                                <div key={key} className="p-1 bg-slate-900/40 rounded border border-slate-850">
                                  <span className="text-[8px] text-slate-500 font-bold block uppercase">{dayName}</span>
                                  <span className="text-[10px] text-indigo-400 font-semibold block">{dayData.workHours}h</span>
                                  <span className="text-amber-400 text-[8px] block">+{dayData.overtimeHours}h</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-xs text-slate-400">Shift Schedule (Line Operator - Shift A)</span>
                          <div className="text-xs p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-lg space-y-1 text-slate-300">
                            <div className="flex justify-between">
                              <span className="font-semibold text-slate-200">Start Time:</span>
                              <span>07:00 AM</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-slate-200">End Time:</span>
                              <span>03:30 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-slate-200">Supervisor:</span>
                              <span>Admin Operations</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => setActiveTab('chatbot')}
                    className="w-full py-2.5 rounded-lg border border-indigo-500/20 bg-indigo-505/5 hover:bg-indigo-950/40 text-indigo-400 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  >
                    <MessageSquare className="w-4 h-4" /> Ask Cognitive Chatbot
                  </button>
                </div>

              </div>

              {/* 3. The Three Decision Pillars Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                  <Layers className="w-5. h-5 text-indigo-400" /> Operational Pillars & Decision Logic
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Pillar 1: Prescribing Action Widget */}
                  <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold uppercase tracking-wider">
                        Pillar 1: Prescriptive Action
                      </span>
                      <h4 className="text-lg font-bold text-slate-100">Prescribing Action Widget</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Evaluates real-time anomaly telemetry and suggests immediate executive remediation overrides.
                      </p>

                      <div className={`p-4 rounded-lg border text-xs space-y-2.5 transition-all ${
                        pillar1Status === 'resolved' 
                          ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300' 
                          : 'bg-amber-950/20 border-amber-900/40 text-amber-300'
                      }`}>
                        <div className="flex items-center gap-2">
                          {pillar1Status === 'resolved' ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                          ) : (
                            <AlertTriangle className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
                          )}
                          <span className="font-bold uppercase">
                            {pillar1Status === 'resolved' ? 'System Cleared' : 'Active Anomaly Event'}
                          </span>
                        </div>
                        <p className="text-slate-300 font-mono text-[11px] leading-relaxed">{pillar1Text}</p>
                      </div>
                    </div>

                    {role === 'manager' ? (
                      <button
                        onClick={handleExecutePillar1}
                        disabled={pillar1Status !== 'warning'}
                        className={`w-full py-3.5 rounded-lg font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                          pillar1Status === 'resolved'
                            ? 'bg-emerald-800/40 text-emerald-200 border border-emerald-500/20 cursor-not-allowed'
                            : pillar1Status === 'executing'
                              ? 'bg-indigo-900/60 text-slate-400 cursor-wait'
                              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/20'
                        }`}
                      >
                        {pillar1Status === 'resolved' ? (
                          <>Action Successfully Deployed <Check className="w-4 h-4" /></>
                        ) : pillar1Status === 'executing' ? (
                          <>Deploying Anomaly Fix... <Clock className="w-4 h-4 animate-spin" /></>
                        ) : (
                          <>Execute Prescriptive Strategy <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                    ) : (
                      <div className="p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Requires manager credentials to execute overrides.</span>
                      </div>
                    )}
                  </div>

                  {/* Pillar 2: Silo Consolidator View */}
                  <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-4 lg:col-span-1">
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold uppercase tracking-wider">
                        Pillar 2: Silo Consolidator
                      </span>
                      <h4 className="text-lg font-bold text-slate-100">Silo Consolidator View</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Bridges disconnected ad channels (Marketing Cost) with in-store sales logs.
                      </p>
                    </div>

                    {/* Chart visual representation */}
                    <div className="h-[150px] w-full bg-slate-950/60 rounded-lg p-2 border border-slate-900">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={correlationData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={9} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                          <Tooltip 
                            contentStyle={{ background: '#0f172a', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px' }}
                            labelStyle={{ color: '#94a3b8', fontSize: 10 }}
                            itemStyle={{ color: '#fff', fontSize: 11 }}
                            formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, undefined]}
                          />
                          <Line type="monotone" dataKey="adSpend" name="Marketing Cost" stroke="#6366f1" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="registerSales" name="Store Sales" stroke="#10b981" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Marketing spend</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Register Sales</span>
                    </div>
                  </div>

                  {/* Pillar 3: Predictive Risk Panel */}
                  <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold uppercase tracking-wider">
                        Pillar 3: Predictive Risk Panel
                      </span>
                      <h4 className="text-lg font-bold text-slate-100">Contextual Risk Panel</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Monitors external variables (weather patterns, calendar statutory events) to dynamically re-adjust downstream processes.
                      </p>

                      <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <CloudSun className="w-4 h-4 text-amber-400" />
                          <span>Weather Context: <strong>Warmer Temps (+8°C)</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <Calendar className="w-4 h-4 text-indigo-400" />
                          <span>Statutory Index: <strong>{holidays.length} Active Events</strong></span>
                        </div>
                        
                        <div className="border-t border-slate-800 pt-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Prescribing Inventory Mod:</span>
                            <span className="font-mono text-amber-400 font-semibold">-{predictiveOrderReduction}% Lower Orders</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1">
                            Calculated dynamically to offset high labor rates and holiday assembly drops.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 italic text-center">
                      Auto-triggered calculations syncs with statutory changes in real time.
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INTELLIGENT MEETING SCHEDULER */}
          {activeTab === 'scheduler' && (
            <div className="space-y-6">
              
              {/* Meeting Scheduler Header & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
                    <CalendarCheck className="w-6.5 h-6.5 text-indigo-400" /> Intelligent Meeting Scheduler
                  </h2>
                  <p className="text-xs text-slate-400">Check cross-functional sync states and schedule operational briefings.</p>
                </div>

                {role === 'manager' ? (
                  <button
                    onClick={() => setShowMeetingModal(true)}
                    className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Schedule New Meeting
                  </button>
                ) : (
                  <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                    Employee RSVP Portal Mode
                  </span>
                )}
              </div>

              {/* Meeting List UI */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* List of Scheduled briefings */}
                <div className="glass-panel p-6 rounded-xl border-slate-850 lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold text-slate-200">Upcoming Operational Synced Events</h3>
                  
                  <div className="space-y-3.5">
                    {meetings.map((meeting) => (
                      <div 
                        key={meeting.id}
                        className="p-4 rounded-xl bg-slate-900/40 border border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                              {meeting.department}
                            </span>
                            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {meeting.date} at {meeting.time}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-200">{meeting.title}</h4>
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                            <span>Invitees:</span>
                            {meeting.invitees.map((inv, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-400 text-[10px]">
                                {inv}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Interactive responses */}
                        <div className="flex items-center gap-2">
                          {role === 'employee' ? (
                            <div className="space-y-1.5 w-full md:w-auto">
                              <span className="text-[10px] text-slate-500 block text-right font-semibold uppercase">My RSVP Status:</span>
                              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-900">
                                <button
                                  onClick={() => handleRSVP(meeting.id, 'accepted')}
                                  className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                                    meeting.rsvp === 'accepted' 
                                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' 
                                      : 'text-slate-400 hover:bg-slate-800'
                                  }`}
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleRSVP(meeting.id, 'declined')}
                                  className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                                    meeting.rsvp === 'declined' 
                                      ? 'bg-red-500/20 border border-red-500/40 text-red-400' 
                                      : 'text-slate-400 hover:bg-slate-800'
                                  }`}
                                >
                                  Decline
                                </button>
                                <button
                                  onClick={() => handleRSVP(meeting.id, 'tentative')}
                                  className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                                    meeting.rsvp === 'tentative' 
                                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400' 
                                      : 'text-slate-400 hover:bg-slate-800'
                                  }`}
                                >
                                  Tentative
                                </button>
                              </div>
                            </div>
                          ) : (
                            // Manager read-only confirmation status
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 block mb-1">STATUS:</span>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                                meeting.status === 'confirmed' 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {meeting.status.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Time Checker widget panel */}
                <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-slate-200">AI Scheduling Assist</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Automatically checks manufacturing lines, diagnostic operations, and shift turnovers to suggest optimal times with low downtime risks.
                  </p>

                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3 text-xs">
                    <span className="text-indigo-300 font-semibold block">Active Factory Loads:</span>
                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between">
                        <span>08:00 AM - 12:00 PM:</span>
                        <span className="text-red-400 font-bold">92% Busy (Peak Shift)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>12:00 PM - 02:00 PM:</span>
                        <span className="text-amber-400 font-bold">60% Busy (Meal Break)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>02:00 PM - 05:00 PM:</span>
                        <span className="text-emerald-400 font-bold">35% Busy (Low Load)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-indigo-950/20 border border-indigo-900/30 rounded-lg text-xs text-indigo-300">
                    <strong>Pro-Tip:</strong> High activity load degrades meeting response rates by 68%. Select times post 02:00 PM for maximum staff participation.
                  </div>
                </div>

              </div>

              {/* SCHEDULE MODAL (MANAGER ONLY) */}
              {showMeetingModal && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border-slate-800 glow-indigo space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-indigo-400" /> Schedule Meeting
                      </h3>
                      <button 
                        onClick={() => setShowMeetingModal(false)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateMeeting} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-semibold block">Meeting Title</label>
                        <input
                          type="text"
                          required
                          value={newMeeting.title}
                          onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                          placeholder="e.g., Weekly Safety Briefing"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-slate-400 font-semibold block">Date</label>
                          <input
                            type="date"
                            value={newMeeting.date}
                            onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-400 font-semibold block">Time Slot</label>
                          <input
                            type="text"
                            value={newMeeting.time}
                            onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                            placeholder="e.g., 02:30 PM"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-slate-400 font-semibold block">Department Target</label>
                          <select
                            value={newMeeting.department}
                            onChange={(e) => setNewMeeting({ ...newMeeting, department: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                          >
                            <option>Operations</option>
                            <option>Engineering</option>
                            <option>Logistics</option>
                            <option>Administration</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-slate-400 font-semibold block">Invitees (comma separated)</label>
                          <input
                            type="text"
                            value={newMeeting.invitees}
                            onChange={(e) => setNewMeeting({ ...newMeeting, invitees: e.target.value })}
                            placeholder="All Staff, Supervisor"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      {/* AI BEST SLOT HELPER SIMULATOR */}
                      <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Cognitive Anomaly Time-check
                          </span>
                          <button
                            type="button"
                            onClick={checkBestTimeSlot}
                            className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2 py-1 rounded cursor-pointer transition-all"
                          >
                            Run AI Slot-Finder
                          </button>
                        </div>

                        {aiSlotHelper ? (
                          <div className={`mt-2 p-2.5 rounded border ${
                            aiSlotHelper.status === 'green' 
                              ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400' 
                              : 'bg-red-950/20 border-red-900/30 text-red-400'
                          }`}>
                            {aiSlotHelper.text}
                          </div>
                        ) : (
                          <p className="text-slate-500 text-[11px] mt-1">Press helper to cross-reference scheduler against machine activity metrics.</p>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => setShowMeetingModal(false)}
                          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shadow-lg shadow-indigo-600/10"
                        >
                          Schedule briefing
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: HOLIDAYS & LEAVE MANAGER */}
          {activeTab === 'leaves' && (
            <div className="space-y-6">
              
              {/* Holidays & Leave Header */}
              <div>
                <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
                  <CalendarRange className="w-6.5 h-6.5 text-indigo-400" /> Holidays & Leave Manager
                </h2>
                <p className="text-xs text-slate-400">Configure corporate shutdowns, statutory calendars, and process employee leave allocations.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Holiday Calendar Grid */}
                <div className="glass-panel p-6 rounded-xl border-slate-850 lg:col-span-2 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-900">
                    <h3 className="text-base font-bold text-slate-200">Statutory Holidays & Corporate Shutdowns</h3>
                    {role === 'manager' && (
                      <button
                        onClick={() => handleAddHoliday('Pre-shutdown Rest Period', '2026-07-23', 'mandated', 'System Load drops by 30%')}
                        className="px-2.5 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-600 border border-indigo-500/20 text-indigo-300 hover:text-white font-bold text-[10px] transition-all cursor-pointer"
                      >
                        + Add Custom Shutdown Day
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {holidays.map((h) => (
                      <div key={h.id} className="p-4 bg-slate-900/50 rounded-xl border border-slate-850 hover:border-indigo-500/20 transition-all space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-xs text-slate-400">{h.date}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            h.type === 'statutory' 
                              ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400' 
                              : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                          }`}>
                            {h.type}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-200">{h.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-1.5">
                            <strong>Impact:</strong> {h.impact}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Left/Right View switcher for Leave Management */}
                {role === 'employee' ? (
                  /* Employee Leave Request sub-form and balance */
                  <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-200">Employee Self-Service</h3>
                      <p className="text-xs text-slate-400">Request vacation slots and track remaining time-off balances.</p>
                    </div>

                    {/* Balance Tracker */}
                    <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-900 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">Vacation Balance</span>
                        <h4 className="text-3xl font-black text-slate-100">{employeeBalance} <span className="text-xs text-slate-400 font-normal">Days Remaining</span></h4>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                        15d
                      </div>
                    </div>

                    <form onSubmit={handleSubmitLeave} className="space-y-4 pt-2 border-t border-slate-900">
                      <span className="text-xs font-bold text-slate-300 block">Submit Leave Request</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-semibold block">Start Date</label>
                          <input
                            type="date"
                            required
                            value={newLeaveRequest.startDate}
                            onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, startDate: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-semibold block">End Date</label>
                          <input
                            type="date"
                            required
                            value={newLeaveRequest.endDate}
                            onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, endDate: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-semibold block">Reason for absence</label>
                        <input
                          type="text"
                          required
                          value={newLeaveRequest.reason}
                          onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, reason: e.target.value })}
                          placeholder="e.g. hometown visit / family holiday"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                      >
                        Submit Request
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Manager Admin Approvals Dashboard view */
                  <div className="glass-panel p-6 rounded-xl border-slate-850 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-200">Pending Leave Requests</h3>
                      <p className="text-xs text-slate-400">Review, approve or reject operator vacation requests.</p>
                    </div>

                    <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                      {leaveRequests.length === 0 ? (
                        <p className="text-slate-400 text-xs py-4 text-center">No active leave requests.</p>
                      ) : (
                        leaveRequests.map((req) => (
                          <div 
                            key={req.id}
                            className={`p-3.5 rounded-xl border space-y-3 transition-all ${
                              req.status === 'pending'
                                ? 'bg-slate-900/60 border-slate-850'
                                : req.status === 'approved'
                                  ? 'bg-emerald-950/10 border-emerald-950/30 text-slate-300'
                                  : 'bg-red-950/10 border-red-950/30 text-slate-300'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-bold text-slate-200">{req.employee}</h4>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{req.startDate} to {req.endDate}</p>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase ${
                                req.status === 'pending'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : req.status === 'approved'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}>
                                {req.status}
                              </span>
                            </div>

                            <p className="text-xs text-slate-400 italic">" {req.reason} "</p>

                            {req.status === 'pending' && (
                              <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
                                <button
                                  onClick={() => handleLeaveAction(req.id, 'approved')}
                                  className="flex-1 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1"
                                >
                                  <Check className="w-3 h-3" /> Approve
                                </button>
                                <button
                                  onClick={() => handleLeaveAction(req.id, 'rejected')}
                                  className="flex-1 py-1 rounded bg-red-950/40 hover:bg-red-950/80 border border-red-900/30 text-red-400 text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1"
                                >
                                  <X className="w-3 h-3" /> Reject
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 4: COGNITIVE ASSISTANT CHAT (DEDICATED FULL SCREEN VIEW) */}
          {activeTab === 'chatbot' && (
            <div className="glass-panel p-6 rounded-2xl border-slate-850 h-[calc(100vh-140px)] flex flex-col justify-between">
              
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-900 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">AetherOps Decision Intelligence AI</h3>
                    <p className="text-[10px] text-slate-400">Deep-linked to active platform state. Switched to {role} context.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Online & Synced</span>
                </div>
              </div>

              {/* Chat Message Logs */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-900 border border-slate-850 text-slate-200 rounded-bl-none'
                    }`}>
                      {/* Message body with Markdown support simulator */}
                      <p className="whitespace-pre-line font-medium">{msg.text}</p>

                      {/* Chat action bubbles directly executable */}
                      {msg.action && (
                        <div className="mt-4 pt-3 border-t border-slate-850">
                          <button
                            onClick={() => handleChatBubbleAction(msg.action.actionType, msg.action.data, idx)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5" /> {msg.action.label}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 px-1">
                      <span className="text-[9px] text-slate-500 font-mono">{msg.time}</span>
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">
                        {msg.sender === 'user' ? 'Client' : 'AetherOps AI'}
                      </span>
                    </div>

                    {/* Pre-packaged Quick Chips on latest message */}
                    {idx === chatMessages.length - 1 && msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 shrink-0">
                        {msg.chips.map((chip, chipIdx) => (
                          <button
                            key={chipIdx}
                            onClick={() => sendChatMessage(chip)}
                            className="px-3 py-1.5 rounded-full bg-indigo-950/45 hover:bg-indigo-600/20 text-indigo-400 hover:text-white border border-indigo-500/20 text-xs transition-all font-semibold cursor-pointer"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-xs px-2 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                    <span>AetherOps AI is compiling state matrices...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Box */}
              <div className="pt-4 border-t border-slate-900 flex items-center gap-3 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendChatMessage(chatInput);
                  }}
                  placeholder="Ask a question or request operational tasks..."
                  className="flex-1 bg-slate-900 border border-slate-850 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => sendChatMessage(chatInput)}
                  className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* FLOATING BOTTOM RIGHT CHAT PANEL (ONLY VISIBLE IF NOT ALREADY ON DEDICATED CHAT TAB) */}
      {activeTab !== 'chatbot' && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          
          {/* Chat Window Panel */}
          {isChatOpen && (
            <div className="glass-panel w-96 h-[480px] rounded-2xl border-slate-800 glow-indigo flex flex-col justify-between mb-3 overflow-hidden shadow-2xl animate-fade-in">
              {/* Floating Header */}
              <div className="p-4 bg-slate-900/80 border-b border-slate-850 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-sm text-slate-100">AetherOps Assistant AI</span>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Floating Chat Body logs */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-900 border border-slate-850 text-slate-200 rounded-bl-none'
                    }`}>
                      <p className="whitespace-pre-line font-medium">{msg.text}</p>
                      
                      {msg.action && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800">
                          <button
                            onClick={() => handleChatBubbleAction(msg.action.actionType, msg.action.data, idx)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-md transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Zap className="w-3 h-3" /> {msg.action.label}
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {idx === chatMessages.length - 1 && msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {msg.chips.map((chip, chipIdx) => (
                          <button
                            key={chipIdx}
                            onClick={() => sendChatMessage(chip)}
                            className="px-2 py-1 rounded-full bg-indigo-950/45 hover:bg-indigo-600/20 text-indigo-400 hover:text-white border border-indigo-500/20 text-[10px] transition-all font-semibold cursor-pointer"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] px-1 animate-pulse">
                    <Sparkles className="w-3 h-3 text-indigo-400 animate-spin" />
                    <span>AI is reading telemetry...</span>
                  </div>
                )}
              </div>

              {/* Floating Chat Input Box */}
              <div className="p-3 bg-slate-950 border-t border-slate-900 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendChatMessage(chatInput);
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-900 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => sendChatMessage(chatInput)}
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Floating Action Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-105 transition-all flex items-center justify-center cursor-pointer border border-indigo-400/20 relative group"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-all" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
          </button>

          {/* Selected Employee Details Modal (Manager Only) */}
          {role === 'manager' && selectedEmployee && (() => {
            const selectedEmpLeaves = leaveRequests.filter(
              req => req.employee.toLowerCase() === selectedEmployee.username.toLowerCase() && req.status === 'approved'
            );
            const selectedEmpLeaveDays = selectedEmpLeaves.reduce((sum, r) => sum + (r.days || 0), 0);
            
            const selectedEmpDailyHours = selectedEmployee.dailyHours || {
              monday: { workHours: 8, overtimeHours: 0 },
              tuesday: { workHours: 8, overtimeHours: 0 },
              wednesday: { workHours: 8, overtimeHours: 0 },
              thursday: { workHours: 8, overtimeHours: 0 },
              friday: { workHours: 8, overtimeHours: 0 },
            };
            const selectedEmpTotals = getTimesheetTotals(selectedEmpDailyHours);
            
            return (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-panel w-full max-w-md p-6 rounded-2xl border-slate-800 glow-indigo space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <User className="w-5 h-5 text-indigo-400" /> Employee Profile
                    </h3>
                    <button 
                      onClick={() => setSelectedEmployee(null)}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Profile Details */}
                    <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-850">
                      <div className="w-12 h-12 rounded-full bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-300 uppercase shrink-0">
                        {selectedEmployee.username.substring(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-bold text-slate-100 truncate">{selectedEmployee.username}</p>
                        <p className="text-xs text-slate-400 truncate">{selectedEmployee.email}</p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Role: <span className="text-indigo-400 uppercase font-mono">{selectedEmployee.role}</span>
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Joined: {new Date(selectedEmployee.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Summary Totals */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-850">
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider block">Regular Hours</span>
                        <span className="text-sm font-extrabold text-indigo-400">{selectedEmpTotals.work} hr</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider block">Overtime</span>
                        <span className="text-sm font-extrabold text-amber-400">+{selectedEmpTotals.overtime} OT</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase tracking-wider block">Approved Leaves</span>
                        <span className="text-sm font-extrabold text-rose-400">{selectedEmpLeaveDays} days</span>
                      </div>
                    </div>

                    {/* Weekday Timesheet Table */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Daily Active Hours Breakdown</span>
                      <div className="overflow-hidden border border-slate-850 rounded-lg">
                        <table className="w-full text-xs text-left text-slate-300">
                          <thead className="bg-slate-900/80 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-850">
                            <tr>
                              <th className="px-3 py-1.5 font-semibold">Business Day</th>
                              <th className="px-3 py-1.5 text-center font-semibold">Regular</th>
                              <th className="px-3 py-1.5 text-center font-semibold">Overtime</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900 bg-slate-900/20">
                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => {
                              const dayData = selectedEmpDailyHours[day] || { workHours: 8, overtimeHours: 0 };
                              return (
                                <tr key={day} className="hover:bg-slate-900/30">
                                  <td className="px-3 py-1.5 font-medium capitalize text-slate-300">{day}</td>
                                  <td className="px-3 py-1.5 text-center text-indigo-400 font-bold">{dayData.workHours}h</td>
                                  <td className="px-3 py-1.5 text-center text-amber-400 font-bold">+{dayData.overtimeHours}h</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Approved Leaves History */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Leave History</span>
                      <div className="max-h-[100px] overflow-y-auto space-y-1.5 pr-1">
                        {selectedEmpLeaves.length === 0 ? (
                          <p className="text-[11px] text-slate-500 italic">No approved leaves recorded.</p>
                        ) : (
                          selectedEmpLeaves.map(req => (
                            <div key={req.id} className="p-2 rounded bg-slate-900/40 border border-slate-850 text-[10px] flex items-center justify-between text-slate-300">
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-200 truncate">{req.reason}</p>
                                <p className="text-[8px] text-slate-500">{req.startDate} to {req.endDate}</p>
                              </div>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[8px]">
                                {req.days} days
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setSelectedEmployee(null)}
                        className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer transition-all shadow-lg shadow-indigo-600/10"
                      >
                        Close Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
          {/* Employee Log Hours Modal */}
          {role === 'employee' && showLogHoursModal && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="glass-panel w-full max-w-md p-6 rounded-2xl border-slate-800 glow-indigo space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-400" /> Log Work Hours
                  </h3>
                  <button 
                    onClick={() => setShowLogHoursModal(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Submit the exact amount of regular and overtime hours you worked. This telemetry will sync to management.
                  </p>

                  <form onSubmit={handleEmployeeLogHours} className="space-y-4">
                    {saveHoursSuccess && (
                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{saveHoursSuccess}</span>
                      </div>
                    )}

                    {logHoursError && (
                      <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{logHoursError}</span>
                      </div>
                    )}
                    
                    <div className="max-h-[300px] overflow-y-auto pr-1 space-y-3">
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                        <div key={day} className="p-3 bg-slate-900/50 rounded-lg border border-slate-850 space-y-2">
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">{day}</span>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-500 font-semibold block">Regular Hours</label>
                              <input
                                type="number"
                                min="0"
                                max="24"
                                required
                                value={employeeLogHours[day]?.workHours || 0}
                                onChange={(e) => setEmployeeLogHours({
                                  ...employeeLogHours,
                                  [day]: { ...employeeLogHours[day], workHours: e.target.value }
                                })}
                                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-500 font-semibold block">Overtime Hours</label>
                              <input
                                type="number"
                                min="0"
                                max="24"
                                required
                                value={employeeLogHours[day]?.overtimeHours || 0}
                                onChange={(e) => setEmployeeLogHours({
                                  ...employeeLogHours,
                                  [day]: { ...employeeLogHours[day], overtimeHours: e.target.value }
                                })}
                                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowLogHoursModal(false)}
                        className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingHours}
                        className="px-4.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shadow-lg shadow-indigo-600/10 disabled:opacity-50"
                      >
                        {isSavingHours ? 'Saving...' : 'Submit timesheet'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          
          {/* AI Incident Resolution Report Modal */}
          {role === 'manager' && selectedAlertForResolution && (() => {
            const report = AI_RESOLUTION_REPORTS[selectedAlertForResolution.text] || AI_RESOLUTION_REPORTS['generic'];
            return (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-panel w-full max-w-md p-6 rounded-2xl border-slate-800 glow-indigo space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" /> AI Resolution Report
                    </h3>
                    <button 
                      onClick={() => setSelectedAlertForResolution(null)}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Alert Metadata */}
                    <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-850 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-slate-500">{selectedAlertForResolution.time}</span>
                        <span className={`font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                          selectedAlertForResolution.severity === 'high'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : selectedAlertForResolution.severity === 'medium'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {selectedAlertForResolution.severity} Severity
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-200">{selectedAlertForResolution.text}</p>
                    </div>

                    {/* AI Explanation Paragraph */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">AI System Diagnosis</span>
                      <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-xs text-slate-300 leading-relaxed font-sans select-none">
                        {report.analysis}
                      </div>
                    </div>

                    {/* Step-by-Step Actions */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Autonomic Resolution Protocol</span>
                      <div className="space-y-2 select-none">
                        {report.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start text-xs text-slate-300 bg-indigo-950/5 border border-indigo-950/10 p-2 rounded-lg">
                            <span className="w-4 h-4 rounded bg-indigo-950 border border-indigo-800 text-[10px] font-bold text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setSelectedAlertForResolution(null)}
                        className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleResolveAlert(selectedAlertForResolution.id);
                          setSelectedAlertForResolution(null);
                        }}
                        className="px-4.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shadow-lg shadow-indigo-600/10"
                      >
                        Confirm Resolution
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      )}

    </div>
  );
}
