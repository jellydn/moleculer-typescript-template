import { randomUUID } from "node:crypto";
import { IRepository } from "../interfaces";

// Product interface definition
export interface Product {
	id: string;
	name: string;
	qty: number;
}

export class InMemoryProductRepository implements IRepository<Product> {
	public async update(
		id: string,
		data: Partial<Product>
	): Promise<Product | null> {
		const existingProduct = this.products.get(id);
		if (!existingProduct) {
			return null;
		}
		const updatedProduct: Product = { ...existingProduct, ...data, id };
		this.products.set(id, updatedProduct);
		return updatedProduct;
	}

	public async delete(id: string): Promise<boolean> {
		return this.products.delete(id);
	}

	public async count(): Promise<number> {
		return this.products.size;
	}

	public async exists(id: string): Promise<boolean> {
		return this.products.has(id);
	}

	public async findByField(
		field: keyof Product,
		value: any
	): Promise<Product | null> {
		for (const product of this.products.values()) {
			if (product[field] === value) {
				return product;
			}
		}
		return null;
	}

	public async findAllByField(
		field: keyof Product,
		value: any
	): Promise<Product[]> {
		const results: Product[] = [];
		for (const product of this.products.values()) {
			if (product[field] === value) {
				results.push(product);
			}
		}
		return results;
	}

	public async findOneAndUpdate(
		filter: Partial<Product>,
		update: Partial<Product>
	): Promise<Product | null> {
		for (const [id, product] of this.products.entries()) {
			if (this.matchesFilter(product, filter)) {
				const updatedProduct: Product = { ...product, ...update };
				this.products.set(id, updatedProduct);
				return updatedProduct;
			}
		}
		return null;
	}

	public async findOneAndDelete(
		filter: Partial<Product>
	): Promise<Product | null> {
		for (const [id, product] of this.products.entries()) {
			if (this.matchesFilter(product, filter)) {
				this.products.delete(id);
				return product;
			}
		}
		return null;
	}

	public async findOneAndReplace(
		filter: Partial<Product>,
		replacement: Product
	): Promise<Product | null> {
		for (const [id, product] of this.products.entries()) {
			if (this.matchesFilter(product, filter)) {
				this.products.set(id, replacement);
				return replacement;
			}
		}
		return null;
	}

	public async aggregate(pipeline: any[]): Promise<any[]> {
		let results = Array.from(this.products.values());

		for (const stage of pipeline) {
			if (stage.$match) {
				results = results.filter((product) =>
					this.matchesFilter(product, stage.$match)
				);
			}
			if (stage.$sort) {
				const sortField = Object.keys(stage.$sort)[0] as keyof Product;
				const sortOrder = stage.$sort[sortField];
				results.sort((a, b) => {
					if (a[sortField] < b[sortField])
						return sortOrder === 1 ? -1 : 1;
					if (a[sortField] > b[sortField])
						return sortOrder === 1 ? 1 : -1;
					return 0;
				});
			}
			if (stage.$limit) {
				results = results.slice(0, stage.$limit);
			}
		}

		return results;
	}

	private matchesFilter(product: Product, filter: Partial<Product>): boolean {
		for (const [key, value] of Object.entries(filter)) {
			if (product[key as keyof Product] !== value) {
				return false;
			}
		}
		return true;
	}

	private products: Map<string, Product> = new Map();

	public async findById(id: string): Promise<Product | null> {
		return this.products.get(id) || null;
	}

	public async findAll(): Promise<Product[]> {
		return Array.from(this.products.values());
	}

	public async create(data: Omit<Product, "id">): Promise<Product> {
		const id = randomUUID();
		const newProduct: Product = { id, ...data };
		this.products.set(id, newProduct);
		return newProduct;
	}
}
