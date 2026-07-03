import { ChartNoAxesCombined, LayoutDashboard, LineChart, Receipt, User, BookOpen, PlusSquare, LogOut, Bot } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../../../components/ui/utils'

const sections = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", Icon: LayoutDashboard, to: '/dashboard', end: true },
      { name: "Deep Analytics", Icon: LineChart, to: 'analytics' },
      { name: "AI Advisor Chat", Icon: Bot, to: 'ai-advisor' },
    ]
  },
  {
    title: "Management",
    items: [
      { name: "Transactions Ledger", Icon: Receipt, to: "transactions" },
      { name: "Add Transaction", Icon: PlusSquare, to: "add-transaction" },
      { name: "AI Parser Guide", Icon: BookOpen, to: "parser-guide" },
      { name: "Profile Settings", Icon: User, to: "profile" },
    ]
  }
]

const DashNav = () => {
  const navigate = useNavigate();
  const logOutBtn = async () => {
    try {
      await fetch('http://localhost:3000/user/logoutuser', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
    } catch (error) {
      console.log(error);
    }
    navigate('/');
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-800/80 bg-[#101222] py-5 px-4 print:hidden">
      
      {/* Brand Identity */}
      <div className="flex items-center gap-2.5 px-2 pb-5 border-b border-slate-800/60 w-full">
        <div className="grid size-9.5 place-items-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-sm">
          <ChartNoAxesCombined className="size-4.5" strokeWidth={2.4} />
        </div>
        <span className="text-sm font-extrabold text-white tracking-wide font-display">
          FinSight
        </span>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-6 py-6 w-full overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="px-3 text-[0.58rem] font-bold text-slate-500 uppercase tracking-wider font-mono">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map(({ name, Icon, to, end }) => (
                <NavLink
                  key={name}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300",
                      isActive
                        ? "bg-indigo-650/15 border-indigo-500/35 text-indigo-400 shadow-sm"
                        : "text-slate-400 border-transparent hover:bg-slate-800/40 hover:text-slate-100"
                    )
                  }
                >
                  <Icon className="size-4" strokeWidth={2.2} />
                  <span>{name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Logout */}
      <div className="pt-4 border-t border-slate-800/60 w-full">
        <button
          onClick={logOutBtn}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-slate-400 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-450 transition-all duration-300 text-xs font-bold"
        >
          <LogOut className="size-4" strokeWidth={2.2} />
          <span>Log Out</span>
        </button>
      </div>

    </aside>
  )
}

export default DashNav;