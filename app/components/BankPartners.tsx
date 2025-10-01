"use client";

import React from 'react';
import Image from 'next/image';

interface BankInfo {
  name: string;
  logoSrc: string;
  color: string;
}

const banks: BankInfo[] = [
  // İlk satır
  { name: 'Akbank', logoSrc: '/images/banks/akbank.svg', color: '#e11837' },
  { name: 'Albaraka', logoSrc: '/images/banks/albaraka.svg', color: '#a51d36' },
  { name: 'Alternatif Bank', logoSrc: '/images/banks/alternatifbank.svg', color: '#002d62' },
  { name: 'Anadolubank', logoSrc: '/images/banks/anadolubank.svg', color: '#004990' },
  { name: 'Cepteteb', logoSrc: '/images/banks/cepteteb.svg', color: '#6a1685' },
  { name: 'DenizBank', logoSrc: '/images/banks/denizbank.svg', color: '#009cde' },
  { name: 'Dünya Katılım', logoSrc: '/images/banks/dunya.svg', color: '#00704a' },
  { name: 'Enpara', logoSrc: '/images/banks/enpaa.svg', color: '#ff6600' },
  
  // İkinci satır
  { name: 'Fibabanka', logoSrc: '/images/banks/fiba.svg', color: '#640032' },
  { name: 'Garanti BBVA', logoSrc: '/images/banks/garanti.svg', color: '#009640' },
  { name: 'Getir Finans', logoSrc: '/images/banks/getir.svg', color: '#5d3ebc' },
  { name: 'Halkbank', logoSrc: '/images/banks/halkbank.svg', color: '#004b8d' },
  { name: 'HSBC', logoSrc: '/images/banks/hsbc.svg', color: '#db0011' },
  { name: 'ING', logoSrc: '/images/banks/ing.svg', color: '#ff6200' },
  { name: 'İş Bankası', logoSrc: '/images/banks/is.svg', color: '#0092d1' },
  { name: 'Kuveyt Türk', logoSrc: '/images/banks/kuveyt.svg', color: '#00a0df' },
  
  // Üçüncü satır
  { name: 'N Kolay', logoSrc: '/images/banks/nkolay.svg', color: '#ec008c' },
  { name: 'Odea Bank', logoSrc: '/images/banks/odea.svg', color: '#c41230' },
  { name: 'ON Finansman', logoSrc: '/images/banks/on.svg', color: '#00b1b0' },
  { name: 'TEB', logoSrc: '/images/banks/teb.svg', color: '#8cc63f' },
  { name: 'Türkiye Finans', logoSrc: '/images/banks/turkiye.svg', color: '#86bc25' },
  { name: 'Vakıf Katılım', logoSrc: '/images/banks/vakif.svg', color: '#00a651' },
  { name: 'Yapı Kredi', logoSrc: '/images/banks/yapikredi.svg', color: '#004999' },
  { name: 'QNB', logoSrc: '/images/banks/qnb.svg', color: '#7d0063' },
  
  // Dördüncü satır
  { name: 'Ziraat Bankası', logoSrc: '/images/banks/ziraat.svg', color: '#e30613' },
  { name: 'Ziraat Katılım', logoSrc: '/images/banks/ziraatkatilim.svg', color: '#00a651' },
];

export default function BankPartners() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">İş Ortaklarımız</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
        {banks.map((bank, index) => (
          <div key={index} className="flex items-center justify-center border border-gray-100 rounded-md p-2 h-16">
            <div 
              className="flex items-center justify-center w-full h-full rounded-md group relative"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src={bank.logoSrc}
                  alt={`${bank.name} logo`}
                  width={80}
                  height={30}
                  style={{ objectFit: 'contain' }}
                  className="max-w-full max-h-full"
                />
                {/* Animated bottom bar */}
                <span
                  className="absolute left-0 bottom-0 h-1 w-0 rounded transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: bank.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
