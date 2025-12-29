import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  Check,
  X,
  Clock,
  Plus,
  FileText,
  Send,
  Image,
} from "lucide-react";
import { classes, eleves } from "@/data/mockData";
import { cn } from "@/lib/utils";

type AttendanceStatus = "present" | "absent" | "late" | "justified";

interface StudentAttendance {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  morning: AttendanceStatus;
  afternoon: AttendanceStatus;
  comment: string;
}

const TeacherDashboard = () => {
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState("6ème A");
  const [period, setPeriod] = useState<"morning" | "afternoon">("morning");
  
  const classStudents = eleves.filter((e) => e.classe === selectedClass);
  
  const [attendance, setAttendance] = useState<StudentAttendance[]>(
    classStudents.map((s) => ({
      id: s.id,
      nom: s.nom,
      prenom: s.prenom,
      photo: s.photo,
      morning: "present",
      afternoon: "present",
      comment: "",
    }))
  );

  const updateAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, [period]: status }
          : s
      )
    );
  };

  const markAllPresent = () => {
    setAttendance((prev) =>
      prev.map((s) => ({ ...s, [period]: "present" as AttendanceStatus }))
    );
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return "bg-success text-success-foreground";
      case "absent": return "bg-danger text-danger-foreground";
      case "late": return "bg-warning text-warning-foreground";
      case "justified": return "bg-info text-info-foreground";
    }
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return <Check size={14} />;
      case "absent": return <X size={14} />;
      case "late": return <Clock size={14} />;
      case "justified": return <FileText size={14} />;
    }
  };

  const presentCount = attendance.filter((s) => s[period] === "present").length;
  const absentCount = attendance.filter((s) => s[period] === "absent").length;

  return (
    <DashboardLayout userRole="enseignant">
      <PageHeader
        title={`${t("welcome")}, M. Diallo`}
        description={t("todayRollCall")}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title={t("studentsPresent")}
          value={`${presentCount}/${attendance.length}`}
          icon={<Users size={20} />}
          trend={{ value: 96, isPositive: true }}
          variant="primary"
        />
        <StatsCard
          title={t("homeworkAssigned")}
          value="8"
          icon={<BookOpen size={20} />}
          variant="warning"
        />
        <StatsCard
          title={t("pendingGrades")}
          value="12"
          icon={<ClipboardCheck size={20} />}
          variant="info"
        />
        <StatsCard
          title={t("unreadMessages")}
          value="3"
          icon={<MessageSquare size={20} />}
          variant="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roll Call Section */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="text-primary" size={20} />
              {t("todayRollCall")}
            </CardTitle>
            <div className="flex items-center gap-3">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder={t("selectClass")} />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.nom}>
                      {c.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={period === "morning" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("morning")}
                >
                  {t("morning")}
                </Button>
                <Button
                  variant={period === "afternoon" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("afternoon")}
                >
                  {t("afternoon")}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-success" />
                  {t("present")}: {presentCount}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-danger" />
                  {t("absent")}: {absentCount}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={markAllPresent}>
                <Check size={16} className="mr-1" />
                {t("markAllPresent")}
              </Button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {attendance.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={student.photo} />
                      <AvatarFallback>{student.prenom[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.prenom} {student.nom}</p>
                      <p className="text-sm text-muted-foreground">{selectedClass}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(["present", "absent", "late", "justified"] as AttendanceStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => updateAttendance(student.id, status)}
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            student[period] === status
                              ? getStatusColor(status)
                              : "bg-background border hover:bg-muted"
                          )}
                          title={t(status)}
                        >
                          {getStatusIcon(status)}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <Button className="w-full" size="lg">
                <Check size={18} className="mr-2" />
                {t("validateRollCall")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <Plus size={20} />
                <span className="text-xs">{t("createHomework")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <ClipboardCheck size={20} />
                <span className="text-xs">{t("enterGrades")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <Send size={20} />
                <span className="text-xs">{t("sendMessage")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 gap-2">
                <Image size={20} />
                <span className="text-xs">{t("publishContent")}</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("recentActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Devoir créé", detail: "Mathématiques - 6ème A", time: "Il y a 2h", icon: <BookOpen size={16} /> },
                  { action: "Note ajoutée", detail: "Ibrahim Koné - 15/20", time: "Il y a 3h", icon: <ClipboardCheck size={16} /> },
                  { action: "Message reçu", detail: "M. Diop (parent)", time: "Il y a 5h", icon: <MessageSquare size={16} /> },
                ].map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {activity.icon}
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

          <Card>
            <CardHeader>
              <CardTitle>{t("myClasses")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["6ème A", "5ème A"].map((classe) => (
                  <div
                    key={classe}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{classe}</p>
                        <p className="text-sm text-muted-foreground">32 {t("students").toLowerCase()}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {classe === selectedClass ? t("active") : ""}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
