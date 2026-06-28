type BloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "O+"
    | "O-"
    | "AB+"
    | "AB-";

export class Validator {

    static isPhone(
        phone: string
    ): boolean {

        return /^[6-9]\d{9}$/
            .test(phone);

    }

    static isEmail(
        email: string
    ): boolean {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }

    static isFutureDate(
        date: string
    ): boolean {

        return new Date(date) >
            new Date();

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

        ].includes(
            bg as BloodGroup
        );

    }

}