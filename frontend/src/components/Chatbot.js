import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, MessageSquare, Home, Settings, Clock, ChevronRight, ArrowLeft, Bell } from 'lucide-react';

const OjaegyeongDarkChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('main'); // main, inquiry, chat
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('오재경')) {
      return '오재경은 바보입니다.';
    }
    
    if (message.includes('안녕') || message.includes('하이')) {
      return '안녕하세요! 오재경 투자 상담사입니다. 😊\n\n어떤 도움이 필요하신가요?';
    }
    
    if (message.includes('투자') || message.includes('상품')) {
      return '💰 투자 상품 문의 감사합니다!\n\n• 매월드림오재경PLUS (연 16.4%)\n• 태양광 발전소 지분투자\n• 그린에너지 펀드\n\n투자 금액대를 알려주시면 맞춤 상품을 추천해드릴게요!';
    }
    
    const responses = [
      '궁금한 점이 있으시군요! 더 구체적으로 말씀해주시면 도와드릴게요.',
      '어떤 것이 궁금하신지 말씀해주세요. 최선을 다해 답변드리겠습니다.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewInquiry = () => {
    setCurrentView('inquiry');
  };

  const startChat = () => {
    setCurrentView('chat');
    setMessages([
      {
        id: 1,
        type: 'bot',
        message: '안녕하세요! 오재경 상담사입니다.\n\n어떤 것이 궁금하신가요?',
        timestamp: new Date()
      }
    ]);
  };

  // 메인 홈 화면
  const HomeView = () => (
    <div className="flex-1 overflow-y-auto" style={{ maxHeight: '500px' }}>

      {/* 헤더 정보 */}
      <div className="p-6 text-center border-b border-gray-700">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
          <span className="text-blue-600 font-bold text-xl">M</span>
        </div>
        <h2 className="text-white text-lg font-semibold mb-1">오재경</h2>
        <p className="text-gray-400 text-sm">운영시간 보기</p>
      </div>

      {/* 메인 카드 */}
      <div className="p-4">
        <div className="bg-gray-700 rounded-2xl p-4 mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-blue-600 font-bold">M</span>
            </div>
            <div>
              <div className="text-white font-medium">오재경</div>
              <div className="text-gray-300 text-sm">안녕하세요 오재경입니다 ☀️</div>
            </div>
          </div>
          
          <div className="text-white text-sm mb-4 leading-relaxed">
            ✓ 연 16.4% 받는 매월드림오재경PLUS<br/>
            ✓ 이자 지급률 100%<br/>
            ✓ 한전 발전자회사와 20년 고정가격계약
          </div>
          
          <div className="text-gray-400 text-sm mb-4">
            지금은 오재경 운영시간이 아닙니다.<br/>
            💬 상담 문의를 남겨주시면 영업 시간 내...
          </div>
          
          <button
            onClick={startNewInquiry}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors mb-3"
          >
            <Send size={16} />
            <span>문의하기</span>
          </button>
          
          <div className="flex items-center justify-center text-gray-400 text-xs">
            <Clock size={12} className="mr-1" />
            오후 5:00부터 운영해요
          </div>
        </div>

        {/* 알림 영역 */}
        <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
          <span>안 읽은 알림</span>
          <span>모두 읽기</span>
        </div>

        {/* 알림 카드 */}
        <div className="bg-gray-700 rounded-2xl p-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-blue-600 font-bold">M</span>
            </div>
            <div className="flex-1">
              <div className="text-gray-300 text-sm">오재경 12시간 전</div>
              <div className="text-white text-sm">🤔 태양광 수익이 이렇게 좋다고?</div>
              <div className="text-gray-400 text-xs">어떻게 10%대 수익률이 지금될 수...</div>
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* 3분 읽기 버튼 */}
        <button className="w-full bg-red-800 text-white py-3 rounded-xl font-medium mb-6">
          3분 읽기
        </button>

        {/* 다른 방법으로 문의 */}
        <div className="text-gray-400 text-sm mb-4">다른 방법으로 문의</div>
        <div className="flex space-x-4">
          <button className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
            <MessageSquare className="text-white" size={20} />
          </button>
          <button className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <Phone className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  // 대화 탭 화면
  const ChatTabView = () => (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-gray-400 text-sm mb-6">1개의 안 읽은 알림이 있어요</div>
        
        <div className="bg-gray-700 rounded-2xl p-4 mb-6 w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-blue-600 font-bold">M</span>
            </div>
            <div className="flex-1">
              <div className="text-gray-300 text-sm">오재경 12시간 전</div>
              <div className="text-white text-sm">🤔 태양광 수익이 이렇게 좋다고?</div>
              <div className="text-gray-400 text-xs">어떻게 10%대 수익률이 지금될 수...</div>
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={startNewInquiry}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Send size={16} />
          <span>새 문의하기</span>
        </button>
      </div>
    </div>
  );

  // 설정 화면
  const SettingsView = () => (
    <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: '500px' }}>
      {/* 프로필 섹션 */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">🍕</span>
        </div>
        <div className="text-white text-lg font-medium mb-1">이름</div>
        <div className="text-gray-400 text-sm mb-4">연락처 정보</div>
        <button className="text-gray-400 text-sm border border-gray-600 px-4 py-2 rounded-lg">
          정보 수정하기
        </button>
      </div>

      {/* 상담 환경 */}
      <div className="mb-8">
        <div className="text-gray-400 text-sm mb-4">상담 환경</div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-white">🌐</span>
              <span className="text-white">언어</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">한국어</span>
              <ChevronRight className="text-gray-400" size={16} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-white">📱</span>
              <span className="text-white">메시지 번역 표시</span>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end p-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="text-white" size={16} />
              <span className="text-white">알림음</span>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end p-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 광고 수신 설정 */}
      <div className="mb-8">
        <div className="text-gray-400 text-sm mb-4">광고 수신 설정</div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="text-white" size={16} />
              <span className="text-white">문자 수신거부</span>
            </div>
            <div className="w-12 h-6 bg-gray-600 rounded-full flex items-center justify-start p-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-white">📧</span>
              <span className="text-white">이메일 수신거부</span>
            </div>
            <div className="w-12 h-6 bg-gray-600 rounded-full flex items-center justify-start p-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right text-gray-500 text-xs">v15.1.1</div>
    </div>
  );

  // 문의하기 중간 화면
