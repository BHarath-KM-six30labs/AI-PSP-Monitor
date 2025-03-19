import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  Clock,
  DollarSign,
  Shield,
  Activity,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Download,
  ChevronRight,
  X,
  CheckCircle2,
  AlertOctagon,
  Building2,
  Wallet,
  CalendarClock,
  Receipt,
  ArrowRightLeft,
  Brain,
  TrendingUp,
  Zap,
  LineChart,
  PieChart,
  BarChart,
  Gauge,
  Settings,
  Bell,
  User,
  Menu,
  Sun,
  Moon
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data and component definitions
const mockTransactions = [
  {
    id: 1,
    psp: "M-Pesa",
    amount: 1250000,
    status: "completed",
    timestamp: "2024-03-15T10:30:00",
    department: "Healthcare",
    reference: "HC-2024-001",
    paymentMethod: "RTGS",
    processingTime: "1.2 seconds",
    fee: 250,
    description: "Medical equipment procurement",
    beneficiary: "State Health Department",
    accountNumber: "XXXX-XXXX-1234",
    aiRiskScore: 12,
    anomalyProbability: 0.02,
    predictedDelay: "No delay predicted",
    patternMatch: "Normal transaction pattern",
    complianceScore: 98,
    history: [
      { time: "2024-03-15T10:29:57", status: "initiated", description: "Payment request received" },
      { time: "2024-03-15T10:29:58", status: "processing", description: "Processing payment" },
      { time: "2024-03-15T10:30:00", status: "completed", description: "Payment successful" }
    ],
    additionalDetails: {
      currency: "KES",
      exchangeRate: 1.0,
      transactionType: "Business Payment",
      merchantCategory: "Healthcare Equipment",
      settlementTime: "T+1",
      riskFactors: ["High Value", "Cross-Border"],
      complianceChecks: ["KYC", "AML", "Sanctions"],
      securityMeasures: ["2FA", "IP Verification", "Device Fingerprinting"],
      businessUnit: "Corporate Banking",
      costCenter: "HC-2024",
      approvers: ["John Doe", "Jane Smith"],
      attachments: ["Invoice.pdf", "PO.pdf"]
    }
  },
  {
    id: 2,
    psp: "Jumia Payment Services Kenya Limited",
    amount: 750000,
    status: "delayed",
    timestamp: "2024-03-15T09:15:00",
    department: "Education",
    reference: "EDU-2024-002",
    paymentMethod: "NEFT",
    processingTime: "45 minutes",
    fee: 150,
    description: "School infrastructure funds",
    beneficiary: "Education Board",
    accountNumber: "XXXX-XXXX-5678",
    aiRiskScore: 78,
    anomalyProbability: 0.85,
    predictedDelay: "High risk of further delay",
    patternMatch: "Unusual delay pattern detected",
    complianceScore: 65,
    history: [
      { time: "2024-03-15T09:14:00", status: "initiated", description: "Payment request received" },
      { time: "2024-03-15T09:14:30", status: "processing", description: "Processing payment" },
      { time: "2024-03-15T09:15:00", status: "delayed", description: "Payment processing delayed" }
    ],
    additionalDetails: {
      currency: "KES",
      exchangeRate: 1.0,
      transactionType: "Government Payment",
      merchantCategory: "Education",
      settlementTime: "T+2",
      riskFactors: ["Unusual Pattern", "High Risk Score"],
      complianceChecks: ["KYC", "AML", "Enhanced Due Diligence"],
      securityMeasures: ["3FA", "Behavioral Analysis"],
      businessUnit: "Public Sector",
      costCenter: "EDU-2024",
      approvers: ["Alice Johnson", "Bob Wilson"],
      attachments: ["Budget.pdf", "Approval.pdf"]
    }
  },
  {
    id: 3,
    psp: "Cellulant Kenya Limited",
    amount: 980000,
    status: "pending",
    timestamp: "2024-03-15T11:45:00",
    department: "Infrastructure",
    reference: "INF-2024-003",
    paymentMethod: "IMPS",
    processingTime: "15 minutes",
    fee: 200,
    description: "Road construction project",
    beneficiary: "Public Works Department",
    accountNumber: "XXXX-XXXX-9012",
    aiRiskScore: 45,
    anomalyProbability: 0.35,
    predictedDelay: "Moderate delay risk",
    patternMatch: "Slightly irregular pattern",
    complianceScore: 82,
    history: [
      { time: "2024-03-15T11:44:00", status: "initiated", description: "Payment request received" },
      { time: "2024-03-15T11:44:30", status: "processing", description: "Processing payment" },
      { time: "2024-03-15T11:45:00", status: "pending", description: "Awaiting final verification" }
    ],
    additionalDetails: {
      currency: "KES",
      exchangeRate: 1.0,
      transactionType: "Project Payment",
      merchantCategory: "Construction",
      settlementTime: "T+1",
      riskFactors: ["Medium Value", "Multiple Approvals Required"],
      complianceChecks: ["KYC", "Project Verification"],
      securityMeasures: ["2FA", "Location Verification"],
      businessUnit: "Infrastructure Projects",
      costCenter: "INF-2024",
      approvers: ["Carol Brown", "David Lee"],
      attachments: ["Contract.pdf", "Timeline.pdf"]
    }
  }
];

