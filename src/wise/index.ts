import { configuration } from '../config';
import {
  BalanceStatementParamsSchema,
  type BalanceStatementParamsType,
} from './types';

const WISE_PROFILE_ID = configuration.WISE_PROFILE_ID;
const WISE_URL = configuration.WISE_URL;

export class WiseApi {
  private token: string;

  constructor({ token }: { token: string }) {
    if (!token) {
      throw new Error('Token is required to initialize WiseApi');
    }
    this.token = token;
  }

  private async request(endpoint: string, method: string = 'GET', data?: any) {
    const url = `${WISE_URL}${endpoint}`;
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
      return this.request(`/v4/profiles/${WISE_PROFILE_ID}/balances/${id}`);
    },
    list: async () => {
      return this.request(
        `/v4/profiles/${WISE_PROFILE_ID}/balances?types=STANDARD`,
      );
    },
    statements: async (id: number, params: BalanceStatementParamsType) => {
      const validatedParams = BalanceStatementParamsSchema.parse(params);

      return this.request(
        `/v1/profiles/${WISE_PROFILE_ID}/balance-statements/${id}/statement.json?${new URLSearchParams(
          validatedParams,
        )}`,
      );
    },
  };

  public cards = {
    get: async (id: number) => {
      return this.request(`/v3/spend/profiles/${WISE_PROFILE_ID}/cards/${id}`);
    },
    list: async () => {
      return this.request(`/v3/spend/profiles/${WISE_PROFILE_ID}/cards`);
    },
  };
}
