/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placehold.co', 'www.btsoekonomi.com',
      'https://minio.yalispor.com.tr/yalispor/images/nike-court-vision-low-erkek-spor-ayakkabi-1-1731477749.jpg',
    'https://ares.shiftdelete.net/2023/11/togg-avrupa-birligi-satis-tarihi-kapak.jpg',
  'https://iaahbr.tmgrup.com.tr/e30c83/660/310/0/68/800/444?u=https://iahbr.tmgrup.com.tr/2024/10/11/9-yargi-paketi-neler-getiriyor-9-yargi-paketi-meclisten-gecti-mi-ne-zaman-cikacak-iste-ayrintilar-1728640232145.jpeg',
'https://samsungazetesicom.teimg.com/crop/1280x720/samsungazetesi-com/uploads/2023/08/meteor-yagmuru-ne-zaman-saat-kacta-408.jpg',
'https://www.inegolunsesi.com/resimler/2025-2/3/74285572626780.webp',
'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/3421528F5E3679CEA7D89FE51BE6DE6904289364AD148688A2E236A340144BF6/scale?width=1200&aspectRatio=1.78&format=webp',
'https://i.ytimg.com/vi/On1a1mcqCS4/maxresdefault.jpg',
'https://cdn1.ntv.com.tr/gorsel/x7t4Ez9P60KMoEolTFUu7Q.jpg?width=952&height=540&mode=both&scale=both',
'https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1788000/avrupanin-5-buyuk-liginde-gorunum-1789078.jpg',
'https://www.sehirmedya.com/static/2025/05/11/yapay-zeka-ile-kanser-teshisinde-yeni-donem-1746967798-202_small.jpg',
'https://www.muglameydan.com.tr/images/haberler/2025/04/mugla-da-turizm-sezonu-umut-vadediyor-5465-t.jpg'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/api/:path*', // Updated to port 8081
      },
    ]
  },
};

export default nextConfig;
