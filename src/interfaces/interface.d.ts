export interface iSignup {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
export interface iLogin {
  email?: string;
  user_name?: string;
  password: string;
}

export interface DecodedToken {
  user_uid: string;
}

export interface MyClub {
  id: number;
  name: string;
  region_id: string;
  club_id: string;
  region: {
    id: number;
    name: string;
    description: string;
    president_id: string | null;
    president: string | null;
    vice_id: string | null;
    vice: string | null;
    created_at: string;
  };
  club: {
    id: number;
    category_id: number;
    category: string;
    name: string;
    description: string;
    image: string | null;
  };
  club_president: string;
  club_vice: string;
  timezone: string | null;
  open_status: string;
  created_at: string;
  members: number;
  events: number;
  notices: number;
  points: any[]; 
}