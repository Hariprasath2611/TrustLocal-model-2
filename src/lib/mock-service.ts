// Mock implementation of BaseCrudService with static methods
export class BaseCrudService {

    static async create(collectionName: string, data: any) {
        console.log(`[Mock] Created in ${collectionName}:`, data);
        return { ...data, _id: 'mock-id-' + Date.now() };
    }

    static async getById<T>(collectionName: string, id: string): Promise<T | null> {
        console.log(`[Mock] Read ${id} from ${collectionName}`);
        return {
            _id: id,
            name: 'Mock Item',
            // Add other common fields that might be expected
        } as unknown as T;
    }

    static async update(collectionName: string, id: string, data: any) {
        console.log(`[Mock] Updated ${id} in ${collectionName}:`, data);
        return data;
    }

    static async delete(collectionName: string, id: string) {
        console.log(`[Mock] Deleted ${id} from ${collectionName}`);
        return true;
    }

    static async getAll<T>(collectionName: string, filters?: any, options?: any): Promise<{ items: T[], totalCount: number }> {
        console.log(`[Mock] Listed from ${collectionName} with filters:`, filters, options);
        return {
            items: [],
            totalCount: 0
        };
    }

    static async query(collectionName: string) {
        return {
            find: async () => [],
            count: async () => 0
        }
    }
}
