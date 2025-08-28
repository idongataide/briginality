export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  role: 'admin' | 'member';
  lastSeen?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  isOwnMessage: boolean;
}

export interface GroupChat {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: GroupMember[];
  messages: ChatMessage[];
  lastActivity: string;
  unreadCount: number;
  isActive: boolean;
}

export const mockGroups: GroupChat[] = [
  {
    id: '1',
    name: 'Computer Science Club',
    description: 'Discussion group for CS students and projects',
    avatar: '/public/images/avatar/1.jpg',
    lastActivity: '2 minutes ago',
    unreadCount: 3,
    isActive: true,
    members: [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: '/public/images/avatar/1.jpg',
        status: 'online',
        role: 'admin'
      },
      {
        id: '2',
        name: 'Sarah Chen',
        avatar: '/public/images/avatar/2.jpg',
        status: 'online',
        role: 'member'
      },
      {
        id: '3',
        name: 'Mike Rodriguez',
        avatar: '/public/images/avatar/3.jpg',
        status: 'away',
        role: 'member'
      },
      {
        id: '4',
        name: 'Emily Davis',
        avatar: '/public/images/avatar/4.jpg',
        status: 'offline',
        role: 'member',
        lastSeen: '1 hour ago'
      },
      {
        id: '5',
        name: 'David Kim',
        avatar: '/public/images/avatar/5.jpg',
        status: 'online',
        role: 'member'
      }
    ],
    messages: [
      {
        id: '1',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: '/public/images/avatar/1.jpg',
        content: 'Hey everyone! Who\'s working on the final project this weekend?',
        timestamp: '09:25',
        type: 'text',
        isOwnMessage: false
      },
      {
        id: '2',
        senderId: '2',
        senderName: 'Sarah Chen',
        senderAvatar: '/public/images/avatar/2.jpg',
        content: 'I am! I\'m working on the frontend part. Anyone want to pair program?',
        timestamp: '09:28',
        type: 'text',
        isOwnMessage: false
      },
      {
        id: '3',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: '/public/images/avatar/default.jpg',
        content: 'I can help with the backend API integration!',
        timestamp: '09:41',
        type: 'text',
        isOwnMessage: true
      },
      {
        id: '4',
        senderId: '3',
        senderName: 'Mike Rodriguez',
        senderAvatar: '/public/images/avatar/3.jpg',
        content: 'Perfect! Let\'s meet in the library tomorrow at 2 PM',
        timestamp: '09:45',
        type: 'text',
        isOwnMessage: false
      },
      {
        id: '5',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: '/public/images/avatar/1.jpg',
        content: 'Great idea! I\'ll bring some snacks 🍕',
        timestamp: '09:50',
        type: 'text',
        isOwnMessage: false
      }
    ]
  },
  {
    id: '2',
    name: 'Study Group - Math 101',
    description: 'Study group for Mathematics 101 course',
    avatar: '/public/images/avatar/6.jpg',
    lastActivity: '1 hour ago',
    unreadCount: 0,
    isActive: false,
    members: [
      {
        id: '6',
        name: 'Lisa Wang',
        avatar: '/public/images/avatar/6.jpg',
        status: 'offline',
        role: 'admin',
        lastSeen: '30 minutes ago'
      },
      {
        id: '7',
        name: 'Tom Wilson',
        avatar: '/public/images/avatar/7.jpg',
        status: 'offline',
        role: 'member',
        lastSeen: '1 hour ago'
      },
      {
        id: '8',
        name: 'Jessica Brown',
        avatar: '/public/images/avatar/8.jpg',
        status: 'offline',
        role: 'member',
        lastSeen: '2 hours ago'
      }
    ],
    messages: [
      {
        id: '1',
        senderId: '6',
        senderName: 'Lisa Wang',
        senderAvatar: '/public/images/avatar/6.jpg',
        content: 'Does anyone understand the calculus problem from chapter 5?',
        timestamp: '14:30',
        type: 'text',
        isOwnMessage: false
      },
      {
        id: '2',
        senderId: '7',
        senderName: 'Tom Wilson',
        senderAvatar: '/public/images/avatar/7.jpg',
        content: 'I think I got it! Let me share my solution',
        timestamp: '14:45',
        type: 'text',
        isOwnMessage: false
      }
    ]
  },
  {
    id: '3',
    name: 'Basketball Team',
    description: 'Team chat for basketball players',
    avatar: '/public/images/avatar/9.jpg',
    lastActivity: '5 minutes ago',
    unreadCount: 1,
    isActive: true,
    members: [
      {
        id: '9',
        name: 'Chris Thompson',
        avatar: '/public/images/avatar/9.jpg',
        status: 'online',
        role: 'admin'
      },
      {
        id: '10',
        name: 'Maria Garcia',
        avatar: '/public/images/avatar/10.jpg',
        status: 'online',
        role: 'member'
      },
      {
        id: '11',
        name: 'James Lee',
        avatar: '/public/images/avatar/11.jpg',
        status: 'away',
        role: 'member'
      }
    ],
    messages: [
      {
        id: '1',
        senderId: '9',
        senderName: 'Chris Thompson',
        senderAvatar: '/public/images/avatar/9.jpg',
        content: 'Practice tomorrow at 6 AM sharp! 🏀',
        timestamp: '20:15',
        type: 'text',
        isOwnMessage: false
      },
      {
        id: '2',
        senderId: '10',
        senderName: 'Maria Garcia',
        senderAvatar: '/public/images/avatar/10.jpg',
        content: 'I\'ll be there! Ready to work on our defense',
        timestamp: '20:18',
        type: 'text',
        isOwnMessage: false
      }
    ]
  }
];

export const currentUser = {
  id: 'current-user',
  name: 'You',
  avatar: '/public/images/avatar/default.jpg',
  status: 'online' as const
};
