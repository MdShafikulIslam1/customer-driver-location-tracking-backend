import { DeliveryAssociateStatus } from '../../../enums'
import { ILocation } from '../shipment/shipment.interface'

export interface IDeliveryAssociate {
  name: string
  email: string
  password: string
  phoneNumber: string
  status: DeliveryAssociateStatus
  currentLocation: ILocation
}
