"use client";

import React, { Suspense } from 'react';
import AuthForm from '@/components/AuthForm';
import { signUp } from '@/lib/actions/auth';
import { signupSchema } from '@/lib/validations';

const CreateAccountPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthForm 
                type="SIGN_UP"
                schema={signupSchema}
                defaultValues={{ 
                    full_name: "", 
                    email: "", 
                    password: "", 
                    confirm_password: "",
                    phone: "", 
                }}
                onSubmit={signUp}
            />
        </Suspense>
    );
};

export default CreateAccountPage;
