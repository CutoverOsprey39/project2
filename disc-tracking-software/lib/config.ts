const config = {
    env: {
        appUrl: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000',
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        databaseUrl: process.env.DATABASE_URL!,
        authSecret: process.env.AUTH_SECRET!,
    }
}

export default config;