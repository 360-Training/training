import {WelcomeBanner} from "@/components/ui/welcome";

export default function Home(){
  return(
    <main>
      <WelcomeBanner
      hospitalName="Ayurvena Hospital"
      doctorCount={45}
      patientCount={350}
      />
    </main>
  );
}