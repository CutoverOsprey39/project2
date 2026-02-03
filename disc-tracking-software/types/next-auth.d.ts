//adding one interface I know we will for sure need if we lock in on implementing db for handling user data

import { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            id: string;
            role: 'USER';
            name: string;
        } & DefaultSession["user"];
    } 

    interface User {
        id: string;
        role: 'USER';
        name: string;
    }

}

