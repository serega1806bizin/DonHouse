/* eslint-disable @typescript-eslint/no-unused-vars */
interface TelegramGroup {
  id: number;
  name: string;
}

interface Project {
  id: number;
  id_telegramGroup: number | null;
  id_foreman: number | null;
  start_date: string;
  end_date: string | null;
  description?: string;
}

interface Task {
  id: number;
  id_project: number;
  start_date: string;
  end_date: string;
  title: string;
  description: string;
  photos?: string[];
  id_foreman: number | null;
  color: string;
}

interface Signature {
  id: number;
  id_foreman: number;
  date?: string;
  isSigned: boolean;
}

interface Warning {
  id: number;
  date: string;
  id_project: number;
  title: string;
  description: string;
  photos?: string[];
}

interface Fine extends Warning {
  amount: number;
  paid: boolean;
}

type ToolStatus = 'Доступный' | 'В использовании' | 'На ремонте' | 'Списанный';

interface Tool {
  name: string;
  inventoryNumber: string;
  quantity: string;
  status: ToolStatus;
  location: string;
  comment?: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  phone?: string;
  telegram?: string;
  otherContacts?: string;
}

interface Supplier extends User {
  QRs: string[];
}

interface Foreman extends User {
  code: number;
}

interface Master extends User {}

interface BookingMasterRequest {
  id: number;
  id_foreman: number;
  id_master: number;
  id_task: number;
  allowed: boolean;
}

interface Content {
  id: number;
  type: 'text' | 'images' | 'video' | 'documents';
  content: string | string[];
}

interface Section {
  id: number;
  name: string;
  content: Content[];
}

interface Regulations {
  sections: Section[];
}

type QuestionType = 'text' | 'checkbox';

interface Question {
  id: number;
  title: string;
  type: QuestionType;
  options?: string[];
  correсt: string | boolean[];
}

interface Test {
  id: number;
  dateCreated: string;
  dateStart: string;
  dateEnd: string;
  limit: number;
  questions: Question[];
}

interface AnswerOfQuestion {
  id: number;
  id_question: number;
  answer: string | boolean[];
  isCorrect: boolean;
}

interface ResultTesting {
  id: number;
  id_test: number;
  id_foreman: number;
  testing: boolean;
  success?: boolean | null;
  dateOfTesting?: string;
  answers?: AnswerOfQuestion[];
}
