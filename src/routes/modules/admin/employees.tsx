import { createFileRoute } from "@tanstack/react-router";
import { EmployeeDirectory } from "@/components/admin-studio/EmployeeDirectory";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { EmployeeModal } from "@/components/admin-studio/EmployeeModal";

export const Route = createFileRoute("/modules/admin/employees")({
  component: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <PageHeader
            title="People & Directory"
            description="Manage employee profiles, access levels, and organizational structure."
          />
          <Button onClick={() => setIsModalOpen(true)} className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary">
            <UserPlus className="size-4" /> Add Employee
          </Button>
        </div>
        <EmployeeDirectory />
        <EmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  },
});
