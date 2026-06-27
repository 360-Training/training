interface IPatient {
    id: number;
    name: string;
    age: number;
    gender: string;
    bloodGroup: string;
    phone: string;
    createdAt: Date;
    isActive: boolean;
}

interface IDoctor {
    id: number;
    name: string;
    specialization: string;
}

interface IPayment {
    id: number;
    amount: number;
    status: "pending" | "paid" | "failed";
}

interface IAppointment {
    id: number;
    patientId: number;
    doctorId: number;
    date: string;
    time:string;
    status:"scheduled" | "completed";
    payment: IPayment;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    statusCode: number;
}

interface ApiError {
    success: false;
    error: string;
    message: string;
    statusCode:number;
}

interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages:number;
    };
}

function successResponse<T>(
    data: T,
    message: string ="Success"
): ApiResponse<T> {
    return {
        success: true,
        data,
        message,
        statusCode: 200,
    };
}

function errorResponse(
    statusCode: number,
    message: string,
): ApiError {
    return{
        success: false,
        error: "Error",
        message,
        statusCode,
    };
}

function paginatedResponse<T>(
    data: T[],
    page:  number,
    limit: number,
    total: number
): PaginatedResponse<T> {
    return {
        success: true,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total/limit),
        },
    };
}

type CreatePatientDto = Omit<
  IPatient,
  "id" | "createdAt" | "isActive"
  >;

  type UpdatePatientDto = Partial<CreatePatientDto>;

  type PatientPreview = Pick<
  IPatient,
   "id" | "name" | "bloodGroup" | "phone"
   >;

   type CreateAppointmentDto= Omit<
   IAppointment,
   "id" | "status" | "payment"
   >;

   type DoctorWithAppointment =IDoctor & {
    appointments: IAppointment[];
   };

   let patients: IPatient[] =[
    {
        id: 1,
        name: "Rahul",
        age: 25,
        gender: "Male",
        bloodGroup: "A+",
        phone: "9876543210",
        createdAt: new Date(),
        isActive: true,
    },
    {
        id: 2,
        name: "priya",
        age: 22,
        gender: "Female",
        bloodGroup: "B+",
        phone: "9876501234",
        createdAt: new Date(),
        isActive: true,
    },
   ];

   const doctors: IDoctor[]= [
    {
        id: 1,
        name: "Dr.kumar",
        specialization: "cardiology",
    },
   ];

   let appointments: IAppointment[]= [];

   function getPatients(
    page: number,
    limit: number,
   ): PaginatedResponse<PatientPreview> {

    const start =(page -1) *limit;

    const data = patients
     .slice(start,start + limit)
     .map(patient => ({
        id: patient.id,
        name: patient.name,
        bloodGroup: patient.bloodGroup,
        phone: patient.phone
    }));
        return paginatedResponse(data, page, limit, patients.length);
   }

   function getPatientById(id: number): ApiResponse<IPatient> {

    const patient= patients.find(p => p.id === id);

    if(!patient) {
        throw new Error("Patient not found");
    }
      return successResponse(patient, "Patient Found");
   }

function  createPatient(
  data: CreatePatientDto
): ApiResponse<IPatient> {

  const newPatient: IPatient = {
    id: patients.length + 1,
    createdAt: new Date(),
    isActive: true,
    ...data
  };

  patients.push(newPatient);

  return successResponse(newPatient, "Patient Created");
}

