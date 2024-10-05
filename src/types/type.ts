import { ReactNode } from "react";

export interface LoginUser{
    email:string;
    password:string;
}

export interface SignupUser{
    email:string,
    password:string,
    mobile:number,
    confirmPassword:string,
    terms:boolean
}

export interface children{
    children:ReactNode
}

export interface UserContextType {
    user: UserDetails | null;
    UserData: (userData: UserDetails) => void;
    logOut: () => void;
}

export interface UserDetails{
    _id?:string,
    email:string,
    password:string,
    mobile:number,
    image:string,
    following:string[],
    followers:string[],
    bio:string,
    blog:string[],
    DOB:string,
    Gender:string,
    isBlocked:boolean
}

export interface BlogData{
    _id?:string,
    author?:string,
    title:string,
    content:string,
    Data?:{
        fileType?:string,
        file?:string
    },
    visible?:boolean,
    likes?: string[]
}