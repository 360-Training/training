import { WelcomeBanner } from "@/components/ui/welcome";
import { PatientCounter } from "@/components/patient/patient-counter";

export default function Home() {
  return (
    <main>
      <WelcomeBanner
        hospitalName="Ayurvena Hospital"
        doctorCount={45}
        patientCount={350}
      />

      <PatientCounter department="Cardiology" />
    </main>
  );
}