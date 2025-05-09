export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  quarter: Quarter;
  year: number;
  owner: string;
  dependencies?: string[]; // IDs of dependent items
  effort: number; // Story points or estimated effort
  progress: number; // 0-100 percentage
  createdAt: Date;
  updatedAt: Date;
}

export interface RoadmapFilter {
  priority?: Priority;
  status?: Status;
  quarter?: Quarter;
  year?: number;
  owner?: string;
} 