export type User = {
   username: string;
   password?: string;
   birthdate: string;
   gender: string;
   email: string;
   id: string;
   confirm_password?: string;
};

export type Todo = {
    id: string;
    userId: string;
    title: string;
    deadline: string;
    completed: boolean;
    late?: boolean
};
