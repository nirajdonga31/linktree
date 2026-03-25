import type { Link, CreateLinkInput, UpdateLinkInput } from '@linktree/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private async fetch(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Links
  async getLinks(userId: string): Promise<Link[]> {
    const data = await this.fetch(`/api/links/${userId}`);
    return data.data || [];
  }

  async createLink(input: CreateLinkInput & { userId: string }): Promise<Link> {
    const data = await this.fetch('/api/links', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    return data.data;
  }

  async updateLink(id: string, input: UpdateLinkInput): Promise<Link> {
    const data = await this.fetch(`/api/links/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    return data.data;
  }

  async deleteLink(id: string): Promise<void> {
    await this.fetch(`/api/links/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderLinks(linkIds: string[]): Promise<void> {
    await this.fetch('/api/links/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ linkIds }),
    });
  }

  // Analytics
  async trackClick(userId: string, linkId: string): Promise<void> {
    await this.fetch('/api/analytics/track', {
      method: 'POST',
      body: JSON.stringify({ userId, linkId }),
    });
  }

  async getAnalytics(userId: string, range: string = '7d') {
    const data = await this.fetch(`/api/analytics/${userId}?range=${range}`);
    return data.data;
  }
}

export const api = new ApiClient();
