import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Haber Portalı</h3>
            <p className="text-sm text-gray-300">SE 3355 Web Development Assignment 1 - Group 1 News Portal</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Kategoriler</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white">
                  Gündem
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Ekonomi
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Spor
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Magazin
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Teknoloji
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Kurumsal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Künye
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Kullanım Şartları
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">İletişim</h3>
            <address className="not-italic text-sm text-gray-300 space-y-2">
              <p>Üniversite Caddesi</p>
              <p>İstanbul, Türkiye</p>
              <p>Email: info@haberportali.com</p>
              <p>Telefon: +90 212 123 4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Haber Portalı. Tüm hakları saklıdır.</p>
          <p className="mt-2">
            Grup 1: ARDA ÖZER, KEMAL BARAN TOPKAYA, UĞUR TÜTÜNCÜOĞLU, ZEYNEP GÜLCE ÖZER, SERCAN SALİMOĞLU, NUR CEYLİN
            ÇETİN, CEREN SUDE YETİM, ECE TOPUZ, ATA EKREN, SARPER ŞEN, YAĞMUR SABIRLI, ATAKAN ÇAMLICA, İRFAN EMRE UTKAN,
            TURGUT EGEMEN ÖZYÜREK, YIGIT SONER, EFE FENER
          </p>
        </div>
      </div>
    </footer>
  )
}
