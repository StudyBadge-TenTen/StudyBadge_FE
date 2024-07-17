interface StudyChannelType {
  studyChannelId: number;
  name: string;
  category: string;
  description: string;
  recruitmentStatus: string;
  meetingType: string;
  startDate: "YYYY-MM-DD" | string;
  endDate: "YYYY-MM-DD" | string;
  deposit: number;
  viewCount: number;
  leader: {
    id: number;
    name: string;
  };
}

interface StudyListResponseType {
  totalPage: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  studyChannels: StudyChannelType[];
}

export type { StudyListResponseType, StudyChannelType };