function updatePatient(
  id: number,
  data: UpdatePatientDto
): ApiResponse<IPatient> {

  const patient = patients.find(p => p.id === id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  Object.assign(patient, data);

  return successResponse(patient, "Patient Updated");
}

function deletePatient(
  id: number
): ApiResponse<{ deleted: boolean }> {

  patients = patients.filter(p => p.id !== id);

  return successResponse(
    { deleted: true },
    "Patient Deleted"
  );
}

interface BookingSuccess {
  type: "success";
  appointment: IAppointment;
  payment: IPayment;
  receipt: string;
}

interface BookingSlotUnavailable {
  type: "slot_unavailable";
  doctor: string;
  suggestedSlots: string[];
}

interface BookingPaymentFailed {
  type: "payment_failed";
  appointment: IAppointment;
  error: string;
  retryable: boolean;
}

interface BookingValidationError {
  type: "validation_error";
  errors: {
    field: string;
    message: string;
  }[];
}

type BookingResult =
  | BookingSuccess
  | BookingSlotUnavailable
  | BookingPaymentFailed
  | BookingValidationError;

async function bookAppointmentFlow(
  data: CreateAppointmentDto
): Promise<BookingResult> {

  const errors: { field: string; message: string }[] = [];

  if (!data.patientId) {
    errors.push({
      field: "patientId",
      message: "Patient is required"
    });
  }

  if (!data.doctorId) {
    errors.push({
      field: "doctorId",
      message: "Doctor is required"
    });
  }

  if (!data.time) {
    errors.push({
      field: "time",
      message: "Time is required"
    });
  }

  if (errors.length > 0) {
    return {
      type: "validation_error",
      errors
    };
  }

  if (data.time === "09:00") {
    return {
      type: "slot_unavailable",
      doctor: "Dr. Kumar",
      suggestedSlots: [
        "10:00",
        "10:30",
        "11:00"
      ]
    };
  }

  const payment: IPayment = {
    id: 1,
    amount: 500,
    status:
      data.time === "12:00"
        ? "failed"
        : "paid"
  };

  const appointment: IAppointment = {
    id: appointments.length + 1,
    patientId: data.patientId,
    doctorId: data.doctorId,
    date: data.date,
    time: data.time,
    status: "scheduled",
    payment
  };

  appointments.push(appointment);

  if (payment.status === "failed") {
    return {
      type: "payment_failed",
      appointment,
      error: "Payment Failed",
      retryable: true
    };
  }

  return {
    type: "success",
    appointment,
    payment,
    receipt: `Receipt-${appointment.id}`
  };
}

function handleBookingResult(result: BookingResult): string {

    switch (result.type) {

        case "success":
            return `Booking confirmed! Appointment #${result.appointment.id} with Dr. Kumar at ${result.appointment.time}`;

        case "slot_unavailable":
            return `Slot taken. Try: ${result.suggestedSlots.join(", ")}`;

        case "payment_failed":

            if (result.retryable) {
                return "Payment failed. Retrying...";
            }

            return "Contact support.";

        case "validation_error":
            return "Fix these: " +
                result.errors
                    .map(error => `${error.field} ${error.message}`)
                    .join(", ");

        default:

            const check: never = result;
            return check;
    }
}

console.log(getPatients(1, 2));
console.log(getPatientById(1));

const newPatient = createPatient({
    name: "Anjali",
    age: 24,
    gender: "Female",
    bloodGroup: "O+",
    phone: "9999999999"
});
console.log(newPatient);
console.log(
    updatePatient(1, {
        phone: "8888888888"
    })
);
console.log("\n----- DELETE PATIENT -----");
console.log(deletePatient(2));

async function testBooking() {

    const success = await bookAppointmentFlow({
        patientId: 1,
        doctorId: 1,
        date: "2026-06-30",
        time: "10:00"
    });

    console.log(handleBookingResult(success));

    const slot = await bookAppointmentFlow({
        patientId: 1,
        doctorId: 1,
        date: "2026-06-30",
        time: "09:00"
    });

    console.log(handleBookingResult(slot));

    const payment = await bookAppointmentFlow({
        patientId: 1,
        doctorId: 1,
        date: "2026-06-30",
        time: "12:00"
    });

    console.log(handleBookingResult(payment));

    const validation = await bookAppointmentFlow({
        patientId: 0,
        doctorId: 0,
        date: "",
        time: ""
    });
    console.log(handleBookingResult(validation));
}
testBooking();
