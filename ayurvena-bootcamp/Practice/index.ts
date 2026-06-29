type BloodGroup=
"A+"|"A-"|"B+"|"B-"|"O+"|"O-"|"AB+"|"AB-";

type Gender=
"male"|"female"|"other";

enum AppointmentStatus{
  SCHEDULED="scheduled",
  COMPLETED="completed",
  CANCELLED="cancelled"
}

interface IPatient{
  id:number;
  name:string;
  age:number;
  phone:string;
  bloodGroup:BloodGroup;
  gender:Gender;
  isActive:boolean;
}

interface IAppointment{
  id:number;
  patientId:number;
  doctorId:number;
  date:string;
  status:AppointmentStatus;
}

type CreatePatientDto=Omit<
IPatient,
"id"|"isActive">;

type PatientPreview=Pick<
IPatient,
"id"|"name"|"bloodGroup">;

function getPatientName(
  patients:IPatient[],
  id:number
): string{
  const patient=patients.find(patient=>patient.id===id);
  return patient
  ?patient.name:"Unknown";
}

function filterByStatus(
  appointments:IAppointment[],
  status:AppointmentStatus
): IAppointment[]{
  return appointments.filter(
    appointment=>appointment.status===status
  );
}
 

const patients:IPatient[]=[
  {
    id:1,
    name:"manu",
    age:22,
    phone:"1234567890",
    bloodGroup:"O-",
    gender:"male",
    isActive:true
  },
  {
    id:2,
    name:"manu",
    age:22,
    phone:"1234567890",
    bloodGroup:"O-",
    gender:"male",
    isActive:true
  }
];
 const appointments:IAppointment[]=[
  {
    id:1,
    patientId:1,
    doctorId:101,
    date:"2026-06-13",
    status:AppointmentStatus.SCHEDULED
  },
  {
    id:2,
    patientId:2,
    doctorId:102,
    date:"2026-06-24",
    status:AppointmentStatus.COMPLETED
  }
 ];

 console.log(
  getPatientName(patients,
    1
  )
 );

 console.log(
  filterByStatus(
    appointments,
    AppointmentStatus.SCHEDULED
  )
 );