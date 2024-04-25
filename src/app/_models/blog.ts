export class Blog {
    id?: string;
    title?: string;
    description?: string;
    image?: string;
    isPublished?: boolean = false;
    isDeleted?: boolean = false;
	publishedBy?: string;
	createtimestamp?: number;
	updatetimestamp?: number;
}