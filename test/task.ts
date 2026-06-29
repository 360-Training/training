
//union types
type Doctor_Unavailable = {
    type:"unavailable";
    doctorid:number;
    reason:string;

};
type slot_Unavailable = {
    type:"unavailable";
    time:string;
    suggestedslot:string[];

};
type paymentfailed={
    type:"paymentfail";
    reason:string;
};
type invalidtime ={
    type:"invalidtime";
    time:string;
    reason:string;
}
type bookconfirm={
    type:"confirm";
    appointmedid:number;
    doctor:string;
    fee:number
}
type bookresult={
    doctorunavailable:doctor_unavailable;
    slot_Unavailable:slot_unavailable;
    paymentfailed:paymentfailed;
    invalidtime:invalidtime;
    bookconfirm:bookconfirm;

}
