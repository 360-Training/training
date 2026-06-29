interface Idoctor[
    {
    id:101,
    name:"srinu",
    specilazition:"dentist",
    fee:500,
    avaliableDays:"mon,tue,wed",
    slots:"9:00,11:00",
},
{
 id:102,
    name:"ram",
    specilazition:"genral",
    fee:300,
    avaliableDays:"mon,tue,fri",
    slots:"10:00,11:00",
}];
interface Islot{
    id:101,
    isavilable:"true"
}
interface IwaitlistEntry{
    id:102,
    isavilable:"false"
}

interface Idoctor{
    id:101,
    isavilable:"true"
}

doctors:
[
    {
        id:10,
        name:"ravi",
        specilazition:"cardilogist",
        isAvailable:"true",
        availableDays:"tue,wed",
    },
    {
        id:23,
        name:"arun",
        specilazation:"cardiogist",
        isAvailable:"true",
        availableDays:"mon,fri",
    },
    {
        id:25,
        name:"kiran",
        specilazation:"peditration",
        isAvailable:"true",
        availableDays:"sat",
    }

]


function getdoctorsByDay(a:doctors,b:availableDays):string{


}

