'use client';
import { useEffect, useState, useRef } from 'react';

interface MastheadItem {
  id: string;
  type: 'image' | 'code';
  title?: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  html_code?: string;
  is_active: boolean;
}

export default function Masthead() {
  const [masthead, setMasthead] = useState<MastheadItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState<number>(50); // Varsayılan yükseklik
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Masthead verilerini getir
  useEffect(() => {
    async function fetchMasthead() {
      try {
        // Tam URL kullanıyoruz
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/masthead`);
        if (!response.ok) {
          throw new Error('Masthead verileri alınamadı');
        }
        
        const data = await response.json();
        console.log('Masthead verileri:', data);
        
        // Sadece aktif olan masthead'i göster
        const activeMasthead = Array.isArray(data) ? data.find((item: MastheadItem) => item.is_active) : null;
        setMasthead(activeMasthead || null);
        
        // Eğer aktif bir masthead varsa gösterim sayısını artır
        if (activeMasthead) {
          // Gösterim sayısını artırmak için API'ye istek gönder
          // Sayfa yüklendiğinde bir kez çağrılır
          setTimeout(() => {
            recordImpression(activeMasthead.id);
          }, 1000); // Sayfanın yüklenmesi için kısa bir süre bekle
        }
      } catch (error) {
        console.error('Masthead yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMasthead();
  }, []);
  
  // Gösterim sayısını artır
  const recordImpression = async (id: string) => {
    if (!id) {
      console.error('Gösterim kaydı için geçerli bir ID gerekli');
      return;
    }
    
    console.log(`Gösterim kaydediliyor - ID: ${id}`);
    
    try {
      // Tam URL kullanıyoruz
      const baseUrl = window.location.origin;
      const response = await fetch(`${baseUrl}/api/masthead/stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, type: 'impression' }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`Gösterim kaydı başarısız oldu: ${result.error || response.statusText}`);
      }
      
      console.log('Masthead gösterim sayısı artırıldı:', result);
    } catch (error) {
      console.error('Gösterim kaydı sırasında hata:', error);
    }
  };
  
  // Doğrudan API'yi test etmek için yardımcı fonksiyon
  const testDirectApiCall = async (id: string, type: string) => {
    try {
      console.log('%c DOĞRUDAN API TESTİ BAŞLATILIYOR...', 'background: #ff00ff; color: white; font-size: 18px');
      
      const baseUrl = window.location.origin;
      const apiUrl = `${baseUrl}/api/masthead/stats`;
      const requestData = { id, type };
      
      console.log('Test API URL:', apiUrl);
      console.log('Test veri:', requestData);
      
      // XMLHttpRequest kullanarak alternatif bir yöntem deneyelim
      const xhr = new XMLHttpRequest();
      xhr.open('POST', apiUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onreadystatechange = function() {
        console.log('XHR durum değişikliği:', { readyState: xhr.readyState, status: xhr.status });
        
        if (xhr.readyState === 4) {
          console.log('XHR yanıtı:', { status: xhr.status, response: xhr.responseText });
          
          if (xhr.status === 200) {
            try {
              const result = JSON.parse(xhr.responseText);
              console.log('%c XHR BAŞARILI:', 'background: #00ff00; color: black; font-size: 16px', result);
            } catch (e) {
              console.error('XHR JSON parse hatası:', e);
            }
          } else {
            console.error('XHR hatası:', xhr.status, xhr.statusText);
          }
        }
      };
      
      xhr.onerror = function(e) {
        console.error('XHR bağlantı hatası:', e);
      };
      
      xhr.send(JSON.stringify(requestData));
      
      // Ayrıca fetch ile de deneyelim
      console.log('Fetch ile deneniyor...');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        cache: 'no-store'
      });
      
      const responseText = await response.text();
      console.log('Fetch yanıtı (ham):', responseText);
      
      try {
        const result = JSON.parse(responseText);
        console.log('%c FETCH BAŞARILI:', 'background: #00ff00; color: black; font-size: 16px', result);
        return result;
      } catch (e) {
        console.error('Fetch JSON parse hatası:', e);
        return { error: 'JSON parse hatası', rawResponse: responseText };
      }
    } catch (error) {
      console.error('%c DOĞRUDAN API TESTİ HATASI:', 'background: #ff0000; color: white; font-size: 16px', error);
      return null;
    }
  };
  
  // Tıklama sayısını artır - YENİ VERSİYON
  const recordClick = async (id: string) => {
    if (!id) {
      console.error('Tıklama kaydı için geçerli bir ID gerekli');
      return;
    }
    
    console.log(`%c Tıklama kaydediliyor - ID: ${id}`, 'background: #ff0000; color: white; font-size: 16px');
    
    try {
      // Tam URL kullanıyoruz
      const baseUrl = window.location.origin;
      
      // YENİ API ENDPOINT'i kullan
      const apiUrl = `${baseUrl}/api/masthead/stats/direct-update`;
      const requestData = { id, type: 'click' };
      
      console.log('%c YENİ API isteği gönderiliyor:', 'background: #ff9900; color: black; font-size: 14px', { url: apiUrl, data: requestData });
      
      // Önce doğrudan konsola yazdır
      console.log('YENİ TIKLAMAYI TEST EDİYORUM - FETCH ÖNCESİ');
      
      // API isteğini gönder
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        // Cache'leme sorunlarını önlemek için
        cache: 'no-store'
      });
      
      console.log('YENİ TIKLAMAYI TEST EDİYORUM - FETCH SONRASI');
      
      // Response'u text olarak al
      const responseText = await response.text();
      console.log('YENİ Ham yanıt:', responseText);
      
      // JSON'a çevir
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('YENİ JSON parse hatası:', e);
        result = { error: 'JSON parse hatası', rawResponse: responseText };
      }
      
      console.log('%c YENİ API yanıtı alındı:', 'background: #00ff00; color: black; font-size: 14px', { 
        status: response.status, 
        ok: response.ok,
        statusText: response.statusText,
        result 
      });
      
      if (!response.ok) {
        throw new Error(`YENİ Tıklama kaydı başarısız oldu: ${result.error || response.statusText}`);
      }
      
      console.log('%c YENİ Masthead tıklama sayısı artırıldı:', 'background: #0000ff; color: white; font-size: 14px', result);
      
      // Eski API'yi de deneyelim (karşılaştırma için)
      try {
        console.log('ESKİ API ile de deneniyor...');
        const oldApiUrl = `${baseUrl}/api/masthead/stats`;
        const oldResponse = await fetch(oldApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
          cache: 'no-store'
        });
        
        const oldResult = await oldResponse.json();
        console.log('ESKİ API yanıtı:', oldResult);
      } catch (oldError) {
        console.error('ESKİ API hatası:', oldError);
      }
      
      // Başarılı işlem sonrası kullanıcıya bilgi ver
      return result;
    } catch (error) {
      console.error('%c Tıklama kaydı sırasında hata:', 'background: #ff0000; color: white; font-size: 14px', error);
      
      // Hata durumunda alternatif yöntem olarak doğrudan API testi yap
      console.log('Hata durumunda doğrudan API testi yapılıyor...');
      const testResult = await testDirectApiCall(id, 'click');
      console.log('Doğrudan API testi sonucu:', testResult);
      
      return null;
    }
  };

  // HTML kodu için iframe'i hazırla
  useEffect(() => {
    if (!iframeRef.current) {
      console.log('iframe referansı bulunamadı');
      return;
    }
    
    if (!masthead) {
      console.log('Masthead verisi bulunamadı');
      return;
    }
    
    if (masthead.type !== 'code') {
      console.log('Masthead tipi kod değil, iframe yüklenmeyecek');
      return;
    }
    
    if (!masthead.html_code) {
      console.log('HTML kodu bulunamadı');
      return;
    }
    
    try {
      console.log('iframe içeriği yükleniyor...');
      
      // iframe'in contentDocument'ine eriş
      const iframeDoc = iframeRef.current.contentDocument || 
                       (iframeRef.current.contentWindow && iframeRef.current.contentWindow.document);
      
      if (!iframeDoc) {
        console.error('iframe document erişilemedi');
        return;
      }
      
      // HTML yüksekliğini belirle
      let extractedHeight = 250; // Varsayılan yükseklik
      
      // HTML kodundan yükseklik değerini çıkar
      const heightMatch = masthead.html_code.match(/height=["']?(\d+)["']?/i);
      if (heightMatch && heightMatch[1]) {
        extractedHeight = parseInt(heightMatch[1], 10);
        console.log(`HTML kodundan çıkarılan yükseklik: ${extractedHeight}px`);
      }
      
      // Tam bir HTML sayfası oluştur
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              width: 100%;
              height: ${extractedHeight}px;
            }
            .ad-container {
              width: 100%;
              height: ${extractedHeight}px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              cursor: pointer;
            }
            /* Adform reklamları için iframe'leri yakala */
            iframe {
              z-index: 1;
            }
            /* Tıklama katmanını kaldırıyoruz */
            .ad-container::after {
              content: none;
            }
          </style>
          <script>
            // GDPR değişkenlerini tanımla
            window.gdpr = '0';
            window.gdpr_consent_50 = '';
            
            // Mesaj gönderme mekanizması - iframe yüksekliğini parent'a bildir
            window.addEventListener('load', function() {
              try {
                // Reklam yüklendiğinde parent'a mesaj gönder
                window.parent.postMessage({ type: 'adLoaded', height: ${extractedHeight} }, '*');
                
                // Reklam içeriğinin yüksekliğini kontrol et ve parent'a bildir
                setTimeout(function() {
                  const bodyHeight = document.body.scrollHeight;
                  window.parent.postMessage({ type: 'resize', height: bodyHeight }, '*');
                }, 1000);
                
                // Adform için özel işleme - iframe'leri bul ve izle
                setTimeout(function() {
                  // Adform iframe'lerini bul
                  var adformIframes = document.querySelectorAll('iframe');
                  console.log('Bulunan iframe sayısı:', adformIframes.length);
                  
                  // Tüm iframe'leri izle
                  for (var i = 0; i < adformIframes.length; i++) {
                    try {
                      console.log('iframe izleniyor:', i);
                      // iframe'in src'sini kontrol et
                      var iframeSrc = adformIframes[i].src || '';
                      console.log('iframe src:', iframeSrc);
                      
                      // iframe'e tıklama olayı ekle
                      adformIframes[i].addEventListener('click', function(e) {
                        console.log('iframe tıklandı');
                        // Reklamın URL'sini parent'a gönder
                        window.parent.postMessage({ 
                          type: 'adClick',
                          url: '${masthead.link_url || ""}'
                        }, '*');
                      });
                    } catch (err) {
                      console.error('iframe izleme hatası:', err);
                    }
                  }
                }, 2000); // iframe'lerin yüklenmesi için biraz bekle
                
                // Tıklama olayını yakala ve parent'a bildir
                var container = document.querySelector('.ad-container');
                if (container) {
                  container.addEventListener('click', function(e) {
                    console.log('Reklam container tıklandı');
                    // Reklamın URL'sini parent'a gönder
                    window.parent.postMessage({ 
                      type: 'adClick',
                      url: '${masthead.link_url || ""}'
                    }, '*');
                  });
                }
                
                // Ayrıca tüm linklere tıklama olayı ekle
                var links = document.querySelectorAll('a');
                console.log('Bulunan link sayısı:', links.length);
                for (var i = 0; i < links.length; i++) {
                  links[i].addEventListener('click', function(e) {
                    console.log('Link tıklandı:', this.href);
                    // Orijinal link hedefini al
                    var linkUrl = this.getAttribute('href') || '${masthead.link_url || ""}';
                    // Tıklama olayını ve URL'yi parent'a gönder
                    window.parent.postMessage({ 
                      type: 'adClick',
                      url: linkUrl
                    }, '*');
                  });
                }
                
                // Adform script'i için özel işleme
                if (window.adf && window.adf.ClickTrack) {
                  console.log('Adform ClickTrack bulundu, izleniyor');
                  var originalClickTrack = window.adf.ClickTrack;
                  window.adf.ClickTrack = function(e) {
                    console.log('Adform ClickTrack çağrıldı:', e);
                    // Orijinal fonksiyonu çağır
                    originalClickTrack.apply(this, arguments);
                    // Parent'a bildir
                    window.parent.postMessage({ 
                      type: 'adClick',
                      url: '${masthead.link_url || ""}'
                    }, '*');
                  };
                }
              } catch (err) {
                console.error('iframe içi script hatası:', err);
              }
            });
          </script>
        </head>
        <body>
          <div class="ad-container">
            ${masthead.html_code}
          </div>
        </body>
        </html>
      `;
      
      // iframe içeriğini ayarla
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
      
      // Başlangıç yüksekliğini ayarla
      setIframeHeight(extractedHeight);
      console.log('iframe içeriği başarıyla yüklendi');
    } catch (error) {
      console.error('iframe içeriği ayarlanırken hata:', error);
    }
  }, [masthead]);
  
  // iframe'den gelen mesajları dinle
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      console.log('%c Mesaj alındı:', 'background: #9900cc; color: white; font-size: 14px', event.data);
      
      if (event.data && event.data.type === 'resize' && event.data.height) {
        console.log(`iframe'den gelen yükseklik: ${event.data.height}px`);
        setIframeHeight(event.data.height);
      }
      
      if (event.data && event.data.type === 'adLoaded' && event.data.height) {
        console.log(`Reklam yüklendi, yükseklik: ${event.data.height}px`);
        setIframeHeight(event.data.height);
      }
      
      // iframe'den gelen tıklama mesajını dinle
      if (event.data && event.data.type === 'adClick') {
        console.log('%c TIKLAMA MESAJI ALINDI!', 'background: #ff0000; color: white; font-size: 18px', event.data);
        
        if (masthead) {
          // Tıklama sayısını artır - önce bunu çağır
          console.log('%c recordClick fonksiyonu çağrılıyor...', 'background: #ff9900; color: black; font-size: 16px');
          recordClick(masthead.id);
          console.log('%c Kod reklamına tıklandı, ID:', 'background: #ff9900; color: black; font-size: 16px', masthead.id);
          
          // URL varsa yeni sekmede aç
          if (event.data.url) {
            console.log('%c Reklam URL\'sine yönlendiriliyor:', 'background: #00ff00; color: black; font-size: 14px', event.data.url);
            window.open(event.data.url, '_blank');
          } else if (masthead.link_url) {
            console.log('%c Masthead link URL\'sine yönlendiriliyor:', 'background: #00ff00; color: black; font-size: 14px', masthead.link_url);
            window.open(masthead.link_url, '_blank');
          }
        } else {
          console.error('%c Masthead verisi bulunamadı!', 'background: #ff0000; color: white; font-size: 16px');
        }
      }
    }
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [masthead]);  // masthead değiştiğinde yeniden bağlan

  // Eğer yükleniyor veya masthead yoksa hiçbir şey gösterme
  if (loading || !masthead) {
    return null;
  }

  // Masthead tipine göre render et
  if (masthead.type === 'code') {
    return (
      <div className="w-full bg-white">
        <iframe 
          ref={iframeRef}
          className="w-full border-0"
          style={{ height: `${iframeHeight}px`, overflow: 'hidden' }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-popups-to-escape-sandbox"
          allow="autoplay; camera; microphone; payment"
        />
      </div>
    );
  }

  // Eğer tip "image" ise resmi göster
  return (
    <div className="w-full bg-white">
      <div 
        className="block w-full cursor-pointer"
        onClick={() => {
          console.log('%c RESİM REKLAMINA TIKLANDI!', 'background: #ff0000; color: white; font-size: 18px');
          
          // Önce tıklama sayısını artır - bu fonksiyonu mutlaka çağır
          console.log('%c recordClick fonksiyonu çağrılıyor...', 'background: #ff9900; color: black; font-size: 16px');
          const result = recordClick(masthead.id);
          console.log('%c Resim reklamına tıklandı, ID:', 'background: #ff9900; color: black; font-size: 16px', masthead.id);
          console.log('recordClick sonuç:', result);
          
          // Sonra reklam linkine yönlendir
          if (masthead.link_url) {
            console.log('%c Reklam URL\'sine yönlendiriliyor:', 'background: #00ff00; color: black; font-size: 14px', masthead.link_url);
            // Yeni sekmede aç
            window.open(masthead.link_url, '_blank');
          } else {
            console.error('%c Reklam URL\'si bulunamadı!', 'background: #ff0000; color: white; font-size: 16px');
          }
        }}
      >
        <div className="relative">
          <img 
            src={masthead.image_url} 
            alt={masthead.title || 'Reklam'} 
            className="w-full h-auto object-contain mx-auto"
          />
          {(masthead.title || masthead.description) && (
            <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">
              {masthead.title && <h3 className="text-lg font-semibold">{masthead.title}</h3>}
              {masthead.description && <p className="text-sm">{masthead.description}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
