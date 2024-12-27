import { Lesson } from "./lesson.model";

export interface CourseModule {
    id: number;
    title: string;
    lessons: Lesson[];
  }
  