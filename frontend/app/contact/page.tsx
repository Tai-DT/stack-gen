interface Contact {
  email: string;
  phone: string;
  address: string;
}

export default async function ContactPage() {
  const res = await fetch("http://localhost:8080/api/contact", { cache: "no-store" });
  const contact: Contact = await res.json();
  return (
    <div>
      <h1>Contact</h1>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Address: {contact.address}</p>
    </div>
  );
}
