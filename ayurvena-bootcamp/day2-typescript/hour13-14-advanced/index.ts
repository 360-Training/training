type BloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "O+"
    | "O-"
    | "AB+"
    | "AB-";

type AppointmentStatus =
    | "scheduled"
    | "completed"
    | "cancelled"
    | "no-show";

enum Department {
    CARDIOLOGY = "cardiology",
    NEUROLOGY = "neurology",
    ORTHOPEDICS = "orthopedics",
    PEDIATRICS = "pediatrics",
    GENERAL = "general",
    EMERGENCY = "emergency",
    ICU = "icu"
}

interface IBaseEntity{
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Ipatient extends IBaseEntity{
  name: string;
  phone: string;
  bloodGroup: BloodGroup;
}

interface IDoctor extends IBaseEntity{
  name: string;
  specialization: string;
  department: Department;
  fee: number;
}

interface IAppointment extends IBaseEntity{
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  status: AppointmentStatus;
}



class BaseService<T extends IBaseEntity>{
  protected items: T[]=[];
create(
  data: Omit< T,"id"|"createdAt"|"updatedAt">
): T{
     const item = {
      ...data,
      id:this.items.length+1,
      createdAt: new Date(),
      updatedAt: new Date()
     } as T;
     this.items.push(item);
     return item;
}
findById(
  id:number
): T|undefined{
  return this.items.find(
    item=>item.id===id
  );
}
findAll(
  fliter?: Partial<T>
): T[] {
  if(!fliter){
    return this.items;
  }
  return this.items.filter(item=>
    Object.entries(fliter).every(
      ([Key,value])=>
        item[Key as keyof T]===value
    )
  );
}
update(
  id: number,
  data: Partial<T>
): T{
  const item=this.findById(id);
  if(!item){
    throw new Error("Item not found");
  }
  Object.assign(
    item,
    data,
    {
      updatedAt: new Date()
    }
  );
  return item;
}

    delete(
        id: number
    ): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(
            item => item.id !== id
        );
        return this.items.length < initialLength;
    }
}


class PatientService extends BaseService<IPatient>{

}

class DoctorService extends BaseService<IDoctor>{

}

class AppointmentService extends BaseService<IAppointment>{

}

class Hospital{
  patientService=new PatientService();
  doctorService=new DoctorService();
  appointmentService=new AppointmentService();
}
const hospital=new Hospital();
const patient=hospital.patientService.create({
  name:"ammu",
  phone: "1234567890",
  bloodGroup:"O+"
});
const doctor=hospital.doctorService.create({
  name: "Dr.harini",
  specialization:"cardiologist",
  department:Department.CARDIOLOGY,
  fee:500
});
const appointment=hospital.appointmentService.create({
  patientId: patient.id,
  doctorId:doctor.id,
  date:"2025-06-13",
  time:"09:00",
  status:"scheduled"
});

console.log("Patients");
console.log(
    hospital.patientService.findAll()
);

console.log("Doctors");
console.log(
    hospital.doctorService.findAll()
);

console.log("Appointments");
console.log(
    hospital.appointmentService.findAll()
);

class Validator{
  static isPhone(
    phone: string
  ): boolean{
    return /^[6-9]\d{9}$/.test(phone);
  }
  static isEmail(
    email:string
  ): boolean{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  static isFutureDate(
    date:string
  ): boolean{
    return new Date(date)>new Date(); 
  }
  static isBloodGroup(
    bg: string
): bg is BloodGroup {
    return [
        "A+",
        "A-",
        "B+",
        "B-",
        "O+",
        "O-",
        "AB+",
        "AB-"
    ].includes(bg as BloodGroup);
}
}
console.log(
    Validator.isPhone("9876543210")
);

console.log(
    Validator.isEmail("rahul@gmail.com")
);

console.log(
    Validator.isFutureDate("2030-01-01")
);

console.log(
    Validator.isBloodGroup("O+")
);

interface ValidationError{
  field:string;
  message:string;
}
type CreatePatientDto=Omit<
Ipatient,
"id"|"createdAt"|"updatedAt">;
function validateCreatePatient(
  data:unknown
): CreatePatientDto | ValidationError[] {
    const patient = data as CreatePatientDto;
    const errors: ValidationError[] = [];
    if (!patient.name) {
        errors.push({
            field: "name",
            message: "Name is required"
        });
    }
    if (!Validator.isPhone(patient.phone)) {
        errors.push({
            field: "phone",
            message: "Invalid phone number"
        });
    }
    if (!Validator.isBloodGroup(patient.bloodGroup)) {
        errors.push({
            field: "bloodGroup",
            message: "Invalid blood group"
        });
    }
    if (errors.length > 0) {
        return errors;
    }
    return patient;
}
const input:unknown={
  name:"Ram",
  phone:"1234567890",
  bloodGroup:"O+"
};
const result = validateCreatePatient(input);
if (Array.isArray(result)) {
    console.log("Validation Errors");
    console.log(result);
} else {
    const patient = hospital.patientService.create(result);
    console.log("Patient Created");
    console.log(patient);
}