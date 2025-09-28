"use server"

import {auth} from "@/lib/auth"

export const signIn = async() => {
    await auth.api.signInEmail({
        body:{
            email: "newuser@example.com",
            password: "newpassword123"
        }
    })
}

export const signUp = async() => {
    await auth.api.signUpEmail({
        body:{
            name: "NewUser",
            email: "newuser@example.com",
            password: "newpassword123"
        }
    })
}
