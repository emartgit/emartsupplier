import type { ApiResponse, SubmitPayload } from '@/types';

const BASE = '/api';

class SupplierService {
  private async request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
    const res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
    const json: ApiResponse<T> = await res.json();
    if (!json.success) throw new Error(json.error ?? 'Unknown error');
    return json;
  }

  async getSuppliers(): Promise<string[]> {
    const res = await this.request<string[]>('/suppliers.php');
    return res.data ?? [];
  }

  async submit(payload: SubmitPayload): Promise<void> {
    await this.request('/submit.php', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export const supplierService = new SupplierService();
