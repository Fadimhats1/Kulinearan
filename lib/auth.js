import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProviders from 'next-auth/providers/google';
import { prisma } from './prisma';
import { validatePassword } from '@/pages/api/auth/[...nextauth]';

