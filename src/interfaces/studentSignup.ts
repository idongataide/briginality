export interface StudentSignupPayload {
  name: string;
  email: string;
  parent_email: string;
  age: number | null;
  pronouns: string;
  country_timezone: string;
  homeschool_status: string;
  region_id: number | null;
  club_preference: (string | number)[];
  experience: string[];
  accessibility: string[];
  participation: string;
  notes: string;
}

export interface BasicInfoData {
  fullName: string;
  dateOfBirth: string;
  guardianEmail?: string;
  email: string;
  pronouns?: string;
  country: string;
  homeschoolStatus: string;
  region: number;
}

export interface ClubPreferenceData {
  [key: string]: string | number;
}

export interface ExperienceData {
  managementExperience: string;
  joinExpectations: string;
}

export interface AccommodationsData {
  accountedNeeds: string;
  accountedNeedsDetails?: string;
  participationAccommodations: string;
  participationDetails?: string;
}

export interface StudentSignupStoreData {
  basicInfo: BasicInfoData | null;
  clubPreference: ClubPreferenceData | null;
  experience: ExperienceData | null;
  accommodations: AccommodationsData | null;
} 