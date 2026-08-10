import { API_BASE_URL } from '../../config';
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save, LogOut, CheckCircle2, Shield, Bell, CreditCard, Download, FileText } from "lucide-react";

const AVATAR_COLORS = ["bg-indigo-500", "bg-violet-500", "bg-emerald-500", "bg-sky-500", "bg-rose-500", "bg-amber-500"];

const ProfilePage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    location: "Mumbai, India",
    currency: "INR",
    monthlyIncome: "",
  });
  const [avatarColor, setAvatarColor] = useState(0);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ budgetAlerts: true, weeklyReport: true, aiParsed: false });
  const [expenseList, setExpenseList] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    setForm({
      username: localStorage.getItem('username') || '',
      email: localStorage.getItem('email') || '',
      phone: localStorage.getItem('mobileNo') || '',
      monthlyIncome: localStorage.getItem('monthlyIncome') || '',
      location: "Mumbai, India",
      currency: "INR"
    });
  }, []);

  const set = (key, val) => {
    setSaved(false);
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaved(false);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          mobileNo: form.phone,
          monthlyIncome: parseFloat(form.monthlyIncome || 0)
        }),
        credentials: 'include'
      });

      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error updating profile');
      }

      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);
      localStorage.setItem('mobileNo', data.mobileNo || '');
      localStorage.setItem('monthlyIncome', data.monthlyIncome);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Profile save error:", err);
      alert(err.message || "Failed to update profile details.");
    }
  };

  const initials = (form.username[0] || "U").toUpperCase();

  const exportExpenseToCsv = async () => {
    try {
      window.open(`${API_BASE_URL}/user/exportExpenseToCsv`, "_blank");
    } catch (err) {
      console.error("Error downloading CSV", err);
    }
  };

  const fetchExpenseData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/exportExpenseToCsv?format=json`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include"
      });

      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }

      if (!response.ok) throw new Error("Error fetching list data");
      
      const result = await response.json();
      setExpenseList(result.data || []);
      setShowList(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-2xl text-left print:max-w-full">
      {/* Page header */}
      <div className="print:hidden">
        <h2 className="text-xl font-extrabold text-slate-800 font-display">Profile Settings</h2>
        <p className="text-[0.62rem] uppercase tracking-wider text-slate-500 font-mono font-bold mt-1">Manage your account and preferences</p>
      </div>

      {/* Action Buttons to View and Export Data */}
      <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap gap-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] print:hidden">
        <button 
          onClick={fetchExpenseData}
          className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-4 h-9.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
        >
          <FileText className="size-3.5 text-indigo-600" /> 
          <span>View Expense List</span>
        </button>
        <button 
          onClick={exportExpenseToCsv}
          className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-4 h-9.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
        >
          <Download className="size-3.5 text-emerald-600" /> 
          <span>Save Clean CSV</span>
        </button>
        {showList && (
          <button 
            onClick={handleDownloadPDF}
            className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-4 h-9.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white border border-indigo-400/30 transition shadow-sm"
          >
            Download Expense PDF
          </button>
        )}
      </div>

      {/* Dynamic Expense List Container */}
      {showList && (
        <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] print:border-none print:p-0">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-150">
            <h3 className="text-xs font-extrabold text-slate-800 font-display uppercase tracking-wider">Expense Statements</h3>
            <span className="text-[0.62rem] font-bold px-2 py-0.5 bg-slate-55 border border-slate-200 text-slate-600 rounded-full print:hidden">
              {expenseList.length} Entries Found
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50/50 text-[0.62rem] font-bold text-slate-500 font-mono uppercase tracking-wider">
                  <th className="py-2 px-3">Title</th>
                  <th className="py-2 px-3">Category</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenseList.length > 0 ? (
                  expenseList.map((exp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-slate-700">{exp.title || "Untitled"}</td>
                      <td className="py-2.5 px-3">
                        <span className="capitalize text-[0.62rem] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 px-2 py-0.5 rounded-lg">
                          {exp.category || "others"}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono">
                        {exp.dateAndTime ? new Date(exp.dateAndTime).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-800 font-mono">
                        ₹{parseFloat(exp.amount || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-450 text-xs">No entries recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Profile form */}
    
    

      {/* Security + Logout */}
      <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-5 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)] print:hidden">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-slate-150 pb-2.5">
          <Shield className="size-4 text-indigo-650" /> Account Settings
        </p>
       
        <button 
          onClick={exportExpenseToCsv}
          className="w-full text-left px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 transition text-xs font-bold text-slate-600 flex items-center justify-between shadow-sm"
        >
          <span>Export My Data</span>
          <span className="text-[0.58rem] text-slate-500 font-mono">.csv / .json</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-100 bg-rose-50 hover:bg-rose-100 transition text-xs font-bold text-rose-600">
          <LogOut className="size-3.5" />
          <span>Log Out of FinSight</span>
        </button>
      </div>

    </div>
  );
};

export default ProfilePage;