export default function PatientsLayout({
  children,
}:{
  children:React.ReactNode;
}) {
  return(
    <div>
      <aside>
        <h3>Patient Menu</h3>
        <nav>
          <a href="/patients">All Patients</a>
          <br />
          <a href="/patients/admit">Admit Patient</a>
          <br />
          <a href="/patients/discharge">Discharge</a>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
