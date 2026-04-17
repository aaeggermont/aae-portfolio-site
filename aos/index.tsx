'use client'
import { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";

export function Aos() {
  useEffect(() => {
    AOS.init({
      duration: 1000
    });
    AOS.refresh();
  }, []);

  return <></>
}