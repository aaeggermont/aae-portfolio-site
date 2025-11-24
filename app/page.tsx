// app/page.tsx
import Image from "next/image";

export default async function Home() {
  // This fetch will run on the server at request time (SSR)
  const res = await fetch('https://worldtimeapi.org/api/timezone/America/Los_Angeles', {
    cache: 'no-store',  // ensure no static caching; SSR per request
  });
  const data = await res.json();

  return (
    <>
      <main style={{ padding: '2rem' }}>
        <h1>My SSR Next.js App on Firebase</h1>
        <p>Current LA time (from server):</p>
        <pre>{data.datetime}</pre>
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
