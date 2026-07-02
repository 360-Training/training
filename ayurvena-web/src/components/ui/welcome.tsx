interface Welcomeprops{
  hospitalName: string;
  doctorCount: number;
  patientCount: number;
}
export function WelcomeBanner({
  hospitalName,
  doctorCount,
  patientCount,
}:Welcomeprops){
  return(
    <div>
      <h1>welcome to{hospitalName}</h1>
      <p>Doctors:{doctorCount}|Patients:{patientCount}</p>
    </div>
  );
}
