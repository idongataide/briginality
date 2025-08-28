import React, { useState, useEffect, useRef } from 'react';
import './groupChat.css';
import { useProfile } from '@/hooks/useProfile';
import { getClubChat, sendMessage, type ChatMessage as APIChatMessage } from '@/api/chatApi';
import Images from '@/components/images';
import { FaComments, FaSpinner } from 'react-icons/fa';
 
interface ClubMembership {
  id: number;
  club_id?: number;
  name: string;
  avatar: string | null;
  club: string;
  status: string;
  joined_at: string;
  role: string;
}

interface GroupedChatMessage {
  date: string;
  messages: APIChatMessage[];
}

const GroupChat: React.FC = () => {
  const [selectedClub, setSelectedClub] = useState<ClubMembership | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<APIChatMessage[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<GroupedChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { profile } = useProfile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const isToday = (dateString: string) => {
    const today = new Date();
    const messageDate = new Date(dateString);
    return messageDate.getDate() === today.getDate() &&
           messageDate.getMonth() === today.getMonth() &&
           messageDate.getFullYear() === today.getFullYear();
  };

  const isYesterday = (dateString: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const messageDate = new Date(dateString);
    return messageDate.getDate() === yesterday.getDate() &&
           messageDate.getMonth() === yesterday.getMonth() &&
           messageDate.getFullYear() === yesterday.getFullYear();
  };

  const groupMessages = (messages: APIChatMessage[]): GroupedChatMessage[] => {
    const groups: { [key: string]: APIChatMessage[] } = {};

    messages.forEach(message => {
      const messageDateTime = new Date(message.timestamp);
      // const messageDateString = messageDateTime.toDateString(); // YYYY-MM-DD format

      let dateLabel: string;
      if (isToday(message.timestamp)) {
        dateLabel = 'Today';
      } else if (isYesterday(message.timestamp)) {
        dateLabel = 'Yesterday';
      } else {
        dateLabel = messageDateTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      }

      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(message);
    });

    // Order the groups: Today, Yesterday, Older (sorted by date)
    const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
      if (a === 'Today') return -1;
      if (b === 'Today') return 1;
      if (a === 'Yesterday') return -1;
      if (b === 'Yesterday') return 1;

      // For older dates, sort by date string
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    return sortedGroupKeys.map(key => ({
      date: key,
      messages: groups[key].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    }));
  };

  // Fetch chat messages when a club is selected
  useEffect(() => {
    if (selectedClub) {
      fetchChatMessages(selectedClub.club_id?.toString() || '');
    }
  }, [selectedClub]);

  useEffect(() => {
    setGroupedMessages(groupMessages(chatMessages));
  }, [chatMessages]);

  const fetchChatMessages = async (clubId: string) => {
    try {
      setIsLoading(true);
      const response = await getClubChat(clubId);
      if (response.status === 'success') {
        setChatMessages(response.data.chats || []);
      }
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
      // For now, set empty messages if API fails
      setChatMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClubSelect = (membership: ClubMembership) => {
    setSelectedClub(membership);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedClub) return;

    try {
      // Send message to API
      await sendMessage(selectedClub.club_id?.toString() || '', messageInput);
      
      // Add message to local state (optimistic update)
      const newMessage: APIChatMessage = {
        id: Date.now().toString(),
        senderId: profile?.id?.toString() || '',
        senderName: profile?.name || '',
        senderAvatar: null,
        content: messageInput,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        type: 'text'
      };

      setChatMessages(prev => [...prev, newMessage]);
      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
      // You might want to show an error toast here
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!profile) {
    return (
      <div className="box-body d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <FaSpinner className='text-muted mx-auto fs-24' />
          <h5 className="text-muted">Loading profile...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {/* Club Memberships Sidebar */}
      <div className="col-xxxl-3 col-lg-4 col-12">
        <div className="box bg-lightest">
          <div className="box-header">
            <h4 className="box-title">My Clubs</h4>
          </div>
          <div className="box-body p-0">
            <div className="chat-list">
              {profile.memberships && profile.memberships.length > 0 ? (
                profile.memberships.map((membership) => (
                  <div
                    key={membership?.club_id}
                    className={`chat-item p-20 border-bottom cursor-pointer ${
                      selectedClub?.club_id === membership.club_id ? 'bg-primary-light' : ''
                    }`}
                    onClick={() => handleClubSelect(membership)}
                  >
                    <div className="d-flex align-items-center">
                      <div className="position-relative">
                        <img
                          src={membership.avatar || '/images/avatar/default.jpg'}
                          className="avatar avatar-lg w-[50px]! h-[50px]! rounded-circle"
                          alt={membership.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/avatar/default.jpg';
                          }}
                        />
                        <span className="position-absolute bottom-0 end-0 bg-success rounded-circle" 
                              style={{width: '12px', height: '12px', border: '2px solid white'}}></span>
                      </div>
                      <div className="ms-15 flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0 text-lg! text-[#1C2023] fw-600">{membership.club}</h6>
                          {/* <span className="badge bg-primary font-bold capitalize rounded-pill">{membership.role}</span> */}
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-5">
                        <p className="text-muted mb-0 fs-12">Status: {membership.status}</p>
                          <span className="text-muted fs-11">Joined: {membership.joined_at}</span>                       
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <p className="text-muted">No club memberships found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="col-xxxl-9 col-lg-8 col-12">
        <div className="box bg-lightest">
          {selectedClub ? (
            <>
              {/* Chat Header */}
              <div className="box-header">
                <div className="media align-items-top p-0">
                  <div className="position-relative">
                      <img
                       src={selectedClub.avatar || '/images/avatar/default.jpg'}
                       className="avatar avatar-lg rounded-circle"
                       alt={selectedClub.club}
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src = '/images/avatar/default.jpg';
                       }}
                     />
                    <span className="position-absolute bottom-0 end-0 bg-success rounded-circle" 
                          style={{width: '12px', height: '12px', border: '2px solid white'}}></span>
                  </div>
                  <div className="d-lg-flex d-block justify-content-between align-items-center w-p100">
                    <div className="media-body mb-lg-0 mb-20">
                      <span className="fs-18 text-dark font-bold">{selectedClub.club}</span>
                      <p className="fs-14 mb-0">
                        Your role: {selectedClub.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="box-body">
                <div className="chat-box-one2 h-[360px]! overflow-y-scroll">
                  {isLoading ? (
                    <div className="text-center p-20">
                      <FaSpinner className='text-muted mx-auto fs-24' />
                      <p className="text-muted mt-10">Loading messages...</p>
                    </div>
                  ) : groupedMessages.length > 0 ? (
                    groupedMessages.map((group) => (
                      <div key={group.date}>
                        <div className="text-center my-3">
                          <span className="badge bg-secondary">{group.date}</span>
                        </div>
                        {group.messages.map((message) => (
                          <div key={message.id}>
                            <div className={`card mt-10 d-inline-block mb-3 me-2 no-shadow max-w-p80 ${
                              message.senderId === profile.id?.toString()
                                ? 'float-end bg-primary text-white' 
                                : 'float-start bg-primary-light'
                            }`}>
                              <div className="position-absolute pt-1 pe-2 r-0">
                                <span className={`text-extra-small ${message.senderId === profile.id?.toString() ? '' : 'text-muted'}`}>
                                  {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </span>
                              </div>
                              <div className="card-body">
                                <div className="d-flex flex-row pb-2">
                                  <a className="d-flex" href="#">
                                    <img
                                       alt="Profile"
                                       src={message.senderAvatar || '/images/avatar/default.jpg'}
                                       className="avatar me-10"
                                       onError={(e) => {
                                         const target = e.target as HTMLImageElement;
                                         target.src = '/images/avatar/default.jpg';
                                       }}
                                     />
                                  </a>
                                  <div className="d-flex flex-grow-1 min-width-zero">
                                    <div className="m-2 ps-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                                      <div className="min-width-zero">
                                        <p className={`mb-0 font-bold fs-16 ${message.senderId === profile.id?.toString() ? '' : 'text-dark'}`}>
                                          {message.senderName}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="chat-text-start ps-55">
                                  <p className="mb-0 text-semi-muted">
                                    {message.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="clearfix" />
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-20">
                      <div className="flex items-center justify-center">
                        <img className="w-[20%] mb-10" src={Images.empty} alt="empty" />
                      </div> 
                      <h5 className="text-muted">No messages yet</h5>
                      <p className="text-muted">Start the conversation!</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <div className="box-footer no-border">
                <div className="d-md-flex d-block justify-content-between align-items-center bg-[#5F6569] p-5 rounded10 b-1 overflow-hidden">
                  <input
                    className="form-control border border-[#D6DADD] bg-[#F8F9FA]! b-0 py-10"
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-md-0 mt-30">
                    <button
                      type="button"
                      className="waves-effect waves-circle ml-2! btn btn-circle bg-primary"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                    >
                      <i className="mdi text-white mdi-send" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="box-body d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
              <div className="text-center">
                <FaComments className='text-gray-500 mx-auto fs-100 mb-10' />
                <h5 className="text-black">Select a club to start chatting</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