// 문의하기 중간 화면
const InquiryView = () => (
  <div className="flex-1 flex flex-col bg-gray-800">
    <div className="flex items-center p-4 border-b border-gray-700">
      <button onClick={() => setCurrentView('main')} className="mr-4">
        <ArrowLeft className="text-white" size={20} />
      </button>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">M</span>
        </div>
        <div>
          <div className="text-white font-medium">오재경</div>
          <div className="text-gray-400 text-xs">오후 5:00부터 운영해요</div>
        </div>
      </div>
    </div>

    {/* 여기가 핵심 수정 부분 */}
    <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: '500px' }}>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
          <span className="text-blue-600 font-bold text-2xl">M</span>
        </div>

        <div className="text-center">
          <h2 className="text-white text-xl font-semibold mb-2">오재경에 문의하기</h2>
          <p className="text-gray-400 text-sm">운영시간 보기</p>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-gray-700 rounded-xl p-4 mb-6">
            <div className="text-white text-sm mb-4">
              🔇 해, 보세요. 모두의 헷살, 오재경<br/>
              고객센터 : 1577-2736
            </div>
            
            <div className="text-white text-lg font-semibold mb-2">
              안녕하세요 오재경입니다 ☀️
            </div>
            
            <div className="text-white text-sm mb-4">
              연 16.4% 받는 매월드림오재경PLUS<br/>
              이자 지급률 100%<br/>
              한전 발전자회사와 20년 고정가격계약
            </div>
            
            <div className="text-gray-400 text-sm mb-4">
              지금은 오재경 운영시간이 아닙니다.<br/>
              💬 상담 문의를 남겨주시면 영업 시간 내에<br/>
              빠르게 답변 드리겠습니다 :)
            </div>
            
            <div className="text-gray-400 text-sm mb-4">
              ⏰ 평일 09:00 ~ 18:00<br/>
              (점심시간 13:00 ~ 14:00)<br/>
              주말 및 공휴일 : 휴무
            </div>
            
            <div className="bg-red-600 text-white text-center py-2 rounded-lg text-sm mb-4">
              오재경 처음이라면? 이것만 확인!
            </div>
          </div>

          <button
            onClick={startChat}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium"
          >
            새 문의하기
          </button>
        </div>
      </div>
    </div>
  </div>
);

  // 채팅 화면
  const ChatView = () => (
    <div className="flex-1 flex flex-col bg-gray-800">
      <div className="flex items-center p-4 border-b border-gray-700">
        <button onClick={() => setCurrentView('main')} className="mr-4">
          <ArrowLeft className="text-white" size={20} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">M</span>
          </div>
          <div>
            <div className="text-white font-medium">오재경</div>
            <div className="text-gray-400 text-xs">상담사와 대화 중</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`p-3 rounded-xl ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
                <div className="text-sm whitespace-pre-line">{msg.message}</div>
                <div className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 p-3 rounded-xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (currentView === 'inquiry') return <InquiryView />;
    if (currentView === 'chat') return <ChatView />;
    
    switch(activeTab) {
      case 'home':
        return <HomeView />;
      case 'chat':
        return <ChatTabView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 챗봇 아이콘 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 relative"
        >
          <MessageCircle size={24} />
          {hasUnreadNotifications && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          )}
        </button>
      )}

      {/* 챗봇 창 */}
      {isOpen && (
        <div className="bg-gray-800 rounded-2xl shadow-2xl w-80 h-[600px] flex flex-col overflow-hidden relative">
        {/* 현재 뷰가 main이 아닐 때는 탭을 숨김 */}
          {currentView === 'main' && (
            <>
              {/* 헤더 */}
              <div className="bg-gray-800 text-white p-4 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">M</span>
                  </div>
                  <div>
                    <div className="font-semibold">오재경</div>
                    <div className="text-xs text-gray-400">운영시간 보기</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 탭 컨텐츠 */}
              <div className="flex-1 flex flex-col">
                {renderContent()}
              </div>

              {/* 하단 탭 바 */}
              <div className="bg-gray-800 border-t border-gray-700 flex">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 transition-colors ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`}
                >
                  <Home size={20} />
                  <span className="text-xs">홈</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 relative transition-colors ${activeTab === 'chat' ? 'text-blue-500' : 'text-gray-400'}`}
                >
                  <MessageCircle size={20} />
                  <span className="text-xs">대화</span>
                  {hasUnreadNotifications && (
                    <div className="absolute top-1 right-4 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 transition-colors ${activeTab === 'settings' ? 'text-blue-500' : 'text-gray-400'}`}
                >
                  <Settings size={20} />
                  <span className="text-xs">설정</span>
                </button>
              </div>
            </>
          )}
          
          {/* 다른 뷰들 (inquiry, chat) */}
          {currentView !== 'main' && (
            <>
              {renderContent()}
              {currentView !== 'chat' && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OjaegyeongDarkChatbot;