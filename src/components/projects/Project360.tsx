import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Project360 = () => (
  <Tabs defaultValue="overview">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="tasks">Tasks</TabsTrigger>
      <TabsTrigger value="team">Team</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">Overview content...</TabsContent>
  </Tabs>
);
