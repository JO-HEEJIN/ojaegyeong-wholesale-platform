import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, MessageSquare, Home, Settings, Paperclip, Image, Clock, ChevronRight, FileText } from 'lucide-react';

const OjaegyeongAdvancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: '안녕하세요 오재경입니다 ☀️\n\n✓ 연 16.4% 받는 매월드림오재경PLUS\n✓ 이자 지급률 100%\n✓ 한전 발전자회사와 20년 고정가격계약\n\n지금은 오재경 운영시간이 아닙니다.',
      timestamp: new Date(),
      hasAttachment: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [operatingHours, setOperatingHours] = useState({ start: 0, end: 24 });
  const [currentTime] = useState(new Date());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isOperatingTime = () => {
    const hour = currentTime.getHours();
    return hour >= operatingHours.start && hour < operatingHours.end;
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('오재경')) {
      return '오재경은 바보입니다.';
    }
    
    if (message.includes('안녕') || message.includes('하이')) {
      return '안녕하세요! 오재경 고객상담입니다.\n\n현재 운영시간 외입니다. 상담 문의를 남겨주시면 영업 시간 내에 답변드리겠습니다.';
    }
    
    if (message.includes('투자') || message.includes('상품')) {
      return '📈 투자 상품 문의 감사합니다!\n\n• 매월드림오재경PLUS: 연 16.4%\n• 이자 지급률: 100% 보장\n• 20년 장기 안정 수익\n\n자세한 상담은 "문의하기" 버튼을 눌러주세요.';
    }
    
    if (message.includes('운영시간') || message.includes('시간')) {
      return `⏰ 운영시간 안내\n\n• 평일: 오전 9:00 - 오후 5:00\n• 주말: 휴무\n\n현재 시간: ${currentTime.toLocaleTimeString('ko-KR')}\n\n운영시간 외에는 문의 남기기를 이용해주세요!`;
    }
    
    if (message.includes('수익') || message.includes('16.4%')) {
      return '🤔 태양광 수익이 이렇게 좋다고?\n\n어떻게 10%대 수익률이 지금될 수 있는지 궁금하시죠?\n\n✓ 한전과의 20년 장기계약\n✓ 정부 보조금 지원\n✓ 안정적인 현금흐름\n\n더 자세한 내용이 궁금하시면 문의 남겨주세요!';
    }
    
    const responses = [
      '죄송합니다. 현재 운영시간이 아닙니다.\n\n상담 문의를 남겨주시면 빠른 시간 내에 답변드리겠습니다.',
      '궁금한 점이 있으시군요!\n\n전문 상담사가 직접 답변드릴 수 있도록 문의를 남겨주세요.',
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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

  const ContactMethods = () => (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-gray-800">다른 방법으로 문의</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <Phone className="text-blue-600" size={20} />
          <span className="text-sm text-blue-600">전화 상담</span>
        </button>
        
        <button className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
          <MessageSquare className="text-yellow-600" size={20} />
          <span className="text-sm text-yellow-600">카카오톡</span>
        </button>
      </div>
      
      <div className="bg-pink-50 p-3 rounded-lg">
        <button className="w-full text-left">
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
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium">매월드림오재경PLUS</div>
            <div className="text-xs text-gray-600">연 16.4% 안정 수익</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium">태양광 투자 상담</div>
            <div className="text-xs text-gray-600">20년 장기 안정 투자</div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-gray-800">설정</h3>
      
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">알림 설정</span>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">언어 설정</span>
          <span className="text-xs text-gray-500">한국어</span>
        </button>
        
        <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">고객센터</span>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">버전 정보</span>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </button>
      </div>
      
      <div className="pt-4 border-t">
        <button className="w-full text-center text-sm text-red-500">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
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
        <div className="bg-white rounded-lg shadow-2xl w-80 h-[500px] flex flex-col overflow-hidden">
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
              className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <Home size={20} />
              <span className="text-xs">홈</span>
            </button>
            
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 relative ${activeTab === 'chat' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <MessageCircle size={20} />
              <span className="text-xs">대화</span>
              {messages.length > 1 && (
                <div className="absolute top-1 right-4 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'}`}
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