const mockAlerts = [
  {
    id: 1,
    type: "delay",
    psp: "Jumia Payment Services Kenya Limited",
    message: "Payment delayed beyond SLA threshold",
    severity: "high",
    timestamp: "2024-03-15T10:30:00",
    aiConfidence: 0.95,
    recommendation: "Immediate investigation required",
    impact: "₹750,000 held",
    department: "Education",
    resolution: "Pending",
    details: {
      affectedTransactions: ["EDU-2024-002", "EDU-2024-003"],
      systemImpact: "Medium",
      businessImpact: "High",
      mitigationSteps: [
        "Contact PSP support",
        "Notify stakeholders",
        "Prepare incident report"
      ],
      previousIncidents: 2,
      escalationPath: "Level 2 Support",
      responseTime: "15 minutes",
      slaBreachTime: "30 minutes"
    }
  },
  {
    id: 2,
    type: "anomaly",
    psp: "Cellulant Kenya Limited",
    message: "Unusual transaction batching detected",
    severity: "medium",
    timestamp: "2024-03-15T09:15:00",
    aiConfidence: 0.82,
    recommendation: "Monitor next 24 hours",
    impact: "Potential SLA breach",
    department: "Infrastructure",
    resolution: "Under review",
    details: {
      pattern: "Multiple high-value transactions",
      frequency: "5x normal rate",
      timeWindow: "Last 2 hours",
      affectedSystems: ["Payment Gateway", "Risk Engine"],
      riskLevel: "Medium",
      monitoringPlan: "Enhanced surveillance",
      nextReview: "2 hours",
      automatedActions: ["Rate limiting", "Pattern analysis"]
    }
  },
  {
    id: 3,
    type: "security",
    psp: "M-Pesa",
    message: "Multiple failed API authentications",
    severity: "high",
    timestamp: "2024-03-15T08:00:00",
    aiConfidence: 0.88,
    recommendation: "Security audit required",
    impact: "System security",
    department: "All",
    resolution: "In progress",
    details: {
      sourceIP: "Multiple",
      failedAttempts: 15,
      timeframe: "10 minutes",
      affectedEndpoints: ["/auth", "/transactions"],
      securityMeasures: ["IP blocking", "Rate limiting"],
      forensicAnalysis: "In progress",
      preventiveMeasures: ["WAF rules updated", "Security patches applied"],
      incidentCategory: "Potential breach attempt"
    }
  }
];

const aiInsightsData = {
  riskScores: [
    { psp: "M-Pesa", score: 12, volume: "₹12.5M" },
    { psp: "Jumia Payment Services Kenya Limited", score: 78, volume: "₹7.5M" },
    { psp: "Cellulant Kenya Limited", score: 45, volume: "₹9.8M" }
  ],
  predictedDelays: [
    { time: "00:00", probability: 0.2, volume: 150 },
    { time: "04:00", probability: 0.3, volume: 180 },
    { time: "08:00", probability: 0.5, volume: 250 },
    { time: "12:00", probability: 0.4, volume: 220 },
    { time: "16:00", probability: 0.3, volume: 190 },
    { time: "20:00", probability: 0.2, volume: 160 }
  ],
  anomalyTrends: [
    { date: "Mar 10", count: 5, severity: "medium" },
    { date: "Mar 11", count: 3, severity: "low" },
    { date: "Mar 12", count: 7, severity: "high" },
    { date: "Mar 13", count: 4, severity: "medium" },
    { date: "Mar 14", count: 6, severity: "high" },
    { date: "Mar 15", count: 8, severity: "critical" }
  ],
  complianceMetrics: {
    overall: 85,
    byPSP: [
      { name: "M-Pesa", score: 98 },
      { name: "Jumia Payment Services Kenya Limited", score: 65 },
      { name: "Cellulant Kenya Limited", score: 82 }
    ]
  }
};

const DetailModal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-card rounded-lg shadow-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </button>
      </div>
      {children}
    </motion.div>
  </div>
);

const TransactionDetails = ({ transaction, onClose }) => (
  <DetailModal title="Transaction Details" onClose={onClose}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-medium text-foreground mb-4">Basic Information</h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm text-muted-foreground">PSP</dt>
            <dd className="text-sm font-medium text-foreground">{transaction.psp}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Amount</dt>
            <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.currency} {transaction.amount.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Status</dt>
            <dd className="text-sm font-medium">
              <StatusBadge status={transaction.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Department</dt>
            <dd className="text-sm font-medium text-foreground">{transaction.department}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Reference</dt>
            <dd className="text-sm font-medium text-foreground">{transaction.reference}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Payment Method</dt>
            <dd className="text-sm font-medium text-foreground">{transaction.paymentMethod}</dd>
          </div>
        </dl>
      </div>
      
      <div>
        <h3 className="font-medium text-foreground mb-4">AI Analysis</h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm text-muted-foreground">Risk Score</dt>
            <dd className="text-sm font-medium text-foreground">{transaction.aiRiskScore}/100</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Anomaly Probability</dt>
            <dd className="text-sm font-medium text-foreground">{(transaction.anomalyProbability * 100).toFixed(1)}%</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Predicted Delay</dt>
            <dd className="text-sm font-medium text-foreground">{transaction.predictedDelay}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Pattern Match</dt>
            <dd className="text-sm font-medium text-foreground">{transaction.patternMatch}</dd>
          </div>
        </dl>
      </div>

      <div className="col-span-2">
        <h3 className="font-medium text-foreground mb-4">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Transaction Information</h4>
            <dl className="space-y-1">
              <div>
                <dt className="text-sm text-muted-foreground">Transaction Type</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.transactionType}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Merchant Category</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.merchantCategory}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Settlement Time</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.settlementTime}</dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Risk & Compliance</h4>
            <dl className="space-y-1">
              <div>
                <dt className="text-sm text-muted-foreground">Risk Factors</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.riskFactors.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Compliance Checks</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.complianceChecks.join(", ")}</dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Business Details</h4>
            <dl className="space-y-1">
              <div>
                <dt className="text-sm text-muted-foreground">Business Unit</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.businessUnit}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Cost Center</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.costCenter}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Approvers</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.approvers.join(", ")}</dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Security</h4>
            <dl className="space-y-1">
              <div>
                <dt className="text-sm text-muted-foreground">Security Measures</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.securityMeasures.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Attachments</dt>
                <dd className="text-sm font-medium text-foreground">{transaction.additionalDetails.attachments.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      <div className="col-span-2">
        <h3 className="font-medium text-foreground mb-4">Transaction Timeline</h3>
        <div className="space-y-4">
          {transaction.history.map((event, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-foreground">{event.description}</p>
                <p className="text-xs text-muted-foreground">{format(new Date(event.time), 'HH:mm:ss')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DetailModal>
);

const AlertDetails = ({ alert, onClose }) => (
  <DetailModal title="Alert Details" onClose={onClose}>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-foreground mb-4">Alert Information</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Type</dt>
              <dd className="text-sm font-medium text-foreground capitalize">{alert.type}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">PSP</dt>
              <dd className="text-sm font-medium text-foreground">{alert.psp}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Severity</dt>
              <dd className="text-sm font-medium">
                <SeverityBadge severity={alert.severity} />
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">AI Confidence</dt>
              <dd className="text-sm font-medium text-foreground">{(alert.aiConfidence * 100).toFixed(1)}%</dd>
            </div>
          </dl>
        </div>
        
        <div>
          <h3 className="font-medium text-foreground mb-4">Impact Analysis</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Impact</dt>
              <dd className="text-sm font-medium text-foreground">{alert.impact}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Department</dt>
              <dd className="text-sm font-medium text-foreground">{alert.department}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Resolution Status</dt>
              <dd className="text-sm font-medium text-foreground">{alert.resolution}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Recommendation</dt>
              <dd className="text-sm font-medium text-foreground">{alert.recommendation}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-foreground mb-4">Detailed Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alert.details && Object.entries(alert.details).map(([key, value]) => (
            <div key={key} className="bg-muted p-4 rounded-lg">
              <dt className="text-sm font-medium text-foreground capitalize mb-2">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </dt>
              <dd className="text-sm text-muted-foreground">
                {Array.isArray(value) ? value.join(", ") : value}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DetailModal>
);

const StatusBadge = ({ status }) => {
  const colors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    delayed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
};

const SeverityBadge = ({ severity }) => {
  const colors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    critical: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[severity]}`}>
      {severity}
    </span>
  );
};

const AIInsightsSummary = ({ onViewDetails }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewDetails('risk')}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary font-medium mb-1">System Risk Score</p>
          <p className="text-2xl font-bold text-foreground">78/100</p>
          <p className="text-sm text-muted-foreground mt-1">Based on 1,234 transactions</p>
        </div>
        <div className="p-3 rounded-full bg-primary/10">
          <Gauge className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
    
    <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewDetails('anomalies')}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary font-medium mb-1">Active Anomalies</p>
          <p className="text-2xl font-bold text-foreground">24</p>
          <p className="text-sm text-muted-foreground mt-1">↑12% from yesterday</p>
        </div>
        <div className="p-3 rounded-full bg-primary/10">
          <AlertCircle className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
    
    <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewDetails('ml')}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary font-medium mb-1">ML Accuracy</p>
          <p className="text-2xl font-bold text-foreground">95.8%</p>
          <p className="text-sm text-muted-foreground mt-1">Last 7 days</p>
        </div>
        <div className="p-3 rounded-full bg-primary/10">
          <Brain className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
    
    <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewDetails('volume')}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary font-medium mb-1">Total Volume</p>
          <p className="text-2xl font-bold text-foreground">KES 29.8M</p>
          <p className="text-sm text-muted-foreground mt-1">Today's transactions</p>
        </div>
        <div className="p-3 rounded-full bg-primary/10">
          <DollarSign className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  </div>
);

const AIPredictiveAnalytics = ({ onViewDetails }) => (
  <div className="bg-card rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Brain className="w-6 h-6 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-foreground">AI Predictive Analytics</h2>
      </div>
      <button 
        className="text-primary hover:text-primary/80 text-sm font-medium"
        onClick={() => onViewDetails('predictive')}
      >
        View Details
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Delay Probability Forecast</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={aiInsightsData.predictedDelays}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="probability" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.2)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">PSP Risk Analysis</h3>
        <div className="space-y-4">
          {aiInsightsData.riskScores.map((psp) => (
            <div key={psp.psp} className="bg-muted p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{psp.psp}</span>
                <span className="text-sm text-muted-foreground">{psp.volume}</span>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-secondary rounded-full mr-2">
                  <div 
                    className={`h-2 rounded-full ${
                      psp.score < 30 ? 'bg-green-500' : 
                      psp.score < 70 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${psp.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{psp.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AnomalyTrends = ({ onViewDetails }) => (
  <div className="bg-card rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <AlertTriangle className="w-6 h-6 text-destructive mr-2" />
        <h2 className="text-lg font-semibold text-foreground">Anomaly Trends</h2>
      </div>
      <button 
        className="text-destructive hover:text-destructive/80 text-sm font-medium"
        onClick={() => onViewDetails('anomalies')}
      >
        View All
      </button>
    </div>
    
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={aiInsightsData.anomalyTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="hsl(var(--destructive))" 
            fill="hsl(var(--destructive) / 0.2)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    
    <div className="mt-4 space-y-2">
      {aiInsightsData.anomalyTrends.slice(-3).map((trend, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
          <span className="text-sm text-foreground">{trend.date}</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">{trend.count} anomalies</span>
            <SeverityBadge severity={trend.severity} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComplianceMetrics = ({ onViewDetails }) => {
  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  
  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Compliance Metrics</h2>
        </div>
        <button 
          className="text-primary hover:text-primary/80 text-sm font-medium"
          onClick={() => onViewDetails('compliance')}
        >
          View Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Overall Compliance</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={aiInsightsData.complianceMetrics.byPSP}
                  dataKey="score"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {aiInsightsData.complianceMetrics.byPSP.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">PSP Compliance Scores</h3>
          <div className="space-y-4">
            {aiInsightsData.complianceMetrics.byPSP.map((psp, index) => (
              <div key={psp.name} className="bg-muted p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{psp.name}</span>
                  <span className="text-sm font-medium text-foreground">{psp.score}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${psp.score}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionsTable = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
          <div className="flex space-x-4">
            <button className="text-muted-foreground hover:text-foreground">
              <Filter className="w-5 h-5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  PSP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {mockTransactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{transaction.psp}</div>
                    <div className="text-sm text-muted-foreground">{transaction.reference}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">
                      KES {transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">{transaction.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{transaction.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className={`w-2 h-2 rounded-full mr-2 ${
                          transaction.aiRiskScore < 30 ? 'bg-green-500' :
                          transaction.aiRiskScore < 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                      />
                      <span className="text-sm font-medium text-foreground">{transaction.aiRiskScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-primary hover:text-primary/80"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedTransaction && (
          <TransactionDetails 
            transaction={selectedTransaction} 
            onClose={() => setSelectedTransaction(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AlertsList = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-foreground">Active Alerts</h2>
        <div className="flex space-x-4">
          <button className="text-muted-foreground hover:text-foreground">
            <Filter className="w-5 h-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className="flex items-start p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
            onClick={() => setSelectedAlert(alert)}
          >
            <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
              alert.severity === 'high' ? 'text-destructive' :
              alert.severity === 'medium' ? 'text-yellow-500' :
              'text-blue-500'
            } mr-4`} />
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">{alert.psp}</h3>
                <SeverityBadge severity={alert.severity} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{format(new Date(alert.timestamp), 'HH:mm')}</span>
                  <span>AI Confidence: {(alert.aiConfidence * 100).toFixed(1)}%</span>
                </div>
                <button 
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAlert(alert);
                  }}
                >
                  Investigate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedAlert && (
          <AlertDetails 
            alert={selectedAlert} 
            onClose={() => setSelectedAlert(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const InsightsModal = ({ type, onClose }) => {
  const getContent = () => {
    switch (type) {
      case 'risk':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">System Risk Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Risk Distribution</h4>
                <p className="text-muted-foreground">Detailed risk metrics and distribution analysis</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Risk Factors</h4>
                <p className="text-muted-foreground">Key contributing factors to current risk levels</p>
              </div>
            </div>
          </div>
        );
      case 'anomalies':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Anomaly Detection Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Pattern Analysis</h4>
                <p className="text-muted-foreground">Unusual transaction patterns and behaviors</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Impact Assessment</h4>
                <p className="text-muted-foreground">Business impact of detected anomalies</p>
              </div>
            </div>
          </div>
        );
      case 'ml':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Machine Learning Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Model Accuracy</h4>
                <p className="text-muted-foreground">Detailed accuracy metrics across different models</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Training Data</h4>
                <p className="text-muted-foreground">Recent training data and model improvements</p>
              </div>
            </div>
          </div>
        );
      case 'volume':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Transaction Volume Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Volume Trends</h4>
                <p className="text-muted-foreground">Historical and current transaction volume analysis</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Peak Analysis</h4>
                <p className="text-muted-foreground">Peak transaction periods and capacity planning</p>
              </div>
            </div>
          </div>
        );
      case 'predictive':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Predictive Analytics Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Future Predictions</h4>
                <p className="text-muted-foreground">Upcoming trends and potential issues</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Model Confidence</h4>
                <p className="text-muted-foreground">Confidence levels in current predictions</p>
              </div>
            </div>
          </div>
        );
      case 'compliance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Compliance Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Compliance Status</h4>
                <p className="text-muted-foreground">Current compliance levels and requirements</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Risk Areas</h4>
                <p className="text-muted-foreground">Identified compliance risk areas and mitigation</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DetailModal 
      title={type.charAt(0).toUpperCase() + type.slice(1) + ' Details'} 
      onClose={onClose}
    >
      {getContent()}
    </DetailModal>
  );
};

const ReportsContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { 
        title: "PSP Performance Analysis",
        icon: BarChart3,
        description: "Detailed analysis of PSP transaction metrics and SLA compliance",
        type: "Performance"
      },
      { 
        title : "Risk Assessment Report",
        icon: AlertTriangle,
        description: "AI-driven risk analysis and anomaly detection insights",
        type: "Risk"
      },
      { 
        title: "Compliance Dashboard",
        icon: Shield,
        description: "Regulatory compliance status and audit trails",
        type: "Compliance"
      },
      { 
        title: "Transaction Analytics",
        icon: Activity,
        description: "Detailed transaction patterns and volume analysis",
        type: "Analytics"
      },
      { 
        title: "Department Insights",
        icon: Building2,
        description: "Department-wise payment analytics and trends",
        type: "Department"
      },
      { 
        title: "AI Model Performance",
        icon: Brain,
        description: "ML model accuracy and prediction analysis",
        type: "AI"
      }
    ].map((report, index) => (
      <div 
        key={index} 
        className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex items-center justify-between mb-4">
          <report.icon className="w-8 h-8 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">{report.type}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{report.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{report.description}</p>
        <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
          Generate Report
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    ))}
  </div>
);

const DashboardContent = () => {
  const [selectedInsightType, setSelectedInsightType] = useState(null);
  
  return (
    <>
      <AIInsightsSummary onViewDetails={setSelectedInsightType} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AIPredictiveAnalytics onViewDetails={setSelectedInsightType} />
        <AnomalyTrends onViewDetails={setSelectedInsightType} />
      </div>
      <ComplianceMetrics onViewDetails={setSelectedInsightType} />
      <div className="mt-8">
        <TransactionsTable />
      </div>
      
      <AnimatePresence>
        {selectedInsightType && (
          <InsightsModal 
            type={selectedInsightType} 
            onClose={() => setSelectedInsightType(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardContent />;
    case 'transactions':
      return <TransactionsTable />;
    case 'alerts':
      return <AlertsList />;
    case 'reports':
      return <ReportsContent />;
    default:
      return <DashboardContent />;
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <nav className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-primary" />
              <span className="ml-2 text-xl font-semibold text-foreground">AI PSP Monitor</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button className="text-foreground hover:text-primary transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <button className="text-foreground hover:text-primary transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-border mb-8">
          <nav className="-mb-px flex space-x-8">
            {['dashboard', 'transactions', 'alerts', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  ${activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <TabContent activeTab={activeTab} />
      </main>
    </div>
  );
}

export default App;