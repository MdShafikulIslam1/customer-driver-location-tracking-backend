import { DeliveryAssociateStatus, UserRole } from '../../../enums'
import { ILocation } from '../shipment/shipment.interface'

export interface IDeliveryAssociate {
  name: string
  email: string
  password: string
  role: UserRole
  phoneNumber: string
  status: DeliveryAssociateStatus
  currentLocation: ILocation
}
