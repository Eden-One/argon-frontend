import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  School,
  GraduationCap,
  TrendingUp,
  Plus,
  FileText,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Building,
  UserPlus,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { etablissements, statsGlobales, statsPresenceMensuelle, parents, enseignants } from "@/data/mockData";

const AdminDashboard = () => {
  const { t } = useLanguage();

  const pendingUsers = [
    { id: "1", name: "Fatou Seck", email: "f.seck@email.com", role: "parent", date: "2024-01-15", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatouSeck" },
    { id: "2", name: "Oumar Ba", email: "o.ba@email.com", role: "parent", date: "2024-01-16", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=OumarBa" },
    { id: "3", name: "Aminata Diallo", email: "a.diallo@email.com", role: "enseignant", date: "2024-01-16", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=AminataDiallo" },
  ];

  const userDistribution = [
    { name: t("parents"), value: statsGlobales.totalParents, color: "hsl(var(--primary))" },
    { name: t("teachers"), value: statsGlobales.totalEnseignants, color: "hsl(var(--warning))" },
    { name: t("students"), value: statsGlobales.totalEleves, color: "hsl(var(--info))" },
  ];

  const recentActivity = [
    { action: "Nouvel établissement", detail: "École Sainte-Marie", time: "Il y a 1h", type: "create" },
    { action: "Utilisateur approuvé", detail: "Mme. Diallo", time: "Il y a 2h", type: "approve" },
    { action: "Rapport généré", detail: "Présences T1", time: "Il y a 3h", type: "report" },
    { action: "Paramètres modifiés", detail: "Notifications", time: "Il y a 5h", type: "settings" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "create": return <Building size={16} />;
      case "approve": return <CheckCircle size={16} />;
      case "report": return <FileText size={16} />;
      case "settings": return <Settings size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <PageHeader
        title={`${t("welcome")}, Fatou`}
        description={t("overview")}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title={t("students")}
          value={statsGlobales.totalEleves.toLocaleString()}
          icon={<GraduationCap size={20} />}
          trend={{ value: 12, isPositive: true }}
          variant="primary"
        />
        <StatsCard
          title={t("teachers")}
          value={statsGlobales.totalEnseignants}
          icon={<Users size={20} />}
          trend={{ value: 5, isPositive: true }}
          variant="warning"
        />
        <StatsCard
          title={t("parents")}
          value={statsGlobales.totalParents.toLocaleString()}
          icon={<Users size={20} />}
          variant="info"
        />
        <StatsCard
          title={t("attendanceRate")}
          value={`${statsGlobales.tauxPresence}%`}
          icon={<TrendingUp size={20} />}
          trend={{ value: 2.5, isPositive: true }}
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Attendance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="text-primary" size={20} />
              {t("attendanceRate")} - {t("thisMonth")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={statsPresenceMensuelle}>
                <defs>
                  <linearGradient id="colorTaux" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mois" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="taux"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorTaux)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t("users")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {userDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Establishments Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <School className="text-primary" size={20} />
              {t("establishments")}
            </CardTitle>
            <Button size="sm">
              <Plus size={16} className="mr-1" />
              {t("add")}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("title")}</TableHead>
                  <TableHead>{t("city")}</TableHead>
                  <TableHead>{t("students")}</TableHead>
                  <TableHead>{t("teachers")}</TableHead>
                  <TableHead>{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {etablissements.map((etab) => (
                  <TableRow key={etab.id}>
                    <TableCell className="font-medium">{etab.nom}</TableCell>
                    <TableCell>{etab.ville}, {etab.pays}</TableCell>
                    <TableCell>{etab.eleves}</TableCell>
                    <TableCell>{etab.enseignants}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        {t("view")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-warning" size={18} />
                {t("pendingApprovals")}
              </CardTitle>
              <Badge variant="warning">{pendingUsers.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.photo} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {user.role === "parent" ? t("parent") : t("teacher")}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon-sm" variant="success">
                        <CheckCircle size={14} />
                      </Button>
                      <Button size="icon-sm" variant="danger">
                        <XCircle size={14} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t("quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <UserPlus size={20} />
                <span className="text-xs">{t("addUser")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <Building size={20} />
                <span className="text-xs">{t("addEstablishment")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <FileText size={20} />
                <span className="text-xs">{t("generateReport")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <GraduationCap size={20} />
                <span className="text-xs">{t("manageClasses")}</span>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>{t("recentActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
