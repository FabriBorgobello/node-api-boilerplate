import { configuration } from './config';
import {
  BalanceStatementParamsSchema,
  type BalanceStatementParamsType,
} from './types';

const PROFILE_ID = configuration.WISE_PROFILE_ID;

export class WiseApi {
  private token: string;
  private test: boolean;
  private baseUrl: string;

  constructor({ token, test = false }: { token: string; test?: boolean }) {
    if (!token) {
      throw new Error('Token is required to initialize WiseApi');
    }
    this.token = token;
    this.test = test;
    this.baseUrl = test
      ? 'https://api.sandbox.transferwise.tech'
      : 'https://api.transferwise.com';
  }

  private async request(endpoint: string, method: string = 'GET', data?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };

    let options: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    };

    if (method === 'GET') {
      options.body = null;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const error = new Error(
          `HTTP Error Response: ${response.status} ${response.statusText}`,
        );
        throw error;
      }
      return response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  public balances = {
    get: async (id: number) => {
      return this.request(`/v4/profiles/${PROFILE_ID}/balances/${id}`);
    },
    list: async () => {
      return this.request(`/v4/profiles/${PROFILE_ID}/balances?types=STANDARD`);
    },
    statements: async (id: number, params: BalanceStatementParamsType) => {
      const validatedParams = BalanceStatementParamsSchema.parse(params);

      return this.request(
        `/v1/profiles/${PROFILE_ID}/balance-statements/${id}/statement.json?${new URLSearchParams(
          validatedParams,
        )}`,
      );
    },
  };

  public cards = {
    get: async (id: number) => {
      return this.request(`/v3/spend/profiles/${PROFILE_ID}/cards/${id}`);
    },
    list: async () => {
      return this.request(`/v3/spend/profiles/${PROFILE_ID}/cards`);
    },
  };
}
