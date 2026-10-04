import { useState } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import {
  ArrowDownToLine, ArrowUpFromLine, BarChart3, Bell, ChevronDown,
  CircleHelp, Copy, CreditCard, LayoutDashboard, Menu, Moon, Search,
  Settings, ShieldCheck, Wallet, X, Zap
} from "lucide-react";
import { assets, activities, marketRows } from "./data";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/markets", label: "Markets", icon: BarChart3 },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/transactions", label: "Transactions", icon: CreditCard },
  { to: "/mining", label: "Mining", icon: Zap },
  { to: "/security", label: "Security", icon: ShieldCheck }
];

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">B</div>
          <div><strong>bit Trade net</strong><span>Digital Asset Portal</span></div>
          <button className="icon-btn mobile-close" onClick={() => setOpen(false)}><X size={18}/></button>
        </div>

        <nav className="nav-list">
          <p className="nav-label">Workspace</p>
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => `nav-item ${isActive ? "active" : ""}`}>
              <Icon size={18}/><span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/settings" className="nav-item"><Settings size={18}/><span>Settings</span></NavLink>
          <div className="support-card">
            <CircleHelp size={18}/>
            <div><strong>Need assistance?</strong><span>Contact client support</span></div>
          </div>
          <div className="profile-mini">
            <div className="avatar">BJ</div>
            <div><strong>Joshua Bergin</strong><span>Client account</span></div>
            <ChevronDown size={16}/>
          </div>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setOpen(true)}><Menu size={21}/></button>
          <div className="top-search"><Search size={17}/><input placeholder="Search markets, assets..." /></div>
          <div className="top-actions">
            <div className="status-pill"><span></span> Network operational</div>
            <button className="icon-btn"><Bell size={19}/></button>
            <button className="icon-btn"><Moon size={18}/></button>
            <div className="avatar">BJ</div>
          </div>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/mining" element={<Mining />} />
            <Route path="/security" element={<Security />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function PageHead({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return <div className="page-head"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}

function StatCard({ label, value, meta, positive = true }: { label:string; value:string; meta:string; positive?:boolean }) {
  return <div className="stat-card"><span className="muted">{label}</span><strong>{value}</strong><small className={positive ? "up" : "down"}>{meta}</small></div>;
}

function Chart() {
  const points = "0,116 30,110 60,121 90,90 120,98 150,75 180,82 210,48 240,60 270,38 300,45 330,22 360,29 390,10 420,20 450,5 480,15";
  return <div className="chart-wrap">
    <svg viewBox="0 0 480 150" preserveAspectRatio="none" className="chart">
      <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopOpacity=".28"/><stop offset="100%" stopOpacity="0"/></linearGradient></defs>
      <polygon points={`0,150 ${points} 480,150`} fill="url(#area)"/>
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.5"/>
    </svg>
    <div className="chart-axis"><span>24h</span><span>7d</span><span>30d</span><span>90d</span><span>1y</span></div>
  </div>;
}

function Dashboard() {
  return <>
    <PageHead title="Good evening, Joshua" subtitle="Here is your portfolio overview and latest account activity."
      action={<div className="head-actions"><button className="btn secondary"><ArrowDownToLine size={16}/> Deposit</button><button className="btn primary"><ArrowUpFromLine size={16}/> Withdraw</button></div>} />
    <section className="stats-grid">
      <StatCard label="Total portfolio" value="$96,346.82" meta="+$4,218.43 · +4.58% today"/>
      <StatCard label="Available balance" value="$18,240.15" meta="Ready for allocation"/>
      <StatCard label="24h P&L" value="+$2,184.62" meta="+2.32% vs. previous day"/>
      <StatCard label="Mining yield" value="842 TH/s" meta="+6.4% network contribution"/>
    </section>

    <section className="dashboard-grid">
      <div className="panel chart-panel">
        <div className="panel-head"><div><span className="muted">Portfolio performance</span><h2>$96,346.82 <em>+4.58%</em></h2></div><select><option>USD</option><option>EUR</option></select></div>
        <Chart />
      </div>
      <div className="panel allocation">
        <div className="panel-head"><div><span className="muted">Asset allocation</span><h2>100%</h2></div></div>
        <div className="allocation-ring"><div><strong>$96.3K</strong><span>Portfolio</span></div></div>
        <div className="legend">{assets.slice(0,4).map((a,i)=><div key={a.symbol}><span className={`dot d${i}`}></span><b>{a.symbol}</b><small>{[59,17,5,13][i]}%</small></div>)}</div>
      </div>
    </section>

    <section className="panel">
      <div className="panel-head"><div><span className="muted">Your assets</span><h2>Portfolio holdings</h2></div><NavLink className="text-link" to="/wallet">View wallet</NavLink></div>
      <div className="table-scroll"><table><thead><tr><th>Asset</th><th>Price</th><th>24h</th><th>Holdings</th><th>Value</th></tr></thead><tbody>
        {assets.slice(0,4).map(a=><tr key={a.symbol}><td><b>{a.symbol}</b><span className="sub">{a.name}</span></td><td>{a.price}</td><td className={a.positive ? "up":"down"}>{a.change}</td><td>{a.holding}</td><td><b>{a.value}</b></td></tr>)}
      </tbody></table></div>
    </section>

    <section className="panel">
      <div className="panel-head"><div><span className="muted">Recent activity</span><h2>Account activity</h2></div><NavLink className="text-link" to="/transactions">View all</NavLink></div>
      <ActivityTable />
    </section>
  </>;
}

function ActivityTable() {
  return <div className="table-scroll"><table><thead><tr><th>Type</th><th>Asset</th><th>Amount</th><th>Time</th><th>Status</th></tr></thead><tbody>
    {activities.map((a,i)=><tr key={i}><td>{a.type}</td><td><b>{a.asset}</b></td><td>{a.amount}</td><td className="muted">{a.time}</td><td><span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span></td></tr>)}
  </tbody></table></div>;
}

function Markets() {
  return <><PageHead title="Markets" subtitle="Monitor digital asset prices, liquidity and market activity." />
    <section className="stats-grid"><StatCard label="Market cap" value="$2.48T" meta="+3.12% today"/><StatCard label="24h volume" value="$84.2B" meta="+8.42% today"/><StatCard label="BTC dominance" value="54.8%" meta="+0.34% today"/><StatCard label="Active assets" value="12,842" meta="Across tracked markets"/></section>
    <section className="panel"><div className="panel-head"><div><span className="muted">Market overview</span><h2>Spot markets</h2></div><div className="top-search compact"><Search size={15}/><input placeholder="Filter assets"/></div></div>
    <div className="table-scroll"><table><thead><tr><th>Pair</th><th>Last price</th><th>24h change</th><th>24h volume</th></tr></thead><tbody>{marketRows.map((r,i)=><tr key={i}><td><b>{r[0]}</b></td><td>{r[1]}</td><td className={r[2].startsWith("+")?"up":"down"}>{r[2]}</td><td>{r[3]}</td></tr>)}</tbody></table></div></section>
  </>;
}

function WalletPage() {
  return <><PageHead title="Wallet" subtitle="Manage your asset balances and account addresses." action={<button className="btn primary"><ArrowDownToLine size={16}/> Add funds</button>} />
    <section className="stats-grid"><StatCard label="Wallet balance" value="$96,346.82" meta="Across 8 assets"/><StatCard label="Available" value="$18,240.15" meta="Available balance"/><StatCard label="In allocation" value="$78,106.67" meta="Portfolio positions"/></section>
    <section className="panel"><div className="panel-head"><div><span className="muted">Balances</span><h2>Digital assets</h2></div></div>
    <div className="wallet-grid">{assets.map(a=><div className="wallet-card" key={a.symbol}><div className="coin">{a.symbol[0]}</div><div><b>{a.symbol}</b><span>{a.name}</span></div><strong>{a.value}</strong><small>{a.holding}</small></div>)}</div></section>
  </>;
}

function Transactions() {
  return <><PageHead title="Transactions" subtitle="Review deposits, trades and transfers across your account." />
    <section className="panel"><div className="panel-head"><div><span className="muted">Ledger</span><h2>Transaction history</h2></div><button className="btn secondary">Export</button></div><ActivityTable /></section>
  </>;
}

function Mining() {
  return <><PageHead title="Mining" subtitle="Review your mining allocation, hashrate and network contribution." />
    <section className="stats-grid"><StatCard label="Pool hashrate" value="842 TH/s" meta="+6.4% today"/><StatCard label="Network share" value="0.84%" meta="+0.06% this week"/><StatCard label="Current yield" value="0.0048 BTC" meta="Estimated daily output"/><StatCard label="Efficiency" value="97.8%" meta="Fleet performance"/></section>
    <section className="dashboard-grid"><div className="panel chart-panel"><div className="panel-head"><div><span className="muted">Hashrate</span><h2>842 TH/s <em>+6.4%</em></h2></div></div><Chart/></div><div className="panel"><div className="panel-head"><div><span className="muted">Pool status</span><h2>Operational</h2></div></div><div className="status-large"><span></span><strong>Network clearance active</strong><p>Mining infrastructure is operating within normal parameters.</p></div></div></section>
  </>;
}

function Security() {
  return <><PageHead title="Security" subtitle="Manage account protection and authentication controls." />
    <section className="security-list">
      {[
        ["Identity verification","Account verification status","Verified","good"],
        ["Two-factor authentication","Authenticator protection","Enabled","good"],
        ["Login protection","Suspicious activity monitoring","Active","good"],
        ["Withdrawal controls","Additional confirmation for withdrawals","Enabled","good"]
      ].map(([a,b,c,d])=><div className="security-row" key={a}><div className="security-icon"><ShieldCheck size={20}/></div><div><b>{a}</b><span>{b}</span></div><span className={`badge ${d}`}>{c}</span><button className="btn secondary small">Manage</button></div>)}
    </section>
  </>;
}

function SettingsPage() {
  return <><PageHead title="Settings" subtitle="Manage your portal preferences and account details." />
    <section className="panel settings-panel"><label>Display name<input value="Joshua Bergin" readOnly /></label><label>Preferred currency<select><option>USD — US Dollar</option><option>EUR — Euro</option></select></label><label>Language<select><option>English</option></select></label><button className="btn primary">Save preferences</button></section>
  </>;
}

export default App;