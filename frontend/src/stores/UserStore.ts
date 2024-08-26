import {makeAutoObservable} from "mobx";
import {User} from "@/interfaces/user.interface.ts";

export class UserStore implements User {
    id: number | null = null;
    email: string | null = null;
    createdAt: string | null = null;
    updatedAt: string | null = null;


    constructor() {
        makeAutoObservable(this, {}, {autoBind: true, deep: true});
    }

    setUser(user: Partial<User>): void {
        Object.assign(this, user);
    }

    clearUser(): void {
        this.id = null;
        this.email = null;
        this.createdAt = null;
        this.updatedAt = null;
    }
}
