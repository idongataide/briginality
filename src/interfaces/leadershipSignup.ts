export interface LeadershipRoleApplicationPayload {
  name: string;
  email: string;
  age: number | null;
  pronouns: string;
  country_timezone: string;
  homeschool_status: string;
  region_id: number | string | null;
  role: string;
  availability: string[];
  club_preference: (string | number)[];
  motivation: string[];
  experience: string[];
  case_study: string[];
  notes: string;
}

