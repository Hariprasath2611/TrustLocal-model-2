/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: reviews
 * Interface for Reviews
 */
export interface Reviews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  starRating?: number;
  /** @wixFieldType text */
  reviewText?: string;
  /** @wixFieldType text */
  technicianId?: string;
  /** @wixFieldType text */
  serviceRequestId?: string;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType datetime */
  reviewDate?: Date | string;
}


/**
 * Collection ID: servicerequests
 * Interface for ServiceRequests
 */
export interface ServiceRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceTitle?: string;
  /** @wixFieldType text */
  serviceDescription?: string;
  /** @wixFieldType text */
  serviceLocation?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType date */
  requestedDate?: Date | string;
  /** @wixFieldType time */
  requestedTime?: any;
  /** @wixFieldType text */
  customerId?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: technicians
 * Interface for Technicians
 */
export interface Technicians {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profileImage?: string;
  /** @wixFieldType text */
  skills?: string;
  /** @wixFieldType boolean */
  isVerified?: boolean;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType number */
  averageRating?: number;
}
