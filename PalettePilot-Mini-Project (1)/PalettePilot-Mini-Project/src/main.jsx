import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LayoutDashboard, FolderKanban, CheckSquare, Palette, Search, Plus, ArrowUpRight, Clock3, MoreHorizontal, Sparkles, X, CircleCheck, CalendarDays, Trash2, Menu } from 'lucide-react';
import './styles.css';

const initialProjects = [
  { id: 1, title: 'Bloom Skincare', type: 'Brand identity', status: 'In progress', due: 'Oct 18', color: '#d9e8c5', accent: '#6b8d52', progress: 72, description: 'A fresh, botanical identity for a modern skincare line.' },
  { id: 2, title: 'Sunday Market', type: 'Social campaign', status: 'Review', due: 'Oct 21', color: '#f6d8bd', accent: '#c5784b', progress: 48, description: 'A warm and playful campaign for a local makers market.' },
  { id: 3, title: 'North Studio', type: 'Web design', status: 'In progress', due: 'Oct 25', color: '#d7d9f8', accent: '#6669bd', progress: 35, description: 'A clean portfolio experience for an architecture studio.' },
  { id: 4, title: 'Good Grounds', type: 'Packaging', status: 'Completed', due: 'Oct 08', color: '#d6e9e8', accent: '#448783', progress: 100, description: 'Minimal packaging system for a small-batch coffee brand.' }
];
const initialTasks = [
  { id: 1, title: 'Finalize logo variations', project: 'Bloom Skincare', date: 'Today', done: false },
  { id: 2, title: 'Export campaign story sizes', project: 'Sunday Market', date: 'Today', done: false },
  { id: 3, title: 'Review homepage wireframe', project: 'North Studio', date: 'Tomorrow', done: true },
  { id: 4, title: 'Prepare color style guide', project: 'Bloom Skincare', date: 'Tomorrow', done: false }
];

