import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, MessageSquare, Home, Settings, Paperclip, Image, Clock, ChevronRight, FileText } from 'lucide-react';

const OjaegyeongAdvancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: '안녕하세요 오재경입니다 ☀️\n\n✓ 연 16.4% 받는 매월드림오재경PLUS\n✓ 이자 지급률 100%\n✓ 한전 발전자회사와 20년 고정가격계약\n\n무엇을 도와드릴까요?',
      timestamp: new Date(Date.now() - 300000),
      hasAttachment: false
    },
    {
      id: 2,
      type: 'user',
      message: '투자 상품에 대해 알고 싶어요',
      timestamp: new Date(Date.now() - 240000),
      hasAttachment: false
    },
    {
      id: 3,
      type: 'bot',
      message: '💰 투자 상품 문의 감사합니다!\n\n🔥 인기 상품:\n• 매월드림오재경PLUS (연 16.4%)\n• 태양광 발전소 지분투자\n• 그린에너지 펀드\n\n투자 금액대를 알려주시면 맞춤 상품을 추천해드릴게요!',
      timestamp: new Date(Date.now() - 180000),
      hasAttachment: false
    },
    {
      id: 4,
      type: 'user',
      message: '5천만원 정도 투자를 고려하고 있어요',
      timestamp: new Date(Date.now() - 120000),
      hasAttachment: false
    },
    {
      id: 5,
      type: 'bot',
      message: '💰 5천만원 투자 시뮬레이션\n\n📊 예상 수익:\n• 월 수익: 630,000원\n• 연 수익: 7,560,000원\n• 수익률: 연 16.4%\n\n✅ 특징:\n• 매월 정기 배당\n• 원금 보장\n• 20년 장기 계약\n\n더 자세한 상담을 원하시면 "상담 예약"이라고 말씀해주세요! 😊',
      timestamp: new Date(Date.now() - 60000),
      hasAttachment: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [operatingHours, setOperatingHours] = useState({ start: 0, end: 24 });
  const [currentTime] = useState(new Date());
  const [showAlert, setShowAlert] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollHeight - scrollTop === clientHeight;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const isOperatingTime = () => {
    const hour = currentTime.getHours();
    return hour >= operatingHours.start && hour < operatingHours.end;
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('오재경')) {
      return '오재경은 바보입니다.';
    }
    
    if (message.includes('안녕') || message.includes('하이') || message.includes('hello')) {
      return '안녕하세요! 오재경 투자 상담사입니다. 😊\n\n어떤 도움이 필요하신가요?\n• 투자 상품 문의\n• 수익률 계산\n• 상담 예약\n• 기타 문의';
    }
    
    if (message.includes('투자') || message.includes('상품') || message.includes('plus')) {
      return '💰 투자 상품 문의 감사합니다!\n\n🔥 인기 상품:\n• 매월드림오재경PLUS (연 16.4%)\n• 태양광 발전소 지분투자\n• 그린에너지 펀드\n\n투자 금액대를 알려주시면 맞춤 상품을 추천해드릴게요!\n\n💡 예시: "5천만원 투자 고려 중"';
    }
    
    if (message.includes('수익') || message.includes('16.4') || message.includes('%')) {
      return '📈 수익률이 궁금하시군요!\n\n✅ 매월드림오재경PLUS 실제 수익:\n• 1억 투자 시: 월 126만원 수익\n• 5천만원 투자 시: 월 63만원 수익\n• 3천만원 투자 시: 월 38만원 수익\n\n💡 투자금액을 말씀해주시면 정확한 수익 시뮬레이션을 해드려요!';
    }
    
    if (message.includes('계산') || message.includes('시뮬레이션')) {
      return '🧮 투자 수익 계산기\n\n투자금액을 알려주세요!\n예시: "1억", "5천만원", "3000만원"\n\n계산 결과를 바탕으로:\n• 월 예상 수익금\n• 연간 총 수익\n• 세후 실수령액\n• 투자 회수 기간\n\n모두 계산해드릴게요! 💪';
    }
    
    if (message.includes('상담') || message.includes('예약') || message.includes('만나')) {
      return '👨‍💼 상담 예약 안내\n\n📅 상담 방법:\n1. 방문 상담 (서울 강남구 사무실)\n2. 화상 상담 (줌/구글미트)\n3. 전화 상담 (1577-1234)\n\n🕐 상담 가능 시간:\n• 평일: 09:00~18:00\n• 토요일: 10:00~15:00\n\n선호하시는 날짜와 시간을 알려주세요!';
    }
    
    if (message.includes('연락처') || message.includes('전화') || message.includes('번호')) {
      return '📞 연락처 안내\n\n고객센터: 1577-1234\n📧 이메일: invest@ojaegyeong.com\n🏢 주소: 서울 강남구 테헤란로 123\n\n⏰ 운영시간:\n• 평일: 09:00~18:00\n• 토요일: 10:00~15:00\n• 일요일: 휴무\n\n카카오톡 상담도 가능해요! 💬';
    }
    
    // 숫자가 포함된 경우 (투자금액 계산)
    const numbers = message.match(/(\d+)/g);
    if (numbers && (message.includes('억') || message.includes('천만') || message.includes('만원'))) {
      const amount = numbers[0];
      let monthlyReturn = 0;
      
      if (message.includes('억')) {
        monthlyReturn = parseInt(amount) * 1260000; // 1억당 월 126만원
      } else if (message.includes('천만')) {
        monthlyReturn = parseInt(amount) * 126000; // 1천만원당 월 12.6만원
      }
      
      return `💰 ${amount}${message.includes('억') ? '억' : '천만원'} 투자 시뮬레이션\n\n📊 예상 수익:\n• 월 수익: ${monthlyReturn.toLocaleString()}원\n• 연 수익: ${(monthlyReturn * 12).toLocaleString()}원\n• 수익률: 연 16.4%\n\n✅ 특징:\n• 매월 정기 배당\n• 원금 보장\n• 20년 장기 계약\n\n더 자세한 상담을 원하시면 "상담 예약"이라고 말씀해주세요! 😊`;
    }
    
    if (message.includes('감사') || message.includes('고마워') || message.includes('thanks')) {
      return '감사합니다! 😊\n\n더 궁금한 점이 있으시면 언제든 말씀해주세요.\n\n💡 추천 질문:\n• "5천만원 투자하면 수익이 얼마나 돼?"\n• "상담 예약하고 싶어요"\n• "투자 위험도는 어떻게 돼?"\n\n항상 최선을 다해 도와드리겠습니다! 🙏';
    }
    
    // 기본 응답
    const defaultResponses = [
      '죄송해요, 좀 더 구체적으로 말씀해주시면 더 정확한 답변을 드릴 수 있어요! 😅\n\n💡 이렇게 질문해보세요:\n• "투자 상품 알려줘"\n• "5천만원 투자하면 수익이 얼마야?"\n• "상담 받고 싶어"\n• "연락처 알려줘"',
      '아직 잘 이해하지 못했어요. 🤔\n\n📞 직접 상담을 원하시면:\n• 전화: 1577-1234\n• 카카오톡: @오재경투자\n\n또는 구체적인 질문을 해주시면 도와드릴게요!',
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleInquiry = () => {
    // 대화 탭으로 이동하고 안내 메시지 추가
    setActiveTab('chat');
    const inquiryMessage = {
      id: Date.now(),
      type: 'bot',
      message: '문의해주셔서 감사합니다! 😊\n\n어떤 것이 궁금하신가요?\n• 투자 상품 문의\n• 수익률 계산\n• 상담 예약\n• 기타 문의\n\n편하게 말씀해주세요!',
      timestamp: new Date(),
      hasAttachment: false
    };
    setMessages(prev => [...prev, inquiryMessage]);
  };

  const handleServiceClick = (serviceType) => {
    // 대화 탭으로 이동
    setActiveTab('chat');
    
    let botMessage = '';
    if (serviceType === 'plus') {
      botMessage = '💰 매월드림오재경PLUS 상품 문의주셔서 감사합니다!\n\n📈 주요 특징:\n• 연 16.4% 높은 수익률\n• 매월 안정적인 배당금\n• 20년 장기 계약 보장\n• 한전 발전자회사와 직접 계약\n\n더 자세한 상담을 원하시면 연락처를 남겨주세요!';
    } else if (serviceType === 'solar') {
      botMessage = '☀️ 태양광 투자 상담 문의주셔서 감사합니다!\n\n🔋 태양광 투자 장점:\n• 정부 지원 정책\n• 친환경 에너지\n• 장기 안정 수익\n• 세제 혜택\n\n투자 규모나 지역을 알려주시면 맞춤 상담해드릴게요!';
    }
    
    const serviceMessage = {
      id: Date.now(),
      type: 'bot',
      message: botMessage,
      timestamp: new Date(),
      hasAttachment: false
    };
    
    setMessages(prev => [...prev, serviceMessage]);
  };

  const handlePhoneCall = () => {
    setActiveTab('chat');
    const phoneMessage = {
      id: Date.now(),
      type: 'bot',
      message: '📞 전화 상담을 원하시는군요!\n\n고객센터 번호: 1577-1234\n운영시간: 평일 09:00-18:00\n\n지금 바로 연결해드릴까요?\n아니면 편한 시간에 연락드릴 수 있도록 연락처를 남겨주세요!',
      timestamp: new Date(),
      hasAttachment: false
    };
    setMessages(prev => [...prev, phoneMessage]);
  };

  const handleKakaoTalk = () => {
    setActiveTab('chat');
    const kakaoMessage = {
      id: Date.now(),
      type: 'bot',
      message: '💬 카카오톡 상담을 원하시는군요!\n\n카카오톡 채널: @오재경투자\n\n1. 카카오톡 검색에서 "오재경투자" 검색\n2. 채널 추가 후 메시지 전송\n3. 전문 상담사가 실시간 답변\n\n또는 여기서 바로 상담받으셔도 됩니다! 😊',
      timestamp: new Date(),
      hasAttachment: false
    };
    setMessages(prev => [...prev, kakaoMessage]);
  };

  const handleSettingClick = (setting) => {
    setShowAlert(`${setting} 설정 페이지로 이동합니다.`);
    setTimeout(() => setShowAlert(''), 2000);
  };

  const handleFileUpload = () => {
    // 파일 업로드 시뮬레이션
    const fileMessage = {
      id: Date.now(),
      type: 'user',
      message: '📎 투자문의서.pdf',
      timestamp: new Date(),
      hasAttachment: true,
      fileType: 'pdf'
    };
    setMessages(prev => [...prev, fileMessage]);
    
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: '파일을 잘 받았습니다! 검토 후 답변드리겠습니다.\n\n예상 답변 시간: 2-3시간',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date(),
      hasAttachment: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(inputMessage),
        timestamp: new Date(),
        hasAttachment: false
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ContactMethods = () => (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-gray-800">다른 방법으로 문의</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={handlePhoneCall}
          className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Phone className="text-blue-600" size={20} />
          <span className="text-sm text-blue-600">전화 상담</span>
        </button>
        
        <button 
          onClick={handleKakaoTalk}
          className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
        >
          <MessageSquare className="text-yellow-600" size={20} />
          <span className="text-sm text-yellow-600">카카오톡</span>
        </button>
      </div>
      
      <div className="bg-pink-50 p-3 rounded-lg">
        <button 
          onClick={() => {
            setActiveTab('chat');
            const articleMessage = {
              id: Date.now(),
              type: 'bot',
              message: '📰 "태양광 수익이 이렇게 좋다고?" 아티클\n\n🤔 많은 분들이 궁금해하시는 태양광 투자 수익률!\n\n✅ 실제 고객 사례:\n• A고객: 월 126만원 수익 (1억 투자)\n• B고객: 월 84만원 수익 (6천만원 투자)\n• C고객: 월 210만원 수익 (2억 투자)\n\n💡 핵심 포인트:\n1. 한전과 20년 장기계약\n2. 정부 보조금 지원\n3. 연 16.4% 안정 수익률\n\n더 자세한 내용이 궁금하시면 "투자 시뮬레이션"을 요청해주세요!',
              timestamp: new Date(),
              hasAttachment: false
            };
            setMessages(prev => [...prev, articleMessage]);
          }}
          className="w-full text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-pink-700">📰 태양광 수익이 이렇게 좋다고?</div>
              <div className="text-xs text-pink-600 mt-1">어떻게 10%대 수익률이 지금될 수...</div>
            </div>
            <div className="bg-pink-600 text-white text-xs px-2 py-1 rounded">
              3분 읽기
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const HomeTab = () => (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <span className="text-white font-bold text-xl">오재경</span>
        </div>
        <h2 className="text-lg font-semibold">오재경 투자 상담</h2>
        <p className="text-sm text-gray-500">안전한 태양광 투자의 시작</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Clock size={16} className="text-blue-600" />
          <span className="text-sm font-medium">운영시간</span>
        </div>
        <p className="text-sm text-gray-600">평일 오전 9:00 - 오후 5:00</p>
        <p className="text-xs text-gray-500 mt-1">
          {isOperatingTime() ? '현재 운영 중입니다' : '현재 운영시간 외입니다'}
        </p>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-gray-800">주요 서비스</h3>
        <div className="space-y-2">
          <button 
            onClick={() => handleServiceClick('plus')}
            className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <div className="text-sm font-medium">매월드림오재경PLUS</div>
            <div className="text-xs text-gray-600">연 16.4% 안정 수익</div>
          </button>
          <button 
            onClick={() => handleServiceClick('solar')}
            className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <div className="text-sm font-medium">태양광 투자 상담</div>
            <div className="text-xs text-gray-600">20년 장기 안정 투자</div>
          </button>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-gray-800">설정</h3>
      
      <div className="space-y-3">
        <button 
          onClick={() => handleSettingClick('알림')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm">알림 설정</span>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
        
        <button 
          onClick={() => handleSettingClick('언어')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm">언어 설정</span>
          <span className="text-xs text-gray-500">한국어</span>
        </button>
        
        <button 
          onClick={() => handleSettingClick('고객센터')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm">고객센터</span>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
        
        <button 
          onClick={() => handleSettingClick('버전 정보')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm">버전 정보</span>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </button>
      </div>
      
      <div className="pt-4 border-t">
        <button 
          onClick={() => setShowAlert('로그아웃 되었습니다.')}
          className="w-full text-center text-sm text-red-500 hover:text-red-600 transition-colors"
        >
          로그아웃
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomeTab />;
      case 'chat':
        return (
          <>
            {/* 메시지 영역 */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 relative custom-scrollbar"
              style={{
                maxHeight: '250px',
                minHeight: '200px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#CBD5E0 #F7FAFC'
              }}
              onScroll={handleScroll}
            >
              {/* 스크롤 인디케이터 */}
              {!isAtBottom && messages.length > 3 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                  <button
                    onClick={() => {
                      setIsAtBottom(true);
                      scrollToBottom();
                    }}
                    className="bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 text-xs flex items-center space-x-2 hover:scale-105"
                  >
                    <span className="animate-pulse">↓</span>
                    <span>최신 메시지 보기</span>
                  </button>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                      {msg.type === 'user' ? (
                        <User className="text-white" size={14} />
                      ) : (
                        <Bot className="text-gray-600" size={14} />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <div className="text-sm whitespace-pre-line">
                        {msg.hasAttachment && (
                          <div className="flex items-center space-x-1 mb-1">
                            <FileText size={14} />
                          </div>
                        )}
                        {msg.message}
                      </div>
                      <div className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <Bot className="text-gray-600" size={14} />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 문의하기 버튼 */}
            <div className="px-4 py-2">
              <button 
                onClick={handleInquiry}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <Send size={16} />
                <span>문의하기</span>
              </button>
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                24시간 운영 중
              </div>
            </div>

            {/* 다른 문의 방법 */}
            <ContactMethods />

            {/* 입력 영역 */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <button
                  onClick={handleFileUpload}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Paperclip size={16} />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        );
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* CSS 스타일 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
          }
        `
      }} />
      {/* 챗봇 아이콘 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 relative"
        >
          <MessageCircle size={24} />
          {/* 알림 배지 */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
      )}

      {/* 챗봇 창 */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 h-[500px] flex flex-col overflow-hidden relative">
          {/* 알림 메시지 */}
          {showAlert && (
            <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-sm p-2 text-center z-10 animate-pulse">
              {showAlert}
            </div>
          )}
          
          {/* 헤더 */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">오재경</span>
              </div>
              <div>
                <div className="font-semibold">오재경</div>
                <div className="text-xs opacity-90 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                  {isOperatingTime() ? '온라인' : '오프라인'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="flex-1 flex flex-col">
            {renderTabContent()}
          </div>

          {/* 하단 탭 바 */}
          <div className="bg-white border-t flex">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 transition-colors hover:bg-gray-50 ${activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}
            >
              <Home size={20} />
              <span className="text-xs">홈</span>
            </button>
            
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 relative transition-colors hover:bg-gray-50 ${activeTab === 'chat' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}
            >
              <MessageCircle size={20} />
              <span className="text-xs">대화</span>
              {messages.length > 1 && (
                <div className="absolute top-1 right-4 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 transition-colors hover:bg-gray-50 ${activeTab === 'settings' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}
            >
              <Settings size={20} />
              <span className="text-xs">설정</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OjaegyeongAdvancedChatbot;