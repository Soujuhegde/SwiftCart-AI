import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROFILE_FILE = path.join(DATA_DIR, 'profile.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DEFAULT_USER = {
    name: 'Alex Morgan',
    role: 'Store Manager',
    branch: 'Downtown Branch',
    avatar: 'https://github.com/shadcn.png'
};

function getProfile() {
    try {
        if (fs.existsSync(PROFILE_FILE)) {
            const data = fs.readFileSync(PROFILE_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (e) {
        console.error("Failed to read profile file", e);
    }
    return DEFAULT_USER;
}

function saveProfile(profile: any) {
    fs.writeFileSync(PROFILE_FILE, JSON.stringify(profile, null, 2));
}

// GET /api/user - Get current user profile
export async function GET() {
    try {
        const profile = getProfile();
        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user profile' },
            { status: 500 }
        );
    }
}

// PUT /api/user - Update user profile
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const currentProfile = getProfile();

        // Merge updates
        const updatedProfile = {
            ...currentProfile,
            ...body
        };

        saveProfile(updatedProfile);

        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { error: 'Failed to update user profile' },
            { status: 500 }
        );
    }
}
