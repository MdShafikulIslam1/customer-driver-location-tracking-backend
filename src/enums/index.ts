/* eslint-disable no-unused-vars */
export enum UserRole {
  user = 'user',
  admin = 'admin',
  driver = 'driver',
}

export enum ShipmentStatus {
  requested = 'requested',
  deliveryAssociateAssigned = 'deliveryAssociateAssigned',
  pickupLocationReached = 'pickupLocationReached',
  transporting = 'transporting',
  dropLocationReached = 'dropLocationReached',
  delivered = 'delivered',
  cancelled = 'cancelled',
}

export enum DeliveryAssociateStatus {
  available = 'available', // ready to accept new shipment
  delivering = 'delivering', // transporting goods
  off = 'off', // on leave
}
