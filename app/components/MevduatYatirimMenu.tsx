'use client';

import React from 'react';
import Link from 'next/link';
import { PiggyBank, TrendingUp, Landmark } from 'lucide-react';

interface MevduatYatirimMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function MevduatYatirimMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: MevduatYatirimMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 right-0 top-[64px] bg-white shadow-md border-t border-gray-200 z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/varliklar/mevduat" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Landmark size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Mevduat</h3>
                  <p className="mt-1 text-xs text-gray-500">En yüksek mevduat faiz oranlarını karşılaştırın ve paranızı değerlendirin.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/varliklar/yatirim-fonlari" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <TrendingUp size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Yatırım Fonları</h3>
                  <p className="mt-1 text-xs text-gray-500">Çeşitli yatırım fonlarını karşılaştırın, portföyünüzü çeşitlendirin.</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/varliklar" className="block group">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <PiggyBank size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">Tüm Varlıklar</h3>
                  <p className="mt-1 text-xs text-gray-500">Döviz, altın, hisse senedi ve diğer tüm varlıkları görüntüleyin.</p>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

