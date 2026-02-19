"use client";

import React, { Suspense } from 'react'
import AuthForm from '@/components/AuthForm';
import { signInWithCredentials } from '@/lib/actions/auth';
import { signinSchema } from '@/lib/validations';

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <AuthForm 
            type="SIGN_IN"
            schema={signinSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={signInWithCredentials}
        />
    </Suspense>
)

export default Page;
