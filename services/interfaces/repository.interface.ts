// services/common/repository.interface.ts
export interface IRepository<T> {
	findById(id: string): Promise<T | null>;
	findAll(): Promise<T[]>;
	create(data: Omit<T, "id">): Promise<T>;
	update(id: string, data: Partial<T>): Promise<T | null>;
	delete(id: string): Promise<boolean>;
	count(): Promise<number>;
	exists(id: string): Promise<boolean>;
	findByField(field: keyof T, value: any): Promise<T | null>;
	findAllByField(field: keyof T, value: any): Promise<T[]>;
	findOneAndUpdate(filter: Partial<T>, update: Partial<T>): Promise<T | null>;
	findOneAndDelete(filter: Partial<T>): Promise<T | null>;
	findOneAndReplace(filter: Partial<T>, replacement: T): Promise<T | null>;
	aggregate(pipeline: any[]): Promise<any[]>;
}
