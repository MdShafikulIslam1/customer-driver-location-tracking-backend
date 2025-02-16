import { ShipmentStatus } from '../../../enums'
import { IDeliveryAssociate } from '../deliveryAssociate/deliveryAssociate.interface'
import { IUser } from '../user/user.interface'

export interface ILocation {
  lat: number
  lng: number
}

export interface IShipment {
  customerLocation: ILocation
  userId: string | IUser
  deliveryAssociateId?: string | IDeliveryAssociate
  status: ShipmentStatus
}
