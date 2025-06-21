import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, ChevronDown, Star, Phone, Mail, X } from 'lucide-react';

const OjaegyeongPlatform = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    '카테고리', '1688&8망고', '사업자전용', '유통배송', '최저가', '베스트', 'MD전', '영자리', '기획전', '유튜브쇼핑', '이벤트&체험', 'AI 상품추천'
  ];

  const featuredProducts = [
    { id: 1, name: '필요한 건 다 담는다! 넉넉한 수납력', image: '/api/placeholder/300/200', price: '사업자전용', category: '가방' },
    { id: 2, name: '영덕 레인보우 방수지 모자/머리', image: '/api/placeholder/300/200', price: '2,900원', originalPrice: '4,680원' },
    { id: 3, name: '다용도 멀티 주방 랜드리 수납함', image: '/api/placeholder/300/200', price: '4,680원' },
    { id: 4, name: '투명 불투명 물주기 무인갑', image: '/api/placeholder/300/200', price: '360원' },
    { id: 5, name: '[지엔지] 휴대하기 편리한 포켓백', image: '/api/placeholder/300/200', price: '4,600원' },
    { id: 6, name: '스피디 PD 20W 고속충전 보조배터리', image: '/api/placeholder/300/200', price: '16,900원' }
  ];

  const saleProducts = [
    { id: 1, name: '미니 태극기 국정원 한사용 국기', image: '/api/placeholder/200/150', price: '550원' },
    { id: 2, name: '헬로우 남성 사각 팬티 남자 속옷', image: '/api/placeholder/200/150', price: '940원' },
    { id: 3, name: '에잇이 3종피크컵', image: '/api/placeholder/200/150', price: '5,200원' },
    { id: 4, name: '여자 여름 베이직 블라우스 무조건', image: '/api/placeholder/200/150', price: '5,600원' },
    { id: 5, name: '[도매머리스] 포츠노브라 브라탑', image: '/api/placeholder/200/150', price: '3,600원' }
  ];

  const specialProducts = [
    { id: 1, name: '(최저가)판매스페이스-프로팀하이', image: '/api/placeholder/250/180', price: '3,960원' },
    { id: 2, name: '[도매인]아이어스바버지/아한', image: '/api/placeholder/250/180', price: '4,400원' },
    { id: 3, name: '남성 쿨링기능성빨강[어른 실]', image: '/api/placeholder/250/180', price: '2,700원' },
    { id: 4, name: '남성 여름 린넨 실내스.출나시', image: '/api/placeholder/250/180', price: '1,480원' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm relative z-50">
        {/* Top Banner - Hidden on mobile */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span>🎁 기프트꾹</span>
              <span>굿즈, 사은품, 편돌품도 도매꾹에서 쉽게 주문하자!</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>🌟 창마대세! 우산 기획전</span>
              <button className="text-white hover:text-gray-200">×</button>
            </div>
          </div>
        </div>

        {/* Mobile Top Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 block md:hidden">
          <div className="text-center text-sm">
            <span>🌟 창마대세! 우산 기획전</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 text-white p-2 rounded-lg font-bold text-lg md:text-xl">
                오재경
              </div>
              <span className="text-xs md:text-sm text-gray-600 hidden sm:block">든든한 도매</span>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative flex w-full">
                <select className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-l-lg">
                  <option>상품명</option>
                  <option>업체명</option>
                  <option>브랜드</option>
                </select>
                <input 
                  type="text" 
                  placeholder="무엇을찾고 계세요?" 
                  className="flex-1 border border-gray-300 px-4 py-3 focus:outline-none focus:border-green-500"
                />
                <button className="bg-green-500 text-white px-6 py-3 rounded-r-lg hover:bg-green-600">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center space-x-3 md:hidden">
              <button 
                className="p-2"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} />
              </button>
              <button className="relative p-2">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
              </button>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-700 hover:text-green-500 text-sm">로그인</button>
              <button className="text-gray-700 hover:text-green-500 text-sm">회원가입</button>
              <button className="text-gray-700 hover:text-green-500 text-sm">마이페이지</button>
              <button className="relative text-gray-700 hover:text-green-500">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </button>
              <div className="text-sm">
                <div>고객센터</div>
                <div className="font-bold">1588-0628</div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="mt-4 md:hidden">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="무엇을찾고 계세요?" 
                  className="flex-1 border border-gray-300 px-4 py-3 rounded-l-lg focus:outline-none focus:border-green-500"
                />
                <button className="bg-green-500 text-white px-6 py-3 rounded-r-lg">
                  <Search size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="bg-gray-50 border-t hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-8 py-3 overflow-x-auto">
              {categories.map((category, index) => (
                <button key={index} className="text-gray-700 hover:text-green-500 text-sm whitespace-nowrap">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">메뉴</h2>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <button className="w-full text-left py-2 text-green-600 font-semibold">로그인</button>
                    <button className="w-full text-left py-2">회원가입</button>
                    <button className="w-full text-left py-2">마이페이지</button>
                  </div>
                  
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button key={index} className="w-full text-left py-3 text-gray-700 hover:text-green-500">
                        {category}
                      </button>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">고객센터</div>
                      <div className="text-xl font-bold text-green-600">1588-0628</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 md:py-8 max-w-7xl mx-auto">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 md:p-8 mb-6 md:mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg md:text-2xl font-bold mb-2">부가세 신고 50% 할인!</h2>
              <p className="text-sm md:text-base mb-4">하루율만 이용 보이겠지</p>
              <button className="bg-white text-purple-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 text-sm md:text-base">
                신청하기
              </button>
            </div>
            <div className="text-3xl md:text-6xl">📊</div>
          </div>
        </div>

        {/* Featured Products Section */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800">꼴Pick! MD가 엄선한 재고보장 상품</h2>
            <button className="text-green-500 hover:text-green-600 text-sm md:text-base">더보기 →</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2 md:p-3">
                  <h3 className="text-xs md:text-sm font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm md:text-lg font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs md:text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Promotion */}
        <section className="mb-8 md:mb-12">
          <div className="bg-gray-900 text-white rounded-lg p-4 md:p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-red-500">⏰</span>
              <span className="text-base md:text-xl font-bold">지금이 최저가 찬스! 대량구매 특가전</span>
            </div>
          </div>
        </section>

        {/* Sale Products */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">이런 상품 어때요?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {saleProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2 md:p-3">
                  <h3 className="text-xs md:text-sm text-gray-700 mb-2 line-clamp-2">{product.name}</h3>
                  <span className="text-sm md:text-lg font-bold text-gray-900">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Event Section */}
        <section className="mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">우산 기획전</h2>
                <p className="text-sm md:text-base text-gray-600">찬 비를 맞는 여름</p>
              </div>
              <div className="text-2xl md:text-4xl">☂️</div>
            </div>
          </div>
        </section>

        {/* Summer Products */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">유튜브MD의 유튜브쇼 상품</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {specialProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-xs md:text-sm text-gray-700 mb-2 line-clamp-2">{product.name}</h3>
                  <span className="text-sm md:text-lg font-bold text-gray-900">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advertisement Banners */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-12">
          <div className="bg-pink-100 rounded-lg p-4 md:p-6 text-center">
            <h3 className="font-bold text-base md:text-lg mb-2">3초 당고 헤어 밴드</h3>
            <p className="text-xl md:text-2xl font-bold">1,200 원</p>
          </div>
          <div className="bg-green-100 rounded-lg p-4 md:p-6 text-center">
            <h3 className="font-bold text-base md:text-lg mb-2">충남기 2in1</h3>
            <p className="text-xl md:text-2xl font-bold">5,000 원</p>
          </div>
          <div className="bg-yellow-100 rounded-lg p-4 md:p-6 text-center">
            <h3 className="font-bold text-base md:text-lg mb-2">스피셜 프로모션</h3>
            <p className="text-sm md:text-lg">특별 할인가</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            <div>
              <h3 className="font-bold text-base md:text-lg mb-4">뉴스 & 공지사항</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                <li>[이벤트] 오재경도매 회원이되면 무료...</li>
                <li>[이벤트] 오재경 회원이되면 편의이 득...</li>
                <li>[이벤트] SNS마케팅력정정 1급 시...</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg mb-4">오재경 서비스</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                <li>현무센터</li>
                <li>MD올보대</li>
                <li>외부 게시서비스</li>
                <li>오재경 가이드</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg mb-4">고객센터</h3>
              <div className="text-xs md:text-sm text-gray-300">
                <p className="text-xl md:text-2xl font-bold text-white mb-2">1588-0628</p>
                <p>평일 9AM-6PM (12H-13H 제외)</p>
                <p>Fax 02-6209-7628</p>
                <p>info@ojgook.com</p>
                <p className="mt-2 md:mt-4">
                  <span className="text-red-500">🇨🇳</span> China 02)2071-0670
                </p>
                <p>
                  <span className="text-red-500">🇻🇳</span> Vietnam 02)2071-0682
                  <br />+84-94-9611-950
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg mb-4">빠른 서비스</h3>
              <div className="space-y-2 md:space-y-3">
                <button className="w-full bg-gray-700 text-white py-2 px-3 md:px-4 rounded hover:bg-gray-600 text-xs md:text-sm">
                  📞 DQ청사초게서
                </button>
                <button className="w-full bg-gray-700 text-white py-2 px-3 md:px-4 rounded hover:bg-gray-600 text-xs md:text-sm">
                  ✅ 지금 찾는 질문
                </button>
                <button className="w-full bg-gray-700 text-white py-2 px-3 md:px-4 rounded hover:bg-gray-600 text-xs md:text-sm">
                  📝 1:1 문의하기
                </button>
                <button className="w-full bg-gray-700 text-white py-2 px-3 md:px-4 rounded hover:bg-gray-600 text-xs md:text-sm">
                  📦 오재경/도매에 쉬운노하우
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-xs md:text-sm text-gray-400 max-w-7xl mx-auto">
            <p className="mb-2">고객센터 / 전자결제차례분평 | 청소년보호정책 | 학생인보호정책 | 이용약관 | 무단이적금지 | 서비스 제공 | 편파인정심정</p>
            <p className="mb-2">
              고객센터 / 전자결제차례분평정 [전자고들아니] | (주)지엔지커머스
            </p>
            <p className="mb-2">서울시 영등포구 국제금융로 6길 30, 5층 (여의도동, 백화빌딩)</p>
            <p className="mb-2">대표이사: 오재경, 커머스테크대표: 하현구</p>
            <p className="mb-2">사업자등록번호 : 107-86-28206 | 통신판매업번호 : 2002-00645</p>
            <p>Copyright © 2001-2025 ojaegyeong.com / G&G Commerce, Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OjaegyeongPlatform;