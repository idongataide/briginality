import { create, StoreApi } from "zustand";
import { devtools, persist } from "zustand/middleware";

type iData = {
  [key: string]: any;
};
type LeadershipSignupStoreData = {
  basicInfo: iData | null;
  availability: iData | null;
  clubPreference: iData | null;
  motivation: iData | null;
  experience: iData | null;
  case_study: iData | null;
  finalNotes: iData | null;
};
export interface PresidedClub {
  id: number | string;
  region_id?: string;
  name: string;
  club_president_id?: string;
  club_vice_id?: string;
  open_status?: string;
  created_at?: string;
  updated_at?: string;
  club_id?: string | number;
}
interface LeadershipStoreState {
    navPath: string;
    setNavPath: (path: string) => void;
    siderBarView: boolean;
    setSiderBarView: (siderBarView: boolean) => void;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    email: string;
    setEmail: (email: string) => void;
    role: string[];  
    setRole: (role: string[]) => void;
    userName: string;
    setUserName: (userName: string) => void;
    isVerified: boolean;
    setIsVerified: (isVerified: boolean) => void;
    isCompleted: boolean;
    setIsCompleted: (isCompleted: boolean) => void;
    isAuthorized: boolean;
    setIsAuthorized: (isAuthorized: boolean) => void;
    avatar: string;
    setAvatar: (avatar: string) => void;

    formData: iData | null;
    setFormData: (data: iData) => void;

    // Clubs the leadership user presides over
    presidedClubs: PresidedClub[];
    setPresidedClubs: (clubs: PresidedClub[]) => void;

    // Leadership signup multi-step state
    leadershipSignupData: LeadershipSignupStoreData;
    setLeadershipSignupData: (step: keyof LeadershipSignupStoreData, data: any) => void;
    clearLeadershipSignupData: () => void;

    otpRequestId: string | null;
    setOtpRequestId: (id: string | null) => void;
    otpValue: string | null;
    setOtpValue: (otp: string | null) => void;
}

const myMiddlewares = <T,>(
    f: (
      set: {
        (
          partial: T | Partial<T> | ((state: T) => T | Partial<T>),
          replace?: false | undefined,
        ): void;
        (state: T | ((state: T) => T), replace: true): void;
      },
      get: () => T,
      api: StoreApi<T>,
    ) => T,
  ) =>
    devtools(
      persist(f, {
        name: "leadershipNavPaths",
      }),
    );

export const useLeadershipStore = create<LeadershipStoreState>()(
    myMiddlewares((set) => ({
        navPath: "leadership-basic-info",
        setNavPath: (path: string) => set({ navPath: path }),
        siderBarView: true,
        setSiderBarView: (siderBarView: boolean) => set({ siderBarView }),
        firstName: "",
        setFirstName: (firstName: string) => set({ firstName }),
        lastName: "",
        setLastName: (lastName: string) => set({ lastName }),
        token: null,
        setToken: (token: string | null) => set({ token }),
        email: "",
        setEmail: (email: string) => set({ email }),
        role: [],
        setRole: (role: string[]) => set({ role }),
        userName: "",
        setUserName: (userName: string) => set({ userName }),
        isVerified: false,
        setIsVerified: (isVerified: boolean) => set({ isVerified }),
        isCompleted: false,
        setIsCompleted: (isCompleted: boolean) => set({ isCompleted }),
        isAuthorized: false,
        setIsAuthorized: (isAuthorized: boolean) => set({ isAuthorized }),
        avatar: "",
        setAvatar: (avatar: string) => set({ avatar }),
        formData: null,
        setFormData: (data) => set({ formData: data }),

        presidedClubs: [],
        setPresidedClubs: (clubs) => set({ presidedClubs: clubs }),

        leadershipSignupData: {
            basicInfo: null,
            availability: null,
            clubPreference: null,
            motivation: null,
            experience: null,
            case_study: null,
            finalNotes: null,
        },
        setLeadershipSignupData: (step, data) => set((state) => ({
            leadershipSignupData: {
                ...state.leadershipSignupData,
                [step]: data,
            },
        })),
        clearLeadershipSignupData: () => set({
            leadershipSignupData: {
                basicInfo: null,
                availability: null,
                clubPreference: null,
                motivation: null,
                experience: null,
                case_study: null,
                finalNotes: null,
            },
        }),
        otpRequestId: null,
        setOtpRequestId: (id) => set({ otpRequestId: id }),
        otpValue: null,
        setOtpValue: (otp) => set({ otpValue: otp }),
    })),
); 