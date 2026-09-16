import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';

const STORAGE_KEY_USER = 'ekabaadi_auth_user';
const STORAGE_KEY_ROLE = 'ekabaadi_user_role';

export interface AuthResponse {
  user: User | null;
  error?: string | null;
}

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    this.initFromStorage();
  }

  private initFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        this.currentUser = JSON.parse(stored);
      } else {
        // Default to user demo account
        this.currentUser = MOCK_USERS['user@ekabaadi.com'];
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(this.currentUser));
        localStorage.setItem(STORAGE_KEY_ROLE, this.currentUser.role);
      }
    } catch {
      this.currentUser = MOCK_USERS['user@ekabaadi.com'];
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async getSession() {
    return {
      user: this.currentUser,
      access_token: 'mock-jwt-token-ekabaadi-secure',
    };
  }

  async login(email: string, _password?: string): Promise<AuthResponse> {
    // Simulated network latency
    await new Promise((resolve) => setTimeout(resolve, 350));

    const normalizedEmail = email.toLowerCase().trim();
    const existing = MOCK_USERS[normalizedEmail];

    if (existing) {
      this.currentUser = { ...existing };
      this.saveToStorage();
      return { user: this.currentUser, error: null };
    }

    // Dynamic user creation if not one of the pre-set 3 demo accounts
    const isCollector = normalizedEmail.includes('merchant') || normalizedEmail.includes('collector');
    const isAdmin = normalizedEmail.includes('admin');
    const role: UserRole = isAdmin ? 'ADMIN' : isCollector ? 'MERCHANT' : 'USER';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: normalizedEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: normalizedEmail,
      role,
      city: 'Neemrana',
      state: 'Rajasthan',
      ecoPoints: role === 'USER' ? 120 : 0,
      totalKgRecycled: role === 'USER' ? 2.4 : 0,
      co2SavedKg: role === 'USER' ? 4.1 : 0,
      verified: true
    };

    this.currentUser = newUser;
    this.saveToStorage();
    return { user: this.currentUser, error: null };
  }

  async signup(data: { name: string; email: string; phone?: string; role: 'USER' | 'MERCHANT' }): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || '+91 98000 00000',
      role: data.role,
      city: 'Neemrana',
      state: 'Rajasthan',
      ecoPoints: data.role === 'USER' ? 100 : 0,
      totalKgRecycled: 0,
      co2SavedKg: 0,
      joinedDate: 'Just now',
      verified: true,
      rating: data.role === 'MERCHANT' ? 5.0 : undefined,
      vehicleNumber: data.role === 'MERCHANT' ? 'RJ-32-NEW-01' : undefined
    };

    this.currentUser = newUser;
    this.saveToStorage();
    return { user: this.currentUser, error: null };
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_ROLE);
  }

  // Quick switch for reviewers to test all 3 personas without manual typing
  async switchDemoAccount(role: UserRole): Promise<User> {
    let email = 'user@ekabaadi.com';
    if (role === 'MERCHANT') email = 'merchant@ekabaadi.com';
    if (role === 'ADMIN') email = 'admin@ekabaadi.com';

    this.currentUser = { ...MOCK_USERS[email] };
    this.saveToStorage();
    return this.currentUser;
  }

  updateUserProfile(updatedFields: Partial<User>): User | null {
    if (!this.currentUser) return null;
    this.currentUser = { ...this.currentUser, ...updatedFields };
    this.saveToStorage();
    return this.currentUser;
  }

  private saveToStorage() {
    if (this.currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(this.currentUser));
      localStorage.setItem(STORAGE_KEY_ROLE, this.currentUser.role);
    }
  }
}

export const authService = new AuthService();
