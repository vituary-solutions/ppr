/**
 * Enumerates the types of collateral that are identified by serial numbers.
 */
export enum SerialCollateralType {
  AIRFRAME_NOT_REGISTERED_IN_CANADA = 'AIRFRAME_NOT_REGISTERED_IN_CANADA',
  AIRFRAME_REGISTERED_IN_CANADA = 'AIRFRAME_REGISTERED_IN_CANADA',
  BOAT = 'BOAT',
  MANUFACTURED_HOME_NOT_REGISTERED = 'MANUFACTURED_HOME_NOT_REGISTERED',
  MANUFACTURED_HOME_REGISTERED = 'MANUFACTURED_HOME_REGISTERED',
  MOTOR_VEHICLE = 'MOTOR_VEHICLE',
  OUTBOARD_MOTOR = 'OUTBOARD_MOTOR',
  TRAILER = 'TRAILER'
}

export const serialCollateralTypeCodeList: string[] = [
  'AIRFRAME_NOT_REGISTERED_IN_CANADA',
  'AIRFRAME_REGISTERED_IN_CANADA',
  'BOAT',
  'MANUFACTURED_HOME_NOT_REGISTERED',
  'MANUFACTURED_HOME_REGISTERED',
  'MOTOR_VEHICLE',
  'OUTBOARD_MOTOR',
  'TRAILER'
]