function App() {
  const [page, setPage] = useState('Overview');
  const [projects, setProjects] = useState(() => { try { return JSON.parse(localStorage.getItem('pp-projects')) || initialProjects; } catch { return initialProjects; } });
  const [tasks, setTasks] = useState(() => { try { return JSON.parse(localStorage.getItem('pp-tasks')) || initialTasks; } catch { return initialTasks; } });
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All projects');
  const [showModal, setShowModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'Brand identity', description: '' });

  const saveProjects = (next) => { setProjects(next); localStorage.setItem('pp-projects', JSON.stringify(next)); };
  const saveTasks = (next) => { setTasks(next); localStorage.setItem('pp-tasks', JSON.stringify(next)); };
  const filteredProjects = useMemo(() => projects.filter(p => (p.title + ' ' + p.type).toLowerCase().includes(query.toLowerCase()) && (filter === 'All projects' || p.status === filter)), [projects, query, filter]);
  const completedTasks = tasks.filter(t => t.done).length;

  const addProject = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const colors = [{ color: '#f6d8bd', accent: '#c5784b' }, { color: '#d7d9f8', accent: '#6669bd' }, { color: '#d9e8c5', accent: '#6b8d52' }, { color: '#f3d6e8', accent: '#b65f91' }];
    const palette = colors[projects.length % colors.length];
    saveProjects([{ id: Date.now(), title: form.title.trim(), type: form.type, status: 'In progress', due: 'Set date', progress: 0, description: form.description || 'A new creative project, ready to take shape.', ...palette }, ...projects]);
    setForm({ title: '', type: 'Brand identity', description: '' }); setShowModal(false); setPage('Projects');
  };
  const toggleTask = (id) => saveTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteProject = (id) => { const next = projects.filter(p => p.id !== id); saveProjects(next); };

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'mobile-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Palette size={20}/></div><span>palette<span className="brand-light">pilot</span></span></div>
      <div className="workspace-label">WORKSPACE <span>⌄</span></div>
      <nav>
        {[['Overview', LayoutDashboard], ['Projects', FolderKanban], ['My tasks', CheckSquare], ['Moodboard', Sparkles]].map(([name, Icon]) =>
          <button key={name} className={`nav-item ${page === name ? 'active' : ''}`} onClick={() => { setPage(name); setMobileNav(false); }}><Icon size={18}/><span>{name}</span>{name === 'My tasks' && <span className="nav-count">{tasks.filter(t=>!t.done).length}</span>}</button>
        )}
      </nav>
      <div className="sidebar-bottom">
        <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={16}/></div><strong>Ideas into impact.</strong><p>Your next great project starts with a clear plan.</p><button onClick={() => setShowModal(true)}>Create a project <ArrowUpRight size={14}/></button></div>
        <div className="profile"><div className="avatar">J</div><div><strong>Jemi Jiji</strong><small>Creative designer</small></div><MoreHorizontal size={19} className="profile-more"/></div>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="mobile-menu icon-button" onClick={() => setMobileNav(!mobileNav)} aria-label="Open menu"><Menu size={20}/></button>
        <div className="breadcrumb">Workspace <span>/</span> <strong>{page}</strong></div>
        <div className="top-actions"><div className="searchbox"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects..." /></div><div className="avatar top-avatar">J</div></div>
      </header>

      {page === 'Overview' && <section className="content">
        <div className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR CREATIVE SPACE</div><h1>Make room for <em>great ideas.</em></h1><p className="subhead">A little clarity goes a long way. Here’s your creative work at a glance.</p></div><button className="primary-btn" onClick={() => setShowModal(true)}><Plus size={17}/> New project</button></div>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-top"><span>Active projects</span><div className="stat-icon lavender"><FolderKanban size={18}/></div></div><div className="stat-number">{projects.filter(p=>p.status!=='Completed').length.toString().padStart(2,'0')}<span className="stat-note"> projects in motion</span></div><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
          <div className="stat-card"><div className="stat-top"><span>Tasks completed</span><div className="stat-icon green"><CircleCheck size={18}/></div></div><div className="stat-number">{completedTasks.toString().padStart(2,'0')}<span className="stat-note"> of {tasks.length} tasks</span></div><div className="progress-track"><span style={{width: `${tasks.length ? completedTasks/tasks.length*100 : 0}%`}}/></div><small className="progress-caption">{tasks.length ? Math.round(completedTasks/tasks.length*100) : 0}% of your task list complete</small></div>
          <div className="stat-card"><div className="stat-top"><span>Coming up</span><div className="stat-icon peach"><CalendarDays size={18}/></div></div><div className="stat-number">{projects.filter(p=>p.status!=='Completed').length.toString().padStart(2,'0')}<span className="stat-note"> upcoming deadlines</span></div><div className="deadline-note"><Clock3 size={14}/> Keep your momentum going</div></div>
        </div>
        <div className="section-heading"><div><h2>Recent projects</h2><p>Your ideas, taking shape.</p></div><button className="text-btn" onClick={()=>setPage('Projects')}>View all projects <ArrowUpRight size={15}/></button></div>
        <ProjectGrid projects={projects.slice(0,3)} onDelete={deleteProject} />
        <div className="lower-grid">
          <div className="panel tasks-panel"><div className="panel-heading"><div><h2>Today’s focus</h2><p>Small steps, beautiful outcomes.</p></div><button className="dots-btn" onClick={()=>setPage('My tasks')}><ArrowUpRight size={17}/></button></div><TaskList tasks={tasks.slice(0,4)} onToggle={toggleTask}/><button className="add-task" onClick={()=>setPage('My tasks')}><Plus size={15}/> View all tasks</button></div>
          <div className="quote-panel"><div className="quote-mark">“</div><p>Creativity is intelligence having fun.</p><span>— ALBERT EINSTEIN</span><div className="quote-shapes"><i/><i/><i/></div></div>
        </div>
      </section>}

      {page === 'Projects' && <section className="content"><div className="page-title-row"><div><div className="eyebrow">YOUR PORTFOLIO IN PROGRESS</div><h1>All <em>projects.</em></h1><p className="subhead">Keep every creative brief, big or small, in one place.</p></div><button className="primary-btn" onClick={()=>setShowModal(true)}><Plus size={17}/> New project</button></div><div className="filter-row"><div className="filter-pills">{['All projects','In progress','Review','Completed'].map(f=><button key={f} className={filter===f?'selected':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><span className="result-count">{filteredProjects.length} projects</span></div><ProjectGrid projects={filteredProjects} onDelete={deleteProject}/>{filteredProjects.length===0&&<div className="empty-state">No projects match that search. Try another keyword.</div>}</section>}

      {page === 'My tasks' && <section className="content"><div className="page-title-row"><div><div className="eyebrow">ONE THING AT A TIME</div><h1>Task <em>list.</em></h1><p className="subhead">Progress isn’t always loud. Sometimes it’s one checkbox.</p></div><div className="task-summary">{completedTasks}/{tasks.length}<small>completed</small></div></div><div className="panel full-task-panel"><div className="panel-heading"><div><h2>Your tasks</h2><p>{tasks.filter(t=>!t.done).length} things left to do</p></div><span className="date-chip"><CalendarDays size={14}/> This week</span></div><TaskList tasks={tasks} onToggle={toggleTask}/><div className="task-footer">You’ve got this. Keep going at your own pace ✨</div></div></section>}

      {page === 'Moodboard' && <section className="content"><div className="page-title-row"><div><div className="eyebrow">COLLECT YOUR INSPIRATION</div><h1>Color me <em>inspired.</em></h1><p className="subhead">A small collection of palettes to spark your next idea.</p></div></div><div className="mood-grid">{[['Earthy calm','Grounded, warm, organic',['#344e41','#588157','#a3b18a','#dad7cd','#fefae0']],['Electric pop','Playful, bold, energetic',['#242038','#725ac1','#8d86c9','#cac4ce','#f0eff4']],['Soft morning','Gentle, airy, optimistic',['#f7ede2','#f5cac3','#84a59d','#f28482','#f6bd60']],['Ocean studio','Cool, focused, balanced',['#003049','#1d5d78','#669bbc','#a8dadc','#f1faee']]].map(([title,desc,colors])=><div className="mood-card" key={title}><div className="swatches">{colors.map(c=><div key={c} style={{background:c}} title={c}><span>{c}</span></div>)}</div><div className="mood-info"><div><h3>{title}</h3><p>{desc}</p></div><button className="copy-palette" onClick={()=>{navigator.clipboard?.writeText(colors.join(', ')); alert('Palette hex codes copied!')}}>Copy colors <ArrowUpRight size={14}/></button></div></div>)}</div><div className="tip-box"><Sparkles size={18}/><div><strong>Designer tip</strong><p>Choose one dominant color, one supporting color, and one accent. Let neutral shades give your layout room to breathe.</p></div></div></section>}

      <footer className="footer"><span>© 2026 PalettePilot</span><span>Made for the beautifully curious <span className="heart">♥</span></span></footer>
    </main>
    {showModal && <div className="modal-backdrop" onClick={()=>setShowModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-top"><div><div className="eyebrow">START SOMETHING GOOD</div><h2>New project</h2><p>Every great idea starts somewhere.</p></div><button className="icon-button" onClick={()=>setShowModal(false)} aria-label="Close"><X size={20}/></button></div><form onSubmit={addProject}><label>Project name<input autoFocus required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Little Lemon Café"/></label><label>Project type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Brand identity</option><option>Social campaign</option><option>Web design</option><option>Packaging</option><option>Illustration</option><option>Print design</option></select></label><label>Short description <span className="optional">(optional)</span><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="What are you creating?" rows="3"/></label><div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setShowModal(false)}>Cancel</button><button type="submit" className="primary-btn"><Plus size={16}/> Create project</button></div></form></div></div>}
  </div>;
}

function ProjectGrid({ projects, onDelete }) {
  if (!projects.length) return null;
  return <div className="project-grid">{projects.map(p=><article className="project-card" key={p.id}><div className="project-art" style={{background:p.color}}><div className="art-orbit" style={{borderColor:p.accent}}/><div className="art-circle" style={{background:p.accent}}/><div className="art-label" style={{color:p.accent}}>{p.type.toUpperCase()}</div><button className="project-menu" title="Delete project" onClick={()=>onDelete(p.id)}><Trash2 size={15}/></button></div><div className="project-body"><div className="project-title-row"><div><h3>{p.title}</h3><p>{p.type}</p></div><span className={`status status-${p.status.toLowerCase().replace(' ','-')}`}>{p.status}</span></div><p className="project-desc">{p.description}</p><div className="project-progress-label"><span>Progress</span><strong>{p.progress}%</strong></div><div className="progress-track"><span style={{width:`${p.progress}%`,background:p.accent}}/></div><div className="project-meta"><span><Clock3 size={14}/> Due {p.due}</span><span className="project-link">Open project <ArrowUpRight size={14}/></span></div></div></article>)}</div>;
}
function TaskList({ tasks, onToggle }) {
  return <div className="task-list">{tasks.map(t=><label className={`task-row ${t.done?'task-done':''}`} key={t.id}><input type="checkbox" checked={t.done} onChange={()=>onToggle(t.id)}/><span className="custom-check"><CircleCheck size={15}/></span><span className="task-copy"><strong>{t.title}</strong><small>{t.project}</small></span><span className="task-date">{t.date}</span></label>)}</div>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);