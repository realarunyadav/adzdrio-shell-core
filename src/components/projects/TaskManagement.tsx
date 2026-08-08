import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  MoreHorizontal, 
  MessageSquare, 
  Paperclip, 
  Calendar,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TaskManagement = () => {
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'review', title: 'Review', color: 'bg-amber-50' },
    { id: 'done', title: 'Done', color: 'bg-emerald-50' }
  ];

  const tasks = [
    { id: 1, title: 'Design System Tokens', priority: 'High', date: 'Aug 12', stage: 'todo', comments: 3, files: 2 },
    { id: 2, title: 'API Integration (Auth)', priority: 'Critical', date: 'Aug 10', stage: 'in-progress', comments: 8, files: 1 },
    { id: 3, title: 'Mobile Navigation', priority: 'Medium', date: 'Aug 15', stage: 'review', comments: 0, files: 5 }
  ];

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Board View</h3>
        <Button size="sm" className="h-9 px-4 font-bold"><Plus className="w-4 h-4 mr-2" />Add Task</Button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar min-h-[600px]">
        {columns.map(col => (
          <div key={col.id} className="flex flex-col gap-4 min-w-[300px] flex-1">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.id === 'done' ? 'bg-emerald-500' : col.id === 'review' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{col.title}</h5>
              </div>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {tasks.filter(t => t.stage === col.id).length}
              </Badge>
            </div>
            
            <div className={`flex flex-col gap-3 p-3 rounded-2xl ${col.color} border border-dashed border-slate-200/50 min-h-full`}>
              {tasks.filter(t => t.stage === col.id).map(task => (
                <Card key={task.id} className="p-4 border-none shadow-sm hover:shadow-md transition-all cursor-grab group active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={`text-[9px] font-bold ${task.priority === 'Critical' ? 'bg-rose-500' : task.priority === 'High' ? 'bg-amber-500' : 'bg-slate-700'}`}>
                      {task.priority}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                  </div>
                  <h6 className="text-sm font-bold text-slate-800 mb-4 leading-snug">{task.title}</h6>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <MessageSquare className="w-3 h-3" />
                        {task.comments}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <Paperclip className="w-3 h-3" />
                        {task.files}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {task.date}
                    </div>
                  </div>
                </Card>
              ))}
              <Button variant="ghost" className="w-full justify-start text-[11px] font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-200/20 h-10 border-dashed border border-slate-300/30">
                <Plus className="w-3.5 h-3.5 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
