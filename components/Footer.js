
import React from 'react'
import Link from 'next/link';
import styles from "@/styles/Color.module.css";
import {FaRegCircleRight } from "react-icons/fa6";
const FooterOne= () => {
  return (
    <footer className={`w-full text-white ${styles.customcolor}`}>
      
      <hr className="mb-4" />
      <div className="mx-auto max-w-6xl items-center justify-between px-4 md:flex lg:px-0">
        <div className="inline-flex items-center">
       <Link href='/'> <span className={`font-bold ${styles.gradi}`}>TradeMate</span></Link>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-white">© 2024 TradeMate. All rights reserved.</p>
        </div>
      </div>
      <hr className="mt-4" />
    </footer>
  )
}
export default FooterOne