'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  logo_url?: string;
  link_url: string;
}

export default function SpecialCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch('/api/campaigns');
        if (!response.ok) {
          throw new Error('Kampanya verileri alınamadı');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        console.error('Kampanyalar yüklenirken hata oluştu:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">Sana özel banka ve kredi kampanyaları</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Link 
            key={campaign.id} 
            href={campaign.link_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img 
                src={campaign.image_url} 
                alt={campaign.title} 
                className="w-full h-48 object-cover"
              />
              {campaign.logo_url && (
                <div className="absolute bottom-3 right-3">
                  <img 
                    src={campaign.logo_url} 
                    alt={`${campaign.title} logo`} 
                    className="h-10 w-auto object-contain bg-white rounded-full p-1 shadow"
                  />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{campaign.title}</h3>
              {campaign.description && (
                <p className="text-gray-600 text-sm">{campaign.description}</p>
              )}
              <div className="mt-3 flex justify-end">
                <span className="text-blue-600 text-sm font-medium">Hemen başvur</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
