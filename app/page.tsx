// app/page.tsx
import Image from "next/image";

export default async function Home() {

   const nowInLA = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <main style={{ padding: "2rem" }}>
      <h1>My SSR Next.js App on Firebase</h1>

      <p>Current LA time (computed on the server):</p>
      <pre>{nowInLA}</pre>

      <p style={{ marginTop: "1.5rem", maxWidth: 480 }}>
        This page is rendered on the server (SSR) without any external network
        calls, so it won&apos;t break if an API is down or blocked by a
        firewall/VPN.
      </p>
    </main>

      <Image
        src="/images/AE-Front-Page-Photo.png"
        alt="Test Image"
        width={560}
        height={531}
      />

    </>
  
  );
}
