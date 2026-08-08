import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Star, 
  Truck, 
  Clock, 
  MoreHorizontal,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const VendorManagement = () => {
  const vendors = [
    { 
      name: "Cisco Systems India", 
      contact: "Rajesh Kumar", 
      cat: "Network Hardware", 
      pos: 12, 
      rating: 4.8, 
      delivery: "98%", 
      status: "Verified" 
    },
    { 
      name: "Dell Technologies", 
      contact: "Anita Singh", 
      cat: "Compute Nodes", 
      pos: 8, 
      rating: 4.5, 
      delivery: "94%", 
      status: "Verified" 
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search supplier master..." className="pl-10 h-10 border-slate-200" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-10 font-bold px-4">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="h-10 bg-slate-900 text-white font-bold px-6">
            Register Vendor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((v, i) => (
          <Card key={i} className="border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black">
                     {v.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                       <h4 className="font-black text-slate-900">{v.name}</h4>
                       <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{v.contact}</span>
                  </div>
                </div>
                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] font-black uppercase tracking-widest px-2 shadow-none">
                  {v.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-50 mb-6">
                 <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Performance</span>
                    <div className="flex items-center gap-1">
                       <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                       <span className="text-xs font-black text-slate-900">{v.rating}</span>
                    </div>
                 </div>
                 <div className="flex flex-col items-center border-x border-slate-50">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">On-Time</span>
                    <span className="text-xs font-black text-slate-900">{v.delivery}</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active POs</span>
                    <span className="text-xs font-black text-slate-900">{v.pos}</span>
                 </div>
              </div>

              <div className="flex items-center justify-between">
                 <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-tighter bg-slate-100 text-slate-600">
                   {v.cat}
                 </Badge>
                 <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-primary">
                    Full Profile
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                 </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
