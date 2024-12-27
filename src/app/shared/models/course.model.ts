import { CourseModule } from "./course-module.model";

export interface Course {
    id: number;
    title: string;
    description: string;
    modules: CourseModule[];
  }
